/*
 * Tema 2: Elektronkonfigurasjon og atomspektre
 */
KJ.tema({
  id: 'elektroner',
  nr: 2,
  tittel: 'Elektronkonfigurasjon og atomspektre',
  beskrivelse: 'Skall, underskall og orbitaler, Hunds regel, edelgassnotasjon og linjespektre.',
  farge: '#F2711C',
  bolge: 610,
  linje: 'Li 610 nm',
  kilde: 'notater',
  mal: [
    'Forklare atomspektre ut fra energinivåer i atomet',
    'Skrive elektronkonfigurasjoner og knytte dem til plasseringen i periodesystemet',
  ],

  teori: [
    {
      h: 'Skallmodellen',
      tekst: `I skallmodellen (Bohrs atommodell) er elektronene ordnet i **skall** rundt kjernen. Skallene heter K, L, M, N … og har hovedkvantetall $n = 1, 2, 3, 4$ …

Et skall kan maksimalt inneholde $2n^2$ elektroner: K = 2, L = 8, M = 18, N = 32.

Elektronene i det ytterste skallet kalles **valenselektroner**. Det ytterste skallet har maksimalt 8 elektroner (en oktett), selv om det er plass til flere i skallet totalt.`,
      tabell: {
        hode: ['Skall', '$n$', 'Underskall', 'Orbitaler ($n^2$)', 'Maks elektroner ($2n^2$)'],
        rader: [
          ['K', '1', '1s', '1', '2'],
          ['L', '2', '2s, 2p', '4', '8'],
          ['M', '3', '3s, 3p, 3d', '9', '18'],
          ['N', '4', '4s, 4p, 4d, 4f', '16', '32'],
        ],
      },
    },
    {
      h: 'Atomspektre',
      tekst: `Når et atom får tilført energi (varme i en flamme eller elektrisk strøm i et gassrør), kan et elektron hoppe opp til et høyere energinivå. Atomet er da **eksitert**. Når elektronet faller tilbake til et lavere nivå, sendes energiforskjellen ut som lys, et **foton**.

Fordi energinivåene i et atom har bestemte verdier, kan bare bestemte energiforskjeller forekomme. Lyset får derfor bestemte bølgelengder (farger), og vi ser et **linjespekter** (emisjonsspekter) med fargede linjer på mørk bakgrunn.

Hvert grunnstoff har sine egne energinivåer og derfor sitt unike linjespekter, et slags «fingeravtrykk». Slik kan vi identifisere grunnstoffer, både i flammeprøver på laben og i lyset fra stjerner.

Stor energiforskjell gir lys med kort bølgelengde (fiolett/blått). Liten energiforskjell gir lang bølgelengde (rødt).`,
      figur: { type: 'spekter', grunnstoff: ['H', 'He', 'Na', 'Hg'] },
      merk: 'Et absorpsjonsspekter er det motsatte: hvitt lys sendes gjennom en gass, og atomene tar opp nøyaktig de samme bølgelengdene. Vi ser mørke linjer i et ellers fargerikt spekter.',
    },
    {
      h: 'Orbitalmodellen: underskall og orbitaler',
      tekst: `Hvert skall er delt i **underskall**: s, p, d og f. Et underskall består av **orbitaler**. En orbital er et område rundt kjernen der det er stor sannsynlighet for å finne elektronet.

- s-underskall: 1 orbital (kuleformet), maks 2 elektroner
- p-underskall: 3 orbitaler ($p_x, p_y, p_z$, hantelformet), maks 6 elektroner
- d-underskall: 5 orbitaler, maks 10 elektroner
- f-underskall: 7 orbitaler, maks 14 elektroner

Hver orbital rommer maksimalt **2 elektroner med motsatt spinn** (↑↓). Dette kalles Pauliprinsippet.`,
    },
    {
      h: 'Fyllingsrekkefølge og Hunds regel',
      tekst: `Elektronene fyller orbitalene med lavest energi først (oppbyggingsprinsippet). Rekkefølgen er:

$$1s \\to 2s \\to 2p \\to 3s \\to 3p \\to 4s \\to 3d \\to 4p \\to 5s \\to 4d \\to 5p \\to 6s \\to 4f \\to 5d \\to 6p$$

Legg merke til at **4s fylles før 3d**, fordi 4s har litt lavere energi. Derfor begynner N-skallet å fylles før M-skallet er fullt.

**Hunds regel:** Orbitaler i samme underskall fylles med ett elektron hver (med samme spinn) før noen av dem får to. Nitrogen ($2p^3$) har derfor tre uparede elektroner.`,
      figur: { type: 'orbitaler', grunnstoff: ['C', 'N', 'O'] },
    },
    {
      h: 'Edelgassnotasjon og unntak',
      tekst: `Vi kan forkorte konfigurasjonen ved å skrive den foregående edelgassen i hakeparentes:

- Na: $1s^2\\,2s^2\\,2p^6\\,3s^1$ = $[\\mathrm{Ne}]\\,3s^1$
- Ca: $[\\mathrm{Ar}]\\,4s^2$
- Fe: $[\\mathrm{Ar}]\\,4s^2\\,3d^6$
- Ga: $[\\mathrm{Ar}]\\,4s^2\\,3d^{10}\\,4p^1$

**Unntak:** Et halvfullt eller fullt d-underskall er ekstra stabilt. Derfor er Cr $[\\mathrm{Ar}]\\,4s^1\\,3d^5$ og Cu $[\\mathrm{Ar}]\\,4s^1\\,3d^{10}$.`,
    },
    {
      h: 'Elektronkonfigurasjon for ioner',
      tekst: `Hovedgruppegrunnstoffer danner ioner med samme konfigurasjon som nærmeste edelgass. Ioner med lik konfigurasjon kalles **isoelektroniske**: {{Na+}}, {{Mg^2+}}, {{F-}} og {{O^2-}} har alle konfigurasjonen til neon.

Innskuddsmetaller mister **4s-elektronene først** når de danner ioner, selv om 4s ble fylt før 3d: Fe $[\\mathrm{Ar}]\\,4s^2\\,3d^6$ → {{Fe^2+}} $[\\mathrm{Ar}]\\,3d^6$ → {{Fe^3+}} $[\\mathrm{Ar}]\\,3d^5$.`,
    },
  ],

  begreper: [
    { term: 'Skall (hovedenerginivå)', def: 'K, L, M, N … med plass til $2n^2$ elektroner.' },
    { term: 'Underskall', def: 's, p, d og f. Skall nummer $n$ har $n$ underskall.' },
    { term: 'Orbital', def: 'Område der det er stor sannsynlighet for å finne et elektron. Maks 2 elektroner.' },
    { term: 'Spinn', def: 'Egenskap ved elektronet, opp (↑) eller ned (↓). To elektroner i samme orbital har motsatt spinn.' },
    { term: 'Hunds regel', def: 'Orbitaler i samme underskall fylles med ett elektron hver før de fylles med to.' },
    { term: 'Valenselektroner', def: 'Elektronene i det ytterste skallet. Bestemmer kjemiske egenskaper.' },
    { term: 'Eksitert tilstand', def: 'Et elektron er løftet til et høyere energinivå enn i grunntilstanden.' },
    { term: 'Emisjonsspekter', def: 'Fargede linjer som sendes ut når elektroner faller til lavere energinivå. Unikt for hvert grunnstoff.' },
    { term: 'Isoelektronisk', def: 'Atomer/ioner med samme elektronkonfigurasjon, f.eks. {{Na+}} og {{Ne}}.' },
  ],

  eksempler: [
    {
      tittel: 'Konfigurasjon for svovel',
      oppgave: 'Skriv elektronkonfigurasjonen og skallfordelingen til svovel (Z = 16).',
      steg: [
        'Fyll 16 elektroner i rekkefølge: $1s^2$ (2), $2s^2$ (4), $2p^6$ (10), $3s^2$ (12), $3p^4$ (16).',
        'Full notasjon: $1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^4$. Edelgassnotasjon: $[\\mathrm{Ne}]\\,3s^2\\,3p^4$.',
        'Skallfordeling: K = 2, L = 8, M = 6. Svovel har 6 valenselektroner og står i gruppe 16.',
      ],
    },
    {
      tittel: 'Jern og jern(III)-ionet',
      oppgave: 'Skriv konfigurasjonen til Fe og {{Fe^3+}}.',
      steg: [
        'Fe har 26 elektroner: $[\\mathrm{Ar}]\\,4s^2\\,3d^6$.',
        '{{Fe^3+}} har mistet 3 elektroner. De to 4s-elektronene forsvinner først, deretter ett 3d-elektron.',
        '{{Fe^3+}}: $[\\mathrm{Ar}]\\,3d^5$. Det er et halvfullt d-underskall.',
      ],
    },
  ],

  feller: [
    's-orbitaler er **kuleformede** (ikke sirkelformede), og fra L-skallet har hvert skall nøyaktig tre p-orbitaler.',
    'Innskuddsmetaller mister 4s-elektronene før 3d-elektronene, selv om 4s fylles først.',
    'Et skall kan ha mer enn 8 elektroner (M har plass til 18), men det **ytterste** skallet har maks 8.',
    'Linjespekteret oppstår når elektroner **faller ned** til lavere energinivå. Når de løftes opp, tas energi opp.',
  ],

  oppgaver: [
    /* ---------- Grunnleggende ---------- */
    {
      id: 'el-01', niva: 1, type: 'flervalg',
      sporsmal: 'Hvor mange elektroner kan det maksimalt være i L-skallet ($n = 2$)?',
      alternativer: ['2', '8', '18', '32'],
      svar: 1, stokk: false,
      hint: 'Bruk formelen $2n^2$.',
      forklaring: '$2 \\cdot 2^2 = 8$.',
    },
    {
      id: 'el-02', niva: 1, type: 'fyllinn',
      sporsmal: 'Fyll inn.',
      tekst: 'En orbital kan inneholde maksimalt ___ elektroner, og de må ha motsatt ___.',
      svar: [['2', 'to'], ['spinn']],
      hint: 'Pilene i et orbitaldiagram peker opp og ned: ↑↓.',
    },
    {
      id: 'el-03', niva: 1, type: 'kobling',
      sporsmal: 'Koble hvert underskall med antall orbitaler og maks antall elektroner.',
      par: [
        ['s', '1 orbital, maks 2 elektroner'],
        ['p', '3 orbitaler, maks 6 elektroner'],
        ['d', '5 orbitaler, maks 10 elektroner'],
        ['f', '7 orbitaler, maks 14 elektroner'],
      ],
      hint: 'Antall orbitaler øker med 2 for hvert underskall: 1, 3, 5, 7.',
    },
    {
      id: 'el-04', niva: 1, type: 'flervalg',
      sporsmal: 'Hvilken elektronkonfigurasjon har natrium (Na, Z = 11)?',
      alternativer: ['$1s^2\\,2s^2\\,2p^6\\,3s^1$', '$1s^2\\,2s^2\\,2p^7$', '$1s^2\\,2s^2\\,2p^5\\,3s^2$', '$1s^2\\,2s^2\\,3s^2\\,2p^5$'],
      svar: 0,
      hint: 'Et p-underskall kan ha maks 6 elektroner, og 2p fylles før 3s.',
      forklaring: '11 elektroner: $1s^2$ (2) + $2s^2$ (4) + $2p^6$ (10) + $3s^1$ (11).',
    },
    {
      id: 'el-05', niva: 1, type: 'fyllinn',
      sporsmal: 'Skriv skallfordelingen for et kloratom (Cl, Z = 17).',
      tekst: 'K: ___   L: ___   M: ___',
      svar: [['2'], ['8'], ['7']],
      hint: 'Fyll K-skallet (2) og L-skallet (8) først.',
      forklaring: '17 = 2 + 8 + 7. Klor har 7 valenselektroner og står i gruppe 17.',
    },
    {
      id: 'el-06', niva: 1, type: 'flervalg',
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
    },
    {
      id: 'el-07', niva: 1, type: 'flervalg',
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
    },
    {
      id: 'el-08', niva: 1, type: 'tall',
      sporsmal: 'Hvor mange valenselektroner har et svovelatom (S, Z = 16)?',
      svar: 6, heltall: true, enhet: null,
      hint: 'Skriv skallfordelingen 2, 8, …',
      steg: ['Skallfordeling: K = 2, L = 8, M = 6', 'Det ytterste skallet (M) har 6 elektroner.'],
    },
    {
      id: 'el-09', niva: 1, type: 'flervalg',
      sporsmal: 'Hvilket underskall fylles rett etter 3p?',
      alternativer: ['3d', '4s', '4p', '4d'],
      svar: 1, stokk: false,
      hint: '4s har litt lavere energi enn 3d.',
      forklaring: 'Rekkefølgen er … 3s, 3p, **4s**, 3d, 4p …',
    },
    /* ---------- Middels ---------- */
    {
      id: 'el-10', niva: 2, type: 'konfig', grunnstoff: 'Ca', notasjon: 'edelgass',
      hint: ['Kalsium har 20 elektroner. Argon har 18.', 'Etter [Ar] fylles 4s.'],
      steg: ['Ca har 20 elektroner. Argon (18) er edelgassen foran.', 'De to siste elektronene går i 4s: $[\\mathrm{Ar}]\\,4s^2$.'],
    },
    {
      id: 'el-11', niva: 2, type: 'konfig', grunnstoff: 'Al', notasjon: 'full',
      hint: 'Aluminium har 13 elektroner. Fyll 1s, 2s, 2p, 3s og så 3p.',
      steg: ['13 elektroner: $1s^2$ (2), $2s^2$ (4), $2p^6$ (10), $3s^2$ (12), $3p^1$ (13).', 'Svar: $1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^1$'],
    },
    {
      id: 'el-12', niva: 2, type: 'konfig', grunnstoff: 'Fe', notasjon: 'edelgass',
      hint: ['Jern har 26 elektroner.', 'Etter [Ar] kommer 4s og deretter 3d.'],
      steg: ['26 − 18 = 8 elektroner etter argon.', '4s tar 2, og resten (6) går i 3d.', 'Svar: $[\\mathrm{Ar}]\\,4s^2\\,3d^6$'],
    },
    {
      id: 'el-13', niva: 2, type: 'konfig', grunnstoff: 'S', ladning: -2,
      hint: 'Sulfidionet har tatt opp 2 elektroner: 16 + 2 = 18.',
      steg: ['{{S^2-}} har $16 + 2 = 18$ elektroner.', 'Konfigurasjon: $1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6$ = $[\\mathrm{Ne}]\\,3s^2\\,3p^6$, samme som argon.'],
    },
    {
      id: 'el-14', niva: 2, type: 'flervalg',
      sporsmal: 'Hvilke ioner har samme elektronkonfigurasjon som neon?',
      alternativer: ['{{Na+}}', '{{F-}}', '{{Mg^2+}}', '{{K+}}', '{{Cl-}}', '{{O^2-}}'],
      svar: [0, 1, 2, 5],
      hint: 'Neon har 10 elektroner. Regn ut antall elektroner i hvert ion.',
      forklaring: '{{Na+}} (11 − 1), {{F-}} (9 + 1), {{Mg^2+}} (12 − 2) og {{O^2-}} (8 + 2) har alle 10 elektroner. {{K+}} og {{Cl-}} har 18, som argon.',
    },
    {
      id: 'el-15', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange uparede elektroner har et oksygenatom i grunntilstanden?',
      svar: 2, heltall: true, enhet: null,
      hint: ['O har konfigurasjonen $1s^2\\,2s^2\\,2p^4$.', 'Fordel de fire 2p-elektronene i tre orbitaler etter Hunds regel.'],
      steg: ['2p har tre orbitaler. Etter Hunds regel får hver orbital først ett elektron: ↑ ↑ ↑', 'Det fjerde elektronet pares med ett av dem: ↑↓ ↑ ↑', 'Det gir **2** uparede elektroner.'],
    },
    {
      id: 'el-16', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange uparede elektroner har et nitrogenatom i grunntilstanden?',
      svar: 3, heltall: true, enhet: null,
      hint: 'N: $2p^3$. Bruk Hunds regel.',
      steg: ['N har $2p^3$.', 'Tre elektroner fordeles på tre p-orbitaler: ↑ ↑ ↑', '**3** uparede elektroner.'],
    },
    {
      id: 'el-17', niva: 2, type: 'rekkefolge',
      sporsmal: 'Ranger underskallene i den rekkefølgen de fylles.',
      fra: 'Fylles først', til: 'Fylles sist',
      elementer: ['3p', '4s', '3d', '4p', '5s'],
      hint: 'Husk at 4s fylles før 3d.',
    },
    {
      id: 'el-18', niva: 2, type: 'flervalg',
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
    },
    {
      id: 'el-19', niva: 2, type: 'fyllinn',
      sporsmal: 'Fyll inn.',
      tekst: '4s fylles før 3d fordi 4s har ___ energi enn 3d.',
      svar: [['lavere', 'mindre', 'litt lavere']],
      hint: 'Elektronene fyller alltid de ledige orbitalene med lavest energi først.',
    },
    {
      id: 'el-20', niva: 2, type: 'tall',
      sporsmal: 'Hvor mange elektroner kan N-skallet ($n = 4$) maksimalt inneholde?',
      svar: 32, heltall: true, enhet: null,
      hint: 'Bruk $2n^2$.',
      steg: ['$2n^2 = 2 \\cdot 4^2 = 32$', 'Det tilsvarer 4s (2) + 4p (6) + 4d (10) + 4f (14) = 32.'],
    },
    /* ---------- Høy måloppnåelse ---------- */
    {
      id: 'el-21', niva: 3, type: 'konfig', grunnstoff: 'Cu', notasjon: 'edelgass',
      hint: ['Kobber er et kjent unntak.', 'Et fullt d-underskall ($d^{10}$) er ekstra stabilt.'],
      steg: [
        'Etter oppbyggingsprinsippet skulle Cu fått $[\\mathrm{Ar}]\\,4s^2\\,3d^9$.',
        'Et fullt 3d-underskall er mer stabilt, så ett elektron flyttes fra 4s til 3d.',
        'Svar: $[\\mathrm{Ar}]\\,4s^1\\,3d^{10}$',
      ],
    },
    {
      id: 'el-22', niva: 3, type: 'konfig', grunnstoff: 'Fe', ladning: 3, notasjon: 'edelgass',
      hint: ['Skriv først konfigurasjonen til et jernatom.', 'Innskuddsmetaller mister 4s-elektronene først.'],
      steg: ['Fe: $[\\mathrm{Ar}]\\,4s^2\\,3d^6$', 'Fjern 3 elektroner: først begge 4s-elektronene, så ett 3d-elektron.', '{{Fe^3+}}: $[\\mathrm{Ar}]\\,3d^5$'],
    },
    {
      id: 'el-23', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar hvordan et linjespekter oppstår, og hvorfor det kan brukes til å identifisere grunnstoffer.',
      modellsvar: `Når atomer får tilført energi, for eksempel i en flamme, blir elektroner eksitert til høyere energinivåer. Elektronene faller raskt tilbake til lavere nivåer, og energiforskjellen sendes ut som et foton. Energien til fotonet bestemmer bølgelengden, altså fargen på lyset. Energinivåene i et atom har bestemte verdier (de er kvantiserte), så bare bestemte energiforskjeller, og dermed bestemte bølgelengder, er mulige. Det gir et spekter med skarpe linjer. Fordi hvert grunnstoff har sitt eget sett av energinivåer, får hvert grunnstoff et unikt mønster av linjer som fungerer som et fingeravtrykk.`,
      punkter: [
        'Elektroner eksiteres til høyere energinivå når atomet får energi',
        'Når elektronene faller tilbake, sendes energien ut som lys (fotoner)',
        'Energiforskjellen bestemmer bølgelengden/fargen',
        'Energinivåene har bestemte verdier, så vi får bestemte linjer',
        'Hvert grunnstoff har unike energinivåer og dermed et unikt spekter',
      ],
      hint: 'Beskriv hva elektronene gjør, og knytt energiforskjell til farge.',
    },
    {
      id: 'el-24', niva: 3, type: 'forklaring',
      sporsmal: 'Forklar Hunds regel, og bruk nitrogen som eksempel. Tegn gjerne et orbitaldiagram for deg selv.',
      modellsvar: `Hunds regel sier at når elektroner fyller orbitaler med samme energi (i samme underskall), går de først ett og ett inn i hver orbital med samme spinn, før noen orbital får to elektroner. Nitrogen har konfigurasjonen $1s^2\\,2s^2\\,2p^3$. De tre 2p-elektronene fordeles med ett elektron i hver av de tre p-orbitalene (↑ ↑ ↑). Nitrogen har derfor tre uparede elektroner, noe som forklarer at nitrogen ofte danner tre kovalente bindinger (f.eks. i {{NH3}}).`,
      punkter: [
        'Orbitaler i samme underskall fylles med ett elektron hver før de får to',
        'Elektronene i halvfylte orbitaler har samme spinn',
        'Nitrogen: $2p^3$ fordelt som ↑ ↑ ↑ i tre p-orbitaler',
        'Nitrogen har tre uparede elektroner',
      ],
      hint: 'Hvordan fordeles tre elektroner på tre p-orbitaler?',
    },
    {
      id: 'el-25', niva: 3, type: 'flervalg',
      sporsmal: 'Hvilke konfigurasjoner beskriver et atom i **grunntilstanden** (ikke eksitert)?',
      alternativer: [
        '$1s^2\\,2s^2\\,2p^6\\,3s^1$',
        '$1s^2\\,2s^2\\,2p^5\\,3s^1$',
        '$1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,4s^1$',
        '$1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,3d^1$',
        '$1s^2\\,2s^1\\,2p^1$',
      ],
      svar: [0, 2], stokk: false,
      hint: 'I grunntilstanden er alle lavere underskall fylt før et høyere tas i bruk.',
      forklaring: 'Alternativ B (Ne-atom med et elektron i 3s), D (K-atom med elektron i 3d i stedet for 4s) og E (Be med elektron i 2p) er eksiterte tilstander.',
    },
    {
      id: 'el-26', niva: 3, type: 'fyllinn',
      sporsmal: 'Et grunnstoff har konfigurasjonen $[\\mathrm{Ar}]\\,4s^2\\,3d^{10}\\,4p^1$. Hvilket grunnstoff er det?',
      tekst: 'Grunnstoff (navn eller symbol): ___',
      svar: [['gallium', 'Ga']],
      hint: 'Tell elektronene: argon har 18.',
      steg: ['$18 + 2 + 10 + 1 = 31$ elektroner', 'Atomnummer 31 er gallium (Ga), i gruppe 13, periode 4.'],
    },
    {
      id: 'el-27', niva: 3, type: 'fyllinn',
      sporsmal: 'Et grunnstoff har konfigurasjonen $[\\mathrm{Kr}]\\,5s^2\\,4d^{10}\\,5p^5$. Hvilket grunnstoff er det, og i hvilken gruppe står det?',
      tekst: 'Grunnstoff: ___\nGruppe: ___',
      svar: [['jod', 'I'], ['17']],
      hint: 'Krypton har 36 elektroner. Valenselektronene er 5s og 5p.',
      steg: ['$36 + 2 + 10 + 5 = 53$ elektroner → jod (I).', 'Valenselektroner: $5s^2\\,5p^5$ = 7, altså gruppe 17 (halogenene).'],
    },
    {
      id: 'el-28', niva: 3, type: 'konfig', grunnstoff: 'Cr', notasjon: 'edelgass',
      hint: ['Krom er et unntak.', 'Et halvfullt d-underskall ($d^5$) er ekstra stabilt.'],
      steg: ['Forventet: $[\\mathrm{Ar}]\\,4s^2\\,3d^4$', 'Ett elektron flyttes fra 4s til 3d slik at både 4s og 3d blir halvfulle.', 'Svar: $[\\mathrm{Ar}]\\,4s^1\\,3d^5$'],
    },
  ],

  flashcards: [
    { f: 'Maks elektroner i skall $n$', b: '$2n^2$: K = 2, L = 8, M = 18, N = 32.' },
    { f: 'Orbital', b: 'Område der elektronet sannsynligvis er. Maks 2 elektroner med motsatt spinn.' },
    { f: 's, p, d, f', b: 'Underskall med 1, 3, 5 og 7 orbitaler. Maks 2, 6, 10 og 14 elektroner.' },
    { f: 'Form på s- og p-orbitaler', b: 's: kuleformet. p: hantelformet, tre stykker ($p_x, p_y, p_z$).' },
    { f: 'Pauliprinsippet', b: 'Maks to elektroner i hver orbital, og de har motsatt spinn (↑↓).' },
    { f: 'Hunds regel', b: 'Orbitaler i samme underskall fylles med ett elektron hver (samme spinn) før de fylles med to.' },
    { f: 'Fyllingsrekkefølge', b: '1s 2s 2p 3s 3p **4s 3d** 4p 5s 4d 5p 6s 4f 5d 6p' },
    { f: 'Valenselektroner', b: 'Elektronene i det ytterste skallet.' },
    { f: 'Edelgassnotasjon', b: 'Forkortet konfigurasjon med edelgassen foran i hakeparentes, f.eks. Na = $[\\mathrm{Ne}]\\,3s^1$.' },
    { f: 'Unntakene Cr og Cu', b: 'Cr: $[\\mathrm{Ar}]\\,4s^1\\,3d^5$. Cu: $[\\mathrm{Ar}]\\,4s^1\\,3d^{10}$. Halvfullt/fullt d er ekstra stabilt.' },
    { f: 'Ioner av innskuddsmetaller', b: 'Mister 4s-elektronene først: {{Fe^2+}} = $[\\mathrm{Ar}]\\,3d^6$.' },
    { f: 'Emisjonsspekter', b: 'Fargede linjer fra elektroner som faller til lavere energinivå. Unikt for hvert grunnstoff.' },
    { f: 'Absorpsjonsspekter', b: 'Mørke linjer der atomene har tatt opp lys med bestemte bølgelengder.' },
    { f: 'Grunntilstand / eksitert tilstand', b: 'Grunntilstand: lavest mulig energi. Eksitert: et elektron er løftet til et høyere nivå.' },
    { f: 'Isoelektronisk', b: 'Samme elektronkonfigurasjon, f.eks. {{O^2-}}, {{F-}}, {{Ne}}, {{Na+}} og {{Mg^2+}}.' },
  ],
});
