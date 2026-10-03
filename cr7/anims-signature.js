// Signature moves — the ready stance and the celebration.
export const ANIMS_SIGNATURE = {

  // free-kick stance: feet wide, chest up, still — a slow breath
  stance: { dur: 3.2, keys: [
    [0.0, { lLz: 14, lRz: 14, aLz: 12, aRz: 12, aLx: -4, aRx: -4, eL: 6, eR: 6, bend: -3, hx: -3 }],
    [0.5, { lLz: 14, lRz: 14, aLz: 14, aRz: 14, aLx: -6, aRx: -6, eL: 8, eR: 8, bend: -5, hx: -4, squash: 1.025 }],
  ]},

  // the celebration: back to the camera, jump, half-turn in the air, land wide, arms thrust down
  siu: { dur: 3.0, keys: [
    [0.0,  { ry: 180, aLz: 12, aRz: 12, eL: 8, eR: 8 }],
    [0.1,  { ry: 180, y: -0.2, kL: 75, kR: 75, lLx: 52, lRx: 52, bend: 18, aLx: -45, aRx: -45, eL: 10, eR: 10 }],
    [0.22, { ry: 95, y: 0.6, kL: 70, kR: 70, lLx: 40, lRx: 40, aLz: 70, aRz: 70, eL: 25, eR: 25 }],
    [0.32, { ry: 15, y: 0.4, kL: 30, kR: 30, lLx: 15, lRx: 15, lLz: 20, lRz: 20, aLz: 120, aRz: 120, eL: 10, eR: 10 }],
    [0.4,  { ry: 0, y: -0.18, lLz: 30, lRz: 30, kL: 45, kR: 45, lLx: 28, lRx: 28, aLz: 36, aRz: 36, aLx: -30, aRx: -30, eL: 2, eR: 2, bend: -14, hx: -18, squash: 0.97 }],
    [0.7,  { ry: 0, y: -0.17, lLz: 30, lRz: 30, kL: 42, kR: 42, lLx: 26, lRx: 26, aLz: 38, aRz: 38, aLx: -32, aRx: -32, eL: 2, eR: 2, bend: -16, hx: -20 }],
    [0.86, { ry: 180, aLz: 12, aRz: 12, eL: 8, eR: 8 }],
  ]},
};
