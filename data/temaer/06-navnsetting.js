/*
 * Tema 6: Navnsetting og formler i uorganisk kjemi
 */
KJ.tema({
  id: 'navnsetting',
  nr: 6,
  tittel: 'Navnsetting og formler',
  beskrivelse: 'Salter, innskuddsmetaller med romertall, sammensatte ioner, molekylære forbindelser og hydrater.',
  farge: '#3B6CF0',
  bolge: 455,
  linje: 'Cs 455 nm',
  kilde: 'notater',
  mal: [
    'Bruke kjemisk fagspråk: navnsette uorganiske forbindelser og skrive formler',
  ],

  teori: [
    {
      h: 'Ioneforbindelser (salter)',
      tekst: `Et salt består av kationer og anioner. Navnet bygges slik:

1. **Kationet først** (metallet med samme navn som grunnstoffet).
2. **Anionet sist.** Enkle anioner får endelsen **-id**: klorid, oksid, sulfid, nitrid, fluorid, bromid, jodid, hydrid.
3. **Ingen tallprefikser** (mono, di, tri) for salter. {{CaCl2}} heter kalsiumklorid, ikke kalsiumdiklorid.

Eksempler: NaF natriumfluorid, {{Na2S}} natriumsulfid, {{Ca3N2}} kalsiumnitrid.`,
    },
    {
      h: 'Fra navn til formel: ladningsbalanse',
      tekst: `Summen av ladningene i et salt skal være **null**. Finn ladningene ut fra plasseringen i periodesystemet (gruppe 1: +1, gruppe 2: +2, Al: +3, gruppe 15: −3, gruppe 16: −2, gruppe 17: −1).

**Aluminiumoksid:** {{Al^3+}} og {{O^2-}}. Minste felles multiplum av 3 og 2 er 6: to {{Al^3+}} (+6) og tre {{O^2-}} (−6) → {{Al2O3}}.

Snarvei (kryssregelen): ladningstallet til det ene ionet blir indeksen til det andre. Husk å forkorte: {{Mg^2+}} og {{O^2-}} gir MgO, ikke {{Mg2O2}}.`,
    },
    {
      h: 'Innskuddsmetaller: romertall',
      tekst: `Mange innskuddsmetaller kan ha flere ladninger. Da skriver vi ladningen med **romertall i parentes** rett etter metallnavnet:

- {{FeCl2}} jern(II)klorid og {{FeCl3}} jern(III)klorid
- {{Cu2O}} kobber(I)oksid og CuO kobber(II)oksid
- MnO mangan(II)oksid og {{MnO2}} mangan(IV)oksid

Finn ladningen ved å regne baklengs: I {{FeCl3}} er det tre {{Cl-}} (−3), så jern må være +3.

Metaller med bare én vanlig ladning får **ikke** romertall: natrium, kalium, magnesium, kalsium, aluminium, sink ({{Zn^2+}}) og sølv ({{Ag+}}). Tinn og bly kan ha flere ladninger og får romertall: bly(II)oksid, bly(IV)oksid.`,
    },
    {
      h: 'Sammensatte ioner',
      tekst: `Sammensatte ioner består av flere atomer med en samlet ladning. Navnene må pugges.

Når formelen inneholder mer enn ett sammensatt ion, setter vi det i **parentes**: {{Ca(OH)2}}, {{Al2(SO4)3}}, {{(NH4)2SO4}}. Parentesen brukes ikke når det bare er ett: NaOH, {{CaCO3}}.`,
      tabell: {
        hode: ['Ion', 'Navn', 'Ion', 'Navn'],
        rader: [
          ['{{NH4+}}', 'ammonium', '{{SO4^2-}}', 'sulfat'],
          ['{{OH-}}', 'hydroksid', '{{SO3^2-}}', 'sulfitt'],
          ['{{NO3-}}', 'nitrat', '{{CO3^2-}}', 'karbonat'],
          ['{{NO2-}}', 'nitritt', '{{HCO3-}}', 'hydrogenkarbonat'],
          ['{{CN-}}', 'cyanid', '{{PO4^3-}}', 'fosfat'],
          ['{{MnO4-}}', 'permanganat', '{{ClO3-}}', 'klorat'],
          ['{{CH3COO-}}', 'acetat', '{{ClO-}}', 'hypokloritt'],
        ],
      },
    },
    {
      h: 'Molekylære forbindelser',
      tekst: `Forbindelser av bare **ikke-metaller** får greske tallprefikser som viser antall atomer:

mono (1), di (2), tri (3), tetra (4), penta (5), heksa (6), hepta (7), okta (8), nona (9), deka (10).

**Regler:**
1. Det minst elektronegative grunnstoffet skrives først, det mest elektronegative sist.
2. Det første grunnstoffet beholder navnet sitt.
3. Det siste grunnstoffet får endelsen **-id**.
4. Bruk prefikser for antall atomer.
5. «Mono» brukes ikke foran det første grunnstoffet.

Eksempler: CO karbonmonoksid, {{CO2}} karbondioksid, {{N2O4}} dinitrogentetraoksid, {{PCl5}} fosforpentaklorid, {{SF6}} svovelheksafluorid, {{P4O10}} tetrafosfordekaoksid.

Noen stoffer har innarbeidede trivialnavn: {{H2O}} vann, {{NH3}} ammoniakk, {{CH4}} metan.`,
      merk: '«Monoksid» og «monooksid» godtas begge. Det samme gjelder «pentaoksid»/«pentoksid» osv.',
    },
    {
      h: 'Hydrater',
      tekst: `Salter med krystallvann navnsettes med saltnavnet + gresk prefiks + **hydrat**: {{CuSO4*5H2O}} kobber(II)sulfatpentahydrat, {{CaCl2*2H2O}} kalsiumkloriddihydrat.`,
    },
  ],

  begreper: [
    { term: 'Salt', def: 'Ioneforbindelse av kationer og anioner. Navn: kation + anion, ingen tallprefikser.' },
    { term: '-id', def: 'Endelse for enkle anioner (klorid, oksid, sulfid) og for det siste grunnstoffet i molekylære forbindelser.' },
    { term: 'Romertall', def: 'Viser ladningen til et metall som kan ha flere ladninger: jern(III)klorid.' },
    { term: 'Sammensatt ion', def: 'Ion av flere atomer, f.eks. {{SO4^2-}} og {{NH4+}}. Parentes når det er flere av dem.' },
    { term: 'Greske prefikser', def: 'mono, di, tri, tetra, penta, heksa, hepta, okta, nona, deka. Brukes bare for molekylære forbindelser.' },
    { term: 'Hydrat', def: 'Salt med krystallvann, f.eks. {{CuSO4*5H2O}}.' },
  ],

  eksempler: [
    {
      tittel: 'Formel for jern(III)sulfat',
      oppgave: 'Skriv formelen for jern(III)sulfat.',
      steg: [
        'Ionene er {{Fe^3+}} og {{SO4^2-}}.',
        'Minste felles multiplum av 3 og 2 er 6: to {{Fe^3+}} (+6) og tre {{SO4^2-}} (−6).',
        'Det er flere sulfationer, så de settes i parentes: {{Fe2(SO4)3}}.',
      ],
    },
    {
      tittel: 'Navn på MnO₂',
      oppgave: 'Hva heter {{MnO2}}?',
      steg: [
        'Mangan er et innskuddsmetall og kan ha flere ladninger → romertall.',
        'To {{O^2-}} gir −4, så mangan må være +4.',
        'Navn: mangan(IV)oksid.',
      ],
    },
  ],

  feller: [
    'Ikke bruk greske prefikser på salter: {{Na2O}} er natriumoksid, ikke dinatriumoksid.',
    'Husk romertall for innskuddsmetaller med flere ladninger: CuO er kobber(II)oksid, ikke kobberoksid.',
    'Skriv «fluorid» med **uo**, ikke «flourid».',
    '{{IF7}} er jodheptafluorid. {{IF4}} ville vært jodtetrafluorid. Prefikset skal stemme med indeksen.',
    'Sammensatte ioner må stå i parentes når det er mer enn ett: {{Ca(OH)2}}, ikke {{CaOH2}}.',
  ],

  oppgaver: [
    /* ---------- Grunnleggende ---------- */
    { id: 'nv-01', niva: 1, type: 'navn', formel: 'NaF', svar: ['natriumfluorid'], hint: 'Kationet først, anionet får endelsen -id.' },
    { id: 'nv-02', niva: 1, type: 'navn', formel: 'CaCl2', svar: ['kalsiumklorid'], hint: 'Salter får ikke tallprefikser.' },
    { id: 'nv-03', niva: 1, type: 'navn', formel: 'K2S', svar: ['kaliumsulfid'], hint: 'S blir sulfid.' },
    {
      id: 'nv-04', niva: 1, type: 'formel', navn: 'magnesiumoksid', svar: 'MgO',
      hint: ['Mg står i gruppe 2 og O i gruppe 16.', 'Ladningene +2 og −2 opphever hverandre.'],
      steg: ['{{Mg^2+}} og {{O^2-}}', '$+2 - 2 = 0$, så forholdet er 1 : 1 → MgO'],
    },
    {
      id: 'nv-05', niva: 1, type: 'formel', navn: 'aluminiumfluorid', svar: 'AlF3',
      hint: 'Al danner {{Al^3+}}, F danner {{F-}}.',
      steg: ['{{Al^3+}} og {{F-}}', 'Det trengs tre {{F-}} for å oppveie +3 → {{AlF3}}'],
    },
    { id: 'nv-06', niva: 1, type: 'navn', formel: 'CO2', svar: ['karbondioksid'], hint: 'Molekylær forbindelse: bruk greske prefikser.' },
    { id: 'nv-07', niva: 1, type: 'navn', formel: 'SO3', svar: ['svoveltrioksid'] },
    {
      id: 'nv-08', niva: 1, type: 'kobling',
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
    {
      id: 'nv-09', niva: 1, type: 'kobling',
      sporsmal: 'Koble prefikset med riktig tall.',
      par: [['mono', '1'], ['di', '2'], ['tri', '3'], ['tetra', '4'], ['penta', '5'], ['heksa', '6'], ['hepta', '7']],
    },
    { id: 'nv-10', niva: 1, type: 'formel', navn: 'litiumklorid', svar: 'LiCl' },
    { id: 'nv-11', niva: 1, type: 'formel', navn: 'kaliumbromid', svar: 'KBr' },
    /* ---------- Middels ---------- */
    {
      id: 'nv-12', niva: 2, type: 'navn', formel: 'FeCl3', svar: ['jern(III)klorid'],
      hint: ['Jern kan ha flere ladninger.', 'Tre {{Cl-}} gir −3. Hva må ladningen til jern være?'],
      steg: ['Tre {{Cl-}} = −3, så jern er +3.', 'Navn: jern(III)klorid'],
    },
    { id: 'nv-13', niva: 2, type: 'navn', formel: 'CuO', svar: ['kobber(II)oksid'], hint: 'O har ladning −2.' },
    { id: 'nv-14', niva: 2, type: 'navn', formel: 'MnO2', svar: ['mangan(IV)oksid'], hint: 'To {{O^2-}} gir −4.' },
    {
      id: 'nv-15', niva: 2, type: 'formel', navn: 'jern(II)hydroksid', svar: 'Fe(OH)2',
      hint: ['{{Fe^2+}} og {{OH-}}', 'Husk parentes rundt det sammensatte ionet.'],
      steg: ['{{Fe^2+}} trenger to {{OH-}}.', 'Flere sammensatte ioner → parentes: {{Fe(OH)2}}'],
    },
    {
      id: 'nv-16', niva: 2, type: 'formel', navn: 'aluminiumsulfat', svar: 'Al2(SO4)3',
      hint: ['{{Al^3+}} og {{SO4^2-}}', 'Minste felles multiplum av 3 og 2 er 6.'],
      steg: ['{{Al^3+}} og {{SO4^2-}}', '2 · (+3) = +6 og 3 · (−2) = −6', 'Formel: {{Al2(SO4)3}}'],
    },
    { id: 'nv-17', niva: 2, type: 'formel', navn: 'ammoniumnitrat', svar: 'NH4NO3', hint: '{{NH4+}} og {{NO3-}} har ladning +1 og −1.' },
    { id: 'nv-18', niva: 2, type: 'navn', formel: 'N2O4', svar: ['dinitrogentetraoksid'], hint: 'Begge grunnstoffene er ikke-metaller.' },
    { id: 'nv-19', niva: 2, type: 'navn', formel: 'PCl5', svar: ['fosforpentaklorid'] },
    { id: 'nv-20', niva: 2, type: 'formel', navn: 'dinitrogenpentaoksid', svar: 'N2O5' },
    { id: 'nv-21', niva: 2, type: 'navn', formel: 'Ca(OH)2', svar: ['kalsiumhydroksid'] },
    {
      id: 'nv-22', niva: 2, type: 'formel', navn: 'kalsiumfosfat', svar: 'Ca3(PO4)2',
      hint: ['{{Ca^2+}} og {{PO4^3-}}', 'Minste felles multiplum av 2 og 3 er 6.'],
      steg: ['{{Ca^2+}} og {{PO4^3-}}', '3 · (+2) = +6 og 2 · (−3) = −6', 'Formel: {{Ca3(PO4)2}}'],
    },
    { id: 'nv-23', niva: 2, type: 'navn', formel: 'KMnO4', svar: ['kaliumpermanganat'] },
    { id: 'nv-24', niva: 2, type: 'navn', formel: 'SF4', svar: ['svoveltetrafluorid'] },
    { id: 'nv-25', niva: 2, type: 'formel', navn: 'xenontetrafluorid', svar: 'XeF4' },
    {
      id: 'nv-26', niva: 2, type: 'flervalg',
      sporsmal: 'Hvorfor heter {{FeCl3}} jern(III)klorid og ikke jerntriklorid?',
      alternativer: [
        'Det er et salt: greske prefikser brukes bare for molekylære forbindelser, og romertallet viser jernets ladning',
        'Jern har alltid ladning +3',
        'Det er en molekylær forbindelse',
        'Klor kan ha flere ladninger',
      ],
      svar: 0,
    },
    /* ---------- Høy måloppnåelse ---------- */
    { id: 'nv-27', niva: 3, type: 'navn', formel: 'CuSO4*5H2O', svar: ['kobber(II)sulfatpentahydrat'], hint: ['Navngi saltet først.', 'Fem vannmolekyler = pentahydrat.'] },
    { id: 'nv-28', niva: 3, type: 'formel', navn: 'kobber(I)oksid', svar: 'Cu2O', hint: '{{Cu+}} og {{O^2-}}' },
    { id: 'nv-29', niva: 3, type: 'navn', formel: 'Fe2(SO4)3', svar: ['jern(III)sulfat'], hint: 'Tre {{SO4^2-}} gir −6, fordelt på to jernioner.', steg: ['Tre sulfationer: $3 \\cdot (-2) = -6$', 'To jernioner må til sammen være +6, altså +3 hver.', 'Navn: jern(III)sulfat'] },
    { id: 'nv-30', niva: 3, type: 'formel', navn: 'ammoniumsulfat', svar: '(NH4)2SO4', hint: 'Det trengs to {{NH4+}} for hvert {{SO4^2-}}.' },
    { id: 'nv-31', niva: 3, type: 'navn', formel: 'P4O10', svar: ['tetrafosfordekaoksid'] },
    {
      id: 'nv-32', niva: 3, type: 'flervalg',
      sporsmal: 'Hvilke navn er riktige?',
      alternativer: [
        'Dinatriumoksid for {{Na2O}}',
        'Karbonmonoksid for CO',
        'Monosvoveldioksid for {{SO2}}',
        'Jern(II)sulfat for {{FeSO4}}',
        'Kobberklorid for {{CuCl2}}',
        'Svovelheksafluorid for {{SF6}}',
      ],
      svar: [1, 3, 5],
      forklaring: '{{Na2O}} er natriumoksid (et salt, så ingen prefikser). {{SO2}} er svoveldioksid («mono» brukes ikke på første grunnstoff). {{CuCl2}} er kobber(II)klorid (romertall mangler).',
    },
    { id: 'nv-33', niva: 3, type: 'formel', navn: 'jodheptafluorid', svar: 'IF7', hint: 'Hepta = 7.' },
    { id: 'nv-34', niva: 3, type: 'formel', navn: 'bly(IV)oksid', svar: 'PbO2' },
    { id: 'nv-35', niva: 3, type: 'navn', formel: 'NaHCO3', svar: ['natriumhydrogenkarbonat'] },
    { id: 'nv-36', niva: 3, type: 'formel', navn: 'magnesiumnitrid', svar: 'Mg3N2', hint: ['{{Mg^2+}} og {{N^3-}}', 'Minste felles multiplum av 2 og 3 er 6.'] },
    { id: 'nv-37', niva: 3, type: 'navn', formel: 'Cl2O7', svar: ['diklorheptaoksid'] },
    {
      id: 'nv-38', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar trinn for trinn hvordan du finner formelen til aluminiumoksid.',
      modellsvar: `Aluminium står i gruppe 13 og avgir tre elektroner, så det danner {{Al^3+}}. Oksygen står i gruppe 16 og tar opp to elektroner, så det danner {{O^2-}}. Et salt er elektrisk nøytralt, så summen av ladningene må bli null. Minste felles multiplum av 3 og 2 er 6. Vi trenger derfor to {{Al^3+}} (+6) og tre {{O^2-}} (−6). Formelen blir {{Al2O3}}.`,
      punkter: ['Al danner Al³⁺ (gruppe 13)', 'O danner O²⁻ (gruppe 16)', 'Summen av ladningene må være null', 'To Al³⁺ og tre O²⁻ → Al₂O₃'],
    },
    { id: 'nv-39', niva: 2, type: 'formel', navn: 'sølvnitrat', svar: 'AgNO3' },
    { id: 'nv-40', niva: 3, type: 'formel', navn: 'jern(III)oksid', svar: 'Fe2O3' },
  ],

  flashcards: [
    { f: '{{NH4+}}', b: 'ammonium' },
    { f: '{{OH-}}', b: 'hydroksid' },
    { f: '{{NO3-}}', b: 'nitrat' },
    { f: '{{NO2-}}', b: 'nitritt' },
    { f: '{{SO4^2-}}', b: 'sulfat' },
    { f: '{{SO3^2-}}', b: 'sulfitt' },
    { f: '{{CO3^2-}}', b: 'karbonat' },
    { f: '{{HCO3-}}', b: 'hydrogenkarbonat' },
    { f: '{{PO4^3-}}', b: 'fosfat' },
    { f: '{{MnO4-}}', b: 'permanganat' },
    { f: '{{ClO3-}}', b: 'klorat' },
    { f: '{{CN-}}', b: 'cyanid' },
    { f: '{{CH3COO-}}', b: 'acetat' },
    { f: 'Greske prefikser 1–10', b: 'mono, di, tri, tetra, penta, heksa, hepta, okta, nona, deka' },
    { f: 'Navn på salter', b: 'Kation + anion med -id. Ingen tallprefikser. Romertall for metaller med flere ladninger.' },
    { f: 'Navn på molekylære forbindelser', b: 'Greske prefikser, mest elektronegative sist med -id, ikke «mono» først.' },
    { f: 'Når skal det være parentes?', b: 'Når det er mer enn ett sammensatt ion: {{Ca(OH)2}}, {{Al2(SO4)3}}.' },
    { f: 'Hydrat', b: 'Salt med krystallvann: {{CuSO4*5H2O}} = kobber(II)sulfatpentahydrat.' },
  ],
});
