/*
 * Lærerens øveprøve (kap. 1–3, 9/10-26) som digital prøve.
 * Hver plass (slot) har en liste med alternativer. Det første alternativet er oppgaven fra øveprøven.
 * Et alternativ kan være én oppgave-id eller en liste med id-er som hører sammen (for eksempel a, b og c).
 * «navn» og «formel» trekker tilfeldige oppgaver av den typen i varianten.
 */
KJ.OVEPROVE = {
  navn: 'Øveprøve kap. 1–3',
  dato: '9/10-26',
  tid: 90,
  deler: [
    { tittel: 'Oppgave 1: Velg riktig alternativ', slots: [['op-1-1', 'op-1-1b', 'op-1-1c'], ['op-1-2', 'op-1-2b', 'op-1-2c'], ['op-1-3', 'op-1-3b', 'op-1-3c', 'op-1-3d'], ['op-1-4'], ['op-1-5', 'op-1-5b', 'op-1-5c']] },
    { tittel: 'Oppgave 2: Grupper, perioder og balansering', slots: [['op-2a'], ['op-2b'], ['op-2c', 'st-16'], ['rl-35'], ['rl-12', 'rl-11', 'rl-34'], ['rl-09', 'rl-14'], ['rl-02', 'rl-01'], ['rl-15', 'rl-03']] },
    { tittel: 'Oppgave 3: Formelenheter', slots: [['op-3', 'op-3b']] },
    { tittel: 'Oppgave 5: Elektronkonfigurasjon', slots: [['op-5-n', 'op-5-p'], ['op-5-ti', 'op-5-v'], ['op-5-ti2', 'op-5-fe2', 'op-5-v3'], ['op-5c', 'op-5c2', 'op-5c3']] },
    { tittel: 'Oppgave 7: Binding, elektronprikkformel og dipol', slots: [[['op-7', 'lw-h2s', 'lw-pcl3'], ['op-7v', 'lw-nh3', 'lw-ccl4'], ['op-7v2', 'lw-hcl', 'lw-co2']]] },
    { tittel: 'Oppgave 8: Elektronprikkformel og geometri', slots: [['lw-co3', 'lw-nh4', 'lw-h3o'], ['lw-ph3', 'lw-nf3']] },
    { tittel: 'Oppgave 9: Krefter mellom molekyler', slots: [['op-9a'], ['op-9b', 'op-9c', 'op-9d']] },
    { tittel: 'Oppgave 10: Metallbinding', slots: [['op-10a'], ['op-10b'], ['op-10c', 'op-10c2', 'me-16']] },
    { tittel: 'Navn på forbindelsene', slots: [['nv-18'], ['op-n-ca3po42'], ['op-n-fecl2'], ['op-n-mg'], ['op-n-nh42so4'], ['op-n-sf6'], ['op-n-cuno32'], ['rp-06'], ['op-n-na2co3'], ['op-n-fe2o3']], tilfeldig: 'navn' },
    { tittel: 'Formler for stoffene', slots: [['op-f-fe2so43'], ['nv-28'], ['op-f-crcl3'], ['nv-17'], ['op-f-k3po4'], ['op-f-caoh2'], ['op-f-so2'], ['nv-20'], ['op-f-pcl3'], ['op-f-al']], tilfeldig: 'formel' },
  ],
};

/** Oppgave-id-ene i øveprøven. variant = true gir en ny prøve i samme stil. */
KJ.oveproveIder = function (variant) {
  const ut = [];
  const brukt = new Set();
  const legg = (x) => [].concat(x).forEach((id) => {
    if (KJ.oppgave(id) && !brukt.has(id)) {
      ut.push(id);
      brukt.add(id);
    }
  });
  KJ.OVEPROVE.deler.forEach((d) => {
    if (variant && d.tilfeldig) {
      const mal = d.tilfeldig === 'navn' ? [12, 13] : [12, 13, 15];
      const pool = KJ.shuffle(
        KJ.alleOppgaver().filter((q) => q.type === d.tilfeldig && q.mal.some((m) => mal.includes(m)) && !/^io-/.test(q.id) && !brukt.has(q.id))
      );
      pool.slice(0, d.slots.length).forEach((q) => legg(q.id));
      return;
    }
    d.slots.forEach((alt) => {
      const valg = variant ? alt[Math.floor(Math.random() * alt.length)] : alt[0];
      legg(valg);
    });
  });
  return ut;
};
