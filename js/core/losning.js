/*
 * Løsningsforslag steg for steg som lages automatisk ut fra oppgaven.
 * Gjelder navn, formel, saltbygger, balansering, elektronkonfigurasjon og orbitaldiagram.
 * KJ.autoSteg(q) gir en liste med HTML-avsnitt, eller null hvis typen ikke har automatisk løsning.
 */
(function (KJ) {
  'use strict';
  const C = KJ.kjemi;
  const f = (s) => KJ.fmt(s);
  const ce = (x) => '{{' + x + '}}';
  const METALL = new Set(['alk', 'jal', 'inn', 'met', 'lan', 'akt']);
  const FLERE_LADNINGER = new Set(['Fe', 'Cu', 'Mn', 'Co', 'Ni', 'Cr', 'Pb', 'Sn', 'Hg', 'Au', 'Ti', 'V']);
  const ANION = { O: ['oksid', -2], S: ['sulfid', -2], N: ['nitrid', -3], F: ['fluorid', -1], Cl: ['klorid', -1], Br: ['bromid', -1], I: ['jodid', -1], H: ['hydrid', -1], P: ['fosfid', -3] };
  const STAMME = { O: 'oksid', S: 'sulfid', N: 'nitrid', F: 'fluorid', Cl: 'klorid', Br: 'bromid', I: 'jodid', P: 'fosfid', C: 'karbid', Se: 'selenid' };
  const PREFIKS = ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'heksa', 'hepta', 'okta', 'nona', 'deka'];
  const ROM = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  const lad = (q) => (q > 0 ? '+' : '−') + Math.abs(q);
  const ionCe = (x, q) => x + '^' + (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '-');
  const erMetall = (sym) => KJ.grunnstoffMap[sym] && METALL.has(KJ.grunnstoffMap[sym].kat);
  const gnavn = (sym) => (KJ.grunnstoffMap[sym] ? KJ.grunnstoffMap[sym].navn : sym);

  function sammensatte() {
    const m = {};
    (KJ.IONER || []).forEach((i) => (m[i.formel.replace(/\^\d*[+-]$|[+-]$/, '')] = i));
    return m;
  }

  /** Deler en saltformel i kation og anion. */
  function analyserSalt(formel) {
    const ion = sammensatte();
    let m;
    let kat;
    let nk = 1;
    let rest;
    if ((m = /^\(NH4\)(\d+)(.+)$/.exec(formel))) {
      kat = 'NH4';
      nk = +m[1];
      rest = m[2];
    } else if (formel.startsWith('NH4') && formel.length > 3) {
      kat = 'NH4';
      rest = formel.slice(3);
    } else if ((m = /^([A-Z][a-z]?)(\d*)(.+)$/.exec(formel))) {
      kat = m[1];
      nk = m[2] ? +m[2] : 1;
      rest = m[3];
    } else return null;
    if (kat !== 'NH4' && !erMetall(kat)) return null;
    let an;
    let na = 1;
    if ((m = /^\((.+)\)(\d+)$/.exec(rest))) {
      an = m[1];
      na = +m[2];
    } else if (ion[rest]) an = rest;
    else if ((m = /^([A-Z][a-z]?)(\d*)$/.exec(rest))) {
      an = m[1];
      na = m[2] ? +m[2] : 1;
    } else return null;
    let anNavn;
    let anQ;
    let sammensatt = false;
    if (ion[an]) {
      anNavn = ion[an].navn;
      anQ = ion[an].ladning;
      sammensatt = true;
    } else if (ANION[an]) [anNavn, anQ] = ANION[an];
    else return null;
    const katQ = kat === 'NH4' ? 1 : -(anQ * na) / nk;
    if (!Number.isInteger(katQ)) return null;
    return { kat, nk, katQ, an, na, anQ, anNavn, sammensatt, katSammensatt: kat === 'NH4' };
  }

  function katNavn(a) {
    if (a.kat === 'NH4') return 'ammonium';
    return gnavn(a.kat) + (FLERE_LADNINGER.has(a.kat) ? '(' + ROM[a.katQ] + ')' : '');
  }

  function saltForklaring(a, formel, navn, retning) {
    const s = [];
    const katIon = a.kat === 'NH4' ? 'NH4+' : ionCe(a.kat, a.katQ);
    const anIon = ionCe(a.an, a.anQ);
    if (retning === 'navn') {
      s.push(f(ce(formel) + ' består av ' + (a.kat === 'NH4' ? 'ammoniumionet' : 'et metall (' + a.kat + ')') + ' og ' + (a.sammensatt ? 'et sammensatt ion' : 'et ikke-metall (' + a.an + ')') + ', altså er det et **salt** (ioneforbindelse). I salter brukes ikke greske tallprefikser.'));
      s.push(f('Anionet er ' + ce(anIon) + (a.sammensatt ? ', som er et sammensatt ion og heter **' + a.anNavn + '**.' : '. Det får endelsen -id: **' + a.anNavn + '**.') + (a.na > 1 ? ' Det er ' + a.na + ' av dem, til sammen ladning ' + lad(a.anQ * a.na) + '.' : '')));
      if (a.kat === 'NH4') s.push(f('Kationet er ' + ce('NH4+') + ', **ammonium**.'));
      else if (FLERE_LADNINGER.has(a.kat)) {
        s.push(f(gnavn(a.kat)[0].toUpperCase() + gnavn(a.kat).slice(1) + ' kan danne ioner med ulik ladning, så ladningen må stå som **romertall**. Saltet må være nøytralt: ' + (a.nk > 1 ? a.nk + ' · ' : '') + a.kat + ' må til sammen ha ' + lad(-a.anQ * a.na) + ', så hvert ' + a.kat + ' har ladning ' + lad(a.katQ) + ' → **' + gnavn(a.kat) + '(' + ROM[a.katQ] + ')**.'));
      } else s.push(f(gnavn(a.kat)[0].toUpperCase() + gnavn(a.kat).slice(1) + ' danner bare ett ion, ' + ce(katIon) + ', så navnet skal **ikke** ha romertall.'));
      s.push(f('Kation først, så anion: **' + navn + '**.'));
    } else {
      s.push(f('**' + navn + '** er et salt: ' + (a.kat === 'NH4' ? 'ammonium' : gnavn(a.kat)) + ' og ' + a.anNavn + '. Finn ionene og ladningene:' + ' ' + ce(katIon) + ' og ' + ce(anIon) + '.' + (FLERE_LADNINGER.has(a.kat) ? ' Romertallet (' + ROM[a.katQ] + ') er ladningen til ' + a.kat + '.' : '')));
      s.push(f('Saltet må være elektrisk nøytralt. Finn minste antall av hvert ion: $' + a.nk + '\\cdot(' + lad(a.katQ) + ') + ' + a.na + '\\cdot(' + lad(a.anQ) + ') = 0$.'));
      if ((a.sammensatt && a.na > 1) || (a.katSammensatt && a.nk > 1)) s.push(f('Det trengs mer enn ett sammensatt ion, så ionet settes i **parentes**, og tallet skrives utenfor.'));
      s.push(f('Formel: ' + ce(formel) + '.'));
    }
    return s;
  }

  function molekylForklaring(formel, navn, retning) {
    const p = C.parse(formel);
    const els = Object.keys(p.antall);
    if (els.length !== 2 || els.some(erMetall)) return null;
    const [a, b] = els;
    const na = p.antall[a];
    const nb = p.antall[b];
    const s = [];
    if (retning === 'navn') {
      s.push(f(ce(formel) + ' består bare av ikke-metaller, altså er det en **molekylforbindelse**. Antall atomer vises med greske tallprefikser.'));
      s.push(f('Første grunnstoff: ' + na + ' ' + a + (na > 1 ? ' → **' + PREFIKS[na] + gnavn(a) + '**' : ' → **' + gnavn(a) + '** («mono» skrives ikke foran det første grunnstoffet)') + '.'));
      s.push(f('Andre grunnstoff: ' + nb + ' ' + b + ' → **' + PREFIKS[nb] + '** + ' + (STAMME[b] || b) + ' (det siste grunnstoffet får endelsen -id).'));
      s.push(f('Navn: **' + navn + '**.'));
    } else {
      s.push(f('**' + navn + '** har greske tallprefikser, altså er det en molekylforbindelse av ikke-metaller. Prefiksene forteller hvor mange atomer det er av hvert grunnstoff.'));
      s.push(f(gnavn(a) + ': ' + (na > 1 ? '«' + PREFIKS[na] + '» = ' + na : 'ingen prefiks = 1') + '. ' + gnavn(b) + ': «' + PREFIKS[nb] + '» = ' + nb + '.'));
      s.push(f('Formel: ' + ce(formel) + '.'));
    }
    return s;
  }

  function ionForklaring(formel) {
    const i = (KJ.IONER || []).find((x) => x.formel === formel);
    if (!i) return null;
    return [
      f(ce(formel) + ' er et **sammensatt ion**: en gruppe atomer som er bundet sammen og til sammen har ladning ' + KJ.ladningTekst(i.ladning) + '.'),
      f('Navnet er **' + i.navn + '**. Disse ionene må pugges. Tips: bare ammonium er positivt, fosfat er 3−, karbonat og sulfat er 2−, resten på tavla er 1−.'),
    ];
  }

  function navnSteg(q) {
    const formel = q.formel;
    const navn = [].concat(q.svar)[0];
    if (C.parse(formel).ladning) return ionForklaring(formel);
    if (/^[A-Z][a-z]?$/.test(formel)) return [f(ce(formel) + ' er ett grunnstoff, ikke en forbindelse. Svaret er bare navnet på grunnstoffet: **' + navn + '**.')];
    const a = analyserSalt(formel);
    if (a) return saltForklaring(a, formel, navn, 'navn');
    return molekylForklaring(formel, navn, 'navn');
  }

  function formelSteg(q) {
    const formel = q.svar;
    if (C.parse(formel).ladning) return ionForklaring(formel);
    if (/^[A-Z][a-z]?$/.test(formel)) return [f('**' + q.navn + '** er et grunnstoff. Svaret er bare symbolet: **' + formel + '**.')];
    const a = analyserSalt(formel);
    if (a) return saltForklaring(a, formel, q.navn, 'formel');
    return molekylForklaring(formel, q.navn, 'formel');
  }

  function saltSteg(q) {
    const b = KJ.byggSalt(q.kation, q.anion);
    const k = C.parse(q.kation);
    const a = C.parse(q.anion);
    const mult = b.nk * b.qk;
    return [
      f('Ionene er ' + ce(q.kation) + ' (ladning ' + lad(b.qk) + ') og ' + ce(q.anion) + ' (ladning ' + lad(b.qa) + ').'),
      f('Saltet må være elektrisk nøytralt: den positive og den negative ladningen må være like store. Finn det minste tallet begge ladningene går opp i: **' + mult + '**.'),
      f(b.nk + ' ' + ce(k.ce) + ' gir ' + lad(b.nk * b.qk) + ', og ' + b.na + ' ' + ce(a.ce) + ' gir ' + lad(b.na * b.qa) + '. Summen er 0.'),
      f('Skriv kationet først og antallene som indekser. ' + (/\(/.test(b.formel) ? 'Sammensatte ioner settes i parentes når det er mer enn ett. ' : '') + 'Formel: ' + ce(b.formel) + '.'),
    ];
  }

  function balanserSteg(q) {
    const alle = q.reaktanter.concat(q.produkter);
    const v1 = q.reaktanter.map((fo) => ({ koef: 1, formel: fo }));
    const h1 = q.produkter.map((fo) => ({ koef: 1, formel: fo }));
    const v = q.reaktanter.map((fo, i) => ({ koef: q.svar[i], formel: fo }));
    const h = q.produkter.map((fo, i) => ({ koef: q.svar[q.reaktanter.length + i], formel: fo }));
    const for1 = C.balanse(v1, h1);
    const etter = C.balanse(v, h);
    const likn = (sider) => sider.map((s) => (s.koef > 1 ? s.koef : '') + s.formel).join(' + ');
    const ioner = Object.keys(sammensatte()).filter((ion) => ion.length > 2 && alle.filter((fo) => fo.includes(ion)).length >= 2);
    const strategi = 'Endre bare **koeffisientene** (tallene foran formlene), aldri indeksene. ' + (ioner.length ? 'Behold ' + ioner.map((i) => ce(i)).join(' og ') + ' som én enhet, fordi ionet finnes på begge sider. ' : '') + 'Start med grunnstoffet som bare finnes i ett stoff på hver side (ofte metallet eller C), og ta H og O til slutt.';
    const tabell = (b) => (KJ.atomTabell ? KJ.atomTabell(b) : '');
    const perEl = etter.rader.map((r) => {
      const telle = (sider) =>
        sider
          .filter((s) => (C.parse(s.formel).antall[r.el] || 0) > 0)
          .map((s) => s.koef + ' · ' + C.parse(s.formel).antall[r.el])
          .join(' + ');
      return r.el + ': venstre ' + telle(v) + ' = ' + r.v + ', høyre ' + telle(h) + ' = ' + r.h;
    });
    return [
      f('Tell atomene på hver side før du begynner. Røde rader stemmer ikke:') + tabell(for1),
      f(strategi),
      f('Koeffisientene som gjør at alt stemmer: ' + ce(likn(v) + ' -> ' + likn(h)) + '.'),
      f('Kontroll, atom for atom (koeffisient · antall i formelen):') + '<ul class="steg-liste">' + perEl.map((x) => '<li>' + f(x) + '</li>').join('') + '</ul>',
      f('Nå er det like mange atomer av hvert grunnstoff på begge sider:') + tabell(etter),
    ];
  }

  function konfigSteg(q) {
    const e = KJ.grunnstoffMap[q.grunnstoff];
    const ql = q.ladning || 0;
    const atom = C.konfig(e.z, 0);
    const k = C.konfig(e.z, ql);
    const n = e.z - ql;
    const navn = ql ? ce(ionCe(e.sym, ql)) : e.navn + ' (' + e.sym + ')';
    const s = [];
    s.push(f(navn + ': ' + e.navn + ' har atomnummer ' + e.z + ', så atomet har **' + e.z + ' elektroner**.' + (ql > 0 ? ' Ladningen ' + ql + '+ betyr ' + ql + ' elektron' + (ql > 1 ? 'er' : '') + ' færre: **' + n + '**.' : ql < 0 ? ' Ladningen ' + -ql + '− betyr ' + -ql + ' elektron' + (-ql > 1 ? 'er' : '') + ' ekstra: **' + n + '**.' : '')));
    // Fylling av atomet (for negative ioner fylles alle elektronene direkte)
    const fyll = ql < 0 ? k : atom;
    let sum = 0;
    const deler = C.REKKE.filter((o) => fyll[o]).map((o) => {
      sum += fyll[o];
      return '\\mathrm{' + o + '}^{' + fyll[o] + '}\\,(' + sum + ')';
    });
    s.push(f('Fyll underskallene i rekkefølgen 1s, 2s, 2p, 3s, 3p, **4s, 3d**, 4p … Et s-underskall har plass til 2, p til 6 og d til 10 elektroner. Tallet i parentes er hvor mange elektroner du har plassert så langt:') + '<p class="steg-tex">' + KJ.tex(deler.join('\\;')) + '</p>');
    if ([24, 29].includes(e.z)) s.push(f('**Unntak:** ' + e.navn + ' flytter ett elektron fra 4s til 3d, fordi et ' + (e.z === 24 ? 'halvfullt' : 'fullt') + ' 3d-underskall er ekstra stabilt: $' + C.konfigTex(atom, true) + '$.'));
    if (ql > 0) {
      if (e.blokk === 'd') s.push(f('Når ' + e.sym + ' danner et positivt ion, avgis elektronene med **høyest n først**. Innskuddsmetaller avgir derfor **4s-elektronene før 3d-elektronene**' + (ql > 2 ? ', og resten tas fra 3d' : '') + '.'));
      else s.push(f(e.sym + ' avgir ' + ql + ' elektron' + (ql > 1 ? 'er' : '') + ' fra det ytterste skallet og får samme konfigurasjon som edelgassen foran.'));
    } else if (ql < 0) s.push(f(e.sym + ' tar opp ' + -ql + ' elektron' + (-ql > 1 ? 'er' : '') + ' og får full oktett, samme konfigurasjon som edelgassen etter.'));
    s.push(f('Svar: $' + C.konfigTex(k, false) + '$' + (C.sumE(k) > 2 ? '. Med edelgasskjerne: $' + C.konfigTex(k, true) + '$.' : '.')));
    return s;
  }

  function orbitalSteg(q) {
    const s = konfigSteg(q);
    const L = KJ.orbitalOppsett(q);
    const delvis = L.rader.filter((r) => r.forventet > 0 && r.forventet < 2 * r.bokser && r.bokser > 1);
    s.push(f('**Pauliprinsippet:** hver boks (orbital) har plass til maks to elektroner, og de må ha motsatt spinn (↑↓).'));
    if (delvis.length) {
      const r = delvis[0];
      const tekst =
        r.forventet > r.bokser
          ? 'Først får hver av de ' + r.bokser + ' boksene ett elektron med samme spinn (↑). De ' + (r.forventet - r.bokser) + ' siste elektronene pares (↑↓).'
          : 'Hvert elektron får sin egen boks med samme spinn (↑), og ingen pares.';
      s.push(f('**Hunds regel:** i ' + r.orb + ' er det ' + r.forventet + ' elektron' + (r.forventet > 1 ? 'er' : '') + ' fordelt på ' + r.bokser + ' bokser. ' + tekst));
    } else s.push(f('**Hunds regel** gjelder når et p- eller d-underskall er delvis fylt: ett elektron i hver boks med samme spinn før noen får to. Her er alle underskallene enten fulle eller tomme.'));
    return s;
  }

  KJ.autoSteg = function (q) {
    try {
      switch (q.type) {
        case 'navn':
          return navnSteg(q);
        case 'formel':
          return formelSteg(q);
        case 'salt':
          return saltSteg(q);
        case 'balanser':
          return balanserSteg(q);
        case 'konfig':
          return konfigSteg(q);
        case 'orbital':
          return orbitalSteg(q);
      }
    } catch (e) {
      return null;
    }
    return null;
  };
  KJ.analyserSalt = analyserSalt;
})(window.KJ);
