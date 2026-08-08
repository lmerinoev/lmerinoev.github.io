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
    [0.22, { ry: 100, px: 62, y: 0.26, aLx: 50, aRx: 92, eL: 125, eR: 10, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10, rz: 5 }],
    [0.5,  { ry: 100, px: 62, y: 0.26, aLx: 92, aRx: 92, eL: 10, eR: 10, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10 }],
    [0.72, { ry: 100, px: 62, y: 0.26, aLx: 92, aRx: 50, eL: 10, eR: 125, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10, rz: -5 }],
  ]},

  // plank — static hold with a tiny breathing bob
  plank: { dur: 2.5, cam: 'floor', keys: [
    [0.0, { ry: 100, px: 62, y: 0.26, aLx: 92, aRx: 92, eL: 10, eR: 10, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10, squash: 1 }],
    [0.5, { ry: 100, px: 62, y: 0.28, aLx: 92, aRx: 92, eL: 10, eR: 10, hx: -78, bend: -10, lLx: -16, lRx: -16, kL: 10, kR: 10, squash: 1.02 }],
  ]},

  // side plank — rolled onto a propped forearm, top arm to the sky, hip dips
  sideplank: { dur: 2.4, cam: 'floor', keys: [
    [0.0,  { rz: 72, ry: 15, y: 0.4, aLz: 75, eL: 85, aRz: 105, eR: 15, lLz: 30, lRz: -28, kL: 0, kR: 0, hx: -15 }],
    [0.45, { rz: 65, ry: 15, y: 0.3, aLz: 75, eL: 85, aRz: 105, eR: 15, lLz: 30, lRz: -28, kL: 0, kR: 0, hx: -15 }],
    [0.6,  { rz: 72, ry: 15, y: 0.4, aLz: 75, eL: 85, aRz: 105, eR: 15, lLz: 30, lRz: -28, kL: 0, kR: 0, hx: -15 }],
  ]},

  // pike pushup — hips-high inverted V, head dips toward the floor
  pikepushup: { dur: 2.2, cam: 'floor', keys: [
    [0.0,  { ry: 95, px: 62, bend: -10, y: 0.3, aLx: 95, aRx: 95, eL: 8, eR: 8, lLx: 45, lRx: 45, kL: 12, kR: 12, hx: -78 }],
    [0.45, { ry: 95, px: 66, bend: -10, y: 0.16, aLx: 88, aRx: 88, eL: 65, eR: 65, lLx: 45, lRx: 45, kL: 12, kR: 12, hx: -78 }],
    [0.6,  { ry: 95, px: 66, bend: -10, y: 0.16, aLx: 88, aRx: 88, eL: 65, eR: 65, lLx: 45, lRx: 45, kL: 12, kR: 12, hx: -78 }],
  ]},

  // reverse lunge — one leg steps back, drop, return, alternate
  reverselunge: { dur: 2.0, keys: [
    [0.0,  { aLx: 15, aRx: 15, eL: 20, eR: 20 }],
    [0.25, { ry: 28, lLx: -55, kL: 75, lRx: 38, kR: 78, y: -0.24, aLx: 45, aRx: 45, eL: 25, eR: 25, bend: 6 }],
    [0.5,  { aLx: 15, aRx: 15, eL: 20, eR: 20 }],
    [0.75, { ry: -28, lRx: -55, kR: 75, lLx: 38, kL: 78, y: -0.24, aLx: 45, aRx: 45, eL: 25, eR: 25, bend: 6 }],
  ]},

  // side lunge — one leg wide and straight, other bends deep, alternate
  sidelunge: { dur: 2.2, keys: [
    [0.0,  { aLx: 15, aRx: 15, eL: 15, eR: 15 }],
    [0.25, { lLz: 60, kL: 5, lRx: 50, kR: 85, lRz: 8, rz: -10, y: -0.22, aLx: 70, aRx: 70, eL: 18, eR: 18, bend: 10 }],
    [0.5,  { aLx: 15, aRx: 15, eL: 15, eR: 15 }],
    [0.75, { lRz: 60, kR: 5, lLx: 50, kL: 85, lLz: 8, rz: 10, y: -0.22, aLx: 70, aRx: 70, eL: 18, eR: 18, bend: 10 }],
  ]},

  // wall sit — sitting on air, arms crossed, comedic tremble
  wallsit: { dur: 1.2, keys: [
    [0.0,  { ry: 45, lLx: 95, lRx: 95, kL: 90, kR: 90, lLz: 22, lRz: 22, y: -0.34, aLx: 40, aRx: 40, eL: 120, eR: 120, rz: -1.5 }],
    [0.25, { ry: 45, lLx: 95, lRx: 95, kL: 90, kR: 90, lLz: 22, lRz: 22, y: -0.35, aLx: 40, aRx: 40, eL: 120, eR: 120, rz: 1.5 }],
    [0.5,  { ry: 45, lLx: 95, lRx: 95, kL: 90, kR: 90, lLz: 22, lRz: 22, y: -0.34, aLx: 40, aRx: 40, eL: 120, eR: 120, rz: -1.5 }],
    [0.75, { ry: 45, lLx: 95, lRx: 95, kL: 90, kR: 90, lLz: 22, lRz: 22, y: -0.35, aLx: 40, aRx: 40, eL: 120, eR: 120, rz: 1.5 }],
  ]},

  // squat pulse — rapid small bounces held at the bottom of the squat
  squatpulse: { dur: 0.7, keys: [
    [0.0, { y: -0.26, kL: 84, kR: 84, lLx: 55, lRx: 55, lLz: 12, lRz: 12, bend: 16, aLx: 78, aRx: 78, eL: 12, eR: 12, squash: 0.98 }],
    [0.5, { y: -0.34, kL: 94, kR: 94, lLx: 62, lRx: 62, lLz: 12, lRz: 12, bend: 18, aLx: 78, aRx: 78, eL: 12, eR: 12, squash: 0.96 }],
  ]},

  // glute bridge — face-up, knees bent, hips thrust up and lower
  glutebridge: { dur: 1.8, cam: 'floor', keys: [
    [0.0, { px: -72, ry: 95, y: 0.06, lLx: 70, lRx: 70, kL: 100, kR: 100, aLx: 0, aRx: 0, eL: 5, eR: 5, hx: 15 }],
    [0.4, { px: -58, ry: 95, y: 0.24, bend: -25, lLx: 52, lRx: 52, kL: 95, kR: 95, aLx: 0, aRx: 0, eL: 5, eR: 5, hx: 15 }],
    [0.6, { px: -58, ry: 95, y: 0.24, bend: -25, lLx: 52, lRx: 52, kL: 95, kR: 95, aLx: 0, aRx: 0, eL: 5, eR: 5, hx: 15 }],
  ]},

  // superman — face-down flat, then arms and legs lift into a banana arch
  superman: { dur: 2.6, cam: 'floor', keys: [
    [0.0,  { ry: 100, px: 78, y: 0.02, hx: -78, aLx: 20, aRx: 20, eL: 5, eR: 5, lLx: -10, lRx: -10, kL: 5, kR: 5 }],
    [0.3,  { ry: 100, px: 72, y: 0.1, hx: -78, bend: -25, aLx: 172, aRx: 172, eL: 5, eR: 5, lLx: -45, lRx: -45, kL: 5, kR: 5 }],
    [0.65, { ry: 100, px: 72, y: 0.1, hx: -78, bend: -25, aLx: 172, aRx: 172, eL: 5, eR: 5, lLx: -45, lRx: -45, kL: 5, kR: 5 }],
    [0.85, { ry: 100, px: 78, y: 0.02, hx: -78, aLx: 20, aRx: 20, eL: 5, eR: 5, lLx: -10, lRx: -10, kL: 5, kR: 5 }],
  ]},

  // bicycle crunches — face-up, pedaling legs, shoulders twisting
  bicycle: { dur: 1.4, cam: 'floor', keys: [
    [0.0, { px: -68, ry: 105, y: 0.1, bend: 22, hx: 15, aLx: 130, aRx: 130, eL: 95, eR: 95, lLx: 70, kL: 100, lRx: 15, kR: 10 }],
    [0.5, { px: -68, ry: 85, y: 0.1, bend: 22, hx: 15, aLx: 130, aRx: 130, eL: 95, eR: 95, lRx: 70, kR: 100, lLx: 15, kL: 10 }],
  ]},

  // hollow hold — face-up banana, arms overhead, small tremble
  hollowhold: { dur: 2.2, cam: 'floor', keys: [
    [0.0,  { px: -75, ry: 92, y: 0.12, bend: -18, hx: 18, aLz: 150, aRz: 150, eL: 20, eR: 20, lLx: 22, lRx: 22, kL: 2, kR: 2 }],
    [0.25, { px: -75, ry: 92, y: 0.135, bend: -16, hx: 18, aLz: 152, aRz: 152, eL: 20, eR: 20, lLx: 25, lRx: 25, kL: 2, kR: 2, rz: 2 }],
    [0.5,  { px: -75, ry: 92, y: 0.12, bend: -18, hx: 18, aLz: 150, aRz: 150, eL: 20, eR: 20, lLx: 22, lRx: 22, kL: 2, kR: 2 }],
    [0.75, { px: -75, ry: 92, y: 0.135, bend: -16, hx: 18, aLz: 152, aRz: 152, eL: 20, eR: 20, lLx: 25, lRx: 25, kL: 2, kR: 2, rz: -2 }],
  ]},
};
