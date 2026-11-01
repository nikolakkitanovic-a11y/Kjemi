/*
 * Orbitaldiagram: oppsett, retting (oppbyggingsprinsippet, Pauli og Hund) og fasit.
 * Boksene har tilstandene '' (tom), 'u' (↑), 'd' (↓), 'ud' (↑↓) og 'uu' (↑↑, bryter Pauli).
 */
(function (KJ) {
  'use strict';
  const C = KJ.kjemi;
  const ANT = { s: 1, p: 3, d: 5, f: 7 };
  const PIL = { '': '', u: '↑', d: '↓', ud: '↑↓', uu: '↑↑' };
  KJ.ORB_PIL = PIL;
  KJ.ORB_SYKLUS = ['', 'u', 'd', 'ud', 'uu'];
  const antE = (s) => (s === 'ud' || s === 'uu' ? 2 : s ? 1 : 0);

  /** Hvilke rader (underskall) diagrammet skal ha, og hva som er riktig fylling. */
  KJ.orbitalOppsett = function (q) {
    const e = KJ.grunnstoffMap[q.grunnstoff];
    const k = C.konfig(e.z, q.ladning || 0);
    const n = C.sumE(k);
    let kjerne = null;
    let kjerneE = 0;
    if (n > 10) {
      for (let i = C.EDELGASS.length - 1; i >= 0; i--) {
        const [ez, es] = C.EDELGASS[i];
        if (ez >= n || ez < 10) continue;
        kjerne = es;
        kjerneE = ez;
        break;
      }
    }
    const kjerneK = kjerne ? C.konfig(kjerneE, 0) : {};
    const rekke = C.REKKE;
    const forste = rekke.findIndex((o) => !kjerneK[o]);
    let siste = -1;
    rekke.forEach((o, i) => {
      if ((k[o] || 0) > (kjerneK[o] || 0)) siste = Math.max(siste, i);
    });
    const rader = rekke.slice(forste, Math.min(rekke.length, siste + 2)).map((o) => ({ orb: o, bokser: ANT[o[1]], forventet: k[o] || 0 }));
    return { kjerne, kjerneE, rader, k, n };
  };

  /** Riktig fylling av én rad etter Hunds regel (↑ først, så ↓). */
  function fyllRad(antBokser, e) {
    const b = new Array(antBokser).fill('');
    for (let i = 0; i < e; i++) {
      const j = i % antBokser;
      b[j] = i < antBokser ? 'u' : 'ud';
    }
    return b;
  }
  KJ.fyllOrbitalRad = fyllRad;

  KJ.rettOrbital = function (q, svar) {
    const L = KJ.orbitalOppsett(q);
    const bokser = svar.bokser || {};
    const feil = [];
    const radOk = {};
    let total = L.kjerneE;
    let pauli = false;
    let hund = false;
    let hundRad = null;
    L.rader.forEach((r) => {
      const b = bokser[r.orb] || new Array(r.bokser).fill('');
      const c = b.reduce((a, s) => a + antE(s), 0);
      total += c;
      const harPauli = b.includes('uu');
      if (harPauli) pauli = true;
      let brytHund = false;
      if (r.bokser > 1) {
        const tom = b.some((s) => s === '');
        const par = b.some((s) => s === 'ud' || s === 'uu');
        const enkle = b.filter((s) => s === 'u' || s === 'd');
        if (tom && par) brytHund = true;
        if (enkle.includes('u') && enkle.includes('d')) brytHund = true;
      }
      if (brytHund && !hund) {
        hund = true;
        hundRad = r.orb;
      }
      radOk[r.orb] = c === r.forventet && !harPauli && !brytHund;
    });
    if (total !== L.n) feil.push('Antall elektroner: du har plassert ' + total + ', men det skal være ' + L.n + '.');
    if (pauli) feil.push('**Pauliprinsippet:** to elektroner i samme orbital må ha motsatt spinn (↑↓), ikke ↑↑.');
    const avvik = L.rader.filter((r) => (bokser[r.orb] || []).reduce((a, s) => a + antE(s), 0) !== r.forventet);
    if (total === L.n && avvik.length) {
      const e = KJ.grunnstoffMap[q.grunnstoff];
      const r4s = L.rader.find((r) => r.orb === '4s');
      const har4s = r4s && (bokser['4s'] || []).reduce((a, s) => a + antE(s), 0) > 0;
      if ((q.ladning || 0) > 0 && e.blokk === 'd' && r4s && r4s.forventet === 0 && har4s) {
        feil.push('**Innskuddsmetaller avgir 4s-elektronene først.** 4s skal være tom i dette ionet.');
      } else if ([24, 29].includes(e.z) && !q.ladning) {
        feil.push('**Unntak:** ' + e.navn + ' har bare ett elektron i 4s, fordi ' + (e.z === 24 ? 'halvfullt' : 'fullt') + ' 3d-underskall er ekstra stabilt.');
      } else {
        feil.push('**Oppbyggingsprinsippet:** fyll underskallene med lavest energi først. Sjekk ' + avvik.map((r) => r.orb).join(' og ') + '.');
      }
    }
    if (hund) feil.push('**Hunds regel:** i ' + hundRad + ' skal hver orbital få ett elektron med samme spinn (↑ ↑ ↑) før noen får to.');
    const diagramOk = !feil.length;

    let konfigOk = true;
    const konfDeler = {};
    if (q.konfig) {
      const sjekkK = (tekst, edel) => {
        if (!String(tekst || '').trim()) return false;
        try {
          const kk = C.parseKonfig(tekst);
          if (!C.likeKonfig(kk, L.k)) return false;
          return edel ? /^\s*\[/.test(tekst) : !/^\s*\[/.test(tekst);
        } catch (e) {
          return false;
        }
      };
      konfDeler.full = sjekkK(svar.full, false);
      konfDeler.edel = L.n > 2 ? sjekkK(svar.edel, true) : true;
      if (!konfDeler.full) feil.push('Den fulle elektronkonfigurasjonen er ikke riktig' + (/^\s*\[/.test(svar.full || '') ? ' (her skal du skrive alle underskallene, uten edelgass)' : '') + '.');
      if (!konfDeler.edel) feil.push('Konfigurasjonen med edelgasskjerne er ikke riktig' + (svar.edel && !/^\s*\[/.test(svar.edel) ? ' (start med edelgassen i hakeparentes, f.eks. [Ne])' : '') + '.');
      konfigOk = konfDeler.full && konfDeler.edel;
    }
    const deler = [diagramOk].concat(q.konfig ? [konfDeler.full, konfDeler.edel] : []);
    const ant = deler.filter(Boolean).length;
    const riktig = diagramOk && konfigOk;
    const tomt = !Object.values(bokser).some((b) => b.some((s) => s)) && !String(svar.full || '').trim();
    return {
      riktig,
      tomt,
      andel: ant / deler.length,
      radOk,
      konfDeler,
      melding: tomt ? 'Plasser elektronene i boksene.' : riktig ? 'Riktig! Diagrammet følger oppbyggingsprinsippet, Pauli og Hund.' : feil.map(KJ.fmt).join('<br>'),
    };
  };

  /** Statisk diagram (til fasit og teori). */
  KJ.orbitalDiagramHtml = function (q) {
    const L = KJ.orbitalOppsett(q);
    return (
      '<div class="orbdia orbdia-fasit">' +
      (L.kjerne ? '<div class="orb-rad"><span class="orb-l">[' + L.kjerne + ']</span><span class="muted" style="font-size:.85rem">edelgasskjerne (' + L.kjerneE + ' elektroner)</span></div>' : '') +
      L.rader
        .map(
          (r) =>
            '<div class="orb-rad"><span class="orb-l">' + r.orb + '</span><div class="orb-boxes">' +
            fyllRad(r.bokser, r.forventet).map((s) => '<span class="orb-box">' + PIL[s] + '</span>').join('') +
            '</div></div>'
        )
        .join('') +
      '</div>'
    );
  };

  KJ.orbitalFasitHtml = function (q) {
    const L = KJ.orbitalOppsett(q);
    return (
      KJ.orbitalDiagramHtml(q) +
      '<p style="margin:8px 0 0">' + KJ.tex(C.konfigTex(L.k, false)) + (L.n > 2 ? '<br>' + KJ.tex(C.konfigTex(L.k, true)) : '') + '</p>'
    );
  };
})(window.KJ);
