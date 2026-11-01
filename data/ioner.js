/*
 * DE SAMMENSATTE IONENE – rett her.
 *
 * tavla: true  = ionet står på tavla / i notatene og øves i iondrillen, flashcards og saltbyggeren.
 * tavla: false = ionet er med i fila, men øves ikke. Sett til true hvis læreren tar det med.
 *
 * formel skrives som i resten av siden: NH4+ eller SO4^2- (ladning med ^ når den har tall).
 */
KJ.IONER = [
  { formel: 'NH4+', navn: 'ammonium', ladning: 1, tavla: true },
  { formel: 'OH-', navn: 'hydroksid', ladning: -1, tavla: true },
  { formel: 'NO3-', navn: 'nitrat', ladning: -1, tavla: true },
  { formel: 'CO3^2-', navn: 'karbonat', ladning: -2, tavla: true },
  { formel: 'SO4^2-', navn: 'sulfat', ladning: -2, tavla: true },
  { formel: 'PO4^3-', navn: 'fosfat', ladning: -3, tavla: true },
  { formel: 'MnO4-', navn: 'permanganat', ladning: -1, tavla: true },
  { formel: 'ClO3-', navn: 'klorat', ladning: -1, tavla: true },
  { formel: 'CN-', navn: 'cyanid', ladning: -1, tavla: true },
  // Vanlige i Kjemi 1, men ikke i notatene. Slå på ved å sette tavla: true.
  { formel: 'NO2-', navn: 'nitritt', ladning: -1, tavla: false },
  { formel: 'SO3^2-', navn: 'sulfitt', ladning: -2, tavla: false },
  { formel: 'HCO3-', navn: 'hydrogenkarbonat', ladning: -1, tavla: false },
  { formel: 'CH3COO-', navn: 'acetat', ladning: -1, tavla: false },
  { formel: 'CrO4^2-', navn: 'kromat', ladning: -2, tavla: false },
  { formel: 'Cr2O7^2-', navn: 'dikromat', ladning: -2, tavla: false },
  { formel: 'ClO-', navn: 'hypokloritt', ladning: -1, tavla: false },
];

/** Ionene som øves (tavla: true). */
KJ.tavlaIoner = () => KJ.IONER.filter((i) => i.tavla);

/** Ladning som tekst: 1+, 2−, 3− … */
KJ.ladningTekst = (q) => (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '−');

/**
 * Bygger teori, oppgaver og flashcards for modulen om sammensatte ioner ut fra lista over.
 * Id-ene bygger på navnet, så fremdriften følger ionet selv om rekkefølgen endres.
 */
KJ.ionModul = function (M) {
  const ioner = KJ.tavlaIoner();
  const lt = KJ.ladningTekst;
  const kode = (i) => i.navn.replace(/[^a-zæøå]/g, '');

  M.teori = [
    {
      h: 'Ionene fra tavla',
      tekst: `Et sammensatt ion er en gruppe atomer som er bundet sammen med kovalente bindinger, og som til sammen har en ladning. Navn, formel og ladning må pugges.

**Pugg-tips:** Lær dem i par etter ladning. Bare ammonium er positivt. Fosfat er det eneste med ladning 3−. Karbonat og sulfat har 2−. Resten har 1−.`,
      tabell: {
        hode: ['Formel', 'Navn', 'Ladning'],
        rader: ioner.map((i) => ['{{' + i.formel + '}}', i.navn, lt(i.ladning)]),
      },
    },
    {
      h: 'Sammensatte ioner i salter',
      tekst: `Sammensatte ioner oppfører seg som én enhet i formler og navn. Når det trengs mer enn ett av dem, settes ionet i parentes:

- {{Ca(OH)2}} kalsiumhydroksid (ett {{Ca^2+}}, to {{OH-}})
- {{(NH4)2SO4}} ammoniumsulfat (to {{NH4+}}, ett {{SO4^2-}})
- {{Al2(SO4)3}} aluminiumsulfat
- {{KMnO4}} kaliumpermanganat (bare ett ion, ingen parentes)`,
    },
  ];

  const nye = [];
  ioner.forEach((i) => {
    nye.push({
      id: 'io-n-' + kode(i), niva: 1, type: 'navn', mal: [14], formel: i.formel,
      sporsmal: 'Hva heter ionet {{' + i.formel + '}}?',
      svar: [i.navn, i.navn + 'ion', i.navn + 'ionet'],
    });
    nye.push({
      id: 'io-f-' + kode(i), niva: 2, type: 'formel', mal: [14], navn: i.navn,
      sporsmal: 'Skriv formelen med ladning for **' + i.navn + '**-ionet.',
      svar: i.formel,
      hint: 'Ladningen er ' + lt(i.ladning) + '. Skriv den med ^, for eksempel SO4^2-.',
    });
  });
  const ladKat = [...new Set(ioner.map((i) => i.ladning))].sort((a, b) => b - a);
  nye.push({
    id: 'io-ladning', niva: 1, type: 'sortering', mal: [14],
    sporsmal: 'Hvilken ladning har ionet?',
    kategorier: ladKat.map(lt),
    elementer: ioner.map((i) => [i.navn, ladKat.indexOf(i.ladning)]),
  });
  nye.push({
    id: 'io-kobling', niva: 1, type: 'kobling', mal: [14],
    sporsmal: 'Koble navnet med riktig formel.',
    par: ioner.map((i) => [i.navn, '{{' + i.formel + '}}']),
  });
  const positivt = ioner.find((i) => i.ladning > 0);
  if (positivt) {
    nye.push({
      id: 'io-positivt', niva: 1, type: 'flervalg', mal: [14],
      sporsmal: 'Hvilket av ionene fra tavla er positivt?',
      alternativer: [positivt].concat(ioner.filter((i) => i.ladning < 0).slice(0, 3)).map((i) => i.navn),
      svar: 0,
    });
  }
  nye.push({
    id: 'io-parentes', niva: 2, type: 'flervalg', mal: [14, 15],
    sporsmal: 'Hvorfor skriver vi {{Ca(OH)2}} og ikke {{CaOH2}}?',
    alternativer: [
      'Det er to hele {{OH-}}-ioner. Uten parentes ville 2-tallet bare gjelde H',
      'Fordi kalsium har ladning 2+',
      'Parentesen viser at OH er et molekyl',
      'Det er bare en vane, begge betyr det samme',
    ],
    svar: 0,
  });
  nye.push({
    id: 'io-elektroner', niva: 3, type: 'forklaring', mal: [14, 7],
    sporsmal: 'Forklar hva ladningen på et sammensatt ion betyr, og bruk {{NH4+}} og {{OH-}} som eksempler.',
    modellsvar: `Et sammensatt ion er en gruppe atomer som holdes sammen av kovalente bindinger, og som til sammen har enten for få eller for mange elektroner i forhold til antall protoner. {{NH4+}} har 11 protoner (7 fra N og 4 fra H), men bare 10 elektroner, og får derfor ladningen +1. {{OH-}} har 9 protoner (8 + 1), men 10 elektroner, og får ladningen −1. Ladningen tilhører hele gruppen og ikke ett bestemt atom, og den må alltid skrives med i formelen.`,
    punkter: ['Sammensatt ion: atomer bundet kovalent med samlet ladning', 'Ladning = forskjell mellom protoner og elektroner', 'NH₄⁺: 11 protoner, 10 elektroner', 'OH⁻: 9 protoner, 10 elektroner', 'Ladningen tilhører hele gruppen'],
  });
  M.oppgaver = M.oppgaver.concat(nye).sort((a, b) => a.niva - b.niva);
  if (!M.huskeliste)
    M.huskeliste = [
      'Bare **ammonium** {{NH4+}} er positivt. **Fosfat** er 3−, **karbonat** og **sulfat** er 2−. Resten er 1−.',
      'Ionet er én enhet. Parentes når det trengs mer enn ett: {{Ca(OH)2}}, {{(NH4)2SO4}}.',
    ];
  M.flashcards = ioner
    .map((i) => ({ f: '{{' + i.formel + '}}', b: i.navn + ' (ladning ' + lt(i.ladning) + ')' }))
    .concat([{ f: 'Eneste positive ion på tavla', b: 'Ammonium, {{NH4+}}' }]);
};
