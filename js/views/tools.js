/*
 * Verktøy: interaktivt periodesystem, formelark og balanseringssjekk.
 */
(function (KJ) {
  'use strict';
  const esc = KJ.esc;
  const C = KJ.kjemi;

  const FANER = [
    ['periodesystem', 'Periodesystem', 'grid'],
    ['formelark', 'Formelark', 'file'],
    ['balansering', 'Balansering', 'scale'],
  ];

  KJ.views.tools = function (main, params, fane) {
    if (!FANER.some((f) => f[0] === fane)) fane = 'periodesystem';
    KJ.settTittel(FANER.find((f) => f[0] === fane)[1]);
    main.innerHTML =
      '<div class="view"><section class="container tools-head"><p class="eyebrow">Verktøy</p><h1>' + FANER.find((f) => f[0] === fane)[1] + '</h1>' +
      '<nav class="tabs" aria-label="Verktøy" style="--tc:var(--ink);border-bottom:1px solid var(--line)">' +
      FANER.map(([id, navn, ikon]) => '<a href="#/verktoy/' + id + '"' + (id === fane ? ' aria-current="page"' : '') + '>' + KJ.icon(ikon, 18) + navn + '</a>').join('') +
      '</nav></section><section class="container" data-tool></section></div>';
    const el = main.querySelector('[data-tool]');
    if (fane === 'formelark') return formelark(el);
    if (fane === 'balansering') return balansering(el);
    return periodesystem(el, params);
  };

  /* ---------- Periodesystem ---------- */
  const BLOKKFARGE = { s: 'var(--k-alk)', p: 'var(--k-hlg)', d: 'var(--k-inn)', f: 'var(--k-lan)' };

  function massetekst(e) {
    if (e.radioaktiv) return '(' + e.M + ')';
    return KJ.tall(e.M, e.M >= 100 ? 2 : e.M < 10 ? 3 : 2);
  }

  function periodesystem(el, params) {
    let modus = params.get('vis') || 'kategori';
    let valgt = KJ.grunnstoffMap[params.get('el')] || KJ.grunnstoffMap.Na;

    const celle = (e) => {
      const rad = e.gruppe == null ? (e.periode === 6 ? 10 : 11) : e.periode + 1;
      const kol = e.gruppe == null ? e.frad + 4 : e.gruppe + 1;
      return (
        '<button type="button" class="pt-el" data-z="' + e.z + '" style="grid-row:' + rad + ';grid-column:' + kol + '" aria-label="' + esc(e.navn) + ', ' + e.sym + ', atomnummer ' + e.z + '">' +
        '<span class="z">' + e.z + '</span><span class="s">' + e.sym + '</span><span class="m"></span></button>'
      );
    };
    let gitter = '<span class="pt-label" style="grid-row:1;grid-column:1"></span>';
    for (let g = 1; g <= 18; g++) gitter += '<span class="pt-label" style="grid-row:1;grid-column:' + (g + 1) + '">' + g + '</span>';
    for (let p = 1; p <= 7; p++) gitter += '<span class="pt-label" style="grid-row:' + (p + 1) + ';grid-column:1">' + p + '</span>';
    gitter += '<span class="pt-ph" style="grid-row:7;grid-column:4">57–71</span><span class="pt-ph" style="grid-row:8;grid-column:4">89–103</span>';
    gitter += '<span style="grid-row:9;grid-column:1/-1;height:10px"></span>';
    gitter += '<div class="pt-focus" style="grid-row:2/5;grid-column:4/14" data-fokus aria-live="polite"></div>';
    gitter += KJ.grunnstoffer.map(celle).join('');

    el.innerHTML =
      '<div class="tools-bar"><div class="seg" role="group" aria-label="Fargelegging" data-modus>' +
      [['kategori', 'Kategori'], ['en', 'Elektronegativitet'], ['blokk', 'Blokk']].map(([v, n]) => '<button type="button" data-v="' + v + '" aria-pressed="' + (v === modus) + '">' + n + '</button>').join('') +
      '</div><label class="search"><span class="sr-only">Søk etter grunnstoff</span>' + KJ.icon('search', 18) + '<input class="inp" type="search" placeholder="Søk etter grunnstoff" data-sok autocomplete="off"></label></div>' +
      '<div class="ptable-wrap"><div class="ptable" style="grid-template-columns:22px repeat(18, minmax(46px, 1fr))" data-tabell>' + gitter + '</div></div>' +
      '<div data-legende></div>' +
      '<div class="panel el-detail" data-detalj></div>';

    const tabell = el.querySelector('[data-tabell]');
    const knapper = [...tabell.querySelectorAll('.pt-el')];

    function farg() {
      knapper.forEach((b) => {
        const e = KJ.grunnstoffer[b.dataset.z - 1];
        let bg;
        if (modus === 'en') {
          bg = e.en == null ? 'var(--sunken)' : 'color-mix(in oklab, var(--en-hi) ' + Math.round(((e.en - 0.7) / 3.3) * 100) + '%, var(--en-lo))';
          b.querySelector('.m').textContent = e.en == null ? '–' : KJ.tall(e.en, 1);
        } else {
          bg = modus === 'blokk' ? BLOKKFARGE[e.blokk] : 'var(--k-' + e.kat + ')';
          b.querySelector('.m').textContent = massetekst(e);
        }
        b.style.setProperty('--k', bg);
        if (modus === 'en' && e.en != null && e.en > 2.6) b.style.color = '#fff';
        else b.style.color = '';
      });
      const leg = el.querySelector('[data-legende]');
      if (modus === 'en') leg.innerHTML = '<div class="en-scale"><span>0,7</span><i></i><span>4,0</span><span class="muted">Paulings skala (lærebokverdier). Tallet i ruten er EN.</span></div>';
      else if (modus === 'blokk')
        leg.innerHTML = '<div class="legend">' + Object.keys(BLOKKFARGE).map((b) => '<span style="--k:' + BLOKKFARGE[b] + '"><i></i>' + b + '-blokk</span>').join('') + '</div>';
      else leg.innerHTML = '<div class="legend">' + Object.keys(KJ.KATEGORIER).map((k) => '<span style="--k:var(--k-' + k + ')"><i></i>' + KJ.KATEGORIER[k] + '</span>').join('') + '<span class="muted">Tallet nederst i ruten er molar masse (g/mol).</span></div>';
    }

    function velg(e, rull) {
      valgt = e;
      knapper.forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.z === e.z)));
      const k = C.konfig(e.z, 0);
      const skall = C.skall(k);
      const val = C.valens(e);
      const ion = C.vanligIon(e);
      const kat = KJ.KATEGORIER[e.kat];
      el.querySelector('[data-fokus]').innerHTML =
        '<div class="big" style="--k:' + (modus === 'blokk' ? BLOKKFARGE[e.blokk] : 'var(--k-' + e.kat + ')') + '"><span class="z">' + e.z + '</span><span class="s">' + e.sym + '</span></div>' +
        '<div class="info"><b>' + esc(cap(e.navn)) + '</b>' + massetekst(e) + ' g/mol · EN ' + (e.en == null ? '–' : KJ.tall(e.en, 1)) + '<br>' + KJ.tex(C.konfigTex(k, true)) + '</div>';
      el.querySelector('[data-detalj]').innerHTML =
        '<div style="display:flex;justify-content:center">' + KJ.skallSVG(e.z, 0) + '</div>' +
        '<div><h2><span class="sym">' + e.sym + '</span> ' + esc(cap(e.navn)) + '</h2>' +
        '<dl class="facts">' +
        fakta('Atomnummer', e.z) +
        fakta('Molar masse', massetekst(e) + ' g/mol' + (e.radioaktiv ? ' <span class="muted">(mest stabile isotop)</span>' : '')) +
        fakta('Elektronegativitet', e.en == null ? '–' : KJ.tall(e.en, 1)) +
        fakta('Gruppe / periode', (e.gruppe || (e.periode === 6 ? 'lantanoid' : 'aktinoid')) + ' / ' + e.periode) +
        fakta('Kategori', kat + ' · ' + e.blokk + '-blokk') +
        (val != null ? fakta('Valenselektroner', val) : '') +
        (ion ? fakta('Vanlig ion', ion.includes('/') ? KJ.ce('H+') + ' / ' + KJ.ce('H-') : KJ.ce(ion)) : '') +
        fakta('Elektronfordeling (skall)', skall.map((n, i) => '<span title="' + 'KLMNOPQ'[i] + '">' + 'KLMNOPQ'[i] + ' ' + n + '</span>').join(' · ')) +
        '</dl>' +
        '<p style="margin-bottom:4px"><span class="muted">Elektronkonfigurasjon:</span> ' + KJ.tex(C.konfigTex(k, true)) + '</p>' +
        '<p class="muted" style="font-size:.88rem">' + KJ.tex(C.konfigTex(k, false)) + (e.z > 103 ? ' (forutsagt)' : '') + '</p>' +
        '</div>';
      KJ.settUrl('/verktoy/periodesystem?el=' + e.sym + (modus !== 'kategori' ? '&vis=' + modus : ''));
      if (rull && window.innerWidth < 900) el.querySelector('[data-detalj]').scrollIntoView({ behavior: KJ.reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }

    tabell.addEventListener('click', (e) => {
      const b = e.target.closest('.pt-el');
      if (b) velg(KJ.grunnstoffer[b.dataset.z - 1], true);
    });
    el.querySelector('[data-modus]').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      modus = b.dataset.v;
      e.currentTarget.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      farg();
      velg(valgt);
    });
    const sok = el.querySelector('[data-sok]');
    function treff() {
      const s = sok.value.trim().toLowerCase();
      if (!s) return [];
      return KJ.grunnstoffer.filter((e) => e.sym.toLowerCase() === s || String(e.z) === s || e.navn.startsWith(s) || (s.length > 2 && e.navn.includes(s)));
    }
    sok.addEventListener('input', () => {
      const t = treff();
      const ids = new Set(t.map((e) => e.z));
      knapper.forEach((b) => b.classList.toggle('dim', !!sok.value.trim() && !ids.has(+b.dataset.z)));
      if (t.length === 1) velg(t[0]);
    });
    sok.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const t = treff();
        if (t.length) {
          velg(t[0], true);
          knapper[t[0].z - 1].focus();
        }
      }
    });

    farg();
    velg(valgt);
    return null;
  }

  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const fakta = (dt, dd) => '<div class="fact"><dt>' + dt + '</dt><dd>' + dd + '</dd></div>';

  /* ---------- Formelark ---------- */
  function formelark(el) {
    el.innerHTML =
      '<div class="btn-row" style="margin:16px 0"><button type="button" class="btn btn-ghost btn-small" data-a="skriv">' + KJ.icon('download', 16) + 'Skriv ut / lagre som PDF</button></div>' +
      '<div class="sheet">' +
      KJ.formelark
        .map(
          (s) =>
            '<section><h3>' + esc(s.tittel) + '</h3>' +
            (s.formler || []).map((f) => '<div class="frm"><div>' + KJ.tex(f.tex, false) + '</div><div class="t">' + KJ.fmt(f.tekst) + '</div></div>').join('') +
            (s.tabell ? KJ.tabellHtml(s.tabell) : '') +
            (s.merk ? '<p class="muted" style="font-size:.85rem;margin:6px 0 0">' + KJ.fmt(s.merk) + '</p>' : '') +
            (s.ioner ? KJ.tabellHtml({ hode: ['Formel', 'Navn', 'Ladning'], rader: KJ.tavlaIoner().map((i) => ['{{' + i.formel + '}}', i.navn, KJ.ladningTekst(i.ladning)]) }) : '') +
            '</section>'
        )
        .join('') +
      '</div>';
    el.querySelector('[data-a="skriv"]').addEventListener('click', () => window.print());
    return null;
  }

  /* ---------- Balanseringssjekk ---------- */
  function balansering(el) {
    el.innerHTML =
      '<div class="calc">' +
      '<div class="panel"><h2 style="font-size:1.3rem;margin-bottom:6px">Sjekk balansering</h2><p class="muted" style="font-size:.92rem">Skriv likningen med pil (->) og mellomrom rundt +. Tabellen viser antall atomer av hvert grunnstoff på hver side.</p>' +
      '<label class="fld fld-wide"><span class="fld-l">Likning</span><input class="inp mono" data-likn autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="2H2 + O2 -> 2H2O"></label>' +
      '<div class="calc-quick">' + ['H2 + O2 -> H2O', 'CH4 + 2O2 -> CO2 + 2H2O', 'Al + O2 -> Al2O3', '2Al(OH)3 + 3H2SO4 -> Al2(SO4)3 + 6H2O'].map((f) => '<button type="button" class="btn btn-ghost btn-small" data-ex="' + esc(f) + '">' + KJ.ce(f) + '</button>').join('') + '</div>' +
      '<div data-bal aria-live="polite" style="margin-top:12px"></div></div>' +
      '<div class="panel"><h2 style="font-size:1.3rem;margin-bottom:6px">Koeffisient eller indeks?</h2>' +
      KJ.fmtBlock(`- **Koeffisienten** (tallet foran formelen) sier hvor mange partikler det er. Den kan du endre når du balanserer.
- **Indeksen** (det lille tallet i formelen) er en del av stoffet. Endrer du den, får du et annet stoff: {{H2O}} er vann, {{H2O2}} er hydrogenperoksid.
- Koeffisienten ganges med alle atomene i formelen: $3\\,\\ce{H2SO4}$ har 6 H, 3 S og 12 O.`) +
      '</div></div>';
    const lIn = el.querySelector('[data-likn]');
    const bal = el.querySelector('[data-bal]');
    function sjekk() {
      const s = lIn.value.trim();
      if (!s) return (bal.innerHTML = '');
      try {
        const l = C.parseLikning(s);
        const b = C.balanse(l.venstre, l.hoyre);
        const koef = l.venstre.concat(l.hoyre).map((x) => x.koef);
        const g = koef.reduce((a, x) => C.gcd(a, x));
        let dom;
        if (b.balansert && g === 1) dom = '<div class="fb-ok"><div class="fb-inner">' + KJ.icon('check', 18) + '<p class="fb-main">Likningen er balansert.</p></div></div>';
        else if (b.balansert) dom = '<div class="fb-info"><div class="fb-inner">' + KJ.icon('info', 18) + '<p class="fb-main">Balansert, men koeffisientene kan deles på ' + g + '.</p></div></div>';
        else dom = '<div class="fb-bad"><div class="fb-inner">' + KJ.icon('x', 18) + '<p class="fb-main">Ikke balansert ennå.</p></div></div>';
        const vis = (side) => side.map((x) => (x.koef > 1 ? x.koef : '') + x.p.ce).join(' + ');
        bal.innerHTML = '<p style="font-size:1.1rem">' + KJ.ce(vis(l.venstre) + ' -> ' + vis(l.hoyre)) + '</p>' + dom + '<div style="margin-top:10px">' + KJ.atomTabell(b) + '</div>';
      } catch (e) {
        bal.innerHTML = '<p class="muted">' + esc(e.kjemi ? e.message : 'Klarte ikke å lese likningen.') + '</p>';
      }
    }
    lIn.addEventListener('input', sjekk);
    el.querySelector('.calc-quick').addEventListener('click', (e) => {
      const b = e.target.closest('[data-ex]');
      if (!b) return;
      lIn.value = b.dataset.ex;
      sjekk();
    });
    return null;
  }
})(window.KJ);
