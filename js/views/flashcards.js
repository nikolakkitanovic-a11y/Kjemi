/*
 * Flashcards: snu kortet, vurder deg selv («Kan den» / «Øv mer»).
 * Hurtigtaster: mellomrom = snu, ← → = forrige/neste, 1 = øv mer, 2 = kan den.
 */
(function (KJ) {
  'use strict';
  const esc = KJ.esc;

  function alleKort(temaId) {
    const temaer = temaId === 'alle' ? KJ.temaer : [KJ.temaMap[temaId]].filter(Boolean);
    return temaer.reduce((acc, t) => acc.concat(t.flashcards.map((k) => ({ id: KJ.kortId(k), f: k.f, b: k.b, tema: t }))), []);
  }

  KJ.views.cards = function (main, params, temaId) {
    if (temaId !== 'alle' && !KJ.temaMap[temaId]) temaId = 'alle';
    KJ.settTittel('Flashcards');
    let bunke = alleKort(temaId);
    let bareUkjente = params.get('ukjente') === '1';
    let omvendt = false;
    let rekke = bunke.map((_, i) => i);
    let idx = 0;
    let snudd = false;

    main.innerHTML =
      '<div class="view"><section class="container tools-head">' +
      '<p class="eyebrow">Flashcards</p><h1>Begreper og sammensatte ioner</h1>' +
      '<p class="lead">Les forsiden, prøv å svare i hodet, og snu kortet. Vær ærlig når du vurderer deg selv.</p>' +
      '<div class="chips chips-scroll" style="margin-top:18px" role="group" aria-label="Velg bunke" data-bunker></div>' +
      '<div class="btn-row" style="margin-top:12px">' +
      '<button type="button" class="chip" data-a="ukjente" aria-pressed="' + bareUkjente + '">Bare de jeg ikke kan</button>' +
      '<button type="button" class="chip" data-a="omvendt" aria-pressed="false">' + KJ.icon('rotate', 16) + 'Forklaring først</button>' +
      '<button type="button" class="chip" data-a="bland">' + KJ.icon('shuffle', 16) + 'Bland</button>' +
      '</div></section>' +
      '<section class="container fc-wrap" data-scene></section></div>';

    const bunkeEl = main.querySelector('[data-bunker]');
    const scene = main.querySelector('[data-scene]');

    function tegnBunker() {
      const knapp = (id, navn, farge, kort) => {
        const kan = kort.filter((k) => KJ.store.kort(k.id) === 'kan').length;
        return '<a class="chip" href="#/kort' + (id === 'alle' ? '' : '/' + id) + '" aria-pressed="' + (id === temaId) + '" style="--tc:' + (farge || 'var(--ink-3)') + '">' + (farge ? '<span class="dot"></span>' : '') + esc(navn) + ' <span class="mono" style="opacity:.7">' + kan + '/' + kort.length + '</span></a>';
      };
      bunkeEl.innerHTML = knapp('alle', 'Alle', null, alleKort('alle')) + KJ.temaer.map((t) => knapp(t.id, t.tittel, t.farge, alleKort(t.id))).join('');
    }

    function synlige() {
      return rekke.filter((i) => !bareUkjente || KJ.store.kort(bunke[i].id) !== 'kan');
    }

    function tegn() {
      const vis = synlige();
      if (!vis.length) {
        scene.innerHTML =
          '<div class="empty fc-empty">' + KJ.icon('check', 40) + '<h2>Du kan alle kortene her!</h2><p>Bra jobbet. Vis alle kortene igjen for å repetere, eller velg en annen bunke.</p>' +
          '<button type="button" class="btn btn-primary" data-a="vis-alle">Vis alle kortene</button></div>';
        scene.querySelector('[data-a="vis-alle"]').addEventListener('click', () => {
          bareUkjente = false;
          main.querySelector('[data-a="ukjente"]').setAttribute('aria-pressed', 'false');
          idx = 0;
          tegn();
        });
        return;
      }
      if (idx >= vis.length) idx = vis.length - 1;
      if (idx < 0) idx = 0;
      const k = bunke[vis[idx]];
      const status = KJ.store.kort(k.id);
      const forside = omvendt ? k.b : k.f;
      const bakside = omvendt ? k.f : k.b;
      const kan = bunke.filter((x) => KJ.store.kort(x.id) === 'kan').length;
      scene.innerHTML =
        '<div class="fc-meta"><span>Kort ' + (idx + 1) + ' av ' + vis.length + '</span>' +
        '<span class="fc-state">' + (status === 'kan' ? KJ.icon('check', 16) + 'Du kan dette kortet' : status === 'ovmer' ? 'Markert for mer øving' : 'Nytt kort') + '</span>' +
        '<span>' + kan + ' av ' + bunke.length + ' kan</span></div>' +
        '<div class="fc-stage" style="--tc:' + k.tema.farge + '">' +
        '<button type="button" class="fc' + (snudd ? ' flipped' : '') + '" data-a="snu" aria-label="' + (snudd ? 'Vis forsiden' : 'Snu kortet') + '">' +
        '<div class="fc-face fc-front"' + (snudd ? ' aria-hidden="true"' : '') + '><span class="fc-kind">' + esc(k.tema.tittel) + '</span><div class="' + (omvendt ? 'fc-back-t' : 'fc-front-t') + '">' + KJ.fmt(forside) + '</div><span class="fc-hint">Trykk for å snu · <span class="kbd">mellomrom</span></span></div>' +
        '<div class="fc-face fc-back"' + (snudd ? '' : ' aria-hidden="true"') + '><span class="fc-kind">' + (omvendt ? 'Begrep' : 'Forklaring') + '</span><div class="' + (omvendt ? 'fc-front-t' : 'fc-back-t') + '">' + KJ.fmt(bakside) + '</div></div>' +
        '</button></div>' +
        '<div class="fc-grade"><button type="button" class="btn btn-again btn-lg" data-a="ovmer">' + KJ.icon('rotate', 18) + 'Øv mer <span class="kbd">1</span></button>' +
        '<button type="button" class="btn btn-know btn-lg" data-a="kan">' + KJ.icon('check', 18) + 'Kan den <span class="kbd">2</span></button></div>' +
        '<div class="fc-controls"><button type="button" class="btn btn-ghost" data-a="forrige"' + (idx === 0 ? ' disabled' : '') + '>' + KJ.icon('left', 18) + 'Forrige</button>' +
        '<button type="button" class="btn btn-ghost" data-a="neste"' + (idx >= vis.length - 1 ? ' disabled' : '') + '>Neste ' + KJ.icon('right', 18) + '</button></div>' +
        '<div class="bar" style="max-width:720px;width:100%;margin:0 auto;--tc:' + k.tema.farge + '"><i style="width:' + (bunke.length ? (100 * kan) / bunke.length : 0) + '%"></i></div>';
    }

    function snu() {
      snudd = !snudd;
      const fc = scene.querySelector('.fc');
      if (!fc) return;
      fc.classList.toggle('flipped', snudd);
      fc.setAttribute('aria-label', snudd ? 'Vis forsiden' : 'Snu kortet');
      fc.querySelector('.fc-front').toggleAttribute('aria-hidden', snudd);
      fc.querySelector('.fc-back').toggleAttribute('aria-hidden', !snudd);
    }
    function ga(d) {
      const vis = synlige();
      const ny = idx + d;
      if (ny < 0 || ny >= vis.length) return;
      idx = ny;
      snudd = false;
      tegn();
    }
    function vurder(v) {
      const vis = synlige();
      const k = bunke[vis[idx]];
      if (!k) return;
      KJ.store.settKort(k.id, v);
      snudd = false;
      if (bareUkjente && v === 'kan') {
        // kortet forsvinner fra listen, så samme indeks peker på neste kort
      } else if (idx < vis.length - 1) idx++;
      else KJ.toast(v === 'kan' ? 'Ferdig med bunken!' : 'Siste kort i bunken.');
      tegn();
      tegnBunker();
    }

    scene.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]');
      if (!b) return;
      const a = b.dataset.a;
      if (a === 'snu') snu();
      else if (a === 'forrige') ga(-1);
      else if (a === 'neste') ga(1);
      else if (a === 'kan') vurder('kan');
      else if (a === 'ovmer') vurder('ovmer');
    });
    main.querySelector('[data-a="ukjente"]').addEventListener('click', (e) => {
      bareUkjente = !bareUkjente;
      e.currentTarget.setAttribute('aria-pressed', String(bareUkjente));
      idx = 0;
      snudd = false;
      tegn();
    });
    main.querySelector('[data-a="omvendt"]').addEventListener('click', (e) => {
      omvendt = !omvendt;
      e.currentTarget.setAttribute('aria-pressed', String(omvendt));
      snudd = false;
      tegn();
    });
    main.querySelector('[data-a="bland"]').addEventListener('click', () => {
      rekke = KJ.shuffle(rekke);
      idx = 0;
      snudd = false;
      tegn();
      KJ.toast('Kortene er blandet.');
    });

    function tast(e) {
      if (e.target.closest('input, textarea, select') || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === ' ' || e.key === 'Enter') {
        // På knapper og lenker lar vi nettleseren gjøre jobben (kortet er selv en knapp).
        if (e.target.closest('button, a, label')) return;
        e.preventDefault();
        snu();
      } else if (e.key === 'ArrowLeft') ga(-1);
      else if (e.key === 'ArrowRight') ga(1);
      else if (e.key === '1') vurder('ovmer');
      else if (e.key === '2') vurder('kan');
    }
    document.addEventListener('keydown', tast);

    tegnBunker();
    tegn();
    return () => document.removeEventListener('keydown', tast);
  };
})(window.KJ);
