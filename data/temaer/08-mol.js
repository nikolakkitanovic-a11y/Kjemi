/*
 * Tema 8: Stoffmengde og mol (tillegg – står ikke i notatene, men hører til
 * Kjemi 1 og trengs for regneoppgaver og molar masse-kalkulatoren).
 *
 * verify-funksjonene brukes av testene (tests/verifiser.js) for å regne ut
 * fasiten på nytt og kontrollere at den stemmer.
 */
KJ.tema({
  id: 'mol',
  nr: 8,
  tittel: 'Stoffmengde og mol',
  beskrivelse: 'Molar masse, n = m/M, konsentrasjon, fortynning, støkiometri, begrensende reaktant og utbytte.',
  farge: '#8B3CF0',
  bolge: 404,
  linje: 'K 404 nm',
  kilde: 'tillegg',
  mal: [
    'Gjøre beregninger med stoffmengde, masse, molar masse og konsentrasjon',
    'Bruke reaksjonslikninger til å beregne mengder av reaktanter og produkter',
  ],

  teori: [
    {
      h: 'Mol og Avogadros tall',
      tekst: `Atomer og molekyler er så små at vi teller dem i «pakker» på **1 mol**. Ett mol er $6,022 \\cdot 10^{23}$ partikler. Dette tallet kalles **Avogadros tall**, $N_A$.

$$N = n \\cdot N_A$$

der $N$ er antall partikler og $n$ er stoffmengden i mol.`,
    },
    {
      h: 'Molar masse',
      tekst: `**Molar masse** $M$ er massen av 1 mol av et stoff, i g/mol. Den finner du ved å legge sammen atommassene i formelen.

$M(\\ce{H2O}) = 2 \\cdot 1,008 + 16,00 = 18,02\\enhet{g/mol}$

$M(\\ce{Ca(OH)2}) = 40,08 + 2 \\cdot (16,00 + 1,008) = 74,10\\enhet{g/mol}$

Sammenhengen mellom masse og stoffmengde:

$$n = \\frac{m}{M} \\qquad m = n \\cdot M$$`,
      merk: 'Bruk molar masse-kalkulatoren under Verktøy for å sjekke utregningene dine.',
    },
    {
      h: 'Konsentrasjon og fortynning',
      tekst: `Konsentrasjonen av en løsning er stoffmengde per volum:

$$c = \\frac{n}{V}$$

med enheten mol/L (også skrevet M). Husk å gjøre mL om til L: 250 mL = 0,250 L.

Ved **fortynning** endres ikke stoffmengden av det oppløste stoffet, bare volumet:

$$c_1 V_1 = c_2 V_2$$`,
    },
    {
      h: 'Støkiometri: regning med reaksjonslikninger',
      tekst: `Koeffisientene i en balansert likning gir **molforholdet** mellom stoffene. I {{2H2 + O2 -> 2H2O}} reagerer 2 mol {{H2}} med 1 mol {{O2}} og gir 2 mol {{H2O}}.

Fremgangsmåte:
1. Skriv balansert reaksjonslikning.
2. Regn om det du kjenner til mol ($n = m/M$).
3. Bruk molforholdet fra likningen.
4. Regn om til det du skal finne ($m = n \\cdot M$).

**Begrensende reaktant** er den reaktanten som brukes opp først. Den bestemmer hvor mye produkt som kan dannes. Den andre reaktanten er i **overskudd**.

**Utbytte:**
$$\\text{utbytte} = \\frac{\\text{faktisk masse}}{\\text{teoretisk masse}} \\cdot 100\\,\\%$$`,
    },
    {
      h: 'Gjeldende siffer',
      tekst: `Svaret kan ikke være mer nøyaktig enn målingene. Ved multiplikasjon og divisjon skal svaret ha like mange **gjeldende siffer** som tallet med færrest gjeldende siffer.

- 5,0 g har 2 gjeldende siffer, 5,00 g har 3.
- Nuller foran tallet teller ikke: 0,0250 har 3 gjeldende siffer.
- $\\dfrac{5,0\\enhet{g}}{58,44\\enhet{g/mol}} = 0,085557... \\approx 0,086\\enhet{mol}$ (2 gjeldende siffer).

Vent med å avrunde til du har det endelige svaret.`,
    },
  ],

  begreper: [
    { term: 'Mol', def: 'Stoffmengde. 1 mol = $6,022 \\cdot 10^{23}$ partikler.' },
    { term: 'Avogadros tall ($N_A$)', def: '$6,022 \\cdot 10^{23}\\ \\mathrm{mol^{-1}}$' },
    { term: 'Molar masse ($M$)', def: 'Masse per mol, g/mol. Summen av atommassene i formelen.' },
    { term: 'Konsentrasjon ($c$)', def: 'Stoffmengde per liter løsning: $c = n/V$ (mol/L).' },
    { term: 'Støkiometri', def: 'Regning med mengdeforhold i kjemiske reaksjoner.' },
    { term: 'Begrensende reaktant', def: 'Reaktanten som brukes opp først og bestemmer mengden produkt.' },
    { term: 'Utbytte', def: 'Faktisk mengde produkt i prosent av teoretisk mengde.' },
    { term: 'Empirisk formel', def: 'Enkleste heltallsforhold mellom atomene i en forbindelse.' },
  ],

  eksempler: [
    {
      tittel: 'Fra masse til masse',
      oppgave: 'Hvor mange gram {{CO2}} dannes når 11,0 g propan brenner? {{C3H8 + 5O2 -> 3CO2 + 4H2O}}',
      steg: [
        '$M(\\ce{C3H8}) = 3 \\cdot 12,01 + 8 \\cdot 1,008 = 44,09\\enhet{g/mol}$',
        '$n(\\ce{C3H8}) = \\dfrac{11,0\\enhet{g}}{44,09\\enhet{g/mol}} = 0,2495\\enhet{mol}$',
        'Molforhold 1 : 3 → $n(\\ce{CO2}) = 3 \\cdot 0,2495 = 0,7484\\enhet{mol}$',
        '$m(\\ce{CO2}) = 0,7484\\enhet{mol} \\cdot 44,01\\enhet{g/mol} = 32,9\\enhet{g}$',
      ],
    },
  ],

  feller: [
    'Gjør om mL til L før du bruker $c = n/V$.',
    'Bruk molforholdet fra den **balanserte** likningen, ikke masseforholdet.',
    'Ikke avrund underveis. Avrund bare det endelige svaret.',
  ],

  oppgaver: [
    /* ---------- Grunnleggende ---------- */
    {
      id: 'mo-01', niva: 1, type: 'tall',
      sporsmal: 'Regn ut molar masse for vann, {{H2O}}.',
      svar: 18.02, enhet: 'g/mol', gs: 4, toleranse: 0.003,
      verify: (C) => C.M('H2O'),
      hint: 'H: 1,008 g/mol og O: 16,00 g/mol.',
      steg: ['$M = 2 \\cdot 1,008 + 16,00$', '$M = 18,02\\enhet{g/mol}$'],
    },
    {
      id: 'mo-02', niva: 1, type: 'tall',
      sporsmal: 'Regn ut molar masse for karbondioksid, {{CO2}}.',
      svar: 44.01, enhet: 'g/mol', gs: 4, toleranse: 0.003,
      verify: (C) => C.M('CO2'),
      steg: ['$M = 12,01 + 2 \\cdot 16,00 = 44,01\\enhet{g/mol}$'],
    },
    {
      id: 'mo-03', niva: 1, type: 'tall',
      sporsmal: 'Hvor mange mol er 36,0 g vann?',
      svar: 1.998, enhet: 'mol', gs: 3,
      verify: (C) => 36.0 / C.M('H2O'),
      hint: 'Bruk $n = m/M$. $M(\\ce{H2O}) = 18,02$ g/mol.',
      steg: ['$n = \\dfrac{m}{M} = \\dfrac{36,0\\enhet{g}}{18,02\\enhet{g/mol}}$', '$n = 2,00\\enhet{mol}$'],
    },
    {
      id: 'mo-04', niva: 1, type: 'tall',
      sporsmal: 'Hvor mange gram er 0,500 mol NaCl?',
      svar: 29.22, enhet: 'g', gs: 3,
      verify: (C) => 0.5 * C.M('NaCl'),
      hint: '$m = n \\cdot M$. Regn først ut $M(\\ce{NaCl})$.',
      steg: ['$M(\\ce{NaCl}) = 22,99 + 35,45 = 58,44\\enhet{g/mol}$', '$m = n \\cdot M = 0,500\\enhet{mol} \\cdot 58,44\\enhet{g/mol} = 29,2\\enhet{g}$'],
    },
    {
      id: 'mo-05', niva: 1, type: 'flervalg',
      sporsmal: 'Hva er 1 mol?',
      alternativer: ['$6,022 \\cdot 10^{23}$ partikler', '1 gram av et stoff', '22,4 gram av et stoff', 'Antall atomer i 1 g hydrogen, uansett stoff'],
      svar: 0,
    },
    {
      id: 'mo-06', niva: 1, type: 'tall',
      sporsmal: 'Hvor mange molekyler er det i 2,00 mol {{CO2}}?',
      svar: 1.2044e24, enhet: null, gs: 3,
      verify: () => 2.0 * 6.022e23,
      hint: '$N = n \\cdot N_A$',
      steg: ['$N = n \\cdot N_A = 2,00\\enhet{mol} \\cdot 6,022 \\cdot 10^{23}\\enhet{mol^{-1}}$', '$N = 1,20 \\cdot 10^{24}$ molekyler'],
    },
    {
      id: 'mo-07', niva: 1, type: 'kobling',
      sporsmal: 'Koble størrelsen med riktig enhet.',
      par: [['stoffmengde, $n$', 'mol'], ['masse, $m$', 'g'], ['molar masse, $M$', 'g/mol'], ['konsentrasjon, $c$', 'mol/L'], ['volum, $V$', 'L']],
    },
    {
      id: 'mo-08', niva: 1, type: 'tall',
      sporsmal: '0,250 mol NaCl løses i vann til 0,500 L løsning. Hva er konsentrasjonen?',
      svar: 0.5, enhet: 'mol/L', gs: 3,
      verify: () => 0.25 / 0.5,
      hint: '$c = n/V$',
      steg: ['$c = \\dfrac{n}{V} = \\dfrac{0,250\\enhet{mol}}{0,500\\enhet{L}} = 0,500\\enhet{mol/L}$'],
    },
    /* ---------- Middels ---------- */
    {
      id: 'mo-09', niva: 2, type: 'tall',
      sporsmal: 'Regn ut molar masse for kalsiumhydroksid, {{Ca(OH)2}}.',
      svar: 74.1, enhet: 'g/mol', gs: 4, toleranse: 0.003,
      verify: (C) => C.M('Ca(OH)2'),
      hint: 'Indeksen etter parentesen gjelder både O og H.',
      steg: ['$M = 40,08 + 2 \\cdot (16,00 + 1,008)$', '$M = 40,08 + 34,02 = 74,10\\enhet{g/mol}$'],
    },
    {
      id: 'mo-10', niva: 2, type: 'tall',
      sporsmal: 'Regn ut molar masse for aluminiumsulfat, {{Al2(SO4)3}}.',
      svar: 342.14, enhet: 'g/mol', gs: 4, toleranse: 0.002,
      verify: (C) => C.M('Al2(SO4)3'),
      hint: 'Al: 2 atomer, S: 3 atomer, O: $3 \\cdot 4 = 12$ atomer.',
      steg: ['$M = 2 \\cdot 26,98 + 3 \\cdot 32,06 + 12 \\cdot 16,00$', '$M = 53,96 + 96,18 + 192,00 = 342,14\\enhet{g/mol}$'],
    },
    {
      id: 'mo-11', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange mol er 10,0 g kalsiumkarbonat, {{CaCO3}}?',
      svar: 0.09991, enhet: 'mol', gs: 3,
      verify: (C) => 10.0 / C.M('CaCO3'),
      steg: ['$M(\\ce{CaCO3}) = 40,08 + 12,01 + 3 \\cdot 16,00 = 100,09\\enhet{g/mol}$', '$n = \\dfrac{10,0\\enhet{g}}{100,09\\enhet{g/mol}} = 0,0999\\enhet{mol}$'],
    },
    {
      id: 'mo-12', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange gram NaOH må du løse for å lage 250 mL løsning med konsentrasjon 0,100 mol/L?',
      svar: 1.0, enhet: 'g', gs: 3,
      verify: (C) => 0.1 * 0.25 * C.M('NaOH'),
      hint: ['Finn først stoffmengden: $n = c \\cdot V$. Husk at 250 mL = 0,250 L.', 'Regn så om til masse med $m = n \\cdot M$.'],
      steg: [
        '$n = c \\cdot V = 0,100\\enhet{mol/L} \\cdot 0,250\\enhet{L} = 0,0250\\enhet{mol}$',
        '$M(\\ce{NaOH}) = 22,99 + 16,00 + 1,008 = 40,00\\enhet{g/mol}$',
        '$m = 0,0250\\enhet{mol} \\cdot 40,00\\enhet{g/mol} = 1,00\\enhet{g}$',
      ],
    },
    {
      id: 'mo-13', niva: 2, type: 'tall',
      sporsmal: '50,0 mL av en løsning med 2,00 mol/L fortynnes til 250 mL. Hva blir den nye konsentrasjonen?',
      svar: 0.4, enhet: 'mol/L', gs: 3,
      verify: () => (2.0 * 50.0) / 250,
      hint: '$c_1 V_1 = c_2 V_2$',
      steg: ['$c_2 = \\dfrac{c_1 V_1}{V_2} = \\dfrac{2,00\\enhet{mol/L} \\cdot 50,0\\enhet{mL}}{250\\enhet{mL}}$', '$c_2 = 0,400\\enhet{mol/L}$'],
    },
    {
      id: 'mo-14', niva: 2, type: 'tall',
      sporsmal: 'I reaksjonen {{2H2 + O2 -> 2H2O}}: Hvor mange mol {{O2}} trengs for å reagere med 6,0 mol {{H2}}?',
      svar: 3.0, enhet: 'mol', gs: 2,
      verify: () => 6.0 / 2,
      hint: 'Molforholdet mellom {{H2}} og {{O2}} er 2 : 1.',
      steg: ['$n(\\ce{O2}) = \\dfrac{1}{2} \\cdot n(\\ce{H2}) = \\dfrac{6,0\\enhet{mol}}{2} = 3,0\\enhet{mol}$'],
    },
    {
      id: 'mo-15', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange gram vann dannes når 4,00 g {{H2}} brenner fullstendig? {{2H2 + O2 -> 2H2O}}',
      svar: 35.75, enhet: 'g', gs: 3,
      verify: (C) => (4.0 / C.M('H2')) * C.M('H2O'),
      hint: ['Regn om til mol {{H2}} først.', 'Molforholdet mellom {{H2}} og {{H2O}} er 1 : 1.'],
      steg: [
        '$n(\\ce{H2}) = \\dfrac{4,00\\enhet{g}}{2,016\\enhet{g/mol}} = 1,984\\enhet{mol}$',
        'Molforhold 2 : 2 = 1 : 1, så $n(\\ce{H2O}) = 1,984\\enhet{mol}$',
        '$m(\\ce{H2O}) = 1,984\\enhet{mol} \\cdot 18,02\\enhet{g/mol} = 35,7\\enhet{g}$',
      ],
    },
    {
      id: 'mo-16', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange masseprosent oksygen er det i vann?',
      svar: 88.81, enhet: '%', gs: 3, toleranse: 0.003,
      verify: (C) => (16.0 / C.M('H2O')) * 100,
      steg: ['$\\%\\,\\mathrm{O} = \\dfrac{16,00}{18,02} \\cdot 100\\,\\% = 88,8\\,\\%$'],
    },
    {
      id: 'mo-17', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange H-atomer er det i 0,100 mol metan, {{CH4}}?',
      svar: 2.4088e23, enhet: null, gs: 3,
      verify: () => 0.1 * 4 * 6.022e23,
      hint: 'Hvert {{CH4}}-molekyl har 4 H-atomer.',
      steg: ['$n(\\mathrm{H}) = 4 \\cdot 0,100\\enhet{mol} = 0,400\\enhet{mol}$', '$N = 0,400\\enhet{mol} \\cdot 6,022 \\cdot 10^{23}\\enhet{mol^{-1}} = 2,41 \\cdot 10^{23}$'],
    },
    {
      id: 'mo-18', niva: 2, type: 'tall',
      sporsmal: 'Regn ut molar masse for kobber(II)sulfatpentahydrat, {{CuSO4*5H2O}}.',
      svar: 249.69, enhet: 'g/mol', gs: 4, toleranse: 0.002,
      verify: (C) => C.M('CuSO4*5H2O'),
      hint: 'Krystallvannet skal med: legg til $5 \\cdot M(\\ce{H2O})$.',
      steg: ['$M(\\ce{CuSO4}) = 63,55 + 32,06 + 4 \\cdot 16,00 = 159,61\\enhet{g/mol}$', '$5 \\cdot M(\\ce{H2O}) = 5 \\cdot 18,016 = 90,08\\enhet{g/mol}$', '$M = 159,61 + 90,08 = 249,69\\enhet{g/mol}$'],
    },
    /* ---------- Høy måloppnåelse ---------- */
    {
      id: 'mo-19', niva: 3, type: 'tall',
      sporsmal: 'Hvor mange gram {{CO2}} dannes når 11,0 g propan brenner fullstendig? {{C3H8 + 5O2 -> 3CO2 + 4H2O}}',
      svar: 32.94, enhet: 'g', gs: 3,
      verify: (C) => (11.0 / C.M('C3H8')) * 3 * C.M('CO2'),
      hint: ['Masse propan → mol propan → mol {{CO2}} → masse {{CO2}}.', 'Molforholdet propan : {{CO2}} er 1 : 3.'],
      steg: [
        '$M(\\ce{C3H8}) = 44,09\\enhet{g/mol}$, så $n = \\dfrac{11,0}{44,09} = 0,2495\\enhet{mol}$',
        '$n(\\ce{CO2}) = 3 \\cdot 0,2495 = 0,7484\\enhet{mol}$',
        '$m(\\ce{CO2}) = 0,7484 \\cdot 44,01 = 32,9\\enhet{g}$',
      ],
    },
    {
      id: 'mo-20', niva: 3, type: 'tall',
      sporsmal: '10,0 g {{H2}} og 64,0 g {{O2}} reagerer: {{2H2 + O2 -> 2H2O}}. Hvor mange gram vann kan maksimalt dannes?',
      svar: 72.06, enhet: 'g', gs: 3,
      verify: (C) => {
        const nH2 = 10.0 / C.M('H2');
        const nO2 = 64.0 / C.M('O2');
        const nH2O = Math.min(nH2, 2 * nO2);
        return nH2O * C.M('H2O');
      },
      hint: ['Finn stoffmengden av begge reaktantene.', 'Hvor mye {{O2}} trengs for å bruke opp all {{H2}}? Hvilken reaktant er begrensende?'],
      steg: [
        '$n(\\ce{H2}) = \\dfrac{10,0}{2,016} = 4,96\\enhet{mol}$ og $n(\\ce{O2}) = \\dfrac{64,0}{32,00} = 2,00\\enhet{mol}$',
        'All {{H2}} krever $4,96 / 2 = 2,48$ mol {{O2}}, men vi har bare 2,00 mol. {{O2}} er begrensende.',
        '$n(\\ce{H2O}) = 2 \\cdot n(\\ce{O2}) = 4,00\\enhet{mol}$',
        '$m(\\ce{H2O}) = 4,00 \\cdot 18,02 = 72,1\\enhet{g}$',
      ],
    },
    {
      id: 'mo-21', niva: 3, type: 'tall',
      sporsmal: '4,86 g magnesium brennes og gir 7,25 g MgO. Hva er utbyttet i prosent? {{2Mg + O2 -> 2MgO}}',
      svar: 89.96, enhet: '%', gs: 3, toleranse: 0.005,
      verify: (C) => (7.25 / ((4.86 / C.M('Mg')) * C.M('MgO'))) * 100,
      hint: ['Regn ut teoretisk masse MgO først.', 'Molforholdet Mg : MgO er 1 : 1.'],
      steg: [
        '$n(\\mathrm{Mg}) = \\dfrac{4,86}{24,31} = 0,2000\\enhet{mol}$, så teoretisk $n(\\mathrm{MgO}) = 0,2000\\enhet{mol}$',
        '$M(\\mathrm{MgO}) = 40,31\\enhet{g/mol}$ → teoretisk masse $= 0,2000 \\cdot 40,31 = 8,06\\enhet{g}$',
        'Utbytte $= \\dfrac{7,25}{8,06} \\cdot 100\\,\\% = 90,0\\,\\%$',
      ],
    },
    {
      id: 'mo-22', niva: 3, type: 'formel',
      sporsmal: 'En forbindelse består av 40,0 % C, 6,7 % H og 53,3 % O (masseprosent). Finn den empiriske formelen. (Skriv C, H og O i den rekkefølgen.)',
      navn: 'empirisk formel', svar: 'CH2O', rekkefolge: false,
      hint: ['Tenk deg 100 g stoff. Regn om grammene til mol.', 'Del alle stoffmengdene på den minste.'],
      steg: [
        'I 100 g: 40,0 g C, 6,7 g H og 53,3 g O.',
        '$n(\\mathrm{C}) = 40,0/12,01 = 3,33$, $n(\\mathrm{H}) = 6,7/1,008 = 6,65$, $n(\\mathrm{O}) = 53,3/16,00 = 3,33$',
        'Del på 3,33: C : H : O = 1 : 2 : 1',
        'Empirisk formel: {{CH2O}}',
      ],
    },
    {
      id: 'mo-23', niva: 3, type: 'tall',
      sporsmal: '25,0 mL 0,100 mol/L {{AgNO3}} blandes med overskudd av NaCl-løsning. Hvor mange gram AgCl felles ut? {{Ag+ + Cl- -> AgCl}}',
      svar: 0.3583, enhet: 'g', gs: 3,
      verify: (C) => 0.1 * 0.025 * C.M('AgCl'),
      hint: ['$n(\\ce{Ag+}) = c \\cdot V$', 'Molforholdet {{Ag+}} : AgCl er 1 : 1.'],
      steg: [
        '$n(\\ce{Ag+}) = 0,100\\enhet{mol/L} \\cdot 0,0250\\enhet{L} = 2,50 \\cdot 10^{-3}\\enhet{mol}$',
        '$n(\\ce{AgCl}) = 2,50 \\cdot 10^{-3}\\enhet{mol}$',
        '$M(\\ce{AgCl}) = 107,87 + 35,45 = 143,32\\enhet{g/mol}$',
        '$m = 2,50 \\cdot 10^{-3} \\cdot 143,32 = 0,358\\enhet{g}$',
      ],
    },
    {
      id: 'mo-24', niva: 3, type: 'tall',
      sporsmal: 'Ved en titrering går det med 20,0 mL NaOH med konsentrasjon 0,150 mol/L for å nøytralisere 25,0 mL HCl. Hva er konsentrasjonen av HCl? {{HCl + NaOH -> NaCl + H2O}}',
      svar: 0.12, enhet: 'mol/L', gs: 3,
      verify: () => (0.15 * 0.02) / 0.025,
      hint: ['Finn $n(\\ce{NaOH})$ først.', 'Molforholdet HCl : NaOH er 1 : 1.'],
      steg: [
        '$n(\\ce{NaOH}) = 0,150\\enhet{mol/L} \\cdot 0,0200\\enhet{L} = 3,00 \\cdot 10^{-3}\\enhet{mol}$',
        '$n(\\ce{HCl}) = 3,00 \\cdot 10^{-3}\\enhet{mol}$',
        '$c(\\ce{HCl}) = \\dfrac{3,00 \\cdot 10^{-3}\\enhet{mol}}{0,0250\\enhet{L}} = 0,120\\enhet{mol/L}$',
      ],
    },
    {
      id: 'mo-25', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar hva gjeldende siffer er, og hvor mange gjeldende siffer svaret skal ha når du regner $\\dfrac{5,0\\enhet{g}}{58,44\\enhet{g/mol}}$.',
      modellsvar: `Gjeldende siffer er de sifrene i et måletall som er sikre, pluss det første usikre sifferet. De sier noe om hvor nøyaktig målingen er. Nuller foran tallet teller ikke. Ved multiplikasjon og divisjon skal svaret ha like mange gjeldende siffer som den verdien som har færrest. 5,0 g har 2 gjeldende siffer og 58,44 g/mol har 4, så svaret skal ha 2 gjeldende siffer: $5,0 / 58,44 = 0,08556 \\approx 0,086$ mol.`,
      punkter: ['Gjeldende siffer viser hvor nøyaktig et tall/en måling er', 'Ved ganging/deling: like mange gjeldende siffer som verdien med færrest', '5,0 har 2 gjeldende siffer', 'Svaret blir 0,086 mol'],
    },
    {
      id: 'mo-26', niva: 3, type: 'tall',
      sporsmal: 'Hvor mange mol jern kan maksimalt dannes fra 1,00 kg {{Fe2O3}}? {{Fe2O3 + 3CO -> 2Fe + 3CO2}}',
      svar: 12.52, enhet: 'mol', gs: 3,
      verify: (C) => (1000 / C.M('Fe2O3')) * 2,
      hint: ['1,00 kg = 1000 g', 'Molforholdet {{Fe2O3}} : Fe er 1 : 2.'],
      steg: ['$M(\\ce{Fe2O3}) = 2 \\cdot 55,85 + 3 \\cdot 16,00 = 159,70\\enhet{g/mol}$', '$n(\\ce{Fe2O3}) = \\dfrac{1000\\enhet{g}}{159,70\\enhet{g/mol}} = 6,262\\enhet{mol}$', '$n(\\mathrm{Fe}) = 2 \\cdot 6,262 = 12,5\\enhet{mol}$'],
    },
    {
      id: 'mo-27', niva: 3, type: 'tall',
      sporsmal: 'Hvor mange gram kobber(II)sulfatpentahydrat, {{CuSO4*5H2O}}, må du veie ut for å lage 100 mL løsning med $c(\\ce{Cu^2+}) = 0,200$ mol/L?',
      svar: 4.994, enhet: 'g', gs: 3,
      verify: (C) => 0.2 * 0.1 * C.M('CuSO4*5H2O'),
      hint: ['$n = c \\cdot V$', 'Husk krystallvannet i molar masse.'],
      steg: ['$n = 0,200\\enhet{mol/L} \\cdot 0,100\\enhet{L} = 0,0200\\enhet{mol}$', '$M(\\ce{CuSO4*5H2O}) = 249,69\\enhet{g/mol}$', '$m = 0,0200 \\cdot 249,69 = 4,99\\enhet{g}$'],
    },
  ],

  flashcards: [
    { f: 'Mol', b: 'Stoffmengde. 1 mol = $6,022 \\cdot 10^{23}$ partikler.' },
    { f: 'Avogadros tall', b: '$N_A = 6,022 \\cdot 10^{23}\\ \\mathrm{mol^{-1}}$. $N = n \\cdot N_A$.' },
    { f: 'Molar masse', b: 'Masse per mol (g/mol). Summen av atommassene i formelen.' },
    { f: '$n = m/M$', b: 'Stoffmengde = masse / molar masse.' },
    { f: '$c = n/V$', b: 'Konsentrasjon (mol/L) = stoffmengde / volum i liter.' },
    { f: 'Fortynning', b: '$c_1 V_1 = c_2 V_2$. Stoffmengden er den samme før og etter.' },
    { f: 'Støkiometri', b: 'Masse → mol → molforhold fra likningen → mol → masse.' },
    { f: 'Begrensende reaktant', b: 'Reaktanten som brukes opp først. Bestemmer hvor mye produkt som dannes.' },
    { f: 'Utbytte', b: 'Faktisk masse / teoretisk masse · 100 %.' },
    { f: 'Masseprosent', b: 'Massen av grunnstoffet i formelen / molar masse · 100 %.' },
    { f: 'Empirisk formel', b: 'Enkleste heltallsforhold mellom atomene, f.eks. {{CH2O}} for glukose.' },
    { f: 'Gjeldende siffer (gange/dele)', b: 'Svaret får like mange gjeldende siffer som verdien med færrest.' },
  ],
});
