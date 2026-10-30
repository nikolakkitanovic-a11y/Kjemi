/*
 * Tema 3: Periodesystemet og periodiske egenskaper
 */
KJ.tema({
  id: 'periodesystemet',
  nr: 3,
  tittel: 'Periodesystemet og trender',
  beskrivelse: 'Grupper og perioder, valenselektroner, atomradius, ioneradius, ioniseringsenergi og elektronegativitet.',
  farge: '#E8A400',
  bolge: 589,
  linje: 'Na 589 nm',
  kilde: 'notater',
  mal: [
    'Forklare oppbygningen av periodesystemet ut fra elektronkonfigurasjon',
    'Forklare og forutsi trender i atomradius, ioniseringsenergi og elektronegativitet',
  ],

  teori: [
    {
      h: 'Oppbygningen av periodesystemet',
      tekst: `Grunnstoffene står ordnet etter økende atomnummer.

- **Perioder** (vannrette rader, 1–7): periodenummeret er antall elektronskall.
- **Grupper** (loddrette kolonner, 1–18): grunnstoffene i samme hovedgruppe har like mange valenselektroner og derfor like kjemiske egenskaper.

Valenselektroner i hovedgruppene: gruppe 1 → 1, gruppe 2 → 2, gruppe 13 → 3, gruppe 14 → 4, gruppe 15 → 5, gruppe 16 → 6, gruppe 17 → 7, gruppe 18 → 8 (helium har 2).`,
      tabell: {
        hode: ['Gruppe', 'Navn', 'Typisk ion', 'Kjennetegn'],
        rader: [
          ['1', 'Alkalimetaller (ikke H)', '{{M+}}', 'Svært reaktive, myke metaller'],
          ['2', 'Jordalkalimetaller', '{{M^2+}}', 'Reaktive metaller'],
          ['3–12', 'Innskuddsmetaller', 'varierer', 'Ofte flere mulige ladninger'],
          ['17', 'Halogener', '{{X-}}', 'Svært reaktive ikke-metaller'],
          ['18', 'Edelgasser', '–', 'Fullt ytterste skall, svært lite reaktive'],
        ],
      },
    },
    {
      h: 'Metaller, ikke-metaller og halvmetaller',
      tekst: `Metallene står til venstre og i midten. Ikke-metallene står øverst til høyre (pluss hydrogen). Langs «trappen» fra B til At finner vi halvmetallene (B, Si, Ge, As, Sb, Te), som har egenskaper mellom metaller og ikke-metaller.

Periodesystemet er også delt i **blokker** etter hvilket underskall som fylles sist: s-blokken (gruppe 1–2), p-blokken (gruppe 13–18), d-blokken (innskuddsmetallene) og f-blokken (lantanoider og aktinoider).`,
    },
    {
      h: 'Atomradius',
      tekst: `**Nedover i en gruppe øker atomradius**, fordi atomet får flere elektronskall.

**Bortover i en periode minker atomradius.** Antall skall er det samme, men antall protoner øker. Den økte kjerneladningen trekker elektronene nærmere kjernen.

De største atomene finner vi derfor nede til venstre (Cs, Fr), og de minste oppe til høyre (He, F).`,
      figur: { type: 'skall', atomer: [['Li', 0], ['F', 0], ['K', 0]] },
    },
    {
      h: 'Ioneradius',
      tekst: `**Kationer er mindre enn atomet de kommer fra.** {{Na+}} har mistet hele det ytterste skallet sitt, og de gjenværende elektronene trekkes sterkere inn.

**Anioner er større enn atomet.** {{Cl-}} har like mange protoner som Cl, men ett elektron mer. Elektronene frastøter hverandre mer, og hvert elektron trekkes svakere, så elektronskyen blir større.

For **isoelektroniske** ioner (samme antall elektroner) gjelder: flere protoner gir mindre ion.
{{O^2-}} > {{F-}} > {{Na+}} > {{Mg^2+}} > {{Al^3+}} (alle har 10 elektroner).`,
    },
    {
      h: 'Ioniseringsenergi',
      tekst: `**Ioniseringsenergi** er energien som trengs for å fjerne det ytterste elektronet fra et atom i gassfase: {{Na(g) -> Na+(g) + e-}}

- Øker bortover i en periode (sterkere tiltrekning fra kjernen, mindre atom).
- Minker nedover i en gruppe (elektronet er lenger fra kjernen og skjermes av indre skall).
- Edelgassene har høyest ioniseringsenergi i sin periode, alkalimetallene lavest.

Andre ioniseringsenergi er alltid høyere enn den første. Et stort hopp viser at vi begynner å fjerne elektroner fra et fullt, indre skall. Magnesium har 738, 1451 og 7733 kJ/mol. Hoppet etter det andre elektronet viser at Mg har 2 valenselektroner.`,
    },
    {
      h: 'Elektronegativitet',
      tekst: `**Elektronegativitet (EN)** er et atoms evne til å trekke til seg elektronene i en kjemisk binding. Vi bruker Paulings skala, der fluor har høyest verdi (4,0).

- EN **øker bortover** i en periode og **oppover** i en gruppe.
- Mest elektronegative: F (4,0), O (3,5), N og Cl (3,0).
- Minst elektronegative (mest **elektropositive**): Cs og Fr (0,7) nede til venstre.

Edelgassene har som regel ingen EN-verdi, fordi de nesten ikke danner bindinger.

Trendene henger sammen: Små atomer med mange protoner holder hardt på elektronene (høy ioniseringsenergi og høy EN). Store atomer med få valenselektroner gir lett fra seg elektroner (metallisk karakter).`,
      merk: 'Reaktivitet: Alkalimetallene blir mer reaktive nedover (lettere å avgi elektronet). Halogenene blir mer reaktive oppover (lettere å ta opp et elektron). Fluor er det mest reaktive ikke-metallet.',
    },
  ],

  begreper: [
    { term: 'Periode', def: 'Vannrett rad. Periodenummer = antall elektronskall.' },
    { term: 'Gruppe', def: 'Loddrett kolonne. Hovedgruppene har like mange valenselektroner.' },
    { term: 'Atomradius', def: 'Øker nedover i en gruppe og minker bortover en periode.' },
    { term: 'Ioniseringsenergi', def: 'Energien som trengs for å fjerne det ytterste elektronet fra et atom i gassfase.' },
    { term: 'Elektronegativitet', def: 'Et atoms evne til å trekke til seg elektronene i en binding. Høyest for F (4,0).' },
    { term: 'Elektropositiv', def: 'Avgir lett elektroner; lav EN. Gjelder metallene nede til venstre.' },
    { term: 'Skjerming', def: 'Indre elektroner skjermer valenselektronene for noe av kjerneladningen.' },
    { term: 'Halvmetall', def: 'Grunnstoff med egenskaper mellom metall og ikke-metall, f.eks. Si og Ge.' },
  ],

  eksempler: [
    {
      tittel: 'Hvilket atom er størst?',
      oppgave: 'Ranger Na, Mg, K og Cl etter økende atomradius.',
      steg: [
        'Na, Mg og Cl står i periode 3. Bortover minker radius: Cl < Mg < Na.',
        'K står under Na i gruppe 1 og har ett skall mer: K > Na.',
        'Rekkefølge: Cl < Mg < Na < K.',
      ],
    },
    {
      tittel: 'Lese ioniseringsenergier',
      oppgave: 'Et grunnstoff i periode 3 har ioniseringsenergiene 578, 1817, 2745 og 11 577 kJ/mol. Hvilket grunnstoff er det?',
      steg: [
        'Se etter det store hoppet: fra 2745 til 11 577 kJ/mol, altså etter det tredje elektronet.',
        'Grunnstoffet har 3 valenselektroner og står i gruppe 13.',
        'Gruppe 13, periode 3 = aluminium (Al).',
      ],
    },
  ],

  feller: [
    'Atomradius **minker** bortover en periode selv om antall elektroner øker. Det er kjerneladningen som avgjør.',
    'Hydrogen står i gruppe 1, men er et ikke-metall og regnes ikke som alkalimetall.',
    'Ioniseringsenergi og elektronegativitet følger samme trend, men er ikke det samme: ioniseringsenergi gjelder et fritt atom, EN gjelder et atom i en binding.',
  ],

  oppgaver: [
    /* ---------- Grunnleggende ---------- */
    {
      id: 'ps-01', niva: 1, type: 'flervalg',
      sporsmal: 'Hva har grunnstoffene i samme hovedgruppe felles?',
      alternativer: ['Like mange valenselektroner', 'Like mange elektronskall', 'Samme atommasse', 'Like mange nøytroner'],
      svar: 0,
      hint: 'Det er dette som gir dem like kjemiske egenskaper.',
    },
    {
      id: 'ps-02', niva: 1, type: 'flervalg',
      sporsmal: 'Hva forteller periodenummeret til et grunnstoff?',
      alternativer: ['Antall elektronskall', 'Antall valenselektroner', 'Antall protoner', 'Ladningen til ionet'],
      svar: 0,
      hint: 'Natrium står i periode 3. Hvor mange skall har natrium?',
    },
    {
      id: 'ps-03', niva: 1, type: 'kobling',
      sporsmal: 'Koble gruppen med riktig navn.',
      par: [
        ['Gruppe 1', 'alkalimetaller'],
        ['Gruppe 2', 'jordalkalimetaller'],
        ['Gruppe 3–12', 'innskuddsmetaller'],
        ['Gruppe 17', 'halogener'],
        ['Gruppe 18', 'edelgasser'],
      ],
    },
    {
      id: 'ps-04', niva: 1, type: 'sortering',
      sporsmal: 'Sorter grunnstoffene som metall, ikke-metall eller halvmetall.',
      kategorier: ['Metall', 'Ikke-metall', 'Halvmetall'],
      elementer: [['Na', 0], ['Fe', 0], ['Cu', 0], ['Ca', 0], ['S', 1], ['Cl', 1], ['O', 1], ['Si', 2], ['B', 2], ['Ge', 2]],
      hint: 'Halvmetallene ligger langs «trappen» mellom metallene og ikke-metallene.',
    },
    {
      id: 'ps-05', niva: 1, type: 'flervalg',
      sporsmal: 'Hvilket grunnstoff har høyest elektronegativitet?',
      alternativer: ['O', 'Cl', 'F', 'N'],
      svar: 2,
      hint: 'EN øker oppover og mot høyre (utenom edelgassene).',
      forklaring: 'Fluor har EN = 4,0, den høyeste av alle grunnstoffer.',
    },
    {
      id: 'ps-06', niva: 1, type: 'fyllinn',
      sporsmal: 'Fyll inn antall valenselektroner.',
      tekst: 'Mg har ___ valenselektroner, P har ___ og Ar har ___.',
      svar: [['2'], ['5'], ['8']],
      hint: 'Se på gruppenummeret. For gruppe 13–18 trekker du fra 10.',
    },
    {
      id: 'ps-07', niva: 1, type: 'flervalg',
      sporsmal: 'Hvilket atom er størst?',
      alternativer: ['Na', 'K', 'Mg', 'Cl'],
      svar: 1,
      hint: 'Radius øker nedover i en gruppe.',
      forklaring: 'K står i periode 4 og har fire skall, ett mer enn de andre.',
    },
    {
      id: 'ps-08', niva: 1, type: 'flervalg',
      sporsmal: 'Hvordan endres atomradius bortover en periode (fra venstre mot høyre)?',
      alternativer: ['Den minker', 'Den øker', 'Den er uendret', 'Den øker først og minker så'],
      svar: 0, stokk: false,
      hint: 'Antall protoner øker, men antall skall er det samme.',
    },
    {
      id: 'ps-09', niva: 1, type: 'flervalg',
      sporsmal: 'Hvilken gruppe reagerer nesten ikke med andre stoffer fordi grunnstoffene har fullt ytterste skall?',
      alternativer: ['Edelgassene', 'Halogenene', 'Alkalimetallene', 'Innskuddsmetallene'],
      svar: 0,
    },
    /* ---------- Middels ---------- */
    {
      id: 'ps-10', niva: 2, type: 'rekkefolge',
      sporsmal: 'Ranger atomene etter økende atomradius.',
      fra: 'Minst', til: 'Størst',
      elementer: ['F', 'O', 'N', 'C', 'Li'],
      hint: 'Alle står i periode 2. Radius minker mot høyre.',
    },
    {
      id: 'ps-11', niva: 2, type: 'rekkefolge',
      sporsmal: 'Ranger grunnstoffene etter økende elektronegativitet.',
      fra: 'Lavest EN', til: 'Høyest EN',
      elementer: ['Cs', 'K', 'Mg', 'C', 'O'],
      hint: 'EN øker oppover og mot høyre. Bruk gjerne periodesystemet under Verktøy.',
      forklaring: 'Cs 0,7 < K 0,8 < Mg 1,2 < C 2,5 < O 3,5.',
    },
    {
      id: 'ps-12', niva: 2, type: 'flervalg',
      sporsmal: 'Hvorfor er {{Na+}} mindre enn et natriumatom?',
      alternativer: [
        'Det har mistet hele det ytterste skallet sitt',
        'Det har fått flere protoner',
        'Det har tatt opp et elektron',
        'Nøytronene trekker elektronene innover',
      ],
      svar: 0,
      hint: 'Na: 2, 8, 1. Hva skjer når ett elektron fjernes?',
      forklaring: 'Na har skallfordelingen 2, 8, 1. {{Na+}} har 2, 8: ett skall mindre, og de gjenværende elektronene trekkes sterkere inn.',
    },
    {
      id: 'ps-13', niva: 2, type: 'rekkefolge',
      sporsmal: 'Ionene under er isoelektroniske (10 elektroner). Ranger dem etter økende radius.',
      fra: 'Minst', til: 'Størst',
      elementer: ['{{Al^3+}}', '{{Mg^2+}}', '{{Na+}}', '{{F-}}', '{{O^2-}}'],
      hint: 'Like mange elektroner, men hvor mange protoner trekker på dem?',
      forklaring: 'Al har 13 protoner og trekker hardest på de 10 elektronene, O har bare 8. Derfor er {{Al^3+}} minst og {{O^2-}} størst.',
    },
    {
      id: 'ps-14', niva: 2, type: 'flervalg',
      sporsmal: 'Hvorfor minker ioniseringsenergien nedover i gruppe 1?',
      alternativer: [
        'Valenselektronet er lenger fra kjernen og skjermes mer av indre elektroner',
        'Kjerneladningen blir mindre nedover',
        'Atomene får færre valenselektroner nedover',
        'Atomene blir mindre nedover i gruppen',
      ],
      svar: 0,
      hint: 'Tenk på avstand og skjerming.',
    },
    {
      id: 'ps-15', niva: 2, type: 'flervalg',
      sporsmal: 'Hvilket grunnstoff har lavest første ioniseringsenergi?',
      alternativer: ['Li', 'Na', 'Cs', 'F'],
      svar: 2,
      hint: 'Det er lettest å fjerne et elektron fra et stort atom med ett valenselektron.',
    },
    {
      id: 'ps-16', niva: 2, type: 'fyllinn',
      sporsmal: 'Hvilket grunnstoff står i periode 3, gruppe 16?',
      tekst: 'Grunnstoff (navn eller symbol): ___',
      svar: [['svovel', 'S']],
      hint: 'Periode 3 har 3 skall. Gruppe 16 betyr 6 valenselektroner: 2, 8, 6.',
    },
    {
      id: 'ps-17', niva: 2, type: 'flervalg',
      sporsmal: 'Et grunnstoff har konfigurasjonen $1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^5$. Hvor står det i periodesystemet?',
      alternativer: ['Gruppe 17, periode 3', 'Gruppe 15, periode 3', 'Gruppe 7, periode 3', 'Gruppe 17, periode 2'],
      svar: 0,
      hint: 'Høyeste skall er nummer 3. Antall valenselektroner er $2 + 5$.',
      forklaring: 'Tre skall → periode 3. Sju valenselektroner → gruppe 17. Det er klor.',
    },
    {
      id: 'ps-18', niva: 2, type: 'sortering',
      sporsmal: 'I hvilken blokk står grunnstoffene?',
      kategorier: ['s', 'p', 'd', 'f'],
      elementer: [['Na', 0], ['Ca', 0], ['Fe', 2], ['Cu', 2], ['Cl', 1], ['C', 1], ['U', 3], ['Nd', 3]],
      hint: 'Blokken er det underskallet som fylles sist.',
    },
    /* ---------- Høy måloppnåelse ---------- */
    {
      id: 'ps-19', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar hvorfor atomradius minker bortover en periode.',
      modellsvar: `Bortover en periode får atomene ett proton og ett elektron mer for hvert grunnstoff, men elektronene havner i det samme ytterste skallet. Kjerneladningen øker, mens skjermingen fra de indre elektronene er omtrent den samme. Valenselektronene blir derfor trukket sterkere mot kjernen, og atomet blir mindre.`,
      punkter: [
        'Antall protoner (kjerneladningen) øker bortover',
        'Elektronene kommer i samme ytterste skall (like mange skall)',
        'Skjermingen fra indre elektroner er omtrent uendret',
        'Sterkere tiltrekning trekker elektronene nærmere kjernen',
      ],
      hint: 'Sammenlign antall skall og antall protoner.',
    },
    {
      id: 'ps-20', niva: 3, type: 'forklaring',
      sporsmal: 'Kalium reagerer kraftigere med vann enn natrium gjør. Forklar hvorfor.',
      modellsvar: `Både natrium og kalium står i gruppe 1 og har ett valenselektron som de avgir når de reagerer. Kalium har ett elektronskall mer enn natrium, så valenselektronet er lenger fra kjernen og skjermes mer av indre elektroner. Tiltrekningen fra kjernen blir svakere, og kalium har lavere ioniseringsenergi. Kalium avgir derfor elektronet lettere og reagerer kraftigere.`,
      punkter: [
        'Begge har ett valenselektron som avgis',
        'K har ett skall mer, så valenselektronet er lenger fra kjernen',
        'Mer skjerming / svakere tiltrekning',
        'Lavere ioniseringsenergi, så elektronet avgis lettere',
      ],
      hint: 'Hva skjer med avstanden til valenselektronet nedover i gruppen?',
    },
    {
      id: 'ps-21', niva: 3, type: 'flervalg',
      sporsmal: 'Et grunnstoff har ioniseringsenergiene 738, 1451 og 7733 kJ/mol. I hvilken gruppe står det?',
      alternativer: ['Gruppe 1', 'Gruppe 2', 'Gruppe 13', 'Gruppe 17'],
      svar: 1, stokk: false,
      hint: 'Se etter det store hoppet.',
      forklaring: 'Hoppet kommer etter det andre elektronet. Da begynner vi å fjerne elektroner fra et fullt indre skall. Grunnstoffet har 2 valenselektroner (det er magnesium).',
    },
    {
      id: 'ps-22', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar hvorfor fluoridionet {{F-}} er større enn fluoratomet.',
      modellsvar: `{{F-}} har like mange protoner som F (9), men ett elektron mer (10 i stedet for 9). Det ekstra elektronet gir mer frastøtning mellom elektronene, mens kjerneladningen er den samme. Hvert elektron blir derfor trukket svakere mot kjernen, og elektronskyen brer seg ut. Ionet blir større enn atomet.`,
      punkter: ['Samme antall protoner (samme kjerneladning)', 'Ett elektron ekstra', 'Mer frastøtning mellom elektronene', 'Svakere tiltrekning per elektron, så elektronskyen blir større'],
    },
    {
      id: 'ps-23', niva: 3, type: 'flervalg',
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
    },
    {
      id: 'ps-24', niva: 3, type: 'flervalg',
      sporsmal: 'Hvilke utsagn om periodiske trender stemmer?',
      alternativer: [
        'Elektronegativiteten øker oppover i en gruppe',
        'Ioniseringsenergien øker nedover i en gruppe',
        'Atomradius øker nedover i en gruppe',
        'Den metalliske karakteren øker mot høyre i en periode',
        'Edelgassene har høyest ioniseringsenergi i sin periode',
      ],
      svar: [0, 2, 4],
      hint: 'Tenk på hvor de minste atomene er, og hvor de største er.',
      forklaring: 'Ioniseringsenergien **minker** nedover i en gruppe, og metallisk karakter **minker** mot høyre.',
    },
    {
      id: 'ps-25', niva: 3, type: 'fyllinn',
      sporsmal: 'Et grunnstoff i periode 3 har ioniseringsenergiene 578, 1817, 2745 og 11 577 kJ/mol. Hvilket grunnstoff er det?',
      tekst: 'Grunnstoff (navn eller symbol): ___',
      svar: [['aluminium', 'Al']],
      hint: ['Finn det store hoppet.', 'Antall elektroner før hoppet = antall valenselektroner.'],
      steg: ['Det store hoppet kommer mellom 3. (2745) og 4. (11 577) ioniseringsenergi.', 'Grunnstoffet har 3 valenselektroner → gruppe 13.', 'Gruppe 13, periode 3 = aluminium.'],
    },
    {
      id: 'ps-26', niva: 3, type: 'rekkefolge',
      sporsmal: 'Ranger etter økende første ioniseringsenergi.',
      fra: 'Lavest', til: 'Høyest',
      elementer: ['K', 'Na', 'Mg', 'Cl', 'Ar'],
      hint: 'Ioniseringsenergien øker mot høyre og oppover.',
      forklaring: 'K (419) < Na (496) < Mg (738) < Cl (1251) < Ar (1521) kJ/mol.',
    },
  ],

  flashcards: [
    { f: 'Periode', b: 'Vannrett rad. Periodenummer = antall elektronskall.' },
    { f: 'Gruppe', b: 'Loddrett kolonne. Like mange valenselektroner i hovedgruppene.' },
    { f: 'Alkalimetaller', b: 'Gruppe 1 (ikke H). Ett valenselektron, danner {{M+}}, svært reaktive.' },
    { f: 'Jordalkalimetaller', b: 'Gruppe 2. To valenselektroner, danner {{M^2+}}.' },
    { f: 'Halogener', b: 'Gruppe 17. Sju valenselektroner, danner {{X-}}, svært reaktive ikke-metaller.' },
    { f: 'Edelgasser', b: 'Gruppe 18. Fullt ytterste skall (8, He har 2). Svært lite reaktive.' },
    { f: 'Innskuddsmetaller', b: 'Gruppe 3–12 (d-blokken). Kan ofte ha flere ladninger.' },
    { f: 'Trend for atomradius', b: 'Øker nedover (flere skall), minker bortover (større kjerneladning).' },
    { f: 'Ioneradius', b: 'Kationer er mindre enn atomet, anioner er større.' },
    { f: 'Ioniseringsenergi', b: 'Energi for å fjerne ytterste elektron fra et atom i gassfase. Øker bortover, minker nedover.' },
    { f: 'Elektronegativitet', b: 'Evnen til å trekke på elektronene i en binding. Øker bortover og oppover. F = 4,0.' },
    { f: 'Isoelektroniske ioner', b: 'Samme antall elektroner. Flere protoner gir mindre ion: {{O^2-}} > {{F-}} > {{Na+}} > {{Mg^2+}}.' },
    { f: 'Skjerming', b: 'Indre elektroner skjermer valenselektronene for en del av kjerneladningen.' },
    { f: 'Halvmetaller', b: 'B, Si, Ge, As, Sb og Te. De står langs trappen mellom metaller og ikke-metaller.' },
  ],
});
