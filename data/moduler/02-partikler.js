/*
 * Modul 2: Protoner, nøytroner og elektroner
 * Læringsmål: 2
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */
KJ.modul({
  id: 'partikler',
  nr: 2,
  tittel: 'Protoner, nøytroner og elektroner',
  beskrivelse: 'Finn antall partikler i atomer og ioner ut fra massetall, atomnummer og ladning.',
  mal: [2],
  farge: '#EA5A3D',
  bolge: 640,
  teori: [
    {
      h: 'Atomets byggesteiner',
      tekst: `Et atom består av en liten, positivt ladd **atomkjerne** med **protoner** ($\\mathrm{p^+}$) og **nøytroner** ($\\mathrm{n^0}$), og **elektroner** ($\\mathrm{e^-}$) som beveger seg rundt kjernen. I skolekjemien kaller vi disse tre partiklene ofte elementærpartikler.

Nesten all massen sitter i kjernen, men det er elektronene som bestemmer hvordan atomet reagerer kjemisk.`,
      tabell: {
        hode: ['Partikkel', 'Ladning', 'Masse (u)', 'Plassering'],
        rader: [
          ['Proton', '+1', '≈ 1', 'Kjernen'],
          ['Nøytron', '0', '≈ 1', 'Kjernen'],
          ['Elektron', '−1', '≈ 0,00055 (1/1836)', 'Rundt kjernen'],
        ],
      },
    },
    {
      h: 'Atomnummer og nukleontall',
      tekst: `**Atomnummeret** $Z$ er antall protoner. Det bestemmer hvilket grunnstoff atomet er: alle atomer med 6 protoner er karbon.

**Nukleontallet** (massetallet) $A$ er summen av protoner og nøytroner. Antall nøytroner finner du da med $N = A - Z$.

Vi skriver atomet slik: {{^{12}_{6}C}}. Tallet oppe er nukleontallet, tallet nede er atomnummeret.

Et nøytralt atom har like mange elektroner som protoner.`,
    },
    {
      h: 'Ioner',
      tekst: `Et **ion** er et atom eller en atomgruppe med elektrisk ladning. Antall protoner endres aldri når et ion dannes, bare antall elektroner.

- Et **kation** er positivt: atomet har avgitt elektroner. {{Na}} → {{Na+}} + {{e-}}
- Et **anion** er negativt: atomet har tatt opp elektroner. {{Cl}} + {{e-}} → {{Cl-}}

Antall elektroner = antall protoner − ladningen. {{Mg^2+}} har 12 − 2 = 10 elektroner.`,
      figur: { type: 'skall', atomer: [['Na', 0], ['Na', 1], ['Cl', 0], ['Cl', -1]] },
    },
  ],
  begreper: [
    { term: 'Proton', def: 'Positivt ladd partikkel (+1) i atomkjernen. Masse ≈ 1 u.' },
    { term: 'Nøytron', def: 'Nøytral partikkel i atomkjernen. Masse ≈ 1 u.' },
    { term: 'Elektron', def: 'Negativt ladd partikkel (−1) rundt kjernen. Masse ≈ 1/1836 u.' },
    { term: 'Atomnummer (Z)', def: 'Antall protoner i kjernen. Bestemmer grunnstoffet.' },
    { term: 'Nukleontall (A)', def: 'Antall protoner + nøytroner i kjernen.' },
  ],
  eksempler: [
    {
      tittel: 'Partikler i et ion',
      oppgave: 'Hvor mange protoner, nøytroner og elektroner har {{^{56}_{26}Fe^3+}}?',
      steg: [
        'Protoner = atomnummeret: $Z = 26$.',
        'Nøytroner: $N = A - Z = 56 - 26 = 30$.',
        'Ladningen er +3, så jern har avgitt 3 elektroner: $26 - 3 = 23$ elektroner.',
      ],
    },
  ],
  feller: [
    'Når et ion dannes, endres antall **elektroner**, aldri antall protoner.',
    'Nukleontallet (et helt tall for ett atom) er ikke det samme som atommassen i periodesystemet (et gjennomsnitt).',
    'Ladningen 2+ betyr to elektroner **færre** enn protoner, ikke to protoner flere. Ladningen 2− betyr to elektroner flere.',
    'I et sammensatt ion teller du protonene i alle atomene og justerer for ladningen: {{NH4+}} har 7 + 4 = 11 protoner og 10 elektroner.',
  ],
  oppgaver: [
    {
      id: 'at-01',
      niva: 1,
      type: 'flervalg',
      mal: [2],
      sporsmal: 'Hvilke partikler finnes i atomkjernen?',
      alternativer: ['Protoner og elektroner', 'Protoner og nøytroner', 'Nøytroner og elektroner', 'Bare protoner'],
      svar: 1,
      hint: 'Kjernen er positivt ladd og inneholder nesten all massen.',
      forklaring: 'Kjernen består av protoner (positive) og nøytroner (nøytrale). Elektronene beveger seg rundt kjernen.',
    },
    {
      id: 'at-02',
      niva: 1,
      type: 'flervalg',
      mal: [2],
      sporsmal: 'Hva bestemmer hvilket grunnstoff et atom er?',
      alternativer: ['Antall nøytroner', 'Antall protoner', 'Antall elektroner', 'Nukleontallet'],
      svar: 1,
      hint: 'Tenk på hva atomnummeret står for.',
      forklaring: 'Atomnummeret $Z$ = antall protoner. Alle atomer med 11 protoner er natrium, uansett antall nøytroner eller elektroner.',
    },
    {
      id: 'at-03',
      niva: 1,
      type: 'fyllinn',
      mal: [2],
      sporsmal: 'Fyll inn antall partikler i atomet {{^{23}_{11}Na}}.',
      tekst: `Protoner: ___
Nøytroner: ___
Elektroner: ___`,
      svar: [['11'], ['12'], ['11']],
      hint: ['Tallet nede er atomnummeret, tallet oppe er nukleontallet.', 'Nøytroner = nukleontall − atomnummer.'],
      steg: [
        'Protoner = $Z = 11$',
        'Nøytroner = $A - Z = 23 - 11 = 12$',
        'Atomet er nøytralt, så elektroner = protoner = 11',
      ],
    },
    {
      id: 'at-06',
      niva: 1,
      type: 'tall',
      mal: [2],
      sporsmal: 'Hvor mange nøytroner har {{^{238}_{92}U}}?',
      svar: 146,
      heltall: true,
      enhet: null,
      hint: 'Bruk $N = A - Z$.',
      steg: ['$A = 238$ og $Z = 92$', '$N = A - Z = 238 - 92 = 146$'],
    },
    {
      id: 'at-07',
      niva: 1,
      type: 'flervalg',
      mal: [2],
      sporsmal: 'Et ion har 12 protoner og 10 elektroner. Hvilken ladning har det?',
      alternativer: ['−2', '+2', '+10', '0'],
      svar: 1,
      hint: 'Ladning = antall protoner − antall elektroner.',
      forklaring: '$12 - 10 = +2$. Det er {{Mg^2+}}.',
    },
    {
      id: 'at-09',
      niva: 1,
      type: 'flervalg',
      mal: [2],
      sporsmal: 'Hvilken partikkel har minst masse?',
      alternativer: ['Proton', 'Nøytron', 'Elektron', 'Atomkjerne'],
      svar: 2,
      hint: 'Én av partiklene er nesten 2000 ganger lettere enn de andre.',
      forklaring: 'Et elektron har masse omtrent 1/1836 av et proton.',
    },
    {
      id: 'at-10',
      niva: 2,
      type: 'fyllinn',
      mal: [2],
      sporsmal: 'Fyll inn antall partikler i ionet {{^{37}_{17}Cl-}}.',
      tekst: `Protoner: ___
Nøytroner: ___
Elektroner: ___`,
      svar: [['17'], ['20'], ['18']],
      hint: 'Et anion med ladning −1 har tatt opp ett ekstra elektron.',
      steg: ['Protoner = $Z = 17$', 'Nøytroner = $37 - 17 = 20$', 'Ladning −1: elektroner = $17 + 1 = 18$'],
    },
    {
      id: 'at-11',
      niva: 2,
      type: 'fyllinn',
      mal: [2],
      sporsmal: 'Fyll inn antall partikler i ionet {{^{56}_{26}Fe^3+}}.',
      tekst: `Protoner: ___
Nøytroner: ___
Elektroner: ___`,
      svar: [['26'], ['30'], ['23']],
      hint: 'Ladning +3 betyr at atomet har avgitt 3 elektroner.',
      steg: ['Protoner = 26', 'Nøytroner = $56 - 26 = 30$', 'Elektroner = $26 - 3 = 23$'],
    },
    {
      id: 'at-15',
      niva: 2,
      type: 'rekkefolge',
      mal: [2],
      sporsmal: 'Ranger atomene etter antall nøytroner, fra færrest til flest.',
      fra: 'Færrest nøytroner',
      til: 'Flest nøytroner',
      elementer: ['{{^{1}_{1}H}}', '{{^{4}_{2}He}}', '{{^{12}_{6}C}}', '{{^{19}_{9}F}}', '{{^{23}_{11}Na}}'],
      hint: 'Regn ut $N = A - Z$ for hvert atom.',
      forklaring: 'H-1: 0, He-4: 2, C-12: 6, F-19: 10, Na-23: 12 nøytroner.',
    },
    {
      id: 'at-16',
      niva: 2,
      type: 'flervalg',
      mal: [2, 5],
      sporsmal: 'En partikkel har 17 protoner, 18 nøytroner og 18 elektroner. Hva er det?',
      alternativer: ['Et argonatom', 'Et kloridion, {{Cl-}}', 'Et kloratom', 'Et kaliumion, {{K+}}'],
      svar: 1,
      hint: 'Antall protoner bestemmer grunnstoffet. Sammenlign så protoner og elektroner.',
      forklaring: '17 protoner = klor. Ett elektron mer enn protoner gir ladning −1: {{^{35}_{17}Cl-}}.',
    },
    {
      id: 'at-17',
      niva: 2,
      type: 'fyllinn',
      mal: [2, 5],
      sporsmal: 'Et ion har 16 protoner, 16 nøytroner og 18 elektroner. Skriv symbolet for grunnstoffet og ladningen til ionet.',
      tekst: `Grunnstoff (symbol): ___
Ladning: ___`,
      svar: [['S'], ['2-', '-2', '2−', '−2']],
      hint: 'Finn grunnstoffet med atomnummer 16 i periodesystemet.',
      forklaring: 'Atomnummer 16 er svovel. 16 − 18 = −2, så ionet er sulfid, {{S^2-}}.',
    },
    {
      id: 'at-18',
      niva: 2,
      type: 'tall',
      mal: [2, 14],
      sporsmal: 'Hvor mange elektroner har ammoniumionet {{NH4+}}?',
      svar: 10,
      heltall: true,
      enhet: null,
      hint: ['Tell først protoner i alle atomene: N har 7, H har 1.', 'Ladning +1 betyr ett elektron mindre enn protoner.'],
      steg: ['Protoner: $7 + 4 \\cdot 1 = 11$', 'Ladning +1: elektroner = $11 - 1 = 10$'],
    },
    {
      id: 'at-19',
      niva: 2,
      type: 'tall',
      mal: [2, 14],
      sporsmal: 'Hvor mange elektroner har fosfationet {{PO4^3-}}?',
      svar: 50,
      heltall: true,
      enhet: null,
      hint: 'P har 15 protoner og O har 8. Ladning −3 betyr 3 elektroner ekstra.',
      steg: ['Protoner: $15 + 4 \\cdot 8 = 47$', 'Ladning −3: elektroner = $47 + 3 = 50$'],
    },
    {
      id: 'at-23',
      niva: 3,
      type: 'tall',
      mal: [2],
      sporsmal: 'Et ion {{X^2+}} har 28 elektroner og 34 nøytroner. Finn nukleontallet til ionet.',
      svar: 64,
      heltall: true,
      enhet: null,
      hint: ['Finn først antall protoner: ionet har mistet 2 elektroner.', 'Nukleontall = protoner + nøytroner.'],
      steg: [
        'Ladning +2 betyr 2 elektroner færre enn protoner: protoner = $28 + 2 = 30$ (sink, Zn).',
        'Nukleontall: $A = 30 + 34 = 64$',
        'Ionet er {{^{64}_{30}Zn^2+}}.',
      ],
    },
    {
      id: 'at-24',
      niva: 3,
      type: 'flervalg',
      mal: [2],
      sporsmal: 'Massen til et atom er nesten lik summen av massene til protonene og nøytronene. Hvorfor?',
      alternativer: [
        'Elektronene har svært liten masse sammenlignet med protoner og nøytroner',
        'Elektronene befinner seg i kjernen',
        'Elektronene har negativ masse som opphever noe av massen',
        'Atomet har like mange elektroner som nøytroner',
      ],
      svar: 0,
      hint: 'Sammenlign massen til et elektron med massen til et proton.',
      forklaring: 'Et elektron veier ca. 1/1836 av et proton, så elektronene bidrar nesten ikke til massen.',
    },
  ],
  flashcards: [
    { f: 'Proton', b: 'Positiv partikkel (+1) i kjernen, masse ≈ 1 u.' },
    { f: 'Nøytron', b: 'Nøytral partikkel i kjernen, masse ≈ 1 u.' },
    { f: 'Elektron', b: 'Negativ partikkel (−1) rundt kjernen, masse ≈ 1/1836 u.' },
    { f: 'Atomnummer $Z$', b: 'Antall protoner. Bestemmer hvilket grunnstoff atomet er.' },
    { f: 'Nukleontall $A$', b: 'Antall protoner + nøytroner. Nøytroner: $N = A - Z$.' },
    { f: 'Elektroner i et ion', b: 'Elektroner = protoner − ladning. {{Mg^2+}}: 12 − 2 = 10. {{O^2-}}: 8 + 2 = 10.' },
  ],
});
