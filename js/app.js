/*
 * App: navigasjon (hash-ruter), meny og fargetema.
 * Ruter:
 *   #/                          oversikt
 *   #/ov[?mal=3,7]              smart øving fra de svakeste målene
 *   #/ov?prove=<id>             nye oppgaver fra målene som gikk dårlig på en prøve
 *   #/kvelden-for               oppsummering av alle mål til utskrift
 *   #/modul/<id>[/oppgaver]     teori eller oppgaver for en modul (ett eller flere læringsmål)
 *   #/kort[/<id>]               flashcards
 *   #/prove                     prøvemodus
 *   #/feilbank                  feilbank
 *   #/verktoy[/<fane>]          periodesystem, formelark, balansering
 */
(function (KJ) {
  'use strict';

  const NAV = [
    { id: 'hjem', href: '#/', navn: 'Oversikt', ikon: 'home' },
    { id: 'ov', href: '#/ov', navn: 'Smart øving', kort: 'Øv', ikon: 'zap' },
    { id: 'kort', href: '#/kort', navn: 'Flashcards', kort: 'Kort', ikon: 'layers' },
    { id: 'prove', href: '#/prove', navn: 'Prøve', ikon: 'clipboard' },
    { id: 'feilbank', href: '#/feilbank', navn: 'Feilbank', ikon: 'target' },
    { id: 'verktoy', href: '#/verktoy', navn: 'Verktøy', ikon: 'flask' },
  ];

  const RUTER = [
    [/^\/?$/, 'hjem', (m, p) => KJ.views.home(m, p)],
    [/^\/modul\/([\w-]+)(?:\/(teori|oppgaver))?\/?$/, 'hjem', (m, p, id, fane) => KJ.views.topic(m, p, id, fane || 'teori')],
    [/^\/tema\/.*$/, 'hjem', () => location.replace('#/')],
    [/^\/ov\/?$/, 'ov', (m, p) => (p.get('prove') ? KJ.views.oppfolging(m, p) : KJ.views.smart(m, p))],
    [/^\/kvelden-for\/?$/, 'hjem', (m, p) => KJ.views.evening(m, p)],
    [/^\/kort(?:\/([\w-]+))?\/?$/, 'kort', (m, p, id) => KJ.views.cards(m, p, id || 'alle')],
    [/^\/prove\/?$/, 'prove', (m, p) => KJ.views.exam(m, p)],
    [/^\/feilbank\/?$/, 'feilbank', (m, p) => KJ.views.errors(m, p)],
    [/^\/verktoy(?:\/([\w-]+))?\/?$/, 'verktoy', (m, p, fane) => KJ.views.tools(m, p, fane || 'periodesystem')],
  ];

  function tegnNav(aktiv) {
    const ant = KJ.store.feilbank().length;
    document.querySelectorAll('.nav-top[data-nav], .nav-bottom[data-nav]').forEach((nav) => {
      const bunn = nav.classList.contains('nav-bottom');
      nav.innerHTML = NAV.map((n) => {
        const badge = n.id === 'feilbank' && ant ? '<span class="nav-badge" aria-label="' + ant + ' oppgaver">' + ant + '</span>' : '';
        return (
          '<a href="' + n.href + '"' + (n.id === aktiv ? ' aria-current="page"' : '') + '>' + KJ.icon(n.ikon, bunn ? 22 : 18) +
          '<span>' + (bunn && n.kort ? n.kort : n.navn) + '</span>' + badge + '</a>'
        );
      }).join('');
    });
  }

  let opprydding = null;
  let aktivNav = 'hjem';
  let forrigeSti = null;

  function rute() {
    const hash = decodeURIComponent(location.hash.replace(/^#/, '')) || '/';
    const [sti, qs] = hash.split('?');
    const params = new URLSearchParams(qs || '');
    let treff = null;
    for (const [re, nav, fn] of RUTER) {
      const m = re.exec(sti);
      if (m) {
        treff = { nav, fn, args: m.slice(1) };
        break;
      }
    }
    const main = document.getElementById('main');
    if (opprydding) {
      try {
        opprydding();
      } catch (e) {
        /* ignorer */
      }
      opprydding = null;
    }
    if (!treff) {
      location.replace('#/');
      return;
    }
    aktivNav = treff.nav;
    main.innerHTML = '';
    const res = treff.fn(main, params, ...treff.args);
    opprydding = typeof res === 'function' ? res : null;
    tegnNav(aktivNav);
    if (sti !== forrigeSti) {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
    forrigeSti = sti;
  }

  /** Oppdaterer adressefeltet uten å laste visningen på nytt. */
  KJ.settUrl = function (hash) {
    const ny = '#' + hash;
    if (location.hash !== ny) history.replaceState(null, '', ny);
  };

  KJ.settTittel = (t) => (document.title = (t ? t + ' · ' : '') + 'Spektrum · Kjemi 1');

  /* ---------- Fargetema ---------- */
  const TEMA = {
    auto: { neste: 'lys', ikon: 'monitor', navn: 'automatisk' },
    lys: { neste: 'mork', ikon: 'sun', navn: 'lyst' },
    mork: { neste: 'auto', ikon: 'moon', navn: 'mørkt' },
  };
  function brukTema(t) {
    const html = document.documentElement;
    if (t === 'lys') html.setAttribute('data-theme', 'light');
    else if (t === 'mork') html.setAttribute('data-theme', 'dark');
    else html.removeAttribute('data-theme');
    const b = document.querySelector('[data-theme-btn]');
    if (b) {
      b.innerHTML = KJ.icon(TEMA[t].ikon, 20);
      b.setAttribute('aria-label', 'Fargetema: ' + TEMA[t].navn + '. Trykk for å bytte.');
      b.title = 'Fargetema: ' + TEMA[t].navn;
    }
  }

  function start() {
    brukTema(KJ.store.tema());
    document.querySelector('[data-theme-btn]').addEventListener('click', () => {
      const ny = TEMA[KJ.store.tema()].neste;
      KJ.store.settTema(ny);
      brukTema(ny);
      KJ.toast('Fargetema: ' + TEMA[ny].navn);
    });
    KJ.store.lytt(() => tegnNav(aktivNav));
    window.addEventListener('hashchange', rute);
    rute();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})(window.KJ);
