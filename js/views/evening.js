/*
 * «Kvelden før»: kort oppsummering av alle læringsmålene med regler, unntak
 * og vanlige feil. Laget for å leses på skjerm eller skrives ut (to spalter).
 * #/kvelden-for           alle mål
 * #/kvelden-for?vis=svake  bare røde, gule og ikke vurderte mål
 */
(function (KJ) {
  'use strict';
  const esc = KJ.esc;
  const S = KJ.store;

  function ioneTabell() {
    return (
      '<table class="ark-ioner"><tbody>' +
      KJ.tavlaIoner()
        .map((i) => '<tr><td>' + KJ.fmt('{{' + i.formel + '}}') + '</td><td>' + esc(i.navn) + '</td></tr>')
        .join('') +
      '</tbody></table>'
    );
  }

  function blokk(t) {
    const mal = t.mal.map((nr) => {
      const sv = S.selv(nr);
      return (
        '<li class="' + (sv ? 'lys-' + sv.verdi : '') + '"><span class="ark-nr">' + nr + '</span><span>' + esc(KJ.malInfo(nr).tekst) + '</span></li>'
      );
    });
    return (
      '<section class="ark-blokk" style="--tc:' + t.farge + '">' +
      '<h2><span class="mono">' + String(t.nr).padStart(2, '0') + '</span> ' + esc(t.tittel) + '</h2>' +
      '<ul class="ark-mal">' + mal.join('') + '</ul>' +
      (t.huskeliste && t.huskeliste.length ? '<h3>Husk</h3><ul class="ark-husk">' + t.huskeliste.map((h) => '<li>' + KJ.fmt(h) + '</li>').join('') + '</ul>' : '') +
      (t.spesial === 'ioner' ? ioneTabell() : '') +
      (t.feller.length ? '<h3>Vanlige feil</h3><ul class="ark-feil">' + t.feller.map((f) => '<li>' + KJ.fmt(f) + '</li>').join('') + '</ul>' : '') +
      '</section>'
    );
  }

  function svak(t) {
    return t.mal.some((nr) => {
      const sv = S.selv(nr);
      return !sv || sv.verdi !== 'gronn';
    });
  }

  KJ.views.evening = function (main, params) {
    KJ.settTittel('Kvelden før');
    const bareSvake = params.get('vis') === 'svake';
    const moduler = bareSvake ? KJ.moduler.filter(svak) : KJ.moduler;
    const dato = new Date(KJ.PROVE.dato + 'T12:00:00').toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long' });

    main.innerHTML =
      '<div class="view"><section class="container tools-head ark-topp">' +
      '<p class="eyebrow">Kvelden før · ' + esc(KJ.PROVE.navn) + ' ' + esc(dato) + '</p>' +
      '<h1>Alle målene på ett ark</h1>' +
      '<p class="lead">Regler, unntak og vanlige feil for hvert læringsmål. Les gjennom i kveld, eller skriv ut og ta det med. Fargen ved hvert mål viser selvvurderingen din.</p>' +
      '<div class="btn-row" style="margin-top:16px">' +
      '<button type="button" class="btn btn-primary" data-a="skriv">' + KJ.icon('printer', 18) + 'Skriv ut</button>' +
      '<div class="seg" role="group" aria-label="Hvilke mål">' +
      '<button type="button" data-vis="alle" aria-pressed="' + !bareSvake + '">Alle mål</button>' +
      '<button type="button" data-vis="svake" aria-pressed="' + bareSvake + '">Bare røde og gule</button>' +
      '</div></div></section>' +
      '<section class="container"><div class="ark">' +
      (moduler.length ? moduler.map(blokk).join('') : '<p class="muted">Alle målene er grønne. Velg «Alle mål» for å se hele arket.</p>') +
      '<section class="ark-blokk ark-slutt"><h2>På prøven</h2><ul class="ark-husk">' +
      '<li>Les oppgaven to ganger, og understrek hva du blir spurt om.</li>' +
      '<li>Begrunn med fagbegreper: elektronskall, kjerneladning, skjerming, elektronegativitet, dipol, hydrogenbinding.</li>' +
      '<li>Forklar på partikkelnivå, og gi et konkret eksempel.</li>' +
      '<li>Sjekk ladningsregnskapet i saltformler og atomregnskapet i reaksjonslikninger.</li>' +
      '<li>Ta de lette oppgavene først, og kom tilbake til dem du står fast på.</li>' +
      '</ul></section>' +
      '</div></section></div>';

    main.querySelector('[data-a="skriv"]').addEventListener('click', () => window.print());
    main.querySelector('.seg').addEventListener('click', (e) => {
      const b = e.target.closest('[data-vis]');
      if (!b) return;
      location.hash = b.dataset.vis === 'svake' ? '#/kvelden-for?vis=svake' : '#/kvelden-for';
    });
    return null;
  };
})(window.KJ);
