// Standing cardio moves — authored batch A.
export const ANIMS_A = {

  // sprint-in-place: march cranked up — knees to the sky, arms pumping
  highknees: { dur: 0.55, keys: [
    [0.0,  { lLx: 75, kL: 95, lRx: -10, kR: 5, aLx: -40, aRx: 55, eL: 70, eR: 70, y: 0.02 }],
    [0.25, { lLx: 25, kL: 30, lRx: 0, kR: 12, aLx: 5, aRx: 5, eL: 60, eR: 60, y: 0.06, squash: 1.02 }],
    [0.5,  { lRx: 75, kR: 95, lLx: -10, kL: 5, aRx: -40, aLx: 55, eL: 70, eR: 70, y: 0.02 }],
    [0.75, { lRx: 25, kR: 30, lLx: 0, kL: 12, aLx: 5, aRx: 5, eL: 60, eR: 60, y: 0.06, squash: 1.02 }],
  ]},

  // quarter-squat ready stance, feet drumming fast
  fastfeet: { dur: 0.35, keys: [
    [0.0, { y: -0.12, lLx: 52, lRx: 18, kL: 72, kR: 30, lLz: 10, lRz: 10, aLx: 45, aRx: 45, eL: 70, eR: 70, bend: 12, squash: 0.99 }],
    [0.5, { y: -0.1,  lLx: 18, lRx: 52, kL: 30, kR: 72, lLz: 10, lRz: 10, aLx: 45, aRx: 45, eL: 70, eR: 70, bend: 12, squash: 1.01 }],
  ]},

  // lateral bound: land on one bent leg, other trailing behind-across, then spring over
  skater: { dur: 1.1, keys: [
    [0.0,  { rz: -12, y: -0.16, lLx: 40, kL: 62, lLz: 14, lRx: -38, kR: 60, lRz: -16, aLx: -32, aRx: 58, eL: 30, eR: 45, bend: 14 }],
    [0.25, { rz: 0, y: 0.1, lLx: 8, kL: 25, lRx: 8, kR: 25, lLz: 12, lRz: 12, aLx: 15, aRx: 15, eL: 25, eR: 25, squash: 1.04 }],
    [0.5,  { rz: 12, y: -0.16, lRx: 40, kR: 62, lRz: 14, lLx: -38, kL: 60, lLz: -16, aRx: -32, aLx: 58, eR: 30, eL: 45, bend: 14 }],
    [0.75, { rz: 0, y: 0.1, lLx: 8, kL: 25, lRx: 8, kR: 25, lLz: 12, lRz: 12, aLx: 15, aRx: 15, eL: 25, eR: 25, squash: 1.04 }],
  ]},

  // boxer bounce with alternating straight punches, guard hand up
  shadowbox: { dur: 0.8, keys: [
    [0.0,  { aLx: 85, eL: 5, aRx: 45, eR: 120, ry: -18, y: -0.03, lLx: 12, lRx: 12, kL: 20, kR: 20, bend: 8 }],
    [0.25, { aLx: 50, eL: 95, aRx: 50, eR: 95, ry: 0, y: 0.04, lLx: 14, lRx: 14, kL: 24, kR: 24, bend: 8, squash: 1.02 }],
    [0.5,  { aRx: 85, eR: 5, aLx: 45, eL: 120, ry: 18, y: -0.03, lLx: 12, lRx: 12, kL: 20, kR: 20, bend: 8 }],
    [0.75, { aLx: 50, eL: 95, aRx: 50, eR: 95, ry: 0, y: 0.04, lLx: 14, lRx: 14, kL: 24, kR: 24, bend: 8, squash: 1.02 }],
  ]},

  // squat down, stand up throwing a punch — left rep then right rep
  squatpunch: { dur: 1.8, keys: [
    [0.0,  { y: -0.26, kL: 88, kR: 88, lLx: 58, lRx: 58, lLz: 12, lRz: 12, bend: 16, aLx: 40, aRx: 40, eL: 70, eR: 70, squash: 0.97 }],
    [0.2,  { aLx: 88, eL: 5, aRx: 42, eR: 115, ry: -18, lLz: 9, lRz: 9, squash: 1.02 }],
    [0.34, { aLx: 88, eL: 5, aRx: 42, eR: 115, ry: -18, lLz: 9, lRz: 9 }],
    [0.5,  { y: -0.26, kL: 88, kR: 88, lLx: 58, lRx: 58, lLz: 12, lRz: 12, bend: 16, aLx: 40, aRx: 40, eL: 70, eR: 70, squash: 0.97 }],
    [0.7,  { aRx: 88, eR: 5, aLx: 42, eL: 115, ry: 18, lLz: 9, lRz: 9, squash: 1.02 }],
    [0.84, { aRx: 88, eR: 5, aLx: 42, eL: 115, ry: 18, lLz: 9, lRz: 9 }],
  ]},

  // stand -> crouch -> plank -> crouch -> JUMP with arms overhead
  burpee: { dur: 2.6, keys: [
    [0.0,  { aLz: 12, aRz: 12, eL: 12, eR: 12 }],
    [0.1,  { y: -0.34, kL: 95, kR: 95, lLx: 66, lRx: 66, lLz: 12, lRz: 12, bend: 34, hx: 25, aLx: 30, aRx: 30, eL: 8, eR: 8, squash: 0.95 }],
    [0.24, { ry: 100, px: 55, y: 0.24, aLx: 92, aRx: 92, eL: 10, eR: 10, lLx: -16, lRx: -16, kL: 10, kR: 10, hx: -78, bend: -10 }],
    [0.42, { ry: 100, px: 55, y: 0.24, aLx: 92, aRx: 92, eL: 10, eR: 10, lLx: -16, lRx: -16, kL: 10, kR: 10, hx: -78, bend: -10 }],
    [0.56, { y: -0.34, kL: 95, kR: 95, lLx: 66, lRx: 66, lLz: 12, lRz: 12, bend: 34, hx: 25, aLx: 30, aRx: 30, eL: 8, eR: 8, squash: 0.95 }],
    [0.7,  { y: 0.3, aLz: 170, aRz: 170, eL: 5, eR: 5, squash: 1.06, hx: -12 }],
    [0.85, { y: 0.02, aLz: 60, aRz: 60, eL: 10, eR: 10, kL: 30, kR: 30, lLx: 20, lRx: 20, squash: 0.98 }],
  ]},

  // deep squat, explode up into a jump, land back down
  squatjump: { dur: 1.4, keys: [
    [0.0,  { y: -0.26, kL: 88, kR: 88, lLx: 58, lRx: 58, lLz: 12, lRz: 12, bend: 18, aLx: -35, aRx: -35, eL: 10, eR: 10, squash: 0.96 }],
    [0.15, { y: -0.26, kL: 88, kR: 88, lLx: 58, lRx: 58, lLz: 12, lRz: 12, bend: 18, aLx: -35, aRx: -35, eL: 10, eR: 10, squash: 0.96 }],
    [0.35, { y: 0.3, aLz: 165, aRz: 165, eL: 5, eR: 5, squash: 1.06, hx: -10 }],
    [0.5,  { y: 0.12, aLz: 120, aRz: 120, eL: 8, eR: 8, kL: 20, kR: 20, lLx: 12, lRx: 12 }],
    [0.65, { y: -0.26, kL: 88, kR: 88, lLx: 58, lRx: 58, lLz: 12, lRz: 12, bend: 18, aLx: -20, aRx: -20, eL: 10, eR: 10, squash: 0.94 }],
  ]},

  // wide step to each side, arms sweeping overhead
  sidestep: { dur: 1.6, keys: [
    [0.0,  { aLz: 14, aRz: 14, eL: 10, eR: 10, lLz: 5, lRz: 5 }],
    [0.25, { rz: -12, y: -0.06, lLz: 38, kL: 30, lRz: -4, aLz: 165, aRz: 165, eL: 8, eR: 8 }],
    [0.5,  { aLz: 14, aRz: 14, eL: 10, eR: 10, lLz: 5, lRz: 5 }],
    [0.75, { rz: 12, y: -0.06, lRz: 38, kR: 30, lLz: -4, aLz: 165, aRz: 165, eL: 8, eR: 8 }],
  ]},

  // feet planted, arms racked at 90, shoulders swinging side to side
  torsotwist: { dur: 1.4, keys: [
    [0.0, { ry: 35, aLx: 20, aRx: 20, aLz: 28, aRz: 28, eL: 90, eR: 90, lLz: 12, lRz: 12, kL: 8, kR: 8 }],
    [0.5, { ry: -35, aLx: 20, aRx: 20, aLz: 28, aRz: 28, eL: 90, eR: 90, lLz: 12, lRz: 12, kL: 8, kR: 8 }],
  ]},

  // T-pose arms sweeping circles (phase-offset x/z cycles)
  armcircles: { dur: 1.3, keys: [
    [0.0,  { aLx: 30, aRx: 30, aLz: 90, aRz: 90, eL: 5, eR: 5, lLz: 8, lRz: 8 }],
    [0.25, { aLx: 0, aRx: 0, aLz: 115, aRz: 115, eL: 5, eR: 5, lLz: 8, lRz: 8 }],
    [0.5,  { aLx: -30, aRx: -30, aLz: 90, aRz: 90, eL: 5, eR: 5, lLz: 8, lRz: 8 }],
    [0.75, { aLx: 0, aRx: 0, aLz: 65, aRz: 65, eL: 5, eR: 5, lLz: 8, lRz: 8 }],
  ]},

  // hands on hips, hips stirring a big slow circle
  hipcircles: { dur: 1.6, keys: [
    [0.0,  { bend: 8, rz: 0, z: -0.06, aLz: 35, aRz: 35, eL: 95, eR: 95, lLz: 12, lRz: 12, kL: 12, kR: 12, y: -0.03 }],
    [0.25, { bend: 0, rz: 10, z: 0, aLz: 35, aRz: 35, eL: 95, eR: 95, lLz: 12, lRz: 12, kL: 12, kR: 12, y: -0.03 }],
    [0.5,  { bend: -8, rz: 0, z: 0.06, aLz: 35, aRz: 35, eL: 95, eR: 95, lLz: 12, lRz: 12, kL: 12, kR: 12, y: -0.03 }],
    [0.75, { bend: 0, rz: -10, z: 0, aLz: 35, aRz: 35, eL: 95, eR: 95, lLz: 12, lRz: 12, kL: 12, kR: 12, y: -0.03 }],
  ]},

  // slow rise onto tiptoes, hold at the top, sink back down
  calfraise: { dur: 1.6, keys: [
    [0.0,  { y: 0, aLz: 12, aRz: 12, eL: 15, eR: 15, lLz: 6, lRz: 6 }],
    [0.3,  { y: 0.1, squash: 1.03, aLz: 12, aRz: 12, eL: 15, eR: 15, lLz: 6, lRz: 6 }],
    [0.55, { y: 0.1, squash: 1.03, aLz: 12, aRz: 12, eL: 15, eR: 15, lLz: 6, lRz: 6 }],
    [0.8,  { y: 0, aLz: 12, aRz: 12, eL: 15, eR: 15, lLz: 6, lRz: 6 }],
  ]},
};
