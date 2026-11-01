/*
 * Smart øving: én oppgave om gangen fra målene der du er svakest.
 * #/ov              alle mål, vektet etter selvvurdering og resultater
 * #/ov?mal=3,7      bare disse målene
 */
(function (KJ) {
  'use strict';
  const esc = KJ.esc;
  const S = KJ.store;
  const LYSORD = { rod: 'Rød', gul: 'Gul', gronn: 'Grønn' };

  function malListe(params) {
    return String(params.get('mal') || '')
      .split(',')
      .map((x) => parseInt(x, 10))
      .filter((nr) => KJ.malInfo(nr));
  }

  function malChip(m) {
    const info = KJ.malInfo(m.nr);
    return (
      '<span class="smart-mal' + (m.verdi ? ' lys-' + m.verdi : '') + '" title="' + esc(info.tekst) + '"><i></i>Mål ' + m.nr + ' <span class="muted">' + esc(info.kort) + '</span></span>'
    );
  }

  KJ.views.smart = function (main, params) {
    KJ.settTittel('Smart øving');
    const utvalg = malListe(params);
    const nylig = [];
    const okt = { besvart: 0, riktig: 0 };
    let kort = null;
    let valgt = null;
    let vist = 0;

    main.innerHTML =
      '<div class="view"><section class="container tools-head">' +
      '<p class="eyebrow">Smart øving</p>' +
      '<h1>' + (utvalg.length ? 'Øv på ' + (utvalg.length === 1 ? 'mål ' + utvalg[0] : utvalg.length + ' utvalgte mål') : 'Øv der du er svakest') + '</h1>' +
      '<p class="lead">' +
      (utvalg.length
        ? 'Oppgavene hentes bare fra ' + (utvalg.length === 1 ? 'dette målet' : 'disse målene') + '. Røde mål og oppgaver du har svart feil på kommer oftest.'
        : 'Siden velger oppgaver fra alle de ' + KJ.MAL.length + ' målene, men oftest fra de røde og fra oppgaver du har svart feil på. Grønne mål får mest oppgaver på høyt nivå.') +
      '</p>' +
      '<div class="smart-fokus" data-fokus></div>' +
      (utvalg.length ? '<p style="margin:10px 0 0"><a class="btn btn-quiet btn-small" href="#/ov">' + KJ.icon('shuffle', 16) + 'Øv på alle målene i stedet</a></p>' : '') +
      '</section>' +
      '<section class="container practice">' +
      '<div class="smart-bar"><p class="smart-grunn" data-grunn></p><span class="smart-okt" data-okt></span></div>' +
      '<div data-card></div>' +
      '<div class="practice-foot"><a class="btn btn-ghost" href="#/">' + KJ.icon('left', 18) + 'Til oversikten</a>' +
      '<button type="button" class="btn btn-primary" data-a="neste">Neste oppgave ' + KJ.icon('right', 18) + '</button></div>' +
      '</section></div>';

    const fokusEl = main.querySelector('[data-fokus]');
    const grunnEl = main.querySelector('[data-grunn]');
    const oktEl = main.querySelector('[data-okt]');
    const kortEl = main.querySelector('[data-card]');

    function tegnFokus() {
      const pri = KJ.malPrioritert(utvalg);
      const likt = pri.length > 1 && pri[0].p - pri[pri.length - 1].p < 0.01;
      if (!utvalg.length && likt) {
        fokusEl.innerHTML = '<span class="muted">Alle målene veier likt til du har vurdert deg selv eller svart på noen oppgaver.</span>';
        return;
      }
      const vis = utvalg.length ? pri : pri.slice(0, 5);
      fokusEl.innerHTML = '<span class="muted">' + (utvalg.length ? 'Målene:' : 'Mest vekt nå:') + '</span> ' + vis.map(malChip).join('');
    }
    function tegnOkt() {
      oktEl.textContent = okt.besvart ? okt.riktig + ' av ' + okt.besvart + ' riktig på første forsøk' : '';
    }

    function neste(fokus) {
      valgt = KJ.smartVelg({ mal: utvalg, nylig });
      if (!valgt) {
        kortEl.innerHTML = '<p class="muted">Fant ingen oppgaver.</p>';
        return;
      }
      nylig.push(valgt.q.id);
      while (nylig.length > 12) nylig.shift();
      const modul = KJ.modulMap[valgt.q.modul];
      kort = new KJ.Oppgavekort(valgt.q, {
        modus: 'ovelse',
        nummer: ++vist,
        visTema: true,
        onResultat: (res, k) => {
          if (k.forsok === 1) {
            okt.besvart++;
            if (res.riktig) okt.riktig++;
          }
          tegnOkt();
          tegnFokus();
        },
      });
      if (modul) kort.el.style.setProperty('--tc', modul.farge);
      kortEl.innerHTML = '';
      kortEl.appendChild(kort.el);
      grunnEl.innerHTML = '<i class="smart-dot' + (valgt.verdi ? ' lys-' + valgt.verdi : '') + '"></i>' + esc(valgt.grunn);
      tegnFokus();
      if (fokus) {
        const top = kortEl.getBoundingClientRect().top + window.scrollY - 90;
        if (window.scrollY > top) window.scrollTo({ top, behavior: 'auto' });
        const p = kort.el.querySelector('.q-prompt');
        p.setAttribute('tabindex', '-1');
        p.focus({ preventScroll: true });
      }
    }

    main.querySelector('[data-a="neste"]').addEventListener('click', () => neste(true));
    tegnOkt();
    neste(false);
    return null;
  };

  KJ.LYSORD = LYSORD;
})(window.KJ);
