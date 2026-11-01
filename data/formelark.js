/*
 * Formelark – vises under Verktøy. Hver seksjon har en tittel og enten
 * formler (tex + forklaring), en tabell, eller «ioner: true» (tabell fra data/ioner.js).
 */
KJ.formelark = [
  {
    tittel: 'Atomer og ioner',
    formler: [
      { tex: 'N = A - Z', tekst: 'Antall nøytroner = massetall (nukleontall) − atomnummer' },
      { tex: '\\text{elektroner} = Z - \\text{ladning}', tekst: 'Antall elektroner i et ion. {{Mg^2+}}: 12 − 2 = 10' },
      { tex: 'Z = \\text{elektroner} + \\text{ladning}', tekst: '«Hvem er jeg?»: finn atomnummeret ut fra elektroner og ladning' },
    ],
  },
  {
    tittel: 'Elektronkonfigurasjon',
    formler: [
      { tex: '2n^2', tekst: 'Maks antall elektroner i skall $n$ (K = 2, L = 8, M = 18, N = 32)' },
      { tex: 's:2 \\quad p:6 \\quad d:10 \\quad f:14', tekst: 'Maks elektroner i underskallene (1, 3, 5 og 7 orbitaler)' },
      { tex: '1s\\,2s\\,2p\\,3s\\,3p\\,4s\\,3d\\,4p\\,5s\\,4d\\,5p', tekst: 'Fyllingsrekkefølge (oppbyggingsprinsippet)' },
      { tex: '\\uparrow\\downarrow', tekst: 'Pauli: maks to elektroner per orbital, med motsatt spinn' },
      { tex: '\\uparrow\;\\uparrow\;\\uparrow', tekst: 'Hund: ett elektron i hver orbital før de pares' },
    ],
    tabell: {
      hode: ['Regel', 'Eksempel'],
      rader: [
        ['Innskuddsmetaller avgir **4s før 3d**', '{{Fe^2+}}: $[\\mathrm{Ar}]\\,3d^6$'],
        ['Unntak: krom', '$[\\mathrm{Ar}]\\,4s^1\\,3d^5$'],
        ['Unntak: kobber', '$[\\mathrm{Ar}]\\,4s^1\\,3d^{10}$'],
      ],
    },
  },
  {
    tittel: 'Periodiske trender',
    tabell: {
      hode: ['Egenskap', 'Bortover en periode', 'Nedover en gruppe', 'Hvorfor'],
      rader: [
        ['Atomradius', 'minker', 'øker', 'Kjerneladning øker bortover, flere skall nedover'],
        ['Ioniseringsenergi', 'øker', 'minker', 'Sterkere tiltrekning bortover, mer skjerming nedover'],
        ['Elektronegativitet', 'øker', 'minker', 'Samme som ioniseringsenergi'],
        ['Ioneradius', 'kation < atom < anion', '', 'Isoelektroniske: flest protoner = minst'],
      ],
    },
  },
  {
    tittel: 'Bindinger og polaritet',
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
    tittel: 'Elektronegativitet som på prøven',
    tabell: {
      hode: ['H', 'C', 'N', 'O', 'P', 'S', 'Cl'],
      rader: [['2,1', '2,5', '3,0', '3,5', '2,2', '2,6', '3,2']],
    },
    merk: 'Dette er verdiene læreren oppgir på prøven. Eksempler: H–S 0,5 · P–H 0,1 · P–Cl 1,0 · H–Cl 1,1 · C–Cl 0,7 · N–H 0,9 · O–H 1,4.',
  },
  {
    tittel: 'Molekylform (VSEPR)',
    tabell: {
      hode: ['Bindende + ledige par', 'Form', 'Eksempel'],
      rader: [
        ['2 + 0', 'Lineær, 180°', '{{CO2}}'],
        ['3 + 0', 'Trigonal plan, 120°', '{{CO3^2-}}'],
        ['4 + 0', 'Tetraedrisk, 109,5°', '{{CH4}}'],
        ['3 + 1', 'Trigonal pyramide, ca. 107°', '{{NH3}}'],
        ['2 + 2', 'Vinklet, ca. 104,5°', '{{H2O}}'],
      ],
    },
  },
  {
    tittel: 'Krefter mellom partikler',
    tabell: {
      hode: ['Kraft', 'Mellom', 'Eksempel'],
      rader: [
        ['London-krefter', 'alle molekyler (midlertidige dipoler)', '{{CH4}}, {{I2}}'],
        ['Dipol-dipol', 'dipolmolekyler', 'HCl'],
        ['Hydrogenbinding', 'H på N, O, F og ledig par på N, O, F', '{{H2O}}, {{NH3}}'],
        ['Ion-dipol', 'ion og dipolmolekyl', '{{Na+}} i vann'],
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
    tittel: 'Romertall eller prefikser?',
    tabell: {
      hode: ['Forbindelse', 'Bruk', 'Eksempel'],
      rader: [
        ['Salt, metall med én ladning', 'ingen', '{{CaCl2}} kalsiumklorid'],
        ['Salt, metall med flere ladninger', 'romertall = ladning', '{{FeCl3}} jern(III)klorid'],
        ['Molekylforbindelse', 'prefikser = antall atomer', '{{N2O4}} dinitrogentetraoksid'],
      ],
    },
  },
  { tittel: 'Sammensatte ioner (fra tavla)', ioner: true },
  {
    tittel: 'Vanlige ioneladninger',
    tabell: {
      hode: ['Gruppe', '1', '2', '13', '15', '16', '17'],
      rader: [['Ladning', '+1', '+2', '+3 (Al)', '−3', '−2', '−1']],
    },
  },
  {
    tittel: 'Balansering',
    tabell: {
      hode: ['', 'Hva det er', 'Kan endres?'],
      rader: [
        ['Koeffisient', 'Tallet foran: antall partikler', 'Ja'],
        ['Indeks', 'Det lille tallet: del av formelen', 'Nei – da blir det et annet stoff'],
      ],
    },
  },
];
