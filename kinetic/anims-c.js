// Mobility, stretches & slow core — authored batch C.
// Rhythm: move into pose -> gentle deepen / breathe -> release.
export const ANIMS_C = {

  // standing hip hinge, hands behind head
  goodmorning: { dur: 2.4, keys: [
    [0.0,  { aLz: 60, aRz: 60, eL: 130, eR: 130, kL: 8, kR: 8, hx: -5 }],
    [0.4,  { aLz: 60, aRz: 60, eL: 130, eR: 130, bend: 40, px: 15, y: -0.02, kL: 15, kR: 15, hx: 0 }],
    [0.58, { aLz: 60, aRz: 60, eL: 130, eR: 130, bend: 40, px: 15, y: -0.02, kL: 15, kR: 15, hx: 0, squash: 1.02 }],
  ]},

  // all-fours, alternate arch (cat) and dip (cow)
  catcow: { dur: 3.2, cam: 'floor', keys: [
    [0.0,  { ry: 100, px: 48, y: -0.06, aLx: 58, aRx: 58, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -45 }],
    [0.25, { ry: 100, px: 48, y: -0.03, aLx: 58, aRx: 58, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, bend: -28, hx: 38, squash: 1.02 }],
    [0.5,  { ry: 100, px: 48, y: -0.06, aLx: 58, aRx: 58, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -45 }],
    [0.75, { ry: 100, px: 48, y: -0.09, aLx: 58, aRx: 58, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, bend: 25, hx: -60, squash: 1.02 }],
  ]},

  // world's greatest stretch: deep lunge + one arm spirals to the sky, both sides
  worldsgreatest: { dur: 4, keys: [
    [0.0,  { y: -0.12, kL: 30, kR: 30, lLx: 20, lRx: 20, aLx: 30, aRx: 30, eL: 20, eR: 20, bend: 15 }],
    [0.1,  { y: -0.32, lLx: -55, kL: 8, lLz: 14, lRx: 55, kR: 90, aLx: 25, aRx: 25, eL: 5, eR: 5, bend: 28, hx: 15, ry: -10 }],
    [0.25, { y: -0.32, lLx: -55, kL: 8, lLz: 14, lRx: 55, kR: 90, aLx: 25, eL: 5, aRz: 165, eR: 5, ry: -20, bend: 8, hx: -20 }],
    [0.42, { y: -0.32, lLx: -55, kL: 8, lLz: 14, lRx: 55, kR: 90, aLx: 25, eL: 5, aRz: 165, eR: 5, ry: -20, bend: 8, hx: -20, squash: 1.02 }],
    [0.5,  { y: -0.12, kL: 30, kR: 30, lLx: 20, lRx: 20, aLx: 30, aRx: 30, eL: 20, eR: 20, bend: 15 }],
    [0.6,  { y: -0.32, lRx: -55, kR: 8, lRz: 14, lLx: 55, kL: 90, aLx: 25, aRx: 25, eL: 5, eR: 5, bend: 28, hx: 15, ry: 10 }],
    [0.75, { y: -0.32, lRx: -55, kR: 8, lRz: 14, lLx: 55, kL: 90, aRx: 25, eR: 5, aLz: 165, eL: 5, ry: 20, bend: 8, hx: -20 }],
    [0.92, { y: -0.32, lRx: -55, kR: 8, lRz: 14, lLx: 55, kL: 90, aRx: 25, eR: 5, aLz: 165, eL: 5, ry: 20, bend: 8, hx: -20, squash: 1.02 }],
  ]},

  // kneeling lunge, hands on front knee, gentle forward lean pulses
  hipflexorstretch: { dur: 3.4, keys: [
    [0.0,  { ry: 75, y: -0.3, lRx: 85, kR: 85, lLx: -35, kL: 100, aLx: 45, aRx: 45, eL: 30, eR: 30, bend: 10, hx: -10 }],
    [0.35, { ry: 75, y: -0.3, z: 0.06, lRx: 85, kR: 85, lLx: -35, kL: 100, aLx: 48, aRx: 48, eL: 30, eR: 30, bend: 18, squash: 1.03, hx: -12 }],
    [0.6,  { ry: 75, y: -0.3, z: 0.06, lRx: 85, kR: 85, lLx: -35, kL: 100, aLx: 48, aRx: 48, eL: 30, eR: 30, bend: 18, squash: 1.03, hx: -12 }],
    [0.85, { ry: 75, y: -0.3, lRx: 85, kR: 85, lLx: -35, kL: 100, aLx: 45, aRx: 45, eL: 30, eR: 30, bend: 10, hx: -10 }],
  ]},

  // standing forward fold: hinge all the way down, sway, roll up
  forwardfold: { dur: 3.6, keys: [
    [0.0,  { aLz: 20, aRz: 20, eL: 12, eR: 12, kL: 5, kR: 5 }],
    [0.3,  { px: 30, bend: 55, y: 0.1, lLx: 30, lRx: 30, kL: 10, kR: 10, aLx: 45, aRx: 45, eL: 12, eR: 12, hx: -25 }],
    [0.45, { px: 30, bend: 55, y: 0.1, lLx: 30, lRx: 30, kL: 12, kR: 8, aLx: 52, aRx: 52, eL: 12, eR: 12, hx: -25, rz: 5 }],
    [0.6,  { px: 30, bend: 55, y: 0.1, lLx: 30, lRx: 30, kL: 8, kR: 12, aLx: 40, aRx: 40, eL: 12, eR: 12, hx: -25, rz: -5 }],
    [0.78, { px: 30, bend: 55, y: 0.1, lLx: 30, lRx: 30, kL: 10, kR: 10, aLx: 45, aRx: 45, eL: 12, eR: 12, hx: -25 }],
  ]},

  // figure-4 glute stretch, lying face-up, pulling the shin
  figure4: { dur: 3.2, cam: { x: 1.8, y: 2.8, z: 3.4, lookY: 0.15 }, keys: [
    [0.0,  { px: -68, ry: 15, z: 0.9, y: 0.16, lLx: 65, lLz: 40, kL: 100, lRx: 75, kR: 90, aLx: 70, aRx: 70, eL: 35, eR: 35, hx: 22 }],
    [0.35, { px: -68, ry: 15, z: 0.9, y: 0.16, lLx: 70, lLz: 40, kL: 100, lRx: 85, kR: 90, aLx: 78, aRx: 78, eL: 40, eR: 40, hx: 22, squash: 1.02 }],
    [0.6,  { px: -68, ry: 15, z: 0.9, y: 0.16, lLx: 70, lLz: 40, kL: 100, lRx: 85, kR: 90, aLx: 78, aRx: 78, eL: 40, eR: 40, hx: 22, squash: 1.02 }],
    [0.85, { px: -68, ry: 15, z: 0.9, y: 0.16, lLx: 65, lLz: 40, kL: 100, lRx: 75, kR: 90, aLx: 70, aRx: 70, eL: 35, eR: 35, hx: 22 }],
  ]},

  // all-fours thoracic rotation: hand behind head, elbow spirals to ceiling
  thoracicrot: { dur: 3.6, cam: 'floor', keys: [
    [0.0,  { ry: 100, px: 48, y: -0.06, aLx: 58, aRx: 58, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -45 }],
    [0.12, { ry: 100, px: 48, y: -0.06, aLz: 80, eL: 140, aRx: 58, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -45 }],
    [0.3,  { ry: 115, px: 48, rz: 32, y: -0.06, aLz: 80, eL: 140, aRx: 58, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -65 }],
    [0.42, { ry: 100, px: 48, y: -0.06, aLz: 80, eL: 140, aRx: 58, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -45 }],
    [0.5,  { ry: 100, px: 48, y: -0.06, aLx: 58, aRx: 58, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -45 }],
    [0.62, { ry: 100, px: 48, y: -0.06, aRz: 80, eR: 140, aLx: 58, eL: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -45 }],
    [0.8,  { ry: 85, px: 48, rz: -32, y: -0.06, aRz: 80, eR: 140, aLx: 58, eL: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -65 }],
    [0.92, { ry: 100, px: 48, y: -0.06, aRz: 80, eR: 140, aLx: 58, eL: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -45 }],
  ]},

  // child's pose: kneel folded, arms far forward, just breathe
  childpose: { dur: 4, cam: 'floor', keys: [
    [0.0, { ry: 100, px: 40, y: -0.46, lLx: 95, lRx: 95, kL: 130, kR: 130, aLx: 100, aRx: 100, eL: 5, eR: 5, hx: -55 }],
    [0.5, { ry: 100, px: 40, y: -0.45, lLx: 95, lRx: 95, kL: 130, kR: 130, aLx: 100, aRx: 100, eL: 5, eR: 5, hx: -55, squash: 1.03 }],
  ]},

  // dead bug: lying face-up, opposite arm/leg reach away, slow diagonals
  deadbug: { dur: 3, cam: { x: 1.8, y: 2.8, z: 3.4, lookY: 0.15 }, keys: [
    [0.0,  { px: -68, ry: 15, z: 0.9, y: 0.16, aLx: 90, aRx: 90, eL: 25, eR: 25, lLx: 90, lRx: 90, kL: 90, kR: 90, hx: 22 }],
    [0.2,  { px: -68, ry: 15, z: 0.9, y: 0.16, aLz: 150, eL: 5, aRx: 90, eR: 25, lRx: 15, kR: 5, lLx: 90, kL: 90, hx: 22 }],
    [0.38, { px: -68, ry: 15, z: 0.9, y: 0.16, aLz: 150, eL: 5, aRx: 90, eR: 25, lRx: 15, kR: 5, lLx: 90, kL: 90, hx: 22, squash: 1.02 }],
    [0.5,  { px: -68, ry: 15, z: 0.9, y: 0.16, aLx: 90, aRx: 90, eL: 25, eR: 25, lLx: 90, lRx: 90, kL: 90, kR: 90, hx: 22 }],
    [0.7,  { px: -68, ry: 15, z: 0.9, y: 0.16, aRz: 150, eR: 5, aLx: 90, eL: 25, lLx: 15, kL: 5, lRx: 90, kR: 90, hx: 22 }],
    [0.88, { px: -68, ry: 15, z: 0.9, y: 0.16, aRz: 150, eR: 5, aLx: 90, eL: 25, lLx: 15, kL: 5, lRx: 90, kR: 90, hx: 22, squash: 1.02 }],
  ]},

  // bird dog: all-fours, opposite arm forward + leg back, hold, swap
  birddog: { dur: 3.4, cam: 'floor', keys: [
    [0.0,  { ry: 100, px: 48, y: -0.06, aLx: 58, aRx: 58, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -45 }],
    [0.15, { ry: 100, px: 48, y: -0.06, aLx: 160, eL: 5, aRx: 58, eR: 5, lRx: -60, kR: 5, lLx: 85, kL: 110, hx: -45 }],
    [0.4,  { ry: 100, px: 48, y: -0.06, aLx: 160, eL: 5, aRx: 58, eR: 5, lRx: -60, kR: 5, lLx: 85, kL: 110, hx: -45, squash: 1.02 }],
    [0.5,  { ry: 100, px: 48, y: -0.06, aLx: 58, aRx: 58, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -45 }],
    [0.65, { ry: 100, px: 48, y: -0.06, aRx: 160, eR: 5, aLx: 58, eL: 5, lLx: -60, kL: 5, lRx: 85, kR: 110, hx: -45 }],
    [0.9,  { ry: 100, px: 48, y: -0.06, aRx: 160, eR: 5, aLx: 58, eL: 5, lLx: -60, kL: 5, lRx: 85, kR: 110, hx: -45, squash: 1.02 }],
  ]},

  // standing quad stretch: heel to butt, hand holding, balance wobble
  quadstretch: { dur: 3, keys: [
    [0.0,  { ry: 85, lLx: -35, lLz: 20, kL: 155, aLx: -50, eL: 110, aRz: 80, eR: 8, kR: 3 }],
    [0.33, { ry: 85, lLx: -35, lLz: 20, kL: 155, aLx: -50, eL: 110, aRz: 84, eR: 8, kR: 3, rz: 2, squash: 1.02 }],
    [0.66, { ry: 85, lLx: -35, lLz: 20, kL: 155, aLx: -50, eL: 110, aRz: 76, eR: 8, kR: 3, rz: -2 }],
  ]},

  // chest opener: arms swept back-low, chest proud, pulse deeper
  chestopener: { dur: 3.2, keys: [
    [0.0,  { aLx: -18, aRx: -18, aLz: 18, aRz: 18, eL: 5, eR: 5, bend: -8, hx: -8 }],
    [0.4,  { aLx: -30, aRx: -30, aLz: 25, aRz: 25, eL: 5, eR: 5, bend: -15, squash: 1.04, hx: -15 }],
    [0.6,  { aLx: -32, aRx: -32, aLz: 25, aRz: 25, eL: 5, eR: 5, bend: -17, squash: 1.05, hx: -16 }],
    [0.85, { aLx: -22, aRx: -22, aLz: 20, aRz: 20, eL: 5, eR: 5, bend: -10, hx: -10 }],
  ]},
};
