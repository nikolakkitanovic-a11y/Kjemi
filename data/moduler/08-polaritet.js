/*
 * Modul 8: Polare bindinger og dipoler
 * Læringsmål: 8
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */

KJ.modul({
  id: 'polaritet',
  nr: 8,
  tittel: 'Polare bindinger og dipoler',
  beskrivelse: 'Bruk elektronegativitet til å avgjøre om en binding er polar, og geometri til å avgjøre om molekylet er en dipol.',
  mal: [8],
  farge: '#6FAA22',
  bolge: 544,
  huskeliste: [
    'ΔEN under ca. 0,5: upolar · 0,5–1,7: polar · over 1,7: ionisk (tommelfingerregel).',
    '**Dipol** = polare bindinger + usymmetrisk form. {{CO2}} og {{CCl4}} er upolare, {{H2O}} og {{NH3}} er dipoler.',
  ],
  teori: [
    {
      h: 'Hvorfor danner atomer bindinger?',
      tekst: `Atomer danner bindinger fordi de da får lavere energi og blir mer stabile. Ofte oppnår de **edelgasskonfigurasjon**: åtte elektroner i ytterste skall (**oktettregelen**). Hydrogen nøyer seg med to (duett).

Det finnes tre typer sterke bindinger: **ionebinding**, **kovalent binding** og **metallbinding**. Hvilken binding vi får, avhenger av forskjellen i elektronegativitet, $\\Delta EN$.`,
      tabell: {
        hode: ['$\\Delta EN$', 'Bindingstype', 'Eksempel'],
        rader: [
          ['0 – ca. 0,4', 'Upolar kovalent binding', 'H–H, C–H (0,4)'],
          ['ca. 0,5 – 1,7', 'Polar kovalent binding', 'O–H (1,4), H–Cl (1,1)'],
          ['over 1,7', 'Ionebinding', 'Na–Cl (2,3), Na–F (3,1)'],
          ['metall + metall', 'Metallbinding', 'Cu, Fe, messing'],
        ],
      },
      merk: 'Grensene er tommelfingerregler. NaH er en ioneforbindelse selv om $\\Delta EN = 1,2$, og HF er kovalent selv om $\\Delta EN = 1,9$. Mellom to ikke-metaller får vi i praksis alltid kovalent binding.',
    },
    {
      h: 'Polare bindinger og dipolmolekyler',
      tekst: `Når to atomer med ulik elektronegativitet deler et elektronpar, trekkes paret mot det mest elektronegative atomet. Det får en negativ delladning ($\\delta^-$), og det andre atomet får en positiv delladning ($\\delta^+$). Bindingen er **polar**.

Et molekyl med polare bindinger er et **dipolmolekyl** bare hvis formen er usymmetrisk, slik at delladningene ikke opphever hverandre.

- {{H2O}} (vinklet) og {{NH3}} (pyramide) er dipolmolekyler.
- {{CO2}} (lineært) og {{CH4}} (tetraedrisk) er upolare, selv om bindingene er polare, fordi dipolene opphever hverandre.`,
    },
  ],
  begreper: [
    {
      term: 'Polar kovalent binding',
      def: 'Elektronparet er forskjøvet mot det mest elektronegative atomet ($\\delta^+$/$\\delta^-$).',
    },
    {
      term: 'Dipolmolekyl',
      def: 'Molekyl med en positiv og en negativ side. Krever polare bindinger og usymmetrisk form.',
    },
  ],
  eksempler: [
    {
      tittel: 'Bestem bindingstypen med ΔEN',
      oppgave: 'Hvilken binding er det i (a) HCl, (b) MgO og (c) {{Cl2}}?',
      steg: [
        '(a) H 2,1 og Cl 3,2: $\\Delta EN = 1,1$ → polar kovalent binding.',
        '(b) Mg 1,2 og O 3,5: $\\Delta EN = 2,3$ → ionebinding (metall + ikke-metall).',
        '(c) To like atomer: $\\Delta EN = 0$ → upolar kovalent binding.',
      ],
    },
    {
      tittel: 'Er molekylet en dipol?',
      oppgave: 'Avgjør om {{H2O}} og {{CO2}} er dipolmolekyler.',
      steg: [
        'Begge har polare bindinger (O–H: 1,4 og C=O: 1,0).',
        '{{H2O}}: O har to bindende og to ledige par → vinklet form. Delladningene opphever ikke hverandre → dipol.',
        '{{CO2}}: C har to dobbeltbindinger og ingen ledige par → lineær form. Dipolene peker motsatt vei og opphever hverandre → upolart.',
      ],
    },
  ],
  feller: [
    'Et molekyl med polare bindinger er ikke nødvendigvis et dipolmolekyl. Formen avgjør ({{CO2}} er upolart).',
    'ΔEN-grensene (0,5 og 1,7) er tommelfingerregler, ikke skarpe grenser.',
    'Regn ut ΔEN med verdiene fra tabellen. Ikke gjett ut fra plasseringen alene.',
    'To spørsmål, to begrunnelser: **bindingen** er polar på grunn av ΔEN, **molekylet** er en dipol på grunn av formen.',
  ],
  oppgaver: [
    {
      id: 'sb-04',
      niva: 1,
      type: 'tall',
      mal: [8],
      sporsmal: 'Regn ut $\\Delta EN$ for bindingen i HCl. (H: 2,1, Cl: 3,2)',
      svar: 1.1,
      abs: 0.001,
      hint: 'Trekk den minste verdien fra den største.',
      steg: [
        '$\\Delta EN = 3,2 - 2,1 = 1,1$',
        'Forskjellen er mellom 0,5 og 1,7, og begge er ikke-metaller: det er en polar kovalent binding. Cl får δ− og H får δ+.',
      ],
      modul: 'sterke-bindinger',
    },
    {
      id: 'op-7a',
      niva: 1,
      type: 'flervalg',
      mal: [8],
      ove: true,
      sporsmal: 'Hva slags sterk binding er det mellom atomene i {{PCl3}}? (EN: P 2,2, Cl 3,2)',
      alternativer: [
        'Polar kovalent binding, fordi ΔEN = 3,2 − 2,2 = 1,0',
        'Ionebinding, fordi ΔEN er større enn 1,7',
        'Upolar kovalent binding, fordi begge er ikke-metaller',
        'Metallbinding',
      ],
      svar: 0,
      forklaring: 'P og Cl er ikke-metaller og deler elektronpar (kovalent binding). ΔEN = 1,0 ligger mellom 0,5 og 1,7, så bindingen er **polar**: elektronparet er forskjøvet mot Cl, som får δ−. To ikke-metaller kan godt danne polare bindinger, så C er feil.',
    },
    {
      id: 'op-7a2',
      niva: 1,
      type: 'flervalg',
      mal: [8],
      ove: true,
      sporsmal: 'Hva slags sterk binding er det mellom atomene i {{H2S}}? (EN: H 2,1, S 2,6)',
      alternativer: [
        'Polar kovalent binding (svakt polar), fordi ΔEN = 2,6 − 2,1 = 0,5',
        'Ionebinding, fordi H avgir et elektron til S',
        'Hydrogenbinding, fordi H er bundet til S',
        'Metallbinding',
      ],
      svar: 0,
      forklaring: 'H og S er ikke-metaller som deler elektronpar: kovalent binding. ΔEN = 0,5 er på grensen, så bindingen er **svakt polar**. Hydrogenbinding (C) er en svak binding *mellom* molekyler, og den krever at H er bundet til N, O eller F.',
    },
    {
      id: 'sb-10',
      niva: 2,
      type: 'tall',
      mal: [8],
      sporsmal: 'Regn ut $\\Delta EN$ for MgO, og avgjør bindingstypen for deg selv. (Mg: 1,2, O: 3,5)',
      svar: 2.3,
      enhet: null,
      abs: 0.001,
      steg: ['$\\Delta EN = 3,5 - 1,2 = 2,3$', '$2,3 > 1,7$, og det er et metall + ikke-metall → ionebinding.'],
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-11',
      niva: 2,
      type: 'sortering',
      mal: [8],
      sporsmal: 'Bruk elektronegativitet og sorter bindingene.',
      kategorier: ['Upolar kovalent', 'Polar kovalent', 'Ionebinding'],
      elementer: [['Cl–Cl', 0], ['C–H', 0], ['O–H', 1], ['N–H', 1], ['C–O', 1], ['Na–F', 2], ['K–Cl', 2], ['H–H', 0]],
      hint: 'EN: H 2,1 · C 2,5 · N 3,0 · O 3,5 · F 4,0 · Na 0,9 · Cl 3,2 · K 0,8',
      forklaring: 'ΔEN: Cl–Cl 0, C–H 0,4, H–H 0 (upolare). O–H 1,4, N–H 0,9, C–O 1,0 (polare). Na–F 3,1, K–Cl 2,4 (ionebinding).',
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-12',
      niva: 2,
      type: 'rekkefolge',
      mal: [8],
      sporsmal: 'Ranger bindingene etter økende polaritet.',
      fra: 'Minst polar',
      til: 'Mest polar',
      elementer: ['C–H', 'N–H', 'C–O', 'O–H', 'H–F'],
      hint: 'Regn ut ΔEN for hver binding. H 2,1 · C 2,5 · N 3,0 · O 3,5 · F 4,0',
      forklaring: 'C–H 0,4 < N–H 0,9 < C–O 1,0 < O–H 1,4 < H–F 1,9.',
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-18',
      niva: 2,
      type: 'flervalg',
      mal: [8, 7],
      sporsmal: 'C=O-bindingene i {{CO2}} er polare. Hvorfor er likevel {{CO2}} et upolart molekyl?',
      alternativer: [
        'Molekylet er lineært og symmetrisk, så dipolene opphever hverandre',
        'Karbon og oksygen har lik elektronegativitet',
        'Molekylet har ledige elektronpar på karbon',
        'Dobbeltbindinger er alltid upolare',
      ],
      svar: 0,
      forklaring: 'Hver C=O-binding er polar (O er mer elektronegativt enn C). Men {{CO2}} er **lineært og symmetrisk**: de to bindingsdipolene er like store og peker motsatt vei, så de opphever hverandre. Molekylet blir upolart.',
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-19',
      niva: 2,
      type: 'sortering',
      mal: [8],
      sporsmal: 'Er molekylene dipolmolekyler eller upolare?',
      kategorier: ['Dipolmolekyl', 'Upolart molekyl'],
      elementer: [
        ['{{H2O}}', 0],
        ['{{CO2}}', 1],
        ['{{NH3}}', 0],
        ['{{CH4}}', 1],
        ['{{HCl}}', 0],
        ['{{CCl4}}', 1],
        ['{{O2}}', 1],
        ['{{CH3Cl}}', 0],
      ],
      hint: 'Har molekylet polare bindinger? Og er formen symmetrisk?',
      forklaring: '{{CH3Cl}} er tetraedrisk, men ikke symmetrisk: én binding er C–Cl og tre er C–H. Da opphever ikke dipolene hverandre.',
      modul: 'sterke-bindinger',
    },
    {
      id: 'op-7v2',
      niva: 2,
      type: 'forklaring',
      mal: [8, 7],
      sporsmal: `Se på forbindelsene HCl og {{CO2}}.

a) Forklar hva slags sterk binding som dannes mellom atomene.
b) Tegn elektronprikkformler.
c) Vil noen av forbindelsene danne dipol? Forklar kort.

Elektronegativitet (som på prøven): H 2,1 · C 2,5 · N 3,0 · O 3,5 · P 2,2 · S 2,6 · Cl 3,2`,
      fagbegreper: ['polar', 'ΔEN|elektronegativitet', 'dobbeltbinding', 'lineær', 'symmetri', 'dipol'],
      modellsvar: `**a)** HCl: $\\Delta EN = 3,2 - 2,1 = 1,1$ → **polar kovalent binding**. {{CO2}}: $\\Delta EN = 3,5 - 2,5 = 1,0$ → **polare kovalente bindinger** (to dobbeltbindinger).

**b)** HCl: én binding mellom H og Cl, og tre ledige par på Cl (8 valenselektroner). {{CO2}}: O=C=O med to ledige par på hvert O-atom (16 valenselektroner).

**c)** HCl har bare én polar binding, så molekylet er en **dipol** (Cl δ−, H δ+). {{CO2}} er **lineært og symmetrisk**: de to bindingsdipolene er like store og peker motsatt vei, så de opphever hverandre. {{CO2}} er **ikke en dipol**.`,
      punkter: [
        'a) Polare kovalente bindinger, ΔEN 1,1 og 1,0',
        'b) HCl med tre ledige par på Cl, CO₂ med to dobbeltbindinger',
        'c) HCl er en dipol',
        'c) CO₂ er lineært og symmetrisk → ikke dipol',
      ],
    },
    {
      id: 'sb-23',
      niva: 3,
      type: 'flervalg',
      mal: [8],
      sporsmal: 'Tommelfingerregelen sier at $\\Delta EN > 1,7$ gir ionebinding. Hvilke stoffer passer **ikke** med regelen?',
      alternativer: [
        'HF ($\\Delta EN = 1,9$) er kovalent',
        'NaH ($\\Delta EN = 1,2$) er en ioneforbindelse',
        'NaCl ($\\Delta EN = 2,3$) er en ioneforbindelse',
        '{{CH4}} ($\\Delta EN = 0,4$) er kovalent',
      ],
      svar: [0, 1],
      hint: 'Sjekk om ΔEN-verdien og bindingstypen stemmer med grensene.',
      forklaring: 'HF er et molekyl av to ikke-metaller, selv om ΔEN er over 1,7. NaH er et salt med {{H-}}-ioner, selv om ΔEN er under 1,7. Regelen er bare en tommelfingerregel.',
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-25',
      niva: 3,
      type: 'forklaring',
      mal: [8, 7],
      sporsmal: '{{NH3}} er et dipolmolekyl, mens {{CCl4}} er upolart. Begge har polare bindinger. Forklar forskjellen.',
      modellsvar: `Begge molekylene har polare bindinger: N–H har $\\Delta EN = 3,0 - 2,1 = 0,9$ og C–Cl har $\\Delta EN = 3,2 - 2,5 = 0,7$.

I {{NH3}} har nitrogen tre bindende elektronpar og **ett ledig elektronpar**. De fire elektronområdene gir en **trigonal pyramide**, som er usymmetrisk. Dipolene opphever ikke hverandre, og molekylet får en positiv og en negativ side: det er en **dipol**.

I {{CCl4}} har karbon fire bindende par og **ingen ledige par**. Molekylet er **tetraedrisk** med fire like atomer rundt C. Formen er symmetrisk, så dipolene opphever hverandre, og molekylet er **upolart**.`,
      punkter: [
        'Begge har polare bindinger (ΔEN 0,9 og 0,7)',
        'NH₃ har ett ledig elektronpar på N → trigonal pyramide (usymmetrisk)',
        'CCl₄ har ingen ledige par på C og fire like atomer → tetraedrisk (symmetrisk)',
        'I CCl₄ opphever dipolene hverandre, i NH₃ gjør de ikke det',
      ],
      modul: 'sterke-bindinger',
    },
    {
      id: 'op-7',
      niva: 3,
      type: 'forklaring',
      mal: [8, 7],
      ove: true,
      sporsmal: `Se på forbindelsene {{H2S}} og {{PCl3}}.

a) Forklar hva slags sterk binding som dannes mellom atomene i forbindelsene.
b) Tegn elektronprikkformler til forbindelsene.
c) Vil noen av forbindelsene danne dipol? Forklar kort.

Elektronegativitet (som på prøven): H 2,1 · C 2,5 · N 3,0 · O 3,5 · P 2,2 · S 2,6 · Cl 3,2`,
      fagbegreper: [
        'kovalent',
        'polar',
        'ΔEN|elektronegativitet',
        'ledig elektronpar|ledige elektronpar|ledig par',
        'vinklet',
        'pyramide',
        'dipol',
      ],
      kriterier: {
        lav: 'Sier at det er kovalente bindinger og tegner noen av bindingene.',
        middels: 'Regner ut ΔEN, tegner riktige elektronprikkformler og sier om molekylene er dipoler.',
        hoy: 'Bruker ΔEN, ledige elektronpar og molekylform til å begrunne hvorfor begge er dipoler, og bruker fagbegrepene presist.',
      },
      modellsvar: `**a)** Begge forbindelsene består av ikke-metaller, så atomene deler elektronpar: **kovalent binding**.
- {{H2S}}: $\\Delta EN = 2,6 - 2,1 = 0,5$ → **polar kovalent binding** (svakt polar). S får δ−, H får δ+.
- {{PCl3}}: $\\Delta EN = 3,2 - 2,2 = 1,0$ → **polar kovalent binding**. Cl får δ−, P får δ+.

**b)**
- {{H2S}}: 2 · 1 + 6 = 8 valenselektroner. S i midten med to enkeltbindinger til H og **to ledige elektronpar** på S.
- {{PCl3}}: 5 + 3 · 7 = 26 valenselektroner. P i midten med tre enkeltbindinger til Cl, **ett ledig elektronpar** på P og tre ledige par på hvert Cl-atom.

**c)** Begge danner dipoler.
- {{H2S}} er **vinklet** (to bindende og to ledige par på S). Formen er usymmetrisk, så de polare bindingene opphever ikke hverandre. Dipolen er svak, fordi ΔEN bare er 0,5.
- {{PCl3}} er en **trigonal pyramide** (tre bindende og ett ledig par på P). Formen er usymmetrisk, og bindingene er tydelig polare, så molekylet er en dipol.`,
      punkter: [
        'a) Polar kovalent binding i begge, med ΔEN-utregning (0,5 og 1,0)',
        'b) H₂S: to bindinger og to ledige par på S',
        'b) PCl₃: tre bindinger og ett ledig par på P, tre ledige par på hvert Cl',
        'c) H₂S er vinklet og PCl₃ en trigonal pyramide',
        'c) Usymmetrisk form og polare bindinger → begge er dipoler',
      ],
    },
    {
      id: 'op-7v',
      niva: 3,
      type: 'forklaring',
      mal: [8, 7],
      sporsmal: `Se på forbindelsene {{NH3}} og {{CCl4}}.

a) Forklar hva slags sterk binding som dannes mellom atomene.
b) Tegn elektronprikkformler.
c) Vil noen av forbindelsene danne dipol? Forklar kort.

Elektronegativitet (som på prøven): H 2,1 · C 2,5 · N 3,0 · O 3,5 · P 2,2 · S 2,6 · Cl 3,2`,
      fagbegreper: [
        'polar',
        'ΔEN|elektronegativitet',
        'ledig elektronpar|ledige elektronpar|ledig par',
        'pyramide',
        'tetraed',
        'symmetri',
        'dipol',
      ],
      modellsvar: `**a)** Begge har **polare kovalente bindinger**: N–H har $\\Delta EN = 3,0 - 2,1 = 0,9$, og C–Cl har $\\Delta EN = 3,2 - 2,5 = 0,7$.

**b)** {{NH3}}: 8 valenselektroner, tre N–H-bindinger og **ett ledig par** på N. {{CCl4}}: 32 valenselektroner, fire C–Cl-bindinger, **ingen ledige par** på C og tre ledige par på hvert Cl.

**c)** {{NH3}} er en **trigonal pyramide** og usymmetrisk, så den er en **dipol**. {{CCl4}} er **tetraedrisk** med fire like atomer rundt C. Formen er symmetrisk, dipolene opphever hverandre, og molekylet er **ikke en dipol**, selv om bindingene er polare.`,
      punkter: [
        'a) Polare kovalente bindinger, ΔEN 0,9 og 0,7',
        'b) NH₃ med ett ledig par på N, CCl₄ uten ledige par på C',
        'c) NH₃: trigonal pyramide → dipol',
        'c) CCl₄: tetraedrisk og symmetrisk → ikke dipol',
      ],
    },
  ],
  flashcards: [
    {
      f: 'ΔEN-grenser',
      b: '0–0,4: upolar kovalent · 0,5–1,7: polar kovalent · over 1,7: ionebinding (tommelfingerregel).',
    },
    { f: 'Dipolmolekyl', b: 'Polare bindinger + usymmetrisk form → positiv og negativ side. F.eks. {{H2O}}, {{NH3}}.' },
    {
      f: 'Polar binding eller dipolmolekyl?',
      b: 'Polar binding: ulik EN mellom to atomer. Dipolmolekyl: polare bindinger + usymmetrisk form, så delladningene ikke opphever hverandre.',
    },
  ],
});
