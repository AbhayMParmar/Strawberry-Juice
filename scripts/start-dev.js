const { spawn } = require('child_process');

const child = spawn('npx', ['next', 'dev', '--webpack'], {
  shell: true,
  stdio: ['inherit', 'pipe', 'pipe']
});

const filterOutput = (data) => {
  const text = data.toString();
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const cleanLine = line.trim();
    if (cleanLine.includes('Local:') || cleanLine.includes('Network:')) {
      console.log('\x1b[32m%s\x1b[0m', cleanLine); // Output in green color
    }
  }
};

child.stdout.on('data', filterOutput);
child.stderr.on('data', filterOutput);

child.on('close', (code) => {
  process.exit(code);
});
