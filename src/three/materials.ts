import * as THREE from 'three';

// Procedural Tire Tread Texture
export function createTireTreadTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1c1e22';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Tread grooves
  ctx.fillStyle = '#0a0b0d';
  const grooveSpacing = 24;
  for (let x = 0; x < canvas.width; x += grooveSpacing) {
    // Angled sipes
    ctx.beginPath();
    ctx.moveTo(x, 15);
    ctx.lineTo(x + 12, 50);
    ctx.lineTo(x, 85);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#08080a';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 10, 50);
    ctx.lineTo(x + 22, 50);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#121316';
    ctx.stroke();
  }

  // Center water channel groove
  ctx.fillStyle = '#08090a';
  ctx.fillRect(0, 58, canvas.width, 12);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural Brake Rotor Texture
export function createBrakeDiscTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#b8bec6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Concentric brushed metal rings
  ctx.strokeStyle = '#9ca3af';
  ctx.lineWidth = 1;
  const center = 128;
  for (let r = 50; r < 120; r += 2) {
    ctx.beginPath();
    ctx.arc(center, center, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Drilled ventilation holes
  ctx.fillStyle = '#1e242b';
  for (let i = 0; i < 24; i++) {
    const angle = (i * Math.PI * 2) / 24;
    const r1 = 75;
    const r2 = 95;
    const r3 = 110;

    const x1 = center + Math.cos(angle) * r1;
    const y1 = center + Math.sin(angle) * r1;
    ctx.beginPath();
    ctx.arc(x1, y1, 2.5, 0, Math.PI * 2);
    ctx.fill();

    const x2 = center + Math.cos(angle + 0.1) * r2;
    const y2 = center + Math.sin(angle + 0.1) * r2;
    ctx.beginPath();
    ctx.arc(x2, y2, 2.5, 0, Math.PI * 2);
    ctx.fill();

    const x3 = center + Math.cos(angle - 0.1) * r3;
    const y3 = center + Math.sin(angle - 0.1) * r3;
    ctx.beginPath();
    ctx.arc(x3, y3, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural OLED Smart Cockpit Screen
export function createOledCockpitTexture(speed: number = 42, batteryPercent: number = 98): {
  texture: THREE.CanvasTexture;
  update: (speed: number, battery: number) => void;
} {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  function draw(spd: number, bat: number) {
    // Glossy deep black OLED background
    ctx.fillStyle = '#05070a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle carbon grid lines
    ctx.strokeStyle = '#0e1622';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Top status bar
    ctx.fillStyle = '#64748b';
    ctx.font = '600 16px monospace';
    ctx.fillText('EV SCOOTY OS 4.2', 30, 36);

    ctx.fillStyle = '#22c55e';
    ctx.fillText('READY', 250, 36);

    ctx.fillStyle = '#06b6d4';
    ctx.fillText('SPORT MODE', 360, 36);

    // Big Speed Display
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 86px monospace';
    const speedStr = Math.round(spd).toString().padStart(2, '0');
    ctx.fillText(speedStr, 170, 145);

    ctx.font = '600 22px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('KM/H', 290, 145);

    // Battery Bar Container
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(40, 190, 432, 22, 11);
    ctx.fill();

    // Battery Fill
    const fillWidth = Math.max(12, (432 * Math.min(100, Math.max(0, bat))) / 100);
    const grad = ctx.createLinearGradient(40, 0, 472, 0);
    grad.addColorStop(0, '#06b6d4');
    grad.addColorStop(1, '#10b981');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(40, 190, fillWidth, 22, 11);
    ctx.fill();

    // Battery Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 16px monospace';
    ctx.fillText(`${bat}%`, 235, 207);

    // Power Ring Arc
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    const startAngle = Math.PI * 0.8;
    const endAngle = Math.PI * 0.8 + (Math.PI * 1.4 * (spd / 85));
    ctx.arc(245, 120, 105, startAngle, endAngle);
    ctx.stroke();
  }

  draw(speed, batteryPercent);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return {
    texture,
    update: (spd: number, bat: number) => {
      draw(spd, bat);
      texture.needsUpdate = true;
    },
  };
}

// Procedural Contact Shadow Texture
export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(256, 256, 10, 256, 256, 240);
  gradient.addColorStop(0, 'rgba(15, 23, 42, 0.7)');
  gradient.addColorStop(0.3, 'rgba(30, 41, 59, 0.45)');
  gradient.addColorStop(0.65, 'rgba(51, 65, 85, 0.18)');
  gradient.addColorStop(1, 'rgba(246, 247, 249, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  // Elongated ellipse matching the scooter base
  ctx.ellipse(256, 256, 230, 120, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Material Palette
export interface ScooterMaterials {
  paint: THREE.MeshPhysicalMaterial;
  accentPaint: THREE.MeshPhysicalMaterial;
  chassisAlloy: THREE.MeshStandardMaterial;
  glossBlack: THREE.MeshPhysicalMaterial;
  matteDark: THREE.MeshStandardMaterial;
  rubberTire: THREE.MeshStandardMaterial;
  rimAlloy: THREE.MeshStandardMaterial;
  discBrake: THREE.MeshStandardMaterial;
  brakeCaliper: THREE.MeshStandardMaterial;
  chromeTrim: THREE.MeshStandardMaterial;
  headlightLens: THREE.MeshPhysicalMaterial;
  headlightEmissive: THREE.MeshStandardMaterial;
  drlEmissive: THREE.MeshStandardMaterial;
  haloRing: THREE.MeshStandardMaterial;
  headlightBezel: THREE.MeshStandardMaterial;
  tintedVisor: THREE.MeshPhysicalMaterial;
  amberReflector: THREE.MeshStandardMaterial;
  chargingCable: THREE.MeshStandardMaterial;
  taillightEmissive: THREE.MeshStandardMaterial;
  oledCockpit: THREE.MeshBasicMaterial;
  leatherSeat: THREE.MeshStandardMaterial;
  batteryCell: THREE.MeshStandardMaterial;
  batteryCasing: THREE.MeshPhysicalMaterial;
  batteryGlow: THREE.MeshStandardMaterial;
  contactShadow: THREE.MeshBasicMaterial;
}


export function createScooterMaterials(
  primaryColorHex: string = '#F4F5F7',
  accentColorHex: string = '#FF5500',
  metalness: number = 0.85,
  roughness: number = 0.18
): { materials: ScooterMaterials; oledUpdater: (speed: number, battery: number) => void } {
  const tireTex = createTireTreadTexture();
  const brakeDiscTex = createBrakeDiscTexture();
  const { texture: oledTex, update: oledUpdater } = createOledCockpitTexture(0, 98);
  const shadowTex = createContactShadowTexture();

  // Premium automotive multicoat car paint
  const paint = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(primaryColorHex),
    metalness: metalness,
    roughness: roughness,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9,
    envMapIntensity: 1.4,
  });

  const accentPaint = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(accentColorHex),
    metalness: 0.6,
    roughness: 0.25,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.2,
  });

  const chassisAlloy = new THREE.MeshStandardMaterial({
    color: 0x9aa2ad,
    metalness: 0.88,
    roughness: 0.28,
    envMapIntensity: 1.3,
  });

  const glossBlack = new THREE.MeshPhysicalMaterial({
    color: 0x111317,
    metalness: 0.2,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });

  const matteDark = new THREE.MeshStandardMaterial({
    color: 0x1e2126,
    metalness: 0.15,
    roughness: 0.85,
  });

  const rubberTire = new THREE.MeshStandardMaterial({
    color: 0x181a1d,
    map: tireTex,
    roughness: 0.88,
    metalness: 0.05,
  });

  const rimAlloy = new THREE.MeshStandardMaterial({
    color: 0xd6dbe1,
    metalness: 0.95,
    roughness: 0.16,
    envMapIntensity: 1.5,
  });

  const discBrake = new THREE.MeshStandardMaterial({
    color: 0xc4cbd4,
    map: brakeDiscTex,
    metalness: 0.92,
    roughness: 0.22,
    envMapIntensity: 1.2,
  });

  const brakeCaliper = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColorHex),
    metalness: 0.7,
    roughness: 0.3,
  });

  const chromeTrim = new THREE.MeshStandardMaterial({
    color: 0xf0f3f6,
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 1.8,
  });

  const headlightLens = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.65,
    roughness: 0.05,
    transmission: 0.88,
    ior: 1.52,
    thickness: 0.4,
    depthWrite: false,
  });

  const headlightEmissive = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 3.2,
    roughness: 0.2,
  });

  const drlEmissive = new THREE.MeshStandardMaterial({
    color: 0xebf8ff,
    emissive: 0xbae6fd,
    emissiveIntensity: 2.8,
    roughness: 0.1,
  });

  const haloRing = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 4.2,
    roughness: 0.1,
  });

  const headlightBezel = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 1.8,
  });

  const tintedVisor = new THREE.MeshPhysicalMaterial({
    color: 0x111622,
    transparent: true,
    opacity: 0.82,
    roughness: 0.05,
    transmission: 0.75,
    ior: 1.5,
    thickness: 0.25,
    depthWrite: false,
  });

  const amberReflector = new THREE.MeshStandardMaterial({
    color: 0xff8c00,
    emissive: 0xcc5500,
    emissiveIntensity: 0.35,
    metalness: 0.3,
    roughness: 0.3,
  });

  const chargingCable = new THREE.MeshStandardMaterial({
    color: 0x1c1e22,
    roughness: 0.65,
    metalness: 0.1,
  });

  const taillightEmissive = new THREE.MeshStandardMaterial({

    color: 0xff1e27,
    emissive: 0xff0011,
    emissiveIntensity: 3.5,
    roughness: 0.2,
  });

  const oledCockpit = new THREE.MeshBasicMaterial({
    map: oledTex,
  });

  const leatherSeat = new THREE.MeshStandardMaterial({
    color: 0x24272c,
    roughness: 0.68,
    metalness: 0.1,
  });

  // Battery Materials
  const batteryCell = new THREE.MeshStandardMaterial({
    color: 0x00f59b,
    emissive: 0x00d984,
    emissiveIntensity: 1.2,
    metalness: 0.8,
    roughness: 0.3,
  });

  const batteryCasing = new THREE.MeshPhysicalMaterial({
    color: 0x22262d,
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  });

  const batteryGlow = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    emissive: 0x00e1ff,
    emissiveIntensity: 3.0,
  });

  const contactShadow = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });

  return {
    materials: {
      paint,
      accentPaint,
      chassisAlloy,
      glossBlack,
      matteDark,
      rubberTire,
      rimAlloy,
      discBrake,
      brakeCaliper,
      chromeTrim,
      headlightLens,
      headlightEmissive,
      drlEmissive,
      haloRing,
      headlightBezel,
      tintedVisor,
      amberReflector,
      chargingCable,
      taillightEmissive,

      oledCockpit,
      leatherSeat,
      batteryCell,
      batteryCasing,
      batteryGlow,
      contactShadow,
    },
    oledUpdater,
  };
}
