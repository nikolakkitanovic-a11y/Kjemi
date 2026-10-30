/*
 * Grunnstoffdata for periodesystemet og molar masse-kalkulatoren.
 *
 * Felt: [atomnummer, symbol, norsk navn, molar masse (g/mol), elektronegativitet, kategori]
 *  - Molar masse: standard atommasse avrundet slik lærebøkene gjør. Tall i
 *    parentes i periodesystemet (radioaktive grunnstoffer uten stabile isotoper)
 *    er nukleontallet til den mest stabile isotopen; de er markert med «r».
 *  - Elektronegativitet: Paulings skala med én desimal, slik læreboken bruker
 *    (H 2,1 · C 2,5 · N 3,0 · O 3,5 · F 4,0 · Cl 3,0 · Na 0,9).
 *    null = ingen etablert verdi. Verdiene for f-blokken er omtrentlige.
 *  - Kategori: alk alkalimetall · jal jordalkalimetall · inn innskuddsmetall ·
 *    met andre metaller · hlv halvmetall · ikm ikke-metall · hlg halogen ·
 *    edg edelgass · lan lantanoid · akt aktinoid
 */
(function (KJ) {
  'use strict';
  const R = 'r'; // radioaktiv, masse = nukleontall for mest stabile isotop
  const D = [
    [1, 'H', 'hydrogen', 1.008, 2.1, 'ikm'],
    [2, 'He', 'helium', 4.003, null, 'edg'],
    [3, 'Li', 'litium', 6.94, 1.0, 'alk'],
    [4, 'Be', 'beryllium', 9.012, 1.5, 'jal'],
    [5, 'B', 'bor', 10.81, 2.0, 'hlv'],
    [6, 'C', 'karbon', 12.01, 2.5, 'ikm'],
    [7, 'N', 'nitrogen', 14.01, 3.0, 'ikm'],
    [8, 'O', 'oksygen', 16.0, 3.5, 'ikm'],
    [9, 'F', 'fluor', 19.0, 4.0, 'hlg'],
    [10, 'Ne', 'neon', 20.18, null, 'edg'],
    [11, 'Na', 'natrium', 22.99, 0.9, 'alk'],
    [12, 'Mg', 'magnesium', 24.31, 1.2, 'jal'],
    [13, 'Al', 'aluminium', 26.98, 1.5, 'met'],
    [14, 'Si', 'silisium', 28.09, 1.8, 'hlv'],
    [15, 'P', 'fosfor', 30.97, 2.1, 'ikm'],
    [16, 'S', 'svovel', 32.06, 2.5, 'ikm'],
    [17, 'Cl', 'klor', 35.45, 3.0, 'hlg'],
    [18, 'Ar', 'argon', 39.95, null, 'edg'],
    [19, 'K', 'kalium', 39.1, 0.8, 'alk'],
    [20, 'Ca', 'kalsium', 40.08, 1.0, 'jal'],
    [21, 'Sc', 'skandium', 44.96, 1.3, 'inn'],
    [22, 'Ti', 'titan', 47.87, 1.5, 'inn'],
    [23, 'V', 'vanadium', 50.94, 1.6, 'inn'],
    [24, 'Cr', 'krom', 52.0, 1.6, 'inn'],
    [25, 'Mn', 'mangan', 54.94, 1.5, 'inn'],
    [26, 'Fe', 'jern', 55.85, 1.8, 'inn'],
    [27, 'Co', 'kobolt', 58.93, 1.8, 'inn'],
    [28, 'Ni', 'nikkel', 58.69, 1.8, 'inn'],
    [29, 'Cu', 'kobber', 63.55, 1.9, 'inn'],
    [30, 'Zn', 'sink', 65.38, 1.6, 'inn'],
    [31, 'Ga', 'gallium', 69.72, 1.6, 'met'],
    [32, 'Ge', 'germanium', 72.63, 1.8, 'hlv'],
    [33, 'As', 'arsen', 74.92, 2.0, 'hlv'],
    [34, 'Se', 'selen', 78.97, 2.4, 'ikm'],
    [35, 'Br', 'brom', 79.9, 2.8, 'hlg'],
    [36, 'Kr', 'krypton', 83.8, 3.0, 'edg'],
    [37, 'Rb', 'rubidium', 85.47, 0.8, 'alk'],
    [38, 'Sr', 'strontium', 87.62, 1.0, 'jal'],
    [39, 'Y', 'yttrium', 88.91, 1.2, 'inn'],
    [40, 'Zr', 'zirkonium', 91.22, 1.4, 'inn'],
    [41, 'Nb', 'niob', 92.91, 1.6, 'inn'],
    [42, 'Mo', 'molybden', 95.95, 1.8, 'inn'],
    [43, 'Tc', 'technetium', 98, 1.9, 'inn', R],
    [44, 'Ru', 'ruthenium', 101.07, 2.2, 'inn'],
    [45, 'Rh', 'rhodium', 102.91, 2.2, 'inn'],
    [46, 'Pd', 'palladium', 106.42, 2.2, 'inn'],
    [47, 'Ag', 'sølv', 107.87, 1.9, 'inn'],
    [48, 'Cd', 'kadmium', 112.41, 1.7, 'inn'],
    [49, 'In', 'indium', 114.82, 1.7, 'met'],
    [50, 'Sn', 'tinn', 118.71, 1.8, 'met'],
    [51, 'Sb', 'antimon', 121.76, 1.9, 'hlv'],
    [52, 'Te', 'tellur', 127.6, 2.1, 'hlv'],
    [53, 'I', 'jod', 126.9, 2.5, 'hlg'],
    [54, 'Xe', 'xenon', 131.29, 2.6, 'edg'],
    [55, 'Cs', 'cesium', 132.91, 0.7, 'alk'],
    [56, 'Ba', 'barium', 137.33, 0.9, 'jal'],
    [57, 'La', 'lantan', 138.91, 1.1, 'lan'],
    [58, 'Ce', 'cerium', 140.12, 1.1, 'lan'],
    [59, 'Pr', 'praseodym', 140.91, 1.1, 'lan'],
    [60, 'Nd', 'neodym', 144.24, 1.1, 'lan'],
    [61, 'Pm', 'prometium', 145, 1.1, 'lan', R],
    [62, 'Sm', 'samarium', 150.36, 1.2, 'lan'],
    [63, 'Eu', 'europium', 151.96, 1.2, 'lan'],
    [64, 'Gd', 'gadolinium', 157.25, 1.2, 'lan'],
    [65, 'Tb', 'terbium', 158.93, 1.2, 'lan'],
    [66, 'Dy', 'dysprosium', 162.5, 1.2, 'lan'],
    [67, 'Ho', 'holmium', 164.93, 1.2, 'lan'],
    [68, 'Er', 'erbium', 167.26, 1.2, 'lan'],
    [69, 'Tm', 'thulium', 168.93, 1.3, 'lan'],
    [70, 'Yb', 'ytterbium', 173.05, 1.1, 'lan'],
    [71, 'Lu', 'lutetium', 174.97, 1.3, 'lan'],
    [72, 'Hf', 'hafnium', 178.49, 1.3, 'inn'],
    [73, 'Ta', 'tantal', 180.95, 1.5, 'inn'],
    [74, 'W', 'wolfram', 183.84, 1.7, 'inn'],
    [75, 'Re', 'rhenium', 186.21, 1.9, 'inn'],
    [76, 'Os', 'osmium', 190.23, 2.2, 'inn'],
    [77, 'Ir', 'iridium', 192.22, 2.2, 'inn'],
    [78, 'Pt', 'platina', 195.08, 2.2, 'inn'],
    [79, 'Au', 'gull', 196.97, 2.4, 'inn'],
    [80, 'Hg', 'kvikksølv', 200.59, 1.9, 'inn'],
    [81, 'Tl', 'thallium', 204.38, 1.8, 'met'],
    [82, 'Pb', 'bly', 207.2, 1.8, 'met'],
    [83, 'Bi', 'vismut', 208.98, 1.9, 'met'],
    [84, 'Po', 'polonium', 209, 2.0, 'met', R],
    [85, 'At', 'astat', 210, 2.2, 'hlg', R],
    [86, 'Rn', 'radon', 222, null, 'edg', R],
    [87, 'Fr', 'francium', 223, 0.7, 'alk', R],
    [88, 'Ra', 'radium', 226, 0.9, 'jal', R],
    [89, 'Ac', 'actinium', 227, 1.1, 'akt', R],
    [90, 'Th', 'thorium', 232.04, 1.3, 'akt'],
    [91, 'Pa', 'protactinium', 231.04, 1.5, 'akt'],
    [92, 'U', 'uran', 238.03, 1.4, 'akt'],
    [93, 'Np', 'neptunium', 237, 1.4, 'akt', R],
    [94, 'Pu', 'plutonium', 244, 1.3, 'akt', R],
    [95, 'Am', 'americium', 243, 1.3, 'akt', R],
    [96, 'Cm', 'curium', 247, 1.3, 'akt', R],
    [97, 'Bk', 'berkelium', 247, 1.3, 'akt', R],
    [98, 'Cf', 'californium', 251, 1.3, 'akt', R],
    [99, 'Es', 'einsteinium', 252, 1.3, 'akt', R],
    [100, 'Fm', 'fermium', 257, 1.3, 'akt', R],
    [101, 'Md', 'mendelevium', 258, 1.3, 'akt', R],
    [102, 'No', 'nobelium', 259, 1.3, 'akt', R],
    [103, 'Lr', 'lawrencium', 266, null, 'akt', R],
    [104, 'Rf', 'rutherfordium', 267, null, 'inn', R],
    [105, 'Db', 'dubnium', 268, null, 'inn', R],
    [106, 'Sg', 'seaborgium', 269, null, 'inn', R],
    [107, 'Bh', 'bohrium', 270, null, 'inn', R],
    [108, 'Hs', 'hassium', 269, null, 'inn', R],
    [109, 'Mt', 'meitnerium', 278, null, 'inn', R],
    [110, 'Ds', 'darmstadtium', 281, null, 'inn', R],
    [111, 'Rg', 'røntgenium', 282, null, 'inn', R],
    [112, 'Cn', 'kopernikium', 285, null, 'inn', R],
    [113, 'Nh', 'nihonium', 286, null, 'met', R],
    [114, 'Fl', 'flerovium', 289, null, 'met', R],
    [115, 'Mc', 'moscovium', 290, null, 'met', R],
    [116, 'Lv', 'livermorium', 293, null, 'met', R],
    [117, 'Ts', 'tenness', 294, null, 'hlg', R],
    [118, 'Og', 'oganesson', 294, null, 'edg', R],
  ];

  KJ.KATEGORIER = {
    alk: 'Alkalimetall',
    jal: 'Jordalkalimetall',
    inn: 'Innskuddsmetall',
    met: 'Andre metaller',
    hlv: 'Halvmetall',
    ikm: 'Ikke-metall',
    hlg: 'Halogen',
    edg: 'Edelgass',
    lan: 'Lantanoid',
    akt: 'Aktinoid',
  };

  // Plassering i periodesystemet (periode, gruppe) beregnes fra atomnummeret.
  const STARTS = [1, 3, 11, 19, 37, 55, 87];
  function plassering(z) {
    let p = 0;
    while (p + 1 < STARTS.length && z >= STARTS[p + 1]) p++;
    const periode = p + 1;
    const i = z - STARTS[p];
    if (periode === 1) return { periode, gruppe: z === 1 ? 1 : 18 };
    if (periode <= 3) return { periode, gruppe: i < 2 ? i + 1 : i + 11 };
    if (periode <= 5) return { periode, gruppe: i + 1 };
    if (i < 2) return { periode, gruppe: i + 1 };
    if (i <= 16) return { periode, gruppe: null, frad: i - 2 }; // f-blokk (La–Lu, Ac–Lr)
    return { periode, gruppe: i - 13 };
  }

  KJ.grunnstoffer = D.map((r) => {
    const pos = plassering(r[0]);
    let blokk;
    if (pos.gruppe == null) blokk = 'f';
    else if (pos.gruppe <= 2 || r[0] === 2) blokk = 's';
    else if (pos.gruppe >= 13) blokk = 'p';
    else blokk = 'd';
    return {
      z: r[0],
      sym: r[1],
      navn: r[2],
      M: r[3],
      en: r[4],
      kat: r[5],
      radioaktiv: r[6] === R,
      periode: pos.periode,
      gruppe: pos.gruppe,
      frad: pos.frad,
      blokk,
    };
  });
  KJ.grunnstoffMap = {};
  KJ.grunnstoffer.forEach((e) => (KJ.grunnstoffMap[e.sym] = e));
})(window.KJ);
