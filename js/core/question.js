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

  /** Merkelapp som viser hvilke læringsmål oppgaven øver på. */
  function malHtml(q) {
    return (q.mal || [])
      .map((nr) => {
        const m = KJ.malInfo(nr);
        return '<span class="q-mal" title="' + KJ.esc(m ? 'Læringsmål ' + nr + ': ' + m.tekst : 'Læringsmål ' + nr) + '">Mål ' + nr + '</span>';
      })
      .join('');
  }
  KJ.malHtml = malHtml;

  function feilbankTekst(r, riktig, forste) {
    if (r.fjernetFraFeilbank) return 'Oppgaven er fjernet fra feilbanken (' + KJ.RAD_KRAV + ' riktige på rad).';
    if (riktig && r.iFeilbank && forste) return 'Riktig ' + r.rad + ' av ' + KJ.RAD_KRAV + ' ganger på rad. Oppgaven blir i feilbanken til du har klart den ' + KJ.RAD_KRAV + ' ganger på rad.';
    if (!riktig && forste) return 'Oppgaven er lagt i feilbanken.';
    return '';
  }

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
    if (q.type === 'orbital') {
      const e = KJ.grunnstoffMap[q.grunnstoff];
      const ion = q.ladning ? '{{' + q.grunnstoff + '^' + (Math.abs(q.ladning) > 1 ? Math.abs(q.ladning) : '') + (q.ladning > 0 ? '+' : '-') + '}}' : e.navn + ' ({{' + q.grunnstoff + '}})';
      return 'Vis hvordan elektronene i ' + ion + ' fordeles i orbitalene i grunntilstanden.' + (q.konfig ? ' Skriv også elektronkonfigurasjonen, både fullt og med edelgasskjerne.' : '');
    }
    if (q.type === 'salt') return 'Sett sammen saltet **' + q.navn + '**. Velg hvor mange av hvert ion som trengs for at saltet skal bli elektrisk nøytralt, og skriv formelen.' + (q.visIoner ? '' : ' Du må selv finne ionene og ladningene.');
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
      this.o = Object.assign({ modus: 'ovelse' }, opts || {});
      if (q.type === 'gen') {
        this.spec = q;
        q = this.o.instans || KJ.generer(q);
      }
      this.q = q;
      this.forsok = 0;
      this.hintNr = 0;
      this.losningVist = false;
      this.ferdig = false;
      this.id = KJ.uid('q');
      this.el = document.createElement('article');
      this.el.className = 'qcard q-' + q.type + ' modus-' + this.o.modus;
      this.el.dataset.id = q.id;
      this.el.kort = this;
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
      if (q.type === 'salt') this.antall = { nk: 1, na: 1 };
      if (q.type === 'markering') {
        this.markorer = [];
        this.mType = q.typer[0];
      }
      if (q.type === 'orbital') {
        this.oppsett = KJ.orbitalOppsett(q);
        this.bokser = {};
        this.oppsett.rader.forEach((r) => (this.bokser[r.orb] = new Array(r.bokser).fill('')));
      }
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
        '<header class="q-head">' + nr + nivaHtml(q.niva) + malHtml(q) + '<span class="q-type">' + KJ.TYPENAVN[q.type] + '</span>' + (this.spec ? '<span class="q-gen">Tilfeldig</span>' : '') + tema +
        '<span class="q-status" aria-hidden="true"></span></header>' +
        '<div class="q-prompt" id="' + this.id + '-p">' + KJ.fmtBlock(standardSporsmal(q)) + '</div>' +
        '<div class="q-body">' + this.kropp() + '</div>' +
        (m === 'ovelse'
          ? '<div class="q-actions">' +
            '<button type="button" class="btn btn-primary" data-a="sjekk">' + KJ.icon('check', 18) + (q.type === 'forklaring' ? 'Sammenlign med modellsvar' : 'Sjekk svar') + '</button>' +
            (hint.length ? '<button type="button" class="btn btn-ghost" data-a="hint">' + KJ.icon('bulb', 18) + 'Hint</button>' : '') +
            '<button type="button" class="btn btn-quiet" data-a="losning" hidden>' + KJ.icon('eye', 18) + 'Vis løsning</button>' +
            (this.spec ? '<button type="button" class="btn btn-quiet" data-a="ny">' + KJ.icon('shuffle', 18) + 'Ny variant</button>' : '') +
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
                  '<button type="button" class="eq-sp" data-endre="' + esc(f) + '" title="Prøv å endre formelen">' + KJ.ce(f) + '</button></span>'
              )
              .join('<span class="eq-plus">+</span>');
          return (
            '<div class="eq">' + side(q.reaktanter, 0) + '<span class="eq-arrow" aria-label="gir">' + KJ.tex('\\longrightarrow') + '</span>' + side(q.produkter, q.reaktanter.length) + '</div>' +
            '<p class="q-note">Skriv koeffisientene i feltene. Tabellen teller atomene mens du skriver. Trykk på en formel hvis du vil prøve å endre den.</p>' +
            '<div class="eq-edit" hidden></div>' +
            '<div class="eq-count"></div>'
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
          return (
            '<div class="order-wrap">' + (q.fra ? '<p class="order-end">' + KJ.icon('up', 14) + esc(q.fra) + '</p>' : '') + '<ol class="order"></ol>' + (q.til ? '<p class="order-end">' + KJ.icon('down', 14) + esc(q.til) + '</p>' : '') + '</div>' +
            (q.begrunnelse
              ? '<fieldset class="opts begr"><legend class="fld-l" style="margin-bottom:6px">Hvilken begrunnelse er riktig?</legend>' +
                (this.begrRek || (this.begrRek = KJ.shuffle(q.begrunnelse.alternativer.map((_, i) => i))))
                  .map((i, k) => '<label class="opt" data-i="' + i + '"><input type="radio" name="' + n + '-b" value="' + i + '"><span class="opt-key" aria-hidden="true">' + String.fromCharCode(65 + k) + '</span><span class="opt-text">' + fmt(q.begrunnelse.alternativer[i]) + '</span></label>')
                  .join('') +
                '</fieldset>'
              : '')
          );
        case 'salt': {
          const k = C.parse(q.kation);
          const a = C.parse(q.anion);
          const stepper = (felt, label) =>
            '<div class="stepper"><button type="button" class="ibtn" data-step="' + felt + '" data-d="-1" aria-label="Færre ' + label + '">−</button>' +
            '<output class="step-v" data-v="' + felt + '">1</output>' +
            '<button type="button" class="ibtn" data-step="' + felt + '" data-d="1" aria-label="Flere ' + label + '">+</button></div>';
          const ion = (f, felt, label, lad) =>
            '<div class="salt-ion"><span class="fld-l">' + label + '</span>' +
            (q.visIoner ? '<span class="salt-f">' + KJ.ce(f.ce) + '</span>' : '<label class="salt-lad"><span class="sr-only">Ladning til ' + label + '</span><input class="inp lad" data-lad="' + lad + '" placeholder="ladning" autocomplete="off" inputmode="text"></label>') +
            stepper(felt, label.toLowerCase()) + '</div>';
          return (
            '<div class="salt">' +
            ion(k, 'nk', 'Kation', 'lk') + '<span class="salt-plus">+</span>' + ion(a, 'na', 'Anion', 'la') +
            '</div>' +
            '<p class="salt-regnskap" aria-live="polite"></p>' +
            '<label class="fld fld-wide"><span class="fld-l">Formel for saltet</span><input class="inp txt mono" data-salt autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="f.eks. Al2(SO4)3"></label>' +
            '<p class="preview" aria-live="polite"><span class="muted">Forhåndsvisning:</span> <span class="pv"></span></p>'
          );
        }
        case 'detektiv': {
          const n = this.id;
          return (
            '<div class="det-obs"><p class="fld-l">Observasjoner</p><ul>' +
            q.obs.map((o, i) => '<li><label class="chk"><input type="checkbox" data-bevis="' + i + '"><span>' + fmt(o[0]) + '</span></label></li>').join('') +
            '</ul><p class="q-note">Kryss av for observasjonene som er bevis for stofftypen.</p></div>' +
            '<fieldset class="opts det-type"><legend class="fld-l" style="margin-bottom:6px">Hva slags stoff er dette?</legend>' +
            KJ.STOFFTYPER.map((t, i) => '<label class="opt" data-i="' + i + '"><input type="radio" name="' + n + '-t" data-dtype value="' + i + '"><span class="opt-key" aria-hidden="true">' + String.fromCharCode(65 + i) + '</span><span class="opt-text">' + t + '</span></label>').join('') +
            '</fieldset>' +
            (q.plan
              ? '<fieldset class="opts det-plan"><legend class="fld-l" style="margin-bottom:6px">' + fmt(q.plan.sporsmal) + '</legend>' +
                (this.planRek || (this.planRek = KJ.shuffle(q.plan.alternativer.map((_, i) => i))))
                  .map((i, k) => '<label class="opt" data-i="' + i + '"><input type="radio" name="' + n + '-p" data-dplan value="' + i + '"><span class="opt-key" aria-hidden="true">' + String.fromCharCode(65 + k) + '</span><span class="opt-text">' + fmt(q.plan.alternativer[i]) + '</span></label>')
                  .join('') +
                '</fieldset>'
              : '')
          );
        }
        case 'markering': {
          const S = KJ.STRUKTURER[q.struktur];
          const flere = q.typer.length > 1;
          return (
            (flere
              ? '<div class="mk-palett"><span class="fld-l">Velg kraft, og trykk i tegningen:</span><div class="seg" role="radiogroup" aria-label="Type kraft">' +
                q.typer.map((t, i) => '<label class="seg-opt"><input type="radio" name="' + this.id + '-mt" data-mtype="' + t + '" value="' + t + '"' + (i === 0 ? ' checked' : '') + '><span><i class="mk-prikk mk-' + t + '">' + KJ.KRAFTTYPER[t].kort + '</i>' + KJ.KRAFTTYPER[t].navn + '</span></label>').join('') +
                '</div></div>'
              : '') +
            '<div class="mk-wrap">' + KJ.strukturSvg(S, '<g class="mk-lag"></g>', 'mk-aktiv') + '</div>' +
            '<p class="q-note">Trykk i tegningen for å sette en markør der kraften virker. Trykk på en markør for å fjerne den. <span class="mk-teller"></span></p>'
          );
        }
        case 'lewis': {
          const steg = KJ.lewisSteg(q);
          const felt = (st) => {
            if (st.type === 'tall') return '<input class="inp lw-num mono" data-lw="' + st.k + '" inputmode="numeric" autocomplete="off" aria-label="' + esc(st.tekst) + '">';
            if (st.type === 'valg')
              return '<select class="inp lw-sel" data-lw="' + st.k + '" aria-label="' + esc(st.tekst) + '"><option value="">Velg form</option>' + st.valg.map((v) => '<option value="' + v + '">' + v + '</option>').join('') + '</select>';
            return (
              '<div class="seg seg-sm" role="radiogroup" aria-label="' + esc(st.tekst) + '">' +
              ['ja', 'nei'].map((v) => '<label class="seg-opt"><input type="radio" name="' + this.id + '-' + st.k + '" data-lw="' + st.k + '" value="' + v + '"><span>' + (v === 'ja' ? 'Ja' : 'Nei') + '</span></label>').join('') +
              '</div>'
            );
          };
          return (
            '<ol class="lewis-steg">' +
            steg.map((st, i) => '<li data-k="' + st.k + '"><span class="lw-n">' + (i + 1) + '</span><span class="lw-t">' + fmt(st.tekst) + '</span>' + felt(st) + '</li>').join('') +
            '</ol>'
          );
        }
        case 'orbital': {
          const L = this.oppsett;
          return (
            '<div class="orbdia">' +
            (L.kjerne ? '<div class="orb-rad"><span class="orb-l">[' + L.kjerne + ']</span><span class="muted" style="font-size:.85rem">edelgasskjerne (' + L.kjerneE + ' elektroner) er fylt inn</span></div>' : '') +
            L.rader
              .map(
                (r) =>
                  '<div class="orb-rad" data-orb="' + r.orb + '"><span class="orb-l">' + r.orb + '</span><div class="orb-boxes">' +
                  this.bokser[r.orb].map((st, j) => '<button type="button" class="orb-box orb-btn" data-box="' + r.orb + '" data-j="' + j + '" aria-label="' + r.orb + ', orbital ' + (j + 1) + ': tom"></button>').join('') +
                  '</div></div>'
              )
              .join('') +
            '</div>' +
            '<p class="q-note">Trykk på en boks for å bytte: tom → ↑ → ↓ → ↑↓ → ↑↑ → tom. <span class="orb-teller"></span></p>' +
            (q.konfig
              ? '<div class="num-row" style="margin-top:8px"><label class="fld fld-wide"><span class="fld-l">Full konfigurasjon</span><input class="inp mono kfull" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="1s2 2s2 2p6 …"></label>' +
                (L.n > 2 ? '<label class="fld fld-wide"><span class="fld-l">Med edelgasskjerne</span><input class="inp mono kedel" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="[Ne] 3s2 …"></label>' : '') +
                '</div>'
              : '')
          );
        }
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
        else if (a === 'vurder') this.vurder();
        else if (a === 'ny') this.nyVariant();
        else if (a === 'endre-ok') this.provEndring();
        else if (a === 'endre-avbryt') this.lukkEndring();
        else if (b.dataset.endre != null) this.apneEndring(b.dataset.endre);
        else if (b.dataset.step && !this.last) {
          const f = b.dataset.step;
          this.antall[f] = Math.max(1, Math.min(9, this.antall[f] + +b.dataset.d));
          this.oppdaterSalt();
          this.endret();
        } else if (b.dataset.box && !this.last) {
          const r = b.dataset.box;
          const j = +b.dataset.j;
          const sy = KJ.ORB_SYKLUS;
          this.bokser[r][j] = sy[(sy.indexOf(this.bokser[r][j]) + 1) % sy.length];
          this.oppdaterOrbital();
          this.endret();
        }
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
        if (q.type === 'balanser' && e.target.classList.contains('koef')) this.tell();
        if (q.type === 'salt') this.oppdaterSalt();
        if (q.type === 'orbital') this.oppdaterOrbital();
        if (q.type === 'forklaring') {
          const t = el.querySelector('.area').value.trim();
          el.querySelector('.cnt').textContent = t ? t.split(/\s+/).length : 0;
        }
        if (e.target.classList.contains('inp')) e.target.classList.remove('is-wrong', 'is-right');
        const lwLi = e.target.closest('.lewis-steg li');
        if (lwLi) lwLi.classList.remove('is-right', 'is-wrong');
        this.endret();
      });
      el.addEventListener('change', (e) => {
        if (e.target.matches('input[type=radio], input[type=checkbox], select')) {
          const lw = e.target.closest('.lewis-steg li, .det-obs li');
          if (lw) lw.classList.remove('is-right', 'is-wrong', 'is-missed');
          const opt = e.target.closest('.opt');
          if (opt) el.querySelectorAll('.opt').forEach((o) => o.classList.remove('is-wrong', 'is-right'));
          this.endret();
        }
      });
      if (q.type === 'markering') {
        const svg = el.querySelector('.mk-svg');
        svg.addEventListener('click', (e) => {
          if (this.last) return;
          const g = e.target.closest('.mk-m');
          if (g) {
            this.markorer = this.markorer.filter((m) => m.i !== +g.dataset.mi);
          } else {
            if (this.markorer.length >= 15) return KJ.toast('Maks 15 markører.');
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const p = pt.matrixTransform(svg.getScreenCTM().inverse());
            this.mNr = (this.mNr || 0) + 1;
            this.markorer.push({ x: Math.round(p.x), y: Math.round(p.y), t: this.mType, i: 1000 + this.mNr });
          }
          this.tegnMarkorer();
          this.endret();
        });
        el.addEventListener('change', (e) => {
          if (e.target.dataset.mtype) this.mType = e.target.value;
        });
        this.tegnMarkorer();
      }
      if (q.type === 'balanser') this.tell();
      if (q.type === 'salt') this.oppdaterSalt();
      if (q.type === 'orbital') this.oppdaterOrbital();
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.matches('.eq-edit input')) {
          e.preventDefault();
          this.provEndring();
          return;
        }
        if (e.key === 'Enter' && this.o.modus === 'ovelse' && e.target.matches('input.inp') && !e.target.matches('[type=radio],[type=checkbox]')) {
          e.preventDefault();
          this.sjekk();
        }
      });
    }

    endret() {
      if (this.o.onEndring) this.o.onEndring(this);
    }

    tegnMarkorer(status) {
      const lag = this.el.querySelector('.mk-lag');
      if (!lag) return;
      this.markorer.forEach((m, k) => m.i == null && (m.i = k));
      lag.innerHTML = this.markorer.map((m, k) => KJ.markorSvg(m, status && status[k])).join('');
      const t = this.el.querySelector('.mk-teller');
      if (t) t.textContent = this.markorer.length ? this.markorer.length + ' markør' + (this.markorer.length > 1 ? 'er' : '') + ' satt.' : '';
    }

    /** Har eleven svart noe? (Rangering teller først når noe er flyttet.) */
    besvart() {
      if (this.q.type === 'rekkefolge') return !!this.rort || (this.q.begrunnelse && this.hentSvar().begr != null);
      return KJ.harSvar(this.q, this.hentSvar());
    }

    /** Lager en ny tilfeldig variant av en generert oppgave. */
    nyVariant() {
      if (!this.spec) return;
      const ny = new KJ.Oppgavekort(this.spec, Object.assign({}, this.o, { instans: null }));
      this.el.replaceWith(ny.el);
      if (this.o.onNy) this.o.onNy(ny);
      const p = ny.el.querySelector('.q-prompt');
      p.setAttribute('tabindex', '-1');
      p.focus({ preventScroll: true });
    }

    /* ---------- Saltbygger ---------- */
    oppdaterSalt() {
      const q = this.q;
      const el = this.el;
      el.querySelector('[data-v="nk"]').textContent = this.antall.nk;
      el.querySelector('[data-v="na"]').textContent = this.antall.na;
      const lad = (felt, fasit) => {
        if (q.visIoner) return fasit;
        const v = String((el.querySelector('[data-lad="' + felt + '"]') || {}).value || '').trim().replace(/[−–]/g, '-');
        if (v === '+' || v === '-') return v === '+' ? 1 : -1;
        const n = parseInt(v.replace(/^(\d+)([+-])$/, '$2$1'), 10);
        return isNaN(n) ? null : n;
      };
      const lk = lad('lk', C.parse(q.kation).ladning);
      const la = lad('la', C.parse(q.anion).ladning);
      const reg = el.querySelector('.salt-regnskap');
      if (lk == null || la == null) {
        reg.innerHTML = '<span class="muted">Skriv ladningene for å se ladningsregnskapet.</span>';
      } else {
        const sum = this.antall.nk * lk + this.antall.na * la;
        const fort = (x) => (x > 0 ? '+' + x : String(x));
        reg.className = 'salt-regnskap ' + (sum === 0 ? 'ok' : 'bad');
        reg.innerHTML =
          '<span class="muted">Ladningsregnskap:</span> ' + KJ.tex(this.antall.nk + '\\cdot(' + fort(lk) + ') + ' + this.antall.na + '\\cdot(' + fort(la) + ') = ' + fort(sum).replace('+0', '0')) +
          (sum === 0 ? ' <strong>nøytralt</strong>' : ' <strong>ikke nøytralt</strong>');
      }
      const inn = el.querySelector('[data-salt]').value;
      const pv = el.querySelector('.pv');
      try {
        pv.innerHTML = inn.trim() ? KJ.ce(C.parse(inn).ce) : '';
      } catch (err) {
        pv.innerHTML = '<span class="muted">' + esc(err.kjemi ? err.message : 'Ugyldig') + '</span>';
      }
    }

    /* ---------- Orbitaldiagram ---------- */
    oppdaterOrbital() {
      const el = this.el;
      let n = this.oppsett.kjerneE;
      Object.keys(this.bokser).forEach((r) => {
        this.bokser[r].forEach((st, j) => {
          const b = el.querySelector('[data-box="' + r + '"][data-j="' + j + '"]');
          b.textContent = KJ.ORB_PIL[st];
          b.classList.toggle('pauli', st === 'uu');
          b.setAttribute('aria-label', r + ', orbital ' + (j + 1) + ': ' + ({ '': 'tom', u: 'ett elektron opp', d: 'ett elektron ned', ud: 'to elektroner, motsatt spinn', uu: 'to elektroner, samme spinn' }[st]));
          n += st === 'ud' || st === 'uu' ? 2 : st ? 1 : 0;
        });
      });
      el.querySelector('.orb-teller').textContent = 'Elektroner plassert: ' + n + ' av ' + this.oppsett.n + '.';
    }

    /* ---------- Balansering: forsøk på å endre en indeks ---------- */
    apneEndring(f) {
      if (this.last) return;
      const box = this.el.querySelector('.eq-edit');
      box.hidden = false;
      box.dataset.f = f;
      box.innerHTML =
        '<label class="fld fld-wide"><span class="fld-l">Endre formelen ' + KJ.ce(f) + '</span><input class="inp mono" value="' + esc(f) + '" autocomplete="off" autocapitalize="off" spellcheck="false"></label>' +
        '<div class="btn-row" style="margin-top:8px"><button type="button" class="btn btn-small btn-primary" data-a="endre-ok">Endre</button><button type="button" class="btn btn-small btn-quiet" data-a="endre-avbryt">Avbryt</button></div>' +
        '<div class="eq-edit-fb" aria-live="polite"></div>';
      box.querySelector('input').focus();
    }
    lukkEndring() {
      const box = this.el.querySelector('.eq-edit');
      box.hidden = true;
      box.innerHTML = '';
    }
    provEndring() {
      const box = this.el.querySelector('.eq-edit');
      const f = box.dataset.f;
      const ny = box.querySelector('input').value.trim();
      const fb = box.querySelector('.eq-edit-fb');
      const KJENTE = { H2O2: 'hydrogenperoksid', O3: 'ozon', CO: 'karbonmonoksid', H2O: 'vann', CO2: 'karbondioksid', NO2: 'nitrogendioksid', NO: 'nitrogenmonoksid', SO3: 'svoveltrioksid', SO2: 'svoveldioksid' };
      let tekst;
      if (!ny || ny === f) {
        this.lukkEndring();
        return;
      }
      const m = /^(\d+)\s*(.+)$/.exec(ny);
      if (m && m[2] === f) {
        tekst = 'Tallet foran formelen er en **koeffisient**. Skriv ' + m[1] + ' i feltet foran formelen i stedet.';
      } else {
        let p = null;
        try {
          p = C.parse(ny);
        } catch (e) {
          /* ugyldig formel */
        }
        const navn = p && KJENTE[p.kanon] ? ' Det er **' + KJENTE[p.kanon] + '**.' : '';
        tekst =
          'Du prøver å endre **indeksen**. {{' + f + '}} og {{' + (p ? p.ce : ny) + '}} er to forskjellige stoffer.' + navn +
          ' Reaksjonslikningen beskriver bestemte stoffer, så formlene ligger fast. Du kan bare endre **koeffisientene** (tallene foran) for å få like mange atomer på hver side.';
      }
      fb.innerHTML = '<div class="fb-info" style="margin-top:10px"><div class="fb-inner">' + KJ.icon('info', 18) + '<div><p class="fb-main">' + KJ.fmt(tekst) + '</p></div></div></div>';
      box.querySelector('input').value = f;
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
        case 'rekkefolge': {
          if (!q.begrunnelse) return this.orden.slice();
          const b = el.querySelector('.begr input:checked');
          return { orden: this.orden.slice(), begr: b ? +b.value : null };
        }
        case 'salt': {
          const lk = el.querySelector('[data-lad="lk"]');
          const la = el.querySelector('[data-lad="la"]');
          return { nk: this.antall.nk, na: this.antall.na, lk: lk ? lk.value : null, la: la ? la.value : null, formel: el.querySelector('[data-salt]').value };
        }
        case 'markering':
          return { m: this.markorer.map((m) => ({ x: m.x, y: m.y, t: m.t })) };
        case 'detektiv': {
          const t = el.querySelector('[data-dtype]:checked');
          const p = el.querySelector('[data-dplan]:checked');
          return { type: t ? +t.value : null, bevis: [...el.querySelectorAll('[data-bevis]:checked')].map((i) => +i.dataset.bevis), plan: p ? +p.value : null };
        }
        case 'lewis': {
          const ut = {};
          el.querySelectorAll('[data-lw]').forEach((i) => {
            if (i.type === 'radio') {
              if (i.checked) ut[i.dataset.lw] = i.value;
            } else ut[i.dataset.lw] = i.value;
          });
          return ut;
        }
        case 'orbital': {
          const ut = { bokser: JSON.parse(JSON.stringify(this.bokser)) };
          if (el.querySelector('.kfull')) ut.full = el.querySelector('.kfull').value;
          if (el.querySelector('.kedel')) ut.edel = el.querySelector('.kedel').value;
          return ut;
        }
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
        case 'rekkefolge': {
          const orden = Array.isArray(svar) ? svar : svar.orden;
          if (Array.isArray(orden) && orden.length === this.orden.length) {
            this.orden = orden.slice();
            this.rort = true;
          }
          this.tegnRekkefolge();
          if (!Array.isArray(svar) && svar.begr != null) {
            const r = el.querySelector('.begr input[value="' + svar.begr + '"]');
            if (r) r.checked = true;
          }
          break;
        }
        case 'salt':
          this.antall = { nk: svar.nk || 1, na: svar.na || 1 };
          if (el.querySelector('[data-lad="lk"]')) el.querySelector('[data-lad="lk"]').value = svar.lk || '';
          if (el.querySelector('[data-lad="la"]')) el.querySelector('[data-lad="la"]').value = svar.la || '';
          el.querySelector('[data-salt]').value = svar.formel || '';
          this.oppdaterSalt();
          break;
        case 'detektiv':
          el.querySelectorAll('[data-dtype]').forEach((r) => (r.checked = +r.value === svar.type));
          el.querySelectorAll('[data-dplan]').forEach((r) => (r.checked = +r.value === svar.plan));
          el.querySelectorAll('[data-bevis]').forEach((c) => (c.checked = (svar.bevis || []).includes(+c.dataset.bevis)));
          break;
        case 'markering':
          this.markorer = (svar.m || []).map((m, i) => ({ x: m.x, y: m.y, t: m.t, i }));
          this.tegnMarkorer();
          break;
        case 'lewis':
          el.querySelectorAll('[data-lw]').forEach((i) => {
            const v = svar[i.dataset.lw];
            if (i.type === 'radio') i.checked = v === i.value;
            else i.value = v == null ? '' : v;
          });
          break;
        case 'orbital':
          if (svar.bokser) Object.keys(this.bokser).forEach((r) => svar.bokser[r] && (this.bokser[r] = svar.bokser[r].slice()));
          if (el.querySelector('.kfull')) el.querySelector('.kfull').value = svar.full || '';
          if (el.querySelector('.kedel')) el.querySelector('.kedel').value = svar.edel || '';
          this.oppdaterOrbital();
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
          tillegg = feilbankTekst(r, res.riktig, this.forsok === 1);
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
      } else if (q.type === 'orbital' && res) {
        el.querySelectorAll('.orb-rad[data-orb]').forEach((r) => {
          r.classList.remove('is-right', 'is-wrong');
          r.classList.add(res.radOk && res.radOk[r.dataset.orb] ? 'is-right' : 'is-wrong');
        });
        [['.kfull', 'full'], ['.kedel', 'edel']].forEach(([sel, k]) => {
          const i = el.querySelector(sel);
          if (i && res.konfDeler) {
            i.classList.remove('is-right', 'is-wrong');
            i.classList.add(res.konfDeler[k] ? 'is-right' : 'is-wrong');
          }
        });
      } else if (q.type === 'detektiv' && res && res.detektivDeler) {
        const merkOpt = (sel, fasit) =>
          el.querySelectorAll(sel + ' .opt').forEach((o) => {
            const i = +o.dataset.i;
            const valgt = o.querySelector('input').checked;
            o.classList.remove('is-right', 'is-wrong', 'is-missed');
            if (valgt && i === fasit) o.classList.add('is-right');
            else if (valgt) o.classList.add('is-wrong');
            else if (visFasit && i === fasit) o.classList.add('is-missed');
          });
        merkOpt('.det-type', q.svar);
        if (q.plan) merkOpt('.det-plan', q.plan.svar);
        el.querySelectorAll('[data-bevis]').forEach((c) => {
          const rolle = q.obs[+c.dataset.bevis][1];
          const li = c.closest('li');
          li.classList.remove('is-right', 'is-wrong', 'is-missed');
          if (c.checked && rolle === 'k') li.classList.add('is-right');
          else if (c.checked && rolle === 'i') li.classList.add('is-wrong');
          else if (!c.checked && rolle === 'k' && visFasit) li.classList.add('is-missed');
        });
      } else if (q.type === 'markering' && res && res.markorStatus) {
        this.tegnMarkorer(res.markorStatus);
      } else if (q.type === 'lewis' && res && res.lewisDeler) {
        el.querySelectorAll('.lewis-steg li').forEach((li) => {
          li.classList.remove('is-right', 'is-wrong');
          li.classList.add(res.lewisDeler[li.dataset.k] ? 'is-right' : 'is-wrong');
        });
      } else if (q.type === 'salt' && res && res.saltDeler) {
        const d = res.saltDeler;
        el.querySelectorAll('.lad').forEach((i) => i.classList.toggle('is-wrong', !d.ladning));
        el.querySelectorAll('.stepper').forEach((st) => {
          st.classList.toggle('is-right', d.antall);
          st.classList.toggle('is-wrong', !d.antall);
        });
        const f = el.querySelector('[data-salt]');
        f.classList.remove('is-right', 'is-wrong');
        f.classList.add(d.formel ? 'is-right' : 'is-wrong');
      } else if (res && res.deler) {
        const sel = { fyllinn: '.blank', kobling: '.match-row', rekkefolge: '.order-item', sortering: '.sort-row' }[q.type];
        if (!sel) return;
        const noder = [...el.querySelectorAll(sel)];
        noder.forEach((n) => {
          const i = q.type === 'sortering' ? +n.dataset.i : noder.indexOf(n);
          n.classList.remove('is-right', 'is-wrong');
          n.classList.add(res.deler[i] ? 'is-right' : 'is-wrong');
        });
        if (q.type === 'rekkefolge' && q.begrunnelse) {
          el.querySelectorAll('.begr .opt').forEach((o) => {
            const i = +o.dataset.i;
            const valgt = o.querySelector('input').checked;
            o.classList.remove('is-right', 'is-wrong', 'is-missed');
            if (valgt && i === q.begrunnelse.svar) o.classList.add('is-right');
            else if (valgt) o.classList.add('is-wrong');
            else if (visFasit && i === q.begrunnelse.svar) o.classList.add('is-missed');
          });
        }
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
      const tekst = (this.el.querySelector('.area') || {}).value || '';
      box.innerHTML =
        (q.fagbegreper ? KJ.fagbegrepHtml(q, tekst) : '') +
        '<div class="model"><h3 class="sol-h">Modellsvar' + (q.kriterier ? ' (høy måloppnåelse)' : '') + '</h3>' + KJ.fmtBlock(q.modellsvar) + '</div>' +
        (q.kriterier ? KJ.kriterierHtml(q) : '') +
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
        const tillegg = feilbankTekst(r, res.riktig, this.forsok === 1);
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
      this.el.querySelectorAll('.q-body .ibtn, .q-body .orb-btn, .q-body .eq-sp').forEach((b) => (b.disabled = true));
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

  /** Hvilke fagbegreper er brukt i teksten? Varianter skilles med |. */
  KJ.fagbegrepTreff = function (q, tekst) {
    const t = String(tekst || '').toLowerCase();
    return (q.fagbegreper || []).map((b) => b.split('|').some((v) => t.includes(v.toLowerCase())));
  };
  KJ.fagbegrepHtml = function (q, tekst) {
    const treff = KJ.fagbegrepTreff(q, tekst);
    const ant = treff.filter(Boolean).length;
    return (
      '<div class="fagbegrep"><h3 class="sol-h">Fagbegreper' + (String(tekst || '').trim() ? ' i svaret ditt: ' + ant + ' av ' + treff.length : '') + '</h3><ul>' +
      q.fagbegreper.map((b, i) => '<li class="' + (treff[i] ? 'fb-ja' : 'fb-nei') + '">' + KJ.icon(treff[i] ? 'check' : 'x', 14) + esc(b.split('|')[0]) + '</li>').join('') +
      '</ul>' + (String(tekst || '').trim() ? '' : '<p class="q-note">Skriv svaret ditt først, så ser du hvilke begreper du har brukt.</p>') + '</div>'
    );
  };
  KJ.kriterierHtml = function (q) {
    const K = q.kriterier;
    return (
      '<div class="kriterier"><h3 class="sol-h">Kriterier</h3><dl>' +
      [['lav', 'Lav'], ['middels', 'Middels'], ['hoy', 'Høy']].map(([k, n]) => '<div class="krit-' + k + '"><dt>' + n + '</dt><dd>' + KJ.fmt(K[k]) + '</dd></div>').join('') +
      '</dl></div>'
    );
  };

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
      case 'salt':
        return !!String(svar.formel || '').trim();
      case 'orbital':
        return Object.values(svar.bokser || {}).some((b) => b.some((x) => x)) || !!String(svar.full || '').trim();
      case 'lewis':
        return Object.values(svar).some((v) => String(v || '').trim());
      case 'markering':
        return !!(svar.m && svar.m.length);
      case 'detektiv':
        return svar.type != null || (svar.bevis && svar.bevis.length > 0) || svar.plan != null;
      default:
        return !!String(svar || '').trim();
    }
  };

  KJ.Oppgavekort = Oppgavekort;
})(window.KJ);
