/*
 * Modul 17: Anvendelse og modeller
 * Læringsmål: 20
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */
KJ.modul({
  id: 'anvendelse',
  nr: 17,
  tittel: 'Anvendelse og modeller',
  beskrivelse: 'Bruk kunnskapen i nye situasjoner, begrunn med fagbegreper og vurder begrensninger ved modeller og konklusjoner.',
  mal: [20],
  farge: '#8B3CF0',
  bolge: 410,
  teori: [
    {
      h: 'Slik svarer du på høy måloppnåelse',
      tekst: `1. **Påstand:** Svar direkte på spørsmålet.
2. **Begrunnelse med fagbegreper:** Bruk de riktige begrepene (elektronegativitet, hydrogenbinding, kjerneladning …) og forklar sammenhengen, ikke bare definisjonen.
3. **Partikkelnivå:** Knytt egenskapen (smeltepunkt, løselighet) til partiklene og bindingene.
4. **Eksempel eller tall:** Bruk et konkret eksempel eller en verdi fra tabellen.
5. **Vurdering:** Si hva modellen eller konklusjonen ikke forklarer, eller når den ikke gjelder.`,
      tabell: {
        hode: ['Lav', 'Middels', 'Høy'],
        rader: [
          [
            'Gjengir fakta og enkelte begreper',
            'Forklarer sammenhenger med fagbegreper',
            'Anvender i nye situasjoner, begrunner presist og vurderer begrensninger',
          ],
        ],
      },
    },
    {
      h: 'Modeller og begrensningene deres',
      tabell: {
        hode: ['Modell', 'Forklarer godt', 'Begrensning'],
        rader: [
          [
            'Skallmodellen (Bohr)',
            'Valenselektroner, ioneladninger, gruppe og periode',
            'Forklarer ikke 4s før 3d, Hunds regel eller unntakene Cr og Cu',
          ],
          [
            'Orbitalmodellen',
            'Fyllingsrekkefølge, uparede elektroner, unntak',
            'Mer abstrakt. Elektronet har ingen fast bane',
          ],
          [
            'Elektronprikkformler',
            'Bindinger og ledige elektronpar',
            'Viser ikke 3D-form eller delokaliserte elektroner',
          ],
          ['VSEPR', 'Molekylform og om molekylet er en dipol', 'Gir bare omtrentlige vinkler'],
          ['ΔEN-regelen (1,7)', 'Rask vurdering av bindingstype', 'Unntak: HF er kovalent, NaH er ionisk'],
          ['Elektronsjømodellen', 'Ledningsevne og formbarhet', 'Sier ikke hvor mange elektroner som deltar'],
        ],
      },
    },
  ],
  begreper: [{ term: 'Modell', def: 'En forenklet beskrivelse som forklarer noen observasjoner, men ikke alle.' }],
  eksempler: [],
  feller: [
    'Ikke bare definer begrepene. Bruk dem til å forklare akkurat situasjonen i oppgaven.',
    'Unngå absolutte påstander («alltid», «aldri») uten å vurdere unntak.',
    'En observasjon kan ha flere forklaringer. Si hva som skal til for å være sikker.',
  ],
  oppgaver: [
    {
      id: 'an-01',
      niva: 3,
      type: 'forklaring',
      mal: [20, 9],
      sporsmal: 'En elev påstår: «Alle stoffer som inneholder hydrogen, danner hydrogenbindinger.» Vurder påstanden og bruk eksempler.',
      modellsvar: 'Påstanden er feil. Hydrogenbindinger dannes bare når et H-atom er bundet til et svært elektronegativt atom (N, O eller F) og tiltrekkes av et ledig elektronpar på N, O eller F i et annet molekyl. Vann, ammoniakk og HF har slike bindinger. Metan ({{CH4}}) inneholder hydrogen, men C–H-bindingen er nesten upolar (ΔEN = 0,4), så metan har bare London-krefter. I {{CH3F}} finnes både H og F, men H er bundet til C og ikke til F, så heller ikke her dannes hydrogenbindinger mellom molekylene. Det er altså hvilket atom hydrogen er bundet til, som avgjør.',
      punkter: [
        'Påstanden er feil',
        'Krav: H bundet til N, O eller F + ledig elektronpar på N, O eller F',
        'Moteksempel: CH₄ (bare London-krefter)',
        'Moteksempel: CH₃F (H bundet til C)',
      ],
    },
    {
      id: 'an-02',
      niva: 3,
      type: 'forklaring',
      mal: [20, 3],
      sporsmal: 'Skallmodellen og orbitalmodellen beskriver begge elektronene i atomet. Hva kan orbitalmodellen forklare som skallmodellen ikke kan? Gi minst to eksempler.',
      modellsvar: 'Skallmodellen forklarer antall valenselektroner, gruppe, periode og vanlige ioneladninger for hovedgruppene. Men den kan ikke forklare at N-skallet begynner å fylles før M-skallet er fullt. Orbitalmodellen deler skallene i underskall med ulik energi, og forklarer at 4s fylles før 3d. Den forklarer også Hunds regel og at nitrogen har tre uparede elektroner, at krom og kobber er unntak ($4s^1\\,3d^5$ og $4s^1\\,3d^{10}$), og at innskuddsmetaller avgir 4s-elektronene først. Orbitalmodellen er likevel også en modell: elektronene har ingen faste baner, og orbitalene viser bare hvor det er sannsynlig å finne dem.',
      punkter: [
        'Skallmodellen forklarer valenselektroner og grupper',
        'Orbitalmodellen forklarer 4s før 3d',
        'Orbitalmodellen forklarer Hunds regel / uparede elektroner',
        'Orbitalmodellen forklarer unntak (Cr, Cu) og ioner av innskuddsmetaller',
        'Begge er modeller med begrensninger',
      ],
    },
    {
      id: 'an-03',
      niva: 3,
      type: 'forklaring',
      mal: [20, 8],
      sporsmal: 'Tommelfingerregelen sier at bindinger med ΔEN over 1,7 er ioniske. Vurder regelen, og gi eksempler der den ikke stemmer.',
      modellsvar: 'Regelen er nyttig for å gjøre en rask vurdering: stor forskjell i elektronegativitet betyr at elektronene er sterkt forskjøvet, og ved svært stor forskjell overføres de helt slik at det dannes ioner. Men grensene er glidende. HF har ΔEN = 1,9, men er et molekyl med polar kovalent binding fordi både H og F er ikke-metaller. NaH har ΔEN = 1,2, men er en ioneforbindelse med {{Na+}} og {{H-}}. En bedre vurdering tar også hensyn til om stoffet består av metall og ikke-metall, og til egenskapene, for eksempel smeltepunkt og ledningsevne i smeltet form.',
      punkter: [
        'Regelen er nyttig for en rask vurdering',
        'Bindingstyper går gradvis over i hverandre',
        'Moteksempel: HF (ΔEN 1,9) er kovalent',
        'Moteksempel: NaH (ΔEN 1,2) er ionisk',
        'Bruk også metall/ikke-metall og egenskaper',
      ],
    },
    {
      id: 'an-04',
      niva: 3,
      type: 'forklaring',
      mal: [20, 19],
      sporsmal: 'Et ukjent stoff smelter ved 180 °C og løses i vann. Løsningen leder ikke strøm. Hva kan du konkludere med, og hva kan du ikke konkludere med?',
      modellsvar: 'Det lave smeltepunktet tyder på at stoffet er molekylært, fordi bare svake bindinger mellom molekylene må brytes. At løsningen ikke leder strøm, viser at det ikke dannes frie ioner, så stoffet er neppe et salt. At stoffet løses i vann, tyder på at molekylene er polare og kan danne hydrogenbindinger med vann, for eksempel fordi de har OH-grupper. Jeg kan ikke konkludere med hvilket stoff det er, eller hvilken struktur det har. Flere molekylære stoffer passer med observasjonene (for eksempel sukker). For å finne ut mer kunne vi sammenligne smeltepunktet med tabellverdier.',
      punkter: [
        'Lavt smeltepunkt → molekylært stoff',
        'Ingen ledningsevne → ingen frie ioner, ikke salt',
        'Løses i vann → polare molekyler / hydrogenbindinger',
        'Kan ikke avgjøre nøyaktig hvilket stoff',
        'Forslag til videre undersøkelse',
      ],
    },
    {
      id: 'an-05',
      niva: 3,
      type: 'forklaring',
      mal: [20, 9],
      sporsmal: 'Is har lavere tetthet enn flytende vann. Bruk kunnskap om bindinger og krefter til å forklare dette, og forklar hvorfor en dyp innsjø ikke bunnfryser om vinteren.',
      modellsvar: 'Vannmolekyler er vinklede dipolmolekyler som danner hydrogenbindinger: H bundet til O i ett molekyl tiltrekkes av et ledig elektronpar på O i et annet. I is låser hydrogenbindingene molekylene i et regelmessig gitter der hvert molekyl er bundet til fire andre. Dette gitteret er åpent med mye tomrom, så is har lavere tetthet enn flytende vann, der molekylene kan pakkes tettere. Isen flyter derfor og legger seg som et lokk på toppen. Isen isolerer vannet under, slik at det kalde vannet ikke fryser helt ned til bunnen, og fisk og andre organismer kan overleve.',
      punkter: [
        'Vann danner hydrogenbindinger (H–O mot ledig par på O)',
        'I is gir hydrogenbindingene et åpent gitter',
        'Lavere tetthet → isen flyter',
        'Isen isolerer vannet under',
      ],
    },
    {
      id: 'an-06',
      niva: 3,
      type: 'forklaring',
      mal: [20, 7],
      sporsmal: 'Elektronprikkformler (Lewisstrukturer) er en modell. Hva viser de godt, og hva viser de ikke? Bruk {{H2O}} som eksempel.',
      modellsvar: 'En elektronprikkformel viser valenselektronene: hvilke atomer som er bundet, om bindingene er enkle, doble eller tredoble, og hvor de ledige elektronparene er. For {{H2O}} viser den to O–H-bindinger og to ledige elektronpar på O. Sammen med VSEPR kan vi bruke den til å forutsi at vannmolekylet er vinklet og en dipol. Men elektronprikkformelen er tegnet flatt og viser ikke den egentlige tredimensjonale formen eller bindingsvinkelen (104,5°). Den viser heller ikke at elektronene befinner seg i orbitaler og ikke står stille som prikker, og den kan ikke vise delokaliserte elektroner på en god måte.',
      punkter: [
        'Viser bindinger og ledige elektronpar',
        'Kan brukes med VSEPR til å forutsi formen',
        'Viser ikke 3D-formen eller bindingsvinkelen',
        'Viser ikke at elektronene er i orbitaler / delokalisering',
      ],
    },
    {
      id: 'an-07',
      niva: 3,
      type: 'forklaring',
      mal: [20, 10, 11],
      sporsmal: 'Såpe består av lange molekyler med en ladd {{COO-}}-ende og en lang karbonkjede. Forklar hvordan såpe kan fjerne fett fra hendene. Bruk begrepene hydrofil, hydrofob, London-krefter og ion-dipol-binding.',
      modellsvar: 'Fett er upolart og løses ikke i vann. Såpemolekylet har to deler: den lange karbonkjeden er upolar og hydrofob, mens {{COO-}}-enden er ladet og hydrofil. Den hydrofobe kjeden trekkes inn i fettet, fordi London-krefter virker mellom kjeden og fettmolekylene. Den ladde enden peker ut mot vannet og danner ion-dipol-bindinger med vannmolekylene. Mange såpemolekyler legger seg rundt en fettdråpe, slik at dråpen får en ladd overflate og kan skylles bort med vann. Uten såpe ville vannmolekylene heller holdt sammen med hydrogenbindinger seg imellom, og fettet ville blitt liggende.',
      punkter: [
        'Fett er upolart / hydrofobt',
        'Karbonkjeden er hydrofob og trekkes mot fettet med London-krefter',
        'COO⁻-enden er hydrofil og danner ion-dipol-bindinger med vann',
        'Såpe omslutter fettdråper som kan skylles bort',
      ],
    },
    {
      id: 'an-08',
      niva: 3,
      type: 'forklaring',
      mal: [20, 17],
      sporsmal: 'Vurder påstanden: «Et stoff med høyt smeltepunkt er alltid en ioneforbindelse.»',
      modellsvar: 'Påstanden er feil. Ioneforbindelser har ofte høyt smeltepunkt fordi sterke ionebindinger i gitteret må brytes, for eksempel NaCl (801 °C) og MgO (2852 °C). Men også andre stofftyper har høye smeltepunkter. Metaller som jern (1538 °C) og wolfram (3422 °C) har sterk metallbinding. Atomgitter som kvarts ({{SiO2}}, ca. 1700 °C) og diamant har sterke kovalente bindinger i et nettverk. For å avgjøre stofftypen må vi derfor se på flere egenskaper, for eksempel om stoffet leder strøm i fast form (metall) eller bare smeltet (ionisk).',
      punkter: [
        'Påstanden er feil',
        'Ioneforbindelser har ofte høyt smeltepunkt (sterke ionebindinger)',
        'Moteksempel: metaller (Fe, W)',
        'Moteksempel: atomgitter (SiO₂, diamant)',
        'Flere egenskaper trengs, f.eks. ledningsevne',
      ],
    },
  ],
  flashcards: [
    {
      f: 'Hva kjennetegner et svar på høy måloppnåelse?',
      b: 'Presise fagbegreper, forklaring på partikkelnivå, anvendelse i nye situasjoner og vurdering av begrensninger.',
    },
    {
      f: 'Begrensning ved elektronprikkformler',
      b: 'De viser bindinger og ledige par, men ikke 3D-formen eller delokaliserte elektroner.',
    },
  ],
});
