// The coach — a chibi footballer in the red-and-green #7 kit, built entirely
// from three.js primitives and posed by a tiny keyframe engine.
//
// ── Pose parameters (all rotations in DEGREES, offsets in scene units) ──
//   y     root height offset          (0 = standing on the ground)
//   z     root forward offset         (+ = toward camera)
//   px    root pitch                  (+ = tip forward, face toward floor)
//   ry    root yaw                    (+ = turn left; use ±60..90 for side view)
//   rz    root roll                   (+ = lean to his right from camera)
//   squash body vertical squash/stretch (1 = neutral, <1 squashed)
//   bend  torso hinge at the hips     (+ = hunch toward camera; arms keep their angles)
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

export function buildCoach() {
  const mat = (color, roughness = 0.55, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...extra });
  const skin = mat(0xd9a07a, 0.6);
  const kitRed = mat(0xc8102e, 0.62);
  const kitGreen = mat(0x0b6b3a, 0.62);
  const hair = mat(0x2a1a12, 0.42);
  const ink = mat(0x1d1414, 0.5);
  const white = mat(0xf4f1ea, 0.4);
  const gold = mat(0xf5c451, 0.3, { metalness: 0.35 });

  const sphere = (r, m, ws = 28, hs = 20) => new THREE.Mesh(new THREE.SphereGeometry(r, ws, hs), m);

  const root = new THREE.Group();
  // YXZ: pitch tips the body face-down first, then yaw turns the whole
  // (possibly planked) body around the world's up axis — so a floor pose
  // can face any direction without rolling.
  root.rotation.order = 'YXZ';
  const parts = { root };

  // shorts — stay with the hips, never bend
  const shorts = sphere(1, kitGreen);
  shorts.scale.set(0.34, 0.15, 0.25);
  shorts.position.y = 0.55;
  root.add(shorts);

  // torso group pivots at the hips, so `bend` hinges the jersey, head and arms together
  const body = new THREE.Group();
  body.position.y = 0.52;
  root.add(body);
  const torso = new THREE.Group(); // squash/stretch target
  body.add(torso);

  // athletic V: tapered trunk, rounded shoulders on top
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.26, 0.42, 32), kitRed);
  trunk.scale.z = 0.72;
  trunk.position.y = 0.25;
  const shoulders = sphere(1, kitRed, 36, 20);
  shoulders.scale.set(0.37, 0.15, 0.25);
  shoulders.position.y = 0.46;
  const waist = sphere(1, kitRed, 32, 16);
  waist.scale.set(0.26, 0.08, 0.19);
  waist.position.y = 0.04;
  torso.add(trunk, shoulders, waist);
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.025, 10, 24), kitGreen);
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 0.56;
  torso.add(collar);

  // shirt number on the back, a small one on the chest, and a gold crest
  const numTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    g.fillStyle = '#f5c451';
    g.font = '900 112px Impact, "Arial Black", sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText('7', 64, 70);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const numMat = new THREE.MeshBasicMaterial({ map: numTex, transparent: true });
  const backNum = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), numMat);
  backNum.position.set(0, 0.28, -0.232);
  backNum.rotation.y = Math.PI;
  const chestNum = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.13), numMat);
  chestNum.position.set(0.12, 0.33, 0.232);
  chestNum.rotation.y = 0.3;
  const crest = new THREE.Mesh(new THREE.CircleGeometry(0.035, 20), gold);
  crest.position.set(-0.12, 0.34, 0.232);
  crest.rotation.y = -0.3;
  torso.add(backNum, chestNum, crest);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.12, 16), skin);
  neck.position.y = 0.6;
  torso.add(neck);

  // head pivots at the neck; `hx` nods it
  const head = new THREE.Group();
  head.position.y = 0.6;
  torso.add(head);
  const R = 0.33;
  const skull = sphere(R, skin, 40, 30);
  skull.position.y = 0.3;
  skull.scale.set(1, 1.05, 0.98);
  head.add(skull);
  const earGeo = new THREE.SphereGeometry(0.06, 14, 10);
  const earL = new THREE.Mesh(earGeo, skin); earL.position.set(-R, 0.29, -0.01); earL.scale.set(0.6, 1, 0.8);
  const earR = new THREE.Mesh(earGeo, skin); earR.position.set(R, 0.29, -0.01); earR.scale.set(0.6, 1, 0.8);
  head.add(earL, earR);

  // slick short hair: a cap tipped back to show the forehead, plus the signature quiff
  const cap = new THREE.Mesh(new THREE.SphereGeometry(R * 1.05, 36, 18, 0, Math.PI * 2, 0, 1.25), hair);
  cap.position.y = 0.31;
  cap.rotation.x = -0.42;
  head.add(cap);
  const quiff = sphere(1, hair);
  quiff.scale.set(0.19, 0.08, 0.13);
  quiff.position.set(0.02, 0.6, 0.15);
  quiff.rotation.x = -0.35;
  quiff.rotation.z = -0.08;
  const quiff2 = sphere(1, hair);
  quiff2.scale.set(0.12, 0.06, 0.09);
  quiff2.position.set(0.07, 0.63, 0.21);
  quiff2.rotation.x = -0.5;
  head.add(quiff, quiff2);

  // face — confident brows, bright eyes, big grin
  const dot = new THREE.SphereGeometry(1, 16, 12);
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(dot, ink);
    eye.scale.set(0.034, 0.048, 0.02);
    eye.position.set(0.11 * s, 0.33, 0.305);
    const glint = new THREE.Mesh(dot, white);
    glint.scale.setScalar(0.011);
    glint.position.set(0.11 * s + 0.01, 0.345, 0.322);
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.022, 0.02), hair);
    brow.position.set(0.115 * s, 0.405, 0.295);
    brow.rotation.z = -0.18 * s;
    brow.rotation.y = 0.3 * s;
    head.add(eye, glint, brow);
  }
  const nose = sphere(0.035, skin, 12, 10);
  nose.position.set(0, 0.275, 0.33);
  const grin = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.014, 8, 20, Math.PI), ink);
  grin.position.set(0, 0.215, 0.305);
  grin.rotation.z = Math.PI;
  grin.rotation.x = -0.25;
  const teeth = new THREE.Mesh(new THREE.CircleGeometry(0.06, 20, Math.PI, Math.PI), white);
  teeth.position.set(0, 0.214, 0.31);
  teeth.rotation.x = -0.25;
  head.add(nose, grin, teeth);

  Object.assign(parts, { body, blob: torso, face: head });

  // limb factory: shoulder/hip group -> upper capsule -> joint group -> lower capsule + tip
  function limb(upperLen, lowerLen, r, upperMat, lowerMat, tipMat, sleeveMat, sleeveLen) {
    const g = new THREE.Group();
    const upper = new THREE.Mesh(new THREE.CapsuleGeometry(r, upperLen, 6, 14), upperMat);
    upper.position.y = -upperLen / 2;
    g.add(upper);
    if (sleeveMat) {
      const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.45, r * 1.35, sleeveLen, 16), sleeveMat);
      sleeve.position.y = -sleeveLen / 2 + r * 0.4;
      g.add(sleeve);
    }
    const joint = new THREE.Group();
    joint.position.y = -upperLen;
    const lower = new THREE.Mesh(new THREE.CapsuleGeometry(r * 0.92, lowerLen, 6, 14), lowerMat);
    lower.position.y = -lowerLen / 2;
    joint.add(lower);
    const tip = sphere(r * 1.35, tipMat, 16, 12);
    tip.position.y = -lowerLen;
    joint.add(tip);
    g.add(joint);
    return { g, joint, tip };
  }

  // arms ride on the torso so they follow `bend`; applyPose cancels the bend
  // out of their swing, keeping every authored arm angle where it was.
  const armL = limb(0.26, 0.24, 0.08, skin, skin, skin, kitRed, 0.2);
  armL.g.position.set(-0.43, 0.49, 0);
  const armR = limb(0.26, 0.24, 0.08, skin, skin, skin, kitRed, 0.2);
  armR.g.position.set(0.43, 0.49, 0);
  body.add(armL.g, armR.g);
  // captain's armband
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.087, 0.087, 0.05, 16), gold);
  band.position.y = -0.17;
  armL.g.add(band);

  const legL = limb(0.24, 0.22, 0.1, skin, kitRed, white, kitGreen, 0.16);
  legL.g.position.set(-0.19, 0.52, 0);
  const legR = limb(0.24, 0.22, 0.1, skin, kitRed, white, kitGreen, 0.16);
  legR.g.position.set(0.19, 0.52, 0);
  root.add(legL.g, legR.g);
  // boots: stretch the foot forward, gold stripe on the side
  for (const leg of [legL, legR]) {
    leg.tip.scale.set(0.9, 0.62, 1.45);
    leg.tip.position.z = 0.055;
    leg.tip.position.y -= 0.04;
    const stripe = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.014, 6, 20), gold);
    stripe.rotation.x = Math.PI / 2;
    stripe.position.y = -0.06;
    leg.joint.add(stripe);
  }

  Object.assign(parts, { armL, armR, legL, legR });
  return parts;
}

export function applyPose(parts, p) {
  const { root, body, blob, armL, armR, legL, legR, face } = parts;
  root.position.y = p.y;
  root.position.z = p.z;
  root.rotation.set(rad(p.px), rad(p.ry), rad(p.rz));
  body.rotation.x = rad(p.bend);
  face.rotation.x = rad(p.hx * 0.55);
  const s = p.squash;
  blob.scale.set(1 + (1 - s) * 0.4, s, 1 + (1 - s) * 0.4);
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

export class CoachScene {
  static CAMS = {
    floor: { x: 2.0, y: 1.7, z: 4.2, lookY: 0.35 },
    wide: { x: 1.9, y: 1.6, z: 5.0, lookY: 0.6 },
  };

  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    this.baseCam = { x: opts.camX ?? 1.7, y: opts.camY ?? 1.5, z: opts.camZ ?? 4.1, lookY: opts.lookY ?? 0.68 };
    this.setCam();

    this.scene.add(new THREE.AmbientLight(0xc8b8ae, 1.0));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(2.5, 4, 3.5);
    this.scene.add(key);
    const rim = new THREE.PointLight(0xff3b4e, 16, 20);
    rim.position.set(-2.5, 1.8, -2.5);
    this.scene.add(rim);
    const fill = new THREE.PointLight(0xffd27a, 5, 15);
    fill.position.set(2, 0.4, 2.5);
    this.scene.add(fill);

    this.parts = buildCoach();
    this.scene.add(this.parts.root);

    // soft blob shadow
    this.shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.62, 40),
      new THREE.MeshBasicMaterial({ color: 0x050404, transparent: true, opacity: 0.42 })
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = 0.005;
    this.scene.add(this.shadow);

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

  // anims may carry a camera hint: { cam: {x,y,z,lookY} } or a preset name —
  // 'floor' frames ground exercises, 'wide' pulls back for long poses.
  setCam(cam = {}) {
    if (typeof cam === 'string') cam = CoachScene.CAMS[cam] || {};
    const b = this.baseCam;
    this.camera.position.set(cam.x ?? b.x, cam.y ?? b.y, cam.z ?? b.z);
    this.camera.lookAt(0, cam.lookY ?? b.lookY, 0);
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
    this.shadow.material.opacity = Math.max(0.12, 0.42 - lift * 0.3);
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
