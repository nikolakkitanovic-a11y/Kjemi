/*
 * Modul 12: Sammensatte ioner
 * Læringsmål: 14
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */
(function () {
  var M = {
    id: 'ioner',
    nr: 12,
    tittel: 'Sammensatte ioner',
    beskrivelse: 'Navn, formel og ladning til de sammensatte ionene fra tavla.',
    mal: [14],
    farge: '#129CC8',
    bolge: 480,
    spesial: 'ioner',
    teori: [],
    begreper: [
      {
        term: 'Sammensatt ion',
        def: 'Ion av flere atomer, f.eks. {{SO4^2-}} og {{NH4+}}. Parentes når det er flere av dem.',
      },
    ],
    eksempler: [],
    feller: [
      'Ladningen er en del av ionet. Skriv {{SO4^2-}}, ikke bare {{SO4}}.',
      'Ammonium, {{NH4+}}, er det eneste positive ionet på lista. Det oppfører seg som et metallion i salter: {{NH4Cl}} er ammoniumklorid.',
      'Hydroksid er {{OH-}}, med ladning. «OH» alene er en atomgruppe i et molekyl, for eksempel i alkoholer.',
      'Når det er mer enn ett sammensatt ion i formelen, må det stå i parentes: {{Ca(OH)2}}, {{(NH4)2SO4}}.',
    ],
    oppgaver: [
      {
        id: 'nv-08',
        niva: 1,
        type: 'kobling',
        mal: [14],
        sporsmal: 'Koble det sammensatte ionet med riktig navn.',
        par: [
          ['{{NH4+}}', 'ammonium'],
          ['{{NO3-}}', 'nitrat'],
          ['{{OH-}}', 'hydroksid'],
          ['{{SO4^2-}}', 'sulfat'],
          ['{{CO3^2-}}', 'karbonat'],
          ['{{PO4^3-}}', 'fosfat'],
        ],
      },
    ],
    flashcards: [],
  };
  KJ.ionModul(M);
  KJ.modul(M);
})();
