/*
 * Elektronprikkformler (Lewis-strukturer) steg for steg.
 *
 * Strukturen beskrives i oppgaven som
 *   s: { a: 'N', l: 1, n: [{ a: 'H', b: 1, l: 0 }, ...] }
 * der a = atom, b = bindingsorden (1, 2 eller 3) og l = antall ledige elektronpar.
 * Toatomige molekyler har ett sentralatom og én nabo.
 * Alt annet (valenselektroner, form, polaritet, dipol) regnes ut fra strukturen.
 */
(function (KJ) {
  'use strict';
  const VALENS = { H: 1, B: 3, C: 4, Si: 4, N: 5, P: 5, O: 6, S: 6, F: 7, Cl: 7, Br: 7, I: 7 };
  KJ.VALENS = VALENS;

  const FORMER = ['lineær', 'vinklet', 'trigonal plan', 'trigonal pyramide', 'tetraedrisk'];
  KJ.LEWIS_FORMER = FORMER;

  function form(s) {
    if (s.n.length === 1) return 'lineær';
    const k = s.n.length + ':' + s.l;
    return { '2:0': 'lineær', '3:0': 'trigonal plan', '4:0': 'tetraedrisk', '3:1': 'trigonal pyramide', '2:2': 'vinklet', '2:1': 'vinklet' }[k] || '?';
  }

  const en = (a) => KJ.grunnstoffMap[a].en;
  const dEN = (a, b) => Math.round(Math.abs(en(a) - en(b)) * 10) / 10;

  /** Alt som kan regnes ut fra strukturen. */
  KJ.lewisData = function (q) {
    const s = q.s;
    const atomer = [s.a].concat(s.n.map((x) => x.a));
    const valens = atomer.reduce((a, x) => a + VALENS[x], 0) - (q.ladning || 0);
    const bindingspar = s.n.reduce((a, x) => a + x.b, 0);
    const ledigeTot = s.l + s.n.reduce((a, x) => a + x.l, 0);
    const diatom = s.n.length === 1;
    const bindinger = s.n.map((x) => ({ a: s.a, b: x.a, orden: x.b, d: dEN(s.a, x.a) }));
    const polare = bindinger.some((b) => b.d >= 0.5);
    const ion = !!q.ladning;
    const like = s.n.every((x) => x.a === s.n[0].a && x.b === s.n[0].b);
    const dipol = !ion && polare && (diatom || s.l > 0 || !like);
    return { valens, bindingspar, ledigeTot, ledigeSentral: s.l, diatom, form: form(s), polare, dipol, ion, bindinger, atomer };
  };

  /** Kontroll av at strukturen er en gyldig elektronprikkformel (brukes i testene). */
  KJ.lewisKontroll = function (q) {
    const s = q.s;
    const D = KJ.lewisData(q);
    const feil = [];
    const iStruktur = 2 * D.bindingspar + 2 * D.ledigeTot;
    if (iStruktur !== D.valens) feil.push('elektroner i strukturen ' + iStruktur + ' ≠ valenselektroner ' + D.valens);
    const okt = (a, e) => (a === 'H' ? e === 2 : a === 'B' ? e === 6 : e === 8);
    const eS = 2 * D.bindingspar + 2 * s.l;
    if (!okt(s.a, eS)) feil.push(s.a + ' (sentralt) har ' + eS + ' elektroner rundt seg');
    s.n.forEach((x) => {
      const e = 2 * x.b + 2 * x.l;
      if (!okt(x.a, e)) feil.push(x.a + ' har ' + e + ' elektroner rundt seg');
    });
    return feil;
  };

  /* ---------- Steg ---------- */
  KJ.lewisSteg = function (q) {
    const D = KJ.lewisData(q);
    const steg = [
      { k: 'valens', type: 'tall', tekst: 'Hvor mange valenselektroner har ' + (D.ion ? 'ionet' : 'molekylet') + ' til sammen?', svar: D.valens },
      { k: 'bindingspar', type: 'tall', tekst: 'Hvor mange bindende elektronpar? (En dobbeltbinding er to par.)', svar: D.bindingspar },
      { k: 'ledigeTot', type: 'tall', tekst: 'Hvor mange ledige elektronpar er det til sammen?', svar: D.ledigeTot },
    ];
    if (!D.diatom) steg.push({ k: 'ledigeSentral', type: 'tall', tekst: 'Hvor mange ledige elektronpar har sentralatomet ' + q.s.a + '?', svar: D.ledigeSentral });
    steg.push({ k: 'form', type: 'valg', tekst: 'Hvilken form har ' + (D.ion ? 'ionet' : 'molekylet') + '?', valg: FORMER, svar: D.form });
    steg.push({ k: 'polare', type: 'janei', tekst: 'Har ' + (D.ion ? 'ionet' : 'molekylet') + ' polare bindinger?', svar: D.polare });
    if (!D.ion) steg.push({ k: 'dipol', type: 'janei', tekst: 'Er molekylet en dipol?', svar: D.dipol });
    return steg;
  };

  function forklaring(q, k, D) {
    const s = q.s;
    const deler = D.atomer.map((a) => a + ' ' + VALENS[a]);
    switch (k) {
      case 'valens':
        return 'Valenselektroner: ' + deler.join(' + ') + (q.ladning ? (q.ladning > 0 ? ' − ' + q.ladning + ' (ladning ' + q.ladning + '+)' : ' + ' + -q.ladning + ' (ladning ' + -q.ladning + '−)') : '') + ' = ' + D.valens + '.';
      case 'bindingspar':
        return 'Bindingene: ' + s.n.map((x) => s.a + ['', '–', '=', '≡'][x.b] + x.a).join(', ') + ' gir ' + D.bindingspar + ' bindende par.';
      case 'ledigeTot':
        return 'Elektronpar totalt: ' + D.valens + ' / 2 = ' + D.valens / 2 + '. Ledige par = ' + D.valens / 2 + ' − ' + D.bindingspar + ' = ' + D.ledigeTot + '.';
      case 'ledigeSentral':
        return s.a + ' har ' + s.l + ' ledig' + (s.l === 1 ? 't par' : 'e par') + ' (' + (2 * D.bindingspar + 2 * s.l) + ' elektroner rundt ' + s.a + ' = oktett).';
      case 'form':
        return D.diatom
          ? 'To atomer ligger alltid på en rett linje.'
          : s.n.length + ' bindingsområder og ' + s.l + ' ledige par på sentralatomet gir ' + D.form + ' form.';
      case 'polare': {
        const b = D.bindinger.map((x) => x.a + '–' + x.b + ': ' + KJ.tall(x.d));
        const unike = [...new Set(b)];
        return 'ΔEN ' + unike.join(', ') + '. ' + (D.polare ? 'Minst én binding har ΔEN ≥ 0,5, altså polar.' : 'Alle under 0,5, altså upolare.');
      }
      case 'dipol':
        if (!D.polare) return 'Uten polare bindinger blir molekylet ikke en dipol.';
        if (D.dipol) return D.diatom ? 'Én polar binding gir en dipol.' : 'Polare bindinger og usymmetrisk form' + (s.l ? ' (ledige par på ' + s.a + ')' : ' (ulike atomer rundt ' + s.a + ')') + ': ladningene får hvert sitt tyngdepunkt.';
        return 'Polare bindinger, men formen er symmetrisk, så dipolene opphever hverandre.';
    }
    return '';
  }

  function norm(v, type) {
    if (v == null) return null;
    if (type === 'tall') {
      const t = String(v).trim();
      return t === '' ? null : /^\d+$/.test(t) ? +t : NaN;
    }
    if (type === 'janei') return v === 'ja' ? true : v === 'nei' ? false : null;
    return v === '' ? null : v;
  }

  KJ.rettLewis = function (q, svar) {
    svar = svar || {};
    const D = KJ.lewisData(q);
    const steg = KJ.lewisSteg(q);
    const deler = {};
    const linjer = [];
    let besvart = 0;
    steg.forEach((st, i) => {
      const v = norm(svar[st.k], st.type);
      if (v != null) besvart++;
      const ok = v === st.svar;
      deler[st.k] = ok;
      if (!ok && v != null) linjer.push('**Steg ' + (i + 1) + ':** ' + forklaring(q, st.k, D));
      else if (v == null) linjer.push('**Steg ' + (i + 1) + '** mangler svar.');
    });
    const ant = Object.values(deler).filter(Boolean).length;
    const riktig = ant === steg.length;
    if (!besvart) return { riktig: false, andel: 0, tomt: true, melding: 'Svar på stegene.' };
    return {
      riktig,
      andel: ant / steg.length,
      lewisDeler: deler,
      melding: riktig ? 'Riktig på alle ' + steg.length + ' stegene!' : ant + ' av ' + steg.length + ' steg riktig.<br>' + linjer.map(KJ.fmt).join('<br>'),
    };
  };

  /* ---------- SVG ---------- */
  const RET = { V: [-1, 0], H: [1, 0], N: [0, 1], O: [0, -1] };
  const PLASS = ['V', 'H', 'N', 'O'];

  KJ.lewisSvg = function (q, o) {
    o = o || {};
    const s = q.s;
    const D = KJ.lewisData(q);
    const L = 70;
    const deler = [];
    const pkt = [];
    const atom = (x, y, a) => {
      pkt.push([x, y]);
      deler.push('<text x="' + x + '" y="' + y + '" class="lw-atom" text-anchor="middle" dominant-baseline="central">' + a + '</text>');
    };
    const par = (x, y, ret, lbl) => {
      const [dx, dy] = RET[ret];
      const cx = x + dx * (19 + (lbl && lbl.length > 1 && dx ? 6 : 0));
      const cy = y + dy * 19;
      const px = dy !== 0 ? 5 : 0;
      const py = dx !== 0 ? 5 : 0;
      pkt.push([cx, cy]);
      deler.push('<circle cx="' + (cx - px) + '" cy="' + (cy - py) + '" r="2.6" class="lw-e"/><circle cx="' + (cx + px) + '" cy="' + (cy + py) + '" r="2.6" class="lw-e"/>');
    };
    const binding = (x1, y1, x2, y2, orden, a1, a2) => {
      const lx = x2 - x1;
      const ly = y2 - y1;
      const len = Math.hypot(lx, ly);
      const ux = lx / len;
      const uy = ly / len;
      // Lengre avstand langs x for atomsymboler med to bokstaver (Cl, Si).
      const kant = (lbl) => 15 + (lbl.length > 1 ? 7 * Math.abs(ux) : 0);
      const k1 = kant(a1);
      const k2 = kant(a2);
      const offs = orden === 1 ? [0] : orden === 2 ? [-3.5, 3.5] : [-6, 0, 6];
      offs.forEach((d) => {
        const nx = -uy * d;
        const ny = ux * d;
        deler.push('<line x1="' + (x1 + ux * k1 + nx) + '" y1="' + (y1 + uy * k1 + ny) + '" x2="' + (x2 - ux * k2 + nx) + '" y2="' + (y2 - uy * k2 + ny) + '" class="lw-b"/>');
      });
    };
    const delta = (x, y, tegn) => {
      deler.push('<text x="' + (x + 13) + '" y="' + (y - 17) + '" class="lw-d">δ' + tegn + '</text>');
      pkt.push([x + 22, y - 22]);
    };

    // Plasser naboene og de ledige parene rundt sentralatomet.
    const plasser = PLASS.slice(0, Math.max(2, s.n.length + s.l));
    if (s.n.length + s.l === 3) plasser.splice(0, 3, 'V', 'H', 'N');
    const nPlass = s.n.length === 1 ? ['H'] : s.n.map((_, i) => plasser[i]);
    const lPlass = plasser.slice(s.n.length, s.n.length + s.l);

    atom(0, 0, s.a);
    const enS = en(s.a);
    s.n.forEach((x, i) => {
      const [dx, dy] = RET[nPlass[i]];
      const X = dx * L;
      const Y = dy * L;
      atom(X, Y, x.a);
      binding(0, 0, X, Y, x.b, s.a, x.a);
      // Ledige par på naboatomet: først rett utover, så på sidene.
      const ut = nPlass[i];
      const sider = ut === 'V' || ut === 'H' ? ['O', 'N'] : ['V', 'H'];
      const rekke = x.l === 2 ? sider : [ut].concat(sider);
      rekke.slice(0, x.l).forEach((r) => par(X, Y, r, x.a));
      if (o.delta && D.polare) {
        const d = dEN(s.a, x.a);
        if (d >= 0.5) delta(X, Y, en(x.a) > enS ? '−' : '+');
      }
    });
    // Toatomig: ledige par på sentralatomet først rett utover (til venstre), så over og under.
    const sentralPar = s.n.length === 1 ? (s.l === 2 ? ['O', 'N'] : ['V', 'O', 'N']) : lPlass;
    sentralPar.slice(0, s.l).forEach((r) => par(0, 0, r, s.a));
    if (o.delta && D.polare) {
      const sentralPolar = D.bindinger.filter((b) => b.d >= 0.5);
      if (sentralPolar.length) {
        const mer = sentralPolar.every((b) => en(b.b) > enS);
        const mindre = sentralPolar.every((b) => en(b.b) < enS);
        if (mer) delta(0, 0, '+');
        else if (mindre) delta(0, 0, '−');
      }
    }

    let minX = Math.min(...pkt.map((p) => p[0])) - 22;
    let maxX = Math.max(...pkt.map((p) => p[0])) + 22;
    let minY = Math.min(...pkt.map((p) => p[1])) - 22;
    let maxY = Math.max(...pkt.map((p) => p[1])) + 22;
    if (D.ion) {
      deler.push('<path d="M' + (minX + 8) + ' ' + minY + ' h-8 v' + (maxY - minY) + ' h8 M' + (maxX - 8) + ' ' + minY + ' h8 v' + (maxY - minY) + ' h-8" class="lw-k"/>');
      const lad = Math.abs(q.ladning);
      deler.push('<text x="' + (maxX + 4) + '" y="' + (minY + 8) + '" class="lw-lad">' + (lad > 1 ? lad : '') + (q.ladning > 0 ? '+' : '−') + '</text>');
      maxX += 22;
    }
    minX -= 6;
    minY -= 6;
    maxX += 6;
    maxY += 6;
    const w = maxX - minX;
    const h = maxY - minY;
    return (
      '<svg class="lewis" viewBox="' + minX + ' ' + minY + ' ' + w + ' ' + h + '" width="' + Math.round(w * 1.15) + '" height="' + Math.round(h * 1.15) + '" role="img" aria-label="Elektronprikkformel for ' + KJ.esc(q.navn || q.formel) + '">' +
      deler.join('') +
      '</svg>'
    );
  };

  KJ.lewisFasitHtml = function (q) {
    const D = KJ.lewisData(q);
    const steg = KJ.lewisSteg(q);
    const vis = (st) => (st.type === 'janei' ? (st.svar ? 'ja' : 'nei') : st.svar);
    return (
      '<div class="lewis-fasit"><figure>' + KJ.lewisSvg(q, { delta: true }) + '<figcaption>' + KJ.esc(q.navn || '') + (D.polare ? ' · δ viser delladningene' : '') + '</figcaption></figure>' +
      '<ol class="lewis-svar">' + steg.map((st) => '<li><span>' + KJ.fmt(st.tekst) + '</span> <b>' + vis(st) + '</b></li>').join('') + '</ol></div>'
    );
  };
})(window.KJ);
