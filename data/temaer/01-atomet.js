/*
 * Tema 1: Atomet og isotoper
 * Se README.md for hvordan du legger til nye oppgaver.
 */
KJ.tema({
  id: 'atomet',
  nr: 1,
  tittel: 'Atomet og isotoper',
  beskrivelse: 'Protoner, nøytroner og elektroner, atomnummer, nukleontall, ioner og isotoper.',
  farge: '#E5484D',
  bolge: 656,
  linje: 'H-α 656 nm',
  kilde: 'notater',
  mal: [
    'Beskrive atomets oppbygning og bruke atommodeller',
    'Forklare hva isotoper er og regne gjennomsnittlig atommasse',
  ],

  teori: [
    {
      h: 'Atomets byggesteiner',
      tekst: `Et atom består av en liten, positivt ladd **atomkjerne** med **protoner** ($\\mathrm{p^+}$) og **nøytroner** ($\\mathrm{n^0}$), og **elektroner** ($\\mathrm{e^-}$) som beveger seg rundt kjernen. I skolekjemien kaller vi disse tre partiklene ofte elementærpartikler.

Nesten all massen sitter i kjernen, men det er elektronene som bestemmer hvordan atomet reagerer kjemisk.`,
      tabell: {
        hode: ['Partikkel', 'Ladning', 'Masse (u)', 'Plassering'],
        rader: [
          ['Proton', '+1', '≈ 1', 'Kjernen'],
          ['Nøytron', '0', '≈ 1', 'Kjernen'],
          ['Elektron', '−1', '≈ 0,00055 (1/1836)', 'Rundt kjernen'],
        ],
      },
    },
    {
      h: 'Atomnummer og nukleontall',
      tekst: `**Atomnummeret** $Z$ er antall protoner. Det bestemmer hvilket grunnstoff atomet er: alle atomer med 6 protoner er karbon.

**Nukleontallet** (massetallet) $A$ er summen av protoner og nøytroner. Antall nøytroner finner du da med $N = A - Z$.

Vi skriver atomet slik: {{^{12}_{6}C}}. Tallet oppe er nukleontallet, tallet nede er atomnummeret.

Et nøytralt atom har like mange elektroner som protoner.`,
    },
    {
      h: 'Ioner',
      tekst: `Et **ion** er et atom eller en atomgruppe med elektrisk ladning. Antall protoner endres aldri når et ion dannes, bare antall elektroner.

- Et **kation** er positivt: atomet har avgitt elektroner. {{Na}} → {{Na+}} + {{e-}}
- Et **anion** er negativt: atomet har tatt opp elektroner. {{Cl}} + {{e-}} → {{Cl-}}

Antall elektroner = antall protoner − ladningen. {{Mg^2+}} har 12 − 2 = 10 elektroner.`,
      figur: { type: 'skall', atomer: [['Na', 0], ['Na', 1], ['Cl', 0], ['Cl', -1]] },
    },
    {
      h: 'Grunnstoff, molekyl og kjemisk forbindelse',
      tekst: `Et **grunnstoff** består av bare én type atomer, altså atomer med samme atomnummer (f.eks. {{Fe}}, {{O2}}, {{He}}).

Et **molekyl** er to eller flere atomer som holdes sammen av kovalente bindinger. Atomene kan være like ({{O2}}, {{N2}}) eller ulike ({{H2O}}, {{CO2}}).

En **kjemisk forbindelse** består av minst to *ulike* grunnstoffer. {{H2O}} er både et molekyl og en forbindelse. {{O2}} er et molekyl, men ikke en forbindelse. {{NaCl}} er en forbindelse, men ikke et molekyl. Det er en ioneforbindelse bygd opp av ioner i et gitter.`,
    },
    {
      h: 'Isotoper og gjennomsnittlig atommasse',
      tekst: `**Isotoper** er atomer av samme grunnstoff (samme antall protoner) med ulikt antall nøytroner, og derfor ulikt nukleontall. Eksempel: {{^{12}_{6}C}}, {{^{13}_{6}C}} og {{^{14}_{6}C}}.

Isotoper har samme kjemiske egenskaper, fordi de har like mange elektroner og samme elektronkonfigurasjon. De har ulik masse, og noen er radioaktive (f.eks. C-14).

Atommassen i periodesystemet er et **vektet gjennomsnitt** av isotopene slik de finnes i naturen:

$$\\bar{m} = m_1 \\cdot \\text{andel}_1 + m_2 \\cdot \\text{andel}_2 + \\dots$$

Det er derfor atommassen sjelden er et helt tall. Klor er 35,45 u fordi det finnes omtrent 76 % Cl-35 og 24 % Cl-37.`,
      merk: 'Atommasse måles i atommasseenheten u. 1 u er definert som 1/12 av massen til et C-12-atom.',
    },
  ],

  begreper: [
    { term: 'Proton', def: 'Positivt ladd partikkel (+1) i atomkjernen. Masse ≈ 1 u.' },
    { term: 'Nøytron', def: 'Nøytral partikkel i atomkjernen. Masse ≈ 1 u.' },
    { term: 'Elektron', def: 'Negativt ladd partikkel (−1) rundt kjernen. Masse ≈ 1/1836 u.' },
    { term: 'Atomnummer (Z)', def: 'Antall protoner i kjernen. Bestemmer grunnstoffet.' },
    { term: 'Nukleontall (A)', def: 'Antall protoner + nøytroner i kjernen.' },
    { term: 'Isotoper', def: 'Atomer av samme grunnstoff med ulikt antall nøytroner.' },
    { term: 'Ion', def: 'Atom eller atomgruppe med elektrisk ladning (har avgitt eller tatt opp elektroner).' },
    { term: 'Kation / anion', def: 'Kation: positivt ion. Anion: negativt ion.' },
    { term: 'Gjennomsnittlig atommasse', def: 'Vektet gjennomsnitt av massene til isotopene, ut fra hvor vanlige de er i naturen.' },
    { term: 'Kjemisk forbindelse', def: 'Stoff som består av minst to ulike grunnstoffer som er kjemisk bundet.' },
  ],

  eksempler: [
    {
      tittel: 'Partikler i et ion',
      oppgave: 'Hvor mange protoner, nøytroner og elektroner har {{^{56}_{26}Fe^3+}}?',
      steg: [
        'Protoner = atomnummeret: $Z = 26$.',
        'Nøytroner: $N = A - Z = 56 - 26 = 30$.',
        'Ladningen er +3, så jern har avgitt 3 elektroner: $26 - 3 = 23$ elektroner.',
      ],
    },
    {
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
    'Nukleontallet (et helt tall for ett atom) er ikke det samme som atommassen i periodesystemet (et gjennomsnitt).',
    'Når et ion dannes, endres antall **elektroner**, aldri antall protoner.',
    'Et molekyl trenger ikke være en forbindelse: {{O2}} og {{N2}} er molekyler av grunnstoffer.',
    'Isotoper har samme kjemiske egenskaper. Det er bare massen (og eventuelt stabiliteten) som er forskjellig.',
  ],

  oppgaver: [
    /* ---------- Grunnleggende ---------- */
    {
      id: 'at-01', niva: 1, type: 'flervalg',
      sporsmal: 'Hvilke partikler finnes i atomkjernen?',
      alternativer: ['Protoner og elektroner', 'Protoner og nøytroner', 'Nøytroner og elektroner', 'Bare protoner'],
      svar: 1,
      hint: 'Kjernen er positivt ladd og inneholder nesten all massen.',
      forklaring: 'Kjernen består av protoner (positive) og nøytroner (nøytrale). Elektronene beveger seg rundt kjernen.',
    },
    {
      id: 'at-02', niva: 1, type: 'flervalg',
      sporsmal: 'Hva bestemmer hvilket grunnstoff et atom er?',
      alternativer: ['Antall nøytroner', 'Antall protoner', 'Antall elektroner', 'Nukleontallet'],
      svar: 1,
      hint: 'Tenk på hva atomnummeret står for.',
      forklaring: 'Atomnummeret $Z$ = antall protoner. Alle atomer med 11 protoner er natrium, uansett antall nøytroner eller elektroner.',
    },
    {
      id: 'at-03', niva: 1, type: 'fyllinn',
      sporsmal: 'Fyll inn antall partikler i atomet {{^{23}_{11}Na}}.',
      tekst: 'Protoner: ___\nNøytroner: ___\nElektroner: ___',
      svar: [['11'], ['12'], ['11']],
      hint: ['Tallet nede er atomnummeret, tallet oppe er nukleontallet.', 'Nøytroner = nukleontall − atomnummer.'],
      steg: ['Protoner = $Z = 11$', 'Nøytroner = $A - Z = 23 - 11 = 12$', 'Atomet er nøytralt, så elektroner = protoner = 11'],
    },
    {
      id: 'at-04', niva: 1, type: 'kobling',
      sporsmal: 'Koble hvert begrep med riktig forklaring.',
      par: [
        ['Atomnummer', 'antall protoner i kjernen'],
        ['Nukleontall', 'antall protoner + nøytroner'],
        ['Isotoper', 'samme grunnstoff, ulikt antall nøytroner'],
        ['Kation', 'positivt ladd ion'],
        ['Anion', 'negativt ladd ion'],
      ],
      hint: 'Kationer er positive og trekkes derfor mot katoden, den negative polen.',
    },
    {
      id: 'at-05', niva: 1, type: 'flervalg',
      sporsmal: 'Hva er isotoper?',
      alternativer: [
        'Atomer av samme grunnstoff med ulikt antall nøytroner',
        'Atomer av ulike grunnstoffer med samme nukleontall',
        'Atomer av samme grunnstoff med ulikt antall protoner',
        'Ioner med samme ladning',
      ],
      svar: 0,
      hint: 'Iso = lik, topos = sted. Isotoper står på samme plass i periodesystemet.',
      forklaring: 'Isotoper har samme antall protoner (samme grunnstoff), men ulikt antall nøytroner og dermed ulikt nukleontall.',
    },
    {
      id: 'at-06', niva: 1, type: 'tall',
      sporsmal: 'Hvor mange nøytroner har {{^{238}_{92}U}}?',
      svar: 146, heltall: true, enhet: null,
      hint: 'Bruk $N = A - Z$.',
      steg: ['$A = 238$ og $Z = 92$', '$N = A - Z = 238 - 92 = 146$'],
    },
    {
      id: 'at-07', niva: 1, type: 'flervalg',
      sporsmal: 'Et ion har 12 protoner og 10 elektroner. Hvilken ladning har det?',
      alternativer: ['−2', '+2', '+10', '0'],
      svar: 1,
      hint: 'Ladning = antall protoner − antall elektroner.',
      forklaring: '$12 - 10 = +2$. Det er {{Mg^2+}}.',
    },
    {
      id: 'at-08', niva: 1, type: 'sortering',
      sporsmal: 'Sorter stoffene: er de grunnstoffer eller kjemiske forbindelser?',
      kategorier: ['Grunnstoff', 'Kjemisk forbindelse'],
      elementer: [['{{O2}}', 0], ['{{H2O}}', 1], ['{{NaCl}}', 1], ['{{Fe}}', 0], ['{{CO2}}', 1], ['{{N2}}', 0], ['{{He}}', 0], ['{{C6H12O6}}', 1]],
      hint: 'En forbindelse må inneholde minst to ulike grunnstoffer.',
      forklaring: '{{O2}} og {{N2}} er molekyler, men består av bare ett grunnstoff. Derfor er de ikke forbindelser.',
    },
    {
      id: 'at-09', niva: 1, type: 'flervalg',
      sporsmal: 'Hvilken partikkel har minst masse?',
      alternativer: ['Proton', 'Nøytron', 'Elektron', 'Atomkjerne'],
      svar: 2,
      hint: 'Én av partiklene er nesten 2000 ganger lettere enn de andre.',
      forklaring: 'Et elektron har masse omtrent 1/1836 av et proton.',
    },
    /* ---------- Middels ---------- */
    {
      id: 'at-10', niva: 2, type: 'fyllinn',
      sporsmal: 'Fyll inn antall partikler i ionet {{^{37}_{17}Cl-}}.',
      tekst: 'Protoner: ___\nNøytroner: ___\nElektroner: ___',
      svar: [['17'], ['20'], ['18']],
      hint: 'Et anion med ladning −1 har tatt opp ett ekstra elektron.',
      steg: ['Protoner = $Z = 17$', 'Nøytroner = $37 - 17 = 20$', 'Ladning −1: elektroner = $17 + 1 = 18$'],
    },
    {
      id: 'at-11', niva: 2, type: 'fyllinn',
      sporsmal: 'Fyll inn antall partikler i ionet {{^{56}_{26}Fe^3+}}.',
      tekst: 'Protoner: ___\nNøytroner: ___\nElektroner: ___',
      svar: [['26'], ['30'], ['23']],
      hint: 'Ladning +3 betyr at atomet har avgitt 3 elektroner.',
      steg: ['Protoner = 26', 'Nøytroner = $56 - 26 = 30$', 'Elektroner = $26 - 3 = 23$'],
    },
    {
      id: 'at-12', niva: 2, type: 'flervalg',
      sporsmal: 'Hvilke par er isotoper av samme grunnstoff?',
      alternativer: ['{{^{12}_{6}C}} og {{^{14}_{6}C}}', '{{^{14}_{6}C}} og {{^{14}_{7}N}}', '{{^{16}_{8}O}} og {{^{18}_{8}O}}', '{{^{40}_{18}Ar}} og {{^{40}_{20}Ca}}'],
      svar: [0, 2],
      hint: 'Isotoper har samme tall nede (atomnummer), men ulikt tall oppe.',
      forklaring: 'C-14 og N-14 har samme nukleontall, men ulikt atomnummer, så de er ulike grunnstoffer. Det samme gjelder Ar-40 og Ca-40.',
    },
    {
      id: 'at-13', niva: 2, type: 'tall',
      sporsmal: 'Bor har to naturlige isotoper: B-10 (10,013 u, 19,9 %) og B-11 (11,009 u, 80,1 %). Regn ut gjennomsnittlig atommasse for bor.',
      svar: 10.81, enhet: 'u', gs: 4, toleranse: 0.003,
      verify: () => 10.013 * 0.199 + 11.009 * 0.801,
      hint: ['Gang massen til hver isotop med andelen (som desimaltall) og legg sammen.', '19,9 % = 0,199'],
      steg: [
        '$\\bar{m} = 10,013\\enhet{u} \\cdot 0,199 + 11,009\\enhet{u} \\cdot 0,801$',
        '$\\bar{m} = 1,993\\enhet{u} + 8,818\\enhet{u} = 10,81\\enhet{u}$',
        'Svaret stemmer med atommassen til bor i periodesystemet. Det ligger nærmest 11 fordi B-11 er vanligst.',
      ],
    },
    {
      id: 'at-14', niva: 2, type: 'forklaring',
      sporsmal: 'Atommassen til klor i periodesystemet er 35,45 u. Forklar hvorfor den ikke er et helt tall.',
      modellsvar: `Klor finnes i naturen som en blanding av isotopene Cl-35 og Cl-37. Isotopene har samme antall protoner, men ulikt antall nøytroner, og dermed ulik masse. Atommassen i periodesystemet er et vektet gjennomsnitt av massene, der hver isotop teller etter hvor vanlig den er (ca. 76 % Cl-35 og 24 % Cl-37). Derfor blir gjennomsnittet 35,45 u og ikke et helt tall.`,
      punkter: ['Klor består av flere isotoper (Cl-35 og Cl-37)', 'Isotopene har ulikt antall nøytroner og ulik masse', 'Atommassen er et vektet gjennomsnitt etter hvor vanlig hver isotop er'],
      hint: 'Tenk på isotoper og hva «vektet gjennomsnitt» betyr.',
    },
    {
      id: 'at-15', niva: 2, type: 'rekkefolge',
      sporsmal: 'Ranger atomene etter antall nøytroner, fra færrest til flest.',
      fra: 'Færrest nøytroner', til: 'Flest nøytroner',
      elementer: ['{{^{1}_{1}H}}', '{{^{4}_{2}He}}', '{{^{12}_{6}C}}', '{{^{19}_{9}F}}', '{{^{23}_{11}Na}}'],
      hint: 'Regn ut $N = A - Z$ for hvert atom.',
      forklaring: 'H-1: 0, He-4: 2, C-12: 6, F-19: 10, Na-23: 12 nøytroner.',
    },
    {
      id: 'at-16', niva: 2, type: 'flervalg',
      sporsmal: 'En partikkel har 17 protoner, 18 nøytroner og 18 elektroner. Hva er det?',
      alternativer: ['Et argonatom', 'Et kloridion, {{Cl-}}', 'Et kloratom', 'Et kaliumion, {{K+}}'],
      svar: 1,
      hint: 'Antall protoner bestemmer grunnstoffet. Sammenlign så protoner og elektroner.',
      forklaring: '17 protoner = klor. Ett elektron mer enn protoner gir ladning −1: {{^{35}_{17}Cl-}}.',
    },
    {
      id: 'at-17', niva: 2, type: 'fyllinn',
      sporsmal: 'Et ion har 16 protoner, 16 nøytroner og 18 elektroner. Skriv symbolet for grunnstoffet og ladningen til ionet.',
      tekst: 'Grunnstoff (symbol): ___\nLadning: ___',
      svar: [['S'], ['2-', '-2', '2−', '−2']],
      hint: 'Finn grunnstoffet med atomnummer 16 i periodesystemet.',
      forklaring: 'Atomnummer 16 er svovel. 16 − 18 = −2, så ionet er sulfid, {{S^2-}}.',
    },
    {
      id: 'at-18', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange elektroner har ammoniumionet {{NH4+}}?',
      svar: 10, heltall: true, enhet: null,
      hint: ['Tell først protoner i alle atomene: N har 7, H har 1.', 'Ladning +1 betyr ett elektron mindre enn protoner.'],
      steg: ['Protoner: $7 + 4 \\cdot 1 = 11$', 'Ladning +1: elektroner = $11 - 1 = 10$'],
    },
    {
      id: 'at-19', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange elektroner har fosfationet {{PO4^3-}}?',
      svar: 50, heltall: true, enhet: null,
      hint: 'P har 15 protoner og O har 8. Ladning −3 betyr 3 elektroner ekstra.',
      steg: ['Protoner: $15 + 4 \\cdot 8 = 47$', 'Ladning −3: elektroner = $47 + 3 = 50$'],
    },
    /* ---------- Høy måloppnåelse ---------- */
    {
      id: 'at-20', niva: 3, type: 'tall',
      sporsmal: 'Kobber har isotopene Cu-63 (62,930 u) og Cu-65 (64,928 u). Gjennomsnittlig atommasse er 63,55 u. Regn ut hvor mange prosent av kobberatomene som er Cu-63.',
      svar: 68.97, enhet: '%', gs: 3, toleranse: 0.006,
      verify: () => ((64.928 - 63.55) / (64.928 - 62.93)) * 100,
      hint: ['Kall andelen Cu-63 for $x$. Da er andelen Cu-65 lik $1 - x$.', 'Sett opp $62,930x + 64,928(1 - x) = 63,55$ og løs for $x$.'],
      steg: [
        'La $x$ være andelen Cu-63. Andelen Cu-65 er da $1 - x$.',
        '$62,930x + 64,928(1 - x) = 63,55$',
        '$64,928 - 1,998x = 63,55$',
        '$x = \\dfrac{64,928 - 63,55}{1,998} = \\dfrac{1,378}{1,998} = 0,690$',
        'Omtrent **69,0 %** av kobberatomene er Cu-63 (og 31,0 % er Cu-65).',
      ],
    },
    {
      id: 'at-21', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar hvorfor isotoper av samme grunnstoff har de samme kjemiske egenskapene.',
      modellsvar: `Isotoper av samme grunnstoff har like mange protoner, og et nøytralt atom har like mange elektroner som protoner. Isotopene har derfor samme elektronkonfigurasjon og like mange valenselektroner. Det er elektronene, særlig valenselektronene, som bestemmer hvordan et atom danner bindinger og reagerer. Nøytronene påvirker bare massen (og eventuelt om kjernen er stabil eller radioaktiv), ikke de kjemiske egenskapene.`,
      punkter: ['Samme antall protoner gir samme antall elektroner', 'Samme elektronkonfigurasjon / like mange valenselektroner', 'Kjemiske egenskaper bestemmes av elektronene', 'Nøytronene påvirker bare massen (og stabiliteten)'],
      hint: 'Hva bestemmer kjemiske egenskaper: kjernen eller elektronene?',
    },
    {
      id: 'at-22', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar forskjellen på et molekyl og en kjemisk forbindelse. Gi ett eksempel på et stoff som er et molekyl, men ikke en forbindelse, og ett som er en forbindelse, men ikke et molekyl.',
      modellsvar: `Et molekyl er to eller flere atomer som holdes sammen av kovalente bindinger. En kjemisk forbindelse er et stoff som består av minst to ulike grunnstoffer som er kjemisk bundet. {{O2}} (eller {{N2}}) er et molekyl, men ikke en forbindelse, fordi det bare inneholder ett grunnstoff. {{NaCl}} er en forbindelse, men ikke et molekyl: det er en ioneforbindelse der ionene sitter i et ionegitter, og den minste enheten kalles en formelenhet.`,
      punkter: ['Molekyl: atomer bundet sammen med kovalente bindinger', 'Forbindelse: minst to ulike grunnstoffer', 'Eksempel på molekyl som ikke er forbindelse (O₂, N₂, H₂ …)', 'Eksempel på forbindelse som ikke er molekyl (NaCl/ioneforbindelse, formelenhet)'],
      hint: 'Tenk på {{O2}} og {{NaCl}}.',
    },
    {
      id: 'at-23', niva: 3, type: 'tall',
      sporsmal: 'Et ion {{X^2+}} har 28 elektroner og 34 nøytroner. Finn nukleontallet til ionet.',
      svar: 64, heltall: true, enhet: null,
      hint: ['Finn først antall protoner: ionet har mistet 2 elektroner.', 'Nukleontall = protoner + nøytroner.'],
      steg: ['Ladning +2 betyr 2 elektroner færre enn protoner: protoner = $28 + 2 = 30$ (sink, Zn).', 'Nukleontall: $A = 30 + 34 = 64$', 'Ionet er {{^{64}_{30}Zn^2+}}.'],
    },
    {
      id: 'at-24', niva: 3, type: 'flervalg',
      sporsmal: 'Massen til et atom er nesten lik summen av massene til protonene og nøytronene. Hvorfor?',
      alternativer: [
        'Elektronene har svært liten masse sammenlignet med protoner og nøytroner',
        'Elektronene befinner seg i kjernen',
        'Elektronene har negativ masse som opphever noe av massen',
        'Atomet har like mange elektroner som nøytroner',
      ],
      svar: 0,
      hint: 'Sammenlign massen til et elektron med massen til et proton.',
      forklaring: 'Et elektron veier ca. 1/1836 av et proton, så elektronene bidrar nesten ikke til massen.',
    },
    {
      id: 'at-25', niva: 3, type: 'tall',
      sporsmal: 'Litium har isotopene Li-6 (6,015 u) og Li-7 (7,016 u). Gjennomsnittlig atommasse er 6,94 u. Hvor mange prosent av litiumatomene er Li-7?',
      svar: 92.41, enhet: '%', gs: 3, toleranse: 0.006,
      verify: () => ((6.94 - 6.015) / (7.016 - 6.015)) * 100,
      hint: 'La $x$ være andelen Li-7 og sett opp $6,015(1 - x) + 7,016x = 6,94$.',
      steg: [
        'La $x$ = andelen Li-7. Da er andelen Li-6 lik $1 - x$.',
        '$6,015(1 - x) + 7,016x = 6,94$',
        '$6,015 + 1,001x = 6,94 \\Rightarrow x = \\dfrac{0,925}{1,001} = 0,924$',
        'Omtrent **92,4 %** er Li-7.',
      ],
    },
  ],

  flashcards: [
    { f: 'Proton', b: 'Positiv partikkel (+1) i kjernen, masse ≈ 1 u.' },
    { f: 'Nøytron', b: 'Nøytral partikkel i kjernen, masse ≈ 1 u.' },
    { f: 'Elektron', b: 'Negativ partikkel (−1) rundt kjernen, masse ≈ 1/1836 u.' },
    { f: 'Atomnummer $Z$', b: 'Antall protoner. Bestemmer hvilket grunnstoff atomet er.' },
    { f: 'Nukleontall $A$', b: 'Antall protoner + nøytroner. Nøytroner: $N = A - Z$.' },
    { f: 'Isotoper', b: 'Atomer av samme grunnstoff med ulikt antall nøytroner. Samme kjemiske egenskaper, ulik masse.' },
    { f: 'Grunnstoff', b: 'Stoff som består av bare én type atomer (samme atomnummer).' },
    { f: 'Molekyl', b: 'To eller flere atomer bundet sammen med kovalente bindinger, f.eks. {{O2}} og {{H2O}}.' },
    { f: 'Kjemisk forbindelse', b: 'Stoff av minst to ulike grunnstoffer som er kjemisk bundet, f.eks. {{H2O}} og {{NaCl}}.' },
    { f: 'Ion', b: 'Atom eller atomgruppe med elektrisk ladning. Antall elektroner = protoner − ladning.' },
    { f: 'Kation', b: 'Positivt ion som har avgitt elektroner, f.eks. {{Na+}}.' },
    { f: 'Anion', b: 'Negativt ion som har tatt opp elektroner, f.eks. {{Cl-}}.' },
    { f: 'Atommasseenheten u', b: '1/12 av massen til et C-12-atom.' },
    { f: 'Gjennomsnittlig atommasse', b: 'Vektet gjennomsnitt av isotopmassene: $\\bar{m} = \\sum m_i \\cdot \\text{andel}_i$.' },
  ],
});
