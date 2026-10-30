/*
 * Oversikt: spekter med fremdrift, statistikk, temaer og snarveier.
 */
(function (KJ) {
  'use strict';
  const esc = KJ.esc;

  KJ.views.home = function (main) {
    KJ.settTittel('');
    const S = KJ.store;
    const temaer = KJ.temaer;
    const fr = temaer.map((t) => S.temaFremdrift(t.id));
    const totalt = fr.reduce((a, f) => a + f.totalt, 0);
    const ok = fr.reduce((a, f) => a + f.ok, 0);
    const alleKort = temaer.reduce((a, t) => a.concat(t.flashcards.map((k) => t.id + ':' + KJ.hash(k.f))), []);
    const kan = alleKort.filter((id) => S.kort(id) === 'kan').length;
    const feil = S.feilbank().length;
    const siste = S.prover()[0];
    const sist = S.sist();

    const x = (nm) => (((nm - 380) / (720 - 380)) * 100).toFixed(2) + '%';
    const linjer = temaer
      .map((t, i) => {
        const o = (0.2 + 0.8 * fr[i].andel).toFixed(2);
        return '<span class="sline" style="left:' + x(t.bolge) + ';--lc:' + t.farge + ';--lo:' + o + '"></span><span class="sline-l" style="left:' + x(t.bolge) + '">' + String(t.nr).padStart(2, '0') + '</span>';
      })
      .join('');

    let fortsett = '';
    if (sist && KJ.temaMap[sist.tema]) {
      const t = KJ.temaMap[sist.tema];
      fortsett =
        '<div class="continue"><p><span class="muted">Fortsett der du slapp:</span> <strong>' + esc(t.tittel) + '</strong></p>' +
        '<a class="btn btn-primary btn-small" href="#/tema/' + t.id + '/oppgaver?niva=' + (sist.niva || 0) + (sist.q ? '&q=' + sist.q : '') + '">Fortsett ' + KJ.icon('arrow', 16) + '</a></div>';
    }

    main.innerHTML =
      '<div class="view">' +
      '<section class="hero"><div class="container">' +
      '<p class="eyebrow">Kjemi 1 · VG2 studiespesialisering</p>' +
      '<h1>Kjemi, <em>linje for linje</em>.</h1>' +
      '<p class="lead">Åtte temaer bygd på notatene dine, med teori, ' + totalt + ' oppgaver i tre nivåer, flashcards, prøvemodus og feilbank. Hver linje i spekteret er et tema, og den lyser sterkere jo mer du mestrer.</p>' +
      '<div class="spectrum" aria-hidden="true">' + linjer + '</div>' +
      '<div class="spectrum-cap" aria-hidden="true"><span>400 nm</span><span>Emisjonsspekteret ditt</span><span>700 nm</span></div>' +
      '<div class="stats">' +
      '<div class="stat"><div class="stat-v">' + ok + ' <small>/ ' + totalt + '</small></div><div class="stat-l">oppgaver mestret</div></div>' +
      '<a class="stat" href="#/kort"><div class="stat-v">' + kan + ' <small>/ ' + alleKort.length + '</small></div><div class="stat-l">flashcards du kan</div></a>' +
      '<a class="stat" href="#/feilbank"><div class="stat-v">' + feil + '</div><div class="stat-l">oppgaver i feilbanken</div></a>' +
      '<a class="stat" href="#/prove"><div class="stat-v">' + (siste ? siste.prosent + ' <small>%</small>' : '–') + '</div><div class="stat-l">' + (siste ? 'siste prøve (karakter ' + siste.karakter + ')' : 'ingen prøver ennå') + '</div></a>' +
      '</div>' +
      fortsett +
      '</div></section>' +

      '<section class="section"><div class="container">' +
      '<div class="section-head"><div><h2>Temaer</h2><p>Les teorien først, og øv deretter fra grunnleggende til høy måloppnåelse.</p></div></div>' +
      '<div class="topic-grid">' +
      temaer
        .map((t, i) => {
          const f = fr[i];
          const bar = (n, navn) => {
            const [a, b] = f.niva[n];
            return (
              '<div class="lvlbar"><div class="lvlbar-l"><span>' + navn + '</span><span>' + a + '/' + b + '</span></div><div class="bar"><i style="width:' + (b ? (100 * a) / b : 0) + '%"></i></div></div>'
            );
          };
          return (
            '<a class="tcard" href="#/tema/' + t.id + '" style="--tc:' + t.farge + '">' +
            '<div class="tcard-top"><span class="tcard-nr">' + String(t.nr).padStart(2, '0') + (t.kilde === 'tillegg' ? '<span class="tag-extra">tillegg</span>' : '') + '</span><span class="tcard-lambda">λ ' + esc(t.linje) + '</span></div>' +
            '<h3>' + esc(t.tittel) + '</h3><p>' + esc(t.beskrivelse) + '</p>' +
            '<div class="tcard-foot"><div class="lvlbars">' + bar(1, 'G') + bar(2, 'M') + bar(3, 'H') + '</div></div></a>'
          );
        })
        .join('') +
      '</div></div></section>' +

      '<section class="section" style="padding-top:0"><div class="container">' +
      '<div class="section-head"><div><h2>Øv på tvers</h2></div></div>' +
      '<div class="quick">' +
      ql('#/prove', 'clipboard', 'Prøvemodus', 'Blandet prøve med tidtaker og poeng, som en tentamen.') +
      ql('#/feilbank', 'target', 'Feilbank', feil ? feil + ' oppgaver du har svart feil på venter.' : 'Oppgaver du svarer feil på havner her.') +
      ql('#/kort', 'layers', 'Flashcards', 'Begreper, definisjoner og ioner. Snu kortet og vurder deg selv.') +
      ql('#/verktoy/periodesystem', 'grid', 'Periodesystem', 'Molar masse, elektronegativitet og elektronfordeling.') +
      '</div>' +

      '<div class="foot">' +
      '<p>Innholdet bygger på notatene dine og er tilpasset kompetansemålene i Kjemi 1 (LK20). Tema 8 (mol) er et tillegg som ikke står i notatene, men som du trenger til regneoppgavene.</p>' +
      '<p>Fremdriften lagres bare i denne nettleseren. Eksporter den hvis du vil flytte den til en annen enhet.</p>' +
      '<div class="btn-row">' +
      '<button type="button" class="btn btn-ghost btn-small" data-a="eksport">' + KJ.icon('download', 16) + 'Eksporter fremdrift</button>' +
      '<label class="btn btn-ghost btn-small" style="cursor:pointer">' + KJ.icon('upload', 16) + 'Importer<input type="file" accept="application/json,.json" data-a="import" hidden></label>' +
      '<button type="button" class="btn btn-danger btn-small" data-a="nullstill">' + KJ.icon('trash', 16) + 'Nullstill alt</button>' +
      '</div></div>' +
      '</div></section></div>';

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
      KJ.bekreft('Nullstille all fremdrift?', 'Svar, feilbank, flashcards og prøveresultater slettes fra denne nettleseren. Dette kan ikke angres.', 'Nullstill', 'Avbryt').then((ja) => {
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
