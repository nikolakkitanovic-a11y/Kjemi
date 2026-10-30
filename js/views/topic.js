/*
 * Temaside: teori (oppsummering, begreper, eksempler, vanlige feil) og
 * oppgaver med nivåfilter og oppgavenavigasjon.
 */
(function (KJ) {
  'use strict';
  const esc = KJ.esc;

  KJ.views.topic = function (main, params, id, fane) {
    const t = KJ.temaMap[id];
    if (!t) {
      location.replace('#/');
      return;
    }
    KJ.settTittel(t.tittel);
    main.innerHTML = '<div class="view" style="--tc:' + t.farge + '"><header class="thead"></header><div class="tbody container"></div></div>';
    const head = main.querySelector('.thead');
    const body = main.querySelector('.tbody');

    function tegnHode() {
      const f = KJ.store.temaFremdrift(t.id);
      head.innerHTML =
        '<div class="container">' +
        '<nav class="crumb" aria-label="Brødsmuler"><a href="#/">Oversikt</a><span aria-hidden="true">/</span><span>Tema ' + t.nr + '</span></nav>' +
        '<p class="lambda"><i></i>Tema ' + String(t.nr).padStart(2, '0') + ' · λ ' + esc(t.linje) + (t.kilde === 'tillegg' ? ' · tillegg' : '') + '</p>' +
        '<h1>' + esc(t.tittel) + '</h1>' +
        '<p class="desc">' + esc(t.beskrivelse) + '</p>' +
        '<div class="thead-meta"><div class="prog" aria-label="Fremdrift"><span>' + f.ok + ' av ' + f.totalt + ' oppgaver mestret</span><div class="bar"><i style="width:' + Math.round(f.andel * 100) + '%"></i></div></div></div>' +
        '<nav class="tabs" aria-label="Deler av temaet">' +
        '<a href="#/tema/' + t.id + '"' + (fane === 'teori' ? ' aria-current="page"' : '') + '>' + KJ.icon('book', 18) + 'Teori</a>' +
        '<a href="#/tema/' + t.id + '/oppgaver"' + (fane === 'oppgaver' ? ' aria-current="page"' : '') + '>' + KJ.icon('pencil', 18) + 'Oppgaver <span class="muted mono">' + t.oppgaver.length + '</span></a>' +
        '<a href="#/kort/' + t.id + '">' + KJ.icon('layers', 18) + '<span class="lang-tekst">Flashcards</span><span class="kort-tekst">Kort</span> <span class="muted mono">' + t.flashcards.length + '</span></a>' +
        '</nav></div>';
    }
    tegnHode();
    const stopp = KJ.store.lytt(() => {
      const bar = head.querySelector('.prog');
      if (!bar) return;
      const f = KJ.store.temaFremdrift(t.id);
      bar.innerHTML = '<span>' + f.ok + ' av ' + f.totalt + ' oppgaver mestret</span><div class="bar"><i style="width:' + Math.round(f.andel * 100) + '%"></i></div>';
    });

    let rydd;
    if (fane === 'oppgaver') rydd = oppgaver(t, body, params);
    else rydd = teori(t, body);
    return () => {
      stopp();
      if (rydd) rydd();
    };
  };

  /* ---------- Teori ---------- */
  function figur(f) {
    if (f.type === 'skall') {
      return (
        '<figure class="figure"><div class="fig-row">' +
        f.atomer
          .map(([sym, q]) => {
            const e = KJ.grunnstoffMap[sym];
            const sk = KJ.kjemi.skall(KJ.kjemi.konfig(e.z, q));
            const navn = q ? KJ.ce(sym + '^' + (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '-')) : KJ.ce(sym);
            return '<div class="fig-item">' + KJ.skallSVG(e.z, q) + '<span class="lbl">' + navn + ' <span class="muted">(' + sk.join(', ') + ')</span></span></div>';
          })
          .join('') +
        '</div><figcaption>Skallmodell: kjernen med kjerneladning i midten, elektronene i skall K, L, M … utover.</figcaption></figure>'
      );
    }
    if (f.type === 'spekter') {
      return (
        '<figure class="figure">' +
        f.grunnstoff
          .map((s) => '<div class="spekter-rad"><b>' + s + '</b>' + KJ.spekterSVG(KJ.SPEKTRA[s].map((nm) => ({ nm })), { label: 'Linjespekter for ' + KJ.grunnstoffMap[s].navn }) + '</div>')
          .join('') +
        '<div class="spekter-rad" aria-hidden="true"><span></span><div class="akse">' +
        [400, 450, 500, 550, 600, 650, 700].map((nm) => '<span style="left:' + (((nm - 380) / 340) * 100).toFixed(1) + '%">' + nm + '</span>').join('') +
        '</div></div>' +
        '<figcaption>Emisjonsspektre (bølgelengde i nm). Hvert grunnstoff har sitt eget mønster av linjer.</figcaption></figure>'
      );
    }
    if (f.type === 'orbitaler') {
      return (
        '<figure class="figure"><div class="orbrad">' +
        f.grunnstoff
          .map((s) => {
            const e = KJ.grunnstoffMap[s];
            const k = KJ.kjemi.konfig(e.z, 0);
            const n = Math.max(...Object.keys(k).map((o) => +o[0]));
            const sub = ['s', 'p'].filter((l) => k[n + l] != null || l === 'p').map((l) => [n + l, k[n + l] || 0]);
            return (
              '<div class="orb-el"><span class="lbl">' + e.navn + ' ' + KJ.tex(KJ.kjemi.konfigTex(k, true)) + '</span><div class="orb-row">' +
              sub
                .map(([o, ant]) => {
                  const bokser = o[1] === 's' ? 1 : 3;
                  const fyll = [];
                  for (let i = 0; i < bokser; i++) fyll.push((ant > i ? '↑' : '') + (ant > i + bokser ? '↓' : ''));
                  return '<div class="orb-sub"><div class="orb-boxes">' + fyll.map((x) => '<span class="orb-box">' + x + '</span>').join('') + '</div><small>' + o + '</small></div>';
                })
                .join('') +
              '</div></div>'
            );
          })
          .join('') +
        '</div><figcaption>Orbitaldiagram for valensskallet. Hunds regel: ett elektron i hver p-orbital før de pares.</figcaption></figure>'
      );
    }
    return '';
  }

  function tabell(tb) {
    return (
      '<div class="tbl-wrap"><table class="tbl"><thead><tr>' + tb.hode.map((h) => '<th scope="col">' + KJ.fmt(h) + '</th>').join('') + '</tr></thead><tbody>' +
      tb.rader.map((r) => '<tr>' + r.map((c) => '<td>' + KJ.fmt(c) + '</td>').join('') + '</tr>').join('') +
      '</tbody></table></div>'
    );
  }
  KJ.tabellHtml = tabell;

  function teori(t, body) {
    const seksjoner = [];
    t.teori.forEach((b, i) => {
      seksjoner.push({
        id: 'del-' + (i + 1),
        tittel: b.h,
        html:
          (b.tekst ? KJ.fmtBlock(b.tekst) : '') +
          (b.tabell ? tabell(b.tabell) : '') +
          (b.figur ? figur(b.figur) : '') +
          (b.merk ? '<div class="callout">' + KJ.icon('info', 18) + '<div>' + KJ.fmtBlock(b.merk) + '</div></div>' : ''),
      });
    });
    if (t.begreper.length)
      seksjoner.push({
        id: 'begreper',
        tittel: 'Nøkkelbegreper',
        html: '<dl class="concepts">' + t.begreper.map((b) => '<div class="concept"><dt>' + KJ.fmt(b.term) + '</dt><dd>' + KJ.fmt(b.def) + '</dd></div>').join('') + '</dl>',
      });
    if (t.eksempler.length)
      seksjoner.push({
        id: 'eksempler',
        tittel: 'Eksempler med løsning',
        html: t.eksempler
          .map(
            (e, i) =>
              '<details class="example"' + (i === 0 ? ' open' : '') + '><summary>' + KJ.icon('right', 18) + '<div><h3>' + esc(e.tittel) + '</h3><p>' + KJ.fmt(e.oppgave) + '</p></div></summary>' +
              '<ol class="steps">' + e.steg.map((s) => '<li>' + KJ.fmtBlock(s) + '</li>').join('') + '</ol></details>'
          )
          .join(''),
      });
    if (t.feller.length)
      seksjoner.push({
        id: 'feller',
        tittel: 'Vanlige feil',
        html: '<ul class="pitfalls">' + t.feller.map((f) => '<li>' + KJ.icon('alert', 18) + '<div>' + KJ.fmt(f) + '</div></li>').join('') + '</ul>',
      });
    if (t.mal && t.mal.length)
      seksjoner.push({
        id: 'mal',
        tittel: 'Hva du skal kunne',
        html:
          '<p class="muted">Knyttet til kompetansemålene i Kjemi 1. For høy måloppnåelse må du kunne forklare sammenhenger med fagbegreper, ikke bare gjengi fakta.</p>' +
          '<ul class="goals">' + t.mal.map((m) => '<li>' + KJ.icon('check', 16) + '<span>' + esc(m) + '</span></li>').join('') + '</ul>',
      });

    body.innerHTML =
      '<div class="theory"><aside class="toc" aria-label="Innhold"><p>Innhold</p><ol>' +
      seksjoner.map((s) => '<li><a href="#/tema/' + t.id + '" data-mal="' + s.id + '">' + esc(s.tittel) + '</a></li>').join('') +
      '</ol></aside><article class="prose">' +
      seksjoner.map((s, i) => '<section id="' + s.id + '" aria-labelledby="' + s.id + '-h"><h2 id="' + s.id + '-h"><span class="n">' + String(i + 1).padStart(2, '0') + '</span>' + esc(s.tittel) + '</h2>' + s.html + '</section>').join('') +
      '<div class="cta-band"><div><h3>Klar for å øve?</h3><p>' + t.oppgaver.length + ' oppgaver fra grunnleggende til høy måloppnåelse.</p></div><a class="btn btn-primary" href="#/tema/' + t.id + '/oppgaver">Start oppgavene ' + KJ.icon('arrow', 18) + '</a></div>' +
      '</article></div>';

    const lenker = [...body.querySelectorAll('.toc a')];
    lenker.forEach((a) =>
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const mal = document.getElementById(a.dataset.mal);
        if (mal) {
          mal.scrollIntoView({ behavior: KJ.reducedMotion() ? 'auto' : 'smooth', block: 'start' });
          mal.setAttribute('tabindex', '-1');
          mal.focus({ preventScroll: true });
        }
      })
    );
    let obs;
    if ('IntersectionObserver' in window) {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) lenker.forEach((a) => a.classList.toggle('on', a.dataset.mal === en.target.id));
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      body.querySelectorAll('.prose > section').forEach((s) => obs.observe(s));
    }
    return () => obs && obs.disconnect();
  }

  /* ---------- Oppgaver ---------- */
  function oppgaver(t, body, params) {
    let niva = parseInt(params.get('niva') || '0', 10) || 0;
    const sortert = t.oppgaver.slice().sort((a, b) => a.niva - b.niva);
    let liste = [];
    let idx = 0;
    let kort = null;

    body.innerHTML =
      '<div class="practice">' +
      '<div class="practice-bar"><div class="seg" role="group" aria-label="Nivå" data-niva></div>' +
      '<button type="button" class="btn btn-ghost btn-small" data-a="neste-uløst">' + KJ.icon('target', 16) + 'Neste ikke mestrede</button></div>' +
      '<div><nav class="qnav" aria-label="Oppgaver" data-qnav></nav>' +
      '<div class="qnav-legend" style="margin-top:10px"><span><i class="ok"></i>Mestret</span><span><i class="bad"></i>Feil sist</span><span><i></i>Ikke prøvd</span></div></div>' +
      '<div data-card></div>' +
      '<div class="practice-foot"><button type="button" class="btn btn-ghost" data-a="forrige">' + KJ.icon('left', 18) + 'Forrige</button>' +
      '<button type="button" class="btn btn-primary" data-a="neste">Neste ' + KJ.icon('right', 18) + '</button></div>' +
      '</div>';

    const segEl = body.querySelector('[data-niva]');
    const navEl = body.querySelector('[data-qnav]');
    const kortEl = body.querySelector('[data-card]');

    function tegnNiva() {
      const ant = (n) => (n ? t.oppgaver.filter((q) => q.niva === n).length : t.oppgaver.length);
      segEl.innerHTML = [0, 1, 2, 3]
        .map((n) => '<button type="button" data-n="' + n + '" aria-pressed="' + (n === niva) + '">' + (n ? '<span class="lang-tekst">' + KJ.NIVA[n].navn + '</span><span class="kort-tekst">' + ['', 'Grunnl.', 'Middels', 'Høy'][n] + '</span>' : 'Alle') + ' <span class="count">' + ant(n) + '</span></button>')
        .join('');
    }

    function statusKlasse(q) {
      const s = KJ.store.status(q.id);
      if (!s) return '';
      if (s.ok) return 'ok';
      return s.sist === 'f' ? 'bad' : '';
    }

    function tegnNav() {
      navEl.innerHTML = liste
        .map((q, i) => '<button type="button" class="' + statusKlasse(q) + '" data-i="' + i + '"' + (i === idx ? ' aria-current="true"' : '') + ' aria-label="Oppgave ' + (i + 1) + ', ' + KJ.NIVA[q.niva].navn + '">' + (i + 1) + '</button>')
        .join('');
    }

    function velgListe(behold) {
      liste = niva ? sortert.filter((q) => q.niva === niva) : sortert;
      const qid = behold || params.get('q');
      const i = qid ? liste.findIndex((q) => q.id === qid) : -1;
      idx = i >= 0 ? i : 0;
    }

    function vis(fokus) {
      const q = liste[idx];
      if (!q) {
        kortEl.innerHTML = '<p class="muted">Ingen oppgaver på dette nivået.</p>';
        return;
      }
      kort = new KJ.Oppgavekort(q, {
        modus: 'ovelse',
        nummer: idx + 1,
        totalt: liste.length,
        onResultat: () => tegnNav(),
      });
      kortEl.innerHTML = '';
      kortEl.appendChild(kort.el);
      tegnNav();
      body.querySelector('[data-a="forrige"]').disabled = idx === 0;
      const nb = body.querySelector('[data-a="neste"]');
      nb.disabled = idx >= liste.length - 1;
      KJ.settUrl('/tema/' + t.id + '/oppgaver?niva=' + niva + '&q=' + q.id);
      KJ.store.settSist({ tema: t.id, niva, q: q.id });
      if (fokus) {
        const top = kortEl.getBoundingClientRect().top + window.scrollY - 80;
        if (window.scrollY > top) window.scrollTo({ top, behavior: KJ.reducedMotion() ? 'auto' : 'smooth' });
        const p = kort.el.querySelector('.q-prompt');
        p.setAttribute('tabindex', '-1');
        p.focus({ preventScroll: true });
      }
    }

    segEl.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      niva = +b.dataset.n;
      tegnNiva();
      velgListe(liste[idx] && (niva === 0 || liste[idx].niva === niva) ? liste[idx].id : null);
      vis();
    });
    navEl.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      idx = +b.dataset.i;
      vis(true);
    });
    body.querySelector('[data-a="forrige"]').addEventListener('click', () => {
      if (idx > 0) {
        idx--;
        vis(true);
      }
    });
    body.querySelector('[data-a="neste"]').addEventListener('click', () => {
      if (idx < liste.length - 1) {
        idx++;
        vis(true);
      }
    });
    body.querySelector('[data-a="neste-uløst"]').addEventListener('click', () => {
      const n = liste.length;
      for (let k = 1; k <= n; k++) {
        const j = (idx + k) % n;
        const s = KJ.store.status(liste[j].id);
        if (!s || !s.ok) {
          idx = j;
          vis(true);
          return;
        }
      }
      KJ.toast('Du har mestret alle oppgavene på dette nivået!', 'ok');
    });

    tegnNiva();
    velgListe();
    vis();
    return null;
  }
})(window.KJ);
