/*
 * Modul 1: Sentrale begreper
 * Læringsmål: 1
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */
KJ.modul({
  id: 'begreper',
  nr: 1,
  tittel: 'Sentrale begreper',
  beskrivelse: 'Isotop, ion, orbital, ioniseringsenergi, elektronegativitet og formelenhet.',
  mal: [1],
  farge: '#E5484D',
  bolge: 656,
  teori: [
    {
      h: 'Seks begreper du må kunne forklare',
      tekst: 'På prøven holder det ikke å gjengi en definisjon. For høy måloppnåelse må du bruke begrepet til å forklare noe, for eksempel hvorfor fluor har høyest elektronegativitet, eller hvorfor NaCl ikke består av molekyler.',
      tabell: {
        hode: ['Begrep', 'Forklaring', 'Eksempel'],
        rader: [
          [
            'Isotop',
            'Atomer av samme grunnstoff (like mange protoner) med ulikt antall nøytroner',
            '{{^{12}_{6}C}} og {{^{14}_{6}C}}',
          ],
          [
            'Ion',
            'Atom eller atomgruppe med elektrisk ladning, fordi det har avgitt eller tatt opp elektroner',
            '{{Na+}}, {{Cl-}}, {{SO4^2-}}',
          ],
          [
            'Orbital',
            'Område rundt kjernen der det er stor sannsynlighet for å finne et elektron. Maks to elektroner med motsatt spinn',
            '1s, $2p_x$, $3d$',
          ],
          [
            'Ioniseringsenergi',
            'Energien som trengs for å fjerne det ytterste elektronet fra et atom i gassfase',
            '{{Na(g) -> Na+(g) + e-}} krever 496 kJ/mol',
          ],
          [
            'Elektronegativitet',
            'Et atoms evne til å trekke til seg elektronene i en kjemisk binding',
            'F 4,0 (høyest), O 3,5, Na 0,9',
          ],
          [
            'Formelenhet',
            'Den minste enheten i en ioneforbindelse. Viser forholdet mellom ionene i gitteret',
            'NaCl (1 : 1), {{CaCl2}} (1 : 2)',
          ],
        ],
      },
    },
    {
      h: 'Isotoper og ioner',
      tekst: `**Isotoper** har like mange protoner (samme grunnstoff), men ulikt antall nøytroner, og dermed ulikt nukleontall. De har samme kjemiske egenskaper fordi elektronkonfigurasjonen er den samme.

Et **ion** har like mange protoner som atomet, men et annet antall elektroner. Et kation (+) har avgitt elektroner, et anion (−) har tatt opp elektroner.

{{^{35}_{17}Cl}} og {{^{37}_{17}Cl}} er isotoper. {{^{35}_{17}Cl}} og {{^{35}_{17}Cl-}} er ikke isotoper av hverandre: de har like mange nøytroner, men ulikt antall elektroner. Det ene er et atom, det andre et ion.`,
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
    {
      h: 'Formelenhet',
      tekst: `En ioneforbindelse, for eksempel NaCl, består av et stort gitter av {{Na+}} og {{Cl-}}. Det finnes ingen avgrensede NaCl-molekyler. Formelen viser bare **forholdet** mellom ionene, og den minste enheten med dette forholdet kalles en **formelenhet**.

I {{CaCl2}} er det ett {{Ca^2+}} for hvert andre {{Cl-}}. Formelenheten er {{CaCl2}}.

Molekylære stoffer, som {{H2O}} og {{CO2}}, består derimot av avgrensede molekyler som holdes sammen av kovalente bindinger.`,
    },
  ],
  begreper: [
    { term: 'Isotoper', def: 'Atomer av samme grunnstoff med ulikt antall nøytroner.' },
    { term: 'Ion', def: 'Atom eller atomgruppe med elektrisk ladning (har avgitt eller tatt opp elektroner).' },
    { term: 'Kation / anion', def: 'Kation: positivt ion. Anion: negativt ion.' },
    { term: 'Orbital', def: 'Område der det er stor sannsynlighet for å finne et elektron. Maks 2 elektroner.' },
    {
      term: 'Ioniseringsenergi',
      def: 'Energien som trengs for å fjerne det ytterste elektronet fra et atom i gassfase.',
    },
    {
      term: 'Elektronegativitet',
      def: 'Et atoms evne til å trekke til seg elektronene i en binding. Høyest for F (4,0).',
    },
    {
      term: 'Ionegitter / formelenhet',
      def: 'Regelmessig gitter av ioner. Formelenheten er den minste enheten (f.eks. NaCl).',
    },
    { term: 'Elektropositiv', def: 'Avgir lett elektroner; lav EN. Gjelder metallene nede til venstre.' },
  ],
  eksempler: [],
  feller: [
    'Ioniseringsenergi og elektronegativitet er ikke det samme. Ioniseringsenergi gjelder et fritt atom som mister et elektron. Elektronegativitet gjelder hvor hardt et atom trekker på elektronparet i en binding.',
    'En orbital er ikke en bane som elektronet går i. Det er et område der elektronet sannsynligvis befinner seg.',
    'NaCl er ikke et molekyl. Formelen viser forholdet mellom ionene i gitteret, og den minste enheten kalles en formelenhet.',
    'Isotoper har ulikt antall **nøytroner**. Et ion har ulikt antall **elektroner** enn atomet.',
  ],
  oppgaver: [
    {
      id: 'at-04',
      niva: 1,
      type: 'kobling',
      mal: [1],
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
      id: 'at-05',
      niva: 1,
      type: 'flervalg',
      mal: [1],
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
      id: 'ps-05',
      niva: 1,
      type: 'flervalg',
      mal: [1],
      sporsmal: 'Hvilket grunnstoff har høyest elektronegativitet?',
      alternativer: ['O', 'Cl', 'F', 'N'],
      svar: 2,
      hint: 'EN øker oppover og mot høyre (utenom edelgassene).',
      forklaring: 'Fluor har EN = 4,0, den høyeste av alle grunnstoffer.',
    },
    {
      id: 'be-01',
      niva: 1,
      type: 'kobling',
      mal: [1],
      sporsmal: 'Koble hvert begrep med riktig forklaring.',
      par: [
        ['Isotop', 'samme grunnstoff, ulikt antall nøytroner'],
        ['Ion', 'atom eller atomgruppe med elektrisk ladning'],
        ['Orbital', 'område der et elektron sannsynligvis er, maks to elektroner'],
        ['Ioniseringsenergi', 'energi for å fjerne det ytterste elektronet fra et atom i gassfase'],
        ['Elektronegativitet', 'evnen et atom har til å trekke på elektronene i en binding'],
        ['Formelenhet', 'minste enhet i en ioneforbindelse'],
      ],
    },
    {
      id: 'be-02',
      niva: 1,
      type: 'flervalg',
      mal: [1],
      sporsmal: 'Hva er en orbital?',
      alternativer: [
        'Et område rundt kjernen der det er stor sannsynlighet for å finne et elektron, med plass til maks to elektroner',
        'En sirkelformet bane som elektronet beveger seg i',
        'Et elektronskall med plass til åtte elektroner',
        'Kjernen og de innerste elektronene',
      ],
      svar: 0,
      forklaring: 'Bohrs modell tegner elektronene i baner, men i orbitalmodellen er en orbital et sannsynlighetsområde. Hver orbital rommer maks to elektroner med motsatt spinn.',
    },
    {
      id: 'be-03',
      niva: 1,
      type: 'flervalg',
      mal: [1],
      sporsmal: 'Hva er en formelenhet?',
      alternativer: [
        'Den minste enheten i en ioneforbindelse, som viser forholdet mellom ionene',
        'Et molekyl som består av to ulike grunnstoffer',
        'Antall atomer i en kjemisk formel',
        'Et ion som består av flere atomer',
      ],
      svar: 0,
      hint: 'Tenk på NaCl. Finnes det NaCl-molekyler?',
    },
    {
      id: 'be-04',
      niva: 1,
      type: 'flervalg',
      mal: [1],
      sporsmal: 'Hva er elektronegativitet?',
      alternativer: [
        'Evnen et atom har til å trekke til seg elektronene i en kjemisk binding',
        'Energien som trengs for å fjerne et elektron fra et atom',
        'Antall elektroner et atom kan ta opp',
        'Ladningen til et negativt ion',
      ],
      svar: 0,
    },
    {
      id: 'be-05',
      niva: 1,
      type: 'flervalg',
      mal: [1],
      sporsmal: 'Hva er (første) ioniseringsenergi?',
      alternativer: [
        'Energien som trengs for å fjerne det ytterste elektronet fra et atom i gassfase',
        'Energien som frigjøres når et atom tar opp et elektron',
        'Energien som trengs for å bryte en ionebinding',
        'Evnen et atom har til å trekke på bindingselektroner',
      ],
      svar: 0,
    },
    {
      id: 'be-06',
      niva: 1,
      type: 'fyllinn',
      mal: [1],
      sporsmal: 'Fyll inn.',
      tekst: 'Atomer av samme grunnstoff med ulikt antall nøytroner kalles ___. Et atom som har avgitt elektroner, kalles et ___.',
      svar: [['isotoper', 'isotop'], ['kation', 'positivt ion', 'kationer']],
    },
    {
      id: 'be-07',
      niva: 1,
      type: 'flervalg',
      mal: [1],
      sporsmal: 'Hva er et ion?',
      alternativer: [
        'Et atom eller en atomgruppe med elektrisk ladning',
        'Et atom med ekstra nøytroner',
        'Et nøytralt molekyl',
        'Et atom som har mistet protoner',
      ],
      svar: 0,
    },
    {
      id: 'at-12',
      niva: 2,
      type: 'flervalg',
      mal: [1],
      sporsmal: 'Hvilke par er isotoper av samme grunnstoff?',
      alternativer: [
        '{{^{12}_{6}C}} og {{^{14}_{6}C}}',
        '{{^{14}_{6}C}} og {{^{14}_{7}N}}',
        '{{^{16}_{8}O}} og {{^{18}_{8}O}}',
        '{{^{40}_{18}Ar}} og {{^{40}_{20}Ca}}',
      ],
      svar: [0, 2],
      hint: 'Isotoper har samme tall nede (atomnummer), men ulikt tall oppe.',
      forklaring: 'C-14 og N-14 har samme nukleontall, men ulikt atomnummer, så de er ulike grunnstoffer. Det samme gjelder Ar-40 og Ca-40.',
    },
    {
      id: 'ps-11',
      niva: 2,
      type: 'rekkefolge',
      mal: [1, 8],
      sporsmal: 'Ranger grunnstoffene etter økende elektronegativitet.',
      fra: 'Lavest EN',
      til: 'Høyest EN',
      elementer: ['Cs', 'K', 'Mg', 'C', 'O'],
      hint: 'EN øker oppover og mot høyre. Bruk gjerne periodesystemet under Verktøy.',
      forklaring: 'Cs 0,7 < K 0,8 < Mg 1,2 < C 2,5 < O 3,5.',
    },
    {
      id: 'ps-14',
      niva: 2,
      type: 'flervalg',
      mal: [1, 6],
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
      id: 'ps-15',
      niva: 2,
      type: 'flervalg',
      mal: [1],
      sporsmal: 'Hvilket grunnstoff har lavest første ioniseringsenergi?',
      alternativer: ['Li', 'Na', 'Cs', 'F'],
      svar: 2,
      hint: 'Det er lettest å fjerne et elektron fra et stort atom med ett valenselektron.',
    },
    {
      id: 'be-08',
      niva: 2,
      type: 'flervalg',
      mal: [1, 17],
      sporsmal: 'Hvorfor sier vi at NaCl består av formelenheter og ikke av molekyler?',
      alternativer: [
        'NaCl er et ionegitter uten avgrensede molekyler. Formelen viser bare forholdet 1 : 1 mellom ionene',
        'NaCl har for få atomer til å være et molekyl',
        'Natrium og klor deler elektronpar',
        'Formelenhet er bare et annet ord for molekyl',
      ],
      svar: 0,
    },
    {
      id: 'be-09',
      niva: 2,
      type: 'kobling',
      mal: [1],
      sporsmal: 'Koble eksempelet med begrepet det illustrerer.',
      par: [
        ['{{^{12}C}} og {{^{14}C}}', 'isotoper'],
        ['{{Fe^3+}}', 'ion'],
        ['$3p_x$', 'orbital'],
        ['{{Na(g) -> Na+(g) + e-}}', 'ioniseringsenergi'],
        ['F trekker hardest på bindingselektronene', 'elektronegativitet'],
        ['{{CaCl2}}: ett {{Ca^2+}} per to {{Cl-}}', 'formelenhet'],
      ],
    },
    {
      id: 'be-10',
      niva: 2,
      type: 'flervalg',
      mal: [1, 6],
      sporsmal: 'Hvilket grunnstoff har høyest første ioniseringsenergi i periode 2?',
      alternativer: ['Ne', 'F', 'Li', 'O'],
      svar: 0,
      forklaring: 'Ioniseringsenergien øker bortover perioden. Neon har fullt ytterste skall og størst kjerneladning i perioden.',
    },
    {
      id: 'be-11',
      niva: 2,
      type: 'flervalg',
      mal: [1],
      sporsmal: 'Elektronegativitet og ioniseringsenergi følger samme trend i periodesystemet. Hva er forskjellen på dem?',
      alternativer: [
        'Ioniseringsenergi gjelder et fritt atom som mister et elektron. Elektronegativitet gjelder tiltrekning på et elektronpar i en binding',
        'Det er to ord for det samme',
        'Elektronegativitet måles i kJ/mol, ioniseringsenergi har ingen enhet',
        'Ioniseringsenergi gjelder bare metaller',
      ],
      svar: 0,
    },
    {
      id: 'be-12',
      niva: 2,
      type: 'flervalg',
      mal: [1, 5],
      sporsmal: 'Natrium har første ioniseringsenergi 496 kJ/mol og andre ioniseringsenergi 4562 kJ/mol. Hvorfor er hoppet så stort?',
      alternativer: [
        'Det andre elektronet må fjernes fra et fullt indre skall (2p), som er nærmere kjernen og mindre skjermet',
        'Natrium har to valenselektroner',
        'Det andre elektronet sitter i 3d',
        'Kjerneladningen øker når det første elektronet fjernes',
      ],
      svar: 0,
    },
    {
      id: 'be-16',
      niva: 2,
      type: 'flervalg',
      mal: [1],
      sporsmal: 'Hvilken påstand om isotoper er riktig?',
      alternativer: [
        'Isotoper av samme grunnstoff har samme kjemiske egenskaper',
        'Isotoper har ulikt antall protoner',
        'Isotoper har ulik elektronkonfigurasjon',
        'Isotoper er alltid radioaktive',
      ],
      svar: 0,
    },
    {
      id: 'at-21',
      niva: 3,
      type: 'forklaring',
      mal: [1],
      sporsmal: 'Forklar hvorfor isotoper av samme grunnstoff har de samme kjemiske egenskapene.',
      hint: 'Hva bestemmer kjemiske egenskaper: kjernen eller elektronene?',
      modellsvar: 'Isotoper av samme grunnstoff har like mange protoner, og et nøytralt atom har like mange elektroner som protoner. Isotopene har derfor samme elektronkonfigurasjon og like mange valenselektroner. Det er elektronene, særlig valenselektronene, som bestemmer hvordan et atom danner bindinger og reagerer. Nøytronene påvirker bare massen (og eventuelt om kjernen er stabil eller radioaktiv), ikke de kjemiske egenskapene.',
      punkter: [
        'Samme antall protoner gir samme antall elektroner',
        'Samme elektronkonfigurasjon / like mange valenselektroner',
        'Kjemiske egenskaper bestemmes av elektronene',
        'Nøytronene påvirker bare massen (og stabiliteten)',
      ],
    },
    {
      id: 'at-22',
      niva: 3,
      type: 'forklaring',
      mal: [1],
      sporsmal: 'Forklar forskjellen på et molekyl og en kjemisk forbindelse. Gi ett eksempel på et stoff som er et molekyl, men ikke en forbindelse, og ett som er en forbindelse, men ikke et molekyl.',
      hint: 'Tenk på {{O2}} og {{NaCl}}.',
      modellsvar: 'Et molekyl er to eller flere atomer som holdes sammen av kovalente bindinger. En kjemisk forbindelse er et stoff som består av minst to ulike grunnstoffer som er kjemisk bundet. {{O2}} (eller {{N2}}) er et molekyl, men ikke en forbindelse, fordi det bare inneholder ett grunnstoff. {{NaCl}} er en forbindelse, men ikke et molekyl: det er en ioneforbindelse der ionene sitter i et ionegitter, og den minste enheten kalles en formelenhet.',
      punkter: [
        'Molekyl: atomer bundet sammen med kovalente bindinger',
        'Forbindelse: minst to ulike grunnstoffer',
        'Eksempel på molekyl som ikke er forbindelse (O₂, N₂, H₂ …)',
        'Eksempel på forbindelse som ikke er molekyl (NaCl/ioneforbindelse, formelenhet)',
      ],
    },
    {
      id: 'ps-20',
      niva: 3,
      type: 'forklaring',
      mal: [1, 6],
      sporsmal: 'Kalium reagerer kraftigere med vann enn natrium gjør. Forklar hvorfor.',
      hint: 'Hva skjer med avstanden til valenselektronet nedover i gruppen?',
      modellsvar: 'Både natrium og kalium står i gruppe 1 og har ett valenselektron som de avgir når de reagerer. Kalium har ett elektronskall mer enn natrium, så valenselektronet er lenger fra kjernen og skjermes mer av indre elektroner. Tiltrekningen fra kjernen blir svakere, og kalium har lavere ioniseringsenergi. Kalium avgir derfor elektronet lettere og reagerer kraftigere.',
      punkter: [
        'Begge har ett valenselektron som avgis',
        'K har ett skall mer, så valenselektronet er lenger fra kjernen',
        'Mer skjerming / svakere tiltrekning',
        'Lavere ioniseringsenergi, så elektronet avgis lettere',
      ],
    },
    {
      id: 'ps-21',
      niva: 3,
      type: 'flervalg',
      mal: [1, 5],
      sporsmal: 'Et grunnstoff har ioniseringsenergiene 738, 1451 og 7733 kJ/mol. I hvilken gruppe står det?',
      alternativer: ['Gruppe 1', 'Gruppe 2', 'Gruppe 13', 'Gruppe 17'],
      svar: 1,
      stokk: false,
      hint: 'Se etter det store hoppet.',
      forklaring: 'Hoppet kommer etter det andre elektronet. Da begynner vi å fjerne elektroner fra et fullt indre skall. Grunnstoffet har 2 valenselektroner (det er magnesium).',
    },
    {
      id: 'ps-26',
      niva: 3,
      type: 'rekkefolge',
      mal: [1, 6],
      sporsmal: 'Ranger etter økende første ioniseringsenergi.',
      fra: 'Lavest',
      til: 'Høyest',
      elementer: ['K', 'Na', 'Mg', 'Cl', 'Ar'],
      hint: 'Ioniseringsenergien øker mot høyre og oppover.',
      forklaring: 'K (419) < Na (496) < Mg (738) < Cl (1251) < Ar (1521) kJ/mol.',
    },
    {
      id: 'be-13',
      niva: 3,
      type: 'forklaring',
      mal: [1],
      sporsmal: 'Forklar begrepene isotop og ion. Forklar også hvorfor {{^{35}Cl}} og {{^{35}Cl-}} ikke er isotoper av hverandre.',
      modellsvar: 'Isotoper er atomer av samme grunnstoff, altså med like mange protoner, men med ulikt antall nøytroner og dermed ulikt nukleontall. Et ion er et atom eller en atomgruppe med elektrisk ladning fordi antall elektroner er forskjellig fra antall protoner. {{^{35}Cl}} og {{^{35}Cl-}} har like mange protoner (17) og like mange nøytroner (18). Forskjellen er at ionet har ett elektron mer. Siden antall nøytroner er det samme, er de ikke isotoper. Det ene er et nøytralt atom, det andre et anion.',
      punkter: [
        'Isotop: samme antall protoner, ulikt antall nøytroner',
        'Ion: ladning fordi antall elektroner ≠ antall protoner',
        'Cl-35 og Cl-35⁻ har like mange nøytroner',
        'Forskjellen er antall elektroner (atom og ion)',
      ],
    },
    {
      id: 'be-14',
      niva: 3,
      type: 'forklaring',
      mal: [1, 6],
      sporsmal: 'Forklar hva elektronegativitet er, og hvorfor fluor har høyest elektronegativitet av alle grunnstoffer.',
      modellsvar: 'Elektronegativitet er et atoms evne til å trekke til seg elektronene i en kjemisk binding. Fluor har bare to elektronskall, så bindingselektronene kommer svært nær kjernen. Kjerneladningen er stor i forhold til størrelsen, og det er bare to indre elektroner (1s) som skjermer. Fluor mangler dessuten bare ett elektron på å fylle valensskallet. Tiltrekningen på et delt elektronpar blir derfor svært sterk, og fluor får EN = 4,0.',
      punkter: [
        'Definisjon: evnen til å trekke på elektronene i en binding',
        'Fluor er lite (to skall), elektronene er nær kjernen',
        'Høy kjerneladning og lite skjerming',
        'Sterk tiltrekning på bindingselektronene',
      ],
    },
    {
      id: 'be-15',
      niva: 3,
      type: 'forklaring',
      mal: [1, 17],
      sporsmal: 'Forklar begrepet formelenhet, og bruk det til å forklare forskjellen på hvordan NaCl og {{H2O}} er bygd opp.',
      modellsvar: 'NaCl er en ioneforbindelse. Den består av et stort, regelmessig gitter der {{Na+}} og {{Cl-}} holdes sammen av ionebindinger i alle retninger. Det finnes ingen avgrensede NaCl-molekyler. Formelen NaCl viser at forholdet mellom ionene er 1 : 1, og den minste enheten med dette forholdet kalles en formelenhet. {{H2O}} består av avgrensede molekyler der to H-atomer er bundet kovalent til ett O-atom. Mellom vannmolekylene virker svake bindinger (hydrogenbindinger). Derfor bruker vi «molekyl» om vann og «formelenhet» om NaCl.',
      punkter: [
        'NaCl er et ionegitter uten avgrensede molekyler',
        'Formelenheten viser forholdet mellom ionene (1 : 1)',
        'H₂O består av avgrensede molekyler med kovalente bindinger',
        'Mellom vannmolekylene virker svake bindinger',
      ],
    },
  ],
  flashcards: [
    {
      f: 'Isotoper',
      b: 'Atomer av samme grunnstoff med ulikt antall nøytroner. Samme kjemiske egenskaper, ulik masse.',
    },
    { f: 'Ion', b: 'Atom eller atomgruppe med elektrisk ladning. Antall elektroner = protoner − ladning.' },
    { f: 'Kation', b: 'Positivt ion som har avgitt elektroner, f.eks. {{Na+}}.' },
    { f: 'Anion', b: 'Negativt ion som har tatt opp elektroner, f.eks. {{Cl-}}.' },
    { f: 'Orbital', b: 'Område der elektronet sannsynligvis er. Maks 2 elektroner med motsatt spinn.' },
    {
      f: 'Ioniseringsenergi',
      b: 'Energi for å fjerne ytterste elektron fra et atom i gassfase. Øker bortover, minker nedover.',
    },
    {
      f: 'Elektronegativitet',
      b: 'Evnen til å trekke på elektronene i en binding. Øker bortover og oppover. F = 4,0.',
    },
    { f: 'Formelenhet', b: 'Minste enhet i en ioneforbindelse, f.eks. NaCl. Ioneforbindelser er ikke molekyler.' },
    {
      f: 'Andre ioniseringsenergi',
      b: 'Energien som trengs for å fjerne elektron nummer to. Alltid høyere enn den første. Et stort hopp viser at et fullt indre skall er nådd.',
    },
    {
      f: 'Formelenhet eller molekyl?',
      b: 'Ioneforbindelser (NaCl) består av formelenheter i et gitter. Molekylære stoffer ({{H2O}}) består av avgrensede molekyler.',
    },
  ],
});
