/**
 * Generates sample SVG preview graphics for portfolio projects
 */
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'frontend', 'public', 'images');

const projects = [
  { id: 1, title: 'Nexus Cloud Control Plane', tag: 'KUBERNETES & RUST', color1: '#06b6d4', color2: '#3b82f6' },
  { id: 2, title: 'NeuralSync AI Search Engine', tag: 'LLM & VECTOR DB', color1: '#8b5cf6', color2: '#ec4899' },
  { id: 3, title: 'AetherFlow Real-Time Stream', tag: 'WEBSOCKET & GO', color1: '#10b981', color2: '#06b6d4' },
  { id: 4, title: 'QuantumPay DeFi Settlement', tag: 'FINTECH & SOLIDITY', color1: '#f59e0b', color2: '#ef4444' },
  { id: 5, title: 'Synthetix 3D Asset Studio', tag: 'THREE.JS & WEBGL', color1: '#3b82f6', color2: '#8b5cf6' },
  { id: 6, title: 'PulseOps Observability Suite', tag: 'MONITORING & TS', color1: '#ec4899', color2: '#f43f5e' }
];

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="g${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.color1}" />
      <stop offset="100%" stop-color="${p.color2}" />
    </linearGradient>
    <radialGradient id="rg${p.id}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${p.color1}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#0b0f19" stop-opacity="0.95" />
    </radialGradient>
  </defs>
  <rect width="800" height="500" rx="16" fill="#0b0f19" />
  <rect width="800" height="500" rx="16" fill="url(#rg${p.id})" />

  <!-- Code / Grid overlay -->
  <g stroke="#ffffff" stroke-opacity="0.06" stroke-width="1">
    <line x1="0" y1="100" x2="800" y2="100" />
    <line x1="0" y1="200" x2="800" y2="200" />
    <line x1="0" y1="300" x2="800" y2="300" />
    <line x1="0" y1="400" x2="800" y2="400" />
    <line x1="200" y1="0" x2="200" y2="500" />
    <line x1="400" y1="0" x2="400" y2="500" />
    <line x1="600" y1="0" x2="600" y2="500" />
  </g>

  <!-- Browser/Window Mockup Frame -->
  <rect x="70" y="70" width="660" height="360" rx="12" fill="#111827" stroke="#1f2937" stroke-width="2" />
  <!-- Title bar -->
  <rect x="70" y="70" width="660" height="40" rx="12" fill="#1e293b" />
  <circle cx="100" cy="90" r="5" fill="#ef4444" />
  <circle cx="118" cy="90" r="5" fill="#f59e0b" />
  <circle cx="136" cy="90" r="5" fill="#10b981" />
  <rect x="250" y="80" width="300" height="20" rx="6" fill="#0f172a" />

  <!-- Center Artwork -->
  <rect x="120" y="140" width="560" height="180" rx="8" fill="url(#g${p.id})" fill-opacity="0.1" stroke="url(#g${p.id})" stroke-width="1.5" stroke-dasharray="8 6" />

  <!-- Hologram Node / Chart -->
  <circle cx="400" cy="220" r="45" fill="none" stroke="url(#g${p.id})" stroke-width="3" />
  <circle cx="400" cy="220" r="25" fill="url(#g${p.id})" opacity="0.3" />
  <circle cx="330" cy="220" r="14" fill="${p.color1}" opacity="0.8" />
  <circle cx="470" cy="220" r="14" fill="${p.color2}" opacity="0.8" />
  <line x1="344" y1="220" x2="355" y2="220" stroke="url(#g${p.id})" stroke-width="2" />
  <line x1="445" y1="220" x2="456" y2="220" stroke="url(#g${p.id})" stroke-width="2" />

  <!-- Text badges -->
  <rect x="120" y="345" width="160" height="28" rx="6" fill="url(#g${p.id})" opacity="0.2" />
  <text x="130" y="364" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" letter-spacing="1">${p.tag}</text>
  <text x="120" y="405" fill="#f9fafb" font-family="system-ui, sans-serif" font-size="20" font-weight="bold">${p.title}</text>
</svg>`;
  fs.writeFileSync(path.join(imgDir, `project${p.id}.svg`), svg);
}
console.log('Generated 6 project preview SVG graphics');
