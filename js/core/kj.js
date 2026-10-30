/*
 * Kjemi 1 · Spektrum – felles navnerom.
 * Alle datafiler og moduler henger seg på window.KJ, slik at siden kan åpnes
 * direkte fra disk (file://) uten server eller byggesteg.
 */
(function () {
  'use strict';
  const KJ = (window.KJ = window.KJ || {});

  KJ.versjon = '1.0.0';
  KJ.temaer = [];
  KJ.temaMap = {};
  KJ.views = {};

  /** Registrerer et tema fra en datafil i data/temaer/. */
  KJ.tema = function (t) {
    if (!t || !t.id) throw new Error('Tema mangler id');
    if (KJ.temaMap[t.id]) throw new Error('Tema-id finnes fra før: ' + t.id);
    t.oppgaver = t.oppgaver || [];
    t.flashcards = t.flashcards || [];
    t.teori = t.teori || [];
    t.begreper = t.begreper || [];
    t.eksempler = t.eksempler || [];
    t.feller = t.feller || [];
    t.oppgaver.forEach((q) => (q.tema = t.id));
    KJ.temaer.push(t);
    KJ.temaer.sort((a, b) => (a.nr || 99) - (b.nr || 99));
    KJ.temaMap[t.id] = t;
  };

  /** Slår opp en oppgave på id på tvers av alle temaer. */
  KJ.oppgave = function (id) {
    if (!KJ._qIndex || KJ._qIndexSize !== KJ.alleOppgaver().length) {
      KJ._qIndex = {};
      KJ.alleOppgaver().forEach((q) => (KJ._qIndex[q.id] = q));
      KJ._qIndexSize = KJ.alleOppgaver().length;
    }
    return KJ._qIndex[id];
  };

  KJ.alleOppgaver = function () {
    return KJ.temaer.reduce((acc, t) => acc.concat(t.oppgaver), []);
  };

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
