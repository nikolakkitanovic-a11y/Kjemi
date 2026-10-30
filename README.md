# Spektrum · Kjemi 1

Øvingsside i Kjemi 1 (VG2 studiespesialisering). Innholdet bygger på notatene mine og er tilpasset kompetansemålene i læreplanen (LK20).

- 7 temaer med oppsummering, nøkkelbegreper, eksempler med løsning og vanlige feil
- 208 oppgaver i tre nivåer: grunnleggende, middels og høy måloppnåelse
- 11 oppgavetyper: flervalg, fyll inn, regneoppgaver med tall og enhet, balansering, navnsetting, formler, kobling, rangering, sortering, elektronkonfigurasjon og forklaringsoppgaver med modellsvar
- Hint før fasit, og løsningsforslag steg for steg på regneoppgavene
- Flashcards, prøvemodus med tidtaker og poeng, feilbank og fremdrift per tema
- Verktøy: interaktivt periodesystem, formelark, molar masse-kalkulator og balanseringssjekk
- Lyst og mørkt tema, og fungerer på mobil og PC

## Åpne siden

Last ned eller klon mappen og dobbeltklikk på `index.html`. Siden åpnes i nettleseren og trenger verken server, internett eller installasjon. KaTeX, mhchem og skriftene ligger i `assets/`.

Fremdriften lagres i nettleseren (localStorage). Bruker du både mobil og PC, kan du flytte fremdriften med «Eksporter fremdrift» og «Importer» nederst på forsiden.

## Mappestruktur

```
index.html              siden (her står også listen over datafiler)
assets/css/app.css      design, lyst og mørkt tema
assets/fonts/           Fraunces og IBM Plex
assets/vendor/katex/    KaTeX + mhchem (kjemiske formler)
data/grunnstoffer.js    alle 118 grunnstoffer (molar masse, EN, kategori)
data/formelark.js       formelarket
data/temaer/*.js        ett tema per fil: teori, oppgaver og flashcards
js/core/                kjemimotor, retting, lagring, oppgavekort
js/views/               forside, tema, flashcards, prøve, feilbank, verktøy
tests/                  automatiske tester
```

## Legge til nye oppgaver

Åpne temafilen i `data/temaer/` og legg oppgaven inn i listen `oppgaver`. Hver oppgave trenger en unik `id`, et `niva` (1, 2 eller 3) og en `type`. `hint`, `steg` (løsningsforslag) og `forklaring` kan brukes på alle typer.

### Skrive kjemi og matematikk

| Du skriver | Det vises som |
|---|---|
| `{{H2SO4}}` | H₂SO₄ |
| `{{SO4^2-}}`, `{{Na+}}` | SO₄²⁻, Na⁺ |
| `{{2H2 + O2 -> 2H2O}}` | reaksjonslikning med pil |
| `{{CuSO4*5H2O}}` | CuSO₄·5H₂O |
| `$N = A - Z$`, `$\\Delta EN$` | formel (husk dobbel backslash) |
| `$35,45\\enhet{u}$` | tall med enhet og desimalkomma |
| `**fet**` | **fet** |

### Eksempler på hver oppgavetype

```js
// Flervalg (svar = indeksen til riktig alternativ, start på 0)
{ id: 'at-30', niva: 1, type: 'flervalg',
  sporsmal: 'Hvor mange protoner har karbon?',
  alternativer: ['4', '6', '12', '14'], svar: 1,
  hint: 'Se på atomnummeret.' },

// Flervalg med flere riktige
{ id: 'at-31', niva: 2, type: 'flervalg', sporsmal: 'Hvilke er edelgasser?',
  alternativer: ['He', 'H', 'Ne', 'N'], svar: [0, 2] },

// Fyll inn (___ blir et felt; godkjente svar i en liste per felt)
{ id: 'at-32', niva: 1, type: 'fyllinn', sporsmal: 'Fyll inn.',
  tekst: 'Et negativt ion kalles et ___.', svar: [['anion']] },

// Regneoppgave (toleranse 0.003 = 0,3 % avvik godtas; gs = gjeldende siffer)
{ id: 'at-33', niva: 2, type: 'tall',
  sporsmal: 'Klor er 75,76 % Cl-35 (34,969 u) og 24,24 % Cl-37 (36,966 u). Regn ut gjennomsnittlig atommasse.',
  svar: 35.45, enhet: 'u', gs: 4, toleranse: 0.003,
  verify: () => 34.969 * 0.7576 + 36.966 * 0.2424,   // brukes av testen for å sjekke fasiten
  steg: ['$\\bar{m} = 34,969 \\cdot 0,7576 + 36,966 \\cdot 0,2424 = 35,45\\enhet{u}$'] },

// Tallsvar uten enhet (heltall: true krever nøyaktig svar)
{ id: 'at-34', niva: 1, type: 'tall', sporsmal: 'Hvor mange nøytroner har C-14?',
  svar: 8, heltall: true, enhet: null, steg: ['$N = A - Z = 14 - 6 = 8$'] },

// Balansering (svar = koeffisientene i rekkefølge)
{ id: 'rl-40', niva: 2, type: 'balanser',
  reaktanter: ['CH4', 'O2'], produkter: ['CO2', 'H2O'], svar: [1, 2, 1, 2] },

// Navnsetting og formel
{ id: 'nv-50', niva: 2, type: 'navn', formel: 'FeO', svar: ['jern(II)oksid'] },
{ id: 'nv-51', niva: 2, type: 'formel', navn: 'natriumsulfat', svar: 'Na2SO4' },

// Kobling, rangering og sortering
{ id: 'ps-40', niva: 1, type: 'kobling', sporsmal: 'Koble sammen.',
  par: [['Na', 'natrium'], ['K', 'kalium'], ['Ca', 'kalsium']] },
{ id: 'ps-41', niva: 2, type: 'rekkefolge', sporsmal: 'Ranger etter økende radius.',
  fra: 'Minst', til: 'Størst', elementer: ['F', 'O', 'N'] },   // skriv i RIKTIG rekkefølge
{ id: 'ps-42', niva: 1, type: 'sortering', sporsmal: 'Metall eller ikke-metall?',
  kategorier: ['Metall', 'Ikke-metall'], elementer: [['Na', 0], ['S', 1]] },

// Elektronkonfigurasjon (fasiten regnes ut automatisk)
{ id: 'el-40', niva: 2, type: 'konfig', grunnstoff: 'Mg', ladning: 2, notasjon: 'edelgass' },

// Forklaringsoppgave (eleven sammenligner med modellsvaret og krysser av punkter)
{ id: 'sv-40', niva: 3, type: 'forklaring', sporsmal: 'Forklar …',
  modellsvar: 'Fullstendig svar …', punkter: ['Punkt 1', 'Punkt 2', 'Punkt 3'] },
```

Flashcards legges i listen `flashcards` i samme fil: `{ f: 'Forside', b: 'Bakside' }`.

### Nytt tema

Kopier en av filene i `data/temaer/`, gi den ny `id`, `nr`, `tittel`, `farge` og `bolge` (bølgelengde i nm, bestemmer plassen i spekteret på forsiden), og legg til en linje i `index.html` under «Data: legg til nye temaer her»:

```html
<script src="data/temaer/08-redoks.js"></script>
```

## Testene

Testene sjekker at alle fasiter stemmer (balansering, molar masse, utregninger) og at alle oppgavene rettes riktig i nettleseren.

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
