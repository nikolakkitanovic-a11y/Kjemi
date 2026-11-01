# Spektrum · Kjemi 1

Øvingsside til kjemiprøven tirsdag 3. november. Siden er organisert etter de 20 læringsmålene for prøven og bygger på notatene mine.

- **Forside med læringsmålene som sjekkliste.** Hvert mål vurderes rødt, gult eller grønt. Du kan sette vurderingen selv, og den oppdateres også ut fra resultatene dine.
- **17 moduler, én per læringsmål** (noen tett beslektede mål er slått sammen). Hver modul har læringsmål, en boks med vanlige feil, teori, begreper, eksempler og oppgaver i tre nivåer.
- **Interaktive oppgavetyper:** orbitaldiagram med kontroll av Pauli og Hund, saltbygger med ladningsregnskap, balansering med atomtabell, elektronprikkformler steg for steg med SVG-fasit, markering av krefter i strukturtegninger, stoffdetektiv og langsvar med fagbegreper og kriterier for lav, middels og høy.
- **Merkelapp på hver oppgave** («Mål 4») som viser hvilket læringsmål den øver på. I moduler med flere mål kan du filtrere på mål.
- **Hint før fasit**, og løsningsforslag steg for steg.
- **Flashcards** for begrepene og de sammensatte ionene.
- **Smart øving** (`#/ov`): én oppgave om gangen, oftest fra de røde målene og fra oppgaver du har svart feil på. `#/ov?mal=3,7` øver bare på mål 3 og 7.
- **Øvingsplan** på forsiden frem til prøven, bygd på selvvurderingen: røde mål først, så de som ikke er vurdert, så de gule. Siste dag er satt av til repetisjon og prøvesimulering.
- **Prøvesimulering** med tidtaker og poeng. Med 20 oppgaver får hvert av de 20 målene minst én oppgave. Resultatsiden viser poeng per læringsmål og hvilke mål du bør øve mer på.
- **Oppfølging etter prøven** (`#/ov?prove=<id>`): nye oppgaver fra målene du fikk under 60 % på, uten oppgavene som var med på prøven. 2–3 oppgaver per mål fra grunnleggende til høyt nivå, høyst 8 mål per runde, fasit etter hvert svar og oppsummering per mål til slutt. Den kan også startes fra «Tidligere prøver».
- **«Kvelden før»** (`#/kvelden-for`): regler, unntak og vanlige feil for alle målene på ett ark, laget for utskrift. Reglene står i `huskeliste` i hver modulfil.
- **Feilbank:** en oppgave forsvinner først når du har svart riktig 2 ganger på rad.
- **Verktøy:** periodesystem (elektronegativitet og elektronfordeling), formelark og balanseringssjekk.
- Lyst og mørkt tema, og siden fungerer på mobil og PC.

## Åpne siden

Last ned eller klon mappen og dobbeltklikk på `index.html`. Siden trenger verken server, internett eller installasjon.

Fremdriften lagres i nettleseren (localStorage). Bruk «Eksporter fremdrift» og «Importer» nederst på forsiden for å flytte den mellom enheter. Fremdrift fra den gamle versjonen av siden blir med automatisk.

## Mappestruktur

```
index.html                 siden (her står listen over datafiler)
data/laeringsmal.js        de 20 læringsmålene
data/ioner.js              DE SAMMENSATTE IONENE – rett lista her
data/moduler/*.js          én fil per modul: teori, vanlige feil, oppgaver og flashcards
data/grunnstoffer.js       alle 118 grunnstoffer
data/formelark.js          formelarket
arkiv/                     innhold utenfor læringsmålene (lastes ikke)
js/core/                   kjemimotor, retting, lagring, oppgavekort
js/views/                  forside, moduler, flashcards, prøve, feilbank, verktøy
tests/                     automatiske tester
```

## Rette lista over sammensatte ioner

Åpne `data/ioner.js`. Ionene med `tavla: true` øves i iondrillen, i flashcards og i formelarket. Sett `tavla: false` for å ta et ion ut, eller `true` for å ta med et av de ekstra ionene (nitritt, sulfitt, hydrogenkarbonat, acetat, kromat, dikromat og hypokloritt).

## Legge til nye oppgaver

Åpne modulfilen i `data/moduler/` og legg oppgaven inn i listen `oppgaver`. Hver oppgave trenger en unik `id`, et `niva` (1, 2 eller 3), en `type` og `mal` (nummeret på læringsmålet, se `data/laeringsmal.js`).

| Du skriver | Det vises som |
|---|---|
| `{{H2SO4}}` | H₂SO₄ |
| `{{SO4^2-}}`, `{{Na+}}` | SO₄²⁻, Na⁺ |
| `{{2H2 + O2 -> 2H2O}}` | reaksjonslikning med pil |
| `$[\\mathrm{Ar}]\\,4s^2\\,3d^6$` | elektronkonfigurasjon (husk dobbel backslash) |
| `**fet**` | **fet** |

```js
// Flervalg (svar = indeksen til riktig alternativ, start på 0; flere riktige: svar: [0, 2])
{ id: 'in-30', niva: 1, type: 'flervalg', mal: [4],
  sporsmal: 'Hvilke elektroner avgir Zn når Zn²⁺ dannes?',
  alternativer: ['4s', '3d', '4p', '3p'], svar: 0, stokk: false,
  hint: 'Hvilke elektroner har høyest n?' },

// Fyll inn (___ blir et felt; godkjente svar i en liste per felt)
{ id: 'hv-30', niva: 2, type: 'fyllinn', mal: [5],
  sporsmal: 'Et ion har konfigurasjonen [Ne] og ladning 2+. Hvem er det?',
  tekst: 'Grunnstoff: ___', svar: [['Mg', 'magnesium']] },

// Elektronkonfigurasjon (fasiten regnes ut automatisk)
{ id: 'in-31', niva: 2, type: 'konfig', mal: [4], grunnstoff: 'Fe', ladning: 3, notasjon: 'edelgass' },

// Navnsetting og formel
{ id: 'rp-30', niva: 2, type: 'navn', mal: [12, 13], formel: 'FeO', svar: ['jern(II)oksid'] },
{ id: 'rp-31', niva: 2, type: 'formel', mal: [15], navn: 'natriumsulfat', svar: 'Na2SO4' },

// Balansering (svar = koeffisientene i rekkefølge)
{ id: 'rl-40', niva: 2, type: 'balanser', mal: [16],
  reaktanter: ['CH4', 'O2'], produkter: ['CO2', 'H2O'], svar: [1, 2, 1, 2] },

// Kobling, rangering (skriv elementene i RIKTIG rekkefølge) og sortering
{ id: 'st-30', niva: 2, type: 'rekkefolge', mal: [6], sporsmal: 'Ranger etter økende radius.',
  fra: 'Minst', til: 'Størst', elementer: ['F', 'O', 'N'] },
{ id: 'eg-30', niva: 1, type: 'sortering', mal: [17], sporsmal: 'Hvilken stofftype?',
  kategorier: ['Ionisk', 'Molekylært'], elementer: [['NaCl', 0], ['{{CO2}}', 1]] },

// Forklaringsoppgave / langsvar (du sammenligner med modellsvaret og krysser av punkter).
// fagbegreper og kriterier er valgfrie. Fagbegrepene markeres når de står i svaret ditt (varianter skilles med |).
{ id: 'an-30', niva: 3, type: 'forklaring', mal: [20], sporsmal: 'Forklar …',
  modellsvar: 'Fullstendig svar …', punkter: ['Punkt 1', 'Punkt 2', 'Punkt 3'],
  fagbegreper: ['hydrogenbinding', 'London', 'ledig elektronpar|ledige elektronpar'],
  kriterier: { lav: '…', middels: '…', hoy: '…' } },

// Elektronprikkformel steg for steg. a = atom, b = bindingsorden, l = ledige elektronpar.
// Valenselektroner, form, polare bindinger og dipol regnes ut automatisk, og fasiten tegnes som SVG.
{ id: 'lw-30', niva: 2, type: 'lewis', mal: [7, 8], formel: 'NH3', navn: 'ammoniakk',
  sporsmal: 'Tegn elektronprikkformelen for ammoniakk …',
  s: { a: 'N', l: 1, n: [{ a: 'H', b: 1, l: 0 }, { a: 'H', b: 1, l: 0 }, { a: 'H', b: 1, l: 0 }] } },
// Ioner får ladning: { …, formel: 'NH4+', ladning: 1 }

// Marker krefter i en strukturtegning fra data/strukturer.js
{ id: 'mk-30', niva: 2, type: 'markering', mal: [10], struktur: 'salt-vann',
  typer: ['ion-dipol'], sporsmal: 'Marker alle ion-dipol-bindingene.' },

// Stoffdetektiv. Rolle: 'k' = bevis, 'n' = nøytral, 'i' = sier ikke noe om stofftypen.
// svar er indeksen i KJ.STOFFTYPER: 0 ionisk, 1 polart molekylært, 2 upolart molekylært, 3 metall, 4 atomgitter.
{ id: 'sd-30', niva: 2, type: 'detektiv', mal: [19], sporsmal: 'Stoffdetektiv …',
  obs: [['Smelter ved 801 °C', 'k'], ['Er hvitt', 'i']], svar: 0,
  plan: { sporsmal: 'Hvilken undersøkelse …?', alternativer: ['…', '…'], svar: 0 } },
```

### Nye strukturtegninger

Tegningene til markeringsoppgavene ligger i `data/strukturer.js`. Hver tegning har atomer (`[x, y, 'O']`), bindinger (`[fra, til]`) og soner (`{ type, x, y, r, tekst }`) som markerer hvor kreftene virker. Testen sjekker at sonene ikke overlapper.

Flashcards legges i listen `flashcards` i samme fil: `{ f: 'Forside', b: 'Bakside' }`.

## Testene

Testene sjekker at alle fasiter stemmer, at alle reaksjonslikninger er balansert, at alle saltformler er elektrisk nøytrale, at alle elektronprikkformler har riktig antall elektroner og oktett, at sonene i strukturtegningene ikke overlapper, at alle oppgaver har læringsmål, og at alle oppgavene rettes riktig i nettleseren.

```bash
node tests/verifiser.js
```

```bash
node tests/nettleser.js
```

Den andre testen trenger Playwright med Chromium.

## Faglige merknader

- Elektronegativitet følger Paulings skala med én desimal, slik læreboken bruker (H 2,1, C 2,5, O 3,5, Cl 3,0).
- Disse feilene i notatene er rettet på siden: IF₄ heter jodtetrafluorid (jodheptafluorid er IF₇), «fluorid» skrives med uo, CO₂ (ikke «Co²»), s-orbitaler er kuleformede, metaller har krystallstruktur, London-krefter blir sterkere (ikke «mer permanente») med større elektronsky, hydrogenbindingen er tiltrekningen mellom molekylene, og CuSO₄·5H₂O heter kobber(II)sulfatpentahydrat.
