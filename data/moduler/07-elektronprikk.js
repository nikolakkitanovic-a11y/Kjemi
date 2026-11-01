/*
 * Modul 7: Elektronprikkformler og geometri
 * Læringsmål: 7
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */
KJ.modul({
  id: 'elektronprikk',
  nr: 7,
  tittel: 'Elektronprikkformler og geometri',
  beskrivelse: 'Valenselektroner, bindende og ledige elektronpar, og hvordan de bestemmer formen på molekyler og ioner.',
  mal: [7],
  farge: '#A7B414',
  bolge: 560,
  huskeliste: [
    'Tell valenselektronene, og husk ladningen ({{NH4+}}: 8, {{OH-}}: 8).',
    'Det minst elektronegative atomet (ikke H) står i midten. Lag bindinger, fordel resten som ledige par, og bruk dobbelt- eller trippelbinding hvis det mangler elektroner til oktett.',
    'Form: 2 områder lineær · 3 trigonal plan · 4+0 tetraedrisk · 3+1 trigonal pyramide · 2+2 vinklet.',
  ],
  teori: [
    {
      h: 'Kovalent binding og Lewisstrukturer',
      tekst: `Kovalent binding er et **elektronpar som deles** mellom to atomer, vanligvis to ikke-metaller. Atomene danner **molekyler**.

- Ett delt elektronpar = enkeltbinding (H–H)
- To delte par = dobbeltbinding (O=O)
- Tre delte par = trippelbinding (N≡N)

I en **Lewisstruktur** tegner vi valenselektronene som prikker eller streker. Et elektronpar som ikke deltar i en binding, kalles et **ledig (fritt) elektronpar**. Vann har to bindende og to ledige elektronpar rundt O. Ammoniakk har tre bindende og ett ledig par rundt N.

Slik tegner du en Lewisstruktur: (1) tell alle valenselektronene, (2) sett det minst elektronegative atomet i midten, (3) lag enkeltbindinger, (4) fordel resten som ledige par slik at alle får oktett, (5) lag dobbelt- eller trippelbindinger hvis det mangler elektroner.

Enslige, uparede elektroner gir **radikaler**, som er svært reaktive og lite stabile.`,
    },
    {
      h: 'Molekylform (VSEPR)',
      tekst: 'Elektronparene rundt sentralatomet frastøter hverandre og ordner seg så langt fra hverandre som mulig. Både bindende og ledige elektronpar teller (en dobbelt- eller trippelbinding teller som ett område). Ledige par tar litt mer plass og presser bindingene sammen.',
      tabell: {
        hode: ['Elektronområder', 'Bindende + ledige', 'Form', 'Vinkel', 'Eksempel'],
        rader: [
          ['2', '2 + 0', 'Lineær', '180°', '{{CO2}}'],
          ['3', '3 + 0', 'Trigonal plan', '120°', '{{BF3}}'],
          ['4', '4 + 0', 'Tetraedrisk', '109,5°', '{{CH4}}'],
          ['4', '3 + 1', 'Trigonal pyramide', 'ca. 107°', '{{NH3}}'],
          ['4', '2 + 2', 'Vinklet', 'ca. 104,5°', '{{H2O}}'],
        ],
      },
    },
  ],
  begreper: [
    { term: 'Oktettregelen', def: 'Atomer får ofte åtte elektroner i ytterste skall når de danner bindinger (H: to).' },
    { term: 'Kovalent binding', def: 'Et elektronpar som deles mellom to atomer, vanligvis ikke-metaller.' },
    { term: 'Ledig elektronpar', def: 'Elektronpar i valensskallet som ikke deltar i en binding.' },
    { term: 'VSEPR', def: 'Elektronparene rundt sentralatomet frastøter hverandre og bestemmer formen.' },
  ],
  eksempler: [],
  feller: [
    'Husk ladningen i sammensatte ioner: {{NH4+}} har $5 + 4 − 1 = 8$ valenselektroner, {{OH-}} har $6 + 1 + 1 = 8$.',
    'Ledige elektronpar på sentralatomet påvirker formen. {{H2O}} er vinklet, ikke lineær, fordi O har to ledige par.',
    'En dobbelt- eller trippelbinding teller som **ett** elektronområde når du bestemmer formen.',
    'Hydrogen har bare plass til to elektroner og danner bare én binding.',
  ],
  oppgaver: [
    {
      id: 'sb-02',
      niva: 1,
      type: 'flervalg',
      mal: [7],
      sporsmal: 'Hva er en kovalent binding?',
      alternativer: [
        'Et elektronpar som deles mellom to atomer',
        'Tiltrekning mellom positive og negative ioner',
        'Kationer i en sjø av frie elektroner',
        'En svak kraft mellom molekyler',
      ],
      svar: 0,
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-05',
      niva: 1,
      type: 'flervalg',
      mal: [7],
      sporsmal: 'Hvor mange elektroner deles i en dobbeltbinding?',
      alternativer: ['2', '4', '6', '8'],
      svar: 1,
      stokk: false,
      hint: 'En dobbeltbinding er to delte elektronpar.',
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-13',
      niva: 2,
      type: 'tall',
      mal: [7],
      sporsmal: 'Hvor mange ledige (frie) elektronpar har nitrogenatomet i ammoniakk, {{NH3}}?',
      svar: 1,
      heltall: true,
      enhet: null,
      hint: 'N har 5 valenselektroner. Tre av dem brukes i bindinger til H.',
      steg: [
        'N har 5 valenselektroner.',
        'Tre elektroner danner tre bindinger med H.',
        'De to siste utgjør **ett** ledig elektronpar.',
      ],
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-14',
      niva: 2,
      type: 'tall',
      mal: [7],
      sporsmal: 'Hvor mange ledige elektronpar har oksygenatomet i vann, {{H2O}}?',
      svar: 2,
      heltall: true,
      enhet: null,
      hint: 'O har 6 valenselektroner, og to av dem brukes i bindinger.',
      steg: ['O har 6 valenselektroner.', 'To brukes i bindingene til H.', 'De fire som er igjen gir **to** ledige par.'],
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-15',
      niva: 2,
      type: 'flervalg',
      mal: [7],
      sporsmal: 'Hvilken form har et vannmolekyl?',
      alternativer: ['Lineær', 'Vinklet', 'Trigonal pyramide', 'Tetraedrisk'],
      svar: 1,
      hint: 'O har to bindende og to ledige elektronpar.',
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-16',
      niva: 2,
      type: 'kobling',
      mal: [7],
      sporsmal: 'Koble molekylet med riktig form.',
      par: [
        ['{{CO2}}', 'lineær'],
        ['{{H2O}}', 'vinklet'],
        ['{{NH3}}', 'trigonal pyramide'],
        ['{{CH4}}', 'tetraedrisk'],
        ['{{BF3}}', 'trigonal plan'],
      ],
      hint: 'Tell bindende og ledige elektronpar rundt sentralatomet.',
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-17',
      niva: 2,
      type: 'flervalg',
      mal: [7],
      sporsmal: 'Hvilken binding er det mellom atomene i {{N2}}?',
      alternativer: ['Enkeltbinding', 'Dobbeltbinding', 'Trippelbinding', 'Ionebinding'],
      svar: 2,
      stokk: false,
      hint: 'Hvert N-atom har 5 valenselektroner og trenger 3 til for å få oktett.',
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-26',
      niva: 3,
      type: 'tall',
      mal: [7],
      sporsmal: 'Hvor mange valenselektroner må fordeles i Lewisstrukturen til {{CO2}}?',
      svar: 16,
      heltall: true,
      enhet: null,
      hint: 'C har 4 valenselektroner og O har 6.',
      steg: [
        'C: 4 valenselektroner. O: 6 valenselektroner.',
        'Totalt: $4 + 2 \\cdot 6 = 16$',
        'De fordeles som to dobbeltbindinger (8 elektroner) og to ledige par på hvert O (8 elektroner).',
      ],
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-28',
      niva: 3,
      type: 'tall',
      mal: [7, 14],
      sporsmal: 'Hvor mange valenselektroner må fordeles i Lewisstrukturen til ammoniumionet, {{NH4+}}?',
      svar: 8,
      heltall: true,
      enhet: null,
      hint: 'Husk at ladningen +1 betyr ett elektron mindre.',
      steg: [
        'N: 5, H: 4 · 1 = 4. Sum: 9',
        'Ladning +1: $9 - 1 = 8$ valenselektroner',
        'De danner fire N–H-bindinger (tetraedrisk ion).',
      ],
      modul: 'sterke-bindinger',
    },
  ],
  flashcards: [
    { f: 'Oktettregelen', b: 'Atomer får ofte åtte elektroner i ytterste skall (edelgasskonfigurasjon). H: to.' },
    { f: 'Kovalent binding', b: 'Elektronpar som deles mellom to atomer (ikke-metaller).' },
    { f: 'Enkelt-, dobbelt- og trippelbinding', b: '1, 2 og 3 delte elektronpar, f.eks. H–H, O=O og N≡N.' },
    {
      f: 'Lewisstruktur',
      b: 'Tegning av valenselektronene som prikker eller streker, med bindende og ledige elektronpar.',
    },
    { f: 'Ledig elektronpar', b: 'Elektronpar i valensskallet som ikke inngår i en binding.' },
    {
      f: 'VSEPR-former',
      b: 'Lineær ({{CO2}}), trigonal plan ({{BF3}}), tetraedrisk ({{CH4}}), pyramide ({{NH3}}), vinklet ({{H2O}}).',
    },
  ],
});
