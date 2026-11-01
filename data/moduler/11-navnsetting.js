/*
 * Modul 11: Navnsetting, romertall og prefikser
 * Læringsmål: 12, 13
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */
KJ.modul({
  id: 'navnsetting',
  nr: 11,
  tittel: 'Navnsetting, romertall og prefikser',
  beskrivelse: 'Navn og formler for grunnstoffer, salter og molekylforbindelser, og når du bruker romertall og tallprefikser.',
  mal: [12, 13],
  farge: '#12A0A0',
  bolge: 496,
  teori: [
    {
      h: 'Grunnstoffnavn',
      tekst: 'Symbolet kommer ofte fra det latinske navnet, så det ligner ikke alltid på det norske navnet. Disse må du kunne:',
      tabell: {
        hode: ['Symbol', 'Navn', 'Symbol', 'Navn'],
        rader: [
          ['Na', 'natrium', 'Cu', 'kobber'],
          ['K', 'kalium', 'Ag', 'sølv'],
          ['Fe', 'jern', 'Au', 'gull'],
          ['Pb', 'bly', 'Sn', 'tinn'],
          ['Hg', 'kvikksølv', 'Zn', 'sink'],
          ['S', 'svovel', 'Si', 'silisium'],
          ['N', 'nitrogen', 'P', 'fosfor'],
          ['Cl', 'klor', 'I', 'jod'],
        ],
      },
    },
    {
      h: 'Ioneforbindelser (salter)',
      tekst: `Et salt består av kationer og anioner. Navnet bygges slik:

1. **Kationet først** (metallet med samme navn som grunnstoffet).
2. **Anionet sist.** Enkle anioner får endelsen **-id**: klorid, oksid, sulfid, nitrid, fluorid, bromid, jodid, hydrid.
3. **Ingen tallprefikser** (mono, di, tri) for salter. {{CaCl2}} heter kalsiumklorid, ikke kalsiumdiklorid.

Eksempler: NaF natriumfluorid, {{Na2S}} natriumsulfid, {{Ca3N2}} kalsiumnitrid.`,
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
      h: 'Romertall eller prefikser?',
      tabell: {
        hode: ['Type forbindelse', 'Romertall?', 'Tallprefikser?', 'Eksempel'],
        rader: [
          ['Salt med metall som har én ladning', 'Nei', 'Nei', '{{CaCl2}} kalsiumklorid'],
          ['Salt med metall som kan ha flere ladninger', 'Ja, metallets ladning', 'Nei', '{{FeCl3}} jern(III)klorid'],
          ['Molekylforbindelse (bare ikke-metaller)', 'Nei', 'Ja, antall atomer', '{{N2O4}} dinitrogentetraoksid'],
        ],
      },
      tekst: 'Romertallet viser **ladningen** til metallionet, ikke antall atomer. Prefiksene viser **antall atomer** i et molekyl.',
    },
  ],
  begreper: [
    { term: 'Salt', def: 'Ioneforbindelse av kationer og anioner. Navn: kation + anion, ingen tallprefikser.' },
    {
      term: '-id',
      def: 'Endelse for enkle anioner (klorid, oksid, sulfid) og for det siste grunnstoffet i molekylære forbindelser.',
    },
    { term: 'Romertall', def: 'Viser ladningen til et metall som kan ha flere ladninger: jern(III)klorid.' },
    {
      term: 'Greske prefikser',
      def: 'mono, di, tri, tetra, penta, heksa, hepta, okta, nona, deka. Brukes bare for molekylære forbindelser.',
    },
  ],
  eksempler: [
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
    'Romertallet er ladningen, ikke antall atomer. {{Fe2O3}} er jern(III)oksid, ikke jern(II)oksid.',
  ],
  oppgaver: [
    {
      id: 'nv-01',
      niva: 1,
      type: 'navn',
      mal: [12],
      formel: 'NaF',
      svar: ['natriumfluorid'],
      hint: 'Kationet først, anionet får endelsen -id.',
    },
    {
      id: 'nv-02',
      niva: 1,
      type: 'navn',
      mal: [12],
      formel: 'CaCl2',
      svar: ['kalsiumklorid'],
      hint: 'Salter får ikke tallprefikser.',
    },
    { id: 'nv-03', niva: 1, type: 'navn', mal: [12], formel: 'K2S', svar: ['kaliumsulfid'], hint: 'S blir sulfid.' },
    {
      id: 'nv-06',
      niva: 1,
      type: 'navn',
      mal: [12, 13],
      formel: 'CO2',
      svar: ['karbondioksid'],
      hint: 'Molekylær forbindelse: bruk greske prefikser.',
    },
    { id: 'nv-07', niva: 1, type: 'navn', mal: [12, 13], formel: 'SO3', svar: ['svoveltrioksid'] },
    {
      id: 'nv-09',
      niva: 1,
      type: 'kobling',
      mal: [13],
      sporsmal: 'Koble prefikset med riktig tall.',
      par: [['mono', '1'], ['di', '2'], ['tri', '3'], ['tetra', '4'], ['penta', '5'], ['heksa', '6'], ['hepta', '7']],
    },
    {
      id: 'gs-01',
      niva: 1,
      type: 'navn',
      mal: [12],
      sporsmal: 'Hva heter grunnstoffet {{Fe}}?',
      formel: 'Fe',
      svar: ['jern'],
    },
    {
      id: 'gs-02',
      niva: 1,
      type: 'navn',
      mal: [12],
      sporsmal: 'Hva heter grunnstoffet {{K}}?',
      formel: 'K',
      svar: ['kalium'],
    },
    {
      id: 'gs-03',
      niva: 1,
      type: 'navn',
      mal: [12],
      sporsmal: 'Hva heter grunnstoffet {{Na}}?',
      formel: 'Na',
      svar: ['natrium'],
    },
    {
      id: 'gs-04',
      niva: 1,
      type: 'formel',
      mal: [12],
      sporsmal: 'Skriv symbolet for **sølv**.',
      navn: 'sølv',
      svar: 'Ag',
    },
    {
      id: 'gs-05',
      niva: 1,
      type: 'formel',
      mal: [12],
      sporsmal: 'Skriv symbolet for **bly**.',
      navn: 'bly',
      svar: 'Pb',
    },
    {
      id: 'gs-08',
      niva: 1,
      type: 'kobling',
      mal: [12],
      sporsmal: 'Koble symbolet med navnet.',
      par: [['Cu', 'kobber'], ['Au', 'gull'], ['Zn', 'sink'], ['S', 'svovel'], ['Si', 'silisium'], ['I', 'jod']],
    },
    {
      id: 'rp-01',
      niva: 1,
      type: 'flervalg',
      mal: [13],
      sporsmal: 'Når skal du bruke romertall i navnet på en forbindelse?',
      alternativer: [
        'Når metallet kan danne ioner med ulik ladning, som de fleste innskuddsmetaller',
        'I alle molekylforbindelser',
        'Når det er mer enn ett atom av et grunnstoff',
        'Bare når forbindelsen inneholder oksygen',
      ],
      svar: 0,
    },
    {
      id: 'rp-02',
      niva: 1,
      type: 'flervalg',
      mal: [13],
      sporsmal: 'Når skal du bruke greske tallprefikser (mono, di, tri …)?',
      alternativer: [
        'I molekylforbindelser mellom ikke-metaller',
        'I alle salter',
        'Bare for innskuddsmetaller',
        'Bare når det er sammensatte ioner',
      ],
      svar: 0,
    },
    {
      id: 'nv-12',
      niva: 2,
      type: 'navn',
      mal: [12, 13],
      formel: 'FeCl3',
      svar: ['jern(III)klorid'],
      hint: ['Jern kan ha flere ladninger.', 'Tre {{Cl-}} gir −3. Hva må ladningen til jern være?'],
      steg: ['Tre {{Cl-}} = −3, så jern er +3.', 'Navn: jern(III)klorid'],
    },
    {
      id: 'nv-13',
      niva: 2,
      type: 'navn',
      mal: [12, 13],
      formel: 'CuO',
      svar: ['kobber(II)oksid'],
      hint: 'O har ladning −2.',
    },
    {
      id: 'nv-14',
      niva: 2,
      type: 'navn',
      mal: [12, 13],
      formel: 'MnO2',
      svar: ['mangan(IV)oksid'],
      hint: 'To {{O^2-}} gir −4.',
    },
    {
      id: 'nv-18',
      niva: 2,
      type: 'navn',
      mal: [12, 13],
      formel: 'N2O4',
      svar: ['dinitrogentetraoksid'],
      hint: 'Begge grunnstoffene er ikke-metaller.',
    },
    { id: 'nv-19', niva: 2, type: 'navn', mal: [12, 13], formel: 'PCl5', svar: ['fosforpentaklorid'] },
    { id: 'nv-20', niva: 2, type: 'formel', mal: [12, 13], navn: 'dinitrogenpentaoksid', svar: 'N2O5' },
    { id: 'nv-21', niva: 2, type: 'navn', mal: [12, 14], formel: 'Ca(OH)2', svar: ['kalsiumhydroksid'] },
    { id: 'nv-23', niva: 2, type: 'navn', mal: [12, 14], formel: 'KMnO4', svar: ['kaliumpermanganat'] },
    { id: 'nv-24', niva: 2, type: 'navn', mal: [12, 13], formel: 'SF4', svar: ['svoveltetrafluorid'] },
    { id: 'nv-25', niva: 2, type: 'formel', mal: [12, 13], navn: 'xenontetrafluorid', svar: 'XeF4' },
    {
      id: 'nv-26',
      niva: 2,
      type: 'flervalg',
      mal: [13],
      sporsmal: 'Hvorfor heter {{FeCl3}} jern(III)klorid og ikke jerntriklorid?',
      alternativer: [
        'Det er et salt: greske prefikser brukes bare for molekylære forbindelser, og romertallet viser jernets ladning',
        'Jern har alltid ladning +3',
        'Det er en molekylær forbindelse',
        'Klor kan ha flere ladninger',
      ],
      svar: 0,
    },
    {
      id: 'gs-06',
      niva: 2,
      type: 'formel',
      mal: [12],
      sporsmal: 'Skriv symbolet for **kvikksølv**.',
      navn: 'kvikksølv',
      svar: 'Hg',
    },
    {
      id: 'gs-07',
      niva: 2,
      type: 'navn',
      mal: [12],
      sporsmal: 'Hva heter grunnstoffet {{Sn}}?',
      formel: 'Sn',
      svar: ['tinn'],
    },
    {
      id: 'rp-03',
      niva: 2,
      type: 'sortering',
      mal: [13],
      sporsmal: 'Skal navnet ha romertall, prefikser eller ingen av delene?',
      kategorier: ['Romertall', 'Prefikser', 'Ingen'],
      elementer: [
        ['{{FeCl3}}', 0],
        ['CuO', 0],
        ['{{N2O4}}', 1],
        ['CO', 1],
        ['NaCl', 2],
        ['{{CaBr2}}', 2],
        ['{{PbO2}}', 0],
        ['{{SF6}}', 1],
        ['ZnO', 2],
        ['{{AgNO3}}', 2],
      ],
      forklaring: 'Sink og sølv har bare én ladning og får ikke romertall. Bly kan være +2 eller +4.',
    },
    {
      id: 'rp-04',
      niva: 2,
      type: 'navn',
      mal: [12, 13],
      formel: 'Cu2O',
      svar: ['kobber(I)oksid'],
      hint: 'To {{Cu}} må til sammen oppveie {{O^2-}}.',
    },
    { id: 'rp-05', niva: 2, type: 'navn', mal: [12, 13], formel: 'FeO', svar: ['jern(II)oksid'] },
    { id: 'rp-06', niva: 2, type: 'navn', mal: [12, 13], formel: 'CO', svar: ['karbonmonoksid', 'karbonmonooksid'] },
    { id: 'rp-07', niva: 2, type: 'navn', mal: [12, 13], formel: 'PbCl2', svar: ['bly(II)klorid'] },
    {
      id: 'rp-08',
      niva: 2,
      type: 'navn',
      mal: [12, 13],
      formel: 'ZnCl2',
      svar: ['sinkklorid'],
      hint: 'Har sink mer enn én vanlig ladning?',
    },
    { id: 'rp-09', niva: 2, type: 'formel', mal: [12, 13], navn: 'tinn(IV)oksid', svar: 'SnO2' },
    { id: 'rp-10', niva: 2, type: 'formel', mal: [12, 13], navn: 'karbontetraklorid', svar: 'CCl4' },
    {
      id: 'nv-29',
      niva: 3,
      type: 'navn',
      mal: [12, 13, 14],
      formel: 'Fe2(SO4)3',
      svar: ['jern(III)sulfat'],
      hint: 'Tre {{SO4^2-}} gir −6, fordelt på to jernioner.',
      steg: [
        'Tre sulfationer: $3 \\cdot (-2) = -6$',
        'To jernioner må til sammen være +6, altså +3 hver.',
        'Navn: jern(III)sulfat',
      ],
    },
    { id: 'nv-31', niva: 3, type: 'navn', mal: [12, 13], formel: 'P4O10', svar: ['tetrafosfordekaoksid'] },
    {
      id: 'nv-32',
      niva: 3,
      type: 'flervalg',
      mal: [12, 13],
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
    { id: 'nv-33', niva: 3, type: 'formel', mal: [12, 13], navn: 'jodheptafluorid', svar: 'IF7', hint: 'Hepta = 7.' },
    { id: 'nv-34', niva: 3, type: 'formel', mal: [12, 13], navn: 'bly(IV)oksid', svar: 'PbO2' },
    { id: 'nv-35', niva: 3, type: 'navn', mal: [12, 14], formel: 'NaHCO3', svar: ['natriumhydrogenkarbonat'] },
    { id: 'nv-37', niva: 3, type: 'navn', mal: [12, 13], formel: 'Cl2O7', svar: ['diklorheptaoksid'] },
    {
      id: 'rp-11',
      niva: 3,
      type: 'flervalg',
      mal: [13],
      sporsmal: 'Hvorfor skriver vi ikke «mono» foran karbon i karbonmonoksid?',
      alternativer: [
        '«Mono» brukes aldri foran det første grunnstoffet',
        'Karbon er et metall',
        'Det er et salt',
        'Karbon har bare én ladning',
      ],
      svar: 0,
    },
    {
      id: 'rp-12',
      niva: 3,
      type: 'forklaring',
      mal: [13],
      sporsmal: 'Forklar hvorfor {{FeCl2}} heter jern(II)klorid, {{CaCl2}} heter kalsiumklorid og {{SCl2}} heter svoveldiklorid.',
      modellsvar: '{{FeCl2}} og {{CaCl2}} er salter av et metall og et ikke-metall. Salter får ikke tallprefikser, fordi formelen er bestemt av ladningene. Jern er et innskuddsmetall som kan danne både {{Fe^2+}} og {{Fe^3+}}. Med to {{Cl-}} må jern ha ladning +2, og ladningen skrives med romertall: jern(II)klorid. Kalsium danner bare {{Ca^2+}}, så det trengs ikke romertall. {{SCl2}} består av to ikke-metaller som deler elektroner (molekylforbindelse). Her viser greske prefikser antall atomer: ett S og to Cl gir svoveldiklorid.',
      punkter: [
        'Salter: ingen tallprefikser',
        'Jern kan ha flere ladninger → romertall for ladningen (+2)',
        'Kalsium har bare én ladning → ikke romertall',
        'SCl₂ er en molekylforbindelse → prefikser for antall atomer',
      ],
    },
  ],
  flashcards: [
    { f: 'Greske prefikser 1–10', b: 'mono, di, tri, tetra, penta, heksa, hepta, okta, nona, deka' },
    {
      f: 'Navn på salter',
      b: 'Kation + anion med -id. Ingen tallprefikser. Romertall for metaller med flere ladninger.',
    },
    {
      f: 'Navn på molekylære forbindelser',
      b: 'Greske prefikser, mest elektronegative sist med -id, ikke «mono» først.',
    },
    {
      f: 'Når bruker du romertall?',
      b: 'I salter der metallet kan ha flere ladninger (de fleste innskuddsmetaller, Sn og Pb). Romertallet er ladningen.',
    },
    { f: 'Når bruker du tallprefikser?', b: 'I molekylforbindelser mellom ikke-metaller. Prefikset er antall atomer.' },
    { f: 'Fe, Cu, Ag, Au, Pb, Sn, Hg', b: 'jern, kobber, sølv, gull, bly, tinn, kvikksølv' },
  ],
});
