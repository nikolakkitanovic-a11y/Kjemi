/*
 * Kjemimotor: tolker kjemiske formler, regner molar masse, sjekker om
 * reaksjonslikninger er balansert og lager elektronkonfigurasjoner.
 */
(function (KJ) {
  'use strict';

  const SUB = '₀₁₂₃₄₅₆₇₈₉';
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

  function FeilFormel(msg) {
    const e = new Error(msg);
    e.kjemi = true;
    return e;
  }

  /** Gjør om unicode-indekser, ladninger, prikker og klammer til en enkel ASCII-form. */
  function normaliser(s) {
    let out = '';
    let iSup = false;
    for (const ch of String(s)) {
      const i = SUB.indexOf(ch);
      if (i >= 0) {
        out += i;
        iSup = false;
        continue;
      }
      const j = SUP.indexOf(ch);
      if (j >= 0) {
        if (!iSup) out += '^';
        out += j;
        iSup = true;
        continue;
      }
      if (ch === '⁺' || ch === '⁻') {
        if (!iSup) out += '^';
        out += ch === '⁺' ? '+' : '-';
        iSup = false;
        continue;
      }
      iSup = false;
      if (ch === '−' || ch === '–' || ch === '—') out += '-';
      else if ('·•∙⋅*.'.includes(ch)) out += '·';
      else if (ch === '[') out += '(';
      else if (ch === ']') out += ')';
      else if (ch === '{' || ch === '}') continue;
      else out += ch;
    }
    return out.replace(/\s+/g, ' ').trim();
  }

  /**
   * Skiller ut ladning fra slutten av formelen.
   * alt = true gir den alternative tolkningen der siste siffer før +/- er ladning
   * (f.eks. «SO42-» = SO4 med ladning 2-).
   */
  function skillLadning(s, alt) {
    let m;
    if ((m = /\^\(?(\d*)([+-])\)?$/.exec(s))) return { kropp: s.slice(0, m.index), ladning: (m[2] === '+' ? 1 : -1) * (m[1] ? +m[1] : 1) };
    if ((m = /\^([+-])(\d+)$/.exec(s))) return { kropp: s.slice(0, m.index), ladning: (m[1] === '+' ? 1 : -1) * +m[2] };
    if ((m = /\s(\d*)([+-])$/.exec(s))) return { kropp: s.slice(0, m.index), ladning: (m[2] === '+' ? 1 : -1) * (m[1] ? +m[1] : 1) };
    if (alt && (m = /(\d)([+-])$/.exec(s))) return { kropp: s.slice(0, m.index), ladning: (m[2] === '+' ? 1 : -1) * +m[1] };
    if ((m = /([+-]+)$/.exec(s))) return { kropp: s.slice(0, m.index), ladning: (m[1][0] === '+' ? 1 : -1) * m[1].length };
    return { kropp: s, ladning: 0 };
  }

  function parseKropp(s) {
    let i = 0;
    const readNum = () => {
      const m = /^\d+/.exec(s.slice(i));
      if (!m) return null;
      i += m[0].length;
      return parseInt(m[0], 10);
    };
    function seq(dybde) {
      const noder = [];
      while (i < s.length) {
        const ch = s[i];
        if (ch === '(') {
          i++;
          const inner = seq(dybde + 1);
          if (s[i] !== ')') throw FeilFormel('Mangler sluttparentes');
          i++;
          const n = readNum();
          if (n === 0) throw FeilFormel('Indeks kan ikke være 0');
          if (!inner.length) throw FeilFormel('Tom parentes');
          noder.push({ g: inner, n: n == null ? 1 : n });
        } else if (ch === ')') {
          if (dybde === 0) throw FeilFormel('Sluttparentes uten startparentes');
          break;
        } else if (/[A-Z]/.test(ch)) {
          const nx = s[i + 1];
          let sym = ch;
          if (nx && /[a-z]/.test(nx)) {
            if (KJ.grunnstoffMap[ch + nx]) sym = ch + nx;
            else throw FeilFormel('Ukjent grunnstoff «' + ch + nx + '»');
          } else if (!KJ.grunnstoffMap[ch]) throw FeilFormel('Ukjent grunnstoff «' + ch + '»');
          i += sym.length;
          const n = readNum();
          if (n === 0) throw FeilFormel('Indeks kan ikke være 0');
          noder.push({ e: sym, n: n == null ? 1 : n });
        } else if (/[a-z]/.test(ch)) {
          throw FeilFormel('Grunnstoffsymboler starter med stor bokstav («' + ch + '»)');
        } else {
          throw FeilFormel('Ugyldig tegn «' + ch + '»');
        }
      }
      return noder;
    }
    const res = seq(0);
    if (i < s.length) throw FeilFormel('Ugyldig formel');
    return res;
  }

  function telle(noder, faktor, acc) {
    noder.forEach((nd) => {
      if (nd.e) acc[nd.e] = (acc[nd.e] || 0) + nd.n * faktor;
      else telle(nd.g, faktor * nd.n, acc);
    });
    return acc;
  }

  function kanonisk(noder) {
    return noder
      .map((nd) => {
        if (nd.e) return nd.e + (nd.n > 1 ? nd.n : '');
        const inner = kanonisk(nd.g);
        return nd.n === 1 ? inner : '(' + inner + ')' + nd.n;
      })
      .join('');
  }

  function ladningTekst(q) {
    if (!q) return '';
    return '^' + (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '-');
  }

  /**
   * Tolker en formel. Returnerer { antall: {Na:1, Cl:1}, ladning, kanon, ce }.
   * Kaster Error med .kjemi = true ved ugyldig formel.
   */
  function parse(str, alt) {
    const s0 = normaliser(str);
    if (!s0) throw FeilFormel('Tom formel');
    if (/^e\^?-$/.test(s0)) return { antall: {}, ladning: -1, kanon: 'e^-', ce: 'e-', elektron: true };
    const { kropp, ladning } = skillLadning(s0, alt);
    const deler = kropp.replace(/\s+/g, '').split('·');
    const antall = {};
    const kanonDeler = [];
    deler.forEach((del, idx) => {
      let koef = 1;
      const m = /^(\d+)/.exec(del);
      if (m && idx > 0) {
        koef = parseInt(m[1], 10);
        del = del.slice(m[1].length);
      } else if (m && idx === 0) {
        throw FeilFormel('Formelen kan ikke starte med et tall');
      }
      if (!del) throw FeilFormel('Ufullstendig formel');
      const noder = parseKropp(del);
      telle(noder, koef, antall);
      kanonDeler.push((koef > 1 ? koef : '') + kanonisk(noder));
    });
    const kanon = kanonDeler.join('·') + ladningTekst(ladning);
    return { antall, ladning, kanon, ce: kanon.replace(/·/g, '*') };
  }

  /** Alle rimelige tolkninger av en formel (brukes ved retting). */
  function tolkninger(str) {
    const out = [];
    const seen = new Set();
    [false, true].forEach((alt) => {
      try {
        const p = parse(str, alt);
        if (!seen.has(p.kanon)) {
          seen.add(p.kanon);
          out.push(p);
        }
      } catch (e) {
        /* ignorer */
      }
    });
    return out;
  }

  function sammeAntall(a, b) {
    const ka = Object.keys(a).filter((k) => a[k]);
    const kb = Object.keys(b).filter((k) => b[k]);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => a[k] === b[k]);
  }

  /** Molar masse i g/mol (ladning ignoreres). */
  function molarMasse(str) {
    const p = typeof str === 'string' ? parse(str) : str;
    return Object.keys(p.antall).reduce((sum, el) => sum + KJ.grunnstoffMap[el].M * p.antall[el], 0);
  }

  /* ---------- Reaksjonslikninger ---------- */

  const PIL = /\s*(?:<=>|<->|⇌|⇄|->|-->|→|⟶|=>|=)\s*/;

  function parseSide(side) {
    const biter = side
      .split(/\s+\+\s+/)
      .reduce((acc, b) => acc.concat(b.split(/(?<=[A-Za-z0-9)\]])\+(?=\s*\d*\s*[A-Z([])/)), [])
      .map((b) => b.trim())
      .filter(Boolean);
    return biter.map((b) => {
      let koef = 1;
      let f = b.replace(/\((s|l|g|aq)\)$/i, '').trim();
      const m = /^(\d+)\s*(?=[A-Z(\[e])/.exec(f);
      if (m) {
        koef = parseInt(m[1], 10);
        f = f.slice(m[0].length);
      }
      return { koef, formel: f, p: parse(f) };
    });
  }

  function parseLikning(str) {
    const s = String(str).trim();
    const deler = s.split(PIL);
    if (deler.length !== 2) throw FeilFormel('Likningen må ha nøyaktig én reaksjonspil (->)');
    if (!deler[0].trim() || !deler[1].trim()) throw FeilFormel('Begge sider av pilen må ha stoffer');
    return { venstre: parseSide(deler[0]), hoyre: parseSide(deler[1]) };
  }

  /**
   * Teller atomer og ladning på hver side.
   * venstre/hoyre: lister med { koef, p } eller { koef, formel }.
   */
  function balanse(venstre, hoyre) {
    const sum = (side) => {
      const acc = {};
      let q = 0;
      side.forEach((s) => {
        const p = s.p || parse(s.formel);
        Object.keys(p.antall).forEach((el) => (acc[el] = (acc[el] || 0) + p.antall[el] * s.koef));
        q += p.ladning * s.koef;
      });
      return { acc, q };
    };
    const v = sum(venstre);
    const h = sum(hoyre);
    const els = [];
    const seen = new Set();
    venstre.concat(hoyre).forEach((s) => {
      const p = s.p || parse(s.formel);
      Object.keys(p.antall).forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          els.push(el);
        }
      });
    });
    const rader = els.map((el) => ({ el, v: v.acc[el] || 0, h: h.acc[el] || 0 }));
    const atomerOk = rader.every((r) => r.v === r.h);
    const ladningOk = v.q === h.q;
    return { rader, ladning: { v: v.q, h: h.q }, balansert: atomerOk && ladningOk, atomerOk, ladningOk };
  }

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a;
  }

  /* ---------- Elektronkonfigurasjon ---------- */

  const REKKE = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
  const KAP = { s: 2, p: 6, d: 10, f: 14 };
  const L = { s: 0, p: 1, d: 2, f: 3 };
  // Kjente unntak fra oppbyggingsprinsippet (grunntilstand).
  const UNNTAK = {
    24: { '4s': 1, '3d': 5 },
    29: { '4s': 1, '3d': 10 },
    41: { '5s': 1, '4d': 4 },
    42: { '5s': 1, '4d': 5 },
    44: { '5s': 1, '4d': 7 },
    45: { '5s': 1, '4d': 8 },
    46: { '5s': 0, '4d': 10 },
    47: { '5s': 1, '4d': 10 },
    57: { '4f': 0, '5d': 1 },
    58: { '4f': 1, '5d': 1 },
    64: { '4f': 7, '5d': 1 },
    78: { '6s': 1, '5d': 9 },
    79: { '6s': 1, '5d': 10 },
    89: { '5f': 0, '6d': 1 },
    90: { '5f': 0, '6d': 2 },
    91: { '5f': 2, '6d': 1 },
    92: { '5f': 3, '6d': 1 },
    93: { '5f': 4, '6d': 1 },
    96: { '5f': 7, '6d': 1 },
    103: { '6d': 0, '7p': 1 },
  };
  const EDELGASS = [
    [2, 'He'],
    [10, 'Ne'],
    [18, 'Ar'],
    [36, 'Kr'],
    [54, 'Xe'],
    [86, 'Rn'],
  ];

  function fyll(n) {
    const k = {};
    let igjen = n;
    for (const o of REKKE) {
      if (igjen <= 0) break;
      const c = Math.min(KAP[o[1]], igjen);
      k[o] = c;
      igjen -= c;
    }
    return k;
  }

  /** Konfigurasjon (objekt orbital -> antall) for atomnummer z med ladning q. */
  function konfig(z, q) {
    q = q || 0;
    let k;
    if (q < 0) {
      k = fyll(z - q);
    } else {
      k = fyll(z);
      if (UNNTAK[z]) Object.assign(k, UNNTAK[z]);
      let fjern = q;
      while (fjern > 0) {
        const kand = Object.keys(k)
          .filter((o) => k[o] > 0)
          .sort((a, b) => +b[0] - +a[0] || L[b[1]] - L[a[1]]);
        if (!kand.length) break;
        k[kand[0]]--;
        fjern--;
      }
    }
    Object.keys(k).forEach((o) => {
      if (!k[o]) delete k[o];
    });
    return k;
  }

  function sumE(k) {
    return Object.keys(k).reduce((s, o) => s + k[o], 0);
  }

  const supTall = (n) => String(n).split('').map((d) => SUP[+d]).join('');

  /** Formaterer konfigurasjon som tekst (unicode) i fyllingsrekkefølge. */
  function konfigTekst(k, edel) {
    let kjerne = null;
    let rest = Object.assign({}, k);
    if (edel) {
      const n = sumE(k);
      for (let i = EDELGASS.length - 1; i >= 0; i--) {
        const [ez, es] = EDELGASS[i];
        if (ez >= n) continue;
        const ek = fyll(ez);
        if (Object.keys(ek).every((o) => (k[o] || 0) >= ek[o])) {
          kjerne = es;
          Object.keys(ek).forEach((o) => {
            rest[o] -= ek[o];
            if (!rest[o]) delete rest[o];
          });
          break;
        }
      }
    }
    const deler = REKKE.filter((o) => rest[o]).map((o) => o + supTall(rest[o]));
    return (kjerne ? '[' + kjerne + '] ' : '') + deler.join(' ');
  }

  /** TeX-versjon for KaTeX. */
  function konfigTex(k, edel) {
    return konfigTekst(k, edel)
      .split(' ')
      .map((d) => {
        if (d[0] === '[') return '[\\mathrm{' + d.slice(1, -1) + '}]';
        const m = /^(\d)([spdf])(.+)$/.exec(d);
        if (!m) return d;
        const n = m[3].split('').map((c) => SUP.indexOf(c)).join('');
        return m[1] + '\\mathrm{' + m[2] + '}^{' + n + '}';
      })
      .join('\\,');
  }

  /** Tolker en konfigurasjon skrevet av eleven, f.eks. "[Ar] 4s2 3d6" eller "1s²2s²2p⁶". */
  function parseKonfig(str) {
    let s = String(str)
      .replace(/\s+/g, '')
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => SUP.indexOf(c))
      .replace(/\^/g, '')
      .replace(/[{}]/g, '');
    const k = {};
    let m = /^\[([A-Za-z]{1,2})\]/.exec(s);
    if (m) {
      const sym = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
      const eg = EDELGASS.find((e) => e[1] === sym);
      if (!eg) throw FeilFormel('[' + m[1] + '] er ikke en edelgass');
      Object.assign(k, fyll(eg[0]));
      s = s.slice(m[0].length);
    }
    while (s.length) {
      m = /^(\d)([spdfSPDF])(\d)(\d)?/.exec(s);
      if (!m) throw FeilFormel('Klarte ikke å lese «' + s + '». Skriv f.eks. 1s2 2s2 2p6');
      const orb = m[1] + m[2].toLowerCase();
      const typ = orb[1];
      // «2p63s2» og «3d104s2» uten mellomrom: bruk to siffer bare når det gir mening.
      let n = +m[3];
      let len = 3;
      if (m[4] != null) {
        const to = +(m[3] + m[4]);
        const nesteErUnderskall = /[spdfSPDF]/.test(s[4] || '');
        if (to <= KAP[typ] && !nesteErUnderskall) {
          n = to;
          len = 4;
        }
      }
      if (L[typ] >= +orb[0]) throw FeilFormel('Underskallet ' + orb + ' finnes ikke');
      if (n > KAP[typ]) throw FeilFormel(orb + ' kan maks ha ' + KAP[typ] + ' elektroner');
      k[orb] = (k[orb] || 0) + n;
      if (k[orb] > KAP[typ]) throw FeilFormel(orb + ' kan maks ha ' + KAP[typ] + ' elektroner');
      s = s.slice(len);
    }
    Object.keys(k).forEach((o) => {
      if (!k[o]) delete k[o];
    });
    return k;
  }

  function likeKonfig(a, b) {
    const ka = Object.keys(a).filter((o) => a[o]);
    const kb = Object.keys(b).filter((o) => b[o]);
    return ka.length === kb.length && ka.every((o) => a[o] === b[o]);
  }

  /** Antall elektroner per skall (K, L, M, ...). */
  function skall(k) {
    const arr = [];
    Object.keys(k).forEach((o) => {
      const n = +o[0];
      arr[n - 1] = (arr[n - 1] || 0) + k[o];
    });
    for (let i = 0; i < arr.length; i++) arr[i] = arr[i] || 0;
    return arr;
  }

  function valens(e) {
    if (e.z === 2) return 2;
    if (e.gruppe == null) return null;
    if (e.gruppe <= 2) return e.gruppe;
    if (e.gruppe >= 13) return e.gruppe - 10;
    return null;
  }

  function vanligIon(e) {
    const t = {
      1: '+', 2: '2+',
    };
    if (e.sym === 'H') return 'H+ / H-';
    if (e.blokk === 's' && e.gruppe && t[e.gruppe] && e.sym !== 'He') return e.sym + '^' + t[e.gruppe];
    const tab = { Al: '3+', Ga: '3+', N: '3-', P: '3-', O: '2-', S: '2-', Se: '2-', F: '-', Cl: '-', Br: '-', I: '-' };
    if (tab[e.sym]) return e.sym + '^' + tab[e.sym];
    return null;
  }

  KJ.kjemi = {
    normaliser,
    parse,
    tolkninger,
    sammeAntall,
    M: molarMasse,
    parseLikning,
    balanse,
    gcd,
    konfig,
    konfigTekst,
    konfigTex,
    parseKonfig,
    likeKonfig,
    skall,
    sumE,
    valens,
    vanligIon,
    REKKE,
    EDELGASS,
  };
})(window.KJ);
