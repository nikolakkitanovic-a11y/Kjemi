/*
 * Modul 10: Hva skjer hvis?
 * Læringsmål: 11
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */
KJ.modul({
  id: 'hva-skjer',
  nr: 10,
  tittel: 'Hva skjer hvis?',
  beskrivelse: 'Forutsi hvordan polaritet og samspill med vann endres når atomgrupper byttes, legges til eller fjernes.',
  mal: [11],
  farge: '#1C9E6E',
  bolge: 512,
  huskeliste: [
    'OH, {{NH2}} eller en ladet gruppe → mer polar, flere bindinger til vann, mer løselig.',
    'Lengre karbonkjede → større upolar del, mindre løselig i vann, sterkere London-krefter.',
    'Symmetri kan oppheve dipolene ({{CH4}} → {{CCl4}} er fortsatt upolart).',
  ],
  teori: [
    {
      h: 'Løselighet: likt løser likt',
      tekst: `Et stoff løses godt når det kan danne like sterke bindinger til løsemiddelet som det har til seg selv.

- **Polare stoffer og ioneforbindelser** løses i polare løsemidler som vann (NaCl, sukker, etanol).
- **Upolare stoffer** løses i upolare løsemidler som heksan og bensin (fett, olje, {{I2}}).

Stoffer som løses godt i vann kalles **hydrofile**, stoffer som ikke gjør det kalles **hydrofobe**. I alkoholer gjør OH-gruppen molekylet hydrofilt, mens karbonkjeden er hydrofob. Jo lengre karbonkjede, desto dårligere løses alkoholen i vann.`,
    },
    {
      h: 'Hva skjer når atomgrupper endres?',
      tekst: `Still deg tre spørsmål om den nye gruppen:
1. Gir den polare bindinger (stor ΔEN)?
2. Kan den danne hydrogenbindinger med vann (H bundet til N, O eller F, eller ledige elektronpar på N eller O)?
3. Er den ladet? Da kan den danne ion-dipol-bindinger med vann.

Vurder også hvor stor den upolare delen av molekylet er, og om molekylet blir symmetrisk.`,
      tabell: {
        hode: ['Endring', 'Effekt på polaritet', 'Samspill med vann'],
        rader: [
          ['H byttes med OH', 'Polar O–H-binding', 'Hydrogenbindinger, mer løselig'],
          ['COOH blir til {{COO-}}', 'Gruppen blir ladet', 'Ion-dipol, mye mer løselig'],
          ['H byttes med {{NH2}}', 'Polare N–H-bindinger', 'Hydrogenbindinger, mer løselig'],
          ['H byttes med Cl', 'Polar C–Cl-binding (dipol hvis usymmetrisk)', 'Ingen hydrogenbindinger, lite løselig'],
          ['Lengre karbonkjede', 'Større upolar del', 'Mindre løselig, sterkere London-krefter'],
          ['Alle H byttes likt (CH₄ → CCl₄)', 'Symmetrisk, dipolene opphever hverandre', 'Upolart, lite løselig'],
        ],
      },
    },
  ],
  begreper: [
    { term: 'Likt løser likt', def: 'Polare stoffer løses i polare løsemidler, upolare i upolare.' },
    { term: 'Hydrofil / hydrofob', def: 'Vannelskende (løses i vann) / vannskyende (løses ikke i vann).' },
  ],
  eksempler: [],
  feller: [
    'En polar binding gjør ikke alltid molekylet polart. Sjekk symmetrien.',
    'C–Cl er polar, men Cl gir ikke hydrogenbindinger. Klorerte hydrokarboner løses dårlig i vann.',
    'Store molekyler kan ha både en hydrofil og en hydrofob del. Det er forholdet mellom delene som avgjør løseligheten.',
  ],
  oppgaver: [
    {
      id: 'hs-01',
      niva: 1,
      type: 'flervalg',
      mal: [11],
      sporsmal: 'Metan, {{CH4}}, løses dårlig i vann. Hva skjer med løseligheten hvis ett H-atom byttes med en OH-gruppe, slik at vi får metanol, {{CH3OH}}?',
      alternativer: [
        'Den øker fordi OH-gruppen kan danne hydrogenbindinger med vann',
        'Den minker fordi molekylet blir større',
        'Den er uendret',
        'Den øker fordi molekylet blir upolart',
      ],
      svar: 0,
    },
    {
      id: 'hs-02',
      niva: 1,
      type: 'flervalg',
      mal: [11],
      sporsmal: 'Hva skjer med løseligheten i vann når karbonkjeden i en alkohol blir lengre?',
      alternativer: [
        'Den minker fordi den upolare delen blir større',
        'Den øker fordi molekylet får flere atomer',
        'Den er uendret fordi OH-gruppen er den samme',
        'Den øker fordi London-kreftene blir sterkere',
      ],
      svar: 0,
    },
    {
      id: 'hs-11',
      niva: 1,
      type: 'flervalg',
      mal: [11],
      sporsmal: 'Etanol, {{C2H5OH}}, koker ved 78 °C. Hva skjer med kokepunktet hvis OH-gruppen byttes med et H-atom, slik at vi får etan, {{C2H6}}?',
      alternativer: [
        'Kokepunktet synker kraftig, fordi hydrogenbindingene forsvinner',
        'Kokepunktet øker, fordi molekylet får flere H-atomer',
        'Kokepunktet blir omtrent det samme',
        'Kokepunktet øker, fordi etan er upolart',
      ],
      svar: 0,
      forklaring: 'Etan er upolart og har bare London-krefter mellom molekylene. Etan koker ved −89 °C.',
    },
    {
      id: 'sv-13',
      niva: 2,
      type: 'flervalg',
      mal: [11, 17],
      sporsmal: 'Hvilke stoffer løser seg godt i vann?',
      alternativer: ['NaCl', 'Etanol, {{C2H5OH}}', 'Heksan, {{C6H14}}', 'Jod, {{I2}}', 'Glukose, {{C6H12O6}}', 'Matolje'],
      svar: [0, 1, 4],
      hint: 'Vann er polart. Ioner og molekyler med OH-grupper løses godt.',
      forklaring: 'NaCl (ion-dipol), etanol og glukose (hydrogenbindinger via OH-grupper) løses godt. Heksan, jod og olje er upolare.',
      modul: 'svake-bindinger',
    },
    {
      id: 'sv-19',
      niva: 2,
      type: 'sortering',
      mal: [11],
      sporsmal: 'Hvilke stoffer er hydrofile (løses godt i vann), og hvilke er hydrofobe?',
      kategorier: ['Hydrofil', 'Hydrofob'],
      elementer: [
        ['{{CH3OH}}', 0],
        ['{{KCl}}', 0],
        ['{{C8H18}}', 1],
        ['{{NH3}}', 0],
        ['{{CCl4}}', 1],
        ['{{C6H12O6}}', 0],
        ['{{CH4}}', 1],
      ],
      modul: 'svake-bindinger',
    },
    {
      id: 'hs-03',
      niva: 2,
      type: 'flervalg',
      mal: [11, 8],
      sporsmal: 'Etan, {{C2H6}}, er upolart. Hva skjer hvis ett H-atom byttes med Cl, slik at vi får kloretan, {{C2H5Cl}}?',
      alternativer: [
        'Molekylet får en polar C–Cl-binding og blir en dipol, men kan ikke danne hydrogenbindinger',
        'Molekylet blir upolart',
        'Molekylet danner hydrogenbindinger med vann',
        'Molekylet blir et ion',
      ],
      svar: 0,
    },
    {
      id: 'hs-04',
      niva: 2,
      type: 'flervalg',
      mal: [11, 8],
      sporsmal: 'Hva skjer med polariteten hvis alle fire H-atomene i {{CH4}} byttes med Cl, slik at vi får {{CCl4}}?',
      alternativer: [
        'Bindingene blir polare, men molekylet er symmetrisk og upolart',
        'Molekylet blir en sterk dipol',
        'Molekylet danner hydrogenbindinger',
        'Bindingene blir upolare',
      ],
      svar: 0,
    },
    {
      id: 'hs-05',
      niva: 2,
      type: 'flervalg',
      mal: [11],
      sporsmal: 'Hva skjer med samspillet med vann hvis en COOH-gruppe gjøres om til {{COO-}} (for eksempel når syren reagerer med en base)?',
      alternativer: [
        'Gruppen blir ladet og danner ion-dipol-bindinger med vann, så løseligheten øker',
        'Løseligheten minker fordi gruppen mister et H-atom',
        'Ingenting endres',
        'Molekylet blir upolart',
      ],
      svar: 0,
    },
    {
      id: 'hs-06',
      niva: 2,
      type: 'sortering',
      mal: [11],
      sporsmal: 'Øker eller minker løseligheten i vann ved endringen?',
      kategorier: ['Øker', 'Minker'],
      elementer: [
        ['Legger til en OH-gruppe', 0],
        ['Gjør karbonkjeden lengre', 1],
        ['Gjør COOH om til {{COO-}}', 0],
        ['Fjerner OH-gruppen fra en alkohol', 1],
        ['Legger til en {{NH2}}-gruppe', 0],
        ['Bytter en OH-gruppe med {{CH3}}', 1],
      ],
    },
    {
      id: 'hs-10',
      niva: 2,
      type: 'flervalg',
      mal: [11],
      sporsmal: 'Natriumacetat, {{CH3COONa}}, løses godt i vann selv om acetationet har en upolar {{CH3}}-gruppe. Hvorfor?',
      alternativer: [
        'Den ladde {{COO-}}-gruppen danner ion-dipol-bindinger med vann, og den upolare delen er liten',
        'CH₃-gruppen danner hydrogenbindinger',
        'Natrium reagerer med vann',
        'Acetationet er upolart',
      ],
      svar: 0,
    },
    {
      id: 'hs-12',
      niva: 2,
      type: 'flervalg',
      mal: [11, 8],
      sporsmal: '{{CCl4}} er upolart. Hva skjer hvis ett Cl-atom byttes med et H-atom, slik at vi får {{CHCl3}}?',
      alternativer: [
        'Molekylet blir en dipol, fordi det ikke lenger er symmetrisk',
        'Molekylet forblir upolart, fordi formen fortsatt er tetraedrisk',
        'Molekylet blir et ion',
        'Molekylet får hydrogenbindinger',
      ],
      svar: 0,
      forklaring: 'Formen er fortsatt tetraedrisk, men atomene rundt C er ikke lenger like. De polare C–Cl-bindingene opphever ikke hverandre, og molekylet blir en dipol. Det får ikke hydrogenbindinger, fordi H er bundet til C.',
    },
    {
      id: 'hs-13',
      niva: 2,
      type: 'flervalg',
      mal: [11],
      sporsmal: 'Etan, {{CH3CH3}}, løses svært dårlig i vann. Hva skjer med løseligheten hvis én {{CH3}}-gruppe byttes med en {{NH2}}-gruppe, slik at vi får metylamin, {{CH3NH2}}?',
      alternativer: [
        'Løseligheten øker, fordi {{NH2}} kan danne hydrogenbindinger med vann',
        'Løseligheten minker, fordi N er tyngre enn C',
        'Ingen endring, fordi begge er gasser',
        'Løseligheten øker, fordi molekylet blir upolart',
      ],
      svar: 0,
      forklaring: 'N–H er polar, og N har et ledig elektronpar. Metylamin danner hydrogenbindinger med vann og løses svært godt.',
    },
    {
      id: 'hs-14',
      niva: 2,
      type: 'flervalg',
      mal: [11],
      sporsmal: 'En {{NH2}}-gruppe på et stort molekyl tar opp et hydrogenion og blir til {{NH3+}}. Hva skjer med samspillet mellom denne delen av molekylet og vann?',
      alternativer: [
        'Det blir sterkere: hydrogenbindinger erstattes av ion-dipol-bindinger',
        'Det blir svakere, fordi gruppen får flere H-atomer',
        'Det blir uendret',
        'Gruppen blir hydrofob',
      ],
      svar: 0,
      forklaring: 'En gruppe med hel ladning trekker sterkere på vannmolekylene (ion-dipol) enn en polar gruppe uten ladning. Derfor øker løseligheten i vann.',
    },
    {
      id: 'sv-23',
      niva: 3,
      type: 'flervalg',
      mal: [11],
      sporsmal: 'Etanol ({{C2H5OH}}) og dimetyleter ({{CH3OCH3}}) har samme molekylformel, {{C2H6O}}. Etanol koker ved 78 °C, dimetyleter ved −24 °C. Hvorfor?',
      alternativer: [
        'Etanol har en OH-gruppe og danner hydrogenbindinger; i dimetyleter er ingen H bundet til O',
        'Dimetyleter har færre elektroner',
        'Etanol er en ioneforbindelse',
        'Dimetyleter er et lineært molekyl',
      ],
      svar: 0,
      modul: 'svake-bindinger',
    },
    {
      id: 'sv-25',
      niva: 3,
      type: 'rekkefolge',
      mal: [11],
      sporsmal: 'Ranger alkoholene etter økende løselighet i vann.',
      fra: 'Minst løselig',
      til: 'Mest løselig',
      elementer: ['{{C6H13OH}}', '{{C5H11OH}}', '{{C4H9OH}}', '{{C2H5OH}}'],
      hint: 'OH-gruppen er hydrofil, karbonkjeden er hydrofob.',
      forklaring: 'Jo lengre den upolare karbonkjeden er, desto mindre del av molekylet kan danne hydrogenbindinger med vann. Etanol er blandbar med vann i alle forhold.',
      modul: 'svake-bindinger',
    },
    {
      id: 'hs-07',
      niva: 3,
      type: 'flervalg',
      mal: [11, 8],
      sporsmal: '{{CO2}} er upolart, men {{SO2}} er en dipol. Hva er forklaringen?',
      alternativer: [
        '{{SO2}} er vinklet fordi S har et ledig elektronpar, mens {{CO2}} er lineært',
        'S er mer elektronegativt enn O',
        '{{SO2}} har hydrogenbindinger',
        'C=O-bindingene er upolare',
      ],
      svar: 0,
    },
    {
      id: 'hs-08',
      niva: 3,
      type: 'forklaring',
      mal: [11, 9],
      sporsmal: 'Butan, {{C4H10}}, er nesten uløselig i vann og koker ved −1 °C. Forutsi hva som skjer med løseligheten og kokepunktet hvis ett H-atom i enden byttes med en OH-gruppe (butan-1-ol). Begrunn.',
      modellsvar: 'Butan er upolart og har bare London-krefter. Når ett H byttes med en OH-gruppe, får molekylet en polar O–H-binding. Butan-1-ol kan danne hydrogenbindinger både til andre butan-1-ol-molekyler og til vann. Kokepunktet øker kraftig (butan-1-ol koker ved 118 °C), fordi hydrogenbindingene må brytes. Løseligheten i vann øker, men bare delvis (ca. 7,7 g per 100 mL), fordi karbonkjeden på fire C-atomer fortsatt er en stor, upolar og hydrofob del.',
      punkter: [
        'OH-gruppen gir en polar binding',
        'Hydrogenbindinger mellom molekylene og til vann',
        'Kokepunktet øker',
        'Løseligheten øker, men begrenses av den upolare karbonkjeden',
      ],
    },
    {
      id: 'hs-09',
      niva: 3,
      type: 'forklaring',
      mal: [11, 17],
      sporsmal: 'Glukose, {{C6H12O6}}, har fem OH-grupper og løses svært godt i vann, mens heksan, {{C6H14}}, ikke løses. Forklar, og forutsi hva som ville skjedd med løseligheten hvis alle OH-gruppene i glukose ble byttet med {{CH3}}-grupper.',
      modellsvar: 'Glukose har mange OH-grupper som kan danne hydrogenbindinger med vannmolekylene. Molekylet er derfor hydrofilt og løses godt. Heksan har bare C–H- og C–C-bindinger, som er upolare. Mellom heksan og vann kan det bare virke svake London-krefter, og vannmolekylene holder heller sammen med hydrogenbindinger seg imellom. Hvis OH-gruppene i glukose byttes med {{CH3}}, forsvinner muligheten for hydrogenbindinger via O–H, og molekylet blir mye mer upolart. Løseligheten i vann vil da synke kraftig.',
      punkter: [
        'OH-grupper danner hydrogenbindinger med vann',
        'Heksan er upolart med bare London-krefter',
        'Likt løser likt',
        'CH₃ i stedet for OH gir mindre polart molekyl og lavere løselighet',
      ],
    },
    {
      id: 'hs-15',
      niva: 3,
      type: 'forklaring',
      mal: [11, 9],
      sporsmal: 'Dietyleter, {{CH3CH2OCH2CH3}}, og butan-1-ol, {{CH3CH2CH2CH2OH}}, har samme molekylformel, {{C4H10O}}. Den ene koker ved 35 °C og den andre ved 118 °C. Forutsi hvilken som har høyest kokepunkt, og forklar.',
      fagbegreper: ['hydrogenbinding', 'London', 'dipol-dipol', 'kokepunkt'],
      modellsvar: `**Butan-1-ol** har høyest kokepunkt (118 °C), og dietyleter koker ved 35 °C.

Begge har like mange elektroner og omtrent like store **London-krefter**.

I butan-1-ol er H bundet direkte til O i en OH-gruppe. Molekylene kan derfor danne **hydrogenbindinger** til hverandre.

I dietyleter sitter O mellom to karbonatomer. Ingen H er bundet til O, så etermolekylene kan ikke danne hydrogenbindinger til hverandre. Det blir bare svake **dipol-dipol-krefter** i tillegg til London-kreftene.

Hydrogenbindingene krever mer energi å bryte, så butan-1-ol koker ved høyere temperatur. Det viser at det er **hvordan** atomene er bundet, ikke bare hvilke atomer molekylet har, som avgjør egenskapene.`,
      punkter: [
        'Butan-1-ol har høyest kokepunkt',
        'Like London-krefter (samme antall elektroner)',
        'Butan-1-ol: H på O → hydrogenbindinger',
        'Eter: ingen H på O → ingen hydrogenbindinger mellom molekylene',
        'Strukturen avgjør, ikke bare formelen',
      ],
    },
  ],
  flashcards: [
    { f: 'Likt løser likt', b: 'Polare stoffer løses i polare løsemidler, upolare i upolare.' },
    { f: 'Hydrofil / hydrofob', b: 'Vannelskende / vannskyende.' },
    { f: 'OH-gruppe', b: 'Hydrofil. Polar O–H-binding som kan danne hydrogenbindinger med vann.' },
    { f: 'Lang karbonkjede', b: 'Hydrofob. Bare London-krefter, gjør molekylet mindre løselig i vann.' },
  ],
});
