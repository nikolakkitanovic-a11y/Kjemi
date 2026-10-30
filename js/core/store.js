/*
 * Lagring av fremdrift, feilbank, flashcards og prøveresultater i localStorage.
 * Alt er pakket i try/catch slik at siden fungerer også når lagring er blokkert
 * (privat vindu e.l.) – da lagres ingenting mellom besøk.
 */
(function (KJ) {
  'use strict';
  const NOKKEL = 'kjemi1-spektrum-v1';

  const tom = () => ({ q: {}, err: {}, fc: {}, prover: [], sist: null, prove: null, tema: 'auto' });
  let S = tom();

  function last() {
    try {
      const raw = localStorage.getItem(NOKKEL);
      if (raw) S = Object.assign(tom(), JSON.parse(raw));
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
     */
    registrer(id, riktig, forsteForsok) {
      const r = S.q[id] || { n: 0, ok: false, sist: null };
      r.n++;
      r.sist = riktig ? 'r' : 'f';
      r.t = Date.now();
      if (riktig) r.ok = true;
      S.q[id] = r;
      let fjernetFraFeilbank = false;
      if (!riktig) {
        const e = S.err[id] || { n: 0 };
        e.n++;
        e.t = Date.now();
        S.err[id] = e;
      } else if (forsteForsok && S.err[id]) {
        delete S.err[id];
        fjernetFraFeilbank = true;
      }
      lagre();
      varsle();
      return { fjernetFraFeilbank };
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

    /* ---------- Feilbank ---------- */
    feilbank() {
      return Object.keys(S.err)
        .filter((id) => KJ.oppgave(id))
        .map((id) => Object.assign({ id }, S.err[id]))
        .sort((a, b) => b.t - a.t);
    },
    iFeilbank: (id) => !!S.err[id],
    fjernFeil(id) {
      delete S.err[id];
      lagre();
      varsle();
    },
    leggIFeilbank(id) {
      const e = S.err[id] || { n: 0 };
      e.n++;
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
      S = Object.assign(tom(), d);
      delete S.app;
      delete S.eksportert;
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
  };
})(window.KJ);
