const { exec } = require('child_process');

const command = `
  mkdir -p dist/dist/extensions &&
  cp -rf dist/extensions/* dist/dist/extensions &&
  cp dist/bcst-bus.js dist/dist/bcst-bus.js
`;

exec(command, (error, stdout, stderr) => {
});