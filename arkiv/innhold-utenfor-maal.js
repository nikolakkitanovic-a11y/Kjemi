/*
 * ARKIV – lastes ikke av index.html.
 * Innhold som ligger utenfor læringsmålene for prøven tirsdag 3. november.
 * Vil du ta noe i bruk igjen, flytter du det inn i en fil i data/moduler/ og gir oppgaven et «mal»-nummer.
 */
var ARKIV = {
  beskrivelse: 'Innhold som ligger utenfor læringsmålene for prøven 3. november. Lastes ikke av siden.',
  oppgaver: [
    {
      id: 'at-08',
      niva: 1,
      type: 'sortering',
      mal: ['Beskrive atomets oppbygning og bruke atommodeller'],
      sporsmal: 'Sorter stoffene: er de grunnstoffer eller kjemiske forbindelser?',
      kategorier: ['Grunnstoff', 'Kjemisk forbindelse'],
      elementer: [
        ['{{O2}}', 0],
        ['{{H2O}}', 1],
        ['{{NaCl}}', 1],
        ['{{Fe}}', 0],
        ['{{CO2}}', 1],
        ['{{N2}}', 0],
        ['{{He}}', 0],
        ['{{C6H12O6}}', 1],
      ],
      hint: 'En forbindelse må inneholde minst to ulike grunnstoffer.',
      forklaring: '{{O2}} og {{N2}} er molekyler, men består av bare ett grunnstoff. Derfor er de ikke forbindelser.',
      modul: 'atomet',
    },
    {
      id: 'at-13',
      niva: 2,
      type: 'tall',
      mal: ['Beskrive atomets oppbygning og bruke atommodeller'],
      sporsmal: 'Bor har to naturlige isotoper: B-10 (10,013 u, 19,9 %) og B-11 (11,009 u, 80,1 %). Regn ut gjennomsnittlig atommasse for bor.',
      svar: 10.81,
      enhet: 'u',
      gs: 4,
      toleranse: 0.003,
      verify: () => 10.013 * 0.199 + 11.009 * 0.801,
      hint: ['Gang massen til hver isotop med andelen (som desimaltall) og legg sammen.', '19,9 % = 0,199'],
      steg: [
        '$\\bar{m} = 10,013\\enhet{u} \\cdot 0,199 + 11,009\\enhet{u} \\cdot 0,801$',
        '$\\bar{m} = 1,993\\enhet{u} + 8,818\\enhet{u} = 10,81\\enhet{u}$',
        'Svaret stemmer med atommassen til bor i periodesystemet. Det ligger nærmest 11 fordi B-11 er vanligst.',
      ],
      modul: 'atomet',
    },
    {
      id: 'at-14',
      niva: 2,
      type: 'forklaring',
      mal: ['Beskrive atomets oppbygning og bruke atommodeller'],
      sporsmal: 'Atommassen til klor i periodesystemet er 35,45 u. Forklar hvorfor den ikke er et helt tall.',
      hint: 'Tenk på isotoper og hva «vektet gjennomsnitt» betyr.',
      modellsvar: 'Klor finnes i naturen som en blanding av isotopene Cl-35 og Cl-37. Isotopene har samme antall protoner, men ulikt antall nøytroner, og dermed ulik masse. Atommassen i periodesystemet er et vektet gjennomsnitt av massene, der hver isotop teller etter hvor vanlig den er (ca. 76 % Cl-35 og 24 % Cl-37). Derfor blir gjennomsnittet 35,45 u og ikke et helt tall.',
      punkter: [
        'Klor består av flere isotoper (Cl-35 og Cl-37)',
        'Isotopene har ulikt antall nøytroner og ulik masse',
        'Atommassen er et vektet gjennomsnitt etter hvor vanlig hver isotop er',
      ],
      modul: 'atomet',
    },
    {
      id: 'at-20',
      niva: 3,
      type: 'tall',
      mal: ['Beskrive atomets oppbygning og bruke atommodeller'],
      sporsmal: 'Kobber har isotopene Cu-63 (62,930 u) og Cu-65 (64,928 u). Gjennomsnittlig atommasse er 63,55 u. Regn ut hvor mange prosent av kobberatomene som er Cu-63.',
      svar: 68.97,
      enhet: '%',
      gs: 3,
      toleranse: 0.006,
      verify: () => ((64.928 - 63.55) / (64.928 - 62.93)) * 100,
      hint: [
        'Kall andelen Cu-63 for $x$. Da er andelen Cu-65 lik $1 - x$.',
        'Sett opp $62,930x + 64,928(1 - x) = 63,55$ og løs for $x$.',
      ],
      steg: [
        'La $x$ være andelen Cu-63. Andelen Cu-65 er da $1 - x$.',
        '$62,930x + 64,928(1 - x) = 63,55$',
        '$64,928 - 1,998x = 63,55$',
        '$x = \\dfrac{64,928 - 63,55}{1,998} = \\dfrac{1,378}{1,998} = 0,690$',
        'Omtrent **69,0 %** av kobberatomene er Cu-63 (og 31,0 % er Cu-65).',
      ],
      modul: 'atomet',
    },
    {
      id: 'at-25',
      niva: 3,
      type: 'tall',
      mal: ['Beskrive atomets oppbygning og bruke atommodeller'],
      sporsmal: 'Litium har isotopene Li-6 (6,015 u) og Li-7 (7,016 u). Gjennomsnittlig atommasse er 6,94 u. Hvor mange prosent av litiumatomene er Li-7?',
      svar: 92.41,
      enhet: '%',
      gs: 3,
      toleranse: 0.006,
      verify: () => ((6.94 - 6.015) / (7.016 - 6.015)) * 100,
      hint: 'La $x$ være andelen Li-7 og sett opp $6,015(1 - x) + 7,016x = 6,94$.',
      steg: [
        'La $x$ = andelen Li-7. Da er andelen Li-6 lik $1 - x$.',
        '$6,015(1 - x) + 7,016x = 6,94$',
        '$6,015 + 1,001x = 6,94 \\Rightarrow x = \\dfrac{0,925}{1,001} = 0,924$',
        'Omtrent **92,4 %** er Li-7.',
      ],
      modul: 'atomet',
    },
    {
      id: 'el-06',
      niva: 1,
      type: 'flervalg',
      mal: ['Forklare atomspektre ut fra energinivåer i atomet'],
      sporsmal: 'Hva skjer i atomet når det sender ut lys?',
      alternativer: [
        'Et elektron faller fra et høyere til et lavere energinivå',
        'Et elektron løftes til et høyere energinivå',
        'Et proton forlater kjernen',
        'Atomet mister et nøytron',
      ],
      svar: 0,
      hint: 'Lyset er energi som atomet gir fra seg.',
      forklaring: 'Energiforskjellen mellom nivåene sendes ut som et foton med bestemt bølgelengde.',
      modul: 'elektroner',
    },
    {
      id: 'el-07',
      niva: 1,
      type: 'flervalg',
      mal: ['Forklare atomspektre ut fra energinivåer i atomet'],
      sporsmal: 'Hvorfor har hvert grunnstoff sitt eget linjespekter?',
      alternativer: [
        'Hvert grunnstoff har sine egne, bestemte energinivåer for elektronene',
        'Atomene har ulik farge',
        'Atomene har ulikt antall nøytroner',
        'Lyset kommer fra atomkjernen',
      ],
      svar: 0,
      hint: 'Fargen på lyset avhenger av energiforskjellen mellom to nivåer.',
      forklaring: 'Energinivåene er bestemt av antall protoner og elektroner, så hvert grunnstoff får sitt eget sett av energiforskjeller og dermed sine egne linjer.',
      modul: 'elektroner',
    },
    {
      id: 'el-18',
      niva: 2,
      type: 'flervalg',
      mal: ['Forklare atomspektre ut fra energinivåer i atomet'],
      sporsmal: 'Blått lys har kortere bølgelengde og høyere energi enn rødt lys. Hvilken elektronovergang gir blått lys?',
      alternativer: [
        'En overgang med stor energiforskjell',
        'En overgang med liten energiforskjell',
        'En overgang der elektronet løftes opp',
        'Alle overganger gir samme farge',
      ],
      svar: 0,
      hint: 'Energien til fotonet er lik energiforskjellen mellom nivåene.',
      forklaring: 'Stor energiforskjell gir foton med høy energi og kort bølgelengde (blått/fiolett).',
      modul: 'elektroner',
    },
    {
      id: 'el-23',
      niva: 3,
      type: 'forklaring',
      mal: ['Forklare atomspektre ut fra energinivåer i atomet'],
      sporsmal: 'Forklar hvordan et linjespekter oppstår, og hvorfor det kan brukes til å identifisere grunnstoffer.',
      hint: 'Beskriv hva elektronene gjør, og knytt energiforskjell til farge.',
      modellsvar: 'Når atomer får tilført energi, for eksempel i en flamme, blir elektroner eksitert til høyere energinivåer. Elektronene faller raskt tilbake til lavere nivåer, og energiforskjellen sendes ut som et foton. Energien til fotonet bestemmer bølgelengden, altså fargen på lyset. Energinivåene i et atom har bestemte verdier (de er kvantiserte), så bare bestemte energiforskjeller, og dermed bestemte bølgelengder, er mulige. Det gir et spekter med skarpe linjer. Fordi hvert grunnstoff har sitt eget sett av energinivåer, får hvert grunnstoff et unikt mønster av linjer som fungerer som et fingeravtrykk.',
      punkter: [
        'Elektroner eksiteres til høyere energinivå når atomet får energi',
        'Når elektronene faller tilbake, sendes energien ut som lys (fotoner)',
        'Energiforskjellen bestemmer bølgelengden/fargen',
        'Energinivåene har bestemte verdier, så vi får bestemte linjer',
        'Hvert grunnstoff har unike energinivåer og dermed et unikt spekter',
      ],
      modul: 'elektroner',
    },
    {
      id: 'ps-03',
      niva: 1,
      type: 'kobling',
      mal: ['Forklare oppbygningen av periodesystemet ut fra elektronkonfigurasjon'],
      sporsmal: 'Koble gruppen med riktig navn.',
      par: [
        ['Gruppe 1', 'alkalimetaller'],
        ['Gruppe 2', 'jordalkalimetaller'],
        ['Gruppe 3–12', 'innskuddsmetaller'],
        ['Gruppe 17', 'halogener'],
        ['Gruppe 18', 'edelgasser'],
      ],
      modul: 'periodesystemet',
    },
    {
      id: 'ps-04',
      niva: 1,
      type: 'sortering',
      mal: ['Forklare oppbygningen av periodesystemet ut fra elektronkonfigurasjon'],
      sporsmal: 'Sorter grunnstoffene som metall, ikke-metall eller halvmetall.',
      kategorier: ['Metall', 'Ikke-metall', 'Halvmetall'],
      elementer: [['Na', 0], ['Fe', 0], ['Cu', 0], ['Ca', 0], ['S', 1], ['Cl', 1], ['O', 1], ['Si', 2], ['B', 2], ['Ge', 2]],
      hint: 'Halvmetallene ligger langs «trappen» mellom metallene og ikke-metallene.',
      modul: 'periodesystemet',
    },
    {
      id: 'ps-09',
      niva: 1,
      type: 'flervalg',
      mal: ['Forklare oppbygningen av periodesystemet ut fra elektronkonfigurasjon'],
      sporsmal: 'Hvilken gruppe reagerer nesten ikke med andre stoffer fordi grunnstoffene har fullt ytterste skall?',
      alternativer: ['Edelgassene', 'Halogenene', 'Alkalimetallene', 'Innskuddsmetallene'],
      svar: 0,
      modul: 'periodesystemet',
    },
    {
      id: 'ps-23',
      niva: 3,
      type: 'flervalg',
      mal: ['Forklare oppbygningen av periodesystemet ut fra elektronkonfigurasjon'],
      sporsmal: 'Hvorfor er fluor mer reaktivt enn jod?',
      alternativer: [
        'Fluor er mindre, så et ekstra elektron kommer nær kjernen og trekkes sterkt',
        'Fluor har flere valenselektroner enn jod',
        'Jod har fullt ytterste skall',
        'Fluor har høyere atommasse',
      ],
      svar: 0,
      hint: 'Halogener reagerer ved å ta opp et elektron.',
      forklaring: 'Begge har 7 valenselektroner. Fluor har bare to skall, så et innkommende elektron er nær kjernen og tiltrekkes sterkt. Det gjør fluor til det mest elektronegative og reaktive ikke-metallet.',
      modul: 'periodesystemet',
    },
    {
      id: 'rl-07',
      niva: 1,
      type: 'kobling',
      mal: ['Skrive og balansere reaksjonslikninger, også med ioner'],
      sporsmal: 'Koble tilstandssymbolet med betydningen.',
      par: [['(s)', 'fast stoff'], ['(l)', 'væske'], ['(g)', 'gass'], ['(aq)', 'løst i vann']],
      modul: 'reaksjonslikninger',
    },
    {
      id: 'rl-19',
      niva: 2,
      type: 'sortering',
      mal: ['Skrive og balansere reaksjonslikninger, også med ioner'],
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
      modul: 'reaksjonslikninger',
    },
    {
      id: 'rl-20',
      niva: 2,
      type: 'flervalg',
      mal: ['Skrive og balansere reaksjonslikninger, også med ioner'],
      sporsmal: 'Sølvnitratløsning blandes med natriumkloridløsning, og det dannes et hvitt bunnfall. Hvilken ionelikning er riktig?',
      alternativer: [
        '{{Ag+(aq) + Cl-(aq) -> AgCl(s)}}',
        '{{Na+(aq) + NO3-(aq) -> NaNO3(s)}}',
        '{{AgNO3(aq) -> Ag+(aq) + NO3-(aq)}}',
        '{{Ag(s) + Cl2(g) -> AgCl2(s)}}',
      ],
      svar: 0,
      hint: 'Hvilket salt er tungtløselig? Tilskuerionene tas ikke med.',
      modul: 'reaksjonslikninger',
    },
    {
      id: 'nv-27',
      niva: 3,
      type: 'navn',
      mal: ['Bruke kjemisk fagspråk: navnsette uorganiske forbindelser og skrive formler'],
      formel: 'CuSO4*5H2O',
      svar: ['kobber(II)sulfatpentahydrat'],
      hint: ['Navngi saltet først.', 'Fem vannmolekyler = pentahydrat.'],
      modul: 'navnsetting',
    },
    {
      id: 'sv-18',
      niva: 2,
      type: 'fyllinn',
      mal: ['Forklare intermolekylære krefter og bruke dem til å forklare kokepunkt, smeltepunkt og løselighet'],
      sporsmal: 'Fyll inn navnet.',
      tekst: '{{CuSO4*5H2O}} heter kobber(II)sulfat___.',
      svar: [['pentahydrat', '-pentahydrat']],
      hint: 'Penta = 5, hydrat = vann.',
      modul: 'svake-bindinger',
    },
  ],
  teori: [
    {
      fraTema: 'atomet',
      h: 'Grunnstoff, molekyl og kjemisk forbindelse',
      tekst: `Et **grunnstoff** består av bare én type atomer, altså atomer med samme atomnummer (f.eks. {{Fe}}, {{O2}}, {{He}}).

Et **molekyl** er to eller flere atomer som holdes sammen av kovalente bindinger. Atomene kan være like ({{O2}}, {{N2}}) eller ulike ({{H2O}}, {{CO2}}).

En **kjemisk forbindelse** består av minst to *ulike* grunnstoffer. {{H2O}} er både et molekyl og en forbindelse. {{O2}} er et molekyl, men ikke en forbindelse. {{NaCl}} er en forbindelse, men ikke et molekyl. Det er en ioneforbindelse bygd opp av ioner i et gitter.`,
    },
    {
      fraTema: 'atomet',
      h: 'Isotoper og gjennomsnittlig atommasse',
      tekst: `**Isotoper** er atomer av samme grunnstoff (samme antall protoner) med ulikt antall nøytroner, og derfor ulikt nukleontall. Eksempel: {{^{12}_{6}C}}, {{^{13}_{6}C}} og {{^{14}_{6}C}}.

Isotoper har samme kjemiske egenskaper, fordi de har like mange elektroner og samme elektronkonfigurasjon. De har ulik masse, og noen er radioaktive (f.eks. C-14).

Atommassen i periodesystemet er et **vektet gjennomsnitt** av isotopene slik de finnes i naturen:

$$\\bar{m} = m_1 \\cdot \\text{andel}_1 + m_2 \\cdot \\text{andel}_2 + \\dots$$

Det er derfor atommassen sjelden er et helt tall. Klor er 35,45 u fordi det finnes omtrent 76 % Cl-35 og 24 % Cl-37.`,
      merk: 'Atommasse måles i atommasseenheten u. 1 u er definert som 1/12 av massen til et C-12-atom.',
    },
    {
      fraTema: 'elektroner',
      h: 'Atomspektre',
      tekst: `Når et atom får tilført energi (varme i en flamme eller elektrisk strøm i et gassrør), kan et elektron hoppe opp til et høyere energinivå. Atomet er da **eksitert**. Når elektronet faller tilbake til et lavere nivå, sendes energiforskjellen ut som lys, et **foton**.

Fordi energinivåene i et atom har bestemte verdier, kan bare bestemte energiforskjeller forekomme. Lyset får derfor bestemte bølgelengder (farger), og vi ser et **linjespekter** (emisjonsspekter) med fargede linjer på mørk bakgrunn.

Hvert grunnstoff har sine egne energinivåer og derfor sitt unike linjespekter, et slags «fingeravtrykk». Slik kan vi identifisere grunnstoffer, både i flammeprøver på laben og i lyset fra stjerner.

Stor energiforskjell gir lys med kort bølgelengde (fiolett/blått). Liten energiforskjell gir lang bølgelengde (rødt).`,
      figur: { type: 'spekter', grunnstoff: ['H', 'He', 'Na', 'Hg'] },
      merk: 'Et absorpsjonsspekter er det motsatte: hvitt lys sendes gjennom en gass, og atomene tar opp nøyaktig de samme bølgelengdene. Vi ser mørke linjer i et ellers fargerikt spekter.',
    },
    {
      fraTema: 'periodesystemet',
      h: 'Metaller, ikke-metaller og halvmetaller',
      tekst: `Metallene står til venstre og i midten. Ikke-metallene står øverst til høyre (pluss hydrogen). Langs «trappen» fra B til At finner vi halvmetallene (B, Si, Ge, As, Sb, Te), som har egenskaper mellom metaller og ikke-metaller.

Periodesystemet er også delt i **blokker** etter hvilket underskall som fylles sist: s-blokken (gruppe 1–2), p-blokken (gruppe 13–18), d-blokken (innskuddsmetallene) og f-blokken (lantanoider og aktinoider).`,
    },
    {
      fraTema: 'navnsetting',
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
      fraTema: 'navnsetting',
      h: 'Hydrater',
      tekst: 'Salter med krystallvann navnsettes med saltnavnet + gresk prefiks + **hydrat**: {{CuSO4*5H2O}} kobber(II)sulfatpentahydrat, {{CaCl2*2H2O}} kalsiumkloriddihydrat.',
    },
    {
      fraTema: 'reaksjonslikninger',
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
      tekst: 'Fullstendig forbrenning av et hydrokarbon gir alltid {{CO2}} og {{H2O}}.',
    },
    {
      fraTema: 'reaksjonslikninger',
      h: 'Ionelikninger og tilskuerioner',
      tekst: `Når to saltløsninger blandes og det dannes et tungtløselig salt (et **bunnfall**), kalles det en **fellingsreaksjon**. Salter i vann foreligger som frie ioner:

{{Ag+(aq) + NO3-(aq) + Na+(aq) + Cl-(aq) -> AgCl(s) + Na+(aq) + NO3-(aq)}}

{{Na+}} og {{NO3-}} er med på begge sider uten å reagere. De er **tilskuerioner** og tas ikke med i ionelikningen:

{{Ag+(aq) + Cl-(aq) -> AgCl(s)}}

Ionelikningen må være balansert både for atomer og ladning.`,
    },
  ],
  begreper: [
    {
      fraTema: 'atomet',
      term: 'Gjennomsnittlig atommasse',
      def: 'Vektet gjennomsnitt av massene til isotopene, ut fra hvor vanlige de er i naturen.',
    },
    {
      fraTema: 'atomet',
      term: 'Kjemisk forbindelse',
      def: 'Stoff som består av minst to ulike grunnstoffer som er kjemisk bundet.',
    },
    {
      fraTema: 'elektroner',
      term: 'Eksitert tilstand',
      def: 'Et elektron er løftet til et høyere energinivå enn i grunntilstanden.',
    },
    {
      fraTema: 'elektroner',
      term: 'Emisjonsspekter',
      def: 'Fargede linjer som sendes ut når elektroner faller til lavere energinivå. Unikt for hvert grunnstoff.',
    },
    {
      fraTema: 'periodesystemet',
      term: 'Halvmetall',
      def: 'Grunnstoff med egenskaper mellom metall og ikke-metall, f.eks. Si og Ge.',
    },
    { fraTema: 'navnsetting', term: 'Hydrat', def: 'Salt med krystallvann, f.eks. {{CuSO4*5H2O}}.' },
    {
      fraTema: 'reaksjonslikninger',
      term: 'Tilstandssymboler',
      def: '(s) fast, (l) væske, (g) gass, (aq) løst i vann.',
    },
    { fraTema: 'reaksjonslikninger', term: 'Tilskuerion', def: 'Ion som er med på begge sider uten å reagere.' },
    {
      fraTema: 'reaksjonslikninger',
      term: 'Fellingsreaksjon',
      def: 'To løsninger blandes og danner et tungtløselig salt (bunnfall).',
    },
  ],
  eksempler: [
    {
      fraTema: 'atomet',
      tittel: 'Gjennomsnittlig atommasse for klor',
      oppgave: 'Klor består av 75,76 % Cl-35 (34,969 u) og 24,24 % Cl-37 (36,966 u). Regn ut gjennomsnittlig atommasse.',
      steg: [
        'Gjør prosentene om til desimaltall: 0,7576 og 0,2424.',
        '$\\bar{m} = 34,969\\enhet{u} \\cdot 0,7576 + 36,966\\enhet{u} \\cdot 0,2424$',
        '$\\bar{m} = 26,49\\enhet{u} + 8,961\\enhet{u} = 35,45\\enhet{u}$. Det er samme verdi som i periodesystemet.',
      ],
    },
  ],
  feller: [
    {
      fraTema: 'atomet',
      tekst: 'Et molekyl trenger ikke være en forbindelse: {{O2}} og {{N2}} er molekyler av grunnstoffer.',
    },
    {
      fraTema: 'atomet',
      tekst: 'Isotoper har samme kjemiske egenskaper. Det er bare massen (og eventuelt stabiliteten) som er forskjellig.',
    },
    {
      fraTema: 'elektroner',
      tekst: 'Innskuddsmetaller mister 4s-elektronene før 3d-elektronene, selv om 4s fylles først.',
    },
    {
      fraTema: 'elektroner',
      tekst: 'Linjespekteret oppstår når elektroner **faller ned** til lavere energinivå. Når de løftes opp, tas energi opp.',
    },
    {
      fraTema: 'periodesystemet',
      tekst: 'Hydrogen står i gruppe 1, men er et ikke-metall og regnes ikke som alkalimetall.',
    },
    {
      fraTema: 'periodesystemet',
      tekst: 'Ioniseringsenergi og elektronegativitet følger samme trend, men er ikke det samme: ioniseringsenergi gjelder et fritt atom, EN gjelder et atom i en binding.',
    },
    {
      fraTema: 'navnsetting',
      tekst: 'Sammensatte ioner må stå i parentes når det er mer enn ett: {{Ca(OH)2}}, ikke {{CaOH2}}.',
    },
    {
      fraTema: 'reaksjonslikninger',
      tekst: 'Endre aldri indeksene for å få det til å gå opp. Da lager du et annet stoff.',
    },
  ],
  flashcards: [
    { fraTema: 'atomet', f: 'Grunnstoff', b: 'Stoff som består av bare én type atomer (samme atomnummer).' },
    {
      fraTema: 'atomet',
      f: 'Molekyl',
      b: 'To eller flere atomer bundet sammen med kovalente bindinger, f.eks. {{O2}} og {{H2O}}.',
    },
    {
      fraTema: 'atomet',
      f: 'Kjemisk forbindelse',
      b: 'Stoff av minst to ulike grunnstoffer som er kjemisk bundet, f.eks. {{H2O}} og {{NaCl}}.',
    },
    { fraTema: 'atomet', f: 'Atommasseenheten u', b: '1/12 av massen til et C-12-atom.' },
    {
      fraTema: 'atomet',
      f: 'Gjennomsnittlig atommasse',
      b: 'Vektet gjennomsnitt av isotopmassene: $\\bar{m} = \\sum m_i \\cdot \\text{andel}_i$.',
    },
    {
      fraTema: 'elektroner',
      f: 'Emisjonsspekter',
      b: 'Fargede linjer fra elektroner som faller til lavere energinivå. Unikt for hvert grunnstoff.',
    },
    {
      fraTema: 'elektroner',
      f: 'Absorpsjonsspekter',
      b: 'Mørke linjer der atomene har tatt opp lys med bestemte bølgelengder.',
    },
    {
      fraTema: 'elektroner',
      f: 'Grunntilstand / eksitert tilstand',
      b: 'Grunntilstand: lavest mulig energi. Eksitert: et elektron er løftet til et høyere nivå.',
    },
    {
      fraTema: 'periodesystemet',
      f: 'Alkalimetaller',
      b: 'Gruppe 1 (ikke H). Ett valenselektron, danner {{M+}}, svært reaktive.',
    },
    { fraTema: 'periodesystemet', f: 'Jordalkalimetaller', b: 'Gruppe 2. To valenselektroner, danner {{M^2+}}.' },
    {
      fraTema: 'periodesystemet',
      f: 'Halogener',
      b: 'Gruppe 17. Sju valenselektroner, danner {{X-}}, svært reaktive ikke-metaller.',
    },
    {
      fraTema: 'periodesystemet',
      f: 'Halvmetaller',
      b: 'B, Si, Ge, As, Sb og Te. De står langs trappen mellom metaller og ikke-metaller.',
    },
    { fraTema: 'navnsetting', f: '{{NH4+}}', b: 'ammonium' },
    { fraTema: 'navnsetting', f: '{{OH-}}', b: 'hydroksid' },
    { fraTema: 'navnsetting', f: '{{NO3-}}', b: 'nitrat' },
    { fraTema: 'navnsetting', f: '{{NO2-}}', b: 'nitritt' },
    { fraTema: 'navnsetting', f: '{{SO4^2-}}', b: 'sulfat' },
    { fraTema: 'navnsetting', f: '{{SO3^2-}}', b: 'sulfitt' },
    { fraTema: 'navnsetting', f: '{{CO3^2-}}', b: 'karbonat' },
    { fraTema: 'navnsetting', f: '{{HCO3-}}', b: 'hydrogenkarbonat' },
    { fraTema: 'navnsetting', f: '{{PO4^3-}}', b: 'fosfat' },
    { fraTema: 'navnsetting', f: '{{MnO4-}}', b: 'permanganat' },
    { fraTema: 'navnsetting', f: '{{ClO3-}}', b: 'klorat' },
    { fraTema: 'navnsetting', f: '{{CN-}}', b: 'cyanid' },
    { fraTema: 'navnsetting', f: '{{CH3COO-}}', b: 'acetat' },
    { fraTema: 'navnsetting', f: 'Hydrat', b: 'Salt med krystallvann: {{CuSO4*5H2O}} = kobber(II)sulfatpentahydrat.' },
    {
      fraTema: 'reaksjonslikninger',
      f: 'Tilstandssymboler',
      b: '(s) fast stoff · (l) væske · (g) gass · (aq) løst i vann',
    },
    { fraTema: 'reaksjonslikninger', f: 'Fullstendig forbrenning av hydrokarbon', b: 'Gir {{CO2}} og {{H2O}}.' },
    {
      fraTema: 'reaksjonslikninger',
      f: 'Fellingsreaksjon',
      b: 'To saltløsninger danner et tungtløselig salt (bunnfall), f.eks. {{Ag+ + Cl- -> AgCl}}.',
    },
    {
      fraTema: 'reaksjonslikninger',
      f: 'Tilskuerioner',
      b: 'Ioner som er uendret på begge sider og tas ut av ionelikningen.',
    },
    {
      fraTema: 'reaksjonslikninger',
      f: 'Ionelikning',
      b: 'Viser bare ionene som reagerer. Må være balansert for både atomer og ladning.',
    },
  ],
};
