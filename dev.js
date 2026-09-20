/**
 * Zero-Dependency Concurrent Dev Runner
 * Runs both Vite Frontend and Express Backend concurrently with colored prefix logs
 * and clean process management on Windows and POSIX.
 */

const { spawn } = require('child_process');
const path = require('path');

const ROOT_DIR = __dirname;
const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// ANSI Color Codes
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';

console.log(`${BOLD}${GREEN}====================================================${RESET}`);
console.log(`${BOLD}${GREEN}    🚀 Starting Full-Stack Portfolio Dev Environment    ${RESET}`);
console.log(`${BOLD}${GREEN}====================================================${RESET}`);
console.log(`${CYAN}• Frontend:  http://localhost:5173${RESET}`);
console.log(`${MAGENTA}• Backend:   http://localhost:5000${RESET}`);
console.log(`${YELLOW}Press Ctrl+C to terminate both servers cleanly.${RESET}\n`);

const children = [];

function pipeOutput(stream, prefix, color) {
  let buffer = '';
  stream.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop(); // keep partial line in buffer

    for (const line of lines) {
      if (line.trim().length > 0) {
        console.log(`${color}${prefix}${RESET} ${line}`);
      }
    }
  });

  stream.on('end', () => {
    if (buffer.trim().length > 0) {
      console.log(`${color}${prefix}${RESET} ${buffer}`);
    }
  });
}

function startProcess(name, cmd, args, cwd, color) {
  const child = spawn(cmd, args, {
    cwd,
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' },
    stdio: ['inherit', 'pipe', 'pipe']
  });

  children.push({ name, process: child });

  const prefix = `[${name.padEnd(8)}]`;
  pipeOutput(child.stdout, prefix, color);
  pipeOutput(child.stderr, prefix, RED);

  child.on('error', (err) => {
    console.error(`${RED}[${name}] Failed to start:${RESET}`, err.message);
  });

  child.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.log(`${YELLOW}[${name}] Exited with code ${code}${RESET}`);
    }
  });

  return child;
}

// 1. Start Backend API
startProcess(
  'BACKEND',
  npmCmd,
  ['run', 'dev'],
  path.join(ROOT_DIR, 'backend'),
  MAGENTA
);

// 2. Start Frontend Vite Dev Server
startProcess(
  'FRONTEND',
  npmCmd,
  ['run', 'dev'],
  path.join(ROOT_DIR, 'frontend'),
  CYAN
);

function killChildren() {
  console.log(`\n${YELLOW}Shutting down processes gracefully...${RESET}`);
  for (const { name, process: child } of children) {
    if (child && !child.killed) {
      if (isWindows && child.pid) {
        try {
          spawn('taskkill', ['/pid', child.pid.toString(), '/f', '/t']);
        } catch {
          child.kill('SIGTERM');
        }
      } else {
        child.kill('SIGTERM');
      }
    }
  }
}

process.on('SIGINT', () => {
  killChildren();
  process.exit(0);
});

process.on('SIGTERM', () => {
  killChildren();
  process.exit(0);
});

process.on('exit', () => {
  killChildren();
});
