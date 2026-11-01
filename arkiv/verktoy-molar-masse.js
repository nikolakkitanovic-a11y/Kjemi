/*
 * ARKIV – lastes ikke av index.html.
 * Molar masse-kalkulatoren og balanseringssjekken slik de lå under Verktøy før siden
 * ble organisert etter læringsmålene. Molar masse er ikke med i læringsmålene for prøven.
 * Balanseringssjekken ligger fortsatt på siden under Verktøy → Balansering.
 * For å ta kalkulatoren i bruk igjen: lim inn funksjonen i js/views/tools.js og legg til en fane.
 */
  /* ---------- Kalkulator ---------- */
  function kalkulator(el, params) {
    const eksempler = ['H2O', 'NaCl', 'CO2', 'CaCO3', 'H2SO4', 'Ca(OH)2', 'Al2(SO4)3', 'C6H12O6', 'CuSO4*5H2O'];
    el.innerHTML =
      '<div class="calc">' +
      '<div class="panel"><h2 style="font-size:1.3rem;margin-bottom:6px">Molar masse</h2><p class="muted" style="font-size:.92rem">Skriv en formel. Tall blir indekser, parenteser og krystallvann (med * eller ·) fungerer.</p>' +
      '<div class="calc-in"><label class="fld"><span class="fld-l">Formel</span><input class="inp" data-f autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="f.eks. Al2(SO4)3"></label></div>' +
      '<div class="calc-quick">' + eksempler.map((f) => '<button type="button" class="btn btn-ghost btn-small" data-ex="' + f + '">' + KJ.ce(f) + '</button>').join('') + '</div>' +
      '<div class="calc-res" data-res aria-live="polite"></div></div>' +

      '<div class="panel"><h2 style="font-size:1.3rem;margin-bottom:6px">Sjekk balansering</h2><p class="muted" style="font-size:.92rem">Skriv likningen med pil (->). Bruk mellomrom rundt +.</p>' +
      '<label class="fld fld-wide"><span class="fld-l">Likning</span><input class="inp mono" data-likn autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="2H2 + O2 -> 2H2O"></label>' +
      '<div data-bal aria-live="polite" style="margin-top:12px"></div></div>' +
      '</div>';

    const fIn = el.querySelector('[data-f]');
    const res = el.querySelector('[data-res]');

    function regn() {
      const f = fIn.value.trim();
      if (!f) {
        res.innerHTML = '';
        return;
      }
      let p;
      try {
        p = C.parse(f);
      } catch (e) {
        res.innerHTML = '<p class="muted">' + esc(e.kjemi ? e.message : 'Ugyldig formel') + '</p>';
        return;
      }
      const M = C.M(p);
      const rader = Object.keys(p.antall).map((sym) => {
        const e = KJ.grunnstoffMap[sym];
        const bidrag = e.M * p.antall[sym];
        return '<tr><th scope="row">' + sym + ' <span class="muted">' + esc(e.navn) + '</span></th><td>' + p.antall[sym] + '</td><td>' + massetekst(e) + '</td><td>' + KJ.tall(bidrag, 3) + '</td><td>' + KJ.tall((100 * bidrag) / M, 1) + ' %</td></tr>';
      });
      res.innerHTML =
        '<div style="font-size:1.4rem">' + KJ.ce(p.ce) + '</div>' +
        '<div class="calc-big">' + KJ.tex('M = ' + KJ.tall(M, 2).replace(',', '{,}') + '\\enhet{g/mol}') + '</div>' +
        '<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Grunnstoff</th><th scope="col">Antall</th><th scope="col">Atommasse</th><th scope="col">Bidrag (g/mol)</th><th scope="col">Masse-%</th></tr></thead><tbody>' + rader.join('') + '</tbody></table></div>' +
        '<p class="muted" style="font-size:.86rem">Utregning: ' + KJ.tex(Object.keys(p.antall).map((s) => (p.antall[s] > 1 ? p.antall[s] + '\\cdot ' : '') + massetekst(KJ.grunnstoffMap[s]).replace(',', '{,}')).join(' + ') + ' = ' + KJ.tall(M, 2).replace(',', '{,}')) + '</p>';
      KJ.settUrl('/verktoy/kalkulator?f=' + encodeURIComponent(f));
    }

    fIn.addEventListener('input', regn);
    el.querySelector('.calc-quick').addEventListener('click', (e) => {
      const b = e.target.closest('[data-ex]');
      if (!b) return;
      fIn.value = b.dataset.ex;
      regn();
    });

    const lIn = el.querySelector('[data-likn]');
    const bal = el.querySelector('[data-bal]');
    lIn.addEventListener('input', () => {
      const s = lIn.value.trim();
      if (!s) return (bal.innerHTML = '');
      try {
        const l = C.parseLikning(s);
        const b = C.balanse(l.venstre, l.hoyre);
        const koef = l.venstre.concat(l.hoyre).map((x) => x.koef);
        const g = koef.reduce((a, x) => C.gcd(a, x));
        let dom;
        if (b.balansert && g === 1) dom = '<div class="fb-ok"><div class="fb-inner">' + KJ.icon('check', 18) + '<p class="fb-main">Likningen er balansert.</p></div></div>';
        else if (b.balansert) dom = '<div class="fb-info"><div class="fb-inner">' + KJ.icon('info', 18) + '<p class="fb-main">Balansert, men koeffisientene kan deles på ' + g + '.</p></div></div>';
        else dom = '<div class="fb-bad"><div class="fb-inner">' + KJ.icon('x', 18) + '<p class="fb-main">Ikke balansert ennå.</p></div></div>';
        const vis = (side) => side.map((x) => (x.koef > 1 ? x.koef : '') + x.p.ce).join(' + ');
        bal.innerHTML = '<p style="font-size:1.1rem">' + KJ.ce(vis(l.venstre) + ' -> ' + vis(l.hoyre)) + '</p>' + dom + '<div style="margin-top:10px">' + KJ.atomTabell(b) + '</div>';
      } catch (e) {
        bal.innerHTML = '<p class="muted">' + esc(e.kjemi ? e.message : 'Klarte ikke å lese likningen.') + '</p>';
      }
    });

    const start = params.get('f');
    if (start) {
      fIn.value = start;
      regn();
    }
    return null;
  }
