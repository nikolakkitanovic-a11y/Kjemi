/*
 * Oversikt: læringsmålene som sjekkliste med selvvurdering (rød/gul/grønn),
 * spekter med fremdrift per modul, modulene og snarveier.
 */
(function (KJ) {
  'use strict';
  const esc = KJ.esc;
  const TALLORD = ['Null', 'Én', 'To', 'Tre', 'Fire', 'Fem', 'Seks', 'Sju', 'Åtte', 'Ni', 'Ti', 'Elleve', 'Tolv', 'Tretten', 'Fjorten', 'Femten', 'Seksten', 'Sytten', 'Atten', 'Nitten', 'Tjue'];
  const LYS = {
    rod: { navn: 'Rød', tekst: 'Kan ikke ennå' },
    gul: { navn: 'Gul', tekst: 'Delvis' },
    gronn: { navn: 'Grønn', tekst: 'Kan det' },
  };
  KJ.LYS = LYS;

  function malRad(m) {
    const S = KJ.store;
    const r = S.malResultat(m.nr);
    const selv = S.selv(m.nr);
    const verdi = selv ? selv.verdi : null;
    const modul = KJ.malModul(m.nr);
    const kilde = selv ? (selv.kilde === 'meg' ? 'Satt av deg' : 'Oppdatert fra resultatene') : r.provd ? 'Ikke vurdert' : 'Ikke startet';
    return (
      '<li class="goal-row' + (verdi ? ' lys-' + verdi : '') + '" data-nr="' + m.nr + '" style="--tc:' + (modul ? modul.farge : 'var(--ink-3)') + '">' +
      '<span class="goal-nr">' + m.nr + '</span>' +
      '<div class="goal-txt"><p>' + esc(m.tekst) + '</p>' +
      '<div class="goal-meta"><span>' + r.ok + ' av ' + r.totalt + ' oppgaver mestret</span><span class="bar"><i style="width:' + Math.round(r.andel * 100) + '%"></i></span>' +
      '<span class="muted">' + kilde + '</span>' +
      (modul ? '<a href="#/modul/' + modul.id + '/oppgaver' + (modul.mal.length > 1 ? '?mal=' + m.nr : '') + '">Øv ' + KJ.icon('arrow', 14) + '</a>' : '') +
      '</div></div>' +
      '<div class="lys" role="radiogroup" aria-label="Selvvurdering for mål ' + m.nr + '">' +
      Object.keys(LYS)
        .map((k) => '<button type="button" class="lys-' + k + '" role="radio" aria-checked="' + (verdi === k) + '" data-lys="' + k + '" title="' + LYS[k].tekst + '"><span class="sr-only">' + LYS[k].navn + ': ' + LYS[k].tekst + '</span></button>')
        .join('') +
      '</div></li>'
    );
  }

  KJ.views.home = function (main) {
    KJ.settTittel('');
    const S = KJ.store;
    const moduler = KJ.moduler;
    const fr = moduler.map((t) => S.temaFremdrift(t.id));
    const totalt = fr.reduce((a, f) => a + f.totalt, 0);
    const ok = fr.reduce((a, f) => a + f.ok, 0);
    const alleKort = moduler.reduce((a, t) => a.concat(t.flashcards.map(KJ.kortId)), []);
    const kan = new Set(alleKort.filter((id) => S.kort(id) === 'kan')).size;
    const unikeKort = new Set(alleKort).size;
    const feil = S.feilbank().length;
    const siste = S.prover()[0];
    const telle = { rod: 0, gul: 0, gronn: 0 };
    KJ.MAL.forEach((m) => {
      const v = S.selv(m.nr);
      if (v) telle[v.verdi]++;
    });

    const x = (nm) => (((nm - 380) / (720 - 380)) * 100).toFixed(2) + '%';
    const linjer = moduler
      .map((t, i) => {
        const o = (0.2 + 0.8 * fr[i].andel).toFixed(2);
        return '<span class="sline" style="left:' + x(t.bolge) + ';--lc:' + t.farge + ';--lo:' + o + '"></span><span class="sline-l" style="left:' + x(t.bolge) + '">' + String(t.nr).padStart(2, '0') + '</span>';
      })
      .join('');

    let fortsett = '';
    const sist = S.sist();
    if (sist && KJ.modulMap[sist.tema]) {
      const t = KJ.modulMap[sist.tema];
      fortsett =
        '<div class="continue"><p><span class="muted">Fortsett der du slapp:</span> <strong>' + esc(t.tittel) + '</strong></p>' +
        '<a class="btn btn-primary btn-small" href="#/modul/' + t.id + '/oppgaver?niva=' + (sist.niva || 0) + (sist.q ? '&q=' + sist.q : '') + '">Fortsett ' + KJ.icon('arrow', 16) + '</a></div>';
    }

    main.innerHTML =
      '<div class="view">' +
      '<section class="hero"><div class="container">' +
      '<p class="eyebrow">Kjemi 1 · Prøve tirsdag 3. november</p>' +
      '<h1>Kjemi, <em>mål for mål</em>.</h1>' +
      '<p class="lead">' + TALLORD[KJ.MAL.length] + ' læringsmål, ' + moduler.length + ' moduler og ' + totalt + ' oppgaver i tre nivåer. Vurder deg selv på hvert mål, og øv mest der det er rødt. Hver linje i spekteret er en modul, og den lyser sterkere jo mer du mestrer.</p>' +
      '<div class="spectrum" aria-hidden="true">' + linjer + '</div>' +
      '<div class="spectrum-cap" aria-hidden="true"><span>400 nm</span><span>Emisjonsspekteret ditt</span><span>700 nm</span></div>' +
      '<div class="stats">' +
      '<div class="stat"><div class="stat-v">' + ok + ' <small>/ ' + totalt + '</small></div><div class="stat-l">oppgaver mestret</div></div>' +
      '<div class="stat"><div class="stat-v"><span class="dot-rod">' + telle.rod + '</span> <span class="dot-gul">' + telle.gul + '</span> <span class="dot-gronn">' + telle.gronn + '</span></div><div class="stat-l">mål rød · gul · grønn</div></div>' +
      '<a class="stat" href="#/feilbank"><div class="stat-v">' + feil + '</div><div class="stat-l">oppgaver i feilbanken</div></a>' +
      '<a class="stat" href="#/prove"><div class="stat-v">' + (siste ? siste.prosent + ' <small>%</small>' : '–') + '</div><div class="stat-l">' + (siste ? 'siste prøvesimulering' : 'ingen prøver ennå') + '</div></a>' +
      '</div>' +
      fortsett +
      '</div></section>' +

      '<section class="section" id="maal"><div class="container">' +
      '<div class="section-head"><div><h2>Læringsmålene</h2><p>Trykk på rød, gul eller grønn for å vurdere deg selv. Vurderingen oppdateres også når du svarer på oppgaver.</p></div>' +
      '<div class="lys-forklaring"><span><i class="lys-rod"></i>Kan ikke ennå</span><span><i class="lys-gul"></i>Delvis</span><span><i class="lys-gronn"></i>Kan det</span></div></div>' +
      '<ol class="goal-list">' + KJ.MAL.map(malRad).join('') + '</ol>' +
      '</div></section>' +

      '<section class="section" style="padding-top:0"><div class="container">' +
      '<div class="section-head"><div><h2>Moduler</h2><p>Hver modul har læringsmål, vanlige feil, teori og oppgaver fra grunnleggende til høy måloppnåelse.</p></div></div>' +
      '<div class="topic-grid">' +
      moduler
        .map((t, i) => {
          const f = fr[i];
          const bar = (n, navn) => {
            const [a, b] = f.niva[n];
            return '<div class="lvlbar"><div class="lvlbar-l"><span>' + navn + '</span><span>' + a + '/' + b + '</span></div><div class="bar"><i style="width:' + (b ? (100 * a) / b : 0) + '%"></i></div></div>';
          };
          return (
            '<a class="tcard" href="#/modul/' + t.id + '" style="--tc:' + t.farge + '">' +
            '<div class="tcard-top"><span class="tcard-nr">' + String(t.nr).padStart(2, '0') + '</span><span class="tcard-lambda">' + t.mal.map((nr) => 'Mål ' + nr).join(' · ') + '</span></div>' +
            '<h3>' + esc(t.tittel) + '</h3><p>' + esc(t.beskrivelse) + '</p>' +
            '<div class="tcard-foot"><div class="lvlbars">' + bar(1, 'G') + bar(2, 'M') + bar(3, 'H') + '</div></div></a>'
          );
        })
        .join('') +
      '</div></div></section>' +

      '<section class="section" style="padding-top:0"><div class="container">' +
      '<div class="section-head"><div><h2>Øv på tvers</h2></div></div>' +
      '<div class="quick">' +
      ql('#/prove', 'clipboard', 'Prøvesimulering', 'Blandet prøve med tidtaker og poeng, som en tentamen.') +
      ql('#/feilbank', 'target', 'Feilbank', feil ? feil + ' oppgaver venter. Hver må klares ' + KJ.RAD_KRAV + ' ganger på rad.' : 'Oppgaver du svarer feil på havner her.') +
      ql('#/kort', 'layers', 'Flashcards', unikeKort + ' kort med begreper og sammensatte ioner (' + kan + ' kan du).') +
      ql('#/verktoy/periodesystem', 'grid', 'Periodesystem', 'Elektronegativitet, elektronfordeling og konfigurasjoner.') +
      '</div>' +

      '<div class="foot">' +
      '<p>Innholdet bygger på notatene dine og er organisert etter læringsmålene for prøven. Stoff utenfor læringsmålene ligger i mappen arkiv/.</p>' +
      '<p>Fremdriften lagres bare i denne nettleseren. Eksporter den hvis du vil flytte den til en annen enhet.</p>' +
      '<div class="btn-row">' +
      '<button type="button" class="btn btn-ghost btn-small" data-a="eksport">' + KJ.icon('download', 16) + 'Eksporter fremdrift</button>' +
      '<label class="btn btn-ghost btn-small" style="cursor:pointer">' + KJ.icon('upload', 16) + 'Importer<input type="file" accept="application/json,.json" data-a="import" hidden></label>' +
      '<button type="button" class="btn btn-danger btn-small" data-a="nullstill">' + KJ.icon('trash', 16) + 'Nullstill alt</button>' +
      '</div></div>' +
      '</div></section></div>';

    main.querySelector('.goal-list').addEventListener('click', (e) => {
      const b = e.target.closest('[data-lys]');
      if (!b) return;
      const li = b.closest('[data-nr]');
      const nr = +li.dataset.nr;
      const na = S.selv(nr);
      const ny = na && na.verdi === b.dataset.lys && na.kilde === 'meg' ? null : b.dataset.lys;
      S.settSelv(nr, ny);
      const m = KJ.malInfo(nr);
      const tmp = document.createElement('div');
      tmp.innerHTML = malRad(m);
      li.replaceWith(tmp.firstElementChild);
      const nyKnapp = main.querySelector('[data-nr="' + nr + '"] [data-lys="' + b.dataset.lys + '"]');
      if (nyKnapp) nyKnapp.focus();
    });

    main.querySelector('[data-a="eksport"]').addEventListener('click', () => {
      const blob = new Blob([S.eksport()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'kjemi1-fremdrift-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 500);
    });
    main.querySelector('[data-a="import"]').addEventListener('change', (e) => {
      const fil = e.target.files[0];
      if (!fil) return;
      fil.text().then((t) => {
        try {
          S.import(t);
          KJ.toast('Fremdriften er importert.', 'ok');
          KJ.views.home(main);
        } catch (err) {
          KJ.toast('Kunne ikke lese filen.');
        }
      });
    });
    main.querySelector('[data-a="nullstill"]').addEventListener('click', () => {
      KJ.bekreft('Nullstille all fremdrift?', 'Svar, feilbank, selvvurdering, flashcards og prøveresultater slettes fra denne nettleseren. Dette kan ikke angres.', 'Nullstill', 'Avbryt').then((ja) => {
        if (!ja) return;
        S.nullstill();
        KJ.toast('Fremdriften er nullstilt.');
        KJ.views.home(main);
      });
    });
  };

  function ql(href, ikon, tittel, tekst) {
    return '<a class="qlink" href="' + href + '"><span class="qlink-ico">' + KJ.icon(ikon, 20) + '</span><span><h3>' + tittel + '</h3><p>' + esc(tekst) + '</p></span></a>';
  }
})(window.KJ);
