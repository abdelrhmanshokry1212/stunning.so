const { spawn } = require('child_process');

console.log('🚀 Starting NestJS backend...');

const child = spawn('npx', ['ts-node', 'src/main.ts'], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('❌ Error starting server:', error);
});

child.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
}); 