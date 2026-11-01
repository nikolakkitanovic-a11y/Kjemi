/*
 * Formatering av tekst: HTML-escaping, enkel markdown og KaTeX/mhchem.
 *
 * Skrivemåte i datafilene:
 *   {{H2SO4}}            -> kjemisk formel med mhchem (\ce{H2SO4})
 *   {{2H2 + O2 -> 2H2O}} -> reaksjonslikning
 *   $N = A - Z$          -> matematikk (husk dobbel backslash i JavaScript-strenger)
 *   **fet** og *kursiv*
 * Desimalkomma inne i $...$ blir automatisk riktig (35,45 -> 35{,}45).
 */
(function (KJ) {
  'use strict';

  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  KJ.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ESC[c]);

  const KATEX_OPTS = {
    throwOnError: false,
    strict: 'ignore',
    macros: { '\\enhet': '\\,\\mathrm{#1}' },
  };
  const cache = new Map();

  function tex2html(tex, display) {
    const key = (display ? 'D' : 'I') + tex;
    if (cache.has(key)) return cache.get(key);
    let src = tex.replace(/(\d),(?=\d)/g, '$1{,}');
    let html;
    if (window.katex) {
      try {
        html = window.katex.renderToString(src, Object.assign({ displayMode: !!display }, KATEX_OPTS));
      } catch (e) {
        html = '<code>' + KJ.esc(tex) + '</code>';
      }
    } else {
      html = '<code>' + KJ.esc(tex) + '</code>';
    }
    if (cache.size > 4000) cache.clear();
    cache.set(key, html);
    return html;
  }
  KJ.tex = tex2html;

  function inline(t) {
    let s = KJ.esc(t);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>');
    s = s.replace(/\n/g, '<br>');
    return s;
  }

  /** Formaterer én tekstbit (inline) til HTML. */
  KJ.fmt = function (src) {
    if (src == null) return '';
    const s = String(src).replace(/\{\{([\s\S]+?)\}\}/g, (m, x) => '$\\ce{' + x.trim() + '}$');
    const re = /\$\$([\s\S]+?)\$\$|\$([\s\S]+?)\$/g;
    let out = '';
    let last = 0;
    let m;
    while ((m = re.exec(s))) {
      out += inline(s.slice(last, m.index));
      out += m[1] != null ? tex2html(m[1], true) : tex2html(m[2], false);
      last = re.lastIndex;
    }
    return out + inline(s.slice(last));
  };

  /** Formaterer en lengre tekst med avsnitt (tom linje) og punktlister ("- "). */
  KJ.fmtBlock = function (src) {
    if (src == null) return '';
    return String(src)
      .trim()
      .split(/\n\s*\n/)
      .map((para) => {
        const lines = para.split('\n');
        if (lines.every((l) => /^\s*[-•]\s+/.test(l))) {
          return '<ul>' + lines.map((l) => '<li>' + KJ.fmt(l.replace(/^\s*[-•]\s+/, '')) + '</li>').join('') + '</ul>';
        }
        if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l))) {
          return '<ol>' + lines.map((l) => '<li>' + KJ.fmt(l.replace(/^\s*\d+[.)]\s+/, '')) + '</li>').join('') + '</ol>';
        }
        return '<p>' + KJ.fmt(para) + '</p>';
      })
      .join('');
  };

  /** Kjemisk formel som HTML (mhchem). */
  KJ.ce = (f) => tex2html('\\ce{' + f + '}', false);

  /** Tall med norsk desimalkomma. */
  KJ.tall = function (x, des) {
    if (x == null || isNaN(x)) return '–';
    const s = des == null ? String(x) : Number(x).toFixed(des);
    return s.replace('.', ',');
  };

  /** Tall med gitt antall gjeldende siffer, norsk skrivemåte. Returnerer TeX. */
  KJ.gsTex = function (x, gs) {
    if (!isFinite(x)) return '–';
    if (x === 0) return '0';
    const exp = Math.floor(Math.log10(Math.abs(x)));
    if (exp >= 5 || exp <= -4) {
      const mant = x / Math.pow(10, exp);
      return mant.toFixed(Math.max(0, gs - 1)).replace('.', '{,}') + '\\cdot 10^{' + exp + '}';
    }
    const dec = Math.max(0, gs - 1 - exp);
    return x.toFixed(dec).replace('.', '{,}');
  };

  KJ.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /** Stokker slik at rekkefølgen ikke blir den samme som utgangspunktet (når mulig). */
  KJ.shuffleUlik = function (arr) {
    if (arr.length < 2) return arr.slice();
    let a;
    let tries = 0;
    do {
      a = KJ.shuffle(arr);
      tries++;
    } while (tries < 20 && a.every((x, i) => x === arr[i]));
    return a;
  };

  KJ.hash = function (s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  };

  KJ.uid = (() => {
    let n = 0;
    return (p) => (p || 'u') + '-' + ++n;
  })();

  /* ---------- Ikoner (Lucide-stil, inline SVG) ---------- */
  const P = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    clipboard: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    flask: '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    shuffle: '<path d="m18 14 4 4-4 4M18 2l4 4-4 4"/><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
    timer: '<path d="M10 2h4M12 14l3-3"/><circle cx="12" cy="14" r="8"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    trash: '<path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    pencil: '<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/>',
    calc: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8M16 14v4M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M16 13H8M16 17H8M10 9H8"/>',
    scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    play: '<path d="M6 3l14 9-14 9z"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    spark: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  };
  KJ.icon = function (name, size, cls) {
    const s = size || 20;
    return (
      '<svg class="ico' + (cls ? ' ' + cls : '') + '" width="' + s + '" height="' + s +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      (P[name] || '') + '</svg>'
    );
  };

  /* ---------- Små UI-hjelpere ---------- */
  KJ.toast = function (msg, kind) {
    const host = document.getElementById('toast');
    if (!host) return;
    const el = document.createElement('div');
    el.className = 'toast' + (kind ? ' toast-' + kind : '');
    el.innerHTML = msg;
    host.appendChild(el);
    setTimeout(() => el.classList.add('out'), 2600);
    setTimeout(() => el.remove(), 3000);
  };

  /** Bekreftelsesdialog. Returnerer Promise<boolean>. */
  KJ.bekreft = function (tittel, tekst, ja, nei) {
    return new Promise((resolve) => {
      const d = document.createElement('dialog');
      d.className = 'dlg';
      d.innerHTML =
        '<form method="dialog"><h2 class="dlg-title">' + KJ.esc(tittel) + '</h2>' +
        '<div class="dlg-body">' + KJ.fmtBlock(tekst || '') + '</div>' +
        '<div class="dlg-actions"><button class="btn btn-ghost" value="nei">' + KJ.esc(nei || 'Avbryt') +
        '</button><button class="btn btn-primary" value="ja">' + KJ.esc(ja || 'OK') + '</button></div></form>';
      document.body.appendChild(d);
      d.addEventListener('close', () => {
        resolve(d.returnValue === 'ja');
        d.remove();
      });
      if (d.showModal) d.showModal();
      else resolve(window.confirm(tittel));
    });
  };

  KJ.tid = function (sek) {
    sek = Math.max(0, Math.round(sek));
    const m = Math.floor(sek / 60);
    const s = sek % 60;
    return m + ':' + String(s).padStart(2, '0');
  };

  KJ.reducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
})(window.KJ);
