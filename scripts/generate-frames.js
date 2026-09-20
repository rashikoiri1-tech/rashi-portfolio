/**
 * Pure Node.js Zero-Dependency 240 Animation Frames Generator
 * Generates 240 optimized PNG frames depicting a rotating futuristic 3D holographic sphere
 * with orbiting particle rings and glowing depth.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const OUT_DIR = path.join(__dirname, '..', 'frontend', 'public', 'frames');
const TOTAL_FRAMES = 240;
const WIDTH = 320;
const HEIGHT = 320;

// Standard CRC32 table
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c >>> 0;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const body = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(body), 0);

  return Buffer.concat([lenBuf, body, crcBuf]);
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // Color type 6 (RGBA)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT with scanline filter bytes
  const rowBytes = width * 4;
  const rawScanlines = Buffer.alloc((rowBytes + 1) * height);
  for (let y = 0; y < height; y++) {
    const rawOffset = y * (rowBytes + 1);
    rawScanlines[rawOffset] = 0; // Filter None
    rgbaBuffer.copy(rawScanlines, rawOffset + 1, y * rowBytes, (y + 1) * rowBytes);
  }
  const compressed = zlib.deflateSync(rawScanlines, { level: 6 });
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function plotPixel(buf, x, y, r, g, b, a) {
  if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return;
  const idx = (y * WIDTH + x) * 4;
  const curA = buf[idx + 3] / 255;
  const newA = a / 255;
  const outA = newA + curA * (1 - newA);
  if (outA <= 0) return;

  buf[idx] = Math.min(255, Math.round((r * newA + buf[idx] * curA * (1 - newA)) / outA));
  buf[idx + 1] = Math.min(255, Math.round((g * newA + buf[idx + 1] * curA * (1 - newA)) / outA));
  buf[idx + 2] = Math.min(255, Math.round((b * newA + buf[idx + 2] * curA * (1 - newA)) / outA));
  buf[idx + 3] = Math.min(255, Math.round(outA * 255));
}

function plotGlowDot(buf, cx, cy, radius, r, g, b, maxAlpha = 255) {
  const rCeil = Math.ceil(radius);
  for (let dy = -rCeil; dy <= rCeil; dy++) {
    for (let dx = -rCeil; dx <= rCeil; dx++) {
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= radius) {
        const falloff = 1 - (dist / radius);
        const alpha = Math.round(maxAlpha * Math.pow(falloff, 1.8));
        plotPixel(buf, Math.round(cx + dx), Math.round(cy + dy), r, g, b, alpha);
      }
    }
  }
}

// Generate pre-computed 3D sphere & ring points
const SPHERE_POINTS = [];
const NUM_SPHERE_POINTS = 220;
for (let i = 0; i < NUM_SPHERE_POINTS; i++) {
  const phi = Math.acos(-1 + (2 * i) / NUM_SPHERE_POINTS);
  const theta = Math.sqrt(NUM_SPHERE_POINTS * Math.PI) * phi;
  const radius = 80;
  SPHERE_POINTS.push({
    x: radius * Math.cos(theta) * Math.sin(phi),
    y: radius * Math.sin(theta) * Math.sin(phi),
    z: radius * Math.cos(phi),
    type: 'core'
  });
}

// Orbiting Ring 1
const RING1_POINTS = [];
for (let i = 0; i < 90; i++) {
  const angle = (i / 90) * Math.PI * 2;
  RING1_POINTS.push({
    x: 105 * Math.cos(angle),
    y: 105 * Math.sin(angle),
    z: 0,
    tiltX: 0.7,
    tiltY: 0.3,
    type: 'ring1'
  });
}

// Orbiting Ring 2
const RING2_POINTS = [];
for (let i = 0; i < 70; i++) {
  const angle = (i / 70) * Math.PI * 2;
  RING2_POINTS.push({
    x: 120 * Math.cos(angle),
    y: 120 * Math.sin(angle),
    z: 0,
    tiltX: -0.6,
    tiltY: 0.8,
    type: 'ring2'
  });
}

function rotate3D(x, y, z, ax, ay, az) {
  // Rotate around X
  let cosA = Math.cos(ax), sinA = Math.sin(ax);
  let y1 = y * cosA - z * sinA;
  let z1 = y * sinA + z * cosA;

  // Rotate around Y
  cosA = Math.cos(ay); sinA = Math.sin(ay);
  let x2 = x * cosA + z1 * sinA;
  let z2 = -x * sinA + z1 * cosA;

  // Rotate around Z
  cosA = Math.cos(az); sinA = Math.sin(az);
  let x3 = x2 * cosA - y1 * sinA;
  let y3 = x2 * sinA + y1 * cosA;

  return { x: x3, y: y3, z: z2 };
}

function generateFrame(frameIndex) {
  const buf = Buffer.alloc(WIDTH * HEIGHT * 4, 0);
  const progress = frameIndex / TOTAL_FRAMES;
  const rotY = progress * Math.PI * 2;
  const rotX = Math.sin(progress * Math.PI * 2) * 0.4 + 0.3;
  const rotZ = progress * Math.PI * 2 * 0.5;

  const fov = 350;
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;

  // Subtle central ambient glow
  plotGlowDot(buf, centerX, centerY, 70, 40, 70, 180, 45);
  plotGlowDot(buf, centerX, centerY, 35, 60, 200, 255, 60);

  // Collect all projected points to sort by depth Z (back to front)
  const renderList = [];

  // Core sphere points
  for (const pt of SPHERE_POINTS) {
    const rot = rotate3D(pt.x, pt.y, pt.z, rotX, rotY, rotZ);
    renderList.push({ ...rot, kind: 'sphere' });
  }

  // Ring 1 points
  for (const pt of RING1_POINTS) {
    const rotTilt = rotate3D(pt.x, pt.y, pt.z, pt.tiltX, pt.tiltY, 0);
    const rot = rotate3D(rotTilt.x, rotTilt.y, rotTilt.z, rotX * 0.5, rotY * 1.5, rotZ);
    renderList.push({ ...rot, kind: 'ring1' });
  }

  // Ring 2 points
  for (const pt of RING2_POINTS) {
    const rotTilt = rotate3D(pt.x, pt.y, pt.z, pt.tiltX, pt.tiltY, 0);
    const rot = rotate3D(rotTilt.x, rotTilt.y, rotTilt.z, -rotX * 0.8, -rotY * 1.2, rotZ * 1.4);
    renderList.push({ ...rot, kind: 'ring2' });
  }

  // Sort by depth (Z ascending: far to near)
  renderList.sort((a, b) => a.z - b.z);

  for (const item of renderList) {
    const scale = fov / (fov + item.z + 180);
    const px = centerX + item.x * scale;
    const py = centerY + item.y * scale;

    const depthRatio = (item.z + 130) / 260; // 0 (back) to 1 (front)
    const clampedDepth = Math.max(0, Math.min(1, depthRatio));

    if (item.kind === 'sphere') {
      // Cyan to Indigo palette
      const r = Math.round(20 + 70 * clampedDepth);
      const g = Math.round(180 + 75 * clampedDepth);
      const b = Math.round(230 + 25 * clampedDepth);
      const size = 1.6 + 2.4 * clampedDepth;
      const alpha = Math.round(70 + 185 * clampedDepth);
      plotGlowDot(buf, px, py, size, r, g, b, alpha);
    } else if (item.kind === 'ring1') {
      // Neon Purple / Fuchsia ring
      const r = Math.round(180 + 75 * clampedDepth);
      const g = Math.round(70 + 50 * clampedDepth);
      const b = 255;
      const size = 1.2 + 2.0 * clampedDepth;
      const alpha = Math.round(80 + 175 * clampedDepth);
      plotGlowDot(buf, px, py, size, r, g, b, alpha);
    } else if (item.kind === 'ring2') {
      // Emerald to Cyan ring
      const r = Math.round(16 + 50 * clampedDepth);
      const g = Math.round(220 + 35 * clampedDepth);
      const b = Math.round(180 + 70 * clampedDepth);
      const size = 1.0 + 1.8 * clampedDepth;
      const alpha = Math.round(60 + 180 * clampedDepth);
      plotGlowDot(buf, px, py, size, r, g, b, alpha);
    }
  }

  return encodePNG(WIDTH, HEIGHT, buf);
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log(`Generating ${TOTAL_FRAMES} optimized animation frames in: ${OUT_DIR}...`);
  const startTime = Date.now();

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const frameNumber = String(i).padStart(3, '0');
    const fileName = `frame_${frameNumber}.png`;
    const filePath = path.join(OUT_DIR, fileName);
    const pngBuffer = generateFrame(i);
    fs.writeFileSync(filePath, pngBuffer);
    if ((i + 1) % 40 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(`Rendered ${i + 1}/${TOTAL_FRAMES} frames (${Math.round(((i + 1) / TOTAL_FRAMES) * 100)}%)`);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`Successfully generated all ${TOTAL_FRAMES} animation frames in ${duration}s!`);
}

main();
