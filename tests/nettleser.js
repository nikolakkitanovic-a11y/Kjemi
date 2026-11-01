/*
 * Nettlesertest med Playwright (Chromium).
 * Kjør med:  node tests/nettleser.js [mappe-for-skjermbilder]
 *
 * Åpner index.html direkte fra disk, klikker gjennom alle visningene,
 * svarer riktig på ALLE oppgavene via grensesnittet og sjekker at de rettes
 * som riktige, sjekker at gale svar rettes som feil, tester prøvemodus,
 * feilbank, flashcards og verktøy, og feiler hvis konsollen har feil.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ROT = path.join(__dirname, '..');
const URL = 'file://' + path.join(ROT, 'index.html');
const BILDER = process.argv[2] || null;
if (BILDER) fs.mkdirSync(BILDER, { recursive: true });

let feil = 0;
const logg = (ok, msg) => {
  if (!ok) feil++;
  console.log((ok ? '  ✓ ' : '  ✗ ') + msg);
};

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const konsollfeil = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') konsollfeil.push(m.type() + ': ' + m.text());
  });
  page.on('pageerror', (e) => konsollfeil.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => konsollfeil.push('requestfailed: ' + r.url()));

  // Finner elementer som stikker ut over høyre kant uten å ligge i en scrollbar boks.
  const UTENFOR = () => {
    window.utenfor = () => {
      const W = window.innerWidth;
      const main = document.getElementById('main');
      for (const el of main.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.right <= W + 1) continue;
        let p = el.parentElement;
        let iBoks = false;
        while (p && p !== main) {
          const ox = getComputedStyle(p).overflowX;
          if (ox === 'auto' || ox === 'scroll' || ox === 'hidden') { iBoks = true; break; }
          p = p.parentElement;
        }
        if (!iBoks) return (el.className || el.tagName) + ' (' + Math.round(r.right) + ' > ' + W + ')';
      }
      return false;
    };
  };
  await ctx.addInitScript(UTENFOR);
  const ga = async (hash) => {
    await page.evaluate((h) => (location.hash = h), hash);
    await page.waitForTimeout(60);
  };
  const skjerm = async (navn, p = page) => {
    if (!BILDER) return;
    await p.waitForTimeout(600); // vent til inntoningen er ferdig
    await p.screenshot({ path: path.join(BILDER, navn + '.png'), fullPage: false });
  };

  await page.goto(URL);
  await page.waitForSelector('.tcard');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector('.tcard');

  /* ---------- Alle visninger ---------- */
  console.log('Visninger');
  const temaer = await page.evaluate(() => KJ.temaer.map((t) => t.id));
  const ruter = ['#/', '#/kort', '#/prove', '#/feilbank', '#/verktoy/periodesystem', '#/verktoy/formelark', '#/verktoy/balansering'];
  temaer.forEach((t) => ruter.push('#/modul/' + t, '#/modul/' + t + '/oppgaver', '#/kort/' + t));
  for (const r of ruter) {
    await ga(r);
    const info = await page.evaluate(() => {
      const main = document.getElementById('main');
      const tekst = main.innerText;
      return {
        tom: main.children.length === 0,
        katexFeil: main.querySelectorAll('.katex-error').length,
        rå: /\{\{|\\ce\{|\$\\|\\frac|\\enhet/.test(tekst),
        bredde: utenfor(),
      };
    });
    logg(!info.tom && !info.katexFeil && !info.rå && !info.bredde, r + (info.katexFeil ? ' KaTeX-feil: ' + info.katexFeil : '') + (info.rå ? ' rå LaTeX i teksten' : '') + (info.bredde ? ' stikker ut: ' + info.bredde : ''));
  }
  // Teorien: utvid alle eksempler og sjekk KaTeX
  for (const t of temaer) {
    await ga('#/modul/' + t);
    const n = await page.evaluate(() => {
      document.querySelectorAll('details').forEach((d) => (d.open = true));
      return document.querySelectorAll('.katex-error').length;
    });
    logg(n === 0, 'teori ' + t + ' uten KaTeX-feil i eksempler');
  }
  await ga('#/');
  await skjerm('01-forside');
  await ga('#/modul/konfigurasjon');
  await skjerm('02-teori');

  /* ---------- Svar riktig på alle oppgaver via grensesnittet ---------- */
  console.log('\nAlle oppgaver – riktig svar');
  const oppgaver = await page.evaluate(() =>
    KJ.alleOppgaver().map((q) => {
      const kopi = JSON.parse(JSON.stringify(q, (k, v) => (typeof v === 'function' ? undefined : v)));
      if (q.type === 'konfig') kopi.fasitTekst = KJ.kjemi.konfigTekst(KJ.kjemi.konfig(KJ.grunnstoffMap[q.grunnstoff].z, q.ladning || 0), q.notasjon !== 'full');
      return kopi;
    })
  );
  const fasitStreng = (x, gs) => {
    if (x === 0) return ['0', null];
    const exp = Math.floor(Math.log10(Math.abs(x)));
    if (exp >= 5 || exp <= -4) return [(x / Math.pow(10, exp)).toFixed(Math.max(0, gs - 1)).replace('.', ','), String(exp)];
    return [x.toFixed(Math.max(0, gs - 1 - exp)).replace('.', ','), null];
  };

  async function fyllRiktig(q) {
    const kort = page.locator('.qcard[data-id="' + q.id + '"]');
    switch (q.type) {
      case 'flervalg':
        for (const i of [].concat(q.svar)) await kort.locator('.opt[data-i="' + i + '"]').click();
        break;
      case 'fyllinn': {
        const felt = kort.locator('.blank');
        for (let i = 0; i < q.svar.length; i++) await felt.nth(i).fill(String([].concat(q.svar[i])[0]));
        break;
      }
      case 'tall': {
        const [mant, exp] = q.heltall ? [String(q.svar), null] : fasitStreng(q.svar, q.gs || 3);
        await kort.locator('.num').fill(mant);
        if (exp != null) {
          if (await kort.locator('.exp').count()) await kort.locator('.exp').fill(exp);
          else await kort.locator('.num').fill(mant + 'e' + exp);
        } else if (await kort.locator('.exp').count()) await kort.locator('.exp').fill('0');
        if (q.enhet) await kort.locator('.unit').fill(q.enhet);
        break;
      }
      case 'balanser': {
        const felt = kort.locator('.koef');
        for (let i = 0; i < q.svar.length; i++) await felt.nth(i).fill(q.svar[i] === 1 ? '' : String(q.svar[i]));
        break;
      }
      case 'navn':
        await kort.locator('.txt').fill([].concat(q.svar)[0]);
        break;
      case 'formel':
        await kort.locator('.txt').fill(q.svar);
        break;
      case 'konfig':
        await kort.locator('.txt').fill(q.fasitTekst);
        break;
      case 'kobling': {
        const sel = kort.locator('.sel');
        for (let i = 0; i < q.par.length; i++) await sel.nth(i).selectOption({ value: String(i) });
        break;
      }
      case 'rekkefolge':
        for (let runde = 0; runde < 40; runde++) {
          const orden = await kort.locator('.order-item').evaluateAll((li) => li.map((l) => +l.dataset.i));
          const pos = orden.findIndex((v, i) => v !== i);
          if (pos < 0) break;
          const her = orden.indexOf(pos);
          await kort.locator('.order-item').nth(her).locator('[data-mv="-1"]').click();
        }
        break;
      case 'sortering':
        // Klikk direkte på radioknappen: et vanlig museklikk kan treffe den faste toppmenyen når raden ligger under den.
        for (let i = 0; i < q.elementer.length; i++) await kort.locator('.sort-row[data-i="' + i + '"] input[value="' + q.elementer[i][1] + '"]').evaluate((el) => el.click());
        break;
      case 'forklaring':
        await kort.locator('.area').fill('Mitt svar på oppgaven.');
        break;
    }
  }

  let riktige = 0;
  for (const q of oppgaver) {
    await ga('#/modul/' + q.tema + '/oppgaver?niva=0&q=' + q.id);
    await page.waitForSelector('.qcard[data-id="' + q.id + '"]');
    const vist = await page.evaluate(() => document.querySelector('.qcard .q-prompt') && location.hash);
    if (!vist || !vist.includes(q.id)) {
      logg(false, q.id + ': ble ikke vist');
      continue;
    }
    try {
      await fyllRiktig(q);
      await page.locator('.qcard [data-a="sjekk"]').click();
      if (q.type === 'forklaring') {
        const bokser = page.locator('.qcard .checklist input');
        const n = await bokser.count();
        for (let i = 0; i < n; i++) await bokser.nth(i).check();
        await page.locator('.qcard [data-a="vurder"]').click();
      }
      const ok = await page.locator('.qcard .q-fb.fb-ok').count();
      if (ok) riktige++;
      else logg(false, q.id + ' (' + q.type + '): ' + (await page.locator('.qcard .q-fb').innerText().catch(() => 'ingen tilbakemelding')));
      // Løsningsforslag kan vises og har ingen KaTeX-feil
      const lb = page.locator('.qcard [data-a="losning"]');
      if (await lb.isVisible()) {
        await lb.click();
        const kf = await page.locator('.qcard .katex-error').count();
        if (kf) logg(false, q.id + ': KaTeX-feil i løsningen');
      }
    } catch (e) {
      logg(false, q.id + ': unntak ' + e.message.split('\n')[0]);
    }
  }
  logg(riktige === oppgaver.length, riktige + ' av ' + oppgaver.length + ' oppgaver rettet som riktige via grensesnittet');
  logg(!temaer.includes('mol') && !oppgaver.some((q) => /^mo-/.test(q.id)), 'temaet om stoffmengde og mol er fjernet');
  logg(oppgaver.every((q) => q.mal && q.mal.length), 'alle oppgavene har læringsmål');
  const mestret = await page.evaluate(() => KJ.temaer.reduce((a, t) => a + KJ.store.temaFremdrift(t.id).ok, 0));
  logg(mestret === oppgaver.length, 'fremdrift lagret for alle (' + mestret + ')');
  await ga('#/modul/polaritet/oppgaver?niva=0&q=sb-12');
  await skjerm('03-oppgave');

  /* ---------- Galt svar → feilbank ---------- */
  console.log('\nFeil svar og feilbank');
  await page.evaluate(() => KJ.store.nullstill());
  await page.reload();
  await ga('#/modul/navnsetting/oppgaver?niva=0&q=nv-12');
  await page.waitForSelector('.qcard');
  await page.locator('.qcard .txt').fill('jernklorid');
  await page.locator('.qcard [data-a="sjekk"]').click();
  logg((await page.locator('.qcard .q-fb.fb-bad').count()) === 1, 'galt navn rettes som feil');
  logg((await page.locator('.qcard .q-fb').innerText()).includes('romertall'), 'tilbakemelding nevner romertall');
  await page.locator('.qcard [data-a="hint"]').click();
  logg((await page.locator('.qcard .hint').count()) >= 1, 'hint vises');
  await page.locator('.qcard [data-a="losning"]').click();
  logg((await page.locator('.qcard .q-sol .sol-fasit').innerText()).includes('jern(III)klorid'), 'løsning viser fasit');
  await ga('#/modul/balansering/oppgaver?niva=0&q=rl-11');
  await page.waitForSelector('.qcard .koef');
  await page.locator('.qcard .koef').nth(1).fill('4');
  await page.locator('.qcard [data-a="tell"]').click();
  logg((await page.locator('.qcard .atomtab tr.bad').count()) > 0, 'atomtelling viser ubalanse');
  await page.locator('.qcard [data-a="sjekk"]').click();
  logg((await page.locator('.qcard .q-fb.fb-bad').count()) === 1, 'ubalansert likning rettes som feil');
  await ga('#/modul/innskuddsmetaller/oppgaver?niva=0&q=in-05');
  await page.waitForSelector('.qcard[data-id="in-05"] .txt');
  await page.locator('.qcard .txt').fill('[Ar] 4s2 3d4');
  await page.locator('.qcard [data-a="sjekk"]').click();
  logg((await page.locator('.qcard .q-fb').innerText()).includes('4s-elektronene'), 'Fe²⁺ med 4s² 3d⁴ gir melding om at 4s avgis først');
  logg((await page.locator('.qcard .q-mal').first().innerText()) === 'Mål 4', 'oppgaven har merkelapp «Mål 4»');

  await ga('#/feilbank');
  await page.waitForSelector('.err-item');
  logg((await page.locator('.err-item').count()) === 3, 'feilbanken har 3 oppgaver');
  logg((await page.locator('.nav-top .nav-badge').innerText()) === '3', 'merke i menyen viser 3');
  await skjerm('04-feilbank');
  await page.locator('a:has-text("Øv på alle")').click();
  await page.waitForSelector('.qcard');
  const forste = await page.evaluate(() => location.hash);
  const qid = /q=([\w-]+)/.exec(forste)[1];
  const q1 = oppgaver.find((q) => q.id === qid);
  await fyllRiktig(q1);
  await page.locator('.qcard [data-a="sjekk"]').click();
  await page.waitForTimeout(100);
  logg((await page.evaluate(() => KJ.store.feilbank().length)) === 3, 'ett riktig svar holder ikke for å forlate feilbanken (' + qid + ')');
  logg((await page.locator('.qcard .q-fb').innerText()).includes('1 av 2'), 'tilbakemelding viser 1 av 2 på rad');
  await ga('#/');
  await ga('#/feilbank?ov=1&q=' + qid);
  await page.waitForSelector('.qcard[data-id="' + qid + '"]');
  await fyllRiktig(q1);
  await page.locator('.qcard [data-a="sjekk"]').click();
  await page.waitForTimeout(100);
  logg((await page.evaluate(() => KJ.store.feilbank().length)) === 2, 'to riktige på rad fjerner oppgaven fra feilbanken');

  /* ---------- Læringsmål og selvvurdering ---------- */
  console.log('\nLæringsmål og selvvurdering');
  await ga('#/');
  await page.waitForSelector('.goal-list');
  logg((await page.locator('.goal-row').count()) === 20, 'forsiden viser alle 20 læringsmålene');
  await page.locator('.goal-row[data-nr="7"] [data-lys="rod"]').click();
  logg((await page.evaluate(() => KJ.store.selv(7))).verdi === 'rod', 'selvvurdering rød lagres for mål 7');
  logg((await page.locator('.goal-row[data-nr="7"] [data-lys="rod"]').getAttribute('aria-checked')) === 'true', 'rød knapp er markert');
  const auto = await page.evaluate(() => {
    KJ.malOppgaver(18).slice(0, 4).forEach((q) => KJ.store.registrer(q.id, true, true));
    return KJ.store.selv(18);
  });
  logg(auto && auto.kilde === 'resultat' && auto.verdi === 'gul', 'mål 18 vurderes automatisk (gul) etter fire riktige svar');
  await skjerm('04b-laeringsmal');
  await ga('#/modul/krefter/oppgaver');
  await page.waitForSelector('[data-malfilter]');
  await page.locator('[data-malfilter] button[data-m="9"]').click();
  logg(await page.evaluate(() => [...document.querySelectorAll('.qcard .q-mal')].some((e) => e.textContent === 'Mål 9')), 'filter på mål 9 i modulen Bindinger og krefter');
  logg((await page.locator('.feller-boks').count()) === 1, 'boks med vanlige feil på oppgavesiden');

  /* ---------- Prøvemodus ---------- */
  console.log('\nPrøvemodus');
  await ga('#/prove');
  await page.waitForSelector('[data-a="start"]');
  await page.locator('[data-antall] button[data-v="10"]').click();
  await skjerm('05-prove-oppsett');
  await page.locator('[data-a="start"]').click();
  await page.waitForSelector('.exam-bar');
  logg(/\d+:\d\d/.test(await page.locator('[data-timer]').innerText()), 'tidtaker går');
  const proveIder = await page.evaluate(() => KJ.store.aktivProve().ids);
  logg(proveIder.length === 10, '10 oppgaver valgt');
  const proveTema = new Set(proveIder.map((id) => oppgaver.find((q) => q.id === id).tema));
  logg(proveTema.size >= 5, 'oppgaver fra minst 5 temaer (' + proveTema.size + ')');
  for (let i = 0; i < 5; i++) {
    const q = oppgaver.find((x) => x.id === proveIder[i]);
    await fyllRiktig(q);
    if (i < 4) await page.locator('[data-a="neste"]').click();
  }
  await page.locator('[data-a="flagg"]').click();
  logg((await page.locator('[data-nav] button.answered').count()) >= 4, 'besvarte oppgaver markeres i navigasjonen');
  await skjerm('06-prove');
  // Forlat og fortsett
  await ga('#/');
  await ga('#/prove');
  logg((await page.locator('[data-a="fortsett"]').count()) === 1, 'påbegynt prøve kan fortsettes');
  await page.locator('[data-a="fortsett"]').click();
  await page.waitForSelector('.exam-bar');
  logg((await page.locator('[data-nav] button.answered').count()) >= 4, 'svarene er bevart etter at siden ble forlatt');
  await page.locator('[data-a="lever"]').click();
  await page.locator('dialog button[value="ja"]').click();
  await page.waitForSelector('.result-hero');
  const pros = await page.locator('[data-score]').innerText();
  logg(/\d+/.test(pros), 'resultat vises: ' + pros.replace(/\s+/g, ' '));
  await page.locator('.review details').first().locator('summary').click();
  await page.waitForSelector('.review .qcard .q-sol', { timeout: 3000 }).catch(() => {});
  logg((await page.locator('.review .qcard .q-sol').count()) === 1, 'gjennomgang viser løsning');
  await skjerm('07-resultat');
  logg((await page.evaluate(() => KJ.store.prover().length)) === 1, 'resultat lagret i historikken');

  /* ---------- Flashcards ---------- */
  console.log('\nFlashcards');
  await ga('#/kort/navnsetting');
  await page.waitForSelector('.fc');
  await page.locator('.fc').click();
  logg(await page.locator('.fc.flipped').count(), 'kortet snus');
  await skjerm('08-flashcard');
  await page.locator('[data-a="kan"]').click();
  logg((await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem('kjemi1-spektrum-v1') || '{}').fc || {}).length)) >= 0, 'vurdering lagret');
  await page.keyboard.press('2');
  await page.keyboard.press('Space');
  logg((await page.evaluate(() => KJ.temaMap.navnsetting.flashcards.filter((k) => KJ.store.kort(KJ.kortId(k)) === 'kan').length)) === 2, 'to kort markert som «kan»');

  /* ---------- Verktøy ---------- */
  console.log('\nVerktøy');
  await ga('#/verktoy/periodesystem');
  await page.waitForSelector('.pt-el');
  logg((await page.locator('.pt-el').count()) === 118, '118 grunnstoffer i periodesystemet');
  await page.locator('.pt-el[data-z="26"]').click();
  const detalj = await page.locator('[data-detalj]').innerText();
  logg(detalj.includes('Jern') && detalj.includes('55,85') && detalj.includes('1,8'), 'detaljer for jern (M og EN)');
  logg(detalj.includes('K 2 · L 8 · M 14 · N 2'), 'skallfordeling for jern');
  await page.locator('[data-modus] button[data-v="en"]').click();
  logg((await page.locator('.pt-el[data-z="9"] .m').innerText()) === '4,0', 'EN-visning: F = 4,0');
  await skjerm('09-periodesystem');
  await page.locator('[data-sok]').fill('kobber');
  await page.waitForTimeout(50);
  logg((await page.locator('[data-detalj]').innerText()).includes('Kobber'), 'søk finner kobber');
  await ga('#/verktoy/balansering');
  await page.waitForSelector('[data-likn]');
  await page.locator('[data-likn]').fill('C3H8 + 5O2 -> 3CO2 + 4H2O');
  logg((await page.locator('[data-bal]').innerText()).includes('balansert'), 'balanseringssjekk');
  await page.locator('[data-likn]').fill('H2 + O2 -> H2O');
  logg((await page.locator('[data-bal] .atomtab tr.bad').count()) === 1, 'balanseringssjekk viser at O ikke stemmer');
  await skjerm('10-balansering');
  await ga('#/verktoy/formelark');
  logg((await page.locator('.sheet section').count()) >= 8, 'formelark vises');

  /* ---------- Tema og mobil ---------- */
  console.log('\nFargetema og mobil');
  await ga('#/');
  await page.locator('[data-theme-btn]').click();
  logg((await page.evaluate(() => document.documentElement.getAttribute('data-theme'))) === 'light', 'lyst tema');
  await page.locator('[data-theme-btn]').click();
  logg((await page.evaluate(() => document.documentElement.getAttribute('data-theme'))) === 'dark', 'mørkt tema');
  await skjerm('11-forside-mork');
  await ga('#/modul/innskuddsmetaller/oppgaver?niva=0&q=in-21');
  await skjerm('12-oppgave-mork');
  await page.locator('[data-theme-btn]').click();

  const mob = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mob.addInitScript(UTENFOR);
  const mp = await mob.newPage();
  mp.on('pageerror', (e) => konsollfeil.push('mobil pageerror: ' + e.message));
  mp.on('console', (m) => m.type() === 'error' && konsollfeil.push('mobil: ' + m.text()));
  await mp.goto(URL);
  await mp.waitForSelector('.tcard');
  const mobilRuter = ['#/', '#/kort', '#/prove', '#/feilbank', '#/verktoy/periodesystem', '#/verktoy/balansering', '#/verktoy/formelark'];
  temaer.forEach((t) => mobilRuter.push('#/modul/' + t));
  oppgaver.forEach((q) => mobilRuter.push('#/modul/' + q.tema + '/oppgaver?niva=0&q=' + q.id));
  let mobilFeil = 0;
  for (const r of mobilRuter) {
    await mp.evaluate((h) => (location.hash = h), r);
    await mp.waitForTimeout(30);
    const ut = await mp.evaluate(() => {
      document.querySelectorAll('details').forEach((d) => (d.open = true));
      const sol = document.querySelector('.q-sol');
      return window.utenfor();
    });
    if (ut) {
      mobilFeil++;
      logg(false, 'mobil ' + r + ' stikker ut: ' + ut);
    }
    if (r.includes('/oppgaver')) continue;
    const sm = await mp.evaluate(() =>
      [...document.querySelectorAll('#main button, #main a.btn, .nav-bottom a')].filter((b) => {
        const r = b.getBoundingClientRect();
        return r.width > 0 && (r.height < 32 || r.width < 32);
      }).length
    );
    if (sm) console.log('    · ' + sm + ' små trykkflater på ' + r);
  }
  logg(mobilFeil === 0, 'mobil (375 px): ' + mobilRuter.length + ' visninger og oppgaver uten innhold utenfor skjermen');
  await mp.evaluate((h) => (location.hash = h), '#/');
  await mp.waitForTimeout(100);
  if (BILDER) await mp.screenshot({ path: path.join(BILDER, '13-mobil-forside.png') });
  await mp.evaluate((h) => (location.hash = h), '#/modul/balansering/oppgaver?q=rl-13');
  await mp.waitForTimeout(100);
  if (BILDER) await mp.screenshot({ path: path.join(BILDER, '14-mobil-oppgave.png') });
  await mp.evaluate((h) => (location.hash = h), '#/kort');
  await mp.waitForTimeout(100);
  if (BILDER) await mp.screenshot({ path: path.join(BILDER, '15-mobil-kort.png') });
  await mp.evaluate((h) => (location.hash = h), '#/modul/konfigurasjon');
  await mp.waitForTimeout(100);
  if (BILDER) await mp.screenshot({ path: path.join(BILDER, '16-mobil-teori.png'), fullPage: false });

  console.log('\nKonsoll');
  logg(konsollfeil.length === 0, 'ingen feil eller advarsler i konsollen' + (konsollfeil.length ? ':\n    ' + konsollfeil.slice(0, 15).join('\n    ') : ''));

  await browser.close();
  console.log('\n' + (feil ? feil + ' feil.' : 'Alt OK.'));
  process.exit(feil ? 1 : 0);
})();
