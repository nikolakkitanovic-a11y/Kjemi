/*
 * Oppgavekort: viser én oppgave av hvilken som helst type, med hint, retting,
 * fasit og løsningsforslag. Brukes i øving, feilbank og prøvemodus.
 *
 * modus: 'ovelse' (standard) · 'prove' (ingen retting underveis) · 'gjennomgang' (låst, viser fasit)
 */
(function (KJ) {
  'use strict';
  const C = KJ.kjemi;
  const esc = KJ.esc;
  const fmt = KJ.fmt;

  KJ.atomTabell = function (b) {
    return (
      '<table class="atomtab"><thead><tr><th scope="col">Atom</th><th scope="col">Venstre</th><th scope="col">Høyre</th></tr></thead><tbody>' +
      b.rader
        .map((r) => '<tr class="' + (r.v === r.h ? 'ok' : 'bad') + '"><th scope="row">' + r.el + '</th><td>' + r.v + '</td><td>' + r.h + '</td></tr>')
        .join('') +
      (b.ladning.v || b.ladning.h
        ? '<tr class="' + (b.ladningOk ? 'ok' : 'bad') + '"><th scope="row">Ladning</th><td>' + b.ladning.v + '</td><td>' + b.ladning.h + '</td></tr>'
        : '') +
      '</tbody></table>'
    );
  };

  function nivaHtml(n) {
    const niva = KJ.NIVA[n];
    return (
      '<span class="lvl lvl-' + n + '" title="' + niva.navn + '"><span class="lvl-dots" aria-hidden="true">' +
      [1, 2, 3].map((i) => '<i class="' + (i <= n ? 'on' : '') + '"></i>').join('') +
      '</span>' + niva.navn + '</span>'
    );
  }
  KJ.nivaHtml = nivaHtml;

  /** Kort tekst (uten HTML) for lister og forhåndsvisning. */
  KJ.oppgaveTittel = function (q) {
    if (q.sporsmal && q.type !== 'balanser') return q.sporsmal;
    if (q.type === 'navn') return 'Skriv navnet på {{' + q.formel + '}}';
    if (q.type === 'formel') return 'Skriv formelen for ' + q.navn;
    if (q.type === 'balanser') return 'Balanser {{' + q.reaktanter.join(' + ') + ' -> ' + q.produkter.join(' + ') + '}}';
    if (q.type === 'konfig') return q.sporsmal || 'Elektronkonfigurasjon for ' + q.grunnstoff;
    return q.sporsmal;
  };

  function standardSporsmal(q) {
    if (q.sporsmal) return q.sporsmal;
    if (q.type === 'navn') return 'Hva heter forbindelsen {{' + q.formel + '}}?';
    if (q.type === 'formel') return 'Skriv den kjemiske formelen for **' + q.navn + '**.';
    if (q.type === 'balanser') return 'Balanser reaksjonslikningen. Skriv koeffisientene i feltene (tomt felt betyr 1).';
    if (q.type === 'konfig') {
      const e = KJ.grunnstoffMap[q.grunnstoff];
      const ion = q.ladning ? '{{' + q.grunnstoff + '^' + (Math.abs(q.ladning) > 1 ? Math.abs(q.ladning) : '') + (q.ladning > 0 ? '+' : '-') + '}}' : e.navn + ' ({{' + q.grunnstoff + '}})';
      const not = q.notasjon === 'full' ? ' Bruk full notasjon.' : q.notasjon === 'edelgass' ? ' Bruk edelgassnotasjon.' : '';
      return 'Skriv elektronkonfigurasjonen til ' + ion + ' i grunntilstanden.' + not;
    }
    return '';
  }

  class Oppgavekort {
    constructor(q, opts) {
      this.q = q;
      this.o = Object.assign({ modus: 'ovelse' }, opts || {});
      this.forsok = 0;
      this.hintNr = 0;
      this.losningVist = false;
      this.ferdig = false;
      this.id = KJ.uid('q');
      this.el = document.createElement('article');
      this.el.className = 'qcard q-' + q.type + ' modus-' + this.o.modus;
      this.el.setAttribute('aria-labelledby', this.id + '-p');
      this.forbered();
      this.render();
    }

    forbered() {
      const q = this.q;
      if (q.type === 'flervalg') this.rek = q.stokk === false ? q.alternativer.map((_, i) => i) : KJ.shuffle(q.alternativer.map((_, i) => i));
      if (q.type === 'kobling') this.hoyreRek = KJ.shuffleUlik(q.par.map((_, i) => i));
      if (q.type === 'rekkefolge') this.orden = KJ.shuffleUlik(q.elementer.map((_, i) => i));
      if (q.type === 'sortering') this.itemRek = KJ.shuffle(q.elementer.map((_, i) => i));
      if (q.type === 'tall') this.vit = q.vitenskapelig != null ? q.vitenskapelig : Math.abs(q.svar) >= 1e5 || (Math.abs(q.svar) < 1e-3 && q.svar !== 0);
    }

    render() {
      const q = this.q;
      const m = this.o.modus;
      const hint = [].concat(q.hint || []);
      this.hint = hint;
      const nr = this.o.nummer ? '<span class="q-nr">Oppgave ' + this.o.nummer + (this.o.totalt ? ' av ' + this.o.totalt : '') + '</span>' : '';
      const tema = this.o.visTema && KJ.temaMap[q.tema] ? '<span class="q-tema" style="--tc:' + KJ.temaMap[q.tema].farge + '">' + esc(KJ.temaMap[q.tema].tittel) + '</span>' : '';
      this.el.innerHTML =
        '<header class="q-head">' + nr + nivaHtml(q.niva) + '<span class="q-type">' + KJ.TYPENAVN[q.type] + '</span>' + tema +
        '<span class="q-status" aria-hidden="true"></span></header>' +
        '<div class="q-prompt" id="' + this.id + '-p">' + KJ.fmtBlock(standardSporsmal(q)) + '</div>' +
        '<div class="q-body">' + this.kropp() + '</div>' +
        (m === 'ovelse'
          ? '<div class="q-actions">' +
            '<button type="button" class="btn btn-primary" data-a="sjekk">' + KJ.icon('check', 18) + (q.type === 'forklaring' ? 'Sammenlign med modellsvar' : 'Sjekk svar') + '</button>' +
            (hint.length ? '<button type="button" class="btn btn-ghost" data-a="hint">' + KJ.icon('bulb', 18) + 'Hint</button>' : '') +
            '<button type="button" class="btn btn-quiet" data-a="losning" hidden>' + KJ.icon('eye', 18) + 'Vis løsning</button>' +
            '</div>'
          : '') +
        '<div class="q-fb" role="status" aria-live="polite"></div>' +
        '<div class="q-hints" hidden></div>' +
        '<section class="q-sol" hidden aria-label="Løsning"></section>';
      this.koble();
      if (m === 'gjennomgang') this.las();
    }

    /* ---------- Typekropp ---------- */
    kropp() {
      const q = this.q;
      const n = this.id;
      switch (q.type) {
        case 'flervalg': {
          const multi = Array.isArray(q.svar);
          return (
            (multi ? '<p class="q-note">Velg alle som stemmer.</p>' : '') +
            '<fieldset class="opts"><legend class="sr-only">Alternativer</legend>' +
            this.rek
              .map(
                (i, k) =>
                  '<label class="opt" data-i="' + i + '"><input type="' + (multi ? 'checkbox' : 'radio') + '" name="' + n + '" value="' + i + '">' +
                  '<span class="opt-key" aria-hidden="true">' + String.fromCharCode(65 + k) + '</span><span class="opt-text">' + fmt(q.alternativer[i]) + '</span>' +
                  '<span class="opt-mark" aria-hidden="true"></span></label>'
              )
              .join('') +
            '</fieldset>'
          );
        }
        case 'fyllinn': {
          let k = 0;
          const felt = () => {
            const i = k++;
            const lengste = [].concat(q.svar[i]).reduce((a, s) => Math.max(a, String(s).length), 3);
            return '<input class="inp blank" data-i="' + i + '" aria-label="Felt ' + (i + 1) + '" autocomplete="off" autocapitalize="off" spellcheck="false" style="--w:' + Math.min(18, lengste + 3) + 'ch">';
          };
          const tekst = q.tekst || q.svar.map((_, i) => (q.etiketter ? q.etiketter[i] + ': ' : '') + '___').join('\n');
          const html = tekst
            .split('\n')
            .map((linje) => {
              const deler = linje.split('___');
              return '<p>' + deler.map((d, i) => fmt(d) + (i < deler.length - 1 ? felt() : '')).join('') + '</p>';
            })
            .join('');
          return '<div class="fill">' + html + '</div>';
        }
        case 'tall':
          return (
            '<div class="num-row">' +
            '<label class="fld"><span class="fld-l">Svar</span><input class="inp num" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="' + (this.vit ? 'f.eks. 6,02' : 'f.eks. 0,250') + '"></label>' +
            (this.vit ? '<span class="x10" aria-hidden="true">· 10</span><label class="fld fld-exp"><span class="fld-l">Eksponent</span><input class="inp exp" type="number" step="1" autocomplete="off"></label>' : '') +
            (q.enhet ? '<label class="fld fld-unit"><span class="fld-l">Enhet</span><input class="inp unit" list="enheter" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="enhet"></label>' : '') +
            '</div>'
          );
        case 'balanser': {
          const side = (arr, off) =>
            arr
              .map(
                (f, i) =>
                  '<span class="eq-term"><input class="inp koef" data-i="' + (off + i) + '" inputmode="numeric" pattern="[0-9]*" maxlength="2" autocomplete="off" aria-label="Koeffisient foran ' + esc(f) + '">' +
                  '<span class="eq-sp">' + KJ.ce(f) + '</span></span>'
              )
              .join('<span class="eq-plus">+</span>');
          return (
            '<div class="eq">' + side(q.reaktanter, 0) + '<span class="eq-arrow" aria-label="gir">' + KJ.tex('\\longrightarrow') + '</span>' + side(q.produkter, q.reaktanter.length) + '</div>' +
            '<div class="eq-tools"><button type="button" class="btn btn-small btn-ghost" data-a="tell" aria-expanded="false">' + KJ.icon('scale', 16) + 'Tell atomer</button></div>' +
            '<div class="eq-count" hidden></div>'
          );
        }
        case 'navn':
          return (
            '<div class="big-formula">' + KJ.ce(q.formel) + '</div>' +
            '<label class="fld fld-wide"><span class="fld-l">Navn</span><input class="inp txt" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Skriv navnet"></label>'
          );
        case 'formel':
          return (
            '<label class="fld fld-wide"><span class="fld-l">Formel</span><input class="inp txt mono" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="f.eks. Al2(SO4)3"></label>' +
            '<p class="preview" aria-live="polite"><span class="muted">Forhåndsvisning:</span> <span class="pv"></span></p>' +
            '<p class="q-note">Tall blir automatisk senket. Ladning skrives med ^, f.eks. SO4^2-. Krystallvann: CuSO4*5H2O.</p>'
          );
        case 'konfig':
          return (
            '<label class="fld fld-wide"><span class="fld-l">Konfigurasjon</span><input class="inp txt mono" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="f.eks. 1s2 2s2 2p6 3s1 eller [Ne] 3s1"></label>' +
            '<p class="preview" aria-live="polite"><span class="muted">Forhåndsvisning:</span> <span class="pv"></span></p>'
          );
        case 'kobling': {
          const opts = '<option value="">Velg …</option>' + this.hoyreRek.map((i) => '<option value="' + i + '">' + esc(stripFmt(q.par[i][1])) + '</option>').join('');
          return (
            '<div class="match">' +
            q.par
              .map(
                (p, i) =>
                  '<div class="match-row" data-i="' + i + '"><div class="match-l">' + fmt(p[0]) + '</div>' +
                  '<span class="match-arrow" aria-hidden="true">' + KJ.icon('arrow', 16) + '</span>' +
                  '<select class="inp sel" data-i="' + i + '" aria-label="Velg det som hører til ' + esc(stripFmt(p[0])) + '">' + opts + '</select></div>'
              )
              .join('') +
            '</div>'
          );
        }
        case 'rekkefolge':
          return '<div class="order-wrap">' + (q.fra ? '<p class="order-end">' + KJ.icon('up', 14) + esc(q.fra) + '</p>' : '') + '<ol class="order"></ol>' + (q.til ? '<p class="order-end">' + KJ.icon('down', 14) + esc(q.til) + '</p>' : '') + '</div>';
        case 'sortering':
          return (
            '<div class="sort">' +
            this.itemRek
              .map(
                (i) =>
                  '<div class="sort-row" data-i="' + i + '"><div class="sort-item">' + fmt(q.elementer[i][0]) + '</div><div class="seg seg-sm" role="radiogroup" aria-label="Kategori for ' + esc(stripFmt(q.elementer[i][0])) + '">' +
                  q.kategorier
                    .map((k, ki) => '<label class="seg-opt"><input type="radio" name="' + this.id + '-s' + i + '" value="' + ki + '"><span>' + fmt(k) + '</span></label>')
                    .join('') +
                  '</div></div>'
              )
              .join('') +
            '</div>'
          );
        case 'forklaring':
          return (
            '<label class="fld fld-wide"><span class="fld-l">Ditt svar</span><textarea class="inp area" rows="6" placeholder="Skriv forklaringen din med egne ord. Bruk fagbegreper."></textarea></label>' +
            '<p class="q-note"><span class="cnt">0</span> ord</p>' +
            '<div class="selfcheck" hidden></div>'
          );
        default:
          return '';
      }
    }

    tegnRekkefolge() {
      const ol = this.el.querySelector('.order');
      if (!ol) return;
      const q = this.q;
      const last = this.last;
      ol.innerHTML = this.orden
        .map(
          (i, pos) =>
            '<li class="order-item" data-i="' + i + '"><span class="order-pos">' + (pos + 1) + '</span><span class="order-text">' + fmt(q.elementer[i]) + '</span>' +
            '<span class="order-btns"><button type="button" class="ibtn" data-mv="-1" data-pos="' + pos + '" aria-label="Flytt opp"' + (pos === 0 || last ? ' disabled' : '') + '>' + KJ.icon('up', 18) + '</button>' +
            '<button type="button" class="ibtn" data-mv="1" data-pos="' + pos + '" aria-label="Flytt ned"' + (pos === this.orden.length - 1 || last ? ' disabled' : '') + '>' + KJ.icon('down', 18) + '</button></span></li>'
        )
        .join('');
    }

    koble() {
      const el = this.el;
      const q = this.q;
      if (q.type === 'rekkefolge') this.tegnRekkefolge();
      el.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b || !el.contains(b)) return;
        const a = b.dataset.a;
        if (a === 'sjekk') this.sjekk();
        else if (a === 'hint') this.visHint();
        else if (a === 'losning') this.visLosning();
        else if (a === 'tell') this.tell(b);
        else if (a === 'vurder') this.vurder();
        else if (b.dataset.mv) {
          const pos = +b.dataset.pos;
          const ny = pos + +b.dataset.mv;
          if (ny < 0 || ny >= this.orden.length) return;
          [this.orden[pos], this.orden[ny]] = [this.orden[ny], this.orden[pos]];
          this.rort = true;
          this.tegnRekkefolge();
          const knapp = this.el.querySelector('[data-pos="' + ny + '"][data-mv="' + b.dataset.mv + '"]') || this.el.querySelector('[data-pos="' + ny + '"]');
          if (knapp) knapp.focus();
          this.endret();
        }
      });
      el.addEventListener('input', (e) => {
        if (q.type === 'formel' || q.type === 'konfig') this.forhandsvis();
        if (q.type === 'balanser' && !this.el.querySelector('.eq-count').hidden) this.tell();
        if (q.type === 'forklaring') {
          const t = el.querySelector('.area').value.trim();
          el.querySelector('.cnt').textContent = t ? t.split(/\s+/).length : 0;
        }
        if (e.target.classList.contains('inp')) e.target.classList.remove('is-wrong', 'is-right');
        this.endret();
      });
      el.addEventListener('change', (e) => {
        if (e.target.matches('input[type=radio], input[type=checkbox], select')) {
          const opt = e.target.closest('.opt');
          if (opt) el.querySelectorAll('.opt').forEach((o) => o.classList.remove('is-wrong', 'is-right'));
          this.endret();
        }
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && this.o.modus === 'ovelse' && e.target.matches('input.inp') && !e.target.matches('[type=radio],[type=checkbox]')) {
          e.preventDefault();
          this.sjekk();
        }
      });
    }

    endret() {
      if (this.o.onEndring) this.o.onEndring(this);
    }

    /** Har eleven svart noe? (Rangering teller først når noe er flyttet.) */
    besvart() {
      if (this.q.type === 'rekkefolge') return !!this.rort;
      return KJ.harSvar(this.q, this.hentSvar());
    }

    forhandsvis() {
      const inn = this.el.querySelector('.txt').value;
      const pv = this.el.querySelector('.pv');
      if (!inn.trim()) {
        pv.innerHTML = '';
        return;
      }
      try {
        if (this.q.type === 'formel') pv.innerHTML = KJ.ce(C.parse(inn).ce);
        else pv.innerHTML = KJ.tex(C.konfigTex(C.parseKonfig(inn), /^\s*\[/.test(inn)));
      } catch (err) {
        pv.innerHTML = '<span class="muted">' + esc(err.kjemi ? err.message : 'Ugyldig') + '</span>';
      }
    }

    tell(knapp) {
      const box = this.el.querySelector('.eq-count');
      if (knapp) {
        const vis = box.hidden;
        box.hidden = !vis;
        knapp.setAttribute('aria-expanded', String(vis));
        if (!vis) return;
      }
      const svar = this.hentSvar();
      const koef = svar.map((s) => (String(s || '').trim() === '' ? 1 : parseInt(s, 10) || 0));
      const q = this.q;
      const b = C.balanse(
        q.reaktanter.map((f, i) => ({ koef: koef[i], formel: f })),
        q.produkter.map((f, i) => ({ koef: koef[q.reaktanter.length + i], formel: f }))
      );
      box.innerHTML = KJ.atomTabell(b);
    }

    /* ---------- Svar inn/ut ---------- */
    hentSvar() {
      const q = this.q;
      const el = this.el;
      switch (q.type) {
        case 'flervalg': {
          const valgt = [...el.querySelectorAll('.opts input:checked')].map((i) => +i.value);
          return Array.isArray(q.svar) ? valgt : valgt.length ? valgt[0] : null;
        }
        case 'fyllinn':
          return [...el.querySelectorAll('.blank')].map((i) => i.value);
        case 'tall':
          return {
            verdi: el.querySelector('.num').value,
            eksp: el.querySelector('.exp') ? el.querySelector('.exp').value : null,
            enhet: el.querySelector('.unit') ? el.querySelector('.unit').value : '',
          };
        case 'balanser':
          return [...el.querySelectorAll('.koef')].map((i) => i.value);
        case 'navn':
        case 'formel':
        case 'konfig':
          return el.querySelector('.txt').value;
        case 'kobling':
          return [...el.querySelectorAll('.sel')].map((s) => (s.value === '' ? null : +s.value));
        case 'rekkefolge':
          return this.orden.slice();
        case 'sortering':
          return q.elementer.map((_, i) => {
            const r = el.querySelector('input[name="' + this.id + '-s' + i + '"]:checked');
            return r ? +r.value : null;
          });
        case 'forklaring':
          return { tekst: el.querySelector('.area').value, kryss: this.kryss ? this.kryss.slice() : null };
      }
      return null;
    }

    settSvar(svar) {
      if (svar == null) return;
      const q = this.q;
      const el = this.el;
      switch (q.type) {
        case 'flervalg':
          [].concat(svar).forEach((v) => {
            const i = el.querySelector('.opts input[value="' + v + '"]');
            if (i) i.checked = true;
          });
          break;
        case 'fyllinn':
          el.querySelectorAll('.blank').forEach((inp, i) => (inp.value = svar[i] || ''));
          break;
        case 'tall':
          el.querySelector('.num').value = svar.verdi || '';
          if (el.querySelector('.exp')) el.querySelector('.exp').value = svar.eksp || '';
          if (el.querySelector('.unit')) el.querySelector('.unit').value = svar.enhet || '';
          break;
        case 'balanser':
          el.querySelectorAll('.koef').forEach((inp, i) => (inp.value = svar[i] || ''));
          break;
        case 'navn':
        case 'formel':
        case 'konfig':
          el.querySelector('.txt').value = svar;
          if (q.type !== 'navn') this.forhandsvis();
          break;
        case 'kobling':
          el.querySelectorAll('.sel').forEach((s, i) => (s.value = svar[i] == null ? '' : String(svar[i])));
          break;
        case 'rekkefolge':
          if (Array.isArray(svar) && svar.length === this.orden.length) {
            this.orden = svar.slice();
            this.rort = true;
          }
          this.tegnRekkefolge();
          break;
        case 'sortering':
          svar.forEach((v, i) => {
            if (v == null) return;
            const r = el.querySelector('input[name="' + this.id + '-s' + i + '"][value="' + v + '"]');
            if (r) r.checked = true;
          });
          break;
        case 'forklaring':
          el.querySelector('.area').value = svar.tekst || '';
          if (svar.kryss) this.kryss = svar.kryss.slice();
          break;
      }
    }

    /* ---------- Øving ---------- */
    sjekk() {
      const q = this.q;
      if (q.type === 'forklaring') return this.visSelvvurdering();
      const svar = this.hentSvar();
      const res = KJ.rett(q, svar);
      if (res.tomt) {
        this.tilbakemelding('info', res.melding);
        return;
      }
      this.forsok++;
      this.merk(res, false);
      let tillegg = '';
      if (this.o.modus === 'ovelse') {
        if (this.losningVist && res.riktig) {
          tillegg = 'Du så løsningen først, så oppgaven telles ikke som mestret ennå.';
        } else {
          const r = KJ.store.registrer(q.id, res.riktig, this.forsok === 1);
          if (r.fjernetFraFeilbank) tillegg = 'Oppgaven er fjernet fra feilbanken.';
          if (!res.riktig && this.forsok === 1) tillegg = 'Oppgaven er lagt i feilbanken.';
        }
      }
      this.tilbakemelding(res.riktig ? 'ok' : 'bad', res.melding, [res.merknad, tillegg].filter(Boolean).join(' '));
      this.settStatus(res.riktig ? 'ok' : 'bad');
      const lb = this.el.querySelector('[data-a="losning"]');
      if (lb) {
        lb.hidden = false;
        lb.innerHTML = KJ.icon('eye', 18) + (res.riktig ? 'Se løsningsforslag' : 'Vis løsning');
      }
      if (res.riktig) this.ferdig = true;
      if (this.o.onResultat) this.o.onResultat(res, this);
    }

    settStatus(s) {
      const st = this.el.querySelector('.q-status');
      this.el.classList.remove('st-ok', 'st-bad');
      if (!s) return (st.innerHTML = '');
      this.el.classList.add('st-' + s);
      st.innerHTML = KJ.icon(s === 'ok' ? 'check' : 'x', 18);
    }

    tilbakemelding(kind, melding, merknad) {
      const fb = this.el.querySelector('.q-fb');
      fb.className = 'q-fb fb-' + kind;
      const ikon = { ok: 'check', bad: 'x', info: 'info' }[kind] || 'info';
      fb.innerHTML =
        '<div class="fb-inner">' + KJ.icon(ikon, 18) + '<div><p class="fb-main">' + melding + '</p>' + (merknad ? '<p class="fb-note">' + merknad + '</p>' : '') + '</div></div>';
      if (!KJ.reducedMotion()) {
        fb.classList.remove('pop');
        void fb.offsetWidth;
        fb.classList.add('pop');
      }
    }

    /** Markerer delsvar som riktige/feil. visFasit = true markerer også riktige alternativer. */
    merk(res, visFasit) {
      const q = this.q;
      const el = this.el;
      if (q.type === 'flervalg') {
        const fasit = [].concat(q.svar);
        el.querySelectorAll('.opt').forEach((o) => {
          const i = +o.dataset.i;
          const valgt = o.querySelector('input').checked;
          o.classList.remove('is-right', 'is-wrong', 'is-missed');
          if (valgt && fasit.includes(i)) o.classList.add('is-right');
          else if (valgt) o.classList.add('is-wrong');
          else if (visFasit && fasit.includes(i)) o.classList.add('is-missed');
        });
      } else if (res && res.deler) {
        const sel = { fyllinn: '.blank', kobling: '.match-row', rekkefolge: '.order-item', sortering: '.sort-row' }[q.type];
        if (!sel) return;
        const noder = [...el.querySelectorAll(sel)];
        noder.forEach((n) => {
          const i = q.type === 'sortering' ? +n.dataset.i : noder.indexOf(n);
          n.classList.remove('is-right', 'is-wrong');
          n.classList.add(res.deler[i] ? 'is-right' : 'is-wrong');
        });
      } else if (res && (q.type !== 'balanser' || res.riktig)) {
        el.querySelectorAll('.q-body .inp:not(.area)').forEach((i) => {
          i.classList.remove('is-right', 'is-wrong');
          i.classList.add(res.riktig ? 'is-right' : 'is-wrong');
        });
      }
    }

    visHint() {
      const box = this.el.querySelector('.q-hints');
      if (this.hintNr >= this.hint.length) return;
      this.hintNr++;
      box.hidden = false;
      box.innerHTML = this.hint
        .slice(0, this.hintNr)
        .map((h, i) => '<div class="hint">' + KJ.icon('bulb', 18) + '<div><p class="hint-l">Hint' + (this.hint.length > 1 ? ' ' + (i + 1) + ' av ' + this.hint.length : '') + '</p>' + KJ.fmtBlock(h) + '</div></div>')
        .join('');
      const hb = this.el.querySelector('[data-a="hint"]');
      if (hb) {
        if (this.hintNr >= this.hint.length) hb.disabled = true;
        else hb.innerHTML = KJ.icon('bulb', 18) + 'Neste hint';
      }
      const lb = this.el.querySelector('[data-a="losning"]');
      if (lb) lb.hidden = false;
    }

    losningHtml() {
      const q = this.q;
      let h = '<h3 class="sol-h">Fasit</h3><div class="sol-fasit">' + KJ.fasit(q) + '</div>';
      if (q.steg && q.steg.length) h += '<h3 class="sol-h">Løsningsforslag steg for steg</h3><ol class="steps">' + q.steg.map((s) => '<li>' + KJ.fmtBlock(s) + '</li>').join('') + '</ol>';
      if (q.forklaring) h += '<h3 class="sol-h">Forklaring</h3>' + KJ.fmtBlock(q.forklaring);
      return h;
    }

    visLosning() {
      const sol = this.el.querySelector('.q-sol');
      if (!this.losningVist) {
        this.losningVist = true;
        if (this.q.type === 'forklaring') this.visSelvvurdering();
        sol.innerHTML = this.losningHtml();
        sol.hidden = false;
        if (this.q.type === 'flervalg') this.merk(null, true);
      }
      sol.hidden = false;
      const lb = this.el.querySelector('[data-a="losning"]');
      if (lb) lb.hidden = true;
      sol.setAttribute('tabindex', '-1');
      sol.focus({ preventScroll: true });
      if (!KJ.reducedMotion()) sol.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /* ---------- Forklaringsoppgaver ---------- */
    visSelvvurdering(lest) {
      const q = this.q;
      const box = this.el.querySelector('.selfcheck');
      if (!box) return;
      if (!this.kryss) this.kryss = q.punkter.map(() => false);
      box.hidden = false;
      box.innerHTML =
        '<div class="model"><h3 class="sol-h">Modellsvar</h3>' + KJ.fmtBlock(q.modellsvar) + '</div>' +
        '<fieldset class="checklist"><legend>Kryss av for hovedpunktene du fikk med i ditt svar</legend>' +
        q.punkter
          .map((p, i) => '<label class="chk"><input type="checkbox" data-k="' + i + '"' + (this.kryss[i] ? ' checked' : '') + (lest ? ' disabled' : '') + '><span>' + fmt(p) + '</span></label>')
          .join('') +
        '</fieldset>' +
        (lest || this.o.modus === 'gjennomgang' && !this.o.selvvurdering ? '' : '<button type="button" class="btn btn-primary" data-a="vurder">' + KJ.icon('check', 18) + 'Lagre vurdering</button>');
      box.querySelectorAll('[data-k]').forEach((c) =>
        c.addEventListener('change', () => {
          this.kryss[+c.dataset.k] = c.checked;
          if (this.o.onEndring) this.o.onEndring(this);
          if (this.o.onKryss) this.o.onKryss(this);
        })
      );
      const sb = this.el.querySelector('[data-a="sjekk"]');
      if (sb) sb.hidden = true;
      const lb = this.el.querySelector('[data-a="losning"]');
      if (lb) lb.hidden = true;
    }

    vurder() {
      const q = this.q;
      const res = KJ.rett(q, { kryss: this.kryss });
      this.forsok++;
      if (this.o.modus === 'ovelse') {
        const r = KJ.store.registrer(q.id, res.riktig, this.forsok === 1);
        let tillegg = '';
        if (r.fjernetFraFeilbank) tillegg = 'Oppgaven er fjernet fra feilbanken.';
        else if (!res.riktig) tillegg = 'Oppgaven er lagt i feilbanken, så du kan øve på den igjen.';
        this.tilbakemelding(res.riktig ? 'ok' : 'bad', res.melding, tillegg);
      } else {
        this.tilbakemelding(res.riktig ? 'ok' : 'bad', res.melding);
      }
      this.settStatus(res.riktig ? 'ok' : 'bad');
      if (this.o.onResultat) this.o.onResultat(res, this);
    }

    /* ---------- Låsing / gjennomgang ---------- */
    las() {
      this.last = true;
      this.el.querySelectorAll('.q-body input, .q-body select, .q-body textarea').forEach((i) => {
        if (i.closest('.checklist') && this.o.selvvurdering) return;
        i.disabled = true;
      });
      this.el.querySelectorAll('.q-body .ibtn').forEach((b) => (b.disabled = true));
    }

    /** Viser rettet svar med fasit (brukes i prøvegjennomgang). */
    visRettet(res) {
      this.merk(res, true);
      if (this.q.type === 'forklaring') {
        this.visSelvvurdering(!this.o.selvvurdering);
      } else {
        this.tilbakemelding(res.riktig ? 'ok' : 'bad', res.tomt ? 'Ikke besvart.' : res.melding, res.merknad);
        this.settStatus(res.riktig ? 'ok' : 'bad');
      }
      const sol = this.el.querySelector('.q-sol');
      sol.innerHTML = this.losningHtml();
      sol.hidden = false;
    }
  }

  function stripFmt(s) {
    return String(s)
      .replace(/\{\{([^}]+)\}\}/g, (m, x) => prettyFormel(x))
      .replace(/\$([^$]+)\$/g, '$1')
      .replace(/\*\*/g, '');
  }
  /** Unicode-versjon av en formel for steder der KaTeX ikke kan brukes (f.eks. <option>). */
  function prettyFormel(f) {
    const SUBS = '₀₁₂₃₄₅₆₇₈₉';
    const SUPS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    let s = f.trim().replace(/\^(\d*)([+-])/g, (m, d, t) => d.split('').map((c) => SUPS[+c]).join('') + (t === '+' ? '⁺' : '⁻'));
    s = s.replace(/([A-Za-z)\]])(\d+)/g, (m, a, d) => a + d.split('').map((c) => SUBS[+c]).join(''));
    s = s.replace(/([A-Za-z0-9₀-₉)])([+-])(?=$|\s)/g, (m, a, t) => a + (t === '+' ? '⁺' : '⁻'));
    return s.replace(/\*/g, '·').replace(/->/g, '→');
  }
  KJ.stripFmt = stripFmt;
  KJ.prettyFormel = prettyFormel;

  KJ.harSvar = function (q, svar) {
    if (svar == null) return false;
    switch (q.type) {
      case 'flervalg':
        return Array.isArray(svar) ? svar.length > 0 : svar != null;
      case 'fyllinn':
      case 'balanser':
        return svar.some((s) => String(s || '').trim());
      case 'tall':
        return !!String(svar.verdi || '').trim();
      case 'kobling':
      case 'sortering':
        return svar.some((s) => s != null);
      case 'rekkefolge':
        return true;
      case 'forklaring':
        return !!String(svar.tekst || '').trim();
      default:
        return !!String(svar || '').trim();
    }
  };

  KJ.Oppgavekort = Oppgavekort;
})(window.KJ);
