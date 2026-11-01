/*
 * Oppfølging etter en prøve: nye oppgaver fra målene du svarte dårlig på.
 * #/ov?prove=<id>   id er prøven i historikken
 * Utvalget huskes i økten (sessionStorage), så det er det samme om du laster siden på nytt.
 */
(function (KJ) {
  'use strict';
  const esc = KJ.esc;
  const S = KJ.store;
  const NOKKEL = 'kjemi1-oppfolging-';

  function lesOkt(id) {
    try {
      const t = sessionStorage.getItem(NOKKEL + id);
      return t ? JSON.parse(t) : null;
    } catch (e) {
      return null;
    }
  }
  function lagreOkt(id, o) {
    try {
      sessionStorage.setItem(NOKKEL + id, JSON.stringify(o));
    } catch (e) {
      /* ignorer */
    }
  }

  const datoTekst = (t) => new Date(t).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long' });

  KJ.views.oppfolging = function (main, params) {
    KJ.settTittel('Etter prøven');
    const proveId = +params.get('prove');
    const h = S.prover().find((p) => p.id === proveId);
    if (!h || !h.mal) {
      main.innerHTML =
        '<div class="view"><section class="container tools-head"><p class="eyebrow">Etter prøven</p><h1>Fant ikke prøven</h1></section>' +
        '<section class="container section"><div class="empty">' + KJ.icon('clipboard', 40) + '<h2>Prøven finnes ikke lenger</h2><p>Bare de 12 siste prøvene lagres. Ta en ny prøve, eller øv på de svakeste målene dine.</p>' +
        '<div class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="#/prove">Ny prøve</a><a class="btn btn-ghost" href="#/ov">Smart øving</a></div></div></section></div>';
      return null;
    }

    let okt = lesOkt(proveId);
    const gyldig = okt && okt.ids && okt.ids.length && okt.ids.every((id) => KJ.oppgave(id));
    if (!gyldig) {
      const fra = Math.max(0, parseInt(params.get('fra') || '0', 10) || 0);
      const u = KJ.oppfolgingOppgaver(h, fra);
      okt = { ids: u.ids, svake: u.svake, lavest: u.lavest, fra: u.fra, igjen: u.igjen, totaltSvake: u.totaltSvake, res: {}, idx: 0 };
      lagreOkt(proveId, okt);
    }
    if (!okt.ids.length) {
      main.innerHTML =
        '<div class="view"><section class="container tools-head"><p class="eyebrow">Etter prøven</p><h1>Alle målene gikk bra</h1>' +
        '<p class="lead">Du fikk 100 % på alle målene i prøven. Ta en ny prøve på høyt nivå, eller les «Kvelden før»-arket.</p>' +
        '<div class="btn-row" style="margin-top:16px"><a class="btn btn-primary" href="#/prove">Ny prøve</a><a class="btn btn-ghost" href="#/kvelden-for">Kvelden før</a></div></section></div>';
      return null;
    }

    const kort = new Map();
    const N = okt.ids.length;
    const malTekst = okt.svake.map((nr) => '<span class="smart-mal lys-rod" title="' + esc(KJ.malInfo(nr).tekst) + '"><i></i>Mål ' + nr + ' <span class="muted">' + esc(KJ.malInfo(nr).kort) + '</span> <b>' + h.mal[nr] + ' %</b></span>').join('');

    main.innerHTML =
      '<div class="view"><section class="container tools-head">' +
      '<p class="eyebrow">Etter prøven ' + esc(datoTekst(h.dato)) + ' · ' + h.prosent + ' %</p>' +
      '<h1>Øv på nye oppgaver</h1>' +
      '<p class="lead">' +
      (okt.lavest
        ? 'Du fikk ikke under 60 % på noen mål. Her er nye oppgaver fra de tre svakeste målene dine.'
        : okt.totaltSvake > okt.svake.length
          ? 'Du fikk under 60 % på ' + okt.totaltSvake + ' mål. Her er runde ' + (Math.floor((okt.fra || 0) / KJ.OPPFOLGING_MAKS_MAL) + 1) + ' med ' + okt.svake.length + ' av dem' + (okt.fra ? '' : ', de svakeste først') + '.'
          : 'Her er nye oppgaver fra målene du fikk under 60 % på.') +
      ' Ingen av dem var med på prøven. De går fra grunnleggende til høyt nivå, og du får fasit og forklaring etter hvert svar.</p>' +
      '<div class="smart-fokus">' + malTekst + '</div></section>' +
      '<section class="container practice" data-okt>' +
      '<div><nav class="qnav" aria-label="Oppgaver" data-nav></nav>' +
      '<div class="qnav-legend" style="margin-top:10px"><span><i class="ok"></i>Riktig</span><span><i class="bad"></i>Feil</span><span><i></i>Ikke besvart</span></div></div>' +
      '<div data-kort></div>' +
      '<div class="practice-foot"><button type="button" class="btn btn-ghost" data-a="forrige">' + KJ.icon('left', 18) + 'Forrige</button>' +
      '<button type="button" class="btn btn-quiet" data-a="oppsummer">' + KJ.icon('list', 18) + 'Oppsummering</button>' +
      '<button type="button" class="btn btn-primary" data-a="neste">Neste ' + KJ.icon('right', 18) + '</button></div>' +
      '</section>' +
      '<section class="container" data-sum hidden></section></div>';

    const oktEl = main.querySelector('[data-okt]');
    const sumEl = main.querySelector('[data-sum]');
    const navEl = main.querySelector('[data-nav]');
    const kortEl = main.querySelector('[data-kort]');

    function klasse(id) {
      const r = okt.res[id];
      return r == null ? '' : r ? 'ok' : 'bad';
    }
    function tegnNav() {
      navEl.innerHTML = okt.ids
        .map((id, i) => {
          const q = KJ.oppgave(id);
          return '<button type="button" class="' + klasse(id) + '" data-i="' + i + '"' + (i === okt.idx ? ' aria-current="true"' : '') + ' aria-label="Oppgave ' + (i + 1) + ', mål ' + q.mal.join(' og ') + '">' + (i + 1) + '</button>';
        })
        .join('');
    }

    function hentKort(i) {
      const id = okt.ids[i];
      if (!kort.has(id)) {
        const q = KJ.oppgave(id);
        const modul = KJ.modulMap[q.modul];
        const k = new KJ.Oppgavekort(q, {
          modus: 'ovelse',
          nummer: i + 1,
          totalt: N,
          visTema: true,
          onResultat: (res, c) => {
            if (c.forsok === 1 && okt.res[id] == null) okt.res[id] = !!res.riktig;
            lagreOkt(proveId, okt);
            tegnNav();
          },
        });
        if (modul) k.el.style.setProperty('--tc', modul.farge);
        kort.set(id, k);
      }
      return kort.get(id);
    }

    function vis(i, fokus) {
      okt.idx = Math.max(0, Math.min(N - 1, i));
      lagreOkt(proveId, okt);
      const k = hentKort(okt.idx);
      kortEl.innerHTML = '';
      kortEl.appendChild(k.el);
      main.querySelector('[data-a="forrige"]').disabled = okt.idx === 0;
      const nb = main.querySelector('[data-a="neste"]');
      nb.innerHTML = okt.idx === N - 1 ? 'Se oppsummering ' + KJ.icon('right', 18) : 'Neste ' + KJ.icon('right', 18);
      tegnNav();
      if (fokus) {
        const top = kortEl.getBoundingClientRect().top + window.scrollY - 90;
        if (window.scrollY > top) window.scrollTo({ top, behavior: 'auto' });
        const p = k.el.querySelector('.q-prompt');
        p.setAttribute('tabindex', '-1');
        p.focus({ preventScroll: true });
      }
    }

    function oppsummer() {
      const rader = okt.svake.map((nr) => {
        const ids = okt.ids.filter((id) => KJ.oppgave(id).mal.includes(nr));
        const besvart = ids.filter((id) => okt.res[id] != null);
        const riktig = ids.filter((id) => okt.res[id]);
        const andel = ids.length ? riktig.length / ids.length : 0;
        const kl = !besvart.length ? '' : andel >= 0.99 ? 'gronn' : andel >= 0.5 ? 'gul' : 'rod';
        return (
          '<div class="malres-rad' + (kl ? ' lys-' + kl : '') + '" data-nr="' + nr + '">' +
          '<span class="goal-nr">' + nr + '</span>' +
          '<div class="malres-t"><p>' + esc(KJ.malInfo(nr).tekst) + '</p><p class="muted" style="margin:0;font-size:.82rem">På prøven: ' + h.mal[nr] + ' %</p></div>' +
          '<span class="malres-p">' + riktig.length + ' av ' + ids.length + '<small>riktig nå</small></span>' +
          '<a class="btn btn-ghost btn-small" href="#/ov?mal=' + nr + '">Flere</a></div>'
        );
      });
      const ubesvart = okt.ids.filter((id) => okt.res[id] == null).length;
      sumEl.innerHTML =
        '<div class="section-head" style="margin-top:8px"><div><h2>Oppsummering</h2><p>Riktig på første forsøk per mål.' + (ubesvart ? ' ' + ubesvart + ' oppgave' + (ubesvart > 1 ? 'r er' : ' er') + ' ikke besvart ennå.' : '') + '</p></div></div>' +
        '<div class="malres">' + rader.join('') + '</div>' +
        '<div class="btn-row" style="margin-top:18px">' +
        '<a class="btn btn-primary" href="#/prove?mal=' + okt.svake.join(',') + '">' + KJ.icon('clipboard', 18) + 'Ny prøve på disse målene</a>' +
        '<a class="btn btn-ghost" href="#/ov?mal=' + okt.svake.join(',') + '">' + KJ.icon('zap', 18) + 'Flere oppgaver</a>' +
        '<button type="button" class="btn btn-quiet" data-a="tilbake">' + KJ.icon('left', 18) + 'Tilbake til oppgavene</button>' +
        (okt.igjen ? '<button type="button" class="btn btn-primary" data-a="neste-runde">' + KJ.icon('arrow', 18) + 'Neste runde: ' + okt.igjen + ' mål til</button>' : '') +
        '<button type="button" class="btn btn-quiet" data-a="nye">' + KJ.icon('rotate', 18) + 'Trekk nye oppgaver</button>' +
        '</div>';
      oktEl.hidden = true;
      sumEl.hidden = false;
      window.scrollTo(0, 0);
    }

    main.querySelector('.view').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.i != null && b.closest('[data-nav]')) vis(+b.dataset.i, true);
      else if (b.dataset.a === 'forrige') vis(okt.idx - 1, true);
      else if (b.dataset.a === 'neste') {
        if (okt.idx === N - 1) oppsummer();
        else vis(okt.idx + 1, true);
      } else if (b.dataset.a === 'oppsummer') oppsummer();
      else if (b.dataset.a === 'tilbake') {
        sumEl.hidden = true;
        oktEl.hidden = false;
        vis(okt.idx);
      } else if (b.dataset.a === 'nye' || b.dataset.a === 'neste-runde') {
        try {
          sessionStorage.removeItem(NOKKEL + proveId);
        } catch (err) {
          /* ignorer */
        }
        const fra = b.dataset.a === 'neste-runde' ? (okt.fra || 0) + okt.svake.length : okt.fra || 0;
        const ny = new URLSearchParams({ prove: String(proveId), fra: String(fra) });
        KJ.settUrl('/ov?' + ny.toString());
        KJ.views.oppfolging(main, ny);
        window.scrollTo(0, 0);
      }
    });

    vis(okt.idx || 0);
    return null;
  };
})(window.KJ);
