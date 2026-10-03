// Boo — Kinetic's gym-buddy ghost. A chibi blob with stubby limbs, built
// entirely from three.js primitives and posed by a tiny keyframe engine.
//
// ── Pose parameters (all rotations in DEGREES, offsets in scene units) ──
//   y     root height offset          (0 = standing on the ground)
//   z     root forward offset         (+ = toward camera)
//   px    root pitch                  (+ = tip forward, face toward floor)
//   ry    root yaw                    (+ = turn left; use ±60..90 for side view)
//   rz    root roll                   (+ = lean to his right from camera)
//   squash body vertical squash/stretch (1 = neutral, <1 squashed)
//   bend  body bend forward           (+ = hunch toward camera)
//   hx    head-ish tilt of the face group (+ = look down)
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

export function buildGhost() {
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf2f4ff, roughness: 0.38, metalness: 0.0 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x23213a, roughness: 0.5 });
  const blushMat = new THREE.MeshStandardMaterial({ color: 0xffa8c0, roughness: 0.6 });

  const root = new THREE.Group();
  // YXZ: pitch tips the body face-down first, then yaw turns the whole
  // (possibly planked) body around the world's up axis — so a floor pose
  // can face any direction without rolling.
  root.rotation.order = 'YXZ';
  const parts = { root };

  // body blob (head + torso in one)
  const body = new THREE.Group();
  const blob = new THREE.Mesh(new THREE.SphereGeometry(0.55, 48, 36), bodyMat);
  blob.position.y = 0.95;
  blob.scale.set(1, 1.14, 0.92);
  body.add(blob);

  // cowlick curl on top
  const curl = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 16), bodyMat);
  curl.position.set(0.05, 1.6, 0);
  const curl2 = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 12), bodyMat);
  curl2.position.set(0.14, 1.66, 0);
  body.add(curl, curl2);

  // face — child of the blob mesh, positioned in its pre-scale sphere space,
  // so hx slides the features along the surface without ever detaching.
  const face = new THREE.Group();
  const eyeGeo = new THREE.SphereGeometry(1, 20, 16);
  const eyeL = new THREE.Mesh(eyeGeo, darkMat); eyeL.scale.set(0.055, 0.085, 0.03); eyeL.position.set(-0.17, 0.096, 0.5);
  const eyeR = new THREE.Mesh(eyeGeo, darkMat); eyeR.scale.set(0.055, 0.085, 0.03); eyeR.position.set(0.17, 0.096, 0.5);
  const mouth = new THREE.Mesh(eyeGeo, darkMat); mouth.scale.set(0.055, 0.037, 0.02); mouth.position.set(0, -0.062, 0.545);
  const blL = new THREE.Mesh(eyeGeo, blushMat); blL.scale.set(0.07, 0.042, 0.02); blL.position.set(-0.31, -0.018, 0.44); blL.rotation.y = -0.5;
  const blR = new THREE.Mesh(eyeGeo, blushMat); blR.scale.set(0.07, 0.042, 0.02); blR.position.set(0.31, -0.018, 0.44); blR.rotation.y = 0.5;
  face.add(eyeL, eyeR, mouth, blL, blR);
  blob.add(face);
  parts.face = face;
  root.add(body);
  parts.body = body;
  parts.blob = blob;

  // limb factory: shoulder/hip group -> upper capsule -> joint group -> lower capsule + tip
  function limb(upperLen, lowerLen, r) {
    const g = new THREE.Group();
    const upper = new THREE.Mesh(new THREE.CapsuleGeometry(r, upperLen, 6, 14), bodyMat);
    upper.position.y = -upperLen / 2;
    g.add(upper);
    const joint = new THREE.Group();
    joint.position.y = -upperLen;
    const lower = new THREE.Mesh(new THREE.CapsuleGeometry(r * 0.92, lowerLen, 6, 14), bodyMat);
    lower.position.y = -lowerLen / 2;
    joint.add(lower);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(r * 1.35, 16, 12), bodyMat);
    tip.position.y = -lowerLen;
    joint.add(tip);
    g.add(joint);
    return { g, joint };
  }

  const armL = limb(0.26, 0.24, 0.085);
  armL.g.position.set(-0.44, 1.02, 0);
  const armR = limb(0.26, 0.24, 0.085);
  armR.g.position.set(0.44, 1.02, 0);
  root.add(armL.g, armR.g);

  const legL = limb(0.24, 0.22, 0.1);
  legL.g.position.set(-0.2, 0.52, 0);
  const legR = limb(0.24, 0.22, 0.1);
  legR.g.position.set(0.2, 0.52, 0);
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
  face.rotation.x = rad(p.hx);
  const s = p.squash;
  blob.scale.set(1 + (1 - s) * 0.55, 1.14 * s, 0.92 * (1 + (1 - s) * 0.55));
  armL.g.rotation.set(rad(-p.aLx), 0, rad(-p.aLz));
  armR.g.rotation.set(rad(-p.aRx), 0, rad(p.aRz));
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

export class GhostScene {
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

    this.scene.add(new THREE.AmbientLight(0x9a96c8, 1.05));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(2.5, 4, 3.5);
    this.scene.add(key);
    const rim = new THREE.PointLight(0xa78bfa, 14, 20);
    rim.position.set(-2.5, 1.8, -2.5);
    this.scene.add(rim);
    const fill = new THREE.PointLight(0x6ee7c8, 5, 15);
    fill.position.set(2, 0.4, 2.5);
    this.scene.add(fill);

    this.parts = buildGhost();
    this.scene.add(this.parts.root);

    // soft blob shadow
    this.shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.62, 40),
      new THREE.MeshBasicMaterial({ color: 0x0b0a1e, transparent: true, opacity: 0.42 })
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
    if (typeof cam === 'string') cam = GhostScene.CAMS[cam] || {};
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
