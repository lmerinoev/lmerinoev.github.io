// Exemplar animations — the reference style for all of Boo's moves.
// Keep motion big and readable: this is a coach demo, not mocap.

export const ANIMS_CORE = {
  // mascot float — used on the home screen
  idle: { dur: 2.6, keys: [
    [0.0, { y: 0.04, aLz: 14, aRz: 14, eL: 18, eR: 18, kL: 12, kR: 12, lLx: 8, lRx: 8 }],
    [0.5, { y: 0.14, aLz: 26, aRz: 26, eL: 28, eR: 28, squash: 1.04, kL: 20, kR: 20, lLx: 12, lRx: 12, rz: 2 }],
  ]},

  march: { dur: 0.95, keys: [
    [0.0,  { lLx: 55, kL: 80, lRx: -12, kR: 5, aLx: -28, aRx: 38, eL: 55, eR: 55, y: 0.01 }],
    [0.25, { lLx: 20, kL: 30, lRx: 0, kR: 15, aLx: 5, aRx: 5, eL: 45, eR: 45, y: 0.04, squash: 1.02 }],
    [0.5,  { lRx: 55, kR: 80, lLx: -12, kL: 5, aRx: -28, aLx: 38, eL: 55, eR: 55, y: 0.01 }],
    [0.75, { lRx: 20, kR: 30, lLx: 0, kL: 15, aLx: 5, aRx: 5, eL: 45, eR: 45, y: 0.04, squash: 1.02 }],
  ]},

  squat: { dur: 2.1, keys: [
    [0.0,  { aLx: 15, aRx: 15, lLz: 9, lRz: 9 }],
    [0.42, { y: -0.26, kL: 88, kR: 88, lLx: 58, lRx: 58, lLz: 12, lRz: 12, bend: 16, aLx: 78, aRx: 78, eL: 12, eR: 12, squash: 0.97 }],
    [0.58, { y: -0.26, kL: 88, kR: 88, lLx: 58, lRx: 58, lLz: 12, lRz: 12, bend: 16, aLx: 78, aRx: 78, eL: 12, eR: 12, squash: 0.97 }],
  ]},

  pushup: { dur: 2.2, cam: 'floor', keys: [
    [0.0,  { ry: 100, px: 62, y: 0.26, aLx: 92, aRx: 92, eL: 10, eR: 10, lLx: -16, lRx: -16, kL: 10, kR: 10, hx: -78, bend: -10 }],
    [0.45, { ry: 100, px: 68, y: 0.02, aLx: 86, aRx: 86, eL: 80, eR: 80, lLx: -16, lRx: -16, kL: 10, kR: 10, hx: -78, bend: -10 }],
    [0.6,  { ry: 100, px: 68, y: 0.02, aLx: 86, aRx: 86, eL: 80, eR: 80, lLx: -16, lRx: -16, kL: 10, kR: 10, hx: -78, bend: -10 }],
  ]},

  jack: { dur: 0.85, keys: [
    [0.0,  { aLz: 8, aRz: 8, lLz: 3, lRz: 3, eL: 6, eR: 6 }],
    [0.25, { y: 0.09, aLz: 95, aRz: 95, lLz: 18, lRz: 18, eL: 6, eR: 6, squash: 1.03 }],
    [0.5,  { aLz: 168, aRz: 168, lLz: 30, lRz: 30, eL: 4, eR: 4, y: 0.02, squash: 0.99 }],
    [0.75, { y: 0.09, aLz: 95, aRz: 95, lLz: 18, lRz: 18, eL: 6, eR: 6, squash: 1.03 }],
  ]},
};
