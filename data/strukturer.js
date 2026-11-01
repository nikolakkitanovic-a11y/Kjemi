/*
 * Strukturtegninger til markeringsoppgavene (læringsmål 9 og 10).
 *
 * atomer:   [x, y, tekst]  tekst er grunnstoffsymbol, ion (Na+, Cl-) eller gruppe (CH3, COO-, NH3+).
 *           Tom tekst ('') er et usynlig festepunkt på ryggraden til et stort molekyl.
 * bindinger: [fra, til, orden]  indekser i atomer.
 * soner:    stedene der det virker en kraft. type er en av nøklene i KJ.KRAFTTYPER.
 *           x, y er midten av sonen, r er radien (treffområdet).
 */
KJ.KRAFTTYPER = {
  hydrogenbinding: { navn: 'Hydrogenbinding', kort: 'H' },
  'ion-dipol': { navn: 'Ion-dipol-binding', kort: 'ID' },
  london: { navn: 'London-krefter', kort: 'L' },
  ionebinding: { navn: 'Ionebinding', kort: 'I' },
  'dipol-dipol': { navn: 'Dipol-dipol-krefter', kort: 'DD' },
};

KJ.STRUKTURER = {
  'salt-vann': {
    tittel: 'Natriumklorid løst i vann',
    w: 520,
    h: 310,
    atomer: [
      [150, 165, 'Na+'],
      [150, 82, 'O'], [126, 58, 'H'], [174, 58, 'H'],
      [66, 165, 'O'], [42, 141, 'H'], [42, 189, 'H'],
      [150, 248, 'O'], [126, 272, 'H'], [174, 272, 'H'],
      [372, 165, 'Cl-'],
      [380, 59, 'O'], [372, 90, 'H'], [408, 46, 'H'],
      [478, 172, 'O'], [447, 165, 'H'], [495, 198, 'H'],
      [380, 271, 'O'], [372, 240, 'H'], [408, 284, 'H'],
      [238, 30, 'O'], [268, 22, 'H'], [252, 58, 'H'],
    ],
    bindinger: [[1, 2], [1, 3], [4, 5], [4, 6], [7, 8], [7, 9], [11, 12], [11, 13], [14, 15], [14, 16], [17, 18], [17, 19], [20, 21], [20, 22]],
    soner: [
      { type: 'ion-dipol', x: 150, y: 124, r: 22, tekst: 'O i vannmolekylet (δ−) vender mot {{Na+}}.' },
      { type: 'ion-dipol', x: 108, y: 165, r: 22, tekst: 'O i vannmolekylet (δ−) vender mot {{Na+}}.' },
      { type: 'ion-dipol', x: 150, y: 207, r: 22, tekst: 'O i vannmolekylet (δ−) vender mot {{Na+}}.' },
      { type: 'ion-dipol', x: 372, y: 127, r: 19, tekst: 'H i vannmolekylet (δ+) vender mot {{Cl-}}.' },
      { type: 'ion-dipol', x: 410, y: 165, r: 19, tekst: 'H i vannmolekylet (δ+) vender mot {{Cl-}}.' },
      { type: 'ion-dipol', x: 372, y: 203, r: 19, tekst: 'H i vannmolekylet (δ+) vender mot {{Cl-}}.' },
      { type: 'hydrogenbinding', x: 206, y: 44, r: 20, tekst: 'H i ett vannmolekyl og et ledig elektronpar på O i et annet.' },
    ],
  },

  'etanol-vann': {
    tittel: 'Etanol og vann',
    w: 520,
    h: 350,
    atomer: [
      [70, 170, 'CH3'], [150, 170, 'CH2'], [215, 138, 'O'], [255, 158, 'H'],
      [322, 180, 'O'], [350, 162, 'H'], [330, 212, 'H'],
      [196, 42, 'O'], [207, 72, 'H'], [166, 32, 'H'],
      [352, 278, 'O'], [382, 270, 'H'], [356, 310, 'H'],
      [70, 280, 'CH3'], [150, 280, 'CH2'], [215, 310, 'O'], [250, 330, 'H'],
    ],
    bindinger: [[0, 1], [1, 2], [2, 3], [4, 5], [4, 6], [7, 8], [7, 9], [10, 11], [10, 12], [13, 14], [14, 15], [15, 16]],
    soner: [
      { type: 'hydrogenbinding', x: 288, y: 169, r: 20, tekst: 'H i OH-gruppen til etanol og et ledig par på O i vann.' },
      { type: 'hydrogenbinding', x: 211, y: 105, r: 20, tekst: 'H i vann og et ledig par på O i etanol.' },
      { type: 'hydrogenbinding', x: 341, y: 245, r: 20, tekst: 'H i ett vannmolekyl og O i et annet.' },
      { type: 'london', x: 110, y: 225, r: 34, tekst: 'Mellom de upolare hydrokarbondelene ({{CH3}}–{{CH2}}) i de to etanolmolekylene.' },
    ],
  },

  'stort-molekyl': {
    tittel: 'Et stort, foldet molekyl i vann',
    w: 520,
    h: 390,
    rygg: 'M30 130 H430 Q490 130 490 215 Q490 300 430 300 H30',
    atomer: [
      [150, 130, 'C'], [150, 174, 'O'],
      [150, 300, 'N'], [150, 256, 'H'],
      [255, 130, ''], [255, 176, 'COO-'],
      [255, 300, ''], [255, 254, 'NH3+'],
      [360, 130, ''], [360, 176, 'CH3'],
      [360, 300, ''], [360, 254, 'CH3'],
      [100, 130, ''], [100, 92, 'O'], [124, 74, 'H'],
      [186, 46, 'O'], [214, 34, 'H'], [190, 14, 'H'],
      [330, 130, ''], [330, 88, 'NH3+'],
      [420, 58, 'O'], [446, 44, 'H'], [440, 84, 'H'],
      [210, 300, ''], [210, 344, 'COO-'],
      [296, 352, 'H'], [326, 362, 'O'], [342, 336, 'H'],
    ],
    bindinger: [[0, 1, 2], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [13, 14], [15, 16], [15, 17], [18, 19], [20, 21], [20, 22], [23, 24], [25, 26], [26, 27]],
    soner: [
      { type: 'hydrogenbinding', x: 150, y: 215, r: 22, tekst: 'Inne i molekylet: H på N i den nederste delen og et ledig par på O i C=O i den øverste delen.' },
      { type: 'ionebinding', x: 255, y: 215, r: 22, tekst: 'Inne i molekylet: den negative {{COO-}}-gruppen og den positive {{NH3+}}-gruppen tiltrekker hverandre (saltbro).' },
      { type: 'london', x: 360, y: 215, r: 22, tekst: 'Inne i molekylet: mellom de to upolare {{CH3}}-gruppene.' },
      { type: 'hydrogenbinding', x: 155, y: 60, r: 20, tekst: 'Mellom OH-gruppen på molekylet og O i et vannmolekyl.' },
      { type: 'ion-dipol', x: 376, y: 73, r: 19, tekst: 'Mellom den positive {{NH3+}}-gruppen og O (δ−) i vann.' },
      { type: 'ion-dipol', x: 265, y: 348, r: 19, tekst: 'Mellom den negative {{COO-}}-gruppen og H (δ+) i vann.' },
    ],
  },
};
