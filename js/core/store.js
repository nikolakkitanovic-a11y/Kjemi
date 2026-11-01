/*
 * Lagring av fremdrift, feilbank, flashcards, selvvurdering og prøveresultater i localStorage.
 * Alt er pakket i try/catch slik at siden fungerer også når lagring er blokkert
 * (privat vindu e.l.) – da lagres ingenting mellom besøk.
 *
 * Versjon 2 (moduler etter læringsmål): oppgave-id-ene er de samme som før, så
 * svarene følger med. Flashcards har fått nye id-er (k:<hash>) og migreres automatisk.
 */
(function (KJ) {
  'use strict';
  const NOKKEL = 'kjemi1-spektrum-v1';
  const VERSJON = 2;
  /** Antall riktige svar på rad (på første forsøk) før en oppgave forsvinner fra feilbanken. */
  const RAD_KRAV = 2;
  KJ.RAD_KRAV = RAD_KRAV;

  const tom = () => ({ v: VERSJON, q: {}, err: {}, fc: {}, selv: {}, prover: [], sist: null, prove: null, tema: 'auto' });
  let S = tom();

  /** Oppgraderer lagrede data fra eldre versjoner uten å miste noe. */
  function migrer(d) {
    const ut = Object.assign(tom(), d);
    if (!d.v || d.v < 2) {
      // Flashcards: «<tema>:<hash>» → «k:<hash>»
      const fc = {};
      Object.keys(d.fc || {}).forEach((k) => {
        const hash = k.split(':').pop();
        fc['k:' + hash] = d.fc[k];
      });
      ut.fc = fc;
      // Feilbank: nytt felt «rad» (riktige på rad)
      Object.keys(ut.err).forEach((id) => (ut.err[id] = Object.assign({ rad: 0 }, ut.err[id])));
      // «Fortsett der du slapp» pekte på et tema; nå en modul
      ut.sist = null;
      ut.selv = ut.selv || {};
      ut.v = VERSJON;
    }
    return ut;
  }

  function last() {
    try {
      const raw = localStorage.getItem(NOKKEL);
      if (raw) {
        const d = JSON.parse(raw);
        S = migrer(d);
        if (!d.v || d.v < VERSJON) lagreNa();
      }
    } catch (e) {
      S = tom();
    }
  }
  let ventende = null;
  function lagre() {
    clearTimeout(ventende);
    ventende = setTimeout(lagreNa, 120);
  }
  function lagreNa() {
    try {
      localStorage.setItem(NOKKEL, JSON.stringify(S));
    } catch (e) {
      /* lagring utilgjengelig */
    }
  }
  window.addEventListener('pagehide', lagreNa);
  last();

  const lyttere = new Set();
  const varsle = () => lyttere.forEach((f) => f());

  /* ---------- Status per læringsmål ---------- */
  /** Resultatbasert status for et læringsmål: 'ny' | 'rod' | 'gul' | 'gronn'. */
  function malResultat(nr) {
    const qs = KJ.malOppgaver(nr);
    let provd = 0;
    let ok = 0;
    let feilNa = 0;
    qs.forEach((q) => {
      const s = S.q[q.id];
      if (!s) return;
      provd++;
      if (s.ok) ok++;
      if (S.err[q.id]) feilNa++;
    });
    const andel = qs.length ? ok / qs.length : 0;
    let status = 'ny';
    if (provd >= 3) {
      const treff = ok / provd;
      if (treff >= 0.8 && andel >= 0.5 && feilNa <= 1) status = 'gronn';
      else if (treff >= 0.5) status = 'gul';
      else status = 'rod';
    }
    return { totalt: qs.length, provd, ok, andel, feilNa, status };
  }

  function oppdaterSelv(q) {
    (q.mal || []).forEach((nr) => {
      const r = malResultat(nr);
      const f = S.selv[nr];
      if (r.status === 'ny') return;
      if (!f || f.resultat !== r.status) {
        S.selv[nr] = { verdi: r.status, kilde: 'resultat', resultat: r.status, t: Date.now() };
      }
    });
  }

  KJ.store = {
    lytt(f) {
      lyttere.add(f);
      return () => lyttere.delete(f);
    },

    /* ---------- Oppgaver ---------- */
    status(id) {
      return S.q[id] || null;
    },
    /**
     * Registrerer et svar. forsteForsok = true når dette er første «Sjekk svar»
     * etter at oppgaven ble vist (brukes til feilbanken).
     * Returnerer { fjernetFraFeilbank, iFeilbank, rad }.
     */
    registrer(id, riktig, forsteForsok) {
      const r = S.q[id] || { n: 0, ok: false, sist: null };
      r.n++;
      r.sist = riktig ? 'r' : 'f';
      r.t = Date.now();
      if (riktig) r.ok = true;
      S.q[id] = r;
      const svar = { fjernetFraFeilbank: false, iFeilbank: false, rad: 0 };
      if (!riktig) {
        const e = S.err[id] || { n: 0, rad: 0 };
        e.n++;
        e.rad = 0;
        e.t = Date.now();
        S.err[id] = e;
        svar.iFeilbank = true;
      } else if (S.err[id]) {
        const e = S.err[id];
        if (forsteForsok) e.rad = (e.rad || 0) + 1;
        if (e.rad >= RAD_KRAV) {
          delete S.err[id];
          svar.fjernetFraFeilbank = true;
        } else {
          svar.iFeilbank = true;
          svar.rad = e.rad;
        }
      }
      const q = KJ.oppgave(id);
      if (q) oppdaterSelv(q);
      lagre();
      varsle();
      return svar;
    },

    temaFremdrift(temaId) {
      const t = KJ.temaMap[temaId];
      const res = { totalt: 0, ok: 0, niva: { 1: [0, 0], 2: [0, 0], 3: [0, 0] } };
      if (!t) return res;
      t.oppgaver.forEach((q) => {
        res.totalt++;
        res.niva[q.niva][1]++;
        if (S.q[q.id] && S.q[q.id].ok) {
          res.ok++;
          res.niva[q.niva][0]++;
        }
      });
      res.andel = res.totalt ? res.ok / res.totalt : 0;
      return res;
    },

    /* ---------- Læringsmål og selvvurdering ---------- */
    malResultat,
    /** Selvvurdering: { verdi: 'rod'|'gul'|'gronn', kilde: 'meg'|'resultat' } eller null. */
    selv: (nr) => S.selv[nr] || null,
    settSelv(nr, verdi) {
      const r = malResultat(nr);
      if (verdi) S.selv[nr] = { verdi, kilde: 'meg', resultat: r.status, t: Date.now() };
      else delete S.selv[nr];
      lagre();
      varsle();
    },

    /* ---------- Feilbank ---------- */
    feilbank() {
      return Object.keys(S.err)
        .filter((id) => KJ.oppgave(id))
        .map((id) => Object.assign({ id, rad: 0 }, S.err[id]))
        .sort((a, b) => b.t - a.t);
    },
    feilInfo: (id) => S.err[id] || null,
    iFeilbank: (id) => !!S.err[id],
    fjernFeil(id) {
      delete S.err[id];
      lagre();
      varsle();
    },
    leggIFeilbank(id) {
      const e = S.err[id] || { n: 0, rad: 0 };
      e.n++;
      e.rad = 0;
      e.t = Date.now();
      S.err[id] = e;
      lagre();
      varsle();
    },
    tomFeilbank() {
      S.err = {};
      lagre();
      varsle();
    },

    /* ---------- Flashcards ---------- */
    kort: (id) => S.fc[id] || null,
    settKort(id, verdi) {
      if (verdi) S.fc[id] = verdi;
      else delete S.fc[id];
      lagre();
      varsle();
    },

    /* ---------- Prøver ---------- */
    prover: () => S.prover.slice(),
    lagreResultat(r) {
      S.prover.unshift(r);
      S.prover = S.prover.slice(0, 12);
      lagre();
    },
    oppdaterResultat(id, data) {
      const r = S.prover.find((p) => p.id === id);
      if (r) {
        Object.assign(r, data);
        lagre();
      }
    },
    aktivProve: () => S.prove,
    settAktivProve(p) {
      S.prove = p;
      lagre();
    },

    /* ---------- Diverse ---------- */
    sist: () => S.sist,
    settSist(v) {
      S.sist = v;
      lagre();
    },
    tema: () => S.tema || 'auto',
    settTema(v) {
      S.tema = v;
      lagreNa();
    },

    eksport() {
      return JSON.stringify(Object.assign({ app: 'kjemi1-spektrum', eksportert: new Date().toISOString() }, S), null, 2);
    },
    import(tekst) {
      const d = JSON.parse(tekst);
      if (!d || typeof d !== 'object' || !d.q) throw new Error('Ugyldig fil');
      delete d.app;
      delete d.eksportert;
      S = migrer(d);
      lagreNa();
      varsle();
    },
    nullstill() {
      const tema = S.tema;
      S = tom();
      S.tema = tema;
      lagreNa();
      varsle();
    },
    _lagreNa: lagreNa,
    _migrer: migrer,
  };
})(window.KJ);
