import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createScooterMaterials } from './materials';
import { createScooterModel, ScooterAssembly } from './scooterModel';
import { BatteryEnergyParticles, PerformanceMotionTrails } from './effects';
import { soundFX } from '../audio/soundFx';
import { ThemeMode } from '../types';

export interface SceneConfig {
  container: HTMLDivElement;
  onHotspotClick?: (hotspotId: string) => void;
}

export class ScooterScene {
  private container: HTMLDivElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private scooterAssembly: ScooterAssembly;
  private batteryParticles: BatteryEnergyParticles;
  private motionTrails: PerformanceMotionTrails;
  private oledUpdater: (speed: number, battery: number) => void;

  private floorMesh!: THREE.Mesh;
  private floorMat!: THREE.MeshStandardMaterial;
  private backdropHalo!: THREE.Mesh;
  private keyLight!: THREE.DirectionalLight;
  private rimLight!: THREE.DirectionalLight;
  private fillLight!: THREE.DirectionalLight;
  private hemiLight!: THREE.HemisphereLight;

  private isSoftwareGl: boolean = false;
  private frameId: number = 0;
  private clock: THREE.Clock = new THREE.Clock();

  // Scroll & Animation targets
  private scrollProgress: number = 0;
  private currentProgress: number = 0;
  private mousePos = new THREE.Vector2(0, 0);
  private targetMousePos = new THREE.Vector2(0, 0);

  // Active Hotspot
  private activeHotspotKey: string | null = null;

  // Manual Turntable Mode
  public isUserInteracting: boolean = false;
  public manualRotationY: number = 0;
  private targetManualRotationY: number = 0;

  // Headlight state
  public headlightsOn: boolean = true;
  public currentTheme: ThemeMode = 'studio';

  constructor(config: SceneConfig) {
    this.container = config.container;

    // Detect software WebGL
    this.isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene & Horizon Fog
    this.scene = new THREE.Scene();
    const bgColor = new THREE.Color(0xf8f9fa);
    this.scene.background = bgColor;
    this.scene.fog = new THREE.FogExp2(0xf8f9fa, 0.035);

    // 2. Camera
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 0.86, 4.2);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // 4. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio Lighting Rig
    this.setupLighting();

    // 6. Ground Studio Floor & Circular Backdrop Disc (Matching Photo)
    this.setupStudioFloor();

    // Set initial theme parameters
    this.setTheme('studio');

    // 7. Materials & 3D Scooter Assembly
    const { materials, oledUpdater } = createScooterMaterials('#FCFCFD', '#FF5500', 0.25, 0.14);
    this.oledUpdater = oledUpdater;
    this.scooterAssembly = createScooterModel(materials);
    this.scene.add(this.scooterAssembly.rootGroup);


    // 8. Particle System & Motion Trails
    this.batteryParticles = new BatteryEnergyParticles();
    this.scene.add(this.batteryParticles.group);

    this.motionTrails = new PerformanceMotionTrails();
    this.scene.add(this.motionTrails.group);

    // 9. Event Listeners
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointerMove);

    // 10. Start Loop
    this.clock.start();
    this.animate();
  }

  private setupLighting() {
    // Warm Key Light with soft shadow
    this.keyLight = new THREE.DirectionalLight(0xfffaed, 2.8);
    this.keyLight.position.set(4, 6, 4.5);
    this.keyLight.castShadow = !this.isSoftwareGl;
    if (this.keyLight.castShadow) {
      this.keyLight.shadow.mapSize.width = 2048;
      this.keyLight.shadow.mapSize.height = 2048;
      this.keyLight.shadow.camera.near = 0.5;
      this.keyLight.shadow.camera.far = 18;
      const d = 3.2;
      this.keyLight.shadow.camera.left = -d;
      this.keyLight.shadow.camera.right = d;
      this.keyLight.shadow.camera.top = d;
      this.keyLight.shadow.camera.bottom = -d;
      this.keyLight.shadow.bias = -0.0004;
      this.keyLight.shadow.normalBias = 0.02;
    }
    this.scene.add(this.keyLight);

    // Cool Rim Light
    this.rimLight = new THREE.DirectionalLight(0xdbeafe, 1.8);
    this.rimLight.position.set(-5, 4, -4);
    this.scene.add(this.rimLight);

    // Soft Studio Fill
    this.fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    this.fillLight.position.set(0, 3, -5);
    this.scene.add(this.fillLight);

    // Sky/Ground Hemisphere Ambient Fill
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 1.1);
    this.scene.add(this.hemiLight);
  }

  private setupStudioFloor() {
    // Large seamless floor plane
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    this.floorMat = new THREE.MeshStandardMaterial({
      color: 0xf1f3f7,
      roughness: 0.85,
      metalness: 0.1,
    });
    this.floorMesh = new THREE.Mesh(floorGeo, this.floorMat);
    this.floorMesh.rotation.x = -Math.PI / 2;
    this.floorMesh.position.y = 0.0;
    this.floorMesh.receiveShadow = true;
    this.scene.add(this.floorMesh);

    // Soft Circular Backdrop Halo Disc (Visible in uploaded photo!)
    const haloGeo = new THREE.CircleGeometry(1.65, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xe8ecf2,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    this.backdropHalo = new THREE.Mesh(haloGeo, haloMat);
    this.backdropHalo.position.set(-0.25, 0.78, -1.6);
    this.scene.add(this.backdropHalo);
  }

  private onResize = () => {
    if (!this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private onPointerMove = (e: PointerEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.targetMousePos.set(x, y);

    if (this.isUserInteracting) {
      this.targetManualRotationY += e.movementX * 0.008;
    }
  };

  public setScrollProgress(progress: number) {
    this.scrollProgress = Math.max(0, Math.min(1, progress));
  }

  public setActiveHotspot(hotspotKey: string | null) {
    this.activeHotspotKey = hotspotKey;
  }

  public setVehicleColor(
    primaryHex: string,
    accentHex: string,
    metalness: number,
    roughness: number
  ) {
    this.scooterAssembly.updateMaterialsColor(primaryHex, accentHex, metalness, roughness);
  }

  public setTheme(theme: ThemeMode) {
    this.currentTheme = theme;

    if (theme === 'midnight') {
      // Midnight Obsidian Dark Theme
      this.scene.background = new THREE.Color(0x0a0d14);
      if (this.scene.fog) {
        (this.scene.fog as THREE.FogExp2).color.set(0x0a0d14);
      }
      this.floorMat.color.set(0x080a10);
      this.floorMat.roughness = 0.45;
      this.floorMat.metalness = 0.55;
      this.floorMat.needsUpdate = true;

      (this.backdropHalo.material as THREE.MeshBasicMaterial).color.set(0x131a28);
      (this.backdropHalo.material as THREE.MeshBasicMaterial).opacity = 0.5;

      this.keyLight.color.set(0xf8fafc);
      this.keyLight.intensity = 2.4;
      this.rimLight.color.set(0x38bdf8);
      this.rimLight.intensity = 3.2;
      this.hemiLight.color.set(0x38bdf8);
      this.hemiLight.groundColor.set(0x06080d);
      this.hemiLight.intensity = 0.8;
    } else if (theme === 'cyber') {
      // Cyber Neon Tech Theme
      this.scene.background = new THREE.Color(0x040812);
      if (this.scene.fog) {
        (this.scene.fog as THREE.FogExp2).color.set(0x040812);
      }
      this.floorMat.color.set(0x03060d);
      this.floorMat.roughness = 0.35;
      this.floorMat.metalness = 0.7;
      this.floorMat.needsUpdate = true;

      (this.backdropHalo.material as THREE.MeshBasicMaterial).color.set(0x0b253a);
      (this.backdropHalo.material as THREE.MeshBasicMaterial).opacity = 0.6;

      this.keyLight.color.set(0xe0f2fe);
      this.keyLight.intensity = 2.6;
      this.rimLight.color.set(0x00f0ff);
      this.rimLight.intensity = 3.6;
      this.hemiLight.color.set(0x00f0ff);
      this.hemiLight.groundColor.set(0x030712);
      this.hemiLight.intensity = 0.9;
    } else {
      // Studio Pearl (Matches uploaded photo!)
      this.scene.background = new THREE.Color(0xf6f7f9);
      if (this.scene.fog) {
        (this.scene.fog as THREE.FogExp2).color.set(0xf6f7f9);
      }
      this.floorMat.color.set(0xf1f3f7);
      this.floorMat.roughness = 0.85;
      this.floorMat.metalness = 0.1;
      this.floorMat.needsUpdate = true;

      (this.backdropHalo.material as THREE.MeshBasicMaterial).color.set(0xe8ecf2);
      (this.backdropHalo.material as THREE.MeshBasicMaterial).opacity = 0.85;

      this.keyLight.color.set(0xfffaed);
      this.keyLight.intensity = 2.8;
      this.rimLight.color.set(0xdbeafe);
      this.rimLight.intensity = 1.8;
      this.hemiLight.color.set(0xffffff);
      this.hemiLight.groundColor.set(0xe2e8f0);
      this.hemiLight.intensity = 1.1;
    }
  }

  public toggleHeadlights(forceState?: boolean): boolean {
    this.headlightsOn = forceState !== undefined ? forceState : !this.headlightsOn;
    this.scooterAssembly.headlightLight.intensity = this.headlightsOn ? 5.5 : 0;
    this.scooterAssembly.headlightBeam.visible = this.headlightsOn;
    return this.headlightsOn;
  }

  private animate = () => {
    this.frameId = requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const time = this.clock.getElapsedTime();

    // Smooth scroll interpolation
    this.currentProgress = THREE.MathUtils.damp(
      this.currentProgress,
      this.scrollProgress,
      4.5,
      delta
    );

    // Smooth mouse parallax
    this.mousePos.x = THREE.MathUtils.damp(this.mousePos.x, this.targetMousePos.x, 3.5, delta);
    this.mousePos.y = THREE.MathUtils.damp(this.mousePos.y, this.targetMousePos.y, 3.5, delta);

    // Smooth manual turntable rotation
    this.manualRotationY = THREE.MathUtils.damp(
      this.manualRotationY,
      this.targetManualRotationY,
      6.0,
      delta
    );

    // Apply Cinematic Section Animation & Camera Choreography
    this.updateSceneState(time, delta);

    // Render Scene
    this.renderer.render(this.scene, this.camera);
  };

  private updateSceneState(time: number, delta: number) {
    const p = this.currentProgress;
    const root = this.scooterAssembly.rootGroup;

    // Default target vectors
    const camTargetPos = new THREE.Vector3();
    const camLookAt = new THREE.Vector3(0, 0.65, 0);

    // Grounded vehicle position on floor
    const floatBob = 0;

    // Reset base positions
    root.position.set(0, floatBob, 0);

    // Dock/Undock Charging Cable based on motion state
    const isMovingSection = p > 0.44 && p <= 0.62;
    this.scooterAssembly.setMotionState(isMovingSection);

    // Responsive Hero Scale: 60-70% of current size (0.65 on desktop/tablet, 0.60 on mobile)
    const aspect = this.camera.aspect;
    const heroScale = aspect < 0.85 ? 0.60 : 0.65;

    // SECTION 1: HERO SECTION (0.00 to 0.14)
    if (p <= 0.14) {
      const subP = p / 0.14; // 0 to 1

      // Scale to 60-70% of current size in Hero
      root.scale.setScalar(heroScale);

      const angle = -0.45 + subP * 0.35 + this.mousePos.x * 0.12;
      root.rotation.set(0, angle, 0);
      root.position.set(0, floatBob, 0);

      // Camera distance and height positioned to center scooter neatly without cropping
      const heroCamZ = aspect < 0.85 ? 4.45 : 4.15;
      const heroCamY = aspect < 0.85 ? 0.82 : 0.86;

      camTargetPos.set(
        Math.sin(subP * 0.5) * 0.8 + this.mousePos.x * 0.25,
        THREE.MathUtils.lerp(heroCamY, 1.1, subP) + this.mousePos.y * 0.15,
        THREE.MathUtils.lerp(heroCamZ, 3.3, subP)
      );
      camLookAt.set(
        0,
        THREE.MathUtils.lerp(0.48, 0.65, subP),
        0.05
      );

      this.scooterAssembly.setBatteryExplodeProgress(0);
      this.batteryParticles.update(time, 0);
      this.motionTrails.update(0, 0);
      this.oledUpdater(0, 98);
      soundFX.setMotorSpeed(0);
    }

    // SECTION 2: TRANSFORMATION / DYNAMICS (0.14 to 0.28)
    else if (p > 0.14 && p <= 0.28) {
      const subP = (p - 0.14) / 0.14; // 0 to 1

      // Smoothly transition scale from heroScale back to 1.0 for the detailed sections
      root.scale.setScalar(THREE.MathUtils.lerp(heroScale, 1.0, subP));

      root.position.x = THREE.MathUtils.lerp(0, 0.85, subP);
      root.rotation.set(
        Math.sin(subP * Math.PI) * 0.03,
        THREE.MathUtils.lerp(-0.1, Math.PI * 0.5, subP),
        0
      );

      camTargetPos.set(
        THREE.MathUtils.lerp(0.8, -0.2, subP) + this.mousePos.x * 0.2,
        THREE.MathUtils.lerp(1.1, 0.95, subP) + this.mousePos.y * 0.15,
        THREE.MathUtils.lerp(3.3, 2.9, subP)
      );
      camLookAt.set(root.position.x * 0.5, 0.65, 0);

      this.scooterAssembly.setBatteryExplodeProgress(0);
      this.batteryParticles.update(time, 0);
      this.motionTrails.update(0, 0);
      this.oledUpdater(15 * subP, 98);
      soundFX.setMotorSpeed(0.08 * subP);
    }

    // SECTION 3: BATTERY SECTION (0.28 to 0.44)
    else if (p > 0.28 && p <= 0.44) {
      root.scale.setScalar(1.0);
      const subP = (p - 0.28) / 0.16; // 0 to 1

      root.position.set(THREE.MathUtils.lerp(0.85, 0, subP), floatBob, -0.3 * subP);
      root.rotation.set(0, Math.PI * 0.45 + subP * 0.2, 0);

      camTargetPos.set(0.2 + this.mousePos.x * 0.2, 0.85 + this.mousePos.y * 0.15, 2.2);
      camLookAt.set(0, 0.8, 0.15);

      this.scooterAssembly.setBatteryExplodeProgress(subP);
      this.batteryParticles.update(time, subP);
      this.motionTrails.update(0, 0);
      this.oledUpdater(0, 99);
      soundFX.setMotorSpeed(0);
    }

    // SECTION 4: PERFORMANCE SECTION (0.44 to 0.58)
    else if (p > 0.44 && p <= 0.58) {
      const subP = (p - 0.44) / 0.14; // 0 to 1

      this.scooterAssembly.setBatteryExplodeProgress(Math.max(0, 1 - subP * 3));
      this.batteryParticles.update(time, 0);

      root.position.set(
        Math.sin(time * 3) * 0.05,
        floatBob,
        THREE.MathUtils.lerp(0, 0.2, subP)
      );
      root.rotation.set(-0.04, Math.PI * 0.52 + Math.sin(time * 2) * 0.03, -0.05);

      camTargetPos.set(
        -1.8 + this.mousePos.x * 0.2,
        0.55 + this.mousePos.y * 0.15,
        2.1 - subP * 0.3
      );
      camLookAt.set(0.1, 0.55, 0.2);

      const simulatedSpeed = 50 + subP * 35;
      const wheelDelta = (simulatedSpeed / 3.6) * delta;
      this.scooterAssembly.updateWheelRotation(wheelDelta);
      this.motionTrails.update(wheelDelta, subP);
      this.oledUpdater(simulatedSpeed, 96);
      soundFX.setMotorSpeed(subP);
    }

    // SECTION 5: DESIGN DETAILS SECTION (0.58 to 0.70)
    else if (p > 0.58 && p <= 0.70) {
      this.scooterAssembly.setBatteryExplodeProgress(0);
      this.batteryParticles.update(time, 0);
      this.motionTrails.update(0, 0);
      this.oledUpdater(0, 95);
      soundFX.setMotorSpeed(0);

      root.position.set(0, floatBob, 0);
      root.rotation.set(0, -0.3 + this.mousePos.x * 0.15, 0);

      if (this.activeHotspotKey && this.scooterAssembly.hotspots[this.activeHotspotKey]) {
        const target = this.scooterAssembly.hotspots[this.activeHotspotKey];
        camLookAt.copy(target);
        camTargetPos.set(target.x + 0.75, target.y + 0.25, target.z + 1.15);
      } else {
        camTargetPos.set(1.2 + this.mousePos.x * 0.2, 0.95 + this.mousePos.y * 0.15, 2.7);
        camLookAt.set(0, 0.65, 0);
      }
    }

    // SECTION 6: PRODUCT LINEUP & ECOSYSTEM (0.70 to 0.86)
    else if (p > 0.70 && p <= 0.86) {
      this.scooterAssembly.setBatteryExplodeProgress(0);
      this.batteryParticles.update(time, 0);
      this.motionTrails.update(0, 0);
      this.oledUpdater(0, 95);
      soundFX.setMotorSpeed(0);

      root.position.set(0, floatBob, 0);
      // Gentle floating rotation in center
      const rotAngle = (p - 0.70) * Math.PI * 1.5;
      root.rotation.set(0, rotAngle + this.manualRotationY, 0);

      camTargetPos.set(0 + this.mousePos.x * 0.2, 1.1 + this.mousePos.y * 0.15, 3.2);
      camLookAt.set(0, 0.65, 0);
    }

    // SECTION 7: COLOR SHOWCASE (0.86 to 0.94)
    else if (p > 0.86 && p <= 0.94) {
      this.scooterAssembly.setBatteryExplodeProgress(0);
      this.batteryParticles.update(time, 0);
      this.motionTrails.update(0, 0);
      this.oledUpdater(0, 94);
      soundFX.setMotorSpeed(0);

      root.position.set(0, floatBob, 0);
      const autoAngle = time * 0.12;
      root.rotation.set(0, autoAngle + this.manualRotationY, 0);

      camTargetPos.set(0 + this.mousePos.x * 0.2, 0.95 + this.mousePos.y * 0.15, 3.4);
      camLookAt.set(0, 0.65, 0);
    }

    // SECTION 8: FINAL HORIZON (0.94 to 1.0)
    else {
      const subP = (p - 0.94) / 0.06; // 0 to 1

      this.scooterAssembly.setBatteryExplodeProgress(0);
      this.batteryParticles.update(time, 0);
      this.oledUpdater(0, 94);
      soundFX.setMotorSpeed(0);

      root.position.set(0, floatBob, THREE.MathUtils.lerp(0, 1.2, subP));
      root.rotation.set(0, Math.PI * 0.98, 0);

      camTargetPos.set(
        0 + this.mousePos.x * 0.25,
        1.15 + this.mousePos.y * 0.15,
        -2.5 - subP * 0.4
      );
      camLookAt.set(0, 0.75, 4.0);

      this.motionTrails.update(delta * 2, 0.35);
    }


    // Interpolate Camera smoothly
    this.camera.position.lerp(camTargetPos, 0.08);
    this.camera.lookAt(camLookAt);
  }

  public dispose() {
    cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    this.batteryParticles.dispose();
    this.motionTrails.dispose();
    this.renderer.dispose();
  }
}
