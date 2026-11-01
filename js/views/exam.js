/*
 * Prøvesimulering: blandet prøve på tvers av læringsmålene, med tidtaker og poengsum.
 * Hvert valgt mål får minst én oppgave så langt antallet rekker.
 * Ingen retting underveis. Etter levering: poeng, veiledende karakter,
 * gjennomgang med løsningsforslag og egenvurdering av forklaringsoppgaver.
 * En påbegynt prøve lagres, så du kan fortsette etter å ha lukket siden.
 */
(function (KJ) {
  'use strict';
  const esc = KJ.esc;
  const S = KJ.store;

  const SKALA = [
    [90, 6],
    [75, 5],
    [60, 4],
    [40, 3],
    [20, 2],
    [0, 1],
  ];
  const karakter = (p) => SKALA.find((s) => p >= s[0])[1];

  /* Andel oppgaver per nivå i en blandet prøve, omtrent som på en vanlig prøve. */
  const NIVAANDEL = { 1: 0.35, 2: 0.4, 3: 0.25 };

  function trekk(pott, brukt, blandet) {
    const fri = pott.filter((q) => !brukt.has(q.id));
    if (!fri.length) return null;
    if (!blandet) return fri[Math.floor(Math.random() * fri.length)];
    const nivaer = [1, 2, 3].filter((n) => fri.some((q) => q.niva === n));
    const sum = nivaer.reduce((a, n) => a + NIVAANDEL[n], 0);
    let x = Math.random() * sum;
    let niva = nivaer[nivaer.length - 1];
    for (const n of nivaer) {
      x -= NIVAANDEL[n];
      if (x <= 0) {
        niva = n;
        break;
      }
    }
    const kand = fri.filter((q) => q.niva === niva);
    return kand[Math.floor(Math.random() * kand.length)];
  }

  function velgOppgaver(innst) {
    const nivaOk = (n) => (innst.niva === 'mh' ? n >= 2 : innst.niva === 'h' ? n === 3 : true);
    const ok = (q) => nivaOk(q.niva) && (innst.forklaring || q.type !== 'forklaring');
    const mal = KJ.shuffle(innst.mal.slice());
    const potter = {};
    mal.forEach((nr) => (potter[nr] = KJ.malOppgaver(nr).filter(ok)));
    const valgt = [];
    const brukt = new Set();
    const dekket = new Set();
    let runde = 0;
    let fikk = true;
    while (valgt.length < innst.antall && fikk) {
      fikk = false;
      for (const nr of mal) {
        if (valgt.length >= innst.antall) break;
        // Første runde: hopp over mål som allerede er dekket av en oppgave med flere mål.
        if (runde === 0 && dekket.has(nr)) continue;
        const q = trekk(potter[nr], brukt, innst.niva === 'blandet');
        if (!q) continue;
        valgt.push(q);
        brukt.add(q.id);
        q.mal.forEach((m) => dekket.add(m));
        fikk = true;
      }
      runde++;
    }
    // Lett → vanskelig, men målene blandet innenfor hvert nivå.
    return KJ.shuffle(valgt).sort((a, b) => a.niva - b.niva).map((q) => q.id);
  }
  KJ.velgProveOppgaver = velgOppgaver;

  /** Poeng per læringsmål. En oppgave med flere mål teller på hvert av dem. */
  function perMal(rader) {
    const ut = {};
    rader.forEach(({ q, res, p }) => {
      (q.mal || []).forEach((nr) => {
        const t = (ut[nr] = ut[nr] || { p: 0, m: 0, n: 0 });
        t.p += res.andel * p;
        t.m += p;
        t.n++;
      });
    });
    return ut;
  }
  KJ.provePerMal = perMal;

  function beregn(P) {
    let poeng = 0;
    let maks = 0;
    let venter = 0;
    const rader = P.ids.map((id) => {
      const q = (P.gen && P.gen[id]) || KJ.oppgave(id);
      const p = KJ.NIVA[q.niva].poeng;
      maks += p;
      let res;
      if (q.type === 'forklaring') {
        const kryss = P.selv && P.selv[id];
        if (kryss) res = KJ.rett(q, { kryss });
        else {
          res = { riktig: false, andel: 0, venter: true, tomt: !KJ.harSvar(q, P.svar[id]) };
          venter++;
        }
      } else res = KJ.rett(q, P.svar[id]);
      poeng += res.andel * p;
      return { q, res, p };
    });
    const prosent = maks ? Math.round((100 * poeng) / maks) : 0;
    return { poeng: Math.round(poeng * 10) / 10, maks, prosent, karakter: karakter(prosent), rader, venter };
  }

  KJ.views.exam = function (main) {
    KJ.settTittel('Prøve');
    let rydd = null;
    const ferdig = () => {
      if (rydd) rydd();
      rydd = null;
    };
    oppsett(main, (fn) => (rydd = fn));
    return ferdig;
  };

  /* ---------- Oppsett ---------- */
  function oppsett(main, settRydd) {
    const innst = { mal: KJ.MAL.map((m) => m.nr), antall: 20, niva: 'blandet', tid: 'auto', forklaring: true };
    let aktiv = S.aktivProve();
    if (aktiv) {
      // Oppgaver som er fjernet fra datafilene, tas ut av en påbegynt prøve.
      aktiv.ids = aktiv.ids.filter((id) => KJ.oppgave(id));
      Object.keys(aktiv.svar).forEach((id) => {
        if (!KJ.oppgave(id)) delete aktiv.svar[id];
      });
      if (!aktiv.ids.length) {
        S.settAktivProve(null);
        aktiv = null;
      }
    }
    const hist = S.prover();

    main.innerHTML =
      '<div class="view"><section class="container tools-head">' +
      '<p class="eyebrow">Prøvemodus</p><h1>Prøvesimulering</h1>' +
      '<p class="lead">En blandet prøve på tvers av læringsmålene, med tidtaker. Med 20 oppgaver får hvert av de ' + KJ.MAL.length + ' målene minst én oppgave. Du får ikke vite om svarene er riktige før du leverer, akkurat som på en ekte prøve. Etterpå ser du hvilke mål du bør øve mer på.</p>' +
      (aktiv
        ? '<div class="continue" style="margin-top:18px"><p><strong>Du har en påbegynt prøve.</strong> <span class="muted">' + Object.keys(aktiv.svar).length + ' av ' + aktiv.ids.length + ' besvart · ' + tidIgjenTekst(aktiv) + '</span></p>' +
          '<div class="btn-row"><button type="button" class="btn btn-ghost btn-small" data-a="forkast">Forkast</button><button type="button" class="btn btn-primary btn-small" data-a="fortsett">Fortsett prøven ' + KJ.icon('arrow', 16) + '</button></div></div>'
        : '') +
      '</section>' +
      '<section class="container exam-setup"><div class="panel">' +
      '<div class="form-block"><h3>Læringsmål</h3><div class="chips" data-tema>' +
      KJ.MAL.map((m) => {
        const modul = KJ.malModul(m.nr);
        const sv = S.selv(m.nr);
        return '<button type="button" class="chip chip-mal' + (sv ? ' lys-' + sv.verdi : '') + '" aria-pressed="true" data-id="' + m.nr + '" title="' + esc(m.tekst) + '" style="--tc:' + (modul ? modul.farge : 'var(--ink-3)') + '"><span class="dot"></span>' + m.nr + ' ' + esc(m.kort) + '</button>';
      }).join('') +
      '</div><div class="btn-row"><button type="button" class="btn btn-quiet btn-small" data-a="alle">Alle mål</button><button type="button" class="btn btn-quiet btn-small" data-a="svake">Røde og gule</button><button type="button" class="btn btn-quiet btn-small" data-a="ingen">Fjern alle</button></div></div>' +
      '<div class="form-block"><h3>Antall oppgaver</h3><div class="seg" role="group" aria-label="Antall oppgaver" data-antall>' +
      [10, 20, 30, 40].map((n) => '<button type="button" data-v="' + n + '" aria-pressed="' + (n === 20) + '">' + n + '</button>').join('') +
      '</div></div>' +
      '<div class="form-block"><h3>Nivå</h3><div class="seg" role="group" aria-label="Nivå" data-niva>' +
      [['blandet', 'Blandet'], ['mh', 'Middels og høy'], ['h', 'Bare høy']].map(([v, n]) => '<button type="button" data-v="' + v + '" aria-pressed="' + (v === 'blandet') + '">' + n + '</button>').join('') +
      '</div></div>' +
      '<div class="form-block"><h3>Tid</h3><div class="seg" role="group" aria-label="Tid" data-tid>' +
      [['auto', 'Auto'], [20, '20 min'], [30, '30 min'], [45, '45 min'], [60, '60 min'], [90, '90 min']].map(([v, n]) => '<button type="button" data-v="' + v + '" aria-pressed="' + (v === 'auto') + '">' + n + '</button>').join('') +
      '</div><p class="form-hint" data-tidhint></p></div>' +
      '<div class="form-block"><label class="chk"><input type="checkbox" data-forklaring checked><span>Ta med forklaringsoppgaver <span class="muted">(du vurderer dem selv mot et modellsvar etter levering)</span></span></label></div>' +
      '<div class="btn-row"><button type="button" class="btn btn-primary btn-lg" data-a="start">' + KJ.icon('play', 18) + 'Start prøven</button><span class="muted" data-info></span></div>' +
      '</div>' +
      '<aside class="panel"><h3 style="margin-bottom:10px">Tidligere prøver</h3>' +
      (hist.length
        ? '<ul class="hist">' +
          hist.map((h) => '<li><span>' + new Date(h.dato).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' }) + ' · ' + h.antall + ' oppg.</span><span><b>' + h.prosent + ' %</b> · karakter ' + h.karakter + '</span></li>').join('') +
          '</ul>'
        : '<p class="muted">Ingen prøver ennå. Resultatene dine dukker opp her.</p>') +
      '<p class="form-hint" style="margin-top:14px">Poeng: grunnleggende 1, middels 2, høy måloppnåelse 3. Delvis riktige svar gir delpoeng. Den veiledende karakteren bruker en vanlig skala (90 % = 6, 75 % = 5, 60 % = 4, 40 % = 3, 20 % = 2); skolen din kan ha en annen.</p>' +
      '</aside></section></div>';

    const info = main.querySelector('[data-info]');
    const tidhint = main.querySelector('[data-tidhint]');
    function oppdater() {
      const ids = velgOppgaver(innst);
      const min = innst.tid === 'auto' ? Math.max(10, Math.ceil(Math.min(innst.antall, ids.length) * 2)) : innst.tid;
      tidhint.textContent = innst.tid === 'auto' ? 'Auto gir 2 minutter per oppgave: ' + min + ' minutter.' : '';
      const dekker = new Set();
      ids.forEach((id) => KJ.oppgave(id).mal.forEach((nr) => innst.mal.includes(nr) && dekker.add(nr)));
      info.textContent = innst.mal.length ? ids.length + ' oppgaver · ' + min + ' min · dekker ' + dekker.size + ' av ' + innst.mal.length + ' mål' : 'Velg minst ett mål';
      main.querySelector('[data-a="start"]').disabled = !ids.length;
    }
    const seg = (sel, key, tall) =>
      main.querySelector(sel).addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        e.currentTarget.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        innst[key] = tall && b.dataset.v !== 'auto' ? +b.dataset.v : b.dataset.v;
        oppdater();
      });
    seg('[data-antall]', 'antall', true);
    seg('[data-niva]', 'niva', false);
    seg('[data-tid]', 'tid', true);
    main.querySelector('[data-tema]').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const på = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(på));
      innst.mal = [...main.querySelectorAll('[data-tema] button[aria-pressed="true"]')].map((x) => +x.dataset.id);
      oppdater();
    });
    const velgMal = (filter) => {
      main.querySelectorAll('[data-tema] button').forEach((x) => x.setAttribute('aria-pressed', String(filter(+x.dataset.id))));
      innst.mal = KJ.MAL.map((m) => m.nr).filter(filter);
      oppdater();
    };
    main.querySelector('[data-a="alle"]').addEventListener('click', () => velgMal(() => true));
    main.querySelector('[data-a="ingen"]').addEventListener('click', () => velgMal(() => false));
    main.querySelector('[data-a="svake"]').addEventListener('click', () => {
      const svake = (nr) => {
        const sv = S.selv(nr);
        return !sv || sv.verdi !== 'gronn';
      };
      if (!KJ.MAL.some((m) => svake(m.nr))) KJ.toast('Alle målene er grønne. Bra!', 'ok');
      else velgMal(svake);
    });
    main.querySelector('[data-forklaring]').addEventListener('change', (e) => {
      innst.forklaring = e.target.checked;
      oppdater();
    });
    main.querySelector('[data-a="start"]').addEventListener('click', () => {
      const startNy = () => {
        const ids = velgOppgaver(innst);
        if (!ids.length) return;
        const min = innst.tid === 'auto' ? Math.max(10, Math.ceil(ids.length * 2)) : innst.tid;
        const P = { id: Date.now(), ids, svar: {}, flagg: {}, selv: {}, start: Date.now(), varighet: min * 60, idx: 0 };
        S.settAktivProve(P);
        kjor(main, P, settRydd);
      };
      if (aktiv) KJ.bekreft('Starte en ny prøve?', 'Den påbegynte prøven blir forkastet.', 'Start ny', 'Avbryt').then((ja) => ja && startNy());
      else startNy();
    });
    if (aktiv) {
      main.querySelector('[data-a="fortsett"]').addEventListener('click', () => kjor(main, aktiv, settRydd));
      main.querySelector('[data-a="forkast"]').addEventListener('click', () =>
        KJ.bekreft('Forkaste prøven?', 'Svarene dine på den påbegynte prøven slettes.', 'Forkast', 'Avbryt').then((ja) => {
          if (!ja) return;
          S.settAktivProve(null);
          oppsett(main, settRydd);
        })
      );
    }
    oppdater();
  }

  function igjen(P) {
    return Math.round((P.start + P.varighet * 1000 - Date.now()) / 1000);
  }
  function tidIgjenTekst(P) {
    const s = igjen(P);
    return s > 0 ? KJ.tid(s) + ' igjen' : 'tiden er ute';
  }

  /* ---------- Gjennomføring ---------- */
  function kjor(main, P, settRydd) {
    window.scrollTo(0, 0);
    const kort = new Map();
    const N = P.ids.length;
    main.innerHTML =
      '<div class="view">' +
      '<div class="exam-bar"><div class="container exam-bar-in">' +
      '<span class="timer" role="timer" aria-live="off" data-timer>' + KJ.icon('timer', 18) + '<span>--:--</span></span>' +
      '<div class="exam-prog"><span data-besvart></span><div class="bar"><i data-pbar></i></div></div>' +
      '<button type="button" class="btn btn-primary btn-small" data-a="lever">' + KJ.icon('check', 16) + 'Lever</button>' +
      '</div></div>' +
      '<div class="container exam-body"><div><div data-kort></div>' +
      '<div class="practice-foot" style="margin-top:16px"><button type="button" class="btn btn-ghost" data-a="forrige">' + KJ.icon('left', 18) + 'Forrige</button>' +
      '<button type="button" class="btn btn-quiet" data-a="flagg" aria-pressed="false">' + KJ.icon('flag', 18) + 'Merk for gjennomgang</button>' +
      '<button type="button" class="btn btn-primary" data-a="neste">Neste ' + KJ.icon('right', 18) + '</button></div></div>' +
      '<aside class="exam-side panel"><h3 style="margin-bottom:10px">Oppgaver</h3><nav class="qnav" aria-label="Oppgaver i prøven" data-nav></nav>' +
      '<div class="qnav-legend" style="margin-top:12px"><span><i style="background:var(--sunken);border-color:var(--ink-3)"></i>Besvart</span><span><i></i>Ubesvart</span><span><i style="background:var(--warn-bg);border-color:var(--warn)"></i>Merket</span></div></aside>' +
      '</div></div>';

    const kortEl = main.querySelector('[data-kort]');
    const navEl = main.querySelector('[data-nav]');
    const timerEl = main.querySelector('[data-timer]');

    function hentKort(i) {
      const id = P.ids[i];
      if (!kort.has(id)) {
        P.gen = P.gen || {};
        const k = new KJ.Oppgavekort(KJ.oppgave(id), {
          modus: 'prove',
          instans: P.gen[id] || null,
          nummer: i + 1,
          totalt: N,
          visTema: true,
          onEndring: (c) => {
            if (c.besvart()) P.svar[id] = c.hentSvar();
            else delete P.svar[id];
            S.settAktivProve(P);
            tegnNav();
          },
        });
        if (k.spec) {
          P.gen[id] = k.q;
          S.settAktivProve(P);
        }
        if (P.svar[id] != null) k.settSvar(P.svar[id]);
        kort.set(id, k);
      }
      return kort.get(id);
    }

    function tegnNav() {
      navEl.innerHTML = P.ids
        .map((id, i) => '<button type="button" data-i="' + i + '" class="' + (P.svar[id] != null ? 'answered ' : '') + (P.flagg[id] ? 'flag' : '') + '"' + (i === P.idx ? ' aria-current="true"' : '') + ' aria-label="Oppgave ' + (i + 1) + (P.svar[id] != null ? ', besvart' : '') + (P.flagg[id] ? ', merket' : '') + '">' + (i + 1) + '</button>')
        .join('');
      const b = Object.keys(P.svar).length;
      main.querySelector('[data-besvart]').textContent = b + ' av ' + N + ' besvart';
      main.querySelector('[data-pbar]').style.width = (100 * b) / N + '%';
      const fl = main.querySelector('[data-a="flagg"]');
      const på = !!P.flagg[P.ids[P.idx]];
      fl.setAttribute('aria-pressed', String(på));
      fl.innerHTML = KJ.icon('flag', 18) + (på ? 'Fjern merking' : 'Merk for gjennomgang');
    }

    function vis(i, fokus) {
      P.idx = Math.max(0, Math.min(N - 1, i));
      S.settAktivProve(P);
      const k = hentKort(P.idx);
      kortEl.innerHTML = '';
      kortEl.appendChild(k.el);
      main.querySelector('[data-a="forrige"]').disabled = P.idx === 0;
      const nb = main.querySelector('[data-a="neste"]');
      nb.disabled = P.idx === N - 1;
      tegnNav();
      if (fokus) {
        const top = kortEl.getBoundingClientRect().top + window.scrollY - 140;
        if (window.scrollY > top) window.scrollTo({ top, behavior: 'auto' });
        const p = k.el.querySelector('.q-prompt');
        p.setAttribute('tabindex', '-1');
        p.focus({ preventScroll: true });
      }
    }

    let varslet5 = false;
    let varslet1 = false;
    function tikk() {
      const s = igjen(P);
      timerEl.querySelector('span').textContent = KJ.tid(s);
      timerEl.classList.toggle('warn', s <= 300 && s > 60);
      timerEl.classList.toggle('crit', s <= 60);
      if (s <= 300 && !varslet5 && P.varighet > 300) {
        varslet5 = true;
        KJ.toast('5 minutter igjen');
      }
      if (s <= 60 && !varslet1) {
        varslet1 = true;
        KJ.toast('1 minutt igjen');
      }
      if (s <= 0) {
        clearInterval(intervall);
        KJ.toast('Tiden er ute, og prøven er levert.');
        lever(true);
      }
    }
    const intervall = setInterval(tikk, 1000);
    settRydd(() => clearInterval(intervall));

    function lever() {
      clearInterval(intervall);
      kort.forEach((k, id) => {
        if (k.besvart()) P.svar[id] = k.hentSvar();
      });
      P.levert = Date.now();
      S.settAktivProve(null);
      resultat(main, P, settRydd);
    }

    const rot = main.querySelector('.view');
    rot.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || !rot.contains(b)) return;
      if (b.dataset.i != null && b.closest('[data-nav]')) vis(+b.dataset.i, true);
      else if (b.dataset.a === 'forrige') vis(P.idx - 1, true);
      else if (b.dataset.a === 'neste') vis(P.idx + 1, true);
      else if (b.dataset.a === 'flagg') {
        const id = P.ids[P.idx];
        if (P.flagg[id]) delete P.flagg[id];
        else P.flagg[id] = true;
        S.settAktivProve(P);
        tegnNav();
      } else if (b.dataset.a === 'lever') {
        const ub = N - Object.keys(P.svar).length;
        const fl = Object.keys(P.flagg).length;
        const tekst = (ub ? 'Du har ' + ub + ' ubesvarte oppgaver. ' : 'Du har svart på alle oppgavene. ') + (fl ? fl + ' oppgaver er merket for gjennomgang. ' : '') + 'Etter levering kan du ikke endre svarene.';
        KJ.bekreft('Levere prøven?', tekst, 'Lever', 'Fortsett prøven').then((ja) => ja && lever());
      }
    });

    if (igjen(P) <= 0) {
      lever();
      return;
    }
    tikk();
    vis(P.idx || 0);
  }

  /* ---------- Resultat ---------- */
  function resultat(main, P, settRydd) {
    settRydd(null);
    window.scrollTo(0, 0);
    const R = beregn(P);
    const brukt = Math.min(P.varighet, Math.round((P.levert - P.start) / 1000));
    const registrert = new Set();
    R.rader.forEach(({ q, res }) => {
      if (q.type === 'forklaring') return;
      KJ.store.registrer(q.id, res.riktig, true);
      registrert.add(q.id);
    });
    const malProsent = (pm) => {
      const ut = {};
      Object.keys(pm).forEach((nr) => (ut[nr] = Math.round((100 * pm[nr].p) / pm[nr].m)));
      return ut;
    };
    S.lagreResultat({ id: P.id, dato: Date.now(), poeng: R.poeng, maks: R.maks, prosent: R.prosent, karakter: R.karakter, antall: P.ids.length, tid: brukt, mal: malProsent(perMal(R.rader)) });

    main.innerHTML =
      '<div class="view"><section class="container">' +
      '<div class="result-hero"><div><p class="eyebrow" style="color:#9C998F">Resultat</p><div class="result-score" data-score></div><div class="result-grade" data-grade></div>' +
      '<p style="margin:10px 0 0;color:#B9B6AF;font-size:.9rem">' + P.ids.length + ' oppgaver · brukt ' + KJ.tid(brukt) + ' av ' + KJ.tid(P.varighet) + '</p><p data-venter style="margin:6px 0 0;color:#F2C14E;font-size:.9rem"></p></div>' +
      '<div class="ovmer" data-ovmer></div></div>' +
      '<div class="btn-row" style="margin-top:16px"><a class="btn btn-primary" href="#/ov" data-a="ovsvake">' + KJ.icon('zap', 18) + 'Øv på de svake målene</a><a class="btn btn-ghost" href="#/prove" data-a="ny">' + KJ.icon('rotate', 18) + 'Ny prøve</a><a class="btn btn-ghost" href="#/feilbank">' + KJ.icon('target', 18) + 'Feilbanken</a></div>' +
      '<div class="section-head" style="margin-top:32px"><div><h2>Resultat per læringsmål</h2><p>Under 60 % betyr at du bør øve mer på målet. Selvvurderingen på oversikten er oppdatert.</p></div></div>' +
      '<div class="malres" data-malres></div>' +
      '<div class="section-head" style="margin-top:32px"><div><h2>Gjennomgang</h2><p>Åpne en oppgave for å se svaret ditt, fasit og løsningsforslag.</p></div></div>' +
      '<div class="review" data-review></div></section></div>';

    function oppdaterTopp() {
      const r = beregn(P);
      main.querySelector('[data-score]').innerHTML = r.prosent + '<small> %</small>';
      main.querySelector('[data-grade]').innerHTML = fmtP(r.poeng) + ' av ' + r.maks + ' poeng · veiledende karakter <b>' + r.karakter + '</b>';
      main.querySelector('[data-venter]').textContent = r.venter ? r.venter + ' forklaringsoppgave' + (r.venter > 1 ? 'r' : '') + ' venter på egenvurdering (se gjennomgangen under).' : '';
      const pm = perMal(r.rader);
      S.oppdaterResultat(P.id, { poeng: r.poeng, prosent: r.prosent, karakter: r.karakter, mal: malProsent(pm) });
      tegnMal(pm);
      return r;
    }
    function tegnMal(pm) {
      const nrs = Object.keys(pm).map(Number).sort((a, b) => a - b);
      const andel = (nr) => pm[nr].p / pm[nr].m;
      const svake = nrs.filter((nr) => andel(nr) < 0.6).sort((a, b) => andel(a) - andel(b));
      const rad = (nr) => {
        const v = pm[nr];
        const a = andel(nr);
        const modul = KJ.malModul(nr);
        const kl = a >= 0.8 ? 'gronn' : a >= 0.6 ? 'gul' : 'rod';
        return (
          '<div class="malres-rad lys-' + kl + '" data-nr="' + nr + '" style="--tc:' + (modul ? modul.farge : 'var(--ink-3)') + '">' +
          '<span class="goal-nr">' + nr + '</span>' +
          '<div class="malres-t"><p>' + esc(KJ.malInfo(nr).tekst) + '</p><div class="bar"><i style="width:' + Math.round(100 * a) + '%"></i></div></div>' +
          '<span class="malres-p">' + Math.round(100 * a) + ' %<small>' + fmtP(v.p) + '/' + v.m + ' p</small></span>' +
          (a < 0.6 ? '<a class="btn btn-ghost btn-small" href="#/ov?mal=' + nr + '">Øv</a>' : '<span></span>') +
          '</div>'
        );
      };
      main.querySelector('[data-malres]').innerHTML = nrs.map(rad).join('');
      main.querySelector('[data-ovmer]').innerHTML = svake.length
        ? '<h3>Øv mer på</h3><ul>' + svake.slice(0, 6).map((nr) => '<li><a href="#/ov?mal=' + nr + '"><b>Mål ' + nr + '</b> ' + esc(KJ.malInfo(nr).kort) + '<span>' + Math.round(100 * andel(nr)) + ' %</span></a></li>').join('') + '</ul>' + (svake.length > 6 ? '<p>+ ' + (svake.length - 6) + ' mål til (se listen under)</p>' : '')
        : '<h3>Ingen mål under 60 %</h3><p>Bra! Ta en ny prøve på middels og høyt nivå, eller les «Kvelden før»-arket.</p>';
      const lenke = main.querySelector('[data-a="ovsvake"]');
      lenke.href = svake.length ? '#/ov?mal=' + svake.join(',') : '#/ov';
      lenke.lastChild.textContent = svake.length ? 'Øv på de svake målene' : 'Smart øving';
    }

    oppdaterTopp();
    main.querySelector('[data-a="ny"]').addEventListener('click', (e) => {
      e.preventDefault();
      oppsett(main, settRydd);
      window.scrollTo(0, 0);
    });

    const rev = main.querySelector('[data-review]');
    R.rader.forEach(({ q, res, p }, i) => {
      const d = document.createElement('details');
      const klasse = (r) => (r.venter ? 'part' : r.riktig ? 'ok' : r.andel > 0 ? 'part' : 'bad');
      const ikon = (r) => (r.venter ? 'pencil' : r.riktig ? 'check' : r.andel > 0 ? 'alert' : 'x');
      const sum = (r) =>
        '<summary><span class="q-status">' + KJ.icon(ikon(r), 16) + '</span><span class="t"><span class="mono muted">' + (i + 1) + '.</span> ' + KJ.fmt(KJ.oppgaveTittel(q)) + '</span><span class="p">' + fmtP(r.andel * p) + '/' + p + ' p</span></summary>';
      d.className = klasse(res);
      d.innerHTML = sum(res) + '<div></div>';
      let laget = false;
      d.addEventListener('toggle', () => {
        if (!d.open || laget) return;
        laget = true;
        const k = new KJ.Oppgavekort(q, {
          modus: 'gjennomgang',
          nummer: i + 1,
          totalt: P.ids.length,
          visTema: true,
          selvvurdering: q.type === 'forklaring',
          onResultat: (r2, kortet) => {
            P.selv[q.id] = kortet.kryss.slice();
            if (!registrert.has(q.id)) {
              KJ.store.registrer(q.id, r2.riktig, true);
              registrert.add(q.id);
            }
            const ny = KJ.rett(q, { kryss: P.selv[q.id] });
            d.className = klasse(ny);
            d.querySelector('summary').outerHTML = sum(ny);
            oppdaterTopp();
          },
        });
        k.settSvar(P.svar[q.id]);
        k.las();
        k.visRettet(res.venter ? { riktig: false, andel: 0 } : res);
        if (q.type === 'forklaring' && !KJ.harSvar(q, P.svar[q.id])) k.tilbakemelding('info', 'Du svarte ikke på denne. Les modellsvaret og vurder hva du ville fått med.');
        d.lastElementChild.appendChild(k.el);
      });
      rev.appendChild(d);
    });
  }

  function fmtP(x) {
    return KJ.tall(Math.round(x * 10) / 10);
  }
})(window.KJ);
