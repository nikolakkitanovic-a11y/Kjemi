/*
 * Små visualiseringer i SVG: linjespektre og skallmodell (Bohr) av atomer og ioner.
 */
(function (KJ) {
  'use strict';

  /** Omtrentlig RGB-farge for synlig lys med bølgelengde nm (380–780). */
  KJ.bolgeFarge = function (nm) {
    let r = 0;
    let g = 0;
    let b = 0;
    if (nm >= 380 && nm < 440) {
      r = -(nm - 440) / 60;
      b = 1;
    } else if (nm < 490) {
      g = (nm - 440) / 50;
      b = 1;
    } else if (nm < 510) {
      g = 1;
      b = -(nm - 510) / 20;
    } else if (nm < 580) {
      r = (nm - 510) / 70;
      g = 1;
    } else if (nm < 645) {
      r = 1;
      g = -(nm - 645) / 65;
    } else if (nm <= 780) {
      r = 1;
    }
    let f = 1;
    if (nm < 420) f = 0.3 + (0.7 * (nm - 380)) / 40;
    else if (nm > 700) f = 0.3 + (0.7 * (780 - nm)) / 80;
    const c = (x) => Math.round(255 * Math.pow(x * f, 0.8));
    return 'rgb(' + c(r) + ',' + c(g) + ',' + c(b) + ')';
  };

  /**
   * Linjespekter som SVG.
   * linjer: [{ nm, styrke (0–1), etikett? }]
   */
  KJ.spekterSVG = function (linjer, opt) {
    opt = opt || {};
    const W = 600;
    const H = opt.hoyde || 64;
    const x = (nm) => ((nm - 380) / (720 - 380)) * W;
    const id = KJ.uid('glow');
    let s =
      '<svg class="spekter" viewBox="0 0 ' + W + ' ' + (H + (opt.akse ? 22 : 0)) + '" preserveAspectRatio="none" role="img" aria-label="' +
      KJ.esc(opt.label || 'Linjespekter') + '">' +
      '<defs><filter id="' + id + '" x="-50%" y="-10%" width="200%" height="120%"><feGaussianBlur stdDeviation="2.4"/></filter></defs>' +
      '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="6" fill="#07080a"/>';
    linjer.forEach((l) => {
      const c = KJ.bolgeFarge(l.nm);
      const a = l.styrke == null ? 1 : l.styrke;
      const xx = x(l.nm).toFixed(1);
      s +=
        '<g opacity="' + a.toFixed(2) + '"><rect x="' + (xx - 3) + '" y="4" width="6" height="' + (H - 8) + '" fill="' + c +
        '" filter="url(#' + id + ')"/><rect x="' + (xx - 1) + '" y="4" width="2" height="' + (H - 8) + '" fill="' + c + '"/></g>';
    });
    if (opt.akse) {
      for (let nm = 400; nm <= 700; nm += 50) {
        s += '<text x="' + x(nm) + '" y="' + (H + 16) + '" text-anchor="middle" class="spekter-akse">' + nm + '</text>';
      }
    }
    return s + '</svg>';
  };

  /** Kjente emisjonslinjer (nm) for noen grunnstoffer, til teorifigurer. */
  KJ.SPEKTRA = {
    H: [656.3, 486.1, 434.0, 410.2],
    He: [667.8, 587.6, 501.6, 492.2, 471.3, 447.1, 402.6],
    Li: [670.8, 610.4, 460.3, 413.3],
    Na: [589.0, 589.6, 568.8, 498.3],
    Hg: [404.7, 435.8, 546.1, 577.0, 579.1],
  };

  /**
   * Skallmodell av et atom/ion som SVG.
   * z = atomnummer, q = ladning.
   */
  KJ.skallSVG = function (z, q, opt) {
    opt = opt || {};
    q = q || 0;
    const e = KJ.grunnstoffer[z - 1];
    const k = KJ.kjemi.konfig(z, q);
    const skall = KJ.kjemi.skall(k);
    const n = skall.length;
    const S = opt.str || 220;
    const c = S / 2;
    const kjerne = 18;
    const r0 = kjerne + 16;
    const step = n > 1 ? Math.min(26, (c - 8 - r0) / (n - 1)) : 0;
    const ladn = q ? (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '−') : '';
    let s =
      '<svg class="skall" viewBox="0 0 ' + S + ' ' + S + '" width="' + S + '" height="' + S + '" role="img" aria-label="' +
      KJ.esc(
        'Skallmodell av ' + e.navn + (q ? '-ion med ladning ' + ladn : '') + ': ' + skall.join(', ') + ' elektroner i skallene ' +
          ['K', 'L', 'M', 'N', 'O', 'P', 'Q'].slice(0, n).join(', ')
      ) + '">';
    s += '<circle cx="' + c + '" cy="' + c + '" r="' + kjerne + '" class="skall-kjerne"/>';
    s += '<text x="' + c + '" y="' + (c + 4) + '" text-anchor="middle" class="skall-kjerne-t">' + z + '+</text>';
    skall.forEach((ant, i) => {
      const r = r0 + step * i;
      s += '<circle cx="' + c + '" cy="' + c + '" r="' + r.toFixed(1) + '" class="skall-ring"/>';
      for (let j = 0; j < ant; j++) {
        const v = (2 * Math.PI * j) / ant - Math.PI / 2;
        const ex = c + r * Math.cos(v);
        const ey = c + r * Math.sin(v);
        s += '<circle cx="' + ex.toFixed(1) + '" cy="' + ey.toFixed(1) + '" r="' + (ant > 18 ? 2.2 : 3.2) + '" class="skall-e"/>';
      }
    });
    s += '</svg>';
    return s;
  };
})(window.KJ);
