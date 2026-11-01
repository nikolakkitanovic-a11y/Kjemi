/*
 * Kjemi 1 · Spektrum – felles navnerom.
 * Alle datafiler og moduler henger seg på window.KJ, slik at siden kan åpnes
 * direkte fra disk (file://) uten server eller byggesteg.
 *
 * Siden er organisert i moduler etter læringsmålene for prøven (data/laeringsmal.js).
 * Internt heter modulene fortsatt «tema» enkelte steder (KJ.temaer, q.tema).
 */
(function () {
  'use strict';
  const KJ = (window.KJ = window.KJ || {});

  KJ.versjon = '2.0.0';
  KJ.moduler = [];
  KJ.modulMap = {};
  KJ.temaer = KJ.moduler; // eldre navn, samme liste
  KJ.temaMap = KJ.modulMap;
  KJ.views = {};

  /** Registrerer en modul fra en datafil i data/moduler/. */
  KJ.modul = function (m) {
    if (!m || !m.id) throw new Error('Modul mangler id');
    if (KJ.modulMap[m.id]) throw new Error('Modul-id finnes fra før: ' + m.id);
    m.oppgaver = m.oppgaver || [];
    m.flashcards = m.flashcards || [];
    m.teori = m.teori || [];
    m.begreper = m.begreper || [];
    m.eksempler = m.eksempler || [];
    m.feller = m.feller || [];
    m.mal = m.mal || [];
    m.linje = m.linje || m.bolge + ' nm';
    m.oppgaver.forEach((q) => {
      q.tema = m.id;
      q.modul = m.id;
      if (!q.mal || !q.mal.length) q.mal = m.mal.slice(0, 1);
    });
    KJ.moduler.push(m);
    KJ.moduler.sort((a, b) => (a.nr || 99) - (b.nr || 99));
    KJ.modulMap[m.id] = m;
    KJ._qIndex = null;
  };
  KJ.tema = KJ.modul;

  /** Slår opp en oppgave på id på tvers av alle moduler. */
  KJ.oppgave = function (id) {
    if (!KJ._qIndex) {
      KJ._qIndex = {};
      KJ.alleOppgaver().forEach((q) => (KJ._qIndex[q.id] = q));
    }
    return KJ._qIndex[id];
  };

  KJ.alleOppgaver = function () {
    return KJ.moduler.reduce((acc, t) => acc.concat(t.oppgaver), []);
  };

  /** Oppgaver som øver på læringsmål nr. */
  KJ.malOppgaver = function (nr) {
    return KJ.alleOppgaver().filter((q) => q.mal.includes(nr));
  };

  /** Modulen som har læringsmål nr som hovedmål. */
  KJ.malModul = function (nr) {
    return KJ.moduler.find((m) => m.mal.includes(nr));
  };

  KJ.malInfo = (nr) => (KJ.MAL || []).find((m) => m.nr === nr);

  /** Id for et flashcard. Bygger på forsiden, så fremdriften følger kortet. */
  KJ.kortId = (k) => 'k:' + KJ.hash(k.f);

  KJ.NIVA = {
    1: { kort: 'G', navn: 'Grunnleggende', poeng: 1 },
    2: { kort: 'M', navn: 'Middels', poeng: 2 },
    3: { kort: 'H', navn: 'Høy måloppnåelse', poeng: 3 },
  };

  KJ.TYPENAVN = {
    flervalg: 'Flervalg',
    fyllinn: 'Fyll inn',
    tall: 'Regneoppgave',
    balanser: 'Balansering',
    navn: 'Navnsetting',
    formel: 'Formel',
    kobling: 'Kobling',
    rekkefolge: 'Rangering',
    sortering: 'Sortering',
    konfig: 'Elektronkonfigurasjon',
    forklaring: 'Forklaring',
  };
})();
