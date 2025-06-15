const fs = require('fs');
const manifest = require('./manifest.json');
const versionFile = './src/version.json';

const version = manifest.version;

fs.writeFileSync(versionFile, JSON.stringify({ version }, null, 2));
console.log(`已同步版本號到 ${versionFile}：${version}`);
