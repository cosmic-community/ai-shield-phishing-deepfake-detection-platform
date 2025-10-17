const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', '.next', 'server', 'app');
const scriptPath = path.join(__dirname, '..', 'public', 'dashboard-console-capture.js');

function injectScript(htmlPath) {
  if (!fs.existsSync(htmlPath)) return;
  
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  if (html.includes('dashboard-console-capture.js')) {
    console.log(`Script already present in ${htmlPath}`);
    return;
  }
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  html = html.replace('</head>', `${scriptTag}</head>`);
  
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`Injected console capture script into ${htmlPath}`);
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('Injecting console capture script into build files...');
walkDir(buildDir);
console.log('Console capture script injection complete!');