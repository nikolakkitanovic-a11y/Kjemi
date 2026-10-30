/*
 * Feilbank: oppgaver du har svart feil på. Svarer du riktig på første forsøk
 * når du øver på en oppgave her (eller ellers på siden), fjernes den.
 */
(function (KJ) {
  'use strict';
  const esc = KJ.esc;
  const S = KJ.store;

  KJ.views.errors = function (main, params) {
    KJ.settTittel('Feilbank');
    if (params.get('ov')) return ov(main, params);
    liste(main);
    return null;
  };

  function liste(main) {
    const feil = S.feilbank();
    if (!feil.length) {
      main.innerHTML =
        '<div class="view"><section class="container tools-head"><p class="eyebrow">Feilbank</p><h1>Feilbanken er tom</h1></section>' +
        '<section class="container section"><div class="empty">' + KJ.icon('target', 40) + '<h2>Ingen feil å øve på</h2>' +
        '<p>Når du svarer feil på en oppgave, havner den her. Svarer du riktig på første forsøk senere, forsvinner den igjen.</p>' +
        '<a class="btn btn-primary" href="#/">Gå til temaene</a></div></section></div>';
      return;
    }
    const grupper = {};
    feil.forEach((f) => {
      const q = KJ.oppgave(f.id);
      (grupper[q.tema] = grupper[q.tema] || []).push({ q, f });
    });
    main.innerHTML =
      '<div class="view"><section class="container tools-head"><p class="eyebrow">Feilbank</p><h1>' + feil.length + ' oppgave' + (feil.length > 1 ? 'r' : '') + ' å øve på</h1>' +
      '<p class="lead">Her samles oppgavene du har svart feil på. Svarer du riktig på første forsøk, fjernes oppgaven fra feilbanken.</p>' +
      '<div class="btn-row" style="margin-top:18px"><a class="btn btn-primary btn-lg" href="#/feilbank?ov=1">' + KJ.icon('play', 18) + 'Øv på alle</a>' +
      '<button type="button" class="btn btn-danger" data-a="tom">' + KJ.icon('trash', 18) + 'Tøm feilbanken</button></div></section>' +
      '<section class="container section">' +
      KJ.temaer
        .filter((t) => grupper[t.id])
        .map(
          (t) =>
            '<div class="err-group" style="--tc:' + t.farge + '"><h3>' + esc(t.tittel) + ' <span class="muted mono">' + grupper[t.id].length + '</span></h3><div class="err-list">' +
            grupper[t.id]
              .map(
                ({ q, f }) =>
                  '<div class="err-item" data-id="' + q.id + '"><div class="t"><div class="meta">' + KJ.nivaHtml(q.niva) + '<span class="mono">' + KJ.TYPENAVN[q.type] + '</span><span>Feil ' + f.n + ' gang' + (f.n > 1 ? 'er' : '') + '</span></div><p>' + KJ.fmt(KJ.oppgaveTittel(q)) + '</p></div>' +
                  '<a class="btn btn-ghost btn-small" href="#/feilbank?ov=1&q=' + q.id + '">Øv</a>' +
                  '<button type="button" class="ibtn" data-fjern="' + q.id + '" aria-label="Fjern fra feilbanken">' + KJ.icon('x', 18) + '</button></div>'
              )
              .join('') +
            '</div></div>'
        )
        .join('') +
      '</section></div>';

    main.querySelector('[data-a="tom"]').addEventListener('click', () =>
      KJ.bekreft('Tømme feilbanken?', 'Alle oppgavene fjernes fra feilbanken. Fremdriften din ellers beholdes.', 'Tøm', 'Avbryt').then((ja) => {
        if (!ja) return;
        S.tomFeilbank();
        liste(main);
      })
    );
    main.querySelector('.view').addEventListener('click', (e) => {
      const b = e.target.closest('[data-fjern]');
      if (!b) return;
      S.fjernFeil(b.dataset.fjern);
      KJ.toast('Fjernet fra feilbanken.');
      liste(main);
    });
  }

  function ov(main, params) {
    const ider = S.feilbank().map((f) => f.id);
    if (!ider.length) {
      liste(main);
      return null;
    }
    let idx = Math.max(0, ider.indexOf(params.get('q')));
    main.innerHTML =
      '<div class="view"><section class="container tools-head"><nav class="crumb" style="display:flex;gap:8px;color:var(--ink-3);font-size:.88rem;margin-bottom:12px"><a href="#/feilbank" style="text-decoration:none;color:var(--ink-2)">Feilbank</a><span>/</span><span>Øving</span></nav>' +
      '<h1>Øv på feilbanken</h1><p class="lead" data-status></p></section>' +
      '<section class="container practice"><div data-card></div>' +
      '<div class="practice-foot"><button type="button" class="btn btn-ghost" data-a="forrige">' + KJ.icon('left', 18) + 'Forrige</button>' +
      '<button type="button" class="btn btn-primary" data-a="neste">Neste ' + KJ.icon('right', 18) + '</button></div></section></div>';
    const kortEl = main.querySelector('[data-card]');
    const status = main.querySelector('[data-status]');

    function vis() {
      const q = KJ.oppgave(ider[idx]);
      const t = KJ.temaMap[q.tema];
      const k = new KJ.Oppgavekort(q, {
        modus: 'ovelse',
        nummer: idx + 1,
        totalt: ider.length,
        visTema: true,
        onResultat: () => oppdaterStatus(),
      });
      k.el.style.setProperty('--tc', t.farge);
      kortEl.innerHTML = '';
      kortEl.appendChild(k.el);
      main.querySelector('[data-a="forrige"]').disabled = idx === 0;
      main.querySelector('[data-a="neste"]').disabled = idx >= ider.length - 1;
      KJ.settUrl('/feilbank?ov=1&q=' + q.id);
      oppdaterStatus();
    }
    function oppdaterStatus() {
      const igjen = S.feilbank().length;
      status.textContent = 'Oppgave ' + (idx + 1) + ' av ' + ider.length + ' · ' + igjen + ' igjen i feilbanken. Riktig på første forsøk fjerner oppgaven.';
    }
    main.querySelector('[data-a="forrige"]').addEventListener('click', () => {
      if (idx > 0) {
        idx--;
        vis();
        window.scrollTo(0, 0);
      }
    });
    main.querySelector('[data-a="neste"]').addEventListener('click', () => {
      if (idx < ider.length - 1) {
        idx++;
        vis();
        window.scrollTo(0, 0);
      }
    });
    vis();
    return null;
  }
})(window.KJ);
