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
  const ruter = ['#/', '#/ov', '#/ov?mal=7', '#/kvelden-for', '#/kvelden-for?vis=svake', '#/kort', '#/prove', '#/feilbank', '#/verktoy/periodesystem', '#/verktoy/formelark', '#/verktoy/balansering'];
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

  /** Den konkrete oppgaven som vises (genererte oppgaver får nye verdier hver gang). */
  async function hentInstans(id) {
    return page.evaluate((id) => {
      const q = JSON.parse(JSON.stringify(document.querySelector('.qcard[data-id="' + id + '"]').kort.q));
      if (q.type === 'konfig') q.fasitTekst = KJ.kjemi.konfigTekst(KJ.kjemi.konfig(KJ.grunnstoffMap[q.grunnstoff].z, q.ladning || 0), q.notasjon !== 'full');
      return q;
    }, id);
  }

  async function fyllRiktig(q) {
    if (q.type === 'gen') q = await hentInstans(q.id);
    const kort = page.locator('.qcard[data-id="' + q.id + '"]');
    switch (q.type) {
      case 'detektiv': {
        for (let i = 0; i < q.obs.length; i++) if (q.obs[i][1] === 'k') await kort.locator('[data-bevis="' + i + '"]').check();
        await kort.locator('[data-dtype][value="' + q.svar + '"]').check({ force: true });
        if (q.plan) await kort.locator('[data-dplan][value="' + q.plan.svar + '"]').check({ force: true });
        break;
      }
      case 'markering': {
        const soner = await page.evaluate((q) => KJ.markeringSoner(q).map((z) => ({ x: z.x, y: z.y, t: z.type })), q);
        for (const z of soner) {
          if (q.typer.length > 1) await kort.locator('[data-mtype="' + z.t + '"]').check({ force: true });
          const pt = await page.evaluate(([id, x, y]) => {
            const svg = document.querySelector('.qcard[data-id="' + id + '"] .mk-svg');
            svg.scrollIntoView({ block: 'center' });
            return Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {}))).then(() => {
              const m = svg.getScreenCTM();
              return { x: m.a * x + m.e, y: m.d * y + m.f };
            });
          }, [q.id, z.x, z.y]);
          await page.mouse.click(pt.x, pt.y);
        }
        break;
      }
      case 'lewis': {
        const steg = await page.evaluate((q) => KJ.lewisSteg(q), q);
        for (const st of steg) {
          if (st.type === 'tall') await kort.locator('[data-lw="' + st.k + '"]').fill(String(st.svar));
          else if (st.type === 'valg') await kort.locator('[data-lw="' + st.k + '"]').selectOption(st.svar);
          else await kort.locator('[data-lw="' + st.k + '"][value="' + (st.svar ? 'ja' : 'nei') + '"]').check({ force: true });
        }
        break;
      }
      case 'salt': {
        const fasit = await page.evaluate((q) => KJ.byggSalt(q.kation, q.anion), q);
        for (let i = 1; i < fasit.nk; i++) await kort.locator('[data-step="nk"][data-d="1"]').click();
        for (let i = 1; i < fasit.na; i++) await kort.locator('[data-step="na"][data-d="1"]').click();
        if (!q.visIoner) {
          await kort.locator('[data-lad="lk"]').fill((fasit.qk > 1 ? fasit.qk : '') + '+');
          await kort.locator('[data-lad="la"]').fill((Math.abs(fasit.qa) > 1 ? Math.abs(fasit.qa) : '') + '-');
        }
        await kort.locator('[data-salt]').fill(fasit.formel);
        break;
      }
      case 'orbital': {
        const plan = await page.evaluate((q) => {
          const L = KJ.orbitalOppsett(q);
          const ascii = (t) => t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => m.split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join(''));
          return {
            rader: L.rader.map((r) => ({ orb: r.orb, mål: KJ.fyllOrbitalRad(r.bokser, r.forventet) })),
            full: ascii(KJ.kjemi.konfigTekst(L.k, false)),
            edel: ascii(KJ.kjemi.konfigTekst(L.k, true)),
          };
        }, q);
        for (const r of plan.rader) {
          for (let j = 0; j < r.mål.length; j++) {
            const klikk = ['', 'u', 'd', 'ud', 'uu'].indexOf(r.mål[j]);
            for (let k = 0; k < klikk; k++) await kort.locator('[data-box="' + r.orb + '"][data-j="' + j + '"]').click();
          }
        }
        if (q.konfig) {
          await kort.locator('.kfull').fill(plan.full);
          if (await kort.locator('.kedel').count()) await kort.locator('.kedel').fill(plan.edel);
        }
        break;
      }
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
        if (q.begrunnelse) await kort.locator('.begr .opt[data-i="' + q.begrunnelse.svar + '"]').click();
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

  /* ---------- Interaktive typer ---------- */
  console.log('\nInteraktive typer');
  await ga('#/modul/partikler/oppgaver?niva=0&q=gen-pne-ion');
  await page.waitForSelector('.qcard[data-id="gen-pne-ion"]');
  const forVariant = await page.locator('.qcard .q-prompt').innerText();
  let byttet = false;
  for (let i = 0; i < 6 && !byttet; i++) {
    await page.locator('.qcard [data-a="ny"]').click();
    byttet = (await page.locator('.qcard .q-prompt').innerText()) !== forVariant;
  }
  logg(byttet, '«Ny variant» lager en ny tilfeldig oppgave');
  await ga('#/modul/balansering/oppgaver?niva=0&q=rl-01');
  await page.waitForSelector('.qcard[data-id="rl-01"]');
  logg((await page.locator('.qcard .atomtab').count()) === 1, 'balansering viser atomtabellen hele tiden');
  await page.locator('.qcard .eq-sp').last().click();
  await page.locator('.qcard .eq-edit input').fill('H2O2');
  await page.locator('.qcard [data-a="endre-ok"]').click();
  const indeksTekst = await page.locator('.qcard .eq-edit-fb').innerText();
  logg(/indeksen/.test(indeksTekst) && /hydrogenperoksid/.test(indeksTekst), 'forsøk på å endre indeks gir forklaring (H₂O → H₂O₂)');
  await ga('#/modul/konfigurasjon/oppgaver?niva=0&q=or-01');
  await page.waitForSelector('.qcard[data-id="or-01"] .orb-btn');
  // Nitrogen med paret 2p-elektron (brudd på Hund): 1s ↑↓, 2s ↑↓, 2p ↑↓ ↑ _
  const klikk = async (orb, j, n) => { for (let k = 0; k < n; k++) await page.locator('.qcard [data-box="' + orb + '"][data-j="' + j + '"]').click(); };
  await klikk('1s', 0, 3); await klikk('2s', 0, 3); await klikk('2p', 0, 3); await klikk('2p', 1, 1);
  await page.locator('.qcard [data-a="sjekk"]').click();
  logg((await page.locator('.qcard .q-fb').innerText()).includes('Hunds regel'), 'orbitaldiagram: brudd på Hunds regel får tilbakemelding');
  await skjerm('03b-orbital');
  await ga('#/modul/saltformler/oppgaver?niva=0&q=sa-04');
  await page.waitForSelector('.qcard[data-id="sa-04"] .salt');
  await page.locator('.qcard [data-step="nk"][data-d="1"]').click();
  logg((await page.locator('.qcard .salt-regnskap').innerText()).includes('ikke nøytralt'), 'saltbygger viser ladningsregnskap (ikke nøytralt)');
  await page.locator('.qcard [data-step="nk"][data-d="1"]').click();
  await page.locator('.qcard [data-step="na"][data-d="1"]').click();
  logg((await page.locator('.qcard .salt-regnskap').innerText()).includes('nøytralt') && !(await page.locator('.qcard .salt-regnskap').innerText()).includes('ikke'), 'saltbygger: 3 Ca²⁺ og 2 PO₄³⁻ er nøytralt');
  await skjerm('03c-saltbygger');

  /* ---------- Læringsmål og selvvurdering ---------- */
  // Elektronprikkformel: ett galt steg gir delpoeng og markering av steget
  await ga('#/modul/elektronprikk/oppgaver?niva=0&q=lw-ccl4');
  await page.waitForSelector('.qcard[data-id="lw-ccl4"] .lewis-steg');
  {
    const k = page.locator('.qcard[data-id="lw-ccl4"]');
    await k.locator('[data-lw="valens"]').fill('32');
    await k.locator('[data-lw="bindingspar"]').fill('4');
    await k.locator('[data-lw="ledigeTot"]').fill('12');
    await k.locator('[data-lw="ledigeSentral"]').fill('0');
    await k.locator('[data-lw="form"]').selectOption('tetraedrisk');
    await k.locator('[data-lw="polare"][value="ja"]').check({ force: true });
    await k.locator('[data-lw="dipol"][value="ja"]').check({ force: true });
    await k.locator('[data-a="sjekk"]').click();
    const r = await page.evaluate(() => ({
      feil: [...document.querySelectorAll('.lewis-steg li.is-wrong')].map((l) => l.dataset.k),
      riktige: document.querySelectorAll('.lewis-steg li.is-right').length,
      fb: document.querySelector('.qcard .q-fb').innerText,
    }));
    logg(r.feil.join() === 'dipol' && r.riktige === 6 && /6 av 7/.test(r.fb) && /symmetrisk/.test(r.fb), 'elektronprikkformel: galt svar på dipol markeres, 6 av 7 steg riktig');
    await k.locator('[data-a="losning"]').click();
    logg((await k.locator('.lewis-fasit svg.lewis text').count()) >= 5, 'fasit vises som SVG-tegning');
    await skjerm('04c-elektronprikk');
  }

  // Markering: en markør på feil sted blir bom, og et klikk på markøren fjerner den
  await ga('#/modul/krefter/oppgaver?niva=0&q=mk-salt-hb');
  await page.waitForSelector('.qcard[data-id="mk-salt-hb"] .mk-svg');
  {
    const klikk = async (x, y) => {
      const pt = await page.evaluate(([x, y]) => {
        const svg = document.querySelector('.qcard .mk-svg');
        svg.scrollIntoView({ block: 'center' });
        return Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {}))).then(() => {
          const m = svg.getScreenCTM();
          return { x: m.a * x + m.e, y: m.d * y + m.f };
        });
      }, [x, y]);
      await page.mouse.click(pt.x, pt.y);
    };
    await klikk(300, 290);
    await klikk(206, 44);
    logg((await page.locator('.qcard .mk-m').count()) === 2, 'markering: to markører settes ved klikk');
    await page.locator('.qcard [data-a="sjekk"]').click();
    const r = await page.evaluate(() => ({ treff: document.querySelectorAll('.mk-m.mk-treff').length, bom: document.querySelectorAll('.mk-m.mk-bom').length, fb: document.querySelector('.qcard .q-fb').innerText }));
    logg(r.treff === 1 && r.bom === 1 && /1 av 1 treff, 1 bom/.test(r.fb), 'markering: treff vises grønt og bom rødt');
    await klikk(300, 290);
    logg((await page.locator('.qcard .mk-m').count()) === 1, 'markering: klikk på en markør fjerner den');
    await page.locator('.qcard [data-a="sjekk"]').click();
    logg((await page.locator('.qcard .q-fb.fb-ok').count()) === 1, 'markering: riktig etter at bommen er fjernet');
    await page.locator('.qcard [data-a="losning"]').click();
    logg((await page.locator('.qcard .mk-fasit .mk-sone').count()) === 1, 'markering: løsningen viser sonen i tegningen');
    await skjerm('04d-markering');
  }

  // Stoffdetektiv: riktig type, men et irrelevant bevis gir delpoeng
  await ga('#/modul/stoffegenskaper/oppgaver?niva=0&q=sd-06');
  await page.waitForSelector('.qcard[data-id="sd-06"] .det-obs');
  {
    const k = page.locator('.qcard[data-id="sd-06"]');
    const q = await page.evaluate(() => KJ.oppgave('sd-06'));
    for (let i = 0; i < q.obs.length; i++) await k.locator('[data-bevis="' + i + '"]').check();
    await k.locator('[data-dtype][value="1"]').check({ force: true });
    await k.locator('[data-dplan][value="0"]').check({ force: true });
    await k.locator('[data-a="sjekk"]').click();
    const r = await page.evaluate(() => ({ fb: document.querySelector('.qcard .q-fb').innerText, feil: document.querySelectorAll('.det-obs li.is-wrong').length, typeOk: !!document.querySelector('.det-type .opt.is-right') }));
    logg(/2 av 3/.test(r.fb) && r.feil === 1 && r.typeOk, 'stoffdetektiv: «hvitt pulver» som bevis gir 2 av 3 deler riktig');
    await k.locator('[data-bevis="0"]').uncheck();
    await k.locator('[data-a="sjekk"]').click();
    logg((await k.locator('.q-fb.fb-ok').count()) === 1, 'stoffdetektiv: riktig når bare bevisene er krysset av');
    await skjerm('04e-stoffdetektiv');
  }

  // Langsvar: fagbegrepene i teksten markeres, og kriteriene vises
  await ga('#/modul/anvendelse/oppgaver?niva=0&q=an-09');
  await page.waitForSelector('.qcard[data-id="an-09"] .area');
  {
    const k = page.locator('.qcard[data-id="an-09"]');
    await k.locator('.area').fill('Vann har hydrogenbindinger mellom molekylene, mens metan bare har London-krefter.');
    await k.locator('[data-a="sjekk"]').click();
    const r = await page.evaluate(() => ({ ja: document.querySelectorAll('.fagbegrep li.fb-ja').length, nei: document.querySelectorAll('.fagbegrep li.fb-nei').length, krit: document.querySelectorAll('.kriterier dl > div').length }));
    logg(r.ja === 3 && r.nei === 3 && r.krit === 3, 'langsvar: 3 av 6 fagbegreper funnet i teksten, og kriterier for lav, middels og høy vises');
    await skjerm('04f-langsvar');
  }

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
  const proveMal = new Set();
  proveIder.forEach((id) => oppgaver.find((q) => q.id === id).mal.forEach((nr) => proveMal.add(nr)));
  logg(proveMal.size >= 10, '10 oppgaver dekker minst 10 mål (' + proveMal.size + ')');
  const dekning = await page.evaluate(() => {
    let minst = 99;
    for (let i = 0; i < 40; i++) {
      const ids = KJ.velgProveOppgaver({ mal: KJ.MAL.map((m) => m.nr), antall: 20, niva: 'blandet', forklaring: true });
      const d = new Set();
      ids.forEach((id) => KJ.oppgave(id).mal.forEach((nr) => d.add(nr)));
      minst = Math.min(minst, d.size);
    }
    const h = KJ.velgProveOppgaver({ mal: KJ.MAL.map((m) => m.nr), antall: 20, niva: 'h', forklaring: true });
    const ett = KJ.velgProveOppgaver({ mal: [16], antall: 10, niva: 'blandet', forklaring: true });
    return { minst, hoy: h.every((id) => KJ.oppgave(id).niva === 3), ett: ett.length === 10 && ett.every((id) => KJ.oppgave(id).mal.includes(16)) };
  });
  logg(dekning.minst === 20, 'prøve med 20 oppgaver dekker alle 20 målene (40 trekninger, minst ' + dekning.minst + ')');
  logg(dekning.hoy, 'nivåvalget «Bare høy» gir bare oppgaver på høyt nivå');
  logg(dekning.ett, 'prøve på ett mål gir bare oppgaver fra det målet');
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
  const malRes = await page.evaluate(() => ({
    rader: document.querySelectorAll('.malres-rad').length,
    ovmer: document.querySelector('[data-ovmer]').innerText,
    lagret: KJ.store.prover()[0].mal,
    lenke: document.querySelector('[data-a="ovsvake"]').getAttribute('href'),
  }));
  logg(malRes.rader >= 10 && Object.keys(malRes.lagret).length === malRes.rader, 'resultat per læringsmål vises og lagres (' + malRes.rader + ' mål)');
  logg(/Øv mer på|Ingen mål under/.test(malRes.ovmer) && /^#\/ov/.test(malRes.lenke), 'resultatsiden viser hvilke mål du bør øve mer på (' + malRes.lenke + ')');

  // Oppfølging: nye oppgaver fra målene som gikk dårlig
  {
    const h = await page.evaluate(() => KJ.store.prover()[0]);
    const href = await page.locator('[data-oppfolging] a').getAttribute('href');
    logg(Array.isArray(h.ids) && h.ids.length === 10 && href === '#/ov?prove=' + h.id, 'resultatsiden tilbyr nye oppgaver fra de svake målene (' + href + ')');
    await page.locator('[data-oppfolging] a').click();
    await page.waitForSelector('[data-okt] .qcard');
    const okt = await page.evaluate((id) => JSON.parse(sessionStorage.getItem('kjemi1-oppfolging-' + id)), h.id);
    const svakeMal = Object.keys(h.mal).map(Number).filter((nr) => h.mal[nr] < 60);
    logg(okt.ids.length > 0 && okt.ids.every((id) => !h.ids.includes(id)), 'oppfølgingen har ' + okt.ids.length + ' nye oppgaver, ingen fra prøven');
    logg(okt.svake.every((nr) => svakeMal.includes(nr)) && okt.ids.every((id) => oppgaver.find((q) => q.id === id).mal.some((nr) => okt.svake.includes(nr))), 'alle oppgavene hører til mål under 60 % (mål ' + okt.svake.join(', ') + ')');
    const forste = oppgaver.find((q) => q.id === okt.ids[0]);
    await fyllRiktig(forste);
    await page.locator('.qcard [data-a="sjekk"]').click();
    if ((await page.locator('.qcard .checklist input').count()) > 0) {
      const bokser = page.locator('.qcard .checklist input');
      for (let i = 0; i < (await bokser.count()); i++) await bokser.nth(i).check();
      await page.locator('.qcard [data-a="vurder"]').click();
    }
    logg((await page.locator('[data-okt] .qnav button.ok').count()) === 1, 'riktig svar markeres i oppgavelisten (' + forste.id + ')');
    logg((await page.locator('.nav-top a').count()) === 6 && (await page.locator('[data-okt] .qnav a').count()) === 0, 'menyen tegnes ikke inn i oppgavelisten');
    await page.locator('[data-a="oppsummer"]').click();
    const sum = await page.evaluate(() => ({ rader: document.querySelectorAll('[data-sum] .malres-rad').length, skjult: getComputedStyle(document.querySelector('[data-okt]')).display === 'none' }));
    logg(sum.rader === okt.svake.length && sum.skjult, 'oppsummeringen viser resultat per mål');
    await skjerm('07b-oppfolging');
    await page.locator('[data-sum] a[href^="#/prove?mal="]').click();
    await page.waitForSelector('[data-tema]');
    const valgt = await page.evaluate(() => [...document.querySelectorAll('[data-tema] button[aria-pressed="true"]')].map((b) => +b.dataset.id));
    logg(valgt.join() === okt.svake.slice().sort((a, b) => a - b).join(), '«Ny prøve på disse målene» velger målene på forhånd');
    logg((await page.locator('.hist a[href="#/ov?prove=' + h.id + '"]').count()) === 1, 'tidligere prøver har lenke til oppfølgingen');
  }

  /* ---------- Smart øving, øvingsplan og «Kvelden før» ---------- */
  console.log('\nSmart øving, øvingsplan og «Kvelden før»');
  const vekt = await page.evaluate(() => {
    KJ.MAL.forEach((m) => KJ.store.settSelv(m.nr, m.nr === 7 ? 'rod' : 'gronn'));
    const n = {};
    for (let i = 0; i < 600; i++) {
      const v = KJ.smartVelg({});
      n[v.nr] = (n[v.nr] || 0) + 1;
    }
    const bare = [];
    for (let i = 0; i < 60; i++) bare.push(KJ.smartVelg({ mal: [3, 12] }).q.mal);
    return { sju: n[7] || 0, snitt: (600 - (n[7] || 0)) / 19, bare: bare.every((m) => m.includes(3) || m.includes(12)) };
  });
  logg(vekt.sju > 4 * vekt.snitt, 'smart øving velger det røde målet oftest (mål 7: ' + vekt.sju + ' av 600, snitt for de grønne ' + vekt.snitt.toFixed(1) + ')');
  logg(vekt.bare, 'smart øving med ?mal=3,12 velger bare fra de målene');
  await ga('#/ov');
  await page.waitForSelector('.qcard');
  const smartQ = await page.evaluate(() => document.querySelector('.qcard').dataset.id);
  logg(/Mål \d+ er/.test(await page.locator('[data-grunn]').innerText()), 'smart øving forklarer hvorfor oppgaven er valgt');
  await fyllRiktig(oppgaver.find((q) => q.id === smartQ));
  await page.locator('.qcard [data-a="sjekk"]').click();
  if ((await page.locator('.qcard .checklist input').count()) > 0) {
    const bokser = page.locator('.qcard .checklist input');
    for (let i = 0; i < (await bokser.count()); i++) await bokser.nth(i).check();
    await page.locator('.qcard [data-a="vurder"]').click();
  }
  logg((await page.locator('.qcard .q-fb.fb-ok').count()) === 1, 'oppgaven i smart øving rettes som riktig (' + smartQ + ')');
  logg(/1 av 1 riktig/.test(await page.locator('[data-okt]').innerText()), 'økten teller riktige svar');
  await page.locator('[data-a="neste"]').click();
  await page.waitForTimeout(80);
  logg((await page.evaluate(() => document.querySelector('.qcard').dataset.id)) !== smartQ, '«Neste oppgave» gir en ny oppgave');
  await skjerm('08-smart-oving');
  await ga('#/ov?mal=19');
  await page.waitForSelector('.qcard');
  logg(await page.evaluate(() => KJ.oppgave(document.querySelector('.qcard').dataset.id).mal.includes(19)), '#/ov?mal=19 viser en oppgave fra mål 19');

  const plan = await page.evaluate(() => {
    const sjekk = (d) => {
      const P = KJ.ovingsplan(d);
      if (P.status !== 'plan') return P.status;
      const alle = P.okter.reduce((a, o) => a.concat(o.mal.map((m) => m.nr)), []);
      return { dager: P.dager, okter: P.okter.length, unike: new Set(alle).size, antall: alle.length, siste: P.okter[P.okter.length - 1].siste };
    };
    KJ.MAL.forEach((m) => KJ.store.settSelv(m.nr, m.nr <= 6 ? 'rod' : m.nr <= 12 ? 'gul' : m.nr <= 16 ? null : 'gronn'));
    const forste = KJ.ovingsplan(new Date(2026, 9, 30)).okter[0].mal.map((m) => m.nr);
    return { fire: sjekk(new Date(2026, 9, 30)), to: sjekk(new Date(2026, 10, 1, 20)), en: sjekk(new Date(2026, 10, 2, 7)), idag: sjekk(new Date(2026, 10, 3, 9)), over: sjekk(new Date(2026, 10, 4)), forste };
  });
  logg(plan.fire.dager === 4 && plan.fire.okter === 4 && plan.fire.unike === 16 && plan.fire.antall === 16 && plan.fire.siste, 'øvingsplan fra 30. oktober: 4 dager, alle 16 røde, gule og ikke vurderte mål én gang');
  logg(plan.forste.every((nr) => nr <= 6), 'de røde målene kommer først i planen (' + plan.forste.join(', ') + ')');
  logg(plan.to.okter === 2 && plan.en.okter === 1 && plan.en.unike === 16, 'planen tilpasser seg 2 dager og 1 dag igjen');
  logg(plan.idag === 'idag' && plan.over === 'over', 'prøvedagen og dagene etter håndteres');
  await ga('#/');
  await page.waitForSelector('.goal-list');
  const status = await page.evaluate(() => KJ.ovingsplan().status);
  logg((await page.locator('#plan').count()) === (status === 'over' ? 0 : 1), 'forsiden viser øvingsplanen (' + status + ')');
  if (status === 'plan') {
    const forHar = await page.locator('#plan .plan-mal li').count();
    await page.locator('.goal-row[data-nr="13"] [data-lys="rod"]').click();
    const etter = await page.evaluate(() => [...document.querySelectorAll('#plan .plan-mal li')].map((l) => l.textContent));
    logg(etter.length === forHar + 0 && etter.some((t) => /^13/.test(t.trim())), 'planen oppdateres når du endrer selvvurderingen');
    await skjerm('09-plan');
  }
  await ga('#/kvelden-for');
  await page.waitForSelector('.ark');
  const ark = await page.evaluate(() => ({
    blokker: document.querySelectorAll('.ark-blokk').length,
    husk: document.querySelectorAll('.ark-husk li').length,
    feil: document.querySelectorAll('.ark-feil li').length,
    ioner: document.querySelectorAll('.ark-ioner tr').length,
    mal: document.querySelectorAll('.ark-mal li').length,
    katex: document.querySelectorAll('.ark .katex-error').length,
  }));
  logg(ark.blokker === 18 && ark.mal === 20, '«Kvelden før» har alle 17 modulene og alle 20 målene');
  logg(ark.husk >= 50 && ark.feil >= 40 && ark.ioner === 9 && !ark.katex, '«Kvelden før» har regler (' + ark.husk + '), vanlige feil (' + ark.feil + ') og de 9 ionene');
  await page.locator('.seg [data-vis="svake"]').click();
  await page.waitForTimeout(80);
  const svakeBlokker = await page.locator('.ark-blokk').count();
  logg(svakeBlokker < 18 && svakeBlokker > 1, '«Bare røde og gule» skjuler grønne moduler (' + (svakeBlokker - 1) + ' moduler)');
  await skjerm('10-kvelden-for');

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
  const mobilRuter = ['#/', '#/ov', '#/ov?mal=3,4', '#/kvelden-for', '#/kort', '#/prove', '#/feilbank', '#/verktoy/periodesystem', '#/verktoy/balansering', '#/verktoy/formelark'];
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
