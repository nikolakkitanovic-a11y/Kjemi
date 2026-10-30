/*
 * Tema 7: Reaksjonslikninger og balansering
 */
KJ.tema({
  id: 'reaksjonslikninger',
  nr: 7,
  tittel: 'Reaksjonslikninger',
  beskrivelse: 'Balansering, tilstandssymboler, reaksjonstyper og ionelikninger for fellingsreaksjoner.',
  farge: '#5B4CF5',
  bolge: 434,
  linje: 'H-γ 434 nm',
  kilde: 'notater',
  mal: [
    'Skrive og balansere reaksjonslikninger, også med ioner',
    'Gjenkjenne vanlige reaksjonstyper',
  ],

  teori: [
    {
      h: 'Hva viser en reaksjonslikning?',
      tekst: `En reaksjonslikning viser hvilke stoffer som reagerer (**reaktanter**) og hvilke som dannes (**produkter**):

$$\\ce{2H2(g) + O2(g) -> 2H2O(l)}$$

- **Koeffisientene** (de store tallene foran) viser forholdet mellom antall partikler.
- **Indeksene** (de små tallene) er en del av formelen. De sier hvor mange atomer av hvert slag som er i stoffet, og kan **aldri** endres når du balanserer. {{H2O}} og {{H2O2}} er to helt forskjellige stoffer.
- **Tilstandssymboler:** (s) fast stoff, (l) væske, (g) gass, (aq) løst i vann.`,
    },
    {
      h: 'Hvorfor må likningen være balansert?',
      tekst: `I en kjemisk reaksjon blir atomene bare omgruppert. De forsvinner ikke og oppstår ikke (**loven om massebevaring**). Derfor må det være **like mange atomer av hvert grunnstoff på begge sider** av pilen.

Er det ioner med i likningen, må også **summen av ladningene** være lik på begge sider.`,
    },
    {
      h: 'Slik balanserer du',
      tekst: `1. Skriv riktige formler for alle stoffene.
2. Tell atomene av hvert grunnstoff på hver side.
3. Start med grunnstoffet som finnes i færrest stoffer (ofte metallet eller karbon). Vent med H og O, og spesielt grunnstoffer som står alene (som {{O2}}), til slutt.
4. Behold sammensatte ioner som en enhet hvis de er uendret på begge sider (f.eks. {{SO4^2-}}).
5. Endre bare koeffisientene, aldri indeksene.
6. Bruk minste mulige hele tall.
7. Tell over og kontroller.

**Brøktriks:** Ved forbrenning blir det ofte et oddetall O-atomer på høyre side. Bruk en brøk foran {{O2}} og gang så hele likningen med 2:
{{C2H6 + 7/2 O2 -> 2CO2 + 3H2O}} → {{2C2H6 + 7O2 -> 4CO2 + 6H2O}}`,
    },
    {
      h: 'Vanlige reaksjonstyper',
      tabell: {
        hode: ['Type', 'Mønster', 'Eksempel'],
        rader: [
          ['Forbrenning', 'stoff + {{O2}} → oksider', '{{CH4 + 2O2 -> CO2 + 2H2O}}'],
          ['Syntese', 'A + B → AB', '{{2Na + Cl2 -> 2NaCl}}'],
          ['Spaltning', 'AB → A + B', '{{CaCO3 -> CaO + CO2}}'],
          ['Fortrengning', 'A + BC → AC + B', '{{Zn + CuSO4 -> ZnSO4 + Cu}}'],
          ['Felling', 'to løsninger → tungtløselig salt', '{{AgNO3 + NaCl -> AgCl + NaNO3}}'],
          ['Nøytralisasjon', 'syre + base → salt + vann', '{{HCl + NaOH -> NaCl + H2O}}'],
        ],
      },
      tekst: `Fullstendig forbrenning av et hydrokarbon gir alltid {{CO2}} og {{H2O}}.`,
    },
    {
      h: 'Ionelikninger og tilskuerioner',
      tekst: `Når to saltløsninger blandes og det dannes et tungtløselig salt (et **bunnfall**), kalles det en **fellingsreaksjon**. Salter i vann foreligger som frie ioner:

{{Ag+(aq) + NO3-(aq) + Na+(aq) + Cl-(aq) -> AgCl(s) + Na+(aq) + NO3-(aq)}}

{{Na+}} og {{NO3-}} er med på begge sider uten å reagere. De er **tilskuerioner** og tas ikke med i ionelikningen:

{{Ag+(aq) + Cl-(aq) -> AgCl(s)}}

Ionelikningen må være balansert både for atomer og ladning.`,
    },
  ],

  begreper: [
    { term: 'Reaktant', def: 'Stoff som reagerer (står til venstre for pilen).' },
    { term: 'Produkt', def: 'Stoff som dannes (står til høyre for pilen).' },
    { term: 'Koeffisient', def: 'Tallet foran en formel. Viser forholdet mellom antall partikler. Kan endres.' },
    { term: 'Indeks', def: 'Det lille tallet i formelen. Kan aldri endres ved balansering.' },
    { term: 'Massebevaring', def: 'Atomer verken oppstår eller forsvinner i en kjemisk reaksjon.' },
    { term: 'Tilstandssymboler', def: '(s) fast, (l) væske, (g) gass, (aq) løst i vann.' },
    { term: 'Tilskuerion', def: 'Ion som er med på begge sider uten å reagere.' },
    { term: 'Fellingsreaksjon', def: 'To løsninger blandes og danner et tungtløselig salt (bunnfall).' },
  ],

  eksempler: [
    {
      tittel: 'Forbrenning av propan',
      oppgave: 'Balanser {{C3H8 + O2 -> CO2 + H2O}}.',
      steg: [
        'Karbon: 3 C til venstre → $3\\,\\ce{CO2}$.',
        'Hydrogen: 8 H til venstre → $4\\,\\ce{H2O}$.',
        'Oksygen til høyre: $3 \\cdot 2 + 4 \\cdot 1 = 10$ O → $5\\,\\ce{O2}$.',
        'Svar: {{C3H8 + 5O2 -> 3CO2 + 4H2O}}. Kontroll: C 3 = 3, H 8 = 8, O 10 = 10.',
      ],
    },
    {
      tittel: 'Nøytralisasjon med sammensatte ioner',
      oppgave: 'Balanser {{Al(OH)3 + H2SO4 -> Al2(SO4)3 + H2O}}.',
      steg: [
        'Aluminium: 2 Al til høyre → $2\\,\\ce{Al(OH)3}$.',
        'Sulfat (hold {{SO4}} samlet): 3 til høyre → $3\\,\\ce{H2SO4}$.',
        'Hydrogen til venstre: $2 \\cdot 3 + 3 \\cdot 2 = 12$ → $6\\,\\ce{H2O}$.',
        'Svar: {{2Al(OH)3 + 3H2SO4 -> Al2(SO4)3 + 6H2O}}. Kontroll: O 6 + 12 = 18 og 12 + 6 = 18.',
      ],
    },
  ],

  feller: [
    'Endre aldri indeksene for å få det til å gå opp. Da lager du et annet stoff.',
    'Skriv {{CO2}} med stor O og senket 2-tall. «Co» er kobolt, og et hevet tall betyr ladning.',
    'Koeffisientene skal være minste mulige hele tall: {{4H2 + 2O2 -> 4H2O}} er balansert, men skal forkortes.',
    'I ionelikninger må også ladningen være lik på begge sider.',
  ],

  oppgaver: [
    /* ---------- Grunnleggende ---------- */
    { id: 'rl-01', niva: 1, type: 'balanser', reaktanter: ['H2', 'O2'], produkter: ['H2O'], svar: [2, 1, 2], hint: 'Begynn med oksygen: det er 2 O til venstre.' },
    { id: 'rl-02', niva: 1, type: 'balanser', reaktanter: ['N2', 'H2'], produkter: ['NH3'], svar: [1, 3, 2], hint: 'Det er 2 N til venstre. Hvor mange {{NH3}} trengs?' },
    { id: 'rl-03', niva: 1, type: 'balanser', reaktanter: ['Na', 'Cl2'], produkter: ['NaCl'], svar: [2, 1, 2] },
    { id: 'rl-04', niva: 1, type: 'balanser', reaktanter: ['Mg', 'O2'], produkter: ['MgO'], svar: [2, 1, 2] },
    {
      id: 'rl-05', niva: 1, type: 'balanser', reaktanter: ['CH4', 'O2'], produkter: ['CO2', 'H2O'], svar: [1, 2, 1, 2],
      hint: ['Start med C, så H, og ta O til slutt.', '4 H til venstre gir $2\\,\\ce{H2O}$.'],
      steg: ['C: 1 = 1', 'H: 4 H → $2\\,\\ce{H2O}$', 'O til høyre: $2 + 2 = 4$ → $2\\,\\ce{O2}$', '{{CH4 + 2O2 -> CO2 + 2H2O}}'],
    },
    {
      id: 'rl-06', niva: 1, type: 'flervalg',
      sporsmal: 'Hva kalles tallet 2 i $2\\,\\ce{H2O}$ (tallet foran formelen)?',
      alternativer: ['Koeffisient', 'Indeks', 'Ladning', 'Tilstandssymbol'],
      svar: 0,
    },
    {
      id: 'rl-07', niva: 1, type: 'kobling',
      sporsmal: 'Koble tilstandssymbolet med betydningen.',
      par: [['(s)', 'fast stoff'], ['(l)', 'væske'], ['(g)', 'gass'], ['(aq)', 'løst i vann']],
    },
    {
      id: 'rl-08', niva: 1, type: 'flervalg',
      sporsmal: 'Hvorfor kan du ikke balansere {{H2O -> H2 + O2}} ved å endre {{H2O}} til {{H2O2}}?',
      alternativer: [
        'Da endrer du stoffet: {{H2O2}} er hydrogenperoksid, ikke vann',
        'Det er lov, men ikke vanlig',
        'Fordi indekser alltid må være 1',
        'Fordi oksygen ikke kan ha indeks 2',
      ],
      svar: 0,
    },
    { id: 'rl-09', niva: 1, type: 'balanser', reaktanter: ['Al', 'O2'], produkter: ['Al2O3'], svar: [4, 3, 2], hint: ['O: 2 til venstre og 3 til høyre. Minste felles multiplum er 6.', 'Da trengs $2\\,\\ce{Al2O3}$ og $3\\,\\ce{O2}$.'] },
    { id: 'rl-10', niva: 1, type: 'balanser', reaktanter: ['AlCl3', 'NaOH'], produkter: ['Al(OH)3', 'NaCl'], svar: [1, 3, 1, 3], hint: 'Hold {{OH}} samlet som én enhet.' },
    /* ---------- Middels ---------- */
    {
      id: 'rl-11', niva: 2, type: 'balanser', reaktanter: ['C3H8', 'O2'], produkter: ['CO2', 'H2O'], svar: [1, 5, 3, 4],
      hint: ['C først, så H, og O til slutt.'],
      steg: ['C: 3 → $3\\,\\ce{CO2}$', 'H: 8 → $4\\,\\ce{H2O}$', 'O til høyre: $6 + 4 = 10$ → $5\\,\\ce{O2}$', '{{C3H8 + 5O2 -> 3CO2 + 4H2O}}'],
    },
    {
      id: 'rl-12', niva: 2, type: 'balanser', reaktanter: ['C2H6', 'O2'], produkter: ['CO2', 'H2O'], svar: [2, 7, 4, 6],
      hint: ['Du får et oddetall O-atomer. Bruk en brøk foran {{O2}}.', 'Gang så hele likningen med 2.'],
      steg: ['C: 2 → $2\\,\\ce{CO2}$', 'H: 6 → $3\\,\\ce{H2O}$', 'O til høyre: $4 + 3 = 7$ → $\\tfrac{7}{2}\\,\\ce{O2}$', 'Gang med 2: {{2C2H6 + 7O2 -> 4CO2 + 6H2O}}'],
    },
    {
      id: 'rl-13', niva: 2, type: 'balanser', reaktanter: ['Al(OH)3', 'H2SO4'], produkter: ['Al2(SO4)3', 'H2O'], svar: [2, 3, 1, 6],
      hint: ['Start med Al, så {{SO4}} som en enhet.', 'Tell H til slutt.'],
      steg: ['Al: 2 til høyre → $2\\,\\ce{Al(OH)3}$', '{{SO4}}: 3 til høyre → $3\\,\\ce{H2SO4}$', 'H til venstre: $6 + 6 = 12$ → $6\\,\\ce{H2O}$', '{{2Al(OH)3 + 3H2SO4 -> Al2(SO4)3 + 6H2O}}'],
    },
    { id: 'rl-14', niva: 2, type: 'balanser', reaktanter: ['Fe', 'O2'], produkter: ['Fe2O3'], svar: [4, 3, 2], hint: 'O: minste felles multiplum av 2 og 3 er 6.' },
    { id: 'rl-15', niva: 2, type: 'balanser', reaktanter: ['KClO3'], produkter: ['KCl', 'O2'], svar: [2, 2, 3], hint: 'O: 3 til venstre og 2 til høyre.' },
    { id: 'rl-16', niva: 2, type: 'balanser', reaktanter: ['Zn', 'HCl'], produkter: ['ZnCl2', 'H2'], svar: [1, 2, 1, 1] },
    { id: 'rl-17', niva: 2, type: 'balanser', reaktanter: ['Ca(OH)2', 'HNO3'], produkter: ['Ca(NO3)2', 'H2O'], svar: [1, 2, 1, 2], hint: 'Hold {{NO3}} samlet.' },
    { id: 'rl-18', niva: 2, type: 'balanser', reaktanter: ['Fe2O3', 'CO'], produkter: ['Fe', 'CO2'], svar: [1, 3, 2, 3], hint: 'Hvert CO tar ett O-atom og blir {{CO2}}.' },
    {
      id: 'rl-19', niva: 2, type: 'sortering',
      sporsmal: 'Hvilken reaksjonstype er det?',
      kategorier: ['Forbrenning', 'Syntese', 'Spaltning', 'Felling'],
      elementer: [
        ['{{CH4 + 2O2 -> CO2 + 2H2O}}', 0],
        ['{{2Na + Cl2 -> 2NaCl}}', 1],
        ['{{CaCO3 -> CaO + CO2}}', 2],
        ['{{AgNO3 + NaCl -> AgCl + NaNO3}}', 3],
        ['{{2H2O2 -> 2H2O + O2}}', 2],
        ['{{N2 + 3H2 -> 2NH3}}', 1],
        ['{{C2H5OH + 3O2 -> 2CO2 + 3H2O}}', 0],
        ['{{BaCl2 + Na2SO4 -> BaSO4 + 2NaCl}}', 3],
      ],
    },
    {
      id: 'rl-20', niva: 2, type: 'flervalg',
      sporsmal: 'Sølvnitratløsning blandes med natriumkloridløsning, og det dannes et hvitt bunnfall. Hvilken ionelikning er riktig?',
      alternativer: ['{{Ag+(aq) + Cl-(aq) -> AgCl(s)}}', '{{Na+(aq) + NO3-(aq) -> NaNO3(s)}}', '{{AgNO3(aq) -> Ag+(aq) + NO3-(aq)}}', '{{Ag(s) + Cl2(g) -> AgCl2(s)}}'],
      svar: 0,
      hint: 'Hvilket salt er tungtløselig? Tilskuerionene tas ikke med.',
    },
    { id: 'rl-21', niva: 2, type: 'balanser', reaktanter: ['C6H12O6', 'O2'], produkter: ['CO2', 'H2O'], svar: [1, 6, 6, 6], hint: 'Husk at glukose selv inneholder 6 O-atomer.' },
    { id: 'rl-22', niva: 2, type: 'balanser', reaktanter: ['Na2CO3', 'HCl'], produkter: ['NaCl', 'H2O', 'CO2'], svar: [1, 2, 2, 1, 1] },
    {
      id: 'rl-23', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange oksygenatomer er det på hver side i {{2Al(OH)3 + 3H2SO4 -> Al2(SO4)3 + 6H2O}}?',
      svar: 18, heltall: true, enhet: null,
      hint: 'Gang indeksene med koeffisienten, og husk parentesene.',
      steg: ['Venstre: $2 \\cdot 3 + 3 \\cdot 4 = 6 + 12 = 18$', 'Høyre: $3 \\cdot 4 + 6 \\cdot 1 = 12 + 6 = 18$'],
    },
    /* ---------- Høy måloppnåelse ---------- */
    {
      id: 'rl-24', niva: 3, type: 'balanser', reaktanter: ['C8H18', 'O2'], produkter: ['CO2', 'H2O'], svar: [2, 25, 16, 18],
      hint: ['C: 8, H: 18 → $9\\,\\ce{H2O}$.', 'O til høyre blir 25. Bruk brøk og gang med 2.'],
      steg: ['C: $8\\,\\ce{CO2}$, H: $9\\,\\ce{H2O}$', 'O til høyre: $16 + 9 = 25$ → $\\tfrac{25}{2}\\,\\ce{O2}$', 'Gang med 2: {{2C8H18 + 25O2 -> 16CO2 + 18H2O}}'],
    },
    { id: 'rl-25', niva: 3, type: 'balanser', reaktanter: ['Fe2(SO4)3', 'KOH'], produkter: ['K2SO4', 'Fe(OH)3'], svar: [1, 6, 3, 2], hint: 'Behandle {{SO4}} og {{OH}} som enheter.' },
    {
      id: 'rl-26', niva: 3, type: 'balanser', reaktanter: ['NH3', 'O2'], produkter: ['NO', 'H2O'], svar: [4, 5, 4, 6],
      hint: ['Start med N og H.', 'Du får 5/2 {{O2}} hvis du starter med 2 {{NH3}}. Gang med 2.'],
      steg: ['Prøv $2\\,\\ce{NH3}$: gir 2 NO og $3\\,\\ce{H2O}$', 'O til høyre: $2 + 3 = 5$ → $\\tfrac{5}{2}\\,\\ce{O2}$', 'Gang med 2: {{4NH3 + 5O2 -> 4NO + 6H2O}}'],
    },
    { id: 'rl-27', niva: 3, type: 'balanser', reaktanter: ['C2H5OH', 'O2'], produkter: ['CO2', 'H2O'], svar: [1, 3, 2, 3], hint: 'Etanol inneholder selv ett O-atom.' },
    { id: 'rl-28', niva: 3, type: 'balanser', reaktanter: ['Ca3(PO4)2', 'H2SO4'], produkter: ['CaSO4', 'H3PO4'], svar: [1, 3, 3, 2] },
    {
      id: 'rl-29', niva: 3, type: 'balanser', reaktanter: ['Fe^3+', 'OH-'], produkter: ['Fe(OH)3'], svar: [1, 3, 1],
      hint: 'Både atomer og ladning må stemme.',
      steg: ['Fe: 1 = 1', 'OH: 3 til høyre → $3\\,\\ce{OH-}$', 'Ladning: $+3 + 3 \\cdot (-1) = 0$ til venstre, 0 til høyre.'],
    },
    {
      id: 'rl-30', niva: 3, type: 'balanser', reaktanter: ['Cu', 'HNO3'], produkter: ['Cu(NO3)2', 'NO', 'H2O'], svar: [3, 8, 3, 2, 4],
      hint: ['Dette er en redoksreaksjon og vanskelig å prøve seg frem på.', 'Prøv 3 Cu og 2 NO, og balanser så N, H og O.'],
      steg: ['Cu: 3 Cu → $3\\,\\ce{Cu(NO3)2}$', 'Anta 2 NO. N til høyre: $6 + 2 = 8$ → $8\\,\\ce{HNO3}$', 'H: 8 → $4\\,\\ce{H2O}$', 'O-kontroll: venstre $8 \\cdot 3 = 24$, høyre $18 + 2 + 4 = 24$.'],
    },
    {
      id: 'rl-31', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar hvorfor en reaksjonslikning må være balansert, og hva koeffisientene forteller.',
      modellsvar: `I en kjemisk reaksjon brytes og dannes bindinger, men atomene forsvinner ikke og oppstår ikke. De bare omgrupperes. Dette er loven om massebevaring. Derfor må det være like mange atomer av hvert grunnstoff på begge sider av pilen, og ved ioner også samme totale ladning. Koeffisientene viser forholdet mellom antall partikler som reagerer og dannes. I {{2H2 + O2 -> 2H2O}} reagerer to molekyler hydrogen med ett molekyl oksygen og gir to molekyler vann.`,
      punkter: ['Loven om massebevaring', 'Atomer verken oppstår eller forsvinner, de omgrupperes', 'Like mange av hvert atom (og samme ladning) på begge sider', 'Koeffisientene viser forholdet mellom antall partikler'],
    },
    { id: 'rl-32', niva: 3, type: 'balanser', reaktanter: ['P4', 'O2'], produkter: ['P4O10'], svar: [1, 5, 1] },
    { id: 'rl-33', niva: 3, type: 'balanser', reaktanter: ['Al', 'CuSO4'], produkter: ['Al2(SO4)3', 'Cu'], svar: [2, 3, 1, 3] },
    {
      id: 'rl-34', niva: 3, type: 'balanser', reaktanter: ['C4H10', 'O2'], produkter: ['CO2', 'H2O'], svar: [2, 13, 8, 10],
      hint: 'Butan: C 4, H 10. Du får brøk foran {{O2}}.',
      steg: ['C: $4\\,\\ce{CO2}$, H: $5\\,\\ce{H2O}$', 'O til høyre: $8 + 5 = 13$ → $\\tfrac{13}{2}\\,\\ce{O2}$', 'Gang med 2: {{2C4H10 + 13O2 -> 8CO2 + 10H2O}}'],
    },
  ],

  flashcards: [
    { f: 'Reaktanter og produkter', b: 'Reaktanter står til venstre for pilen, produkter til høyre.' },
    { f: 'Koeffisient', b: 'Tallet foran formelen. Viser forholdet mellom antall partikler. Det er dette du endrer når du balanserer.' },
    { f: 'Indeks', b: 'Det lille tallet i formelen. Skal aldri endres, for da blir det et annet stoff.' },
    { f: 'Loven om massebevaring', b: 'Atomer verken oppstår eller forsvinner i en reaksjon.' },
    { f: 'Tilstandssymboler', b: '(s) fast stoff · (l) væske · (g) gass · (aq) løst i vann' },
    { f: 'Balanseringsrekkefølge', b: 'Metall/C først, sammensatte ioner som enheter, H og O til slutt. Minste hele tall.' },
    { f: 'Fullstendig forbrenning av hydrokarbon', b: 'Gir {{CO2}} og {{H2O}}.' },
    { f: 'Fellingsreaksjon', b: 'To saltløsninger danner et tungtløselig salt (bunnfall), f.eks. {{Ag+ + Cl- -> AgCl}}.' },
    { f: 'Tilskuerioner', b: 'Ioner som er uendret på begge sider og tas ut av ionelikningen.' },
    { f: 'Ionelikning', b: 'Viser bare ionene som reagerer. Må være balansert for både atomer og ladning.' },
  ],
});
