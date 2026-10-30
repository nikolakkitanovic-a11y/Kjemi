/*
 * Tema 4: Sterke bindinger – ionebinding, kovalent binding og metallbinding
 */
KJ.tema({
  id: 'sterke-bindinger',
  nr: 4,
  tittel: 'Sterke bindinger',
  beskrivelse: 'Ionebinding, kovalent binding, polaritet, molekylform (VSEPR) og metallbinding.',
  farge: '#5FA52A',
  bolge: 546,
  linje: 'Hg 546 nm',
  kilde: 'notater',
  mal: [
    'Forklare ionebinding, kovalent binding og metallbinding',
    'Bruke elektronegativitet og molekylform til å forklare polaritet',
    'Forklare egenskaper ved stoffer ut fra bindingstype og struktur',
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
          ['ca. 0,5 – 1,7', 'Polar kovalent binding', 'O–H (1,4), H–Cl (0,9)'],
          ['over 1,7', 'Ionebinding', 'Na–Cl (2,1), Na–F (3,1)'],
          ['metall + metall', 'Metallbinding', 'Cu, Fe, messing'],
        ],
      },
      merk: 'Grensene er tommelfingerregler. NaH er en ioneforbindelse selv om $\\Delta EN = 1,2$, og HF er kovalent selv om $\\Delta EN = 1,9$. Mellom to ikke-metaller får vi i praksis alltid kovalent binding.',
    },
    {
      h: 'Ionebinding',
      tekst: `Ionebinding dannes mellom et **metall** og et **ikke-metall**. Metallet avgir valenselektroner og blir et kation, ikke-metallet tar opp elektroner og blir et anion. Ionebindingen er den elektrostatiske tiltrekningen mellom de motsatt ladde ionene.

{{Na}} → {{Na+}} + {{e-}}  og  {{Cl}} + {{e-}} → {{Cl-}}

Ionene ordner seg i et regelmessig **ionegitter** (krystallgitter). Ioneforbindelser kalles **salter**. Formelen viser forholdet mellom ionene, og den minste enheten kalles en **formelenhet** (f.eks. NaCl).

**Egenskaper:** høyt smeltepunkt, harde men sprø, leder strøm når de er smeltet eller løst i vann (ionene kan bevege seg), men ikke i fast form.

Bindingen blir sterkere jo **høyere ladning** og jo **mindre** ionene er. Derfor har MgO (2852 °C) mye høyere smeltepunkt enn NaCl (801 °C).`,
    },
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
      h: 'Polare bindinger og dipolmolekyler',
      tekst: `Når to atomer med ulik elektronegativitet deler et elektronpar, trekkes paret mot det mest elektronegative atomet. Det får en negativ delladning ($\\delta^-$), og det andre atomet får en positiv delladning ($\\delta^+$). Bindingen er **polar**.

Et molekyl med polare bindinger er et **dipolmolekyl** bare hvis formen er usymmetrisk, slik at delladningene ikke opphever hverandre.

- {{H2O}} (vinklet) og {{NH3}} (pyramide) er dipolmolekyler.
- {{CO2}} (lineært) og {{CH4}} (tetraedrisk) er upolare, selv om bindingene er polare, fordi dipolene opphever hverandre.`,
    },
    {
      h: 'Molekylform (VSEPR)',
      tekst: `Elektronparene rundt sentralatomet frastøter hverandre og ordner seg så langt fra hverandre som mulig. Både bindende og ledige elektronpar teller (en dobbelt- eller trippelbinding teller som ett område). Ledige par tar litt mer plass og presser bindingene sammen.`,
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
    {
      h: 'Metallbinding',
      tekst: `I et metall har atomene avgitt valenselektronene sine. Metallkationene sitter i et regelmessig **metallgitter**, og valenselektronene beveger seg fritt mellom dem som en «**elektronsjø**» (delokaliserte elektroner). Tiltrekningen mellom kationene og elektronsjøen er metallbindingen.

**Egenskaper:**
- Leder strøm og varme godt fordi de frie elektronene kan bevege seg.
- Formbare (kan hamres og bøyes): bindingen har ingen bestemt retning, så lagene av kationer kan gli forbi hverandre uten at bindingen brytes.
- Metallisk glans.

Smeltepunktet øker med flere valenselektroner og mindre kationer: Na (98 °C) < Mg (650 °C) < Al (660 °C).

En **legering** er en blanding av metaller (f.eks. messing = kobber + sink, stål = jern + karbon).`,
    },
    {
      h: 'Atomgitter (kovalente nettverk)',
      tekst: `Noen stoffer består av ett stort nettverk der alle atomene er bundet sammen med kovalente bindinger. Eksempler er **diamant** (hvert C-atom bundet til fire andre), **grafitt** (lag av C-atomer) og **kvarts**, {{SiO2}}.

For å smelte stoffet må sterke kovalente bindinger brytes. Atomgitter har derfor svært høye smeltepunkter, og diamant er det hardeste naturlige stoffet. Grafitt leder strøm, fordi ett elektron per C-atom er delokalisert i lagene.`,
    },
  ],

  begreper: [
    { term: 'Oktettregelen', def: 'Atomer får ofte åtte elektroner i ytterste skall når de danner bindinger (H: to).' },
    { term: 'Ionebinding', def: 'Elektrostatisk tiltrekning mellom kationer og anioner. Metall + ikke-metall, $\\Delta EN > 1,7$.' },
    { term: 'Ionegitter / formelenhet', def: 'Regelmessig gitter av ioner. Formelenheten er den minste enheten (f.eks. NaCl).' },
    { term: 'Kovalent binding', def: 'Et elektronpar som deles mellom to atomer, vanligvis ikke-metaller.' },
    { term: 'Ledig elektronpar', def: 'Elektronpar i valensskallet som ikke deltar i en binding.' },
    { term: 'Polar kovalent binding', def: 'Elektronparet er forskjøvet mot det mest elektronegative atomet ($\\delta^+$/$\\delta^-$).' },
    { term: 'Dipolmolekyl', def: 'Molekyl med en positiv og en negativ side. Krever polare bindinger og usymmetrisk form.' },
    { term: 'VSEPR', def: 'Elektronparene rundt sentralatomet frastøter hverandre og bestemmer formen.' },
    { term: 'Metallbinding', def: 'Metallkationer i et gitter, holdt sammen av en sjø av delokaliserte elektroner.' },
    { term: 'Atomgitter', def: 'Nettverk av atomer bundet kovalent, f.eks. diamant og {{SiO2}}.' },
  ],

  eksempler: [
    {
      tittel: 'Bestem bindingstypen med ΔEN',
      oppgave: 'Hvilken binding er det i (a) HCl, (b) MgO og (c) {{Cl2}}?',
      steg: [
        '(a) H 2,1 og Cl 3,0: $\\Delta EN = 0,9$ → polar kovalent binding.',
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
    'Metaller har en **fast krystallstruktur** (metallgitter). De er formbare fordi lagene kan gli uten at bindingen brytes, ikke fordi de mangler struktur.',
    'Et molekyl med polare bindinger er ikke nødvendigvis et dipolmolekyl. Formen avgjør ({{CO2}} er upolart).',
    'Ioneforbindelser leder ikke strøm i fast form. Ionene må kunne bevege seg (smeltet eller løst).',
    'ΔEN-grensene (0,5 og 1,7) er tommelfingerregler, ikke skarpe grenser.',
  ],

  oppgaver: [
    /* ---------- Grunnleggende ---------- */
    {
      id: 'sb-01', niva: 1, type: 'flervalg',
      sporsmal: 'Hvilken type binding er det mellom natrium og klor i NaCl?',
      alternativer: ['Ionebinding', 'Upolar kovalent binding', 'Metallbinding', 'Hydrogenbinding'],
      svar: 0,
      hint: 'Natrium er et metall, klor er et ikke-metall.',
    },
    {
      id: 'sb-02', niva: 1, type: 'flervalg',
      sporsmal: 'Hva er en kovalent binding?',
      alternativer: [
        'Et elektronpar som deles mellom to atomer',
        'Tiltrekning mellom positive og negative ioner',
        'Kationer i en sjø av frie elektroner',
        'En svak kraft mellom molekyler',
      ],
      svar: 0,
    },
    {
      id: 'sb-03', niva: 1, type: 'sortering',
      sporsmal: 'Hvilken binding holder stoffene sammen?',
      kategorier: ['Ionebinding', 'Kovalent', 'Metallbinding'],
      elementer: [['{{NaCl}}', 0], ['{{H2O}}', 1], ['{{Cu}}', 2], ['{{MgO}}', 0], ['{{CH4}}', 1], ['{{Fe}}', 2], ['{{KBr}}', 0], ['{{CO2}}', 1], ['Messing (Cu + Zn)', 2]],
      hint: 'Metall + ikke-metall → ionebinding. Ikke-metall + ikke-metall → kovalent. Metall + metall → metallbinding.',
    },
    {
      id: 'sb-04', niva: 1, type: 'tall',
      sporsmal: 'Regn ut $\\Delta EN$ for bindingen i HCl. (H: 2,1, Cl: 3,0)',
      svar: 0.9, abs: 0.001, enhet: null,
      hint: 'Trekk den minste verdien fra den største.',
      steg: ['$\\Delta EN = 3,0 - 2,1 = 0,9$', 'Det er en polar kovalent binding.'],
    },
    {
      id: 'sb-05', niva: 1, type: 'flervalg',
      sporsmal: 'Hvor mange elektroner deles i en dobbeltbinding?',
      alternativer: ['2', '4', '6', '8'],
      svar: 1, stokk: false,
      hint: 'En dobbeltbinding er to delte elektronpar.',
    },
    {
      id: 'sb-06', niva: 1, type: 'kobling',
      sporsmal: 'Koble bindingstypen med riktig beskrivelse.',
      par: [
        ['Ionebinding', 'tiltrekning mellom positive og negative ioner'],
        ['Upolar kovalent binding', 'elektronparet deles likt'],
        ['Polar kovalent binding', 'elektronparet er forskjøvet mot det mest elektronegative atomet'],
        ['Metallbinding', 'kationer i en sjø av delokaliserte elektroner'],
      ],
    },
    {
      id: 'sb-07', niva: 1, type: 'flervalg',
      sporsmal: 'Hvorfor leder metaller elektrisk strøm?',
      alternativer: [
        'De har frie (delokaliserte) elektroner som kan bevege seg',
        'De inneholder ioner som kan bevege seg',
        'Atomene deler elektronpar',
        'De har høyt smeltepunkt',
      ],
      svar: 0,
    },
    {
      id: 'sb-08', niva: 1, type: 'flervalg',
      sporsmal: 'Hvilken egenskap har typiske ioneforbindelser?',
      alternativer: [
        'Høyt smeltepunkt, og de leder strøm når de er smeltet',
        'Lavt smeltepunkt, og de leder strøm i fast form',
        'De er myke og lette å forme',
        'De består av molekyler',
      ],
      svar: 0,
    },
    {
      id: 'sb-09', niva: 1, type: 'fyllinn',
      sporsmal: 'Fyll inn.',
      tekst: 'Når et metall reagerer med et ikke-metall, ___ metallet elektroner og blir et ___.',
      svar: [['avgir', 'gir fra seg', 'mister', 'gir bort'], ['kation', 'positivt ion']],
    },
    /* ---------- Middels ---------- */
    {
      id: 'sb-10', niva: 2, type: 'tall',
      sporsmal: 'Regn ut $\\Delta EN$ for MgO, og avgjør bindingstypen for deg selv. (Mg: 1,2, O: 3,5)',
      svar: 2.3, abs: 0.001, enhet: null,
      steg: ['$\\Delta EN = 3,5 - 1,2 = 2,3$', '$2,3 > 1,7$, og det er et metall + ikke-metall → ionebinding.'],
    },
    {
      id: 'sb-11', niva: 2, type: 'sortering',
      sporsmal: 'Bruk elektronegativitet og sorter bindingene.',
      kategorier: ['Upolar kovalent', 'Polar kovalent', 'Ionebinding'],
      elementer: [['Cl–Cl', 0], ['C–H', 0], ['O–H', 1], ['N–H', 1], ['C–O', 1], ['Na–F', 2], ['K–Cl', 2], ['H–H', 0]],
      hint: 'EN: H 2,1 · C 2,5 · N 3,0 · O 3,5 · F 4,0 · Na 0,9 · Cl 3,0 · K 0,8',
      forklaring: 'ΔEN: Cl–Cl 0, C–H 0,4, H–H 0 (upolare). O–H 1,4, N–H 0,9, C–O 1,0 (polare). Na–F 3,1, K–Cl 2,2 (ionebinding).',
    },
    {
      id: 'sb-12', niva: 2, type: 'rekkefolge',
      sporsmal: 'Ranger bindingene etter økende polaritet.',
      fra: 'Minst polar', til: 'Mest polar',
      elementer: ['C–H', 'N–H', 'C–O', 'O–H', 'H–F'],
      hint: 'Regn ut ΔEN for hver binding. H 2,1 · C 2,5 · N 3,0 · O 3,5 · F 4,0',
      forklaring: 'C–H 0,4 < N–H 0,9 < C–O 1,0 < O–H 1,4 < H–F 1,9.',
    },
    {
      id: 'sb-13', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange ledige (frie) elektronpar har nitrogenatomet i ammoniakk, {{NH3}}?',
      svar: 1, heltall: true, enhet: null,
      hint: 'N har 5 valenselektroner. Tre av dem brukes i bindinger til H.',
      steg: ['N har 5 valenselektroner.', 'Tre elektroner danner tre bindinger med H.', 'De to siste utgjør **ett** ledig elektronpar.'],
    },
    {
      id: 'sb-14', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange ledige elektronpar har oksygenatomet i vann, {{H2O}}?',
      svar: 2, heltall: true, enhet: null,
      hint: 'O har 6 valenselektroner, og to av dem brukes i bindinger.',
      steg: ['O har 6 valenselektroner.', 'To brukes i bindingene til H.', 'De fire som er igjen gir **to** ledige par.'],
    },
    {
      id: 'sb-15', niva: 2, type: 'flervalg',
      sporsmal: 'Hvilken form har et vannmolekyl?',
      alternativer: ['Lineær', 'Vinklet', 'Trigonal pyramide', 'Tetraedrisk'],
      svar: 1,
      hint: 'O har to bindende og to ledige elektronpar.',
    },
    {
      id: 'sb-16', niva: 2, type: 'kobling',
      sporsmal: 'Koble molekylet med riktig form.',
      par: [
        ['{{CO2}}', 'lineær'],
        ['{{H2O}}', 'vinklet'],
        ['{{NH3}}', 'trigonal pyramide'],
        ['{{CH4}}', 'tetraedrisk'],
        ['{{BF3}}', 'trigonal plan'],
      ],
      hint: 'Tell bindende og ledige elektronpar rundt sentralatomet.',
    },
    {
      id: 'sb-17', niva: 2, type: 'flervalg',
      sporsmal: 'Hvilken binding er det mellom atomene i {{N2}}?',
      alternativer: ['Enkeltbinding', 'Dobbeltbinding', 'Trippelbinding', 'Ionebinding'],
      svar: 2, stokk: false,
      hint: 'Hvert N-atom har 5 valenselektroner og trenger 3 til for å få oktett.',
    },
    {
      id: 'sb-18', niva: 2, type: 'flervalg',
      sporsmal: 'C=O-bindingene i {{CO2}} er polare. Hvorfor er likevel {{CO2}} et upolart molekyl?',
      alternativer: [
        'Molekylet er lineært og symmetrisk, så dipolene opphever hverandre',
        'Karbon og oksygen har lik elektronegativitet',
        'Molekylet har ledige elektronpar på karbon',
        'Dobbeltbindinger er alltid upolare',
      ],
      svar: 0,
    },
    {
      id: 'sb-19', niva: 2, type: 'sortering',
      sporsmal: 'Er molekylene dipolmolekyler eller upolare?',
      kategorier: ['Dipolmolekyl', 'Upolart molekyl'],
      elementer: [['{{H2O}}', 0], ['{{CO2}}', 1], ['{{NH3}}', 0], ['{{CH4}}', 1], ['{{HCl}}', 0], ['{{CCl4}}', 1], ['{{O2}}', 1], ['{{CH3Cl}}', 0]],
      hint: 'Har molekylet polare bindinger? Og er formen symmetrisk?',
      forklaring: '{{CH3Cl}} er tetraedrisk, men ikke symmetrisk: én binding er C–Cl og tre er C–H. Da opphever ikke dipolene hverandre.',
    },
    /* ---------- Høy måloppnåelse ---------- */
    {
      id: 'sb-20', niva: 3, type: 'forklaring',
      sporsmal: 'MgO smelter ved 2852 °C, mens NaCl smelter ved 801 °C. Forklar forskjellen.',
      modellsvar: `Begge stoffene er ioneforbindelser med ionegitter, og for å smelte dem må ionebindingene brytes. I MgO har ionene ladning +2 og −2, mens ionene i NaCl har ladning +1 og −1. I tillegg er {{Mg^2+}} og {{O^2-}} mindre enn {{Na+}} og {{Cl-}}, så avstanden mellom ionene er kortere. Den elektrostatiske tiltrekningen øker med ladningene og avtar med avstanden, så bindingene i MgO er mye sterkere. Det kreves derfor mer energi for å bryte gitteret, og smeltepunktet blir høyere.`,
      punkter: [
        'Begge er ioneforbindelser med ionegitter',
        'Ionene i MgO har dobbelt så stor ladning (+2/−2)',
        'Ionene i MgO er mindre, så avstanden er kortere',
        'Sterkere tiltrekning krever mer energi og gir høyere smeltepunkt',
      ],
    },
    {
      id: 'sb-21', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar hvorfor metaller kan hamres og bøyes, mens en saltkrystall knuses når du slår på den.',
      modellsvar: `I et metall holdes kationene sammen av en sjø av delokaliserte elektroner. Bindingen har ingen bestemt retning, så når lagene av kationer forskyves, følger elektronsjøen med og holder fortsatt lagene sammen, og metallet bøyes uten å brekke. I et ionegitter står positive og negative ioner annenhver gang. Forskyves et lag, kommer ioner med lik ladning rett overfor hverandre. De frastøter hverandre, og krystallen sprekker.`,
      punkter: [
        'Metallbindingen er ikke retningsbestemt, og elektronsjøen holder lagene sammen',
        'Lagene av kationer kan gli forbi hverandre uten at bindingen brytes',
        'I et ionegitter kommer like ladninger mot hverandre når lagene forskyves',
        'Frastøtningen gjør at saltkrystallen sprekker',
      ],
    },
    {
      id: 'sb-22', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar hvorfor NaCl leder strøm når det er smeltet eller løst i vann, men ikke som fast stoff.',
      modellsvar: `Elektrisk ledningsevne krever ladde partikler som kan bevege seg. I fast NaCl sitter ionene fast i ionegitteret og kan ikke flytte seg. Når saltet smelter eller løses i vann, brytes gitteret, og {{Na+}}- og {{Cl-}}-ionene kan bevege seg fritt. Da kan de frakte ladning, og stoffet leder strøm.`,
      punkter: ['Strøm krever ladde partikler som kan bevege seg', 'I fast form sitter ionene fast i gitteret', 'Smeltet eller løst kan ionene bevege seg fritt'],
    },
    {
      id: 'sb-23', niva: 3, type: 'flervalg',
      sporsmal: 'Tommelfingerregelen sier at $\\Delta EN > 1,7$ gir ionebinding. Hvilke stoffer passer **ikke** med regelen?',
      alternativer: ['HF ($\\Delta EN = 1,9$) er kovalent', 'NaH ($\\Delta EN = 1,2$) er en ioneforbindelse', 'NaCl ($\\Delta EN = 2,1$) er en ioneforbindelse', '{{CH4}} ($\\Delta EN = 0,4$) er kovalent'],
      svar: [0, 1],
      hint: 'Sjekk om ΔEN-verdien og bindingstypen stemmer med grensene.',
      forklaring: 'HF er et molekyl av to ikke-metaller, selv om ΔEN er over 1,7. NaH er et salt med {{H-}}-ioner, selv om ΔEN er under 1,7. Regelen er bare en tommelfingerregel.',
    },
    {
      id: 'sb-24', niva: 3, type: 'flervalg',
      sporsmal: 'Diamant smelter ikke under ca. 3500 °C. Hvilken struktur forklarer dette?',
      alternativer: [
        'Et atomgitter der hvert C-atom er bundet kovalent til fire andre',
        'Et ionegitter med {{C^4+}} og {{C^4-}}',
        'Sterke London-krefter mellom C-molekyler',
        'Metallbinding mellom karbonatomene',
      ],
      svar: 0,
    },
    {
      id: 'sb-25', niva: 3, type: 'forklaring',
      sporsmal: '{{NH3}} er et dipolmolekyl, mens {{BF3}} er upolart. Forklar forskjellen.',
      modellsvar: `Begge molekylene har polare bindinger: N–H har $\\Delta EN = 0,9$ og B–F har $\\Delta EN = 2,0$. I {{NH3}} har nitrogen tre bindende elektronpar og ett ledig elektronpar. De fire elektronområdene gir en trigonal pyramide, som er usymmetrisk, så dipolene opphever ikke hverandre. I {{BF3}} har bor tre bindende par og ingen ledige par, så molekylet blir trigonalt plant med 120° mellom bindingene. Formen er symmetrisk, dipolene opphever hverandre, og molekylet blir upolart.`,
      punkter: [
        'Begge har polare bindinger',
        'NH₃ har et ledig elektronpar på N → trigonal pyramide (usymmetrisk)',
        'BF₃ har ingen ledige par på B → trigonal plan (symmetrisk)',
        'I BF₃ opphever dipolene hverandre, i NH₃ gjør de ikke det',
      ],
    },
    {
      id: 'sb-26', niva: 3, type: 'tall',
      sporsmal: 'Hvor mange valenselektroner må fordeles i Lewisstrukturen til {{CO2}}?',
      svar: 16, heltall: true, enhet: null,
      hint: 'C har 4 valenselektroner og O har 6.',
      steg: ['C: 4 valenselektroner. O: 6 valenselektroner.', 'Totalt: $4 + 2 \\cdot 6 = 16$', 'De fordeles som to dobbeltbindinger (8 elektroner) og to ledige par på hvert O (8 elektroner).'],
    },
    {
      id: 'sb-27', niva: 3, type: 'rekkefolge',
      sporsmal: 'Ranger metallene etter økende smeltepunkt.',
      fra: 'Lavest', til: 'Høyest',
      elementer: ['Na', 'Mg', 'Al'],
      hint: 'Flere valenselektroner i elektronsjøen og mindre kationer gir sterkere metallbinding.',
      forklaring: 'Na (98 °C) har 1 valenselektron, Mg (650 °C) har 2 og Al (660 °C) har 3. Kationene blir også mindre og høyere ladet.',
    },
    {
      id: 'sb-28', niva: 3, type: 'tall',
      sporsmal: 'Hvor mange valenselektroner må fordeles i Lewisstrukturen til ammoniumionet, {{NH4+}}?',
      svar: 8, heltall: true, enhet: null,
      hint: 'Husk at ladningen +1 betyr ett elektron mindre.',
      steg: ['N: 5, H: 4 · 1 = 4. Sum: 9', 'Ladning +1: $9 - 1 = 8$ valenselektroner', 'De danner fire N–H-bindinger (tetraedrisk ion).'],
    },
  ],

  flashcards: [
    { f: 'Oktettregelen', b: 'Atomer får ofte åtte elektroner i ytterste skall (edelgasskonfigurasjon). H: to.' },
    { f: 'Ionebinding', b: 'Tiltrekning mellom kationer og anioner. Metall + ikke-metall, $\\Delta EN > 1,7$.' },
    { f: 'Egenskaper til ioneforbindelser', b: 'Høyt smeltepunkt, harde og sprø, leder strøm smeltet/løst, ikke fast.' },
    { f: 'Formelenhet', b: 'Minste enhet i en ioneforbindelse, f.eks. NaCl. Ioneforbindelser er ikke molekyler.' },
    { f: 'Kovalent binding', b: 'Elektronpar som deles mellom to atomer (ikke-metaller).' },
    { f: 'Enkelt-, dobbelt- og trippelbinding', b: '1, 2 og 3 delte elektronpar, f.eks. H–H, O=O og N≡N.' },
    { f: 'Lewisstruktur', b: 'Tegning av valenselektronene som prikker eller streker, med bindende og ledige elektronpar.' },
    { f: 'Ledig elektronpar', b: 'Elektronpar i valensskallet som ikke inngår i en binding.' },
    { f: 'ΔEN-grenser', b: '0–0,4: upolar kovalent · 0,5–1,7: polar kovalent · over 1,7: ionebinding (tommelfingerregel).' },
    { f: 'Dipolmolekyl', b: 'Polare bindinger + usymmetrisk form → positiv og negativ side. F.eks. {{H2O}}, {{NH3}}.' },
    { f: 'VSEPR-former', b: 'Lineær ({{CO2}}), trigonal plan ({{BF3}}), tetraedrisk ({{CH4}}), pyramide ({{NH3}}), vinklet ({{H2O}}).' },
    { f: 'Metallbinding', b: 'Metallkationer i et gitter, holdt sammen av en sjø av delokaliserte elektroner.' },
    { f: 'Hvorfor metaller er formbare', b: 'Bindingen er ikke retningsbestemt, så lagene kan gli forbi hverandre uten at bindingen brytes.' },
    { f: 'Legering', b: 'Blanding av metaller (eller metall + karbon), f.eks. messing og stål.' },
    { f: 'Atomgitter', b: 'Nettverk av kovalent bundne atomer: diamant, grafitt, {{SiO2}}. Svært høyt smeltepunkt.' },
  ],
});
