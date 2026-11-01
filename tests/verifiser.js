/*
 * Automatisk kontroll av datafilene og rettemotoren.
 * Kjør med:  node tests/verifiser.js
 *
 * Sjekker blant annet at
 *  - alle oppgave-id-er er unike og alle felt er gyldige
 *  - alle balanseringsfasiter faktisk er balansert og har minste hele tall
 *  - alle formler i fasitene kan tolkes
 *  - alle regneoppgaver med verify-funksjon gir samme svar som fasiten
 *  - rettemotoren godtar fasiten og avviser typiske feil
 *  - alle oppgaver har gyldige læringsmål, og alle læringsmål har oppgaver
 *  - alle saltformler (fasiter og formler i oppgavene) er elektrisk nøytrale
 *  - alle reaksjonslikninger med koeffisienter i teori og oppgavetekster er balansert
 *  - ionene i data/ioner.js har riktig ladning
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROT, 'index.html'), 'utf8');
const skript = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]).filter((s) => !s.includes('vendor/'));

const ctx = { console, setTimeout, clearTimeout, Math, JSON, Date };
ctx.window = ctx;
ctx.localStorage = { getItem: () => null, setItem: () => {} };
ctx.addEventListener = () => {};
ctx.document = { getElementById: () => null };
vm.createContext(ctx);
for (const s of skript) {
  if (/js\/views|js\/app\.js|question\.js/.test(s)) continue;
  vm.runInContext(fs.readFileSync(path.join(ROT, s), 'utf8'), ctx, { filename: s });
}
const KJ = ctx.KJ;
const C = KJ.kjemi;

let feil = 0;
let ok = 0;
const feilet = (msg) => {
  feil++;
  console.log('  ✗ ' + msg);
};
const sjekk = (betingelse, msg) => (betingelse ? ok++ : feilet(msg));

console.log('Moduler: ' + KJ.temaer.length + ', læringsmål: ' + KJ.MAL.length);
const ider = new Set();
const saltFormler = [];
const typer = {};
let antKort = 0;
for (const t of KJ.temaer) {
  sjekk([1, 2, 3].every((n) => t.oppgaver.some((q) => q.niva === n)) || t.oppgaver.length < 10, t.id + ': oppgaver på alle tre nivåer');
  sjekk(t.feller.length >= 2, t.id + ': boks med vanlige feil');
  sjekk(t.mal.length >= 1 && t.mal.every((nr) => KJ.malInfo(nr)), t.id + ': gyldige læringsmål');
  antKort += t.flashcards.length;
  for (const q of t.oppgaver) {
    const hvor = t.id + '/' + q.id;
    sjekk(!ider.has(q.id), hvor + ': duplikat-id');
    ider.add(q.id);
    sjekk([1, 2, 3].includes(q.niva), hvor + ': ugyldig nivå');
    sjekk(Array.isArray(q.mal) && q.mal.length && q.mal.every((nr) => nr >= 1 && nr <= 20), hvor + ': mangler gyldig læringsmål');
    sjekk(!!KJ.TYPENAVN[q.type], hvor + ': ukjent type ' + q.type);
    typer[q.type] = (typer[q.type] || 0) + 1;
    const instanser = q.type === 'gen' ? Array.from({ length: 60 }, () => KJ.generer(q)) : [q];
    for (const q of instanser) {
    try {
      switch (q.type) {
        case 'flervalg': {
          const idx = [].concat(q.svar);
          sjekk(idx.every((i) => i >= 0 && i < q.alternativer.length), hvor + ': svarindeks utenfor');
          sjekk(KJ.rett(q, q.svar).riktig, hvor + ': fasit rettes ikke som riktig');
          const galt = Array.isArray(q.svar) ? [q.alternativer.findIndex((_, i) => !q.svar.includes(i))] : (q.svar + 1) % q.alternativer.length;
          sjekk(!KJ.rett(q, galt).riktig, hvor + ': galt svar godtas');
          break;
        }
        case 'fyllinn': {
          const blanks = (q.tekst || q.svar.map(() => '___').join(' ')).split('___').length - 1;
          sjekk(blanks === q.svar.length, hvor + ': antall felt (' + blanks + ') ≠ antall svar (' + q.svar.length + ')');
          sjekk(KJ.rett(q, q.svar.map((a) => [].concat(a)[0])).riktig, hvor + ': fasit rettes ikke som riktig');
          [].concat(...q.svar).length && q.svar.forEach((a) => [].concat(a).forEach((v, i) => {
            const svar = q.svar.map((b) => [].concat(b)[0]);
            svar[q.svar.indexOf(a)] = v;
            sjekk(KJ.rett(q, svar).riktig, hvor + ': variant «' + v + '» godtas ikke');
          }));
          sjekk(!KJ.rett(q, q.svar.map(() => 'xyz')).riktig, hvor + ': tull godtas');
          break;
        }
        case 'tall': {
          sjekk(typeof q.svar === 'number' && isFinite(q.svar), hvor + ': svar er ikke et tall');
          if (q.verify) {
            const v = q.verify(C);
            const tol = q.abs != null ? q.abs : Math.abs(q.svar) * 0.002;
            sjekk(Math.abs(v - q.svar) <= Math.max(tol, 1e-9), hvor + ': verify gir ' + v + ', fasit ' + q.svar);
          } else if (!q.heltall && q.abs == null) {
            console.log('  · ' + hvor + ': mangler verify (kontroller manuelt)');
          }
          if (!q.heltall && q.abs == null && !q.verify) feilet(hvor + ': desimalsvar uten verify');
          // Fasit med gs gjeldende siffer, norsk komma, skal godtas
          const fasitTekst = q.heltall ? String(q.svar) : fasitStreng(q.svar, q.gs || 3);
          const svar = { verdi: fasitTekst, enhet: q.enhet || '' };
          sjekk(KJ.rett(q, svar).riktig, hvor + ': fasit «' + fasitTekst + ' ' + (q.enhet || '') + '» godtas ikke (' + KJ.rett(q, svar).melding + ')');
          if (q.enhet) sjekk(!KJ.rett(q, { verdi: fasitTekst, enhet: '' }).riktig, hvor + ': svar uten enhet godtas');
          sjekk(!KJ.rett(q, { verdi: String(q.svar * 1.5), enhet: q.enhet || '' }).riktig, hvor + ': feil tall godtas');
          if (q.enhet) sjekk(!!KJ.enhet(q.enhet), hvor + ': ukjent enhet ' + q.enhet);
          sjekk(q.steg && q.steg.length > 0, hvor + ': regneoppgave mangler løsningsforslag');
          break;
        }
        case 'balanser': {
          const v = q.reaktanter.map((f, i) => ({ koef: q.svar[i], formel: f }));
          const h = q.produkter.map((f, i) => ({ koef: q.svar[q.reaktanter.length + i], formel: f }));
          const b = C.balanse(v, h);
          sjekk(b.balansert, hvor + ': fasit er ikke balansert ' + JSON.stringify(b.rader));
          sjekk(q.svar.reduce((a, x) => C.gcd(a, x)) === 1, hvor + ': ikke minste hele tall');
          sjekk(q.svar.length === q.reaktanter.length + q.produkter.length, hvor + ': feil antall koeffisienter');
          sjekk(KJ.rett(q, q.svar.map((x) => (x === 1 ? '' : String(x)))).riktig, hvor + ': fasit rettes ikke som riktig');
          sjekk(KJ.rett(q, q.svar.map((x) => String(x))).riktig, hvor + ': fasit med 1-tall rettes ikke som riktig');
          sjekk(!KJ.rett(q, q.svar.map((x) => String(x * 2))).riktig, hvor + ': doblet fasit godtas som helt riktig');
          sjekk(!KJ.rett(q, q.svar.map(() => '')).riktig || q.svar.every((x) => x === 1), hvor + ': tomme felt godtas');
          break;
        }
        case 'navn': {
          C.parse(q.formel);
          sjekk(KJ.rett(q, [].concat(q.svar)[0]).riktig, hvor + ': fasit godtas ikke');
          sjekk(KJ.rett(q, [].concat(q.svar)[0].toUpperCase()).riktig, hvor + ': store bokstaver godtas ikke');
          sjekk(!KJ.rett(q, 'natriumklorid' === [].concat(q.svar)[0] ? 'kaliumklorid' : 'natriumklorid').riktig, hvor + ': galt navn godtas');
          break;
        }
        case 'formel': {
          const p = C.parse(q.svar);
          sjekk(p.ladning !== 0 || p.kanon === q.svar.replace('*', '·') || q.rekkefolge === false, hvor + ': fasit er ikke på kanonisk form (' + p.kanon + ')');
          sjekk(KJ.rett(q, q.svar).riktig, hvor + ': fasit godtas ikke');
          sjekk(!KJ.rett(q, 'NaCl').riktig || q.svar === 'NaCl', hvor + ': NaCl godtas');
          break;
        }
        case 'kobling': {
          sjekk(q.par.length >= 3, hvor + ': for få par');
          sjekk(new Set(q.par.map((p) => p[1])).size === q.par.length, hvor + ': like svar i høyre kolonne');
          sjekk(KJ.rett(q, q.par.map((_, i) => i)).riktig, hvor + ': fasit godtas ikke');
          break;
        }
        case 'rekkefolge': {
          const orden = q.elementer.map((_, i) => i);
          if (q.begrunnelse) {
            sjekk(KJ.rett(q, { orden, begr: q.begrunnelse.svar }).riktig, hvor + ': fasit med begrunnelse godtas ikke');
            sjekk(!KJ.rett(q, { orden, begr: (q.begrunnelse.svar + 1) % q.begrunnelse.alternativer.length }).riktig, hvor + ': feil begrunnelse godtas');
            sjekk(!KJ.rett(q, { orden: orden.slice().reverse(), begr: q.begrunnelse.svar }).riktig, hvor + ': omvendt godtas');
          } else {
            sjekk(KJ.rett(q, orden).riktig, hvor + ': fasit godtas ikke');
            sjekk(!KJ.rett(q, orden.slice().reverse()).riktig, hvor + ': omvendt godtas');
          }
          break;
        }
        case 'salt': {
          const b = KJ.byggSalt(q.kation, q.anion);
          sjekk(b.nk * b.qk + b.na * b.qa === 0, hvor + ': saltet ' + b.formel + ' er ikke nøytralt');
          sjekk(C.parse(q.kation).ladning > 0 && C.parse(q.anion).ladning < 0, hvor + ': kation/anion har feil fortegn');
          const svar = { nk: b.nk, na: b.na, lk: q.visIoner ? null : String(b.qk) , la: q.visIoner ? null : String(b.qa), formel: b.formel };
          sjekk(KJ.rett(q, svar).riktig, hvor + ': fasit for ' + q.navn + ' (' + b.formel + ') godtas ikke');
          sjekk(!KJ.rett(q, Object.assign({}, svar, { nk: b.nk + 1 })).riktig, hvor + ': feil antall godtas');
          saltFormler.push([hvor, b.formel]);
          break;
        }
        case 'orbital': {
          const L = KJ.orbitalOppsett(q);
          const bokser = {};
          L.rader.forEach((r) => (bokser[r.orb] = KJ.fyllOrbitalRad(r.bokser, r.forventet)));
          const ascii = (t) => t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => m.split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join(''));
          const svar = { bokser, full: ascii(C.konfigTekst(L.k, false)), edel: ascii(C.konfigTekst(L.k, true)) };
          sjekk(KJ.rett(q, svar).riktig, hvor + ': riktig orbitaldiagram godtas ikke');
          sjekk(C.sumE(L.k) === L.n && L.rader.reduce((a, r) => a + r.forventet, 0) + L.kjerneE === L.n, hvor + ': feil antall elektroner i oppsettet');
          // Hund-brudd: par i en orbital mens en annen er tom
          const r = L.rader.find((x) => x.bokser > 1 && x.forventet >= 2 && x.forventet < x.bokser);
          if (r) {
            const feil = JSON.parse(JSON.stringify(bokser));
            feil[r.orb] = KJ.fyllOrbitalRad(r.bokser, 0);
            feil[r.orb][0] = 'ud';
            for (let i = 2; i < r.forventet; i++) feil[r.orb][i - 1] = 'u';
            const res = KJ.rett(q, Object.assign({}, svar, { bokser: feil }));
            sjekk(!res.riktig && /Hund/.test(res.melding), hvor + ': brudd på Hunds regel oppdages ikke');
          }
          // Pauli-brudd
          const rp = L.rader.find((x) => x.forventet >= 2);
          if (rp) {
            const feil = JSON.parse(JSON.stringify(bokser));
            const j = feil[rp.orb].indexOf('ud');
            if (j >= 0) {
              feil[rp.orb][j] = 'uu';
              const res = KJ.rett(q, Object.assign({}, svar, { bokser: feil }));
              sjekk(!res.riktig && /Pauli/.test(res.melding), hvor + ': brudd på Paulis prinsipp oppdages ikke');
            }
          }
          break;
        }
        case 'sortering':
          sjekk(q.elementer.every((e) => e[1] >= 0 && e[1] < q.kategorier.length), hvor + ': kategori utenfor');
          sjekk(KJ.rett(q, q.elementer.map((e) => e[1])).riktig, hvor + ': fasit godtas ikke');
          break;
        case 'konfig': {
          const e = KJ.grunnstoffMap[q.grunnstoff];
          sjekk(!!e, hvor + ': ukjent grunnstoff');
          const k = C.konfig(e.z, q.ladning || 0);
          const tekst = C.konfigTekst(k, true);
          sjekk(KJ.rett(q, tekst).riktig, hvor + ': edelgassfasit «' + tekst + '» godtas ikke');
          const ascii = C.konfigTekst(k, false).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => m.split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join(''));
          sjekk(KJ.rett(q, ascii).riktig, hvor + ': full ASCII-fasit «' + ascii + '» godtas ikke');
          sjekk(KJ.rett(q, ascii.replace(/\s+/g, '')).riktig, hvor + ': fasit uten mellomrom «' + ascii.replace(/\s+/g, '') + '» godtas ikke');
          sjekk(q.steg && q.steg.length, hvor + ': mangler løsningsforslag');
          break;
        }
        case 'forklaring':
          sjekk(q.modellsvar && q.modellsvar.length > 100, hvor + ': for kort modellsvar');
          sjekk(q.punkter && q.punkter.length >= 3, hvor + ': for få vurderingspunkter');
          sjekk(KJ.rett(q, { kryss: q.punkter.map(() => true) }).riktig, hvor + ': alle kryss gir ikke riktig');
          break;
      }
    } catch (e) {
      feilet(hvor + ': unntak ' + e.message);
    }
    }
  }
}

function fasitStreng(x, gs) {
  if (x === 0) return '0';
  const exp = Math.floor(Math.log10(Math.abs(x)));
  if (exp >= 5 || exp <= -4) return (x / Math.pow(10, exp)).toFixed(Math.max(0, gs - 1)).replace('.', ',') + '·10^' + exp;
  return x.toFixed(Math.max(0, gs - 1 - exp)).replace('.', ',');
}

/* ---------- Læringsmål ---------- */
console.log('\nLæringsmål');
KJ.MAL.forEach((m) => {
  const n = KJ.malOppgaver(m.nr).length;
  sjekk(n >= 1, 'mål ' + m.nr + ' har oppgaver');
  console.log('  mål ' + String(m.nr).padStart(2) + ': ' + String(n).padStart(3) + ' oppgaver  ' + m.kort);
});

/* ---------- Ionene ---------- */
console.log('\nIoner');
KJ.IONER.forEach((i) => {
  const p = C.parse(i.formel);
  sjekk(p.ladning === i.ladning, 'ion ' + i.formel + ': ladning ' + p.ladning + ' ≠ ' + i.ladning);
});
sjekk(KJ.tavlaIoner().length === 9, 'ni ioner fra tavla er aktive');

/* ---------- Saltformler er nøytrale ---------- */
console.log('\nSaltformler');
const KATIONER = ['Li+', 'Na+', 'K+', 'Ag+', 'Cu+', 'NH4+', 'Mg^2+', 'Ca^2+', 'Ba^2+', 'Zn^2+', 'Cu^2+', 'Fe^2+', 'Mn^2+', 'Co^2+', 'Ni^2+', 'Pb^2+', 'Sn^2+', 'Fe^3+', 'Al^3+', 'Cr^3+', 'Sc^3+', 'Pb^4+', 'Sn^4+', 'Mn^4+', 'Ti^4+'];
const ANIONER = ['F-', 'Cl-', 'Br-', 'I-', 'H-', 'O^2-', 'S^2-', 'N^3-', 'P^3-'].concat(KJ.IONER.map((i) => i.formel));
function del(f) {
  const p = C.parse(f);
  return { kropp: p.kanon.replace(/\^.*$/, ''), q: p.ladning, flere: Object.values(p.antall).reduce((a, b) => a + b, 0) > 1 };
}
function bygg(k, a) {
  const K = del(k);
  const A = del(a);
  const g = C.gcd(Math.abs(K.q), Math.abs(A.q));
  const nk = Math.abs(A.q) / g;
  const na = Math.abs(K.q) / g;
  const ledd = (x, n) => (n === 1 ? x.kropp : x.flere ? '(' + x.kropp + ')' + n : x.kropp + n);
  return { formel: ledd(K, nk) + ledd(A, na), sum: nk * K.q + na * A.q };
}
const SALT = {};
KATIONER.forEach((k) => ANIONER.forEach((a) => {
  const b = bygg(k, a);
  const kanon = C.parse(b.formel).kanon;
  (SALT[kanon] = SALT[kanon] || []).push({ k, a, sum: b.sum });
}));
const erSalt = (p) => Object.keys(p.antall).some((el) => ['alk', 'jal', 'inn', 'met'].includes(KJ.grunnstoffMap[el].kat)) || /NH4/.test(p.kanon);
let antSalt = 0;
KJ.alleOppgaver().forEach((q) => {
  const formler = [];
  if (q.type === 'formel') formler.push(q.svar);
  if (q.type === 'navn') formler.push(q.formel);
  formler.forEach((f) => {
    const p = C.parse(f);
    if (p.ladning !== 0 || !erSalt(p) || Object.keys(p.antall).length < 2) return;
    antSalt++;
    const treff = SALT[p.kanon];
    sjekk(treff && treff.every((t) => t.sum === 0), q.id + ': saltformel ' + f + ' kan ikke bekreftes som nøytral');
  });
});
saltFormler.forEach(([hvor, f]) => {
  antSalt++;
  sjekk(SALT[C.parse(f).kanon] && SALT[C.parse(f).kanon].every((t) => t.sum === 0), hvor + ': saltbyggerformel ' + f + ' kan ikke bekreftes som nøytral');
});
console.log('  ' + antSalt + ' saltformler kontrollert (inkludert saltbyggeren)');

/* ---------- Likninger i tekst ---------- */
console.log('\nLikninger i tekst');
let antLikn = 0;
const tekster = [];
const samle = (v) => {
  if (typeof v === 'string') tekster.push(v);
  else if (Array.isArray(v)) v.forEach(samle);
  else if (v && typeof v === 'object') Object.values(v).forEach(samle);
};
KJ.moduler.forEach((m) => samle([m.teori, m.eksempler, m.feller, m.oppgaver, m.flashcards, m.begreper]));
samle(KJ.formelark);
tekster.forEach((t) => {
  for (const mm of t.matchAll(/\{\{([^}]*->[^}]*)\}\}/g)) {
    let l;
    try {
      l = C.parseLikning(mm[1]);
    } catch (e) {
      continue; // brøk-koeffisienter o.l.
    }
    const b = C.balanse(l.venstre, l.hoyre);
    const harKoef = l.venstre.concat(l.hoyre).some((x) => x.koef > 1);
    if (!harKoef && !b.balansert) continue; // skjelettlikning som skal balanseres
    antLikn++;
    sjekk(b.balansert, 'likning i tekst er ikke balansert: ' + mm[1]);
  }
});
console.log('  ' + antLikn + ' likninger i tekst kontrollert');

/* ---------- Orbitaldiagram: innskuddsmetaller ---------- */
{
  const q = { type: 'orbital', grunnstoff: 'Fe', ladning: 2 };
  const L = KJ.orbitalOppsett(q);
  const b = {};
  L.rader.forEach((r) => (b[r.orb] = KJ.fyllOrbitalRad(r.bokser, 0)));
  b['4s'] = ['ud'];
  b['3d'] = KJ.fyllOrbitalRad(5, 4);
  const res = KJ.rett(q, { bokser: b });
  sjekk(!res.riktig && /4s-elektronene først/.test(res.melding), 'Fe²⁺ med 4s² 3d⁴ gir melding om at 4s avgis først');
}

/* ---------- Kjemimotoren ---------- */
console.log('\nKjemimotor');
const mm = [
  ['H2O', 18.016], ['NaCl', 58.44], ['Al2(SO4)3', 342.14], ['CuSO4*5H2O', 249.686], ['Ca(OH)2', 74.096], ['(NH4)2SO4', 132.134],
  ['C6H12O6', 180.156], ['K4[Fe(CN)6]', 368.35],
];
mm.forEach(([f, m]) => sjekk(Math.abs(C.M(f) - m) < 0.02, 'M(' + f + ') = ' + C.M(f) + ', forventet ' + m));
sjekk(C.parse('SO4^2-').ladning === -2, 'ladning SO4^2-');
sjekk(C.parse('SO₄²⁻').ladning === -2, 'ladning SO₄²⁻');
sjekk(C.parse('NH4+').ladning === 1 && C.parse('NH4+').antall.H === 4, 'NH4+');
sjekk(C.parse('Fe^3+').ladning === 3, 'Fe^3+');
sjekk(C.parse('SO4 2-').ladning === -2, 'SO4 2-');
sjekk(C.tolkninger('SO42-').some((t) => t.kanon === 'SO4^2-'), 'SO42- tolkes som sulfat');
sjekk(C.parse('CuSO4.5H2O').antall.H === 10, 'hydrat med punktum');
let kastet = false;
try { C.parse('nacl'); } catch (e) { kastet = e.kjemi; }
sjekk(kastet, 'små bokstaver gir feilmelding');
const lk = C.parseLikning('2Al(OH)3 + 3H2SO4 -> Al2(SO4)3 + 6H2O');
sjekk(C.balanse(lk.venstre, lk.hoyre).balansert, 'balansert likning fra tekst');
const lk2 = C.parseLikning('Ag+ + Cl- → AgCl(s)');
sjekk(C.balanse(lk2.venstre, lk2.hoyre).balansert, 'ionelikning med pil og tilstand');
const lk3 = C.parseLikning('H2 + O2 -> H2O');
sjekk(!C.balanse(lk3.venstre, lk3.hoyre).balansert, 'ubalansert oppdages');
// Konfigurasjoner
const kf = (sym, q) => C.konfigTekst(C.konfig(KJ.grunnstoffMap[sym].z, q || 0), true);
[['Na', 0, '[Ne] 3s¹'], ['Fe', 0, '[Ar] 4s² 3d⁶'], ['Cu', 0, '[Ar] 4s¹ 3d¹⁰'], ['Cr', 0, '[Ar] 4s¹ 3d⁵'], ['Fe', 3, '[Ar] 3d⁵'], ['Ga', 0, '[Ar] 4s² 3d¹⁰ 4p¹'], ['S', -2, '[Ne] 3s² 3p⁶'], ['Pd', 0, '[Kr] 4d¹⁰'], ['Al', 3, '[He] 2s² 2p⁶'], ['Sn', 2, '[Kr] 5s² 4d¹⁰']].forEach(([s, q, f]) =>
  sjekk(kf(s, q) === f, 'konfig ' + s + (q ? ' ' + q : '') + ': ' + kf(s, q) + ' ≠ ' + f)
);
sjekk(C.likeKonfig(C.parseKonfig('1s22s22p63s23p64s23d104p1'), C.konfig(31, 0)), 'Ga uten mellomrom');
sjekk(C.likeKonfig(C.parseKonfig('[Xe]6s24f145d106p2'), C.konfig(82, 0)), 'Pb uten mellomrom');
sjekk(C.likeKonfig(C.parseKonfig('[Ar] 3d10 4s1'), C.konfig(29, 0)), 'Cu i annen rekkefølge');
// Alle 118 grunnstoffer har riktig antall elektroner og gyldig posisjon
sjekk(KJ.grunnstoffer.length === 118, '118 grunnstoffer');
KJ.grunnstoffer.forEach((e) => {
  sjekk(C.sumE(C.konfig(e.z, 0)) === e.z, e.sym + ': feil antall elektroner');
  sjekk(e.gruppe != null || e.frad != null, e.sym + ': mangler plassering');
});
const pos = (s) => KJ.grunnstoffMap[s];
sjekk(pos('Hf').gruppe === 4 && pos('Hf').periode === 6, 'Hf i gruppe 4');
sjekk(pos('Og').gruppe === 18 && pos('Og').periode === 7, 'Og i gruppe 18');
sjekk(pos('Al').gruppe === 13 && pos('Ga').gruppe === 13, 'Al/Ga i gruppe 13');
sjekk(pos('Lu').frad === 14 && pos('La').frad === 0, 'f-rad La–Lu');
// Tallparser
[['0,250', 0.25], ['6,02e23', 6.02e23], ['6,02·10^23', 6.02e23], ['6,02 × 10²³', 6.02e23], ['1,20*10^-3', 1.2e-3], ['-3,5', -3.5], ['2.5E-4', 2.5e-4]].forEach(([s, v]) =>
  sjekk(Math.abs(KJ.parseTall(s) - v) <= Math.abs(v) * 1e-9, 'parseTall(' + s + ') = ' + KJ.parseTall(s))
);
// Enhetskonvertering: 250 mL for 0,250 L
const qv = { type: 'tall', svar: 0.25, enhet: 'L' };
sjekk(KJ.rett(qv, { verdi: '250', enhet: 'mL' }).riktig, '250 mL = 0,250 L');
const qm = { type: 'tall', svar: 58.44, enhet: 'g/mol' };
sjekk(KJ.rett(qm, { verdi: '58,44', enhet: 'g mol^-1' }).riktig, 'g mol^-1');
sjekk(KJ.rett(qm, { verdi: '58,44', enhet: 'g·mol⁻¹' }).riktig, 'g·mol⁻¹');
sjekk(!KJ.rett(qm, { verdi: '58,44', enhet: 'mol' }).riktig, 'feil enhet avvises');
const qc = { type: 'tall', svar: 0.5, enhet: 'mol/L' };
sjekk(KJ.rett(qc, { verdi: '0,500', enhet: 'M' }).riktig, 'M = mol/L');
// Navn med varianter
const qn = { type: 'navn', formel: 'N2O4', svar: ['dinitrogentetraoksid'] };
sjekk(KJ.rett(qn, 'dinitrogentetroksid').riktig, 'tetroksid godtas');
sjekk(KJ.rett(qn, 'Dinitrogen-tetraoksid').riktig, 'bindestrek godtas');
const qf = { type: 'navn', formel: 'FeCl3', svar: ['jern(III)klorid'] };
sjekk(KJ.rett(qf, 'jern (III) klorid').riktig, 'mellomrom rundt romertall');
sjekk(!KJ.rett(qf, 'jern(3)klorid').riktig, 'arabertall avvises');
sjekk(!KJ.rett(qf, 'jernklorid').riktig, 'manglende romertall avvises');
// Formelretting
const qfo = { type: 'formel', navn: 'aluminiumsulfat', svar: 'Al2(SO4)3' };
sjekk(KJ.rett(qfo, 'Al₂(SO₄)₃').riktig, 'unicode-formel godtas');
sjekk(!KJ.rett(qfo, 'Al2S3O12').riktig, 'formel uten parentes avvises');
sjekk(KJ.rett(qfo, 'Al2S3O12').andel === 0.5, 'formel uten parentes gir delvis riktig');

console.log('\nOppgavetyper: ' + JSON.stringify(typer));
console.log('Oppgaver: ' + ider.size + ', flashcards: ' + antKort);
console.log('\n' + ok + ' kontroller OK, ' + feil + ' feil.');
process.exit(feil ? 1 : 0);
