import * as THREE from 'three';

// Energy Spark Particle System for the Battery Section
export class BatteryEnergyParticles {
  public group: THREE.Group;
  private particleGeo: THREE.BufferGeometry;
  private particleMat: THREE.PointsMaterial;
  private particleSystem: THREE.Points;
  private particleCount = 180;
  private positions: Float32Array;
  private originalPos: Float32Array;
  private speeds: Float32Array;

  constructor() {
    this.group = new THREE.Group();
    this.positions = new Float32Array(this.particleCount * 3);
    this.originalPos = new Float32Array(this.particleCount * 3);
    this.speeds = new Float32Array(this.particleCount);

    for (let i = 0; i < this.particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.25 + Math.random() * 0.45;
      const y = (Math.random() - 0.5) * 0.7;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      this.positions[i * 3] = x;
      this.positions[i * 3 + 1] = y;
      this.positions[i * 3 + 2] = z;

      this.originalPos[i * 3] = x;
      this.originalPos[i * 3 + 1] = y;
      this.originalPos[i * 3 + 2] = z;

      this.speeds[i] = 0.5 + Math.random() * 1.5;
    }

    this.particleGeo = new THREE.BufferGeometry();
    this.particleGeo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

    // Procedural glowing circular dot texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, 'rgba(0, 240, 255, 1)');
    grad.addColorStop(0.3, 'rgba(0, 255, 170, 0.8)');
    grad.addColorStop(0.8, 'rgba(0, 255, 170, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const particleTex = new THREE.CanvasTexture(canvas);

    this.particleMat = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTex,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particleSystem = new THREE.Points(this.particleGeo, this.particleMat);
    this.group.add(this.particleSystem);
    this.group.position.set(0, 1.0, 0.3); // Follows floating battery position
  }

  public update(time: number, visibility: number) {
    this.particleMat.opacity = Math.max(0, Math.min(1, visibility * 0.9));
    if (this.particleMat.opacity <= 0.01) return;

    const pos = this.particleGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < this.particleCount; i++) {
      const idx = i * 3;
      const speed = this.speeds[i];

      // Orbit around the center
      const currentX = pos[idx];
      const currentZ = pos[idx + 2];
      const angle = Math.atan2(currentZ, currentX) + 0.02 * speed;
      const r = Math.sqrt(currentX * currentX + currentZ * currentZ);

      pos[idx] = Math.cos(angle) * r;
      pos[idx + 1] = this.originalPos[idx + 1] + Math.sin(time * speed + i) * 0.08;
      pos[idx + 2] = Math.sin(angle) * r;
    }
    this.particleGeo.attributes.position.needsUpdate = true;
  }

  public dispose() {
    this.particleGeo.dispose();
    this.particleMat.dispose();
  }
}

// Motion Parallax Road & Speed Light Trails for Performance Section
export class PerformanceMotionTrails {
  public group: THREE.Group;
  private roadLines: THREE.InstancedMesh;
  private lineCount = 40;
  private trailMeshLeft: THREE.Mesh;
  private trailMeshRight: THREE.Mesh;
  private trailMat: THREE.MeshBasicMaterial;

  constructor() {
    this.group = new THREE.Group();

    // Road Grid / Speed Dashes on Floor
    const lineGeo = new THREE.PlaneGeometry(0.04, 1.2);
    const lineMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });

    this.roadLines = new THREE.InstancedMesh(lineGeo, lineMat, this.lineCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < this.lineCount; i++) {
      const track = (i % 4) - 1.5; // -1.5, -0.5, 0.5, 1.5
      dummy.position.set(track * 0.65, 0.012, (i / 4) * 2.5 - 12);
      dummy.rotation.x = -Math.PI / 2;
      dummy.updateMatrix();
      this.roadLines.setMatrixAt(i, dummy.matrix);
    }
    this.roadLines.instanceMatrix.needsUpdate = true;
    this.group.add(this.roadLines);

    // Glowing Aerodynamic Tail Light Ribbons
    const trailGeo = new THREE.PlaneGeometry(0.025, 4.0);
    this.trailMat = new THREE.MeshBasicMaterial({
      color: 0xff3b30,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    this.trailMeshLeft = new THREE.Mesh(trailGeo, this.trailMat);
    this.trailMeshLeft.position.set(-0.12, 0.69, -2.8);
    this.trailMeshLeft.rotation.x = Math.PI / 2;

    this.trailMeshRight = new THREE.Mesh(trailGeo, this.trailMat);
    this.trailMeshRight.position.set(0.12, 0.69, -2.8);
    this.trailMeshRight.rotation.x = Math.PI / 2;

    this.group.add(this.trailMeshLeft, this.trailMeshRight);
  }

  public update(deltaSpeed: number, intensity: number) {
    const clampedIntensity = Math.max(0, Math.min(1, intensity));
    (this.roadLines.material as THREE.MeshBasicMaterial).opacity = clampedIntensity * 0.45;
    this.trailMat.opacity = clampedIntensity * 0.7;

    if (clampedIntensity <= 0.01) return;

    // Stream road lines forward along Z axis for high speed effect
    const dummy = new THREE.Object3D();
    const mat = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const rot = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    for (let i = 0; i < this.lineCount; i++) {
      this.roadLines.getMatrixAt(i, mat);
      mat.decompose(pos, rot, scale);

      pos.z += deltaSpeed * 18.0;
      if (pos.z > 8) {
        pos.z -= 25;
      }

      dummy.position.copy(pos);
      dummy.quaternion.copy(rot);
      dummy.scale.copy(scale);
      dummy.updateMatrix();
      this.roadLines.setMatrixAt(i, dummy.matrix);
    }
    this.roadLines.instanceMatrix.needsUpdate = true;

    // Flutter trailing ribbons slightly
    const wobble = Math.sin(Date.now() * 0.02) * 0.015;
    this.trailMeshLeft.position.x = -0.12 + wobble;
    this.trailMeshRight.position.x = 0.12 - wobble;
  }

  public dispose() {
    this.roadLines.geometry.dispose();
    (this.roadLines.material as THREE.Material).dispose();
    this.trailMeshLeft.geometry.dispose();
    this.trailMat.dispose();
  }
}
