// The demo figure — a faceless training mannequin in matte graphite, lit like
// a studio film session. Built from three.js primitives, posed by keyframes.
//
// ── Pose parameters (all rotations in DEGREES, offsets in scene units) ──
//   y     root height offset          (0 = standing on the ground)
//   z     root forward offset         (+ = toward camera)
//   px    root pitch                  (+ = tip forward, face toward floor)
//   ry    root yaw                    (+ = turn left; use ±60..90 for side view)
//   rz    root roll                   (+ = lean to his right from camera)
//   squash torso vertical squash/stretch (1 = neutral, breathing)
//   bend  torso hinge at the hips     (+ = fold toward camera; arms keep their angles)
//   hx    head nod                    (+ = look down)
//   aLx aRx  arm swing, sagittal      (0 = hanging, 90 = straight forward, 180 = overhead)
//   aLz aRz  arm spread, frontal      (0 = hanging, 90 = T-pose, 170 = overhead)
//   eL eR    elbow bend               (0 = straight, 90 = right angle, curls forward)
//   lLx lRx  leg swing, sagittal      (+ = knee forward, - = leg trailing behind)
//   lLz lRz  leg spread, frontal      (+ = out to the side)
//   kL kR    knee bend                (0 = straight, + = heel kicks back)
//
// ── Animation format ──
//   { dur: seconds, keys: [ [t, poseOverrides], ... ] }   t in [0,1), sorted.
//   Poses interpolate smoothly between keys and wrap from the last key back
//   to the first, so a cycle needs no duplicated endpoint.

import * as THREE from './vendor/three.module.min.js';

export const DEFAULT_POSE = {
  y: 0, z: 0, px: 0, ry: 0, rz: 0, squash: 1, bend: 0, hx: 0,
  aLx: 0, aRx: 0, aLz: 10, aRz: 10, eL: 10, eR: 10,
  lLx: 0, lRx: 0, lLz: 4, lRz: 4, kL: 0, kR: 0,
};

const rad = (d) => d * Math.PI / 180;
const ease = (t) => t * t * (3 - 2 * t); // smoothstep

export function buildFigure() {
  const shell = new THREE.MeshStandardMaterial({ color: 0x3d3d42, roughness: 0.38, metalness: 0.3 });
  const joint = new THREE.MeshStandardMaterial({ color: 0x1a1a1d, roughness: 0.55, metalness: 0.1 });
  const accent = new THREE.MeshStandardMaterial({ color: 0xc8102e, roughness: 0.5, emissive: 0x3a0008 });

  const mesh = (geo, m) => new THREE.Mesh(geo, m);
  const ball = (r, m) => mesh(new THREE.SphereGeometry(r, 24, 18), m);

  const root = new THREE.Group();
  // YXZ: pitch tips the body face-down first, then yaw turns the whole
  // (possibly planked) body around the world's up axis.
  root.rotation.order = 'YXZ';
  const parts = { root };

  // pelvis stays with the hips
  const pelvis = mesh(new THREE.CylinderGeometry(0.2, 0.17, 0.16, 24), shell);
  pelvis.scale.z = 0.7;
  pelvis.position.y = 0.56;
  root.add(pelvis);

  // torso hinges at the hips
  const body = new THREE.Group();
  body.position.y = 0.52;
  root.add(body);
  const torso = new THREE.Group();
  body.add(torso);

  const waist = mesh(new THREE.CylinderGeometry(0.16, 0.17, 0.14, 24), joint);
  waist.scale.z = 0.7;
  waist.position.y = 0.1;
  const chest = mesh(new THREE.CylinderGeometry(0.27, 0.17, 0.36, 28), shell);
  chest.scale.z = 0.62;
  chest.position.y = 0.33;
  const yoke = ball(1, shell);
  yoke.scale.set(0.27, 0.085, 0.165);
  yoke.position.y = 0.51;
  // the only colour on the figure: a red seven-segment stripe down the sternum
  const stripe = mesh(new THREE.BoxGeometry(0.03, 0.26, 0.02), accent);
  stripe.position.set(0, 0.34, 0.165);
  stripe.rotation.x = -0.18;
  const backStripe = stripe.clone();
  backStripe.position.z = -0.165;
  backStripe.rotation.x = 0.18;
  torso.add(waist, chest, yoke, stripe, backStripe);

  const neck = mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.1, 16), joint);
  neck.position.y = 0.6;
  torso.add(neck);
  const head = new THREE.Group();
  head.position.y = 0.62;
  torso.add(head);
  const skull = ball(1, shell);
  skull.scale.set(0.105, 0.135, 0.12);
  skull.position.set(0, 0.12, 0.01);
  head.add(skull);
  Object.assign(parts, { body, blob: torso, face: head });

  // limb factory: upper segment -> joint ball -> lower segment -> hand/foot
  function limb(upperLen, lowerLen, r, foot) {
    const g = new THREE.Group();
    g.add(ball(r * 1.15, joint));
    const upper = mesh(new THREE.CapsuleGeometry(r, upperLen - r * 1.4, 6, 14), shell);
    upper.position.y = -upperLen / 2;
    g.add(upper);
    const j = new THREE.Group();
    j.position.y = -upperLen;
    j.add(ball(r * 0.95, joint));
    const lower = mesh(new THREE.CapsuleGeometry(r * 0.82, lowerLen - r * 1.4, 6, 14), shell);
    lower.position.y = -lowerLen / 2;
    j.add(lower);
    let tip;
    if (foot) {
      tip = mesh(new THREE.BoxGeometry(r * 1.5, r * 0.9, r * 3.2), joint);
      tip.position.set(0, -lowerLen - r * 0.1, r * 0.8);
    } else {
      tip = ball(r * 1.05, joint);
      tip.scale.set(0.8, 1.2, 0.9);
      tip.position.y = -lowerLen - r * 0.4;
    }
    j.add(tip);
    g.add(j);
    return { g, joint: j };
  }

  // arms ride on the torso so they follow `bend`; applyPose cancels the bend
  // out of their swing, keeping every authored arm angle where it was.
  const armL = limb(0.27, 0.25, 0.055);
  armL.g.position.set(-0.32, 0.49, 0);
  const armR = limb(0.27, 0.25, 0.055);
  armR.g.position.set(0.32, 0.49, 0);
  body.add(armL.g, armR.g);

  const legL = limb(0.25, 0.23, 0.075, true);
  legL.g.position.set(-0.11, 0.52, 0);
  const legR = limb(0.25, 0.23, 0.075, true);
  legR.g.position.set(0.11, 0.52, 0);
  root.add(legL.g, legR.g);

  Object.assign(parts, { armL, armR, legL, legR });
  return parts;
}

export function applyPose(parts, p) {
  const { root, body, blob, armL, armR, legL, legR, face } = parts;
  root.position.y = p.y;
  root.position.z = p.z;
  root.rotation.set(rad(p.px), rad(p.ry), rad(p.rz));
  body.rotation.x = rad(p.bend);
  face.rotation.x = rad(p.hx * 0.5);
  const s = p.squash;
  blob.scale.set(1 + (1 - s) * 0.3, s, 1 + (1 - s) * 0.3);
  armL.g.rotation.set(rad(-p.aLx - p.bend), 0, rad(-p.aLz));
  armR.g.rotation.set(rad(-p.aRx - p.bend), 0, rad(p.aRz));
  armL.joint.rotation.x = rad(-p.eL);
  armR.joint.rotation.x = rad(-p.eR);
  legL.g.rotation.set(rad(-p.lLx), 0, rad(-p.lLz));
  legR.g.rotation.set(rad(-p.lRx), 0, rad(p.lRz));
  legL.joint.rotation.x = rad(p.kL);
  legR.joint.rotation.x = rad(p.kR);
}

export function samplePose(anim, t01) {
  const keys = anim.keys;
  const n = keys.length;
  if (n === 1) return { ...DEFAULT_POSE, ...keys[0][1] };
  let i = n - 1;
  for (let k = 0; k < n; k++) { if (keys[k][0] <= t01) i = k; else break; }
  const j = (i + 1) % n;
  const t0 = keys[i][0];
  const t1 = j === 0 ? keys[0][0] + 1 : keys[j][0];
  const f = ease(Math.min(1, Math.max(0, (t01 - t0) / Math.max(1e-6, t1 - t0))));
  const a = { ...DEFAULT_POSE, ...keys[i][1] };
  const b = { ...DEFAULT_POSE, ...keys[j][1] };
  const out = {};
  for (const k in DEFAULT_POSE) out[k] = a[k] + (b[k] - a[k]) * f;
  return out;
}

export class FigureScene {
  static CAMS = {
    floor: { x: 2.0, y: 1.7, z: 4.2, lookY: 0.35 },
    wide: { x: 1.9, y: 1.6, z: 5.0, lookY: 0.6 },
  };

  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    this.baseCam = { x: opts.camX ?? 1.6, y: opts.camY ?? 1.3, z: opts.camZ ?? 4.0, lookY: opts.lookY ?? 0.66, lookX: opts.lookX ?? 0 };
    this.setCam();

    // studio: dim fill, hard white key, red rim from behind
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xfff4e8, 2.4);
    key.position.set(2.5, 4, 3);
    this.scene.add(key);
    const rim = new THREE.PointLight(0xe4002b, 26, 12);
    rim.position.set(-2, 1.6, -2.2);
    this.scene.add(rim);
    const rim2 = new THREE.PointLight(0xffffff, 6, 10);
    rim2.position.set(2.4, 1.2, -2);
    this.scene.add(rim2);

    this.parts = buildFigure();
    this.scene.add(this.parts.root);

    // floor: a soft contact shadow and a thin red baseline ring
    this.shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.5, 40),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.55 })
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = 0.004;
    this.scene.add(this.shadow);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.78, 0.785, 96),
      new THREE.MeshBasicMaterial({ color: 0xc8102e, transparent: true, opacity: 0.55 })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.002;
    this.scene.add(ring);

    this.anim = { dur: 2, keys: [[0, {}]] };
    this.t0 = performance.now();
    this.running = false;
    this.speed = 1;
    this.resize();
  }

  resize() {
    const w = this.canvas.clientWidth || 300, h = this.canvas.clientHeight || 300;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  // anims may carry a camera hint: { cam: {x,y,z,lookY} } or a preset name
  setCam(cam = {}) {
    if (typeof cam === 'string') cam = FigureScene.CAMS[cam] || {};
    const b = this.baseCam;
    this.camera.position.set(cam.x ?? b.x, cam.y ?? b.y, cam.z ?? b.z);
    this.camera.lookAt(cam.lookX ?? b.lookX, cam.lookY ?? b.lookY, 0);
  }

  setAnim(anim) {
    this.anim = anim || { dur: 2, keys: [[0, {}]] };
    this.setCam(this.anim.cam || {});
    this.t0 = performance.now();
  }

  setPhase(t01) {
    const p = samplePose(this.anim, t01 % 1);
    applyPose(this.parts, p);
    const lift = Math.max(0, p.y);
    this.shadow.scale.setScalar(Math.max(0.35, 1 - lift * 0.55));
    this.shadow.material.opacity = Math.max(0.15, 0.55 - lift * 0.35);
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = (now) => {
      if (!this.running) return;
      const t = ((now - this.t0) / 1000 * this.speed) / this.anim.dur;
      this.setPhase(t % 1);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  dispose() {
    this.stop();
    this.renderer.dispose();
  }
}
