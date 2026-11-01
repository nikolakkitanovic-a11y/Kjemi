/*
 * Generatorer: oppgaver med tilfeldige verdier («Ny variant»).
 * En oppgave av typen 'gen' har feltet «kilde». Generatoren lager en vanlig oppgave
 * (fyllinn, navn, formel …) med samme id, så fremdrift og feilbank virker som før.
 */
(function (KJ) {
  'use strict';
  const C = KJ.kjemi;
  const tilf = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const lt = (q) => (q === 0 ? '0' : (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '−'));
  const ladningVarianter = (q) => {
    if (q === 0) return ['0', 'nøytral', 'ingen'];
    const n = Math.abs(q);
    const t = q > 0 ? '+' : '-';
    const v = [n + t, t + n];
    if (n === 1) v.push(t, '1' + t, t + '1');
    return v;
  };
  const ionCe = (sym, q) => sym + (q ? '^' + (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '-') : '');

  /* Vanlige isotoper og ioner (Z, symbol, massetall, ladninger) */
  const ISOTOPER = [
    ['H', [1, 2, 3], [1, -1]], ['Li', [6, 7], [1]], ['Be', [9], [2]], ['B', [10, 11], [3]], ['C', [12, 13, 14], [0]], ['N', [14, 15], [-3]], ['O', [16, 17, 18], [-2]],
    ['F', [19], [-1]], ['Na', [23], [1]], ['Mg', [24, 25, 26], [2]], ['Al', [27], [3]], ['Si', [28, 29, 30], [0]], ['P', [31], [-3]], ['S', [32, 33, 34], [-2]],
    ['Cl', [35, 37], [-1]], ['K', [39, 40, 41], [1]], ['Ca', [40, 42, 44], [2]], ['Fe', [54, 56, 57], [2, 3]], ['Cu', [63, 65], [1, 2]], ['Zn', [64, 66, 68], [2]],
    ['Br', [79, 81], [-1]], ['Ag', [107, 109], [1]], ['I', [127], [-1]], ['Ba', [137, 138], [2]], ['Pb', [206, 207, 208], [2, 4]], ['U', [235, 238], [0]],
    ['Mn', [55], [2]], ['Ni', [58, 60], [2]], ['Cr', [52], [3]], ['Sn', [118, 120], [2, 4]],
  ];

  const GRUNNSTOFFER = ['H', 'He', 'Li', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Fe', 'Cu', 'Zn', 'Br', 'Ag', 'Sn', 'I', 'Ba', 'Au', 'Hg', 'Pb', 'Mn', 'Ni', 'Cr', 'Co', 'U', 'Ti'];

  /* Ioner for «Hvem er jeg?»: atomer (ladning 0) og vanlige ioner */
  const HVEM = [
    ['Li', 0], ['C', 0], ['N', 0], ['O', 0], ['F', 0], ['Ne', 0], ['Na', 0], ['Mg', 0], ['Al', 0], ['Si', 0], ['P', 0], ['S', 0], ['Cl', 0], ['K', 0], ['Ca', 0],
    ['Ti', 0], ['Mn', 0], ['Fe', 0], ['Ni', 0], ['Cu', 0], ['Zn', 0], ['Ga', 0], ['Br', 0],
    ['Na', 1], ['K', 1], ['Mg', 2], ['Ca', 2], ['Al', 3], ['O', -2], ['S', -2], ['N', -3], ['P', -3], ['F', -1], ['Cl', -1], ['Br', -1],
    ['Fe', 2], ['Fe', 3], ['Cu', 1], ['Cu', 2], ['Zn', 2], ['Mn', 2], ['Co', 2], ['Ni', 2], ['Cr', 3], ['Sc', 3], ['Ag', 1],
  ];

  /* Kationer og anioner for saltbyggeren */
  const KATIONER = [
    ['Na+', 'natrium'], ['K+', 'kalium'], ['Li+', 'litium'], ['Ag+', 'sølv'], ['Mg^2+', 'magnesium'], ['Ca^2+', 'kalsium'], ['Ba^2+', 'barium'], ['Zn^2+', 'sink'], ['Al^3+', 'aluminium'],
    ['Fe^2+', 'jern(II)'], ['Fe^3+', 'jern(III)'], ['Cu+', 'kobber(I)'], ['Cu^2+', 'kobber(II)'], ['Pb^2+', 'bly(II)'],
  ];
  const ENKLE_ANIONER = [['F-', 'fluorid'], ['Cl-', 'klorid'], ['Br-', 'bromid'], ['I-', 'jodid'], ['O^2-', 'oksid'], ['S^2-', 'sulfid'], ['N^3-', 'nitrid']];

  function del(f) {
    const p = C.parse(f);
    return { kropp: p.kanon.replace(/\^.*$/, ''), q: p.ladning, flere: Object.values(p.antall).reduce((a, b) => a + b, 0) > 1 };
  }
  /** Bygger saltformelen fra et kation og et anion (minste hele tall). */
  KJ.byggSalt = function (kation, anion) {
    const K = del(kation);
    const A = del(anion);
    const g = C.gcd(Math.abs(K.q), Math.abs(A.q));
    const nk = Math.abs(A.q) / g;
    const na = Math.abs(K.q) / g;
    const ledd = (x, n) => (n === 1 ? x.kropp : x.flere ? '(' + x.kropp + ')' + n : x.kropp + n);
    return { formel: ledd(K, nk) + ledd(A, na), nk, na, qk: K.q, qa: A.q };
  };

  const G = {};

  G['pne-atom'] = function () {
    const [sym, masser] = tilf(ISOTOPER);
    const e = KJ.grunnstoffMap[sym];
    const A = tilf(masser);
    return {
      type: 'fyllinn',
      sporsmal: 'Fyll inn antall partikler i atomet {{^{' + A + '}_{' + e.z + '}' + sym + '}}.',
      tekst: 'Protoner: ___\nNøytroner: ___\nElektroner: ___',
      svar: [[String(e.z)], [String(A - e.z)], [String(e.z)]],
      hint: 'Tallet nede er atomnummeret (protoner). Nøytroner = massetall − atomnummer.',
      steg: ['Protoner = atomnummer = ' + e.z, 'Nøytroner = $' + A + ' - ' + e.z + ' = ' + (A - e.z) + '$', 'Nøytralt atom: elektroner = protoner = ' + e.z],
    };
  };

  G['pne-ion'] = function () {
    const kand = ISOTOPER.filter((x) => x[2].some((q) => q !== 0));
    const [sym, masser, ladninger] = tilf(kand);
    const e = KJ.grunnstoffMap[sym];
    const A = tilf(masser);
    const q = tilf(ladninger.filter((x) => x !== 0));
    const el = e.z - q;
    return {
      type: 'fyllinn',
      sporsmal: 'Fyll inn antall partikler i ionet {{^{' + A + '}_{' + e.z + '}' + ionCe(sym, q) + '}}.',
      tekst: 'Protoner: ___\nNøytroner: ___\nElektroner: ___',
      svar: [[String(e.z)], [String(A - e.z)], [String(el)]],
      hint: ['Ladningen endrer bare antall elektroner.', 'Elektroner = protoner − ladning.'],
      steg: ['Protoner = ' + e.z, 'Nøytroner = $' + A + ' - ' + e.z + ' = ' + (A - e.z) + '$', 'Ladning ' + lt(q) + ': elektroner = $' + e.z + (q > 0 ? ' - ' + q : ' + ' + -q) + ' = ' + el + '$'],
    };
  };

  G['pne-omvendt'] = function () {
    const [sym, masser, ladninger] = tilf(ISOTOPER);
    const e = KJ.grunnstoffMap[sym];
    const A = tilf(masser);
    const q = tilf(ladninger.concat([0]));
    const el = e.z - q;
    return {
      type: 'fyllinn',
      sporsmal: 'En partikkel har **' + e.z + ' protoner**, **' + (A - e.z) + ' nøytroner** og **' + el + ' elektroner**. Hva er den?',
      tekst: 'Grunnstoff (symbol): ___\nMassetall: ___\nLadning: ___',
      svar: [[sym, e.navn], [String(A)], ladningVarianter(q)],
      hint: ['Antall protoner bestemmer grunnstoffet.', 'Massetall = protoner + nøytroner. Ladning = protoner − elektroner.'],
      steg: ['Atomnummer ' + e.z + ' → ' + e.navn + ' (' + sym + ')', 'Massetall: $' + e.z + ' + ' + (A - e.z) + ' = ' + A + '$', 'Ladning: $' + e.z + ' - ' + el + ' = ' + (q > 0 ? '+' : '') + q + '$', 'Partikkelen er {{^{' + A + '}_{' + e.z + '}' + ionCe(sym, q) + '}}'],
    };
  };

  G['ion-navn'] = function () {
    const i = tilf(KJ.tavlaIoner());
    return { type: 'navn', formel: i.formel, sporsmal: 'Hva heter ionet {{' + i.formel + '}}?', svar: [i.navn, i.navn + 'ion', i.navn + 'ionet'] };
  };
  G['ion-formel'] = function () {
    const i = tilf(KJ.tavlaIoner());
    return { type: 'formel', navn: i.navn, sporsmal: 'Skriv formelen med ladning for **' + i.navn + '**-ionet.', svar: i.formel, hint: 'Ladning skrives med ^, for eksempel SO4^2- eller NH4+.' };
  };
  G['ion-ladning'] = function () {
    const i = tilf(KJ.tavlaIoner());
    return { type: 'fyllinn', sporsmal: 'Hvilken ladning har **' + i.navn + '**-ionet?', tekst: 'Ladning: ___', svar: [ladningVarianter(i.ladning)], forklaring: i.navn + ' er {{' + i.formel + '}}.' };
  };

  G['grunnstoff-navn'] = function () {
    const sym = tilf(GRUNNSTOFFER);
    const e = KJ.grunnstoffMap[sym];
    return { type: 'navn', formel: sym, sporsmal: 'Hva heter grunnstoffet {{' + sym + '}}?', svar: [e.navn] };
  };
  G['grunnstoff-symbol'] = function () {
    const sym = tilf(GRUNNSTOFFER);
    const e = KJ.grunnstoffMap[sym];
    return { type: 'formel', navn: e.navn, sporsmal: 'Skriv symbolet for **' + e.navn + '**.', svar: sym };
  };

  G['hvem'] = function (spec) {
    const kand = spec.niva >= 3 ? HVEM.filter((x) => x[1] !== 0) : HVEM;
    const [sym, q] = tilf(kand);
    const e = KJ.grunnstoffMap[sym];
    const k = C.konfig(e.z, q);
    const n = C.sumE(k);
    const edel = Math.random() < 0.7 || n > 18;
    return {
      type: 'fyllinn',
      sporsmal: 'Jeg har konfigurasjonen $' + C.konfigTex(k, edel) + '$ og ' + (q ? 'ladning **' + lt(q) + '**' : 'er et **nøytralt atom**') + '. Hvem er jeg?',
      tekst: 'Grunnstoff (symbol eller navn): ___',
      svar: [[sym, e.navn]],
      hint: ['Tell elektronene. [Ne] = 10, [Ar] = 18, [Kr] = 36.', 'Protoner = elektroner + ladning.'],
      steg: ['Antall elektroner: ' + n, 'Protoner = $' + n + (q > 0 ? ' + ' + q : q < 0 ? ' - ' + -q : '') + ' = ' + e.z + '$', 'Atomnummer ' + e.z + ' er ' + e.navn + (q ? ', så partikkelen er {{' + ionCe(sym, q) + '}}' : '') + '.'],
    };
  };

  G['salt'] = function (spec) {
    const anioner = ENKLE_ANIONER.concat(KJ.tavlaIoner().filter((i) => i.ladning < 0).map((i) => [i.formel, i.navn]));
    const kationer = KATIONER.concat(KJ.tavlaIoner().filter((i) => i.ladning > 0).map((i) => [i.formel, i.navn]));
    let kat;
    let an;
    // Unngå kombinasjoner som ikke finnes som vanlige salter
    const ugyldig = (k, a) =>
      (/NH4/.test(k) && ['O^2-', 'S^2-', 'N^3-'].includes(a)) ||
      (a === 'N^3-' && !['Li+', 'Mg^2+', 'Ca^2+', 'Ba^2+', 'Al^3+', 'Zn^2+'].includes(k)) ||
      (['CO3^2-', 'CN-'].includes(a) && ['Al^3+', 'Fe^3+'].includes(k)) ||
      (a === 'S^2-' && k === 'Fe^3+');
    do {
      kat = tilf(kationer);
      an = tilf(anioner);
    } while (ugyldig(kat[0], an[0]));
    return { type: 'salt', kation: kat[0], anion: an[0], navn: kat[1] + an[1], visIoner: spec.niva < 3 };
  };

  KJ.generatorer = G;
  KJ.saltData = { KATIONER, ENKLE_ANIONER };

  /** Lager en konkret oppgave fra en generator-oppgave. */
  KJ.generer = function (spec) {
    const f = G[spec.kilde];
    if (!f) throw new Error('Ukjent generator: ' + spec.kilde);
    const q = f(spec);
    return Object.assign({}, q, { id: spec.id, niva: spec.niva, mal: spec.mal, tema: spec.tema, modul: spec.modul, generert: spec.kilde });
  };
})(window.KJ);
