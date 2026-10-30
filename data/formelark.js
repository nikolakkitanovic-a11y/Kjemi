/*
 * Formelark – vises under Verktøy. Hver seksjon har en tittel og enten
 * formler (tex + forklaring) eller en tabell.
 */
KJ.formelark = [
  {
    tittel: 'Atomet',
    formler: [
      { tex: 'N = A - Z', tekst: 'Antall nøytroner = nukleontall − atomnummer' },
      { tex: '\\text{elektroner} = Z - \\text{ladning}', tekst: 'Antall elektroner i et ion' },
      { tex: '\\bar{m} = \\sum m_i \\cdot \\text{andel}_i', tekst: 'Gjennomsnittlig atommasse (vektet gjennomsnitt av isotopene)' },
    ],
  },
  {
    tittel: 'Elektronstruktur',
    formler: [
      { tex: '2n^2', tekst: 'Maks antall elektroner i skall nummer $n$ (K = 2, L = 8, M = 18, N = 32)' },
      { tex: 's:2 \\quad p:6 \\quad d:10 \\quad f:14', tekst: 'Maks elektroner i underskallene (1, 3, 5 og 7 orbitaler)' },
      { tex: '1s\\,2s\\,2p\\,3s\\,3p\\,4s\\,3d\\,4p\\,5s\\,4d\\,5p\\,6s\\,4f\\,5d\\,6p', tekst: 'Fyllingsrekkefølge' },
    ],
  },
  {
    tittel: 'Bindinger',
    formler: [{ tex: '\\Delta EN = |EN_1 - EN_2|', tekst: 'Forskjell i elektronegativitet' }],
    tabell: {
      hode: ['$\\Delta EN$', 'Bindingstype'],
      rader: [
        ['0 – ca. 0,4', 'Upolar kovalent'],
        ['ca. 0,5 – 1,7', 'Polar kovalent'],
        ['over 1,7', 'Ionebinding (tommelfingerregel)'],
      ],
    },
  },
  {
    tittel: 'Molekylform (VSEPR)',
    tabell: {
      hode: ['Bindende + ledige par', 'Form', 'Eksempel'],
      rader: [
        ['2 + 0', 'Lineær, 180°', '{{CO2}}'],
        ['3 + 0', 'Trigonal plan, 120°', '{{BF3}}'],
        ['4 + 0', 'Tetraedrisk, 109,5°', '{{CH4}}'],
        ['3 + 1', 'Trigonal pyramide, ca. 107°', '{{NH3}}'],
        ['2 + 2', 'Vinklet, ca. 104,5°', '{{H2O}}'],
      ],
    },
  },
  {
    tittel: 'Mol og konsentrasjon',
    formler: [
      { tex: 'n = \\dfrac{m}{M}', tekst: 'Stoffmengde (mol) = masse (g) / molar masse (g/mol)' },
      { tex: 'N = n \\cdot N_A', tekst: 'Antall partikler' },
      { tex: 'c = \\dfrac{n}{V}', tekst: 'Konsentrasjon (mol/L), V i liter' },
      { tex: 'c_1 V_1 = c_2 V_2', tekst: 'Fortynning' },
      { tex: '\\text{utbytte} = \\dfrac{m_\\text{faktisk}}{m_\\text{teoretisk}} \\cdot 100\\,\\%', tekst: 'Prosentvis utbytte' },
      { tex: '\\%\\,X = \\dfrac{\\text{masse av } X \\text{ i formelen}}{M} \\cdot 100\\,\\%', tekst: 'Masseprosent' },
    ],
  },
  {
    tittel: 'Konstanter',
    tabell: {
      hode: ['Størrelse', 'Verdi'],
      rader: [
        ['Avogadros tall, $N_A$', '$6,022 \\cdot 10^{23}\\ \\mathrm{mol^{-1}}$'],
        ['Atommasseenheten, u', '$1,661 \\cdot 10^{-27}$ kg'],
        ['Molvolum for gass (0 °C, 1 atm)', '22,4 L/mol'],
      ],
    },
  },
  {
    tittel: 'Greske tallprefikser',
    tabell: {
      hode: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      rader: [['mono', 'di', 'tri', 'tetra', 'penta', 'heksa', 'hepta', 'okta', 'nona', 'deka']],
    },
  },
  {
    tittel: 'Sammensatte ioner',
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
    tittel: 'Vanlige ioneladninger',
    tabell: {
      hode: ['Gruppe', '1', '2', '13', '15', '16', '17'],
      rader: [['Ladning', '+1', '+2', '+3 (Al)', '−3', '−2', '−1']],
    },
  },
  {
    tittel: 'Tilstandssymboler',
    tabell: {
      hode: ['(s)', '(l)', '(g)', '(aq)'],
      rader: [['fast stoff', 'væske', 'gass', 'løst i vann']],
    },
  },
];
