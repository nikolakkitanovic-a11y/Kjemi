/*
 * Modul 9: Bindinger og krefter
 * Læringsmål: 9, 10
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */
KJ.modul({
  id: 'krefter',
  nr: 9,
  tittel: 'Bindinger og krefter',
  beskrivelse: 'Kovalente bindinger, London-krefter, dipol-dipol, hydrogenbindinger og ion-dipol, også i strukturtegninger.',
  mal: [9, 10],
  farge: '#3E9F3F',
  bolge: 528,
  teori: [
    {
      h: 'Hva er svake bindinger?',
      tekst: `Svake bindinger, eller **intermolekylære krefter**, virker *mellom* molekyler. De er mye svakere enn kovalente bindinger og ionebindinger, men de bestemmer mange egenskaper ved molekylære stoffer:

- kokepunkt og smeltepunkt
- viskositet (hvor seigtflytende en væske er)
- løselighet
- overflatespenning

Når et molekylært stoff koker, brytes de svake bindingene mellom molekylene, **ikke** de kovalente bindingene inne i molekylene. Når vann koker, er dampen fortsatt {{H2O}}.

London-krefter og dipol-dipol-krefter kalles samlet **van der Waals-krefter**.`,
    },
    {
      h: 'London-krefter',
      tekst: `London-krefter (dispersjonskrefter) virker mellom **alle** molekyler og atomer, også upolare.

Elektronene beveger seg hele tiden. I et lite øyeblikk kan det være flere elektroner på den ene siden av molekylet enn på den andre. Da oppstår en **midlertidig dipol**. Den **induserer** (fremkaller) en dipol i nabomolekylet, og de to tiltrekker hverandre.

London-kreftene blir **sterkere** når
- molekylet har **flere elektroner** (større elektronsky som er lettere å forskyve, altså mer polariserbar)
- molekylet har **større kontaktflate** (lange, rette molekyler mer enn kuleformede)

Derfor øker kokepunktet nedover i gruppe 18 og gruppe 17: {{F2}} og {{Cl2}} er gasser, {{Br2}} er væske og {{I2}} er fast stoff ved romtemperatur.`,
      tabell: {
        hode: ['Edelgass', 'He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'],
        rader: [['Kokepunkt (°C)', '−269', '−246', '−186', '−153', '−108', '−62']],
      },
    },
    {
      h: 'Dipol-dipol-krefter',
      tekst: `Mellom **dipolmolekyler** virker dipol-dipol-krefter: Den positive siden ($\\delta^+$) av ett molekyl tiltrekker den negative siden ($\\delta^-$) av et annet. Jo større dipolmoment (større ΔEN og usymmetrisk form), desto sterkere kraft.

Dipol-dipol-krefter kommer **i tillegg til** London-kreftene. Eksempler: HCl, {{H2S}}, CO, HBr.`,
    },
    {
      h: 'Hydrogenbindinger',
      tekst: `En **hydrogenbinding** er en spesielt sterk dipol-dipol-binding. Den oppstår når et H-atom som er **bundet til N, O eller F** i ett molekyl, tiltrekkes av et **ledig elektronpar på N, O eller F** i et annet molekyl.

N, O og F er svært elektronegative og små. H-atomet blir sterkt positivt og kan komme tett inntil det ledige elektronparet.

Merk: Hydrogenbindingen er tiltrekningen **mellom** molekylene (vist med stiplet linje O–H···O), ikke selve O–H-bindingen i molekylet.

Hydrogenbindinger forklarer at
- {{H2O}} koker ved 100 °C, mens {{H2S}} koker ved −60 °C
- HF koker ved 20 °C, mens HCl koker ved −85 °C
- {{NH3}} koker ved −33 °C, mens {{PH3}} koker ved −88 °C
- is har lavere tetthet enn vann: hydrogenbindingene låser molekylene i en åpen gitterstruktur, så is flyter`,
    },
    {
      h: 'Ion-dipol-krefter og krystallvann',
      tekst: `En **ion-dipol-binding** er tiltrekningen mellom et ion og et dipolmolekyl. Når NaCl løses i vann, vender vannmolekylene den negative O-siden mot {{Na+}} og H-siden mot {{Cl-}}. Ionene omgis av vannmolekyler. De **hydratiseres**.

I noen salter er vannmolekyler bundet til ionene i krystallen. Det kalles **krystallvann**, og saltet er et **hydrat**. Kobber(II)sulfatpentahydrat, {{CuSO4*5H2O}}, er blått. Varmer du det, går krystallvannet bort, og det vannfrie {{CuSO4}} er hvitt.`,
    },
    {
      h: 'Sammenligne kokepunkter',
      tekst: `Slik går du frem:
1. Hvilke krefter finnes? London alltid; dipol-dipol hvis dipolmolekyl; hydrogenbinding hvis H er bundet til N, O eller F.
2. Er molekylene omtrent like store, avgjør den sterkeste krafttypen.
3. Har molekylene samme krafttype, avgjør størrelse (antall elektroner) og form.

Typisk styrke: London (små molekyler) < dipol-dipol < hydrogenbinding < ion-dipol, og alle er mye svakere enn ionebinding og kovalent binding. Store molekyler kan likevel ha så sterke London-krefter at de overgår hydrogenbindingene i små molekyler.`,
    },
  ],
  begreper: [
    { term: 'Intermolekylære krefter', def: 'Svake bindinger mellom molekyler.' },
    { term: 'van der Waals-krefter', def: 'Samlebetegnelse for London-krefter og dipol-dipol-krefter.' },
    {
      term: 'London-krefter',
      def: 'Tiltrekning mellom midlertidige og induserte dipoler. Finnes mellom alle molekyler.',
    },
    { term: 'Dipol-dipol-krefter', def: 'Tiltrekning mellom permanente dipolmolekyler.' },
    {
      term: 'Hydrogenbinding',
      def: 'H bundet til N, O eller F tiltrekkes av et ledig elektronpar på N, O eller F i et annet molekyl.',
    },
    { term: 'Ion-dipol-binding', def: 'Tiltrekning mellom et ion og et dipolmolekyl, f.eks. når salt løses i vann.' },
    { term: 'Krystallvann', def: 'Vannmolekyler bundet til ionene i en saltkrystall (hydrat).' },
  ],
  eksempler: [
    {
      tittel: 'Hvorfor koker vann ved 100 °C?',
      oppgave: 'Sammenlign kokepunktet til {{H2O}} (100 °C) og {{H2S}} (−60 °C).',
      steg: [
        'Begge er vinklede dipolmolekyler med London- og dipol-dipol-krefter.',
        'I {{H2O}} er H bundet til O (EN 3,5). Det gir hydrogenbindinger mellom molekylene.',
        'S har lavere EN (2,5), så {{H2S}} har ikke hydrogenbindinger.',
        'Hydrogenbindingene krever mye mer energi å bryte, så {{H2O}} koker ved mye høyere temperatur, selv om {{H2S}} har flere elektroner.',
      ],
    },
  ],
  feller: [
    'Hydrogenbinding er bindingen **mellom** molekylene, ikke O–H-bindingen inne i molekylet.',
    'H må være bundet **direkte** til N, O eller F. {{CH3F}} og {{CH3OCH3}} har ikke hydrogenbindinger mellom egne molekyler.',
    'London-krefter blir ikke «mer permanente» i store atomer. De blir **sterkere** fordi elektronskyen er lettere å forskyve.',
    'Når et molekylært stoff koker, brytes ikke de kovalente bindingene.',
    'Et stort molekyl kan ha flere typer krefter samtidig: hydrogenbindinger ved OH-gruppen og London-krefter langs karbonkjeden.',
  ],
  oppgaver: [
    {
      id: 'sb-01',
      niva: 1,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'Hvilken type binding er det mellom natrium og klor i NaCl?',
      alternativer: ['Ionebinding', 'Upolar kovalent binding', 'Metallbinding', 'Hydrogenbinding'],
      svar: 0,
      hint: 'Natrium er et metall, klor er et ikke-metall.',
    },
    {
      id: 'sb-03',
      niva: 1,
      type: 'sortering',
      mal: [9],
      sporsmal: 'Hvilken binding holder stoffene sammen?',
      kategorier: ['Ionebinding', 'Kovalent', 'Metallbinding'],
      elementer: [
        ['{{NaCl}}', 0],
        ['{{H2O}}', 1],
        ['{{Cu}}', 2],
        ['{{MgO}}', 0],
        ['{{CH4}}', 1],
        ['{{Fe}}', 2],
        ['{{KBr}}', 0],
        ['{{CO2}}', 1],
        ['Messing (Cu + Zn)', 2],
      ],
      hint: 'Metall + ikke-metall → ionebinding. Ikke-metall + ikke-metall → kovalent. Metall + metall → metallbinding.',
    },
    {
      id: 'sb-06',
      niva: 1,
      type: 'kobling',
      mal: [9],
      sporsmal: 'Koble bindingstypen med riktig beskrivelse.',
      par: [
        ['Ionebinding', 'tiltrekning mellom positive og negative ioner'],
        ['Upolar kovalent binding', 'elektronparet deles likt'],
        ['Polar kovalent binding', 'elektronparet er forskjøvet mot det mest elektronegative atomet'],
        ['Metallbinding', 'kationer i en sjø av delokaliserte elektroner'],
      ],
    },
    {
      id: 'sv-01',
      niva: 1,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'Hva er intermolekylære krefter?',
      alternativer: [
        'Krefter mellom molekyler',
        'Krefter mellom atomene inne i et molekyl',
        'Krefter mellom protoner og nøytroner',
        'Bindinger mellom ioner i et salt',
      ],
      svar: 0,
      hint: '«Inter» betyr «mellom».',
    },
    {
      id: 'sv-02',
      niva: 1,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'Hva brytes når vann koker?',
      alternativer: [
        'Hydrogenbindingene mellom vannmolekylene',
        'O–H-bindingene inne i vannmolekylene',
        'Ionebindinger mellom H⁺ og O²⁻',
        'Ingenting, vann fordamper uten at noe brytes',
      ],
      svar: 0,
      hint: 'Vanndamp er fortsatt {{H2O}}.',
    },
    {
      id: 'sv-03',
      niva: 1,
      type: 'kobling',
      mal: [9],
      sporsmal: 'Koble kraften med riktig beskrivelse.',
      par: [
        ['London-krefter', 'midlertidige og induserte dipoler'],
        ['Dipol-dipol-krefter', 'permanente dipoler tiltrekker hverandre'],
        ['Hydrogenbinding', 'H bundet til N, O eller F mot et ledig elektronpar'],
        ['Ion-dipol-binding', 'et ion og et polart molekyl'],
      ],
    },
    {
      id: 'sv-04',
      niva: 1,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'Hvilken type kraft finnes mellom **alle** molekyler?',
      alternativer: ['London-krefter', 'Dipol-dipol-krefter', 'Hydrogenbindinger', 'Ion-dipol-krefter'],
      svar: 0,
    },
    {
      id: 'sv-05',
      niva: 1,
      type: 'fyllinn',
      mal: [9],
      sporsmal: 'Fyll inn.',
      tekst: 'London-krefter og dipol-dipol-krefter kalles samlet for ___-krefter.',
      svar: [['van der Waals', 'van der waals', 'van der Waalske', 'vanderwaals', 'van-der-waals']],
    },
    {
      id: 'sv-06',
      niva: 1,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'Hvilket stoff har hydrogenbindinger mellom molekylene?',
      alternativer: ['{{NH3}}', '{{CH4}}', '{{H2S}}', '{{HCl}}'],
      svar: 0,
      hint: 'H må være bundet til N, O eller F.',
    },
    {
      id: 'sv-08',
      niva: 1,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'Hvorfor øker kokepunktet nedover blant edelgassene (He → Rn)?',
      alternativer: [
        'Flere elektroner gir sterkere London-krefter',
        'Atomene får hydrogenbindinger',
        'Atomene blir dipoler',
        'Atomene danner kovalente bindinger',
      ],
      svar: 0,
    },
    {
      id: 'sv-09',
      niva: 1,
      type: 'fyllinn',
      mal: [9],
      sporsmal: 'Fyll inn.',
      tekst: 'Vannmolekyler som er bundet til ionene i en saltkrystall, kalles ___.',
      svar: [['krystallvann']],
    },
    {
      id: 'sv-10',
      niva: 2,
      type: 'sortering',
      mal: [9],
      sporsmal: 'Hva er den sterkeste typen kraft mellom molekylene i hvert stoff?',
      kategorier: ['London', 'Dipol-dipol', 'Hydrogenbinding'],
      elementer: [
        ['{{CH4}}', 0],
        ['{{HCl}}', 1],
        ['{{H2O}}', 2],
        ['{{I2}}', 0],
        ['{{HF}}', 2],
        ['{{H2S}}', 1],
        ['{{CO2}}', 0],
        ['{{NH3}}', 2],
        ['{{CO}}', 1],
        ['{{S8}}', 0],
      ],
      hint: 'Er molekylet en dipol? Er H bundet til N, O eller F?',
    },
    {
      id: 'sv-11',
      niva: 2,
      type: 'rekkefolge',
      mal: [9],
      sporsmal: 'Ranger halogenene etter økende kokepunkt.',
      fra: 'Lavest',
      til: 'Høyest',
      elementer: ['{{F2}}', '{{Cl2}}', '{{Br2}}', '{{I2}}'],
      hint: 'Alle er upolare. Hva skiller dem?',
      forklaring: 'Flere elektroner nedover gir sterkere London-krefter: {{F2}} (−188 °C) < {{Cl2}} (−34 °C) < {{Br2}} (59 °C) < {{I2}} (184 °C).',
    },
    {
      id: 'sv-12',
      niva: 2,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'HF koker ved 20 °C og HCl ved −85 °C. Hva er den beste forklaringen?',
      alternativer: [
        'HF danner hydrogenbindinger, HCl gjør det ikke',
        'HCl har færre elektroner enn HF',
        'HF er et ionisk stoff',
        'HCl er upolart',
      ],
      svar: 0,
    },
    {
      id: 'sv-14',
      niva: 2,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'Hvilket hydrokarbon har høyest kokepunkt?',
      alternativer: ['{{CH4}}', '{{C2H6}}', '{{C3H8}}', '{{C4H10}}'],
      svar: 3,
      stokk: false,
      hint: 'Alle er upolare. Størst molekyl gir sterkest London-krefter.',
    },
    {
      id: 'sv-15',
      niva: 2,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'Hvilken type binding dannes mellom {{Na+}} og vannmolekylene når NaCl løses i vann?',
      alternativer: ['Ion-dipol-binding', 'Hydrogenbinding', 'Kovalent binding', 'London-krefter'],
      svar: 0,
    },
    {
      id: 'sv-16',
      niva: 2,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'Pentan (rett kjede) koker ved 36 °C, mens 2,2-dimetylpropan (kuleformet) koker ved 9,5 °C. Begge er {{C5H12}}. Hvorfor?',
      alternativer: [
        'Den rette kjeden gir større kontaktflate og sterkere London-krefter',
        'Pentan har flere elektroner',
        'Pentan danner hydrogenbindinger',
        'Det kuleformede molekylet er en dipol',
      ],
      svar: 0,
      hint: 'Molekylene har like mange elektroner. Hva er forskjellig?',
    },
    {
      id: 'sv-17',
      niva: 2,
      type: 'flervalg',
      mal: [9],
      sporsmal: '{{H2O}} koker ved 100 °C, mens {{H2S}} koker ved −60 °C. Hvorfor?',
      alternativer: [
        'Vann har hydrogenbindinger mellom molekylene',
        'Vann har flere elektroner',
        '{{H2S}} er et upolart molekyl',
        'O–H-bindingene må brytes når vann koker',
      ],
      svar: 0,
    },
    {
      id: 'sv-20',
      niva: 3,
      type: 'forklaring',
      mal: [9],
      sporsmal: 'Forklar hvorfor {{H2O}} har mye høyere kokepunkt enn {{H2S}}, selv om {{H2S}} har flere elektroner.',
      modellsvar: 'Begge er vinklede dipolmolekyler. I {{H2O}} er H bundet til oksygen, som er svært elektronegativt (EN 3,5). O–H-bindingen blir sterkt polar, og vannmolekylene danner hydrogenbindinger til hverandre: H i ett molekyl tiltrekkes av et ledig elektronpar på O i et annet. Svovel har lavere elektronegativitet (EN 2,5), så {{H2S}} har bare dipol-dipol- og London-krefter. {{H2S}} har flere elektroner og derfor litt sterkere London-krefter, men det veier ikke opp for hydrogenbindingene i vann. Det trengs mye mer energi for å skille vannmolekylene fra hverandre, og kokepunktet blir høyere.',
      punkter: [
        'H₂O danner hydrogenbindinger fordi H er bundet til O (høy EN)',
        'H₂S har bare dipol-dipol- og London-krefter (S har lavere EN)',
        'H₂S har sterkere London-krefter, men det veier ikke opp for hydrogenbindingene',
        'Det kreves mer energi for å bryte hydrogenbindingene → høyere kokepunkt',
      ],
    },
    {
      id: 'sv-22',
      niva: 3,
      type: 'forklaring',
      mal: [9],
      sporsmal: 'Forklar hva London-krefter er, og hvorfor de blir sterkere fra {{F2}} til {{I2}}.',
      modellsvar: 'Elektronene i et molekyl er i bevegelse, og i et øyeblikk kan de være ujevnt fordelt. Da får molekylet en midlertidig dipol. Den negative siden frastøter elektronene i nabomolekylet, slik at det også blir en dipol (indusert dipol). De to dipolene tiltrekker hverandre, og det er dette vi kaller London-krefter. Nedover i gruppe 17 får molekylene flere elektroner og større elektronsky. En stor elektronsky er lettere å forskyve (mer polariserbar), så de midlertidige dipolene blir sterkere. Derfor øker kokepunktet: {{F2}} og {{Cl2}} er gasser, {{Br2}} er væske og {{I2}} er fast stoff ved romtemperatur.',
      punkter: [
        'Ujevn fordeling av elektroner gir en midlertidig dipol',
        'Den induserer en dipol i nabomolekylet, og de tiltrekker hverandre',
        'Flere elektroner / større elektronsky er lettere å polarisere',
        'Sterkere London-krefter gir høyere kokepunkt nedover i gruppen',
      ],
    },
    {
      id: 'sv-24',
      niva: 3,
      type: 'flervalg',
      mal: [9, 20],
      sporsmal: 'Hvorfor flyter is på vann?',
      alternativer: [
        'Hydrogenbindingene låser molekylene i en åpen struktur med lavere tetthet',
        'Is inneholder luftbobler',
        'Molekylene i is er mindre enn i flytende vann',
        'Is har ingen hydrogenbindinger',
      ],
      svar: 0,
    },
    {
      id: 'sv-26',
      niva: 3,
      type: 'flervalg',
      mal: [9],
      sporsmal: 'Hvilket av stoffene har høyest kokepunkt?',
      alternativer: ['{{H2O}}', '{{HF}}', '{{NH3}}', '{{CH4}}'],
      svar: 0,
      hint: 'Hvor mange hydrogenbindinger kan hvert molekyl være med i?',
      forklaring: 'Kokepunkter: {{H2O}} 100 °C, HF 20 °C, {{NH3}} −33 °C, {{CH4}} −161 °C. Hvert vannmolekyl har to H-atomer og to ledige elektronpar og kan derfor delta i opptil fire hydrogenbindinger.',
    },
    {
      id: 'sv-27',
      niva: 3,
      type: 'sortering',
      mal: [9],
      sporsmal: 'Kan molekylene danne hydrogenbindinger til hverandre (mellom like molekyler)?',
      kategorier: ['Ja', 'Nei'],
      elementer: [
        ['{{H2O}}', 0],
        ['{{NH3}}', 0],
        ['{{HF}}', 0],
        ['{{CH3OH}}', 0],
        ['{{CH4}}', 1],
        ['{{HCl}}', 1],
        ['{{H2S}}', 1],
        ['{{CH3OCH3}}', 1],
        ['{{CH3F}}', 1],
      ],
      hint: 'Se etter H-atomer som er bundet direkte til N, O eller F.',
      forklaring: 'I {{CH3F}} og {{CH3OCH3}} er alle H-atomene bundet til C. Da kan ikke molekylene danne hydrogenbindinger seg imellom.',
    },
  ],
  flashcards: [
    {
      f: 'Intermolekylære krefter',
      b: 'Svake bindinger mellom molekyler. Styrer kokepunkt, smeltepunkt, løselighet og viskositet.',
    },
    { f: 'van der Waals-krefter', b: 'London-krefter + dipol-dipol-krefter.' },
    { f: 'London-krefter', b: 'Midlertidige dipoler induserer dipoler i nabomolekyler. Finnes mellom alle molekyler.' },
    {
      f: 'Hva gjør London-krefter sterkere?',
      b: 'Flere elektroner (mer polariserbar elektronsky) og større kontaktflate.',
    },
    { f: 'Dipol-dipol-krefter', b: 'δ+ på ett dipolmolekyl tiltrekker δ− på et annet.' },
    {
      f: 'Hydrogenbinding',
      b: 'H bundet til N, O eller F tiltrekkes av et ledig elektronpar på N, O eller F i et annet molekyl.',
    },
    { f: 'Ion-dipol-binding', b: 'Tiltrekning mellom et ion og et dipolmolekyl, f.eks. {{Na+}} og vann.' },
    { f: 'Hydratisering', b: 'Ioner omgis av vannmolekyler når et salt løses i vann.' },
    { f: 'Krystallvann', b: 'Vann bundet i en saltkrystall, f.eks. {{CuSO4*5H2O}} (blått).' },
    {
      f: 'Hva brytes når et molekylært stoff koker?',
      b: 'De svake bindingene mellom molekylene, ikke de kovalente bindingene.',
    },
    { f: 'Hvorfor flyter is?', b: 'Hydrogenbindingene gir en åpen struktur med lavere tetthet enn flytende vann.' },
  ],
});
