// Mobility, stretches & slow core — authored batch C.
// Rhythm: move into pose -> gentle deepen / breathe -> release.
export const ANIMS_C = {

  // standing hip hinge, hands behind head
  goodmorning: { dur: 2.4, keys: [
    [0.0,  { aLz: 60, aRz: 60, eL: 130, eR: 130, kL: 8, kR: 8, hx: -5 }],
    [0.4,  { aLz: 60, aRz: 60, eL: 130, eR: 130, bend: 45, px: 15, y: -0.08, kL: 15, kR: 15, hx: 15 }],
    [0.58, { aLz: 60, aRz: 60, eL: 130, eR: 130, bend: 45, px: 15, y: -0.08, kL: 15, kR: 15, hx: 15, squash: 1.02 }],
  ]},

  // all-fours, alternate arch (cat) and dip (cow)
  catcow: { dur: 3.2, cam: 'floor', keys: [
    [0.0,  { ry: 100, px: 45, y: -0.08, aLx: 55, aRx: 55, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -30 }],
    [0.25, { ry: 100, px: 45, y: -0.06, aLx: 55, aRx: 55, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, bend: -20, hx: 30, squash: 1.02 }],
    [0.5,  { ry: 100, px: 45, y: -0.08, aLx: 55, aRx: 55, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -30 }],
    [0.75, { ry: 100, px: 45, y: -0.1, aLx: 55, aRx: 55, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, bend: 25, hx: -40, squash: 1.02 }],
  ]},

  // world's greatest stretch: deep lunge + one arm spirals to the sky, both sides
  worldsgreatest: { dur: 4, keys: [
    [0.0,  { y: -0.12, kL: 30, kR: 30, lLx: 20, lRx: 20, aLx: 30, aRx: 30, eL: 20, eR: 20, bend: 15 }],
    [0.1,  { y: -0.35, lLx: -55, kL: 8, lRx: 55, kR: 90, aLx: 55, aRx: 55, eL: 15, eR: 15, bend: 28, hx: 15 }],
    [0.25, { y: -0.35, lLx: -55, kL: 8, lRx: 55, kR: 90, aLx: 55, eL: 15, aRz: 165, eR: 5, ry: -18, bend: 8, hx: -20 }],
    [0.42, { y: -0.35, lLx: -55, kL: 8, lRx: 55, kR: 90, aLx: 55, eL: 15, aRz: 165, eR: 5, ry: -18, bend: 8, hx: -20, squash: 1.02 }],
    [0.5,  { y: -0.12, kL: 30, kR: 30, lLx: 20, lRx: 20, aLx: 30, aRx: 30, eL: 20, eR: 20, bend: 15 }],
    [0.6,  { y: -0.35, lRx: -55, kR: 8, lLx: 55, kL: 90, aRx: 55, aLx: 55, eL: 15, eR: 15, bend: 28, hx: 15 }],
    [0.75, { y: -0.35, lRx: -55, kR: 8, lLx: 55, kL: 90, aRx: 55, eR: 15, aLz: 165, eL: 5, ry: 18, bend: 8, hx: -20 }],
    [0.92, { y: -0.35, lRx: -55, kR: 8, lLx: 55, kL: 90, aRx: 55, eR: 15, aLz: 165, eL: 5, ry: 18, bend: 8, hx: -20, squash: 1.02 }],
  ]},

  // kneeling lunge, hands on front knee, gentle forward lean pulses
  hipflexorstretch: { dur: 3.4, keys: [
    [0.0,  { ry: 25, y: -0.35, lRx: 45, kR: 90, lLx: -35, kL: 100, aLx: 40, aRx: 40, eL: 25, eR: 25, hx: -5 }],
    [0.35, { ry: 25, y: -0.35, z: 0.06, lRx: 45, kR: 90, lLx: -35, kL: 100, aLx: 42, aRx: 42, eL: 25, eR: 25, bend: 8, squash: 1.03, hx: -8 }],
    [0.6,  { ry: 25, y: -0.35, z: 0.06, lRx: 45, kR: 90, lLx: -35, kL: 100, aLx: 42, aRx: 42, eL: 25, eR: 25, bend: 8, squash: 1.03, hx: -8 }],
    [0.85, { ry: 25, y: -0.35, lRx: 45, kR: 90, lLx: -35, kL: 100, aLx: 40, aRx: 40, eL: 25, eR: 25, hx: -5 }],
  ]},

  // standing forward fold: hinge all the way down, sway, roll up
  forwardfold: { dur: 3.6, keys: [
    [0.0,  { aLz: 20, aRz: 20, eL: 12, eR: 12, kL: 5, kR: 5 }],
    [0.3,  { bend: 70, px: 20, y: -0.14, kL: 12, kR: 12, aLx: 60, aRx: 60, eL: 15, eR: 15, hx: 25 }],
    [0.45, { bend: 70, px: 20, y: -0.14, kL: 14, kR: 10, aLx: 66, aRx: 66, eL: 15, eR: 15, hx: 25, rz: 4 }],
    [0.6,  { bend: 70, px: 20, y: -0.14, kL: 10, kR: 14, aLx: 54, aRx: 54, eL: 15, eR: 15, hx: 25, rz: -4 }],
    [0.78, { bend: 70, px: 20, y: -0.14, kL: 12, kR: 12, aLx: 60, aRx: 60, eL: 15, eR: 15, hx: 25 }],
  ]},

  // figure-4 glute stretch, lying face-up, pulling the shin
  figure4: { dur: 3.2, cam: 'floor', keys: [
    [0.0,  { px: -72, ry: 90, y: 0.22, lLx: 60, lLz: 35, kL: 100, lRx: 55, kR: 90, aLx: 65, aRx: 65, eL: 30, eR: 30, hx: -25 }],
    [0.35, { px: -72, ry: 90, y: 0.22, lLx: 64, lLz: 35, kL: 100, lRx: 66, kR: 90, aLx: 72, aRx: 72, eL: 35, eR: 35, hx: -25, squash: 1.02 }],
    [0.6,  { px: -72, ry: 90, y: 0.22, lLx: 64, lLz: 35, kL: 100, lRx: 66, kR: 90, aLx: 72, aRx: 72, eL: 35, eR: 35, hx: -25, squash: 1.02 }],
    [0.85, { px: -72, ry: 90, y: 0.22, lLx: 60, lLz: 35, kL: 100, lRx: 55, kR: 90, aLx: 65, aRx: 65, eL: 30, eR: 30, hx: -25 }],
  ]},

  // all-fours thoracic rotation: hand behind head, elbow spirals to ceiling
  thoracicrot: { dur: 3.6, cam: 'floor', keys: [
    [0.0,  { ry: 100, px: 45, y: -0.08, aLx: 55, aRx: 55, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -35 }],
    [0.12, { ry: 100, px: 45, y: -0.08, aLz: 80, eL: 140, aRx: 55, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -35 }],
    [0.3,  { ry: 112, px: 45, rz: 25, y: -0.08, aLz: 80, eL: 140, aRx: 55, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -55 }],
    [0.42, { ry: 100, px: 45, y: -0.08, aLz: 80, eL: 140, aRx: 55, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -35 }],
    [0.5,  { ry: 100, px: 45, y: -0.08, aLx: 55, aRx: 55, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -35 }],
    [0.62, { ry: 100, px: 45, y: -0.08, aRz: 80, eR: 140, aLx: 55, eL: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -35 }],
    [0.8,  { ry: 88, px: 45, rz: -25, y: -0.08, aRz: 80, eR: 140, aLx: 55, eL: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -55 }],
    [0.92, { ry: 100, px: 45, y: -0.08, aRz: 80, eR: 140, aLx: 55, eL: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -35 }],
  ]},

  // child's pose: kneel folded, arms far forward, just breathe
  childpose: { dur: 4, cam: 'floor', keys: [
    [0.0, { ry: 100, px: 35, y: -0.45, lLx: 95, lRx: 95, kL: 130, kR: 130, aLx: 160, aRx: 160, eL: 5, eR: 5, hx: -60 }],
    [0.5, { ry: 100, px: 35, y: -0.44, lLx: 95, lRx: 95, kL: 130, kR: 130, aLx: 160, aRx: 160, eL: 5, eR: 5, hx: -60, squash: 1.03 }],
  ]},

  // dead bug: lying face-up, opposite arm/leg reach away, slow diagonals
  deadbug: { dur: 3, cam: 'floor', keys: [
    [0.0,  { px: -75, ry: 90, y: 0.22, aLx: 90, aRx: 90, eL: 25, eR: 25, lLx: 90, lRx: 90, kL: 90, kR: 90, hx: -25 }],
    [0.2,  { px: -75, ry: 90, y: 0.22, aLz: 150, eL: 5, aRx: 90, eR: 25, lRx: 15, kR: 5, lLx: 90, kL: 90, hx: -25 }],
    [0.38, { px: -75, ry: 90, y: 0.22, aLz: 150, eL: 5, aRx: 90, eR: 25, lRx: 15, kR: 5, lLx: 90, kL: 90, hx: -25, squash: 1.02 }],
    [0.5,  { px: -75, ry: 90, y: 0.22, aLx: 90, aRx: 90, eL: 25, eR: 25, lLx: 90, lRx: 90, kL: 90, kR: 90, hx: -25 }],
    [0.7,  { px: -75, ry: 90, y: 0.22, aRz: 150, eR: 5, aLx: 90, eL: 25, lLx: 15, kL: 5, lRx: 90, kR: 90, hx: -25 }],
    [0.88, { px: -75, ry: 90, y: 0.22, aRz: 150, eR: 5, aLx: 90, eL: 25, lLx: 15, kL: 5, lRx: 90, kR: 90, hx: -25, squash: 1.02 }],
  ]},

  // bird dog: all-fours, opposite arm forward + leg back, hold, swap
  birddog: { dur: 3.4, cam: 'floor', keys: [
    [0.0,  { ry: 100, px: 45, y: -0.08, aLx: 55, aRx: 55, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -35 }],
    [0.15, { ry: 100, px: 45, y: -0.08, aLx: 160, eL: 5, aRx: 55, eR: 5, lRx: -60, kR: 5, lLx: 85, kL: 110, hx: -35 }],
    [0.4,  { ry: 100, px: 45, y: -0.08, aLx: 160, eL: 5, aRx: 55, eR: 5, lRx: -60, kR: 5, lLx: 85, kL: 110, hx: -35, squash: 1.02 }],
    [0.5,  { ry: 100, px: 45, y: -0.08, aLx: 55, aRx: 55, eL: 5, eR: 5, lLx: 85, lRx: 85, kL: 110, kR: 110, hx: -35 }],
    [0.65, { ry: 100, px: 45, y: -0.08, aRx: 160, eR: 5, aLx: 55, eL: 5, lLx: -60, kL: 5, lRx: 85, kR: 110, hx: -35 }],
    [0.9,  { ry: 100, px: 45, y: -0.08, aRx: 160, eR: 5, aLx: 55, eL: 5, lLx: -60, kL: 5, lRx: 85, kR: 110, hx: -35, squash: 1.02 }],
  ]},

  // standing quad stretch: heel to butt, hand holding, balance wobble
  quadstretch: { dur: 3, keys: [
    [0.0,  { ry: 30, lLx: -25, kL: 140, aLx: -35, eL: 100, aRz: 80, eR: 8, kR: 3 }],
    [0.33, { ry: 30, lLx: -25, kL: 140, aLx: -35, eL: 100, aRz: 84, eR: 8, kR: 3, rz: 2, squash: 1.02 }],
    [0.66, { ry: 30, lLx: -25, kL: 140, aLx: -35, eL: 100, aRz: 76, eR: 8, kR: 3, rz: -2 }],
  ]},

  // chest opener: arms swept back-low, chest proud, pulse deeper
  chestopener: { dur: 3.2, keys: [
    [0.0,  { aLx: -18, aRx: -18, aLz: 18, aRz: 18, eL: 5, eR: 5, bend: -8, hx: -8 }],
    [0.4,  { aLx: -30, aRx: -30, aLz: 25, aRz: 25, eL: 5, eR: 5, bend: -15, squash: 1.04, hx: -15 }],
    [0.6,  { aLx: -32, aRx: -32, aLz: 25, aRz: 25, eL: 5, eR: 5, bend: -17, squash: 1.05, hx: -16 }],
    [0.85, { aLx: -22, aRx: -22, aLz: 20, aRz: 20, eL: 5, eR: 5, bend: -10, hx: -10 }],
  ]},
};
