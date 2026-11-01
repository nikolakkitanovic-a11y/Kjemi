/*
 * Modul 13: Saltformler og ladningsregnskap
 * Læringsmål: 15
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */
KJ.modul({
  id: 'saltformler',
  nr: 13,
  tittel: 'Saltformler og ladningsregnskap',
  beskrivelse: 'Bruk ioneladninger til å sette opp saltformler, og forklar hvorfor saltet er elektrisk nøytralt.',
  mal: [15],
  farge: '#2486E6',
  bolge: 466,
  teori: [
    {
      h: 'Fra navn til formel: ladningsbalanse',
      tekst: `Summen av ladningene i et salt skal være **null**. Finn ladningene ut fra plasseringen i periodesystemet (gruppe 1: +1, gruppe 2: +2, Al: +3, gruppe 15: −3, gruppe 16: −2, gruppe 17: −1).

**Aluminiumoksid:** {{Al^3+}} og {{O^2-}}. Minste felles multiplum av 3 og 2 er 6: to {{Al^3+}} (+6) og tre {{O^2-}} (−6) → {{Al2O3}}.

Snarvei (kryssregelen): ladningstallet til det ene ionet blir indeksen til det andre. Husk å forkorte: {{Mg^2+}} og {{O^2-}} gir MgO, ikke {{Mg2O2}}.`,
    },
    {
      h: 'Hvorfor er saltet nøytralt?',
      tekst: `Et salt består av kationer og anioner. Elektronene som metallet avgir, blir tatt opp av ikke-metallet. Det forsvinner ingen elektroner og det kommer ingen nye til. Derfor er den samlede positive ladningen like stor som den samlede negative ladningen, og saltet er elektrisk nøytralt.

**Ladningsregnskap for aluminiumoksid:**
$2 \\cdot (+3) + 3 \\cdot (-2) = +6 - 6 = 0$ → {{Al2O3}}

**Kalsiumfosfat:**
$3 \\cdot (+2) + 2 \\cdot (-3) = +6 - 6 = 0$ → {{Ca3(PO4)2}}`,
    },
  ],
  begreper: [],
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
  ],
  feller: [
    'Forkort til minste hele tall: {{Mg^2+}} og {{O^2-}} gir MgO, ikke {{Mg2O2}}.',
    'Husk parentes: {{Ca(OH)2}}, ikke {{CaOH2}}.',
    'Romertallet er ladningen: jern(III)oksid er {{Fe2O3}} (2 · (+3) + 3 · (−2) = 0).',
    'Ladningene skrives ikke i formelen til saltet. Det heter NaCl, ikke {{Na+Cl-}}.',
  ],
  oppgaver: [
    {
      id: 'sb-09',
      niva: 1,
      type: 'fyllinn',
      mal: [15, 1],
      sporsmal: 'Fyll inn.',
      tekst: 'Når et metall reagerer med et ikke-metall, ___ metallet elektroner og blir et ___.',
      svar: [['avgir', 'gir fra seg', 'mister', 'gir bort'], ['kation', 'positivt ion']],
    },
    {
      id: 'nv-04',
      niva: 1,
      type: 'formel',
      mal: [15],
      navn: 'magnesiumoksid',
      svar: 'MgO',
      hint: ['Mg står i gruppe 2 og O i gruppe 16.', 'Ladningene +2 og −2 opphever hverandre.'],
      steg: ['{{Mg^2+}} og {{O^2-}}', '$+2 - 2 = 0$, så forholdet er 1 : 1 → MgO'],
    },
    {
      id: 'nv-05',
      niva: 1,
      type: 'formel',
      mal: [15],
      navn: 'aluminiumfluorid',
      svar: 'AlF3',
      hint: 'Al danner {{Al^3+}}, F danner {{F-}}.',
      steg: ['{{Al^3+}} og {{F-}}', 'Det trengs tre {{F-}} for å oppveie +3 → {{AlF3}}'],
    },
    { id: 'nv-10', niva: 1, type: 'formel', mal: [15], navn: 'litiumklorid', svar: 'LiCl' },
    { id: 'nv-11', niva: 1, type: 'formel', mal: [15], navn: 'kaliumbromid', svar: 'KBr' },
    {
      id: 'nv-15',
      niva: 2,
      type: 'formel',
      mal: [15, 14],
      navn: 'jern(II)hydroksid',
      svar: 'Fe(OH)2',
      hint: ['{{Fe^2+}} og {{OH-}}', 'Husk parentes rundt det sammensatte ionet.'],
      steg: ['{{Fe^2+}} trenger to {{OH-}}.', 'Flere sammensatte ioner → parentes: {{Fe(OH)2}}'],
    },
    {
      id: 'nv-16',
      niva: 2,
      type: 'formel',
      mal: [15, 14],
      navn: 'aluminiumsulfat',
      svar: 'Al2(SO4)3',
      hint: ['{{Al^3+}} og {{SO4^2-}}', 'Minste felles multiplum av 3 og 2 er 6.'],
      steg: ['{{Al^3+}} og {{SO4^2-}}', '2 · (+3) = +6 og 3 · (−2) = −6', 'Formel: {{Al2(SO4)3}}'],
    },
    {
      id: 'nv-17',
      niva: 2,
      type: 'formel',
      mal: [15, 14],
      navn: 'ammoniumnitrat',
      svar: 'NH4NO3',
      hint: '{{NH4+}} og {{NO3-}} har ladning +1 og −1.',
    },
    {
      id: 'nv-22',
      niva: 2,
      type: 'formel',
      mal: [15, 14],
      navn: 'kalsiumfosfat',
      svar: 'Ca3(PO4)2',
      hint: ['{{Ca^2+}} og {{PO4^3-}}', 'Minste felles multiplum av 2 og 3 er 6.'],
      steg: ['{{Ca^2+}} og {{PO4^3-}}', '3 · (+2) = +6 og 2 · (−3) = −6', 'Formel: {{Ca3(PO4)2}}'],
    },
    { id: 'nv-39', niva: 2, type: 'formel', mal: [15, 14], navn: 'sølvnitrat', svar: 'AgNO3' },
    {
      id: 'nv-28',
      niva: 3,
      type: 'formel',
      mal: [15, 13],
      navn: 'kobber(I)oksid',
      svar: 'Cu2O',
      hint: '{{Cu+}} og {{O^2-}}',
    },
    {
      id: 'nv-30',
      niva: 3,
      type: 'formel',
      mal: [15, 14],
      navn: 'ammoniumsulfat',
      svar: '(NH4)2SO4',
      hint: 'Det trengs to {{NH4+}} for hvert {{SO4^2-}}.',
    },
    {
      id: 'nv-36',
      niva: 3,
      type: 'formel',
      mal: [15],
      navn: 'magnesiumnitrid',
      svar: 'Mg3N2',
      hint: ['{{Mg^2+}} og {{N^3-}}', 'Minste felles multiplum av 2 og 3 er 6.'],
    },
    {
      id: 'nv-38',
      niva: 3,
      type: 'forklaring',
      mal: [15],
      sporsmal: 'Forklar trinn for trinn hvordan du finner formelen til aluminiumoksid.',
      modellsvar: 'Aluminium står i gruppe 13 og avgir tre elektroner, så det danner {{Al^3+}}. Oksygen står i gruppe 16 og tar opp to elektroner, så det danner {{O^2-}}. Et salt er elektrisk nøytralt, så summen av ladningene må bli null. Minste felles multiplum av 3 og 2 er 6. Vi trenger derfor to {{Al^3+}} (+6) og tre {{O^2-}} (−6). Formelen blir {{Al2O3}}.',
      punkter: [
        'Al danner Al³⁺ (gruppe 13)',
        'O danner O²⁻ (gruppe 16)',
        'Summen av ladningene må være null',
        'To Al³⁺ og tre O²⁻ → Al₂O₃',
      ],
    },
    { id: 'nv-40', niva: 3, type: 'formel', mal: [15, 13], navn: 'jern(III)oksid', svar: 'Fe2O3' },
  ],
  flashcards: [
    { f: 'Når skal det være parentes?', b: 'Når det er mer enn ett sammensatt ion: {{Ca(OH)2}}, {{Al2(SO4)3}}.' },
    {
      f: 'Kryssregelen',
      b: 'Ladningstallet til det ene ionet blir indeksen til det andre. Forkort til minste hele tall.',
    },
    {
      f: 'Hvorfor er et salt nøytralt?',
      b: 'Elektronene metallet avgir, tas opp av ikke-metallet. Samlet positiv ladning = samlet negativ ladning.',
    },
  ],
});
