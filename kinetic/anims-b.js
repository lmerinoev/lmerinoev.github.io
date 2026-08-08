// Strength & floor moves — authored batch B.
export const ANIMS_B = {
  // mountain climbers — plank base, knees drive alternately toward chest
  climber: { dur: 0.7, cam: 'floor', keys: [
    [0.0, { ry: 100, px: 62, y: 0.26, aLx: 92, aRx: 92, eL: 10, eR: 10, hx: -78, bend: -10, lLx: 60, kL: 95, lRx: -20, kR: 10 }],
    [0.5, { ry: 100, px: 62, y: 0.26, aLx: 92, aRx: 92, eL: 10, eR: 10, hx: -78, bend: -10, lRx: 60, kR: 95, lLx: -20, kL: 10 }],
  ]},

  // plank shoulder taps — straight-arm plank, hands alternate tapping in
  planktap: { dur: 1.3, cam: 'floor', keys: [
    [0.0,  { ry: 100, px: 62, y: 0.26, aLx: 92, aRx: 92, eL: 10, eR: 10, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10 }],
    [0.22, { ry: 100, px: 62, y: 0.26, aLx: 62, aRx: 92, eL: 115, eR: 10, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10, rz: 4 }],
    [0.5,  { ry: 100, px: 62, y: 0.26, aLx: 92, aRx: 92, eL: 10, eR: 10, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10 }],
    [0.72, { ry: 100, px: 62, y: 0.26, aLx: 92, aRx: 62, eL: 10, eR: 115, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10, rz: -4 }],
  ]},

  // plank — static hold with a tiny breathing bob
  plank: { dur: 2.5, cam: 'floor', keys: [
    [0.0, { ry: 100, px: 62, y: 0.26, aLx: 92, aRx: 92, eL: 10, eR: 10, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10, squash: 1 }],
    [0.5, { ry: 100, px: 62, y: 0.28, aLx: 92, aRx: 92, eL: 10, eR: 10, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10, squash: 1.02 }],
  ]},

  // side plank — rolled onto one straight arm, top arm to the sky, hip dips
  sideplank: { dur: 2.4, cam: 'floor', keys: [
    [0.0,  { rz: 75, ry: 10, y: 0.32, aLz: 85, eL: 0, aRz: 160, eR: 0, lLz: 0, lRz: 0, kL: 0, kR: 0 }],
    [0.45, { rz: 68, ry: 10, y: 0.22, aLz: 85, eL: 0, aRz: 160, eR: 0, lLz: 0, lRz: 0, kL: 0, kR: 0 }],
    [0.6,  { rz: 75, ry: 10, y: 0.32, aLz: 85, eL: 0, aRz: 160, eR: 0, lLz: 0, lRz: 0, kL: 0, kR: 0 }],
  ]},

  // pike pushup — hips-high inverted V, head dips toward the floor
  pikepushup: { dur: 2.2, cam: 'floor', keys: [
    [0.0,  { ry: 95, px: 35, bend: 35, y: -0.02, aLx: 150, aRx: 150, eL: 10, eR: 10, lLx: -30, lRx: -30, kL: 8, kR: 8, hx: 30 }],
    [0.45, { ry: 95, px: 35, bend: 35, y: -0.14, aLx: 150, aRx: 150, eL: 70, eR: 70, lLx: -30, lRx: -30, kL: 8, kR: 8, hx: 30 }],
    [0.6,  { ry: 95, px: 35, bend: 35, y: -0.14, aLx: 150, aRx: 150, eL: 70, eR: 70, lLx: -30, lRx: -30, kL: 8, kR: 8, hx: 30 }],
  ]},

  // reverse lunge — one leg steps back, drop, return, alternate
  reverselunge: { dur: 2.0, keys: [
    [0.0,  { aLx: 15, aRx: 15, eL: 20, eR: 20 }],
    [0.25, { lLx: -45, kL: 60, lRx: 35, kR: 75, y: -0.22, aLx: 45, aRx: 45, eL: 25, eR: 25, bend: 6 }],
    [0.5,  { aLx: 15, aRx: 15, eL: 20, eR: 20 }],
    [0.75, { lRx: -45, kR: 60, lLx: 35, kL: 75, y: -0.22, aLx: 45, aRx: 45, eL: 25, eR: 25, bend: 6 }],
  ]},

  // side lunge — one leg wide and straight, other bends deep, alternate
  sidelunge: { dur: 2.2, keys: [
    [0.0,  { aLx: 15, aRx: 15, eL: 15, eR: 15 }],
    [0.25, { lLz: 45, kL: 5, lRx: 45, kR: 80, rz: 8, y: -0.18, aLx: 65, aRx: 65, eL: 15, eR: 15, bend: 8 }],
    [0.5,  { aLx: 15, aRx: 15, eL: 15, eR: 15 }],
    [0.75, { lRz: 45, kR: 5, lLx: 45, kL: 80, rz: -8, y: -0.18, aLx: 65, aRx: 65, eL: 15, eR: 15, bend: 8 }],
  ]},

  // wall sit — sitting on air, arms crossed, comedic tremble
  wallsit: { dur: 1.2, keys: [
    [0.0,  { lLx: 85, lRx: 85, kL: 85, kR: 85, y: -0.3, aLx: 40, aRx: 40, eL: 120, eR: 120, rz: -1.5 }],
    [0.25, { lLx: 85, lRx: 85, kL: 85, kR: 85, y: -0.31, aLx: 40, aRx: 40, eL: 120, eR: 120, rz: 1.5 }],
    [0.5,  { lLx: 85, lRx: 85, kL: 85, kR: 85, y: -0.3, aLx: 40, aRx: 40, eL: 120, eR: 120, rz: -1.5 }],
    [0.75, { lLx: 85, lRx: 85, kL: 85, kR: 85, y: -0.31, aLx: 40, aRx: 40, eL: 120, eR: 120, rz: 1.5 }],
  ]},

  // squat pulse — rapid small bounces held at the bottom of the squat
  squatpulse: { dur: 0.7, keys: [
    [0.0, { y: -0.26, kL: 84, kR: 84, lLx: 55, lRx: 55, lLz: 12, lRz: 12, bend: 16, aLx: 78, aRx: 78, eL: 12, eR: 12, squash: 0.98 }],
    [0.5, { y: -0.34, kL: 94, kR: 94, lLx: 62, lRx: 62, lLz: 12, lRz: 12, bend: 18, aLx: 78, aRx: 78, eL: 12, eR: 12, squash: 0.96 }],
  ]},

  // glute bridge — face-up, knees bent, hips thrust up and lower
  glutebridge: { dur: 1.8, cam: 'floor', keys: [
    [0.0, { px: -72, ry: 95, y: 0.08, lLx: 70, lRx: 70, kL: 100, kR: 100, aLx: 0, aRx: 0, eL: 5, eR: 5 }],
    [0.4, { px: -60, ry: 95, y: 0.2, bend: -22, lLx: 55, lRx: 55, kL: 95, kR: 95, aLx: 0, aRx: 0, eL: 5, eR: 5 }],
    [0.6, { px: -60, ry: 95, y: 0.2, bend: -22, lLx: 55, lRx: 55, kL: 95, kR: 95, aLx: 0, aRx: 0, eL: 5, eR: 5 }],
  ]},

  // superman — face-down flat, then arms and legs lift into a banana arch
  superman: { dur: 2.6, cam: 'floor', keys: [
    [0.0,  { ry: 100, px: 78, y: 0.02, hx: -78, aLx: 20, aRx: 20, eL: 5, eR: 5, lLx: -10, lRx: -10, kL: 5, kR: 5 }],
    [0.3,  { ry: 100, px: 72, y: 0.1, hx: -78, bend: -25, aLx: 170, aRx: 170, eL: 5, eR: 5, lLx: -35, lRx: -35, kL: 5, kR: 5 }],
    [0.65, { ry: 100, px: 72, y: 0.1, hx: -78, bend: -25, aLx: 170, aRx: 170, eL: 5, eR: 5, lLx: -35, lRx: -35, kL: 5, kR: 5 }],
    [0.85, { ry: 100, px: 78, y: 0.02, hx: -78, aLx: 20, aRx: 20, eL: 5, eR: 5, lLx: -10, lRx: -10, kL: 5, kR: 5 }],
  ]},

  // bicycle crunches — face-up, pedaling legs, shoulders twisting
  bicycle: { dur: 1.4, cam: 'floor', keys: [
    [0.0, { px: -68, ry: 105, y: 0.1, bend: 20, aLx: 130, aRx: 130, eL: 95, eR: 95, lLx: 70, kL: 100, lRx: 15, kR: 10 }],
    [0.5, { px: -68, ry: 85, y: 0.1, bend: 20, aLx: 130, aRx: 130, eL: 95, eR: 95, lRx: 70, kR: 100, lLx: 15, kL: 10 }],
  ]},

  // hollow hold — face-up banana, arms overhead, small tremble
  hollowhold: { dur: 2.2, cam: 'floor', keys: [
    [0.0, { px: -75, ry: 95, y: 0.12, bend: -18, aLz: 165, aRz: 165, eL: 5, eR: 5, lLx: 12, lRx: 12, kL: 3, kR: 3 }],
    [0.5, { px: -75, ry: 95, y: 0.14, bend: -15, aLz: 165, aRz: 165, eL: 5, eR: 5, lLx: 15, lRx: 15, kL: 3, kR: 3 }],
  ]},
};
