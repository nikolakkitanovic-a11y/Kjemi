/*
 * Modul 15: Stoffegenskaper og stoffdetektiv
 * Læringsmål: 17, 19
 *
 * Hver oppgave har «mal» med nummeret på læringsmålet den øver på (se data/laeringsmal.js).
 * Se README.md for hvordan du legger til nye oppgaver.
 */
KJ.modul({
  id: 'stoffegenskaper',
  nr: 15,
  tittel: 'Stoffegenskaper og stoffdetektiv',
  beskrivelse: 'Sammenhengen mellom partikler, bindinger og smeltepunkt, løselighet og ledningsevne – og hvordan du skiller stoffer.',
  mal: [17, 19],
  farge: '#5458F2',
  bolge: 438,
  huskeliste: [
    '**Ionisk:** høyt smeltepunkt, leder bare smeltet eller løst. **Molekylært:** lavt smeltepunkt, leder ikke. **Metall:** leder også fast. **Atomgitter:** svært høyt smeltepunkt.',
    'Strøm krever ladde partikler som kan bevege seg.',
    'Stoffdetektiv: ledningsevne i fast form (metall?), løs i vann og mål ledningsevne (salt eller molekylært?), smeltepunkt, løselighet i vann og heksan.',
  ],
  teori: [
    {
      h: 'Fire stofftyper',
      tekst: 'Egenskapene til et stoff kommer av hvilke partikler det består av, og hvilke bindinger som må brytes når det smelter eller løses.',
      tabell: {
        hode: ['Stofftype', 'Partikler', 'Smeltepunkt', 'Løselighet i vann', 'Leder strøm'],
        rader: [
          [
            'Ionisk (salt)',
            'Kationer og anioner i gitter',
            'Høyt (ionebindinger brytes)',
            'Ofte god',
            'Bare smeltet eller løst',
          ],
          ['Molekylært', 'Molekyler', 'Lavt (svake bindinger brytes)', 'Polare ja, upolare nei', 'Nei'],
          ['Metall', 'Metallioner og frie elektroner', 'Varierer, ofte høyt', 'Nei', 'Ja, både fast og smeltet'],
          ['Atomgitter', 'Atomer bundet kovalent i nettverk', 'Svært høyt', 'Nei', 'Nei (unntak: grafitt)'],
        ],
      },
    },
    {
      h: 'Elektrisk ledningsevne',
      tekst: `Strøm krever **ladde partikler som kan bevege seg**.
- Metaller har frie elektroner, både i fast og flytende form.
- Salter har ioner, men de sitter fast i gitteret i fast form. Når saltet smelter eller løses i vann, kan ionene bevege seg, og stoffet leder strøm.
- Molekylære stoffer har ingen frie ladde partikler. Unntak: noen molekyler, som HCl, reagerer med vann og danner ioner.`,
    },
    {
      h: 'Ionebinding',
      tekst: `Ionebinding dannes mellom et **metall** og et **ikke-metall**. Metallet avgir valenselektroner og blir et kation, ikke-metallet tar opp elektroner og blir et anion. Ionebindingen er den elektrostatiske tiltrekningen mellom de motsatt ladde ionene.

{{Na}} → {{Na+}} + {{e-}}  og  {{Cl}} + {{e-}} → {{Cl-}}

Ionene ordner seg i et regelmessig **ionegitter** (krystallgitter). Ioneforbindelser kalles **salter**. Formelen viser forholdet mellom ionene, og den minste enheten kalles en **formelenhet** (f.eks. NaCl).

**Egenskaper:** høyt smeltepunkt, harde men sprø, leder strøm når de er smeltet eller løst i vann (ionene kan bevege seg), men ikke i fast form.

Bindingen blir sterkere jo **høyere ladning** og jo **mindre** ionene er. Derfor har MgO (2852 °C) mye høyere smeltepunkt enn NaCl (801 °C).`,
    },
    {
      h: 'Atomgitter (kovalente nettverk)',
      tekst: `Noen stoffer består av ett stort nettverk der alle atomene er bundet sammen med kovalente bindinger. Eksempler er **diamant** (hvert C-atom bundet til fire andre), **grafitt** (lag av C-atomer) og **kvarts**, {{SiO2}}.

For å smelte stoffet må sterke kovalente bindinger brytes. Atomgitter har derfor svært høye smeltepunkter, og diamant er det hardeste naturlige stoffet. Grafitt leder strøm, fordi ett elektron per C-atom er delokalisert i lagene.`,
    },
    {
      h: 'Stoffdetektiv: slik skiller du stoffer',
      tekst: `Velg undersøkelser som gir **ulike resultater** for stofftypene du vil skille:
1. **Ledningsevne i fast form:** bare metaller (og grafitt) leder.
2. **Løs i vann og mål ledningsevne:** salter gir ioner og leder, molekylære stoffer som sukker gjør det ikke.
3. **Varm forsiktig:** molekylære stoffer smelter lett, salter og atomgitter har høyt smeltepunkt.
4. **Løselighet i vann og i et upolart løsemiddel (heksan):** polare stoffer løses i vann, upolare i heksan.

Endre bare én ting om gangen, bruk like mengder og samme temperatur, og ha med en kjent prøve å sammenligne med. Bruk vernebriller og varm aldri ukjente stoffer kraftig.`,
    },
  ],
  begreper: [
    { term: 'Atomgitter', def: 'Nettverk av atomer bundet kovalent, f.eks. diamant og {{SiO2}}.' },
    {
      term: 'Ionebinding',
      def: 'Elektrostatisk tiltrekning mellom kationer og anioner. Metall + ikke-metall, $\\Delta EN > 1,7$.',
    },
  ],
  eksempler: [],
  feller: [
    'Ioneforbindelser leder ikke strøm i fast form. Ionene må kunne bevege seg (smeltet eller løst).',
    'En saltløsning leder strøm fordi **ionene** beveger seg, ikke fordi elektronene vandrer gjennom vannet.',
    'Høyt smeltepunkt betyr ikke alltid ionisk: metaller og atomgitter kan også ha svært høye smeltepunkter.',
    'Når et molekylært stoff smelter, brytes de svake bindingene mellom molekylene, ikke de kovalente bindingene.',
    'Én observasjon er sjelden nok. Kombiner flere egenskaper før du konkluderer.',
  ],
  oppgaver: [
    {
      id: 'sb-08',
      niva: 1,
      type: 'flervalg',
      mal: [17],
      sporsmal: 'Hvilken egenskap har typiske ioneforbindelser?',
      alternativer: [
        'Høyt smeltepunkt, og de leder strøm når de er smeltet',
        'Lavt smeltepunkt, og de leder strøm i fast form',
        'De er myke og lette å forme',
        'De består av molekyler',
      ],
      svar: 0,
      modul: 'sterke-bindinger',
    },
    {
      id: 'sv-07',
      niva: 1,
      type: 'flervalg',
      mal: [17],
      sporsmal: 'Hva betyr «likt løser likt»?',
      alternativer: [
        'Polare stoffer løses i polare løsemidler, og upolare i upolare',
        'Et stoff løses bare i seg selv',
        'Alle salter løses i alle væsker',
        'Stoffer med lik masse løses i hverandre',
      ],
      svar: 0,
      modul: 'svake-bindinger',
    },
    {
      id: 'eg-01',
      niva: 1,
      type: 'sortering',
      mal: [17],
      sporsmal: 'Hvilken stofftype er det?',
      kategorier: ['Ionisk', 'Molekylært', 'Metall', 'Atomgitter'],
      elementer: [
        ['NaCl', 0],
        ['{{H2O}}', 1],
        ['Cu', 2],
        ['diamant', 3],
        ['{{CO2}}', 1],
        ['KBr', 0],
        ['Fe', 2],
        ['{{SiO2}} (kvarts)', 3],
        ['{{I2}}', 1],
        ['MgO', 0],
      ],
    },
    {
      id: 'eg-02',
      niva: 1,
      type: 'flervalg',
      mal: [17],
      sporsmal: 'Hvorfor har molekylære stoffer ofte lavt smeltepunkt?',
      alternativer: [
        'Bare de svake bindingene mellom molekylene må brytes',
        'De kovalente bindingene er svake',
        'Molekylene har ingen elektroner',
        'De består av ioner',
      ],
      svar: 0,
    },
    {
      id: 'eg-03',
      niva: 1,
      type: 'flervalg',
      mal: [17],
      sporsmal: 'Hva kreves for at et stoff skal lede elektrisk strøm?',
      alternativer: [
        'Ladde partikler som kan bevege seg',
        'At stoffet er flytende',
        'At stoffet inneholder metall',
        'At stoffet løses i vann',
      ],
      svar: 0,
    },
    {
      id: 'eg-04',
      niva: 2,
      type: 'sortering',
      mal: [17],
      sporsmal: 'Når leder stoffet strøm?',
      kategorier: ['Også i fast form', 'Bare smeltet eller løst', 'Ikke'],
      elementer: [
        ['Cu', 0],
        ['NaCl', 1],
        ['sukker', 2],
        ['grafitt', 0],
        ['{{KNO3}}', 1],
        ['etanol', 2],
        ['Al', 0],
        ['diamant', 2],
      ],
      forklaring: 'Metaller og grafitt har frie elektroner. Salter har ioner som bare kan bevege seg når gitteret er brutt. Sukker, etanol og diamant har ingen frie ladde partikler.',
    },
    {
      id: 'eg-05',
      niva: 2,
      type: 'flervalg',
      mal: [17, 19],
      sporsmal: 'Et hvitt stoff smelter ved 801 °C. Det leder ikke strøm i fast form, men leder når det er smeltet. Hva slags stoff er det mest sannsynlig?',
      alternativer: ['Et salt (ionisk stoff)', 'Et metall', 'Et molekylært stoff', 'Et atomgitter'],
      svar: 0,
    },
    {
      id: 'eg-06',
      niva: 2,
      type: 'flervalg',
      mal: [17, 19],
      sporsmal: 'En væske fryser ved −23 °C, blander seg ikke med vann og leder ikke strøm. Hva er det mest sannsynlig?',
      alternativer: ['Et upolart molekylært stoff', 'Et salt', 'Et metall', 'Et polart stoff med hydrogenbindinger'],
      svar: 0,
    },
    {
      id: 'eg-07',
      niva: 2,
      type: 'flervalg',
      mal: [17],
      sporsmal: 'Hvorfor leder en sukkerløsning ikke strøm, mens en saltløsning gjør det?',
      alternativer: [
        'Sukker løses som hele, uladde molekyler, mens salt gir frie ioner',
        'Sukker er ikke løselig i vann',
        'Saltløsningen inneholder frie elektroner',
        'Sukker har kovalente bindinger som leder strøm',
      ],
      svar: 0,
    },
    {
      id: 'eg-08',
      niva: 2,
      type: 'rekkefolge',
      mal: [17],
      sporsmal: 'Ranger stoffene etter økende smeltepunkt.',
      fra: 'Lavest',
      til: 'Høyest',
      elementer: ['{{CH4}}', '{{H2O}}', 'NaCl', '{{SiO2}}'],
      forklaring: '{{CH4}} (−182 °C, London) < {{H2O}} (0 °C, hydrogenbindinger) < NaCl (801 °C, ionebindinger) < {{SiO2}} (ca. 1700 °C, kovalent nettverk).',
    },
    {
      id: 'eg-09',
      niva: 2,
      type: 'flervalg',
      mal: [17],
      sporsmal: 'Hvilke stoffer gir en løsning som leder strøm når de løses i vann?',
      alternativer: ['NaCl', 'HCl', 'KOH', 'sukker', 'etanol', '{{I2}}'],
      svar: [0, 1, 2],
      forklaring: 'NaCl og KOH er salter som gir frie ioner. HCl er et molekyl, men reagerer med vann og danner {{H3O+}} og {{Cl-}}.',
    },
    {
      id: 'eg-10',
      niva: 2,
      type: 'flervalg',
      mal: [17],
      sporsmal: 'Hvorfor er ioneforbindelser harde, men sprø?',
      alternativer: [
        'Ionebindingene er sterke, men når lagene forskyves, kommer like ladninger mot hverandre og frastøter hverandre',
        'Ionene er små',
        'Elektronene sitter løst',
        'Ionebindinger er svake',
      ],
      svar: 0,
    },
    {
      id: 'eg-15',
      niva: 2,
      type: 'flervalg',
      mal: [19],
      sporsmal: 'Du skal skille mellom sukker og salt (NaCl). Hvilken undersøkelse egner seg best?',
      alternativer: ['Løse begge i vann og måle om løsningen leder strøm', 'Se på fargen', 'Teste om de løses i vann', 'Måle massen'],
      svar: 0,
      forklaring: 'Begge er hvite og løses i vann. Bare saltløsningen leder strøm.',
    },
    {
      id: 'eg-16',
      niva: 2,
      type: 'flervalg',
      mal: [19],
      sporsmal: 'Du har et ukjent grått metall og et grått, hardt stoff som kan være et salt. Hvilken undersøkelse skiller dem raskest?',
      alternativer: ['Teste ledningsevnen i fast form', 'Løse dem i heksan', 'Veie dem', 'Lukte på dem'],
      svar: 0,
      forklaring: 'Metallet leder strøm i fast form fordi det har frie elektroner. Et salt leder ikke i fast form.',
    },
    {
      id: 'sb-20',
      niva: 3,
      type: 'forklaring',
      mal: [17],
      sporsmal: 'MgO smelter ved 2852 °C, mens NaCl smelter ved 801 °C. Forklar forskjellen.',
      modellsvar: 'Begge stoffene er ioneforbindelser med ionegitter, og for å smelte dem må ionebindingene brytes. I MgO har ionene ladning +2 og −2, mens ionene i NaCl har ladning +1 og −1. I tillegg er {{Mg^2+}} og {{O^2-}} mindre enn {{Na+}} og {{Cl-}}, så avstanden mellom ionene er kortere. Den elektrostatiske tiltrekningen øker med ladningene og avtar med avstanden, så bindingene i MgO er mye sterkere. Det kreves derfor mer energi for å bryte gitteret, og smeltepunktet blir høyere.',
      punkter: [
        'Begge er ioneforbindelser med ionegitter',
        'Ionene i MgO har dobbelt så stor ladning (+2/−2)',
        'Ionene i MgO er mindre, så avstanden er kortere',
        'Sterkere tiltrekning krever mer energi og gir høyere smeltepunkt',
      ],
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-22',
      niva: 3,
      type: 'forklaring',
      mal: [17],
      sporsmal: 'Forklar hvorfor NaCl leder strøm når det er smeltet eller løst i vann, men ikke som fast stoff.',
      modellsvar: 'Elektrisk ledningsevne krever ladde partikler som kan bevege seg. I fast NaCl sitter ionene fast i ionegitteret og kan ikke flytte seg. Når saltet smelter eller løses i vann, brytes gitteret, og {{Na+}}- og {{Cl-}}-ionene kan bevege seg fritt. Da kan de frakte ladning, og stoffet leder strøm.',
      punkter: [
        'Strøm krever ladde partikler som kan bevege seg',
        'I fast form sitter ionene fast i gitteret',
        'Smeltet eller løst kan ionene bevege seg fritt',
      ],
      modul: 'sterke-bindinger',
    },
    {
      id: 'sb-24',
      niva: 3,
      type: 'flervalg',
      mal: [17],
      sporsmal: 'Diamant smelter ikke under ca. 3500 °C. Hvilken struktur forklarer dette?',
      alternativer: [
        'Et atomgitter der hvert C-atom er bundet kovalent til fire andre',
        'Et ionegitter med {{C^4+}} og {{C^4-}}',
        'Sterke London-krefter mellom C-molekyler',
        'Metallbinding mellom karbonatomene',
      ],
      svar: 0,
      modul: 'sterke-bindinger',
    },
    {
      id: 'sv-21',
      niva: 3,
      type: 'forklaring',
      mal: [17, 9],
      sporsmal: 'Beskriv hva som skjer på partikkelnivå når NaCl løses i vann.',
      modellsvar: 'Vann er et dipolmolekyl med en negativ side ved O og en positiv side ved H-atomene. Når NaCl kommer i vann, vender vannmolekylene den negative O-siden mot {{Na+}} og den positive H-siden mot {{Cl-}}. Det dannes ion-dipol-bindinger. Når mange vannmolekyler trekker i ionene, rives de løs fra ionegitteret, og hvert ion blir omgitt av vannmolekyler. Ionene hydratiseres: {{NaCl(s) -> Na+(aq) + Cl-(aq)}}',
      punkter: [
        'Vann er et dipolmolekyl',
        'O-siden (δ−) vender mot Na⁺, H-siden (δ+) vender mot Cl⁻',
        'Det dannes ion-dipol-bindinger',
        'Ionene rives ut av gitteret og omgis av vannmolekyler (hydratiseres)',
      ],
      modul: 'svake-bindinger',
    },
    {
      id: 'eg-11',
      niva: 3,
      type: 'flervalg',
      mal: [17, 9],
      sporsmal: 'Jod, {{I2}}, løses dårlig i vann, men godt i heksan. Hvorfor?',
      alternativer: [
        '{{I2}} og heksan er upolare og holdes sammen av London-krefter, mens vannmolekylene holder sammen med hydrogenbindinger',
        'Jod reagerer med heksan',
        'Jod er et salt',
        'Heksan er polart',
      ],
      svar: 0,
    },
    {
      id: 'eg-12',
      niva: 3,
      type: 'forklaring',
      mal: [17],
      sporsmal: 'Sammenlign NaCl og sukker når det gjelder smeltepunkt, løselighet i vann og elektrisk ledningsevne. Forklar forskjellene ut fra partikler og bindinger.',
      modellsvar: 'NaCl er en ioneforbindelse der {{Na+}} og {{Cl-}} holdes sammen av sterke ionebindinger i et gitter. Det krever mye energi å bryte gitteret, så smeltepunktet er høyt (801 °C). Sukker består av molekyler med svake bindinger mellom seg (blant annet hydrogenbindinger), så det smelter ved lav temperatur (ca. 186 °C). Begge løses godt i vann: NaCl fordi ionene danner ion-dipol-bindinger med vann, sukker fordi OH-gruppene danner hydrogenbindinger med vann. NaCl leder strøm når det er smeltet eller løst, fordi ionene da kan bevege seg. I fast form sitter ionene fast. Sukker leder ikke i noen form, fordi molekylene er uladde.',
      punkter: [
        'NaCl: ioner i gitter, sterke ionebindinger → høyt smeltepunkt',
        'Sukker: molekyler med svake bindinger → lavt smeltepunkt',
        'Begge løses i vann (ion-dipol / hydrogenbindinger)',
        'NaCl leder bare smeltet/løst (frie ioner)',
        'Sukker leder ikke (uladde molekyler)',
      ],
    },
    {
      id: 'eg-13',
      niva: 3,
      type: 'forklaring',
      mal: [17],
      sporsmal: 'Grafitt leder strøm, men diamant gjør det ikke, selv om begge består av bare karbon. Forklar.',
      modellsvar: 'Begge er atomgitter der karbonatomene er bundet sammen med kovalente bindinger. I diamant er hvert C-atom bundet til fire andre, så alle valenselektronene brukes i bindinger og sitter fast. Diamant har ingen frie ladde partikler og leder ikke strøm. I grafitt er hvert C-atom bundet til tre andre i flate lag. Det fjerde valenselektronet er delokalisert og kan bevege seg langs lagene. Derfor leder grafitt strøm.',
      punkter: [
        'Begge er atomgitter med kovalente bindinger',
        'Diamant: hvert C bundet til fire, alle elektroner i bindinger',
        'Grafitt: hvert C bundet til tre, ett delokalisert elektron',
        'Frie elektroner gjør at grafitt leder',
      ],
    },
    {
      id: 'eg-14',
      niva: 3,
      type: 'forklaring',
      mal: [19, 20],
      sporsmal: 'Et hvitt pulver løses i vann, og løsningen leder strøm. Kan du konkludere med at stoffet er en ioneforbindelse? Vurder konklusjonen.',
      modellsvar: 'At løsningen leder strøm, viser at det finnes frie ioner i løsningen. Det passer med en ioneforbindelse, som gir frie ioner når den løses. Konklusjonen er likevel ikke sikker. Noen molekylære stoffer, for eksempel syrer som sitronsyre, reagerer med vann og danner ioner. For å styrke konklusjonen kan vi måle smeltepunktet (salter har høyt smeltepunkt) og teste om stoffet leder strøm når det er smeltet. Først når flere observasjoner peker samme vei, kan vi konkludere med rimelig sikkerhet.',
      punkter: [
        'Ledningsevne viser at det er ioner i løsningen',
        'Passer med ioneforbindelse',
        'Men noen molekylære stoffer (syrer) danner ioner i vann',
        'Trenger flere undersøkelser (smeltepunkt, ledningsevne smeltet)',
      ],
    },
    {
      id: 'eg-17',
      niva: 3,
      type: 'forklaring',
      mal: [19],
      sporsmal: 'Du får tre hvite pulvere: natriumklorid, sukker og sand ({{SiO2}}). Planlegg en enkel undersøkelse som skiller dem. Beskriv hva du gjør, hva du forventer, og begrunn ut fra stofftype.',
      modellsvar: 'Først tilsetter jeg like mye vann (for eksempel 20 mL) til like mye av hvert pulver og rører. Sand ({{SiO2}}) er et atomgitter med kovalente bindinger i et stort nettverk og løses ikke, så det blir liggende igjen. Sukker og salt løses begge: sukker fordi OH-gruppene danner hydrogenbindinger med vann, salt fordi ionene danner ion-dipol-bindinger. Deretter måler jeg ledningsevnen i de to løsningene med en ledningsevnemåler. Saltløsningen leder strøm fordi den inneholder frie ioner, mens sukkerløsningen ikke leder fordi sukker løses som uladde molekyler. Jeg bruker samme mengde stoff og vann og samme temperatur, og sammenligner med destillert vann som kontroll.',
      punkter: [
        'Løselighet i vann skiller ut sand (atomgitter løses ikke)',
        'Ledningsevne skiller salt (ioner) fra sukker (molekyler)',
        'Begrunner med stofftype og partikler',
        'Kontrollerer variabler (like mengder, kontrollprøve)',
      ],
    },
  ],
  flashcards: [
    { f: 'Ionebinding', b: 'Tiltrekning mellom kationer og anioner. Metall + ikke-metall, $\\Delta EN > 1,7$.' },
    {
      f: 'Egenskaper til ioneforbindelser',
      b: 'Høyt smeltepunkt, harde og sprø, leder strøm smeltet/løst, ikke fast.',
    },
    { f: 'Atomgitter', b: 'Nettverk av kovalent bundne atomer: diamant, grafitt, {{SiO2}}. Svært høyt smeltepunkt.' },
    {
      f: 'Hva kreves for at et stoff skal lede strøm?',
      b: 'Ladde partikler som kan bevege seg: frie elektroner (metall) eller frie ioner (smeltet/løst salt).',
    },
    { f: 'Leder salt i fast form?', b: 'Nei. Ionene sitter fast i gitteret. Smeltet eller løst i vann leder det.' },
  ],
});
