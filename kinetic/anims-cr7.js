// Celebrations & set pieces — the coach's signature moves.
export const ANIMS_CR7 = {

  // free-kick stance: feet wide, chest out, a slow confident breath
  stance: { dur: 2.8, keys: [
    [0.0, { lLz: 13, lRz: 13, aLz: 16, aRz: 16, aLx: -6, aRx: -6, eL: 8, eR: 8, bend: -4, hx: -4 }],
    [0.5, { lLz: 13, lRz: 13, aLz: 20, aRz: 20, aLx: -8, aRx: -8, eL: 10, eR: 10, bend: -7, hx: -6, squash: 1.03, y: 0.01 }],
  ]},

  // the Siuuu: back to the crowd, jump, spin in the air, land wide with arms thrust down
  siu: { dur: 3.0, keys: [
    [0.0,  { ry: 180, aLz: 14, aRz: 14, eL: 12, eR: 12 }],
    [0.1,  { ry: 180, y: -0.22, kL: 75, kR: 75, lLx: 52, lRx: 52, bend: 18, aLx: -45, aRx: -45, eL: 10, eR: 10, squash: 0.96 }],
    [0.22, { ry: 95, y: 0.62, kL: 70, kR: 70, lLx: 40, lRx: 40, aLz: 70, aRz: 70, eL: 25, eR: 25, squash: 1.05 }],
    [0.32, { ry: 15, y: 0.42, kL: 30, kR: 30, lLx: 15, lRx: 15, lLz: 20, lRz: 20, aLz: 120, aRz: 120, eL: 10, eR: 10 }],
    [0.4,  { ry: 0, y: -0.2, lLz: 30, lRz: 30, kL: 45, kR: 45, lLx: 28, lRx: 28, aLz: 38, aRz: 38, aLx: -30, aRx: -30, eL: 4, eR: 4, bend: -14, hx: -18, squash: 0.95 }],
    [0.7,  { ry: 0, y: -0.18, lLz: 30, lRz: 30, kL: 42, kR: 42, lLx: 26, lRx: 26, aLz: 40, aRz: 40, aLx: -32, aRx: -32, eL: 4, eR: 4, bend: -16, hx: -20, squash: 1.0 }],
    [0.86, { ry: 180, aLz: 14, aRz: 14, eL: 12, eR: 12 }],
  ]},
};
