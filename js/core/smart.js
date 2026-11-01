/*
 * Smart øving og øvingsplan.
 * Prioriterer læringsmålene etter selvvurderingen (rød, gul, grønn) og resultatene,
 * og velger oppgaver der du er svakest.
 */
(function (KJ) {
  'use strict';
  const S = KJ.store;

  const BASE = { rod: 6, gul: 3, gronn: 1 };
  /** Nivåvekter [_, grunnleggende, middels, høy] etter hvor godt du kan målet. */
  const NIVAVEKT = { rod: [0, 3, 2, 0.6], gul: [0, 1, 3, 2], gronn: [0, 0.4, 1.5, 3], ny: [0, 2.5, 2, 1] };
  const LYSNAVN = { rod: 'rødt', gul: 'gult', gronn: 'grønt' };

  /** Hvor mye et mål trenger øving. Høyere tall = svakere. */
  function prioritet(nr) {
    const sv = S.selv(nr);
    const r = S.malResultat(nr);
    let p = sv ? BASE[sv.verdi] : 4.5;
    p += (1 - r.andel) * 2;
    p += Math.min(r.feilNa, 3) * 0.5;
    return p;
  }

  /** Alle mål sortert fra svakest til sterkest. */
  KJ.malPrioritert = function (utvalg) {
    const nrs = utvalg && utvalg.length ? utvalg : KJ.MAL.map((m) => m.nr);
    return nrs
      .map((nr) => {
        const sv = S.selv(nr);
        return { nr, verdi: sv ? sv.verdi : null, p: prioritet(nr), r: S.malResultat(nr) };
      })
      .sort((a, b) => b.p - a.p || a.nr - b.nr);
  };

  function vektetTrekk(liste, vekt) {
    const v = liste.map(vekt);
    const sum = v.reduce((a, b) => a + b, 0);
    if (!sum) return liste[Math.floor(Math.random() * liste.length)];
    let x = Math.random() * sum;
    for (let i = 0; i < liste.length; i++) {
      x -= v[i];
      if (x <= 0) return liste[i];
    }
    return liste[liste.length - 1];
  }

  function oppgaveGrunn(q) {
    if (S.iFeilbank(q.id)) return 'ligger i feilbanken';
    const s = S.status(q.id);
    if (!s) return 'ny oppgave';
    if (!s.ok) return 'du svarte feil sist';
    return 'repetisjon';
  }

  /**
   * Velger neste oppgave.
   * o.mal: liste med målnumre (tom = alle). o.nylig: id-er som nettopp er vist.
   * Returnerer { q, nr, verdi, grunn }.
   */
  KJ.smartVelg = function (o) {
    o = o || {};
    const nylig = new Set(o.nylig || []);
    const mal = KJ.malPrioritert(o.mal);
    const kandidater = mal.filter((m) => KJ.malOppgaver(m.nr).length);
    if (!kandidater.length) return null;
    const m = vektetTrekk(kandidater, (x) => x.p * x.p);
    let pool = KJ.malOppgaver(m.nr);
    const fri = pool.filter((q) => !nylig.has(q.id));
    if (fri.length) pool = fri;
    const nv = NIVAVEKT[m.verdi || 'ny'];
    const q = vektetTrekk(pool, (x) => {
      const s = S.status(x.id);
      let v = S.iFeilbank(x.id) ? 5 : !s ? 3 : !s.ok ? 4 : x.type === 'gen' ? 1.2 : 0.6;
      return v * nv[x.niva];
    });
    const malTekst = 'Mål ' + m.nr + ' er ' + (m.verdi ? LYSNAVN[m.verdi] : 'ikke vurdert ennå');
    return { q, nr: m.nr, verdi: m.verdi, grunn: malTekst + ' · ' + oppgaveGrunn(q) };
  };

  /* ---------- Øvingsplan ---------- */
  const MIN = { rod: 20, gul: 12, gronn: 5, null: 12 };
  const dagStart = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  /**
   * Plan fra i dag til dagen før prøven, bygd på selvvurderingen.
   * Returnerer { status: 'plan'|'idag'|'over', dager, okter: [{ dato, mal: [...], siste, min }] }.
   */
  KJ.ovingsplan = function (idag) {
    const d0 = dagStart(idag || new Date());
    const [aa, mm, dd] = KJ.PROVE.dato.split('-').map(Number);
    const prove = new Date(aa, mm - 1, dd);
    const dager = Math.round((prove - d0) / 86400000);
    if (dager < 0) return { status: 'over', dager };
    if (dager === 0) return { status: 'idag', dager };

    const alle = KJ.malPrioritert();
    const svake = alle.filter((m) => m.verdi !== 'gronn');
    const gronne = alle.filter((m) => m.verdi === 'gronn');
    // Vanlige dager teller 1, siste dag 0,5 (den er satt av til repetisjon og prøvesimulering).
    const kap = [];
    for (let i = 0; i < dager; i++) kap.push(i === dager - 1 && dager > 1 ? 0.5 : 1);
    const sumKap = kap.reduce((a, b) => a + b, 0);
    const okter = [];
    let start = 0;
    kap.forEach((k, i) => {
      const slutt = i === dager - 1 ? svake.length : Math.min(svake.length, start + Math.round((svake.length * k) / sumKap));
      const dato = new Date(d0.getFullYear(), d0.getMonth(), d0.getDate() + i);
      const mal = svake.slice(start, slutt);
      start = slutt;
      okter.push({ dato, mal, siste: i === dager - 1, idag: i === 0 });
    });
    const siste = okter[okter.length - 1];
    siste.gronne = gronne;
    okter.forEach((o) => {
      o.min = o.mal.reduce((a, m) => a + MIN[m.verdi], 0) + (o.siste ? 40 + 15 : 0);
    });
    return { status: 'plan', dager, okter, ikkeVurdert: alle.filter((m) => !m.verdi).length };
  };
})(window.KJ);

/* ---------- Oppfølging etter en prøve ---------- */
(function (KJ) {
  'use strict';
  const S = KJ.store;

  /**
   * Velger nye oppgaver fra målene som gikk dårlig på prøven h (fra historikken).
   * Mål under 60 % tas med, de svakeste først. Er ingen under 60 %, brukes de tre svakeste under 100 %.
   * Oppgaver som var med på prøven, tas ikke med. Per mål: lett → vanskelig, helst oppgaver du ikke har mestret.
   * Høyst 8 mål per runde. fra = hvor mange av de svake målene som allerede er øvd på (neste runde).
   */
  KJ.OPPFOLGING_MAKS_MAL = 8;
  KJ.oppfolgingOppgaver = function (h, fra) {
    fra = fra || 0;
    const res = (h && h.mal) || {};
    const brukt = new Set((h && h.ids) || []);
    const sorter = (a, b) => res[a] - res[b] || a - b;
    const alle = Object.keys(res).map(Number).filter((nr) => KJ.malInfo(nr));
    let svake = alle.filter((nr) => res[nr] < 60).sort(sorter);
    let lavest = false;
    if (!svake.length) {
      svake = alle.filter((nr) => res[nr] < 100).sort(sorter).slice(0, 3);
      lavest = true;
    }
    const alleSvake = svake;
    svake = svake.slice(fra, fra + KJ.OPPFOLGING_MAKS_MAL);
    const per = svake.length > 5 ? 2 : 3;
    const nivaer = per === 3 ? [1, 2, 3] : [1, 2];
    const valgt = new Set();
    const perMal = {};
    const tilfeldig = (liste) => liste[Math.floor(Math.random() * liste.length)];
    const ikkeMestret = (q) => {
      const s = S.status(q.id);
      return !s || !s.ok;
    };
    svake.forEach((nr) => {
      const pool = () => KJ.malOppgaver(nr).filter((q) => !brukt.has(q.id) && !valgt.has(q.id));
      const ut = [];
      nivaer.forEach((n) => {
        const p = pool();
        if (!p.length) return;
        const paaNiva = p.filter((q) => q.niva === n);
        const kand = paaNiva.length ? paaNiva : p;
        const best = kand.filter(ikkeMestret);
        const q = tilfeldig(best.length ? best : kand);
        valgt.add(q.id);
        ut.push(q);
      });
      perMal[nr] = ut.sort((a, b) => a.niva - b.niva).map((q) => q.id);
    });
    const ids = [];
    svake.forEach((nr) => perMal[nr].forEach((id) => ids.push(id)));
    return { svake, lavest, ids, perMal, fra, totaltSvake: alleSvake.length, igjen: Math.max(0, alleSvake.length - fra - svake.length) };
  };
})(window.KJ);
