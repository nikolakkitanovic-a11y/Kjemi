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
  huskeliste: [
    'Svar: påstand → begrunnelse med fagbegreper → partikkelnivå → eksempel → vurdering.',
    'Vurder modellen: hva forklarer den, og hva forklarer den ikke?',
    'Unngå «alltid» og «aldri» uten å nevne unntak (HF, NaH, metaller med høyt smeltepunkt).',
  ],
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
      id: 'an-17',
      niva: 1,
      type: 'flervalg',
      mal: [20],
      sporsmal: 'Hva betyr det at for eksempel skallmodellen er en **modell**?',
      alternativer: [
        'Det er en forenklet beskrivelse som forklarer noen observasjoner, men ikke alle',
        'Det er et nøyaktig bilde av hvordan atomet ser ut',
        'Det er en teori som er bevist feil',
        'Det er en tegning som bare brukes i barneskolen',
      ],
      svar: 0,
      forklaring: 'En modell forenkler virkeligheten. Den er nyttig så lenge den forklarer det vi trenger, men den har alltid begrensninger.',
    },
    {
      id: 'an-18',
      niva: 1,
      type: 'flervalg',
      mal: [20, 19],
      sporsmal: 'Et stoff løses i vann, og løsningen leder strøm. Hvilken konklusjon er sikrest?',
      alternativer: [
        'Løsningen inneholder ioner som kan bevege seg',
        'Stoffet er et metall',
        'Stoffet er natriumklorid',
        'Stoffet er upolart',
      ],
      svar: 0,
      forklaring: 'Ledningsevne krever ladde partikler som kan bevege seg. Vi vet at det finnes ioner i løsningen, men ikke hvilket stoff det er.',
    },
    {
      id: 'an-19',
      niva: 2,
      type: 'flervalg',
      mal: [20, 7],
      sporsmal: 'Hva viser **ikke** en elektronprikkformel av metan, {{CH4}}, tegnet på papir?',
      alternativer: [
        'Den tetraedriske formen i tre dimensjoner',
        'Hvilke atomer som er bundet til hverandre',
        'Antall bindende elektronpar',
        'At C har fire bindinger',
      ],
      svar: 0,
      forklaring: 'På papir ser metan flatt ut med 90° mellom bindingene. Den virkelige formen er tetraedrisk med 109,5°. Formen må vi finne med VSEPR.',
    },
    {
      id: 'an-20',
      niva: 2,
      type: 'flervalg',
      mal: [20],
      sporsmal: 'En elev ser at smeltepunktet synker fra Li til Na til K, og konkluderer: «Smeltepunktet synker nedover i alle grupper.» Hva er problemet med konklusjonen?',
      alternativer: [
        'Den bygger på én gruppe. I gruppe 17 øker smeltepunktet nedover, fordi London-kreftene blir sterkere.',
        'Konklusjonen er riktig for alle grupper',
        'Smeltepunktet til K er feil målt',
        'Smeltepunkt avhenger ikke av bindinger',
      ],
      svar: 0,
      forklaring: 'I gruppe 1 blir metallbindingen svakere nedover. Halogenene er molekylære, og der øker smeltepunktet nedover ({{F2}} −220 °C, {{I2}} 114 °C) fordi flere elektroner gir sterkere London-krefter. En konklusjon må ikke generaliseres ut over det dataene dekker.',
    },
    {
      id: 'an-01',
      niva: 3,
      type: 'forklaring',
      mal: [20, 9],
      sporsmal: 'En elev påstår: «Alle stoffer som inneholder hydrogen, danner hydrogenbindinger.» Vurder påstanden og bruk eksempler.',
      fagbegreper: ['hydrogenbinding', 'elektronegativ', 'ledig elektronpar|ledige elektronpar|ledig par', 'London', 'polar'],
      kriterier: {
        lav: 'Sier at påstanden er feil, men uten begrunnelse eller eksempel.',
        middels: 'Forklarer kravet til hydrogenbinding (H bundet til N, O eller F) og gir ett eksempel.',
        hoy: 'Forklarer kravet med elektronegativitet og ledig elektronpar, gir moteksempler ({{CH4}}, {{CH3F}}) og vurderer hvorfor påstanden er lett å tro.',
      },
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
      fagbegreper: ['orbital', 'underskall', '4s', '3d', 'Hund', 'modell'],
      kriterier: {
        lav: 'Nevner at orbitalmodellen er mer detaljert.',
        middels: 'Gir ett konkret eksempel, for eksempel at 4s fylles før 3d.',
        hoy: 'Gir flere eksempler (4s før 3d, Hunds regel, Cr/Cu, ioner av innskuddsmetaller) og vurderer at begge er modeller med styrker og begrensninger.',
      },
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
      fagbegreper: [
        'elektronegativitet|ΔEN',
        'ionebinding|ionisk',
        'polar kovalent|kovalent',
        'gradvis|glidende',
        'tommelfingerregel',
      ],
      kriterier: {
        lav: 'Forklarer hva regelen sier.',
        middels: 'Gir ett moteksempel og sier at regelen er en forenkling.',
        hoy: 'Forklarer at bindingstypene går gradvis over i hverandre, gir moteksempler i begge retninger (HF, NaH) og foreslår hva man bør se på i tillegg.',
      },
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
      fagbegreper: ['smeltepunkt', 'molekyl', 'ioner', 'ledningsevne|leder', 'polar', 'hydrogenbinding'],
      kriterier: {
        lav: 'Sier hva slags stoff det kan være, uten å knytte det til observasjonene.',
        middels: 'Knytter hver observasjon til en egenskap ved partiklene og kommer frem til et polart molekylært stoff.',
        hoy: 'Skiller tydelig mellom det du kan og ikke kan konkludere med, og foreslår en undersøkelse som kan avgjøre mer.',
      },
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
      fagbegreper: ['hydrogenbinding', 'tetthet', 'gitter|struktur', 'isoler', 'ledig elektronpar|ledige elektronpar'],
      kriterier: {
        lav: 'Sier at is flyter fordi den er lettere.',
        middels: 'Forklarer at hydrogenbindingene gir en åpen struktur i is, og at isen derfor har lavere tetthet.',
        hoy: 'Forklarer på partikkelnivå, kobler lav tetthet til at isen legger seg øverst og isolerer, og bruker fagbegrepene presist.',
      },
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
      fagbegreper: ['elektronpar', 'binding', 'VSEPR|frastøt', 'vinklet', 'modell', '3D|tredimensjonal|romlig'],
      kriterier: {
        lav: 'Nevner at modellen viser bindinger.',
        middels: 'Forklarer hva modellen viser (bindinger og ledige par) og én ting den ikke viser.',
        hoy: 'Bruker {{H2O}} til å vise både styrker og begrensninger, og forklarer hvordan modellen kan kombineres med VSEPR for å finne formen.',
      },
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
      fagbegreper: ['hydrofil', 'hydrofob', 'London', 'ion-dipol', 'upolar', 'polar'],
      kriterier: {
        lav: 'Sier at såpe løser fett.',
        middels: 'Forklarer at den ene enden trekkes mot vann og den andre mot fett.',
        hoy: 'Navngir kreftene (ion-dipol og London), forklarer hvordan såpemolekylene omslutter fettdråper, og bruker alle fire begrepene riktig.',
      },
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
      fagbegreper: ['ionebinding|ioneforbindelse', 'metallbinding|metall', 'smeltepunkt', 'ledningsevne|leder'],
      kriterier: {
        lav: 'Sier at påstanden er feil.',
        middels: 'Gir ett moteksempel med riktig bindingstype.',
        hoy: 'Gir moteksempler, forklarer hvorfor smeltepunktet er høyt i hvert tilfelle, og foreslår flere egenskaper som må undersøkes for å avgjøre stofftypen.',
      },
      modellsvar: `Påstanden er feil. Ioneforbindelser har ofte høyt smeltepunkt fordi sterke ionebindinger i gitteret må brytes, for eksempel NaCl (801 °C) og MgO (2852 °C).

Men også **metaller** kan ha svært høyt smeltepunkt. Jern smelter ved 1538 °C og wolfram ved 3422 °C, fordi metallbindingen mellom metallionene og de delokaliserte elektronene er sterk.

For å avgjøre stofftypen må vi se på flere egenskaper. Et metall leder strøm også i fast form, mens et salt bare leder når det er smeltet eller løst i vann.`,
      punkter: [
        'Påstanden er feil',
        'Ioneforbindelser har ofte høyt smeltepunkt (sterke ionebindinger)',
        'Moteksempel: metaller (Fe, W) med sterk metallbinding',
        'Flere egenskaper trengs, f.eks. ledningsevne i fast form',
      ],
    },
    {
      id: 'an-09',
      niva: 3,
      type: 'forklaring',
      mal: [20, 9],
      sporsmal: 'Vann, {{H2O}} (18 u), koker ved 100 °C, mens metan, {{CH4}} (16 u), koker ved −162 °C. Forklar forskjellen. Vurder også om molekylmassen alene kan brukes til å forutsi kokepunktet til et stoff.',
      fagbegreper: [
        'London',
        'hydrogenbinding',
        'dipol',
        'upolar',
        'ledig elektronpar|ledige elektronpar',
        'mellom molekylene|mellom molekyler',
      ],
      kriterier: {
        lav: 'Sier at vann har sterkere bindinger enn metan.',
        middels: 'Forklarer at vann har hydrogenbindinger og metan bare London-krefter.',
        hoy: 'Forklarer på partikkelnivå hvorfor vann er en dipol med hydrogenbindinger, skiller mellom krefter i og mellom molekyler, og vurderer at molekylmasse ikke er nok alene.',
      },
      modellsvar: `Når et molekylært stoff koker, brytes kreftene **mellom** molekylene, ikke de kovalente bindingene.

Metan er upolart (C–H har ΔEN 0,4, og molekylet er symmetrisk). Mellom metanmolekylene virker bare svake **London-krefter**.

I vann er O–H-bindingene polare (ΔEN 1,4), og molekylet er vinklet, så det er en **dipol**. H er bundet til O, og O har to ledige elektronpar. Vannmolekylene danner derfor **hydrogenbindinger** til hverandre, som er mye sterkere enn London-kreftene i metan. Det krever mye mer energi å skille vannmolekylene, og kokepunktet blir høyt.

**Vurdering:** Molekylmassen sier noe om London-kreftene (flere elektroner gir sterkere London-krefter), men den er ikke nok alene. Her er massene nesten like, mens kokepunktene er svært forskjellige. Polaritet og hydrogenbindinger må også vurderes.`,
      punkter: [
        'Koking bryter kreftene mellom molekylene',
        'Metan: upolart, bare London-krefter',
        'Vann: dipol med hydrogenbindinger',
        'Hydrogenbindinger er sterkere → høyere kokepunkt',
        'Molekylmasse alene er ikke nok',
      ],
    },
    {
      id: 'an-10',
      niva: 3,
      type: 'forklaring',
      mal: [20, 17],
      sporsmal: 'Kulemodellen av natriumklorid viser {{Na+}} og {{Cl-}} som kuler i et gitter. Hva forklarer modellen godt, og hva viser den ikke?',
      fagbegreper: ['gitter', 'ionebinding|ionebindinger', 'formelenhet', 'smeltepunkt', 'sprø|sprøtt', 'modell'],
      kriterier: {
        lav: 'Beskriver hva modellen viser.',
        middels: 'Bruker modellen til å forklare én egenskap og nevner én begrensning.',
        hoy: 'Forklarer flere egenskaper med modellen (smeltepunkt, sprøhet), nevner flere begrensninger og vurderer hvor nyttig modellen er.',
      },
      modellsvar: `**Modellen forklarer godt:**
- at ionene sitter fast i et regelmessig gitter, slik at saltet danner krystaller med rette flater
- at hvert ion er omgitt av ioner med motsatt ladning, som gir sterke **ionebindinger** i alle retninger og derfor høyt smeltepunkt
- hvorfor saltet er sprøtt: forskyves et lag, kommer like ladninger inntil hverandre og frastøter hverandre

**Modellen viser ikke:**
- at det ikke finnes egne NaCl-molekyler. Formelen er en **formelenhet** som viser forholdet 1 : 1
- hvordan elektronene er fordelt, eller at ionene har edelgasskonfigurasjon
- at partiklene vibrerer, og at ionene ikke er harde kuler

**Vurdering:** Modellen er nyttig for å forklare egenskapene til salter, men den er en forenkling av virkeligheten.`,
      punkter: [
        'Viser gitter og regelmessig struktur',
        'Forklarer høyt smeltepunkt (ionebindinger i alle retninger)',
        'Forklarer at salter er sprø',
        'Viser ikke elektronene / edelgasskonfigurasjon',
        'Ingen molekyler, bare formelenhet',
      ],
    },
    {
      id: 'an-12',
      niva: 3,
      type: 'forklaring',
      mal: [20, 15],
      sporsmal: 'Natrium er et metall som reagerer kraftig med vann, og klor er en giftig gass. Likevel er natriumklorid ufarlig. Forklar dette med elektronkonfigurasjon og ioner.',
      fagbegreper: ['valenselektron', 'edelgasskonfigurasjon|oktett', 'ion', 'ionebinding', 'elektronkonfigurasjon'],
      kriterier: {
        lav: 'Sier at natrium og klor blir til salt.',
        middels: 'Forklarer at natrium avgir og klor tar opp et elektron, slik at det dannes ioner.',
        hoy: 'Bruker elektronkonfigurasjoner, forklarer hvorfor ionene er stabile, og vurderer hvorfor en forbindelse kan ha helt andre egenskaper enn grunnstoffene.',
      },
      modellsvar: `Natrium har elektronkonfigurasjonen $[mathrm{Ne}],3s^1$. Det ene valenselektronet avgis lett, og derfor reagerer natrium kraftig.

Klor har $[mathrm{Ne}],3s^2,3p^5$ og mangler ett elektron på full oktett. Klor tar lett opp elektroner og reagerer med mange stoffer. Det er derfor klorgass er giftig.

I natriumklorid har natrium avgitt elektronet til klor. Begge har fått **edelgasskonfigurasjon**: {{Na+}} som neon og {{Cl-}} som argon. Ionene er stabile og har ikke lenger samme tendens til å reagere. De holdes sammen av **ionebindinger** i et gitter.

**Vurdering:** Egenskapene til en forbindelse kan være helt ulike egenskapene til grunnstoffene den er laget av, fordi partiklene er forskjellige (atomer og molekyler i grunnstoffene, ioner i saltet).`,
      punkter: [
        'Na har ett valenselektron som avgis lett',
        'Cl mangler ett elektron på oktett',
        'Ionene har edelgasskonfigurasjon og er stabile',
        'Ionebinding i gitter',
        'Forbindelsen har andre egenskaper enn grunnstoffene',
      ],
    },
    {
      id: 'an-13',
      niva: 3,
      type: 'forklaring',
      mal: [20, 8],
      sporsmal: 'En elev påstår: «{{CO2}} er et polart molekyl, fordi C=O-bindingene er polare.» Vurder påstanden.',
      fagbegreper: ['ΔEN|elektronegativitet', 'polar', 'lineær', 'symmetri|symmetrisk', 'dipol', 'opphever'],
      kriterier: {
        lav: 'Sier at påstanden er riktig eller feil.',
        middels: 'Forklarer at molekylet er lineært, slik at dipolene opphever hverandre.',
        hoy: 'Skiller tydelig mellom polare bindinger og polart molekyl, bruker ΔEN og form, gir et sammenligningseksempel og konkluderer med en generell regel.',
      },
      modellsvar: `Eleven har rett i at **bindingene** er polare: ΔEN for C–O er 3,5 − 2,5 = 1,0. O får δ− og C får δ+.

Men påstanden om **molekylet** er feil. {{CO2}} har to bindingsområder og ingen ledige par på C, så molekylet er **lineært** (O=C=O). De to bindingsdipolene er like store og peker i motsatt retning, så de opphever hverandre. Tyngdepunktet for positiv og negativ ladning faller sammen, og molekylet er **ikke en dipol**.

Sammenlign med vann: også der er bindingene polare, men molekylet er **vinklet**, så dipolene opphever ikke hverandre.

**Vurdering:** For å avgjøre om et molekyl er en dipol, må man se på både bindingspolaritet og **form**. Polare bindinger er nødvendig, men ikke nok.`,
      punkter: [
        'Bindingene er polare (ΔEN 1,0)',
        'Molekylet er lineært',
        'Dipolene opphever hverandre → ikke dipol',
        'Sammenligner med et vinklet molekyl (H₂O)',
        'Både polaritet og form må vurderes',
      ],
    },
    {
      id: 'an-14',
      niva: 3,
      type: 'forklaring',
      mal: [20, 18],
      sporsmal: 'Metallbinding beskrives ofte som «metallioner i en sjø av elektroner». Hva forklarer denne modellen godt, og hva er begrensningene?',
      fagbegreper: [
        'delokaliserte elektroner|frie elektroner',
        'metallion',
        'formbar',
        'ledningsevne|leder',
        'smeltepunkt',
        'modell',
      ],
      kriterier: {
        lav: 'Beskriver modellen.',
        middels: 'Bruker modellen til å forklare to egenskaper.',
        hoy: 'Forklarer flere egenskaper med modellen, gir tall eller eksempler, og vurderer begrensningene.',
      },
      modellsvar: `**Modellen forklarer godt:**
- **ledningsevne:** de delokaliserte elektronene kan bevege seg når det kobles til en spenning
- **formbarhet:** bindingen er ikke retningsbestemt, så lag av metallioner kan gli forbi hverandre uten at bindingen brytes
- **smeltepunkt:** flere valenselektroner og høyere ioneladning gir sterkere tiltrekning, for eksempel Na (98 °C) < Mg (650 °C) < Al (660 °C)

**Begrensninger:**
- Den forklarer ikke godt hvorfor kvikksølv er flytende og wolfram smelter ved 3422 °C. Der spiller også d-elektronene og strukturen inn.
- Den sier ikke noe om farge eller magnetisme (for eksempel at jern er magnetisk).
- Elektronene er ikke en jevn «sjø». Modellen er en forenkling.

**Vurdering:** Modellen er nyttig på Kjemi 1-nivå for å forklare de viktigste egenskapene til metaller, men den kan ikke forklare alt.`,
      punkter: [
        'Forklarer ledningsevne (delokaliserte elektroner)',
        'Forklarer formbarhet (ikke retningsbestemt)',
        'Forklarer trender i smeltepunkt',
        'Nevner minst én begrensning',
        'Vurderer modellen',
      ],
    },
    {
      id: 'an-15',
      niva: 3,
      type: 'forklaring',
      mal: [20, 11],
      sporsmal: 'Regelen «likt løser likt» sier at polare stoffer løses i polare løsemidler og upolare i upolare. Bruk regelen på to eksempler, og forklar når regelen må brukes med forsiktighet.',
      fagbegreper: ['hydrogenbinding', 'London', 'polar', 'upolar', 'ion-dipol', 'løselig|løses'],
      kriterier: {
        lav: 'Forklarer hva regelen sier.',
        middels: 'Bruker regelen riktig på to eksempler.',
        hoy: 'Forklarer regelen med krefter, bruker den på to eksempler og vurderer tilfeller der den ikke holder.',
      },
      modellsvar: `Regelen bygger på kreftene mellom partiklene. Et stoff løses godt når det kan danne krefter til løsemiddelet som er omtrent like sterke som dem som brytes.

**Eksempel 1:** Etanol løses i vann. Begge kan danne **hydrogenbindinger**, så etanolmolekylene kan ta plass mellom vannmolekylene.

**Eksempel 2:** Jod, {{I2}}, løses i heksan, men dårlig i vann. Både jod og heksan er **upolare** og holdes sammen med **London-krefter**.

**Forsiktighet:**
- Store molekyler kan ha både polare og upolare deler. Heksanol har en OH-gruppe, men løses dårlig i vann fordi den upolare kjeden er lang. Det er forholdet mellom delene som avgjør.
- Ikke alle salter løses i vann selv om vann er polart, for eksempel {{CaCO3}}. Ionebindingene kan være sterkere enn ion-dipol-bindingene til vannet.

**Vurdering:** Regelen er en god første vurdering, men man må se på hele molekylet og styrken på kreftene.`,
      punkter: [
        'Forklarer regelen med krefter mellom partikler',
        'Eksempel med polart stoff (hydrogenbinding)',
        'Eksempel med upolart stoff (London)',
        'Store molekyler med polar og upolar del',
        'Unntak: ikke alle salter løses i vann',
      ],
    },
    {
      id: 'an-16',
      niva: 3,
      type: 'forklaring',
      mal: [20, 6],
      sporsmal: 'Kjerneladningen øker nedover i en gruppe. Likevel blir atomene større. Forklar dette, og vurder hvordan skallmodellen hjelper og ikke hjelper oss her.',
      fagbegreper: ['elektronskall|skall', 'kjerneladning', 'skjerming|skjermer', 'valenselektron', 'modell'],
      kriterier: {
        lav: 'Sier at atomene får flere skall.',
        middels: 'Forklarer at flere skall og skjerming gjør at radien øker.',
        hoy: 'Forklarer samspillet mellom skall, kjerneladning og skjerming, gir eksempler og vurderer skallmodellens styrker og begrensninger.',
      },
      modellsvar: `Nedover i en gruppe får atomene **ett elektronskall mer** for hver periode. Valenselektronene er da lenger fra kjernen.

Kjerneladningen øker, men de indre elektronene **skjermer** for den. Valenselektronene merker omtrent den samme effektive kjerneladningen nedover i gruppen. Effekten av flere skall er derfor større enn effekten av økt kjerneladning, og radien øker. Eksempel: Li er minst, så kommer Na og K.

**Skallmodellen hjelper** fordi den viser at elektronene ligger i skall i økende avstand fra kjernen, og at de indre skallene skjermer.

**Skallmodellen hjelper ikke** med å forklare detaljene, for eksempel at 4s fylles før 3d, eller at radien bare endrer seg litt bortover blant innskuddsmetallene. Da trengs orbitalmodellen.

**Vurdering:** Skallmodellen er god nok til å forklare hovedtrenden nedover i en gruppe.`,
      punkter: [
        'Flere elektronskall nedover',
        'Indre elektroner skjermer for kjerneladningen',
        'Effekten av flere skall er størst',
        'Eksempel (Li < Na < K)',
        'Vurderer skallmodellen (styrke og begrensning)',
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
