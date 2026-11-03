import * as THREE from 'three';
import { ScooterMaterials } from './materials';

export interface ScooterAssembly {
  rootGroup: THREE.Group;
  frontWheel: THREE.Group;
  rearWheel: THREE.Group;
  batteryPack: THREE.Group;
  chargingCableGroup: THREE.Group;
  headlightLight: THREE.SpotLight;
  headlightBeam: THREE.Mesh;
  taillightMesh: THREE.Mesh;
  contactShadow: THREE.Mesh;
  materials: ScooterMaterials;
  hotspots: Record<string, THREE.Vector3>;
  updateWheelRotation: (deltaDistance: number) => void;
  setBatteryExplodeProgress: (progress: number) => void;
  setMotionState: (isMoving: boolean) => void;
  updateMaterialsColor: (
    primaryHex: string,
    accentHex: string,
    metalness: number,
    roughness: number
  ) => void;
}

export function createScooterModel(materials: ScooterMaterials): ScooterAssembly {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'ElectricScooter';

  // Hotspot targets for camera zoom matching the photo's anatomy
  const hotspots: Record<string, THREE.Vector3> = {
    headlight: new THREE.Vector3(0, 0.96, 0.98),
    cockpit: new THREE.Vector3(0, 1.34, 0.52),
    wheel: new THREE.Vector3(0, 0.28, 1.05),
    frame: new THREE.Vector3(0, 0.42, 0.05),
    saddle: new THREE.Vector3(0, 0.82, -0.38),
    taillight: new THREE.Vector3(0, 0.72, -0.92),
  };

  // --- 1. CONTACT SHADOW ---
  const shadowGeo = new THREE.PlaneGeometry(3.6, 1.8);
  const contactShadow = new THREE.Mesh(shadowGeo, materials.contactShadow);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.005;
  rootGroup.add(contactShadow);

  // --- 2. STEP-THROUGH CHASSIS & FLOORBOARD (U-Shaped Silhouette) ---
  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'BodyWork';

  // Lower white curved monocoque side rocker panels
  const rockerShape = new THREE.Shape();
  rockerShape.moveTo(-0.19, -0.65);
  rockerShape.lineTo(0.19, -0.65);
  rockerShape.lineTo(0.19, 0.45);
  rockerShape.quadraticCurveTo(0.19, 0.72, 0.15, 0.82);
  rockerShape.lineTo(-0.15, 0.82);
  rockerShape.quadraticCurveTo(-0.19, 0.72, -0.19, 0.45);
  rockerShape.closePath();

  const rockerExtrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.14,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025,
  };
  const rockerGeo = new THREE.ExtrudeGeometry(rockerShape, rockerExtrudeSettings);
  const rockerMesh = new THREE.Mesh(rockerGeo, materials.paint);
  rockerMesh.rotation.x = Math.PI / 2;
  rockerMesh.position.set(0, 0.32, -0.05);
  rockerMesh.castShadow = true;
  rockerMesh.receiveShadow = true;
  bodyGroup.add(rockerMesh);

  // Dark matte black inner footboard deck
  const deckMatGeo = new THREE.BoxGeometry(0.32, 0.02, 0.62);
  const deckMat = new THREE.Mesh(deckMatGeo, materials.matteDark);
  deckMat.position.set(0, 0.28, 0.05);
  bodyGroup.add(deckMat);

  // Textured rubber grip lines on footboard
  for (let i = -3; i <= 3; i++) {
    const stripGeo = new THREE.BoxGeometry(0.24, 0.005, 0.018);
    const strip = new THREE.Mesh(stripGeo, materials.glossBlack);
    strip.position.set(0, 0.292, 0.05 + i * 0.07);
    bodyGroup.add(strip);
  }

  // Dark matte black inner leg shield wall (rising from footboard)
  const innerWallGeo = new THREE.BoxGeometry(0.31, 0.45, 0.12);
  const innerWall = new THREE.Mesh(innerWallGeo, materials.matteDark);
  innerWall.position.set(0, 0.58, 0.46);
  innerWall.rotation.x = -0.32;
  bodyGroup.add(innerWall);

  // Convenient inner luggage hook / badge
  const hookGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 12);
  const hook = new THREE.Mesh(hookGeo, materials.chassisAlloy);
  hook.rotation.x = Math.PI / 2;
  hook.position.set(0, 0.65, 0.42);
  bodyGroup.add(hook);

  // --- 3. MONOLITHIC FRONT APRON / SHIELD (Matching the uploaded photo) ---
  const frontApronGroup = new THREE.Group();

  // Sculpted tall white front apron cowl
  const apronShape = new THREE.Shape();
  apronShape.moveTo(-0.19, -0.45);
  apronShape.lineTo(0.19, -0.45);
  apronShape.quadraticCurveTo(0.22, 0.1, 0.2, 0.45);
  apronShape.quadraticCurveTo(0.18, 0.55, 0.14, 0.58);
  apronShape.lineTo(-0.14, 0.58);
  apronShape.quadraticCurveTo(-0.18, 0.55, -0.2, 0.45);
  apronShape.quadraticCurveTo(-0.22, 0.1, -0.19, -0.45);
  apronShape.closePath();

  const apronExtrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.18,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  };
  const apronGeo = new THREE.ExtrudeGeometry(apronShape, apronExtrudeSettings);
  const apronMesh = new THREE.Mesh(apronGeo, materials.paint);
  apronMesh.position.set(0, 0.88, 0.72);
  apronMesh.rotation.x = -0.32;
  apronMesh.castShadow = true;
  apronMesh.receiveShadow = true;
  frontApronGroup.add(apronMesh);

  // Lower fork tunnel opening in the front shield
  const tunnelBevelGeo = new THREE.BoxGeometry(0.24, 0.18, 0.12);
  const tunnelBevel = new THREE.Mesh(tunnelBevelGeo, materials.matteDark);
  tunnelBevel.position.set(0, 0.52, 0.78);
  tunnelBevel.rotation.x = -0.32;
  frontApronGroup.add(tunnelBevel);

  // Subtle embossed brand mark badge above headlight
  const emblemGeo = new THREE.BoxGeometry(0.06, 0.015, 0.005);
  const emblem = new THREE.Mesh(emblemGeo, materials.chassisAlloy);
  emblem.position.set(0, 1.15, 0.86);
  emblem.rotation.x = -0.32;
  frontApronGroup.add(emblem);

  // --- 4. SIGNATURE CIRCULAR HALO PROJECTOR HEADLIGHT (Key feature from photo) ---
  const headlightGroup = new THREE.Group();
  headlightGroup.position.set(0, 0.94, 0.96);
  headlightGroup.rotation.x = -0.32;

  // Headlight cylindrical housing pod
  const podGeo = new THREE.CylinderGeometry(0.12, 0.125, 0.08, 36);
  const podMesh = new THREE.Mesh(podGeo, materials.paint);
  podMesh.rotation.x = Math.PI / 2;
  headlightGroup.add(podMesh);

  // Polished chrome / aluminum outer bezel ring
  const bezelGeo = new THREE.TorusGeometry(0.115, 0.014, 16, 48);
  const bezelMesh = new THREE.Mesh(bezelGeo, materials.headlightBezel);
  bezelMesh.position.z = 0.042;
  headlightGroup.add(bezelMesh);

  // Bright Circular Halo LED Ring (DRL)
  const haloGeo = new THREE.TorusGeometry(0.095, 0.008, 16, 48);
  const haloMesh = new THREE.Mesh(haloGeo, materials.haloRing);
  haloMesh.position.z = 0.043;
  headlightGroup.add(haloMesh);

  // Central Projector Lens (Clear convex crystal)
  const lensGeo = new THREE.SphereGeometry(0.075, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.42);
  const lensMesh = new THREE.Mesh(lensGeo, materials.headlightLens);
  lensMesh.rotation.x = Math.PI / 2;
  lensMesh.position.z = 0.042;
  headlightGroup.add(lensMesh);

  // Inner Projector Core Bulb
  const bulbGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.03, 20);
  const bulbMesh = new THREE.Mesh(bulbGeo, materials.headlightEmissive);
  bulbMesh.rotation.x = Math.PI / 2;
  bulbMesh.position.z = 0.025;
  headlightGroup.add(bulbMesh);

  // Realistic SpotLight casting from the circular headlight
  const headlightLight = new THREE.SpotLight(0xfffaed, 5.5, 16, Math.PI / 5, 0.35, 1.2);
  headlightLight.position.set(0, 0, 0.05);
  const lightTarget = new THREE.Object3D();
  lightTarget.position.set(0, -0.6, 8.0);
  headlightGroup.add(lightTarget);
  headlightLight.target = lightTarget;
  headlightLight.castShadow = true;
  headlightLight.shadow.bias = -0.0005;
  headlightLight.shadow.mapSize.width = 1024;
  headlightLight.shadow.mapSize.height = 1024;
  headlightGroup.add(headlightLight);

  // Volumetric beam cone
  const beamGeo = new THREE.ConeGeometry(0.95, 4.2, 24, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const headlightBeam = new THREE.Mesh(beamGeo, beamMat);
  headlightBeam.rotation.x = Math.PI / 2;
  headlightBeam.position.set(0, 0, 2.15);
  headlightGroup.add(headlightBeam);

  frontApronGroup.add(headlightGroup);
  bodyGroup.add(frontApronGroup);

  // --- 5. HANDLEBAR, TINTED FLYSCREEN & CIRCULAR REARVIEW MIRRORS ---
  const handlebarGroup = new THREE.Group();

  // Steering column post
  const postGeo = new THREE.CylinderGeometry(0.024, 0.028, 0.35, 20);
  const postMesh = new THREE.Mesh(postGeo, materials.glossBlack);
  postMesh.position.set(0, 1.25, 0.62);
  postMesh.rotation.x = -0.32;
  handlebarGroup.add(postMesh);

  // Matte black handlebar bar
  const barGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.62, 20);
  const barMesh = new THREE.Mesh(barGeo, materials.glossBlack);
  barMesh.rotation.z = Math.PI / 2;
  barMesh.position.set(0, 1.34, 0.58);
  handlebarGroup.add(barMesh);

  // Rubber grips
  const gripGeo = new THREE.CylinderGeometry(0.02, 0.018, 0.12, 16);
  const leftGrip = new THREE.Mesh(gripGeo, materials.matteDark);
  leftGrip.rotation.z = Math.PI / 2;
  leftGrip.position.set(-0.25, 1.34, 0.58);
  const rightGrip = new THREE.Mesh(gripGeo, materials.matteDark);
  rightGrip.rotation.z = Math.PI / 2;
  rightGrip.position.set(0.25, 1.34, 0.58);
  handlebarGroup.add(leftGrip, rightGrip);

  // Minimal black aluminum brake levers
  const leverGeo = new THREE.BoxGeometry(0.11, 0.008, 0.016);
  const leftLever = new THREE.Mesh(leverGeo, materials.chassisAlloy);
  leftLever.position.set(-0.22, 1.33, 0.62);
  leftLever.rotation.y = 0.22;
  const rightLever = new THREE.Mesh(leverGeo, materials.chassisAlloy);
  rightLever.position.set(0.22, 1.33, 0.62);
  rightLever.rotation.y = -0.22;
  handlebarGroup.add(leftLever, rightLever);

  // Tinted Aerodynamic Flyscreen / Windscreen (Prominent in photo)
  const flyscreenShape = new THREE.Shape();
  flyscreenShape.moveTo(-0.09, 0);
  flyscreenShape.lineTo(0.09, 0);
  flyscreenShape.quadraticCurveTo(0.12, 0.14, 0.07, 0.22);
  flyscreenShape.quadraticCurveTo(0, 0.25, -0.07, 0.22);
  flyscreenShape.quadraticCurveTo(-0.12, 0.14, -0.09, 0);
  flyscreenShape.closePath();

  const flyscreenGeo = new THREE.ExtrudeGeometry(flyscreenShape, {
    depth: 0.008,
    bevelEnabled: true,
    bevelSize: 0.005,
    bevelThickness: 0.005,
  });
  const flyscreenMesh = new THREE.Mesh(flyscreenGeo, materials.tintedVisor);
  flyscreenMesh.position.set(0, 1.36, 0.56);
  flyscreenMesh.rotation.x = -0.42;
  handlebarGroup.add(flyscreenMesh);

  // Digital Cockpit display housing behind flyscreen
  const cockpitConsoleGeo = new THREE.BoxGeometry(0.14, 0.025, 0.09);
  const cockpitConsole = new THREE.Mesh(cockpitConsoleGeo, materials.glossBlack);
  cockpitConsole.position.set(0, 1.34, 0.55);
  cockpitConsole.rotation.x = 0.55;
  handlebarGroup.add(cockpitConsole);

  const screenGeo = new THREE.PlaneGeometry(0.12, 0.065);
  const screenMesh = new THREE.Mesh(screenGeo, materials.oledCockpit);
  screenMesh.position.set(0, 1.355, 0.54);
  screenMesh.rotation.x = -Math.PI / 2 + 0.55;
  handlebarGroup.add(screenMesh);

  // Round High-Stalk Rearview Mirrors (Exact match from uploaded photo!)
  function createRoundMirror(isLeft: boolean): THREE.Group {
    const mirror = new THREE.Group();
    const stalkGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.18, 12);
    const stalk = new THREE.Mesh(stalkGeo, materials.glossBlack);
    stalk.position.set(0, 0.08, 0);
    stalk.rotation.z = isLeft ? -0.35 : 0.35;
    stalk.rotation.x = -0.15;
    mirror.add(stalk);

    // Circular mirror head
    const headGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.015, 24);
    const head = new THREE.Mesh(headGeo, materials.glossBlack);
    head.position.set(isLeft ? -0.06 : 0.06, 0.16, -0.02);
    head.rotation.x = Math.PI / 2 - 0.2;
    mirror.add(head);

    // Reflective glass face
    const glassGeo = new THREE.CircleGeometry(0.042, 24);
    const glass = new THREE.Mesh(glassGeo, materials.chromeTrim);
    glass.position.set(isLeft ? -0.06 : 0.06, 0.16, -0.028);
    glass.rotation.y = Math.PI;
    glass.rotation.x = -(Math.PI / 2 - 0.2);
    mirror.add(glass);

    mirror.position.set(isLeft ? -0.22 : 0.22, 1.35, 0.58);
    return mirror;
  }
  const leftMirror = createRoundMirror(true);
  const rightMirror = createRoundMirror(false);
  handlebarGroup.add(leftMirror, rightMirror);

  bodyGroup.add(handlebarGroup);

  // --- 6. REAR BODY PODS, STEPPED DUAL SEAT & GRAB RAILS (Matching Photo) ---
  const rearGroup = new THREE.Group();

  // White rounded rectangular rear side pods (NIU style)
  const rearPodGeo = new THREE.BoxGeometry(0.36, 0.42, 0.72);
  const rearPod = new THREE.Mesh(rearPodGeo, materials.paint);
  rearPod.position.set(0, 0.52, -0.38);
  rearPod.castShadow = true;
  rearPod.receiveShadow = true;
  rearGroup.add(rearPod);

  // Dark matte black central under-seat riser
  const underRiserGeo = new THREE.BoxGeometry(0.28, 0.32, 0.48);
  const underRiser = new THREE.Mesh(underRiserGeo, materials.matteDark);
  underRiser.position.set(0, 0.54, -0.08);
  rearGroup.add(underRiser);

  // Subtle red vertical reflector badge on the rear flank (from photo)
  const redReflectorGeo = new THREE.BoxGeometry(0.01, 0.04, 0.015);
  const redReflectorLeft = new THREE.Mesh(redReflectorGeo, materials.taillightEmissive);
  redReflectorLeft.position.set(-0.185, 0.56, -0.62);
  const redReflectorRight = new THREE.Mesh(redReflectorGeo, materials.taillightEmissive);
  redReflectorRight.position.set(0.185, 0.56, -0.62);
  rearGroup.add(redReflectorLeft, redReflectorRight);

  // Stepped Contoured Black Dual Seat (Front rider + elevated pillion)
  const seatShape = new THREE.Shape();
  seatShape.moveTo(-0.16, -0.42);
  seatShape.lineTo(0.16, -0.42);
  seatShape.lineTo(0.15, 0.15);
  seatShape.lineTo(0.11, 0.38);
  seatShape.lineTo(-0.11, 0.38);
  seatShape.lineTo(-0.15, 0.15);
  seatShape.closePath();

  const seatGeo = new THREE.ExtrudeGeometry(seatShape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.035,
  });
  const seatMesh = new THREE.Mesh(seatGeo, materials.leatherSeat);
  seatMesh.rotation.x = Math.PI / 2;
  seatMesh.position.set(0, 0.78, -0.36);
  seatMesh.castShadow = true;
  rearGroup.add(seatMesh);

  // Stepped tier rise for the passenger
  const pillionPadGeo = new THREE.BoxGeometry(0.28, 0.05, 0.36);
  const pillionPad = new THREE.Mesh(pillionPadGeo, materials.leatherSeat);
  pillionPad.position.set(0, 0.81, -0.52);
  rearGroup.add(pillionPad);

  // Dual Silver Pillion Grab Rails (as visible in the photo!)
  const railCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.16, 0.76, -0.25),
    new THREE.Vector3(-0.18, 0.78, -0.55),
    new THREE.Vector3(-0.15, 0.77, -0.72),
    new THREE.Vector3(0.0, 0.76, -0.74),
    new THREE.Vector3(0.15, 0.77, -0.72),
    new THREE.Vector3(0.18, 0.78, -0.55),
    new THREE.Vector3(0.16, 0.76, -0.25),
  ]);
  const grabRailGeo = new THREE.TubeGeometry(railCurve, 32, 0.012, 12, false);
  const grabRail = new THREE.Mesh(grabRailGeo, materials.headlightBezel);
  rearGroup.add(grabRail);

  // Rear Integrated LED Taillight Strip
  const taillightGeo = new THREE.BoxGeometry(0.22, 0.028, 0.025);
  const taillightMesh = new THREE.Mesh(taillightGeo, materials.taillightEmissive);
  taillightMesh.position.set(0, 0.65, -0.75);
  rearGroup.add(taillightMesh);

  // Rear hugger fender & license plate bracket
  const rearFenderGeo = new THREE.CylinderGeometry(0.31, 0.31, 0.1, 24, 1, true, 0, Math.PI * 0.6);
  const rearFender = new THREE.Mesh(rearFenderGeo, materials.matteDark);
  rearFender.rotation.z = Math.PI / 2;
  rearFender.rotation.x = -1.25;
  rearFender.position.set(0, 0.32, -0.88);
  rearFender.castShadow = true;
  rearGroup.add(rearFender);

  bodyGroup.add(rearGroup);
  rootGroup.add(bodyGroup);

  // --- 7. WHEEL BUILDER (Black 5-Split-Spoke Alloys + Road Tires matching photo) ---
  function buildWheel(radius: number = 0.28, width: number = 0.085): {
    wheelGroup: THREE.Group;
    rotorMesh: THREE.Mesh;
  } {
    const wheelGroup = new THREE.Group();

    // Black pneumatic road tire with tread
    const tireGeo = new THREE.TorusGeometry(radius - width * 0.5, width * 0.5, 20, 48);
    const tireMesh = new THREE.Mesh(tireGeo, materials.rubberTire);
    tireMesh.rotation.y = Math.PI / 2;
    tireMesh.castShadow = true;
    wheelGroup.add(tireMesh);

    // Deep black alloy central hub
    const hubGeo = new THREE.CylinderGeometry(0.065, 0.065, width * 0.9, 24);
    const hubMesh = new THREE.Mesh(hubGeo, materials.glossBlack);
    hubMesh.rotation.z = Math.PI / 2;
    hubMesh.castShadow = true;
    wheelGroup.add(hubMesh);

    // 5-Spoke Split Alloy Rim (Gloss Black matching the photo)
    const spokeCount = 5;
    for (let i = 0; i < spokeCount; i++) {
      const angle = (i * Math.PI * 2) / spokeCount;
      const spokeGeo = new THREE.BoxGeometry(0.016, radius * 0.82, 0.014);
      const spokeMesh = new THREE.Mesh(spokeGeo, materials.glossBlack);
      spokeMesh.position.set(
        0,
        Math.cos(angle) * (radius * 0.4),
        Math.sin(angle) * (radius * 0.4)
      );
      spokeMesh.rotation.x = -angle;
      wheelGroup.add(spokeMesh);
    }

    // Outer wheel rim bead
    const rimBeadGeo = new THREE.TorusGeometry(radius * 0.72, 0.01, 12, 36);
    const rimBeadMesh = new THREE.Mesh(rimBeadGeo, materials.glossBlack);
    rimBeadMesh.rotation.y = Math.PI / 2;
    wheelGroup.add(rimBeadMesh);

    // Stainless Drilled Disc Brake Rotor (Front left side in photo)
    const rotorGeo = new THREE.CylinderGeometry(radius * 0.65, radius * 0.65, 0.008, 32);
    const rotorMesh = new THREE.Mesh(rotorGeo, materials.discBrake);
    rotorMesh.rotation.z = Math.PI / 2;
    rotorMesh.position.x = -width * 0.48;
    wheelGroup.add(rotorMesh);

    return { wheelGroup, rotorMesh };
  }

  // --- 8. FRONT WHEEL, TELESCOPIC FORK & WHITE SCULPTED FENDER ---
  const frontWheelAssembly = buildWheel(0.28, 0.085);
  const frontWheel = frontWheelAssembly.wheelGroup;
  frontWheel.position.set(0, 0.28, 1.05);
  rootGroup.add(frontWheel);

  // Front Brake Caliper
  const frontCaliperGeo = new THREE.BoxGeometry(0.045, 0.07, 0.09);
  const frontCaliper = new THREE.Mesh(frontCaliperGeo, materials.glossBlack);
  frontCaliper.position.set(-0.048, 0.35, 0.98);
  rootGroup.add(frontCaliper);

  // White Sculpted Front Mudguard / Fender (matching the photo)
  const frontFenderShape = new THREE.Shape();
  frontFenderShape.moveTo(-0.065, -0.22);
  frontFenderShape.lineTo(0.065, -0.22);
  frontFenderShape.lineTo(0.065, 0.22);
  frontFenderShape.lineTo(-0.065, 0.22);
  frontFenderShape.closePath();
  const frontFenderGeo = new THREE.CylinderGeometry(0.31, 0.31, 0.11, 24, 1, true, 0, Math.PI * 0.65);
  const frontFender = new THREE.Mesh(frontFenderGeo, materials.paint);
  frontFender.rotation.z = Math.PI / 2;
  frontFender.rotation.x = 0.85;
  frontFender.position.set(0, 0.32, 1.05);
  frontFender.castShadow = true;
  rootGroup.add(frontFender);

  // Telescopic Inverted Front Fork
  const forkGroup = new THREE.Group();
  const stanchionGeo = new THREE.CylinderGeometry(0.02, 0.022, 0.58, 20);

  const leftFork = new THREE.Mesh(stanchionGeo, materials.glossBlack);
  leftFork.position.set(-0.065, 0.48, 1.0);
  leftFork.rotation.x = -0.32;
  leftFork.castShadow = true;

  const rightFork = new THREE.Mesh(stanchionGeo, materials.glossBlack);
  rightFork.position.set(0.065, 0.48, 1.0);
  rightFork.rotation.x = -0.32;
  rightFork.castShadow = true;

  // Amber side safety reflector on front fork (prominent in uploaded image!)
  const reflectorGeo = new THREE.BoxGeometry(0.012, 0.04, 0.018);
  const amberReflectorLeft = new THREE.Mesh(reflectorGeo, materials.amberReflector);
  amberReflectorLeft.position.set(-0.08, 0.36, 1.04);
  const amberReflectorRight = new THREE.Mesh(reflectorGeo, materials.amberReflector);
  amberReflectorRight.position.set(0.08, 0.36, 1.04);

  forkGroup.add(leftFork, rightFork, amberReflectorLeft, amberReflectorRight);
  rootGroup.add(forkGroup);

  // --- 9. REAR WHEEL & ENCLOSED HUB MOTOR ---
  const rearWheelAssembly = buildWheel(0.28, 0.095);
  const rearWheel = rearWheelAssembly.wheelGroup;
  rearWheel.position.set(0, 0.28, -0.88);
  rootGroup.add(rearWheel);

  // Aluminum rear swingarm casing (brushless hub motor)
  const hubMotorGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.12, 24);
  const hubMotor = new THREE.Mesh(hubMotorGeo, materials.chassisAlloy);
  hubMotor.rotation.z = Math.PI / 2;
  hubMotor.position.set(0.02, 0.28, -0.88);
  rootGroup.add(hubMotor);

  // --- 10. MODULAR QUICK-SWAP BATTERY PACK (Inside deck, can float up) ---
  const batteryPack = new THREE.Group();
  batteryPack.name = 'ModularBatteryPack';

  const battCasingGeo = new THREE.BoxGeometry(0.22, 0.16, 0.48);
  const battCasing = new THREE.Mesh(battCasingGeo, materials.batteryCasing);
  battCasing.castShadow = true;
  battCasing.receiveShadow = true;
  batteryPack.add(battCasing);

  const battWindowGeo = new THREE.BoxGeometry(0.222, 0.12, 0.36);
  const battWindow = new THREE.Mesh(battWindowGeo, materials.headlightLens);
  batteryPack.add(battWindow);

  // 24 Lithium-Ion Cells inside
  const cellGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.11, 16);
  const cellGroup = new THREE.Group();
  for (let row = -2; row <= 2; row++) {
    for (let col = -1; col <= 1; col++) {
      const cell = new THREE.Mesh(cellGeo, materials.batteryCell);
      cell.position.set(col * 0.06, 0, row * 0.068);
      cellGroup.add(cell);
    }
  }
  batteryPack.add(cellGroup);

  // Battery quick-release handle
  const handleGeo = new THREE.BoxGeometry(0.12, 0.035, 0.06);
  const handleMesh = new THREE.Mesh(handleGeo, materials.paint);
  handleMesh.position.set(0, 0.095, 0);
  batteryPack.add(handleMesh);

  // Battery status LED
  const battLedGeo = new THREE.BoxGeometry(0.14, 0.008, 0.02);
  const battLed = new THREE.Mesh(battLedGeo, materials.batteryGlow);
  battLed.position.set(0, 0.088, 0.14);
  batteryPack.add(battLed);

  batteryPack.position.set(0, 0.26, 0.02);
  rootGroup.add(batteryPack);

  // --- 11. CHARGING CABLE DOCKED ON FLOOR (Iconic detail in the photo!) ---
  const chargingCableGroup = new THREE.Group();

  // Curved cable snake along floor into lower rear port
  const cableCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.4, 0.012, -0.6),
    new THREE.Vector3(-0.95, 0.012, -0.75),
    new THREE.Vector3(-0.55, 0.012, -0.68),
    new THREE.Vector3(-0.28, 0.12, -0.52),
    new THREE.Vector3(-0.19, 0.28, -0.42),
  ]);
  const cableGeo = new THREE.TubeGeometry(cableCurve, 40, 0.01, 10, false);
  const cableMesh = new THREE.Mesh(cableGeo, materials.chargingCable);
  chargingCableGroup.add(cableMesh);

  // Charging plug socket head
  const plugGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.05, 16);
  const plugMesh = new THREE.Mesh(plugGeo, materials.glossBlack);
  plugMesh.position.set(-0.2, 0.28, -0.42);
  plugMesh.rotation.z = Math.PI / 2.8;
  chargingCableGroup.add(plugMesh);

  rootGroup.add(chargingCableGroup);

  // Function to spin wheels smoothly
  const updateWheelRotation = (deltaDistance: number) => {
    const angleDelta = deltaDistance / 0.28;
    frontWheel.rotation.x += angleDelta;
    rearWheel.rotation.x += angleDelta;
  };

  // Function to explode/float out battery
  const setBatteryExplodeProgress = (progress: number) => {
    const clamped = Math.max(0, Math.min(1, progress));
    batteryPack.position.y = 0.26 + clamped * 0.75;
    batteryPack.position.z = 0.02 + clamped * 0.35;
    batteryPack.rotation.y = clamped * Math.PI * 0.25;
    batteryPack.rotation.x = clamped * 0.15;

    cellGroup.children.forEach((cell, idx) => {
      const offset = (idx % 3 - 1) * 0.02 * clamped;
      cell.position.y = offset;
    });

    materials.batteryGlow.emissiveIntensity = 3.0 + clamped * 2.5;
  };

  // Function to handle motion mode (hide charging cable when moving)
  const setMotionState = (isMoving: boolean) => {
    chargingCableGroup.visible = !isMoving;
  };

  // Function to update car paint color and accents smoothly
  const updateMaterialsColor = (
    primaryHex: string,
    accentHex: string,
    metalness: number,
    roughness: number
  ) => {
    materials.paint.color.set(primaryHex);
    materials.paint.metalness = metalness;
    materials.paint.roughness = roughness;
    materials.paint.needsUpdate = true;

    materials.accentPaint.color.set(accentHex);
    materials.brakeCaliper.color.set(accentHex);
    materials.accentPaint.needsUpdate = true;
    materials.brakeCaliper.needsUpdate = true;
  };

  return {
    rootGroup,
    frontWheel,
    rearWheel,
    batteryPack,
    chargingCableGroup,
    headlightLight,
    headlightBeam,
    taillightMesh,
    contactShadow,
    materials,
    hotspots,
    updateWheelRotation,
    setBatteryExplodeProgress,
    setMotionState,
    updateMaterialsColor,
  };
}
