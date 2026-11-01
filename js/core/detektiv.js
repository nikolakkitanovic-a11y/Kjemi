/*
 * Stoffdetektiv: observasjoner → stofftype, bevis og plan for en undersøkelse.
 *
 * q.obs:  [[tekst, rolle], ...]  rolle 'k' = bevis (skal krysses av),
 *                                 'n' = nøytral (kan krysses av, men avgjør ikke),
 *                                 'i' = sier ikke noe om stofftypen (skal ikke krysses av)
 * q.svar: indeks i KJ.STOFFTYPER
 * q.plan: valgfri { sporsmal, alternativer, svar }  neste undersøkelse
 */
(function (KJ) {
  'use strict';
  KJ.STOFFTYPER = [
    'Ionisk forbindelse (salt)',
    'Molekylært stoff, polart',
    'Molekylært stoff, upolart',
    'Metall',
    'Atomgitter (kovalent nettverk)',
  ];

  KJ.detektivDeler = (q) => ['type', 'bevis'].concat(q.plan ? ['plan'] : []);

  KJ.rettDetektiv = function (q, svar) {
    svar = svar || {};
    const bevis = svar.bevis || [];
    if (svar.type == null && !bevis.length && svar.plan == null) return { riktig: false, andel: 0, tomt: true, melding: 'Velg stofftype og kryss av for bevisene.' };
    const deler = {};
    const linjer = [];
    deler.type = svar.type === q.svar;
    if (!deler.type) linjer.push(svar.type == null ? 'Du har ikke valgt stofftype.' : 'Stofftypen er ikke riktig. Hvilke observasjoner passer ikke med «' + KJ.STOFFTYPER[svar.type] + '»?');
    const mangler = q.obs.map((o, i) => (o[1] === 'k' && !bevis.includes(i) ? i : -1)).filter((i) => i >= 0);
    const ikke = bevis.filter((i) => q.obs[i] && q.obs[i][1] === 'i');
    deler.bevis = !mangler.length && !ikke.length;
    if (mangler.length) linjer.push('Du mangler ' + mangler.length + ' observasjon' + (mangler.length > 1 ? 'er' : '') + ' som er bevis.');
    if (ikke.length) linjer.push('Du har krysset av for noe som ikke sier noe om stofftypen (' + ikke.map((i) => '«' + q.obs[i][0] + '»').join(', ') + ').');
    if (q.plan) {
      deler.plan = svar.plan === q.plan.svar;
      if (!deler.plan) linjer.push(svar.plan == null ? 'Du har ikke valgt en undersøkelse.' : 'Undersøkelsen du valgte, skiller ikke sikkert mellom stofftypene.');
    }
    const n = Object.keys(deler).length;
    const ok = Object.values(deler).filter(Boolean).length;
    return {
      riktig: ok === n,
      andel: ok / n,
      detektivDeler: deler,
      melding: ok === n ? 'Riktig! Saken er løst.' : ok + ' av ' + n + ' deler riktig. ' + linjer.join(' '),
    };
  };

  KJ.detektivFasitHtml = function (q) {
    return (
      '<p style="margin:0 0 6px"><strong>Stofftype:</strong> ' + KJ.STOFFTYPER[q.svar] + '</p>' +
      '<p style="margin:0 0 4px"><strong>Bevis:</strong></p><ul class="fasit-liste">' +
      q.obs.filter((o) => o[1] === 'k').map((o) => '<li>' + KJ.fmt(o[0]) + '</li>').join('') +
      '</ul>' +
      (q.plan ? '<p style="margin:8px 0 0"><strong>Undersøkelse:</strong> ' + KJ.fmt(q.plan.alternativer[q.plan.svar]) + '</p>' : '')
    );
  };
})(window.KJ);
