/*
 * Markeringsoppgaver: eleven trykker i en strukturtegning der det virker krefter.
 * Svaret er en liste med markører { x, y, t } i tegningens koordinater.
 * En sone er truffet når en markør av riktig type ligger innenfor radien.
 */
(function (KJ) {
  'use strict';
  /** Tekst i tegningen: CH3 → CH₃, Na+ → Na⁺, COO- → COO⁻. */
  function pen(t) {
    return t
      .replace(/(\d)/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[+d])
      .replace(/\+$/, '⁺')
      .replace(/-$/, '⁻');
  }

  function atomKlasse(t) {
    if (!t) return '';
    if (/^(CH|COO|NH3|OH)/.test(t)) return 'gr';
    const sym = t.replace(/[+-]$/, '');
    return 'el el-' + sym + (/[+-]$/.test(t) ? ' ion' : '');
  }

  /** Selve tegningen (uten markører). */
  KJ.strukturSvgInnhold = function (S) {
    const ut = [];
    if (S.rygg) ut.push('<path d="' + S.rygg + '" class="mk-rygg"/>');
    S.bindinger.forEach(([a, b, o]) => {
      const [x1, y1] = S.atomer[a];
      const [x2, y2] = S.atomer[b];
      if (o === 2) {
        const len = Math.hypot(x2 - x1, y2 - y1);
        const nx = (-(y2 - y1) / len) * 3;
        const ny = ((x2 - x1) / len) * 3;
        ut.push('<line x1="' + (x1 + nx) + '" y1="' + (y1 + ny) + '" x2="' + (x2 + nx) + '" y2="' + (y2 + ny) + '" class="mk-b"/>');
        ut.push('<line x1="' + (x1 - nx) + '" y1="' + (y1 - ny) + '" x2="' + (x2 - nx) + '" y2="' + (y2 - ny) + '" class="mk-b"/>');
      } else ut.push('<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="mk-b"/>');
    });
    S.atomer.forEach(([x, y, t]) => {
      if (!t) return;
      const k = atomKlasse(t);
      const tekst = pen(t);
      if (k === 'gr') {
        const w = 14 + tekst.length * 9.5;
        ut.push('<rect x="' + (x - w / 2) + '" y="' + (y - 13) + '" width="' + w + '" height="26" rx="13" class="mk-a gr' + (/[+-]$/.test(t) ? ' gr-ion' : '') + '"/>');
      } else {
        const r = /[+-]$/.test(t) ? 18 : t === 'H' ? 10 : 13;
        ut.push('<circle cx="' + x + '" cy="' + y + '" r="' + r + '" class="mk-a ' + k + '"/>');
      }
      ut.push('<text x="' + x + '" y="' + y + '" class="mk-t' + (t === 'H' ? ' mk-h' : '') + '" text-anchor="middle" dominant-baseline="central">' + tekst + '</text>');
    });
    return ut.join('');
  };

  KJ.strukturSvg = function (S, ekstra, klasse) {
    return (
      '<svg class="mk-svg ' + (klasse || '') + '" viewBox="0 0 ' + S.w + ' ' + S.h + '" role="img" aria-label="' + KJ.esc(S.tittel) + '">' +
      '<rect x="0" y="0" width="' + S.w + '" height="' + S.h + '" class="mk-bg"/>' +
      KJ.strukturSvgInnhold(S) +
      (ekstra || '') +
      '</svg>'
    );
  };

  KJ.markorSvg = function (m, status) {
    const T = KJ.KRAFTTYPER[m.t] || { kort: '?' };
    return (
      '<g class="mk-m mk-' + m.t + (status ? ' mk-' + status : '') + '" data-mi="' + m.i + '" transform="translate(' + m.x + ' ' + m.y + ')">' +
      '<circle r="14"/><text text-anchor="middle" dominant-baseline="central">' + T.kort + '</text></g>'
    );
  };

  KJ.markeringSoner = function (q) {
    const S = KJ.STRUKTURER[q.struktur];
    return S.soner.filter((s) => q.typer.includes(s.type));
  };

  KJ.rettMarkering = function (q, svar) {
    const m = (svar && svar.m) || [];
    if (!m.length) return { riktig: false, andel: 0, tomt: true, melding: 'Trykk i tegningen for å sette markører.' };
    const soner = KJ.markeringSoner(q);
    const alle = KJ.STRUKTURER[q.struktur].soner;
    const inne = (p, s) => Math.hypot(p.x - s.x, p.y - s.y) <= s.r;
    const truffet = soner.map(() => false);
    const status = m.map((p) => {
      const i = soner.findIndex((s) => s.type === p.t && inne(p, s));
      if (i >= 0) {
        if (truffet[i]) return 'dobbel';
        truffet[i] = true;
        return 'treff';
      }
      const annen = alle.find((s) => inne(p, s));
      return annen ? (q.typer.includes(annen.type) ? 'type' : 'utenfor') : 'bom';
    });
    const treff = truffet.filter(Boolean).length;
    const bom = status.filter((s) => s !== 'treff' && s !== 'dobbel').length;
    const andel = Math.max(0, (treff - 0.5 * bom) / soner.length);
    const riktig = treff === soner.length && bom === 0;
    const linjer = [];
    linjer.push(treff + ' av ' + soner.length + ' treff' + (bom ? ', ' + bom + ' bom' : '') + '.');
    if (status.includes('type')) linjer.push('En markør står på riktig sted, men har feil type kraft.');
    if (status.includes('utenfor')) linjer.push('En markør står der det virker en annen kraft enn den oppgaven spør om.');
    if (status.includes('bom')) linjer.push('Røde markører står der det ikke virker noen kraft mellom partikler. Tenk på hvor δ+ møter δ−, hvor ioner møter vann, og hvor upolare deler ligger inntil hverandre.');
    if (treff < soner.length) linjer.push('Du mangler ' + (soner.length - treff) + ' sted' + (soner.length - treff > 1 ? 'er' : '') + '.');
    return { riktig, andel, markorStatus: status, melding: riktig ? 'Riktig! Du fant alle ' + soner.length + ' stedene.' : linjer.join(' ') };
  };

  KJ.markeringFasitHtml = function (q) {
    const S = KJ.STRUKTURER[q.struktur];
    const soner = KJ.markeringSoner(q);
    const ekstra = soner
      .map((s, i) => '<g class="mk-sone mk-' + s.type + '"><circle cx="' + s.x + '" cy="' + s.y + '" r="' + s.r + '"/><text x="' + s.x + '" y="' + s.y + '" text-anchor="middle" dominant-baseline="central">' + (i + 1) + '</text></g>')
      .join('');
    return (
      '<div class="mk-fasit"><div class="mk-wrap">' + KJ.strukturSvg(S, ekstra, 'mk-statisk') + '</div>' +
      '<ol class="mk-liste">' + soner.map((s) => '<li><b>' + KJ.KRAFTTYPER[s.type].navn + ':</b> ' + KJ.fmt(s.tekst) + '</li>').join('') + '</ol></div>'
    );
  };

  KJ.krafttypeForklaring = function (typer) {
    return typer.map((t) => '<span class="mk-leg mk-' + t + '"><i>' + KJ.KRAFTTYPER[t].kort + '</i>' + KJ.KRAFTTYPER[t].navn + '</span>').join('');
  };
})(window.KJ);
