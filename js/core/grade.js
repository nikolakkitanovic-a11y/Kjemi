/*
 * Retting av svar. KJ.rett(oppgave, svar) er en ren funksjon som returnerer
 *   { riktig, andel (0–1), deler (per felt), melding (HTML), merknad (HTML) }
 * og brukes både i øving, feilbank og prøvemodus.
 */
(function (KJ) {
  'use strict';
  const C = KJ.kjemi;

  /* ---------- Tekst ---------- */
  function normTekst(s) {
    return String(s == null ? '' : s)
      .normalize('NFC')
      .toLowerCase()
      .replace(/[−–—]/g, '-')
      .replace(/[“”«»"]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/[.!]+$/, '')
      .trim();
  }
  KJ.normTekst = normTekst;

  const PREFIKS = ['mono', 'di', 'tri', 'tetra', 'penta', 'heksa', 'hepta', 'okta', 'nona', 'deka'];
  function normNavn(s) {
    let t = normTekst(s).replace(/[\s\-‐]/g, '');
    // «monoksid» = «monooksid», «pentoksid» = «pentaoksid» osv.
    PREFIKS.forEach((p) => {
      if (/[ao]$/.test(p)) t = t.split(p + 'oksid').join(p.slice(0, -1) + 'oksid');
    });
    t = t.replace(/\(([ivx]+)\)/g, '($1)');
    return t;
  }
  KJ.normNavn = normNavn;

  function levenshtein(a, b) {
    const m = a.length;
    const n = b.length;
    const d = Array.from({ length: m + 1 }, (_, i) => [i].concat(new Array(n).fill(0)));
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }

  /* ---------- Tall og enheter ---------- */
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  function parseTall(str) {
    if (str == null) return NaN;
    let s = String(str)
      .trim()
      .replace(/[−–]/g, '-')
      .replace(/\s+/g, '')
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, (m) => '^' + m.split('').map((c) => (c === '⁻' ? '-' : c === '⁺' ? '+' : SUP.indexOf(c))).join(''));
    if (!s) return NaN;
    s = s.replace(/[x×·*⋅]10\^?\(?([+-]?\d+)\)?$/i, 'e$1');
    s = s.replace(/^10\^\(?([+-]?\d+)\)?$/, '1e$1');
    s = s.replace(',', '.');
    if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(s)) return NaN;
    return parseFloat(s);
  }
  KJ.parseTall = parseTall;

  function gjeldendeSiffer(str) {
    let s = String(str).trim().replace(',', '.').replace(/\s+/g, '');
    s = s.replace(/[x×·*⋅]10.*$/i, '').replace(/e.*$/i, '').replace(/^[+-]/, '');
    if (!/\d/.test(s)) return 0;
    const harKomma = s.includes('.');
    let siffer = s.replace('.', '').replace(/^0+/, '');
    if (!harKomma) siffer = siffer.replace(/0+$/, '');
    return Math.max(1, siffer.length);
  }

  const ENHETER = {
    g: ['m', 1], mg: ['m', 1e-3], kg: ['m', 1e3], gram: ['m', 1],
    mol: ['n', 1], mmol: ['n', 1e-3], kmol: ['n', 1e3],
    l: ['v', 1], ml: ['v', 1e-3], dl: ['v', 0.1], cl: ['v', 0.01], dm3: ['v', 1], cm3: ['v', 1e-3], liter: ['v', 1],
    'g/mol': ['M', 1], 'kg/mol': ['M', 1e3],
    'mol/l': ['c', 1], m: ['c', 1], 'mmol/l': ['c', 1e-3], 'mol/dm3': ['c', 1],
    'g/l': ['cm', 1], 'mg/l': ['cm', 1e-3], 'g/ml': ['cm', 1e3],
    '%': ['p', 1], prosent: ['p', 1],
    u: ['u', 1],
    nm: ['len', 1e-9], pm: ['len', 1e-12],
    'kj/mol': ['E', 1], 'j/mol': ['E', 1e-3],
    '°c': ['T', 1], c: ['T', 1],
    molekyler: ['N', 1], atomer: ['N', 1], partikler: ['N', 1], ioner: ['N', 1], stk: ['N', 1],
  };
  function normEnhet(u) {
    let s = String(u == null ? '' : u)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[·⋅*]/g, '')
      .replace(/⁻¹|\^-1|\^\(-1\)|-1(?![0-9])/g, '^-1')
      .replace(/³|\^3/g, '3');
    s = s.replace(/^g(mol)\^-1$/, 'g/mol').replace(/^mol(l|dm3)\^-1$/, 'mol/$1').replace(/^kj(mol)\^-1$/, 'kj/mol');
    s = s.replace(/^gram\/mol$/, 'g/mol').replace(/^mol\/liter$/, 'mol/l').replace(/^molar$/, 'm');
    return s;
  }
  function enhet(u) {
    const n = normEnhet(u);
    return ENHETER[n] ? { kode: n, dim: ENHETER[n][0], f: ENHETER[n][1] } : null;
  }
  KJ.enhet = enhet;

  /* ---------- Fasit (vises etter svar) ---------- */
  function fasit(q) {
    switch (q.type) {
      case 'flervalg': {
        const idx = Array.isArray(q.svar) ? q.svar : [q.svar];
        return idx.map((i) => KJ.fmt(q.alternativer[i])).join('<br>');
      }
      case 'fyllinn':
        return q.svar.map((a, i) => (q.svar.length > 1 ? i + 1 + ': ' : '') + KJ.fmt([].concat(a)[0])).join(' · ');
      case 'tall':
        return KJ.tex((q.fasitTex || (q.heltall ? String(q.svar) : KJ.gsTex(q.svar, q.gs || 3))) + (q.enhet ? '\\enhet{' + q.enhet.replace(/%/g, '\\%') + '}' : ''));
      case 'balanser': {
        const f = (arr, off) => arr.map((s, i) => (q.svar[off + i] > 1 ? q.svar[off + i] : '') + s).join(' + ');
        return KJ.ce(f(q.reaktanter, 0) + ' -> ' + f(q.produkter, q.reaktanter.length));
      }
      case 'navn':
        return KJ.esc([].concat(q.svar)[0]);
      case 'formel':
        return KJ.ce(C.parse(q.svar).ce);
      case 'kobling':
        return '<ul class="fasit-liste">' + q.par.map((p) => '<li>' + KJ.fmt(p[0]) + ' → ' + KJ.fmt(p[1]) + '</li>').join('') + '</ul>';
      case 'rekkefolge':
        return q.elementer.map((e) => KJ.fmt(e)).join(' <span class="lt">&lt;</span> ');
      case 'sortering':
        return (
          '<ul class="fasit-liste">' +
          q.kategorier
            .map((k, ki) => '<li><strong>' + KJ.fmt(k) + ':</strong> ' + q.elementer.filter((e) => e[1] === ki).map((e) => KJ.fmt(e[0])).join(', ') + '</li>')
            .join('') +
          '</ul>'
        );
      case 'konfig': {
        const z = KJ.grunnstoffMap[q.grunnstoff].z;
        const k = C.konfig(z, q.ladning || 0);
        return KJ.tex(C.konfigTex(k, q.notasjon !== 'full')) + (q.notasjon === 'full' ? '' : ' <span class="muted">(' + KJ.tex(C.konfigTex(k, false)) + ')</span>');
      }
      case 'forklaring':
        return KJ.fmtBlock(q.modellsvar);
      default:
        return '';
    }
  }
  KJ.fasit = fasit;

  /* ---------- Retting per type ---------- */
  const R = {};

  R.flervalg = function (q, svar) {
    if (Array.isArray(q.svar)) {
      const valgt = (svar || []).slice().sort();
      const fasitSet = q.svar.slice().sort();
      const riktig = valgt.length === fasitSet.length && valgt.every((v, i) => v === fasitSet[i]);
      if (!valgt.length) return { riktig: false, andel: 0, tomt: true, melding: 'Velg ett eller flere alternativer.' };
      const treff = valgt.filter((v) => q.svar.includes(v)).length;
      const feil = valgt.length - treff;
      const andel = Math.max(0, (treff - feil) / q.svar.length);
      return {
        riktig,
        andel: riktig ? 1 : andel,
        melding: riktig
          ? 'Riktig!'
          : 'Ikke helt. Du har ' + treff + ' av ' + q.svar.length + ' riktige' + (feil ? ' og ' + feil + ' feil' : '') + ' valgt.',
      };
    }
    if (svar == null) return { riktig: false, andel: 0, tomt: true, melding: 'Velg et alternativ.' };
    const riktig = svar === q.svar;
    return { riktig, andel: riktig ? 1 : 0, melding: riktig ? 'Riktig!' : 'Ikke riktig.' };
  };

  R.fyllinn = function (q, svar) {
    svar = svar || [];
    if (svar.every((s) => !String(s || '').trim())) return { riktig: false, andel: 0, tomt: true, melding: 'Fyll inn feltene.' };
    const deler = q.svar.map((godkjent, i) => {
      const inn = svar[i];
      if (!String(inn || '').trim()) return false;
      return [].concat(godkjent).some((g) => {
        const gn = parseTall(g);
        const sn = parseTall(inn);
        if (!isNaN(gn) && !isNaN(sn)) return Math.abs(gn - sn) <= Math.max(1e-9, Math.abs(gn) * (q.toleranse || 0));
        return normTekst(g) === normTekst(inn) || normNavn(g) === normNavn(inn);
      });
    });
    const ant = deler.filter(Boolean).length;
    const riktig = ant === deler.length;
    return {
      riktig,
      andel: ant / deler.length,
      deler,
      melding: riktig ? 'Riktig!' : deler.length > 1 ? ant + ' av ' + deler.length + ' felt er riktige.' : 'Ikke riktig.',
    };
  };

  R.tall = function (q, svar) {
    svar = svar || {};
    let v = parseTall(svar.verdi);
    if (svar.eksp != null && String(svar.eksp).trim() !== '') {
      const e = parseTall(svar.eksp);
      if (isNaN(e)) v = NaN;
      else v = v * Math.pow(10, e);
    }
    if (!String(svar.verdi || '').trim()) return { riktig: false, andel: 0, tomt: true, melding: 'Skriv inn et tall.' };
    if (isNaN(v)) return { riktig: false, andel: 0, melding: 'Klarte ikke å lese tallet. Bruk komma eller punktum som desimaltegn, f.eks. 0,250 eller 6,02e23.' };

    let enhetMld = '';
    let enhetOk = true;
    if (q.enhet) {
      const forventet = enhet(q.enhet);
      const inn = String(svar.enhet || '').trim();
      if (!inn) {
        enhetOk = false;
        enhetMld = 'Husk enheten.';
      } else {
        const e = enhet(inn);
        if (!e || !forventet || e.dim !== forventet.dim) {
          enhetOk = false;
          enhetMld = 'Enheten «' + KJ.esc(inn) + '» passer ikke her.';
        } else {
          v = (v * e.f) / forventet.f;
        }
      }
    }
    const tol = q.abs != null ? q.abs : Math.abs(q.svar) * (q.toleranse != null ? q.toleranse : 0.01);
    const tallOk = Math.abs(v - q.svar) <= Math.max(tol, 1e-12);
    let merknad = '';
    if (tallOk && q.gs && !q.heltall) {
      const gs = gjeldendeSiffer(svar.verdi);
      if (Math.abs(gs - q.gs) >= 2) merknad = 'Tips: Svaret bør oppgis med ' + q.gs + ' gjeldende siffer (du brukte ' + gs + ').';
    }
    if (tallOk && enhetOk) return { riktig: true, andel: 1, melding: 'Riktig!', merknad };
    if (tallOk && !enhetOk) return { riktig: false, andel: 0.5, melding: 'Tallet er riktig, men ' + enhetMld.charAt(0).toLowerCase() + enhetMld.slice(1), merknad };
    let mld = 'Ikke riktig.';
    if (enhetMld) mld += ' ' + enhetMld;
    const ratio = v / q.svar;
    if (isFinite(ratio) && ratio > 0) {
      const l = Math.log10(ratio);
      if (Math.abs(l - Math.round(l)) < 0.005 && Math.round(l) !== 0) mld += ' Tallet ser ut til å være feil med en faktor 10' + (Math.abs(Math.round(l)) > 1 ? '^' + Math.round(l) : '') + '. Sjekk enhetene (g/kg, mL/L).';
    }
    return { riktig: false, andel: 0, melding: mld };
  };

  R.balanser = function (q, svar) {
    const alle = q.reaktanter.concat(q.produkter);
    const koef = alle.map((_, i) => {
      const s = String((svar || [])[i] == null ? '' : svar[i]).trim();
      if (s === '') return 1;
      return /^\d+$/.test(s) ? parseInt(s, 10) : NaN;
    });
    if (koef.some((k) => isNaN(k) || k < 1)) return { riktig: false, andel: 0, melding: 'Bruk bare hele, positive tall som koeffisienter (tomt felt = 1).' };
    const v = q.reaktanter.map((f, i) => ({ koef: koef[i], formel: f }));
    const h = q.produkter.map((f, i) => ({ koef: koef[q.reaktanter.length + i], formel: f }));
    const b = C.balanse(v, h);
    if (b.balansert) {
      const g = koef.reduce((a, x) => C.gcd(a, x));
      if (g > 1) return { riktig: false, andel: 0.5, melding: 'Likningen er balansert, men ikke med minste mulige heltall. Del alle koeffisientene på ' + g + '.' };
      return { riktig: true, andel: 1, melding: 'Riktig, likningen er balansert!' };
    }
    const skjev = b.rader.filter((r) => r.v !== r.h).map((r) => r.el + ' (' + r.v + ' venstre, ' + r.h + ' høyre)');
    let mld = 'Ikke balansert ennå.';
    if (skjev.length) mld += ' Sjekk ' + skjev.join(', ') + '.';
    if (!b.ladningOk) mld += ' Ladningen er ' + b.ladning.v + ' på venstre side og ' + b.ladning.h + ' på høyre side.';
    return { riktig: false, andel: 0, melding: mld, tabell: b };
  };

  R.navn = function (q, svar) {
    const inn = normNavn(svar);
    if (!inn) return { riktig: false, andel: 0, tomt: true, melding: 'Skriv navnet.' };
    const godkjent = [].concat(q.svar);
    if (godkjent.some((g) => normNavn(g) === inn)) return { riktig: true, andel: 1, melding: 'Riktig!' };
    const forste = normNavn(godkjent[0]);
    let mld = 'Ikke riktig.';
    if (/\(\d+\)/.test(inn)) mld = 'Bruk romertall for ladningen, f.eks. (III) i stedet for (3).';
    else if (/\([ivx]+\)/.test(forste) && !/\([ivx]+\)/.test(inn)) mld = 'Metallet kan ha flere ladninger, så husk romertall i parentes.';
    else if (!/\([ivx]+\)/.test(forste) && /\([ivx]+\)/.test(inn)) mld = 'Dette metallet har bare én vanlig ladning, så det skal ikke stå romertall.';
    else if (godkjent.some((g) => levenshtein(normNavn(g), inn) <= 2)) mld = 'Nesten! Sjekk stavemåten.';
    return { riktig: false, andel: 0, melding: mld };
  };

  R.formel = function (q, svar) {
    if (!String(svar || '').trim()) return { riktig: false, andel: 0, tomt: true, melding: 'Skriv formelen.' };
    const forventet = C.parse(q.svar);
    const tolk = C.tolkninger(svar);
    if (!tolk.length) {
      let mld = 'Klarte ikke å lese formelen.';
      try {
        C.parse(svar);
      } catch (e) {
        if (e.kjemi) mld = KJ.esc(e.message) + '.';
      }
      return { riktig: false, andel: 0, melding: mld };
    }
    if (tolk.some((t) => t.kanon === forventet.kanon)) return { riktig: true, andel: 1, melding: 'Riktig!' };
    const sammeAtomer = tolk.find((t) => C.sammeAntall(t.antall, forventet.antall) && t.ladning === forventet.ladning);
    if (sammeAtomer && q.rekkefolge === false) return { riktig: true, andel: 1, melding: 'Riktig!' };
    if (sammeAtomer)
      return {
        riktig: false,
        andel: 0.5,
        melding: 'Du har riktig antall av hvert atom, men skrivemåten er ikke riktig. Skriv kationet/det minst elektronegative grunnstoffet først og sammensatte ioner i parentes.',
      };
    return { riktig: false, andel: 0, melding: 'Ikke riktig.' };
  };

  R.kobling = function (q, svar) {
    svar = svar || [];
    if (svar.every((s) => s == null || s === '')) return { riktig: false, andel: 0, tomt: true, melding: 'Koble sammen parene.' };
    const deler = q.par.map((_, i) => svar[i] === i);
    const ant = deler.filter(Boolean).length;
    return { riktig: ant === deler.length, andel: ant / deler.length, deler, melding: ant === deler.length ? 'Riktig!' : ant + ' av ' + deler.length + ' koblinger er riktige.' };
  };

  R.rekkefolge = function (q, svar) {
    svar = svar || [];
    const deler = q.elementer.map((_, i) => svar[i] === i);
    const ant = deler.filter(Boolean).length;
    return { riktig: ant === deler.length, andel: ant / deler.length, deler, melding: ant === deler.length ? 'Riktig rekkefølge!' : ant + ' av ' + deler.length + ' står på riktig plass.' };
  };

  R.sortering = function (q, svar) {
    svar = svar || [];
    if (svar.every((s) => s == null)) return { riktig: false, andel: 0, tomt: true, melding: 'Plasser elementene i kategorier.' };
    const deler = q.elementer.map((e, i) => svar[i] === e[1]);
    const ant = deler.filter(Boolean).length;
    return { riktig: ant === deler.length, andel: ant / deler.length, deler, melding: ant === deler.length ? 'Riktig!' : ant + ' av ' + deler.length + ' er plassert riktig.' };
  };

  R.konfig = function (q, svar) {
    if (!String(svar || '').trim()) return { riktig: false, andel: 0, tomt: true, melding: 'Skriv elektronkonfigurasjonen.' };
    const z = KJ.grunnstoffMap[q.grunnstoff].z;
    const fasitK = C.konfig(z, q.ladning || 0);
    let k;
    try {
      k = C.parseKonfig(svar);
    } catch (e) {
      return { riktig: false, andel: 0, melding: KJ.esc(e.message) + '.' };
    }
    if (C.likeKonfig(k, fasitK)) {
      let merknad = '';
      const brukteEdel = /^\s*\[/.test(svar);
      if (q.notasjon === 'edelgass' && !brukteEdel) merknad = 'Oppgaven ba om edelgassnotasjon: ' + KJ.tex(C.konfigTex(fasitK, true));
      if (q.notasjon === 'full' && brukteEdel) merknad = 'Oppgaven ba om full notasjon: ' + KJ.tex(C.konfigTex(fasitK, false));
      return { riktig: true, andel: 1, melding: 'Riktig!', merknad };
    }
    const n = C.sumE(k);
    const nf = C.sumE(fasitK);
    let mld;
    if (n !== nf) mld = 'Du har ' + n + ' elektroner, men det skal være ' + nf + '.';
    else {
      mld = 'Riktig antall elektroner (' + nf + '), men fordelingen er ikke riktig.';
      if ((q.ladning || 0) > 0 && KJ.grunnstoffMap[q.grunnstoff].blokk === 'd') mld += ' Husk at innskuddsmetaller mister 4s-elektronene før 3d-elektronene.';
      if ([24, 29, 42, 47, 79].includes(z) && !q.ladning) mld += ' Dette grunnstoffet er et kjent unntak.';
    }
    return { riktig: false, andel: 0, melding: mld };
  };

  R.forklaring = function (q, svar) {
    svar = svar || {};
    const kryss = svar.kryss || [];
    const ant = q.punkter.filter((_, i) => kryss[i]).length;
    const andel = q.punkter.length ? ant / q.punkter.length : 0;
    return {
      riktig: ant === q.punkter.length,
      andel,
      melding: ant === q.punkter.length ? 'Flott, du fikk med alle hovedpunktene.' : 'Du fikk med ' + ant + ' av ' + q.punkter.length + ' hovedpunkter.',
    };
  };

  KJ.rett = function (q, svar) {
    const f = R[q.type];
    if (!f) return { riktig: false, andel: 0, melding: 'Ukjent oppgavetype' };
    return f(q, svar);
  };
})(window.KJ);
