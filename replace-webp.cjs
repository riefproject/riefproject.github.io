const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

function replaceInFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  // We only replace .png and .jpg if they are preceded by something indicating an image path,
  // or we can just replace all instances of .png and .jpg with .webp if they are inside /img/
  // Regex: match /img/.*\.png or .jpg
  let updated = content.replace(/(\/img\/[^"'\s]+)\.(png|jpg|jpeg)/g, '$1.webp');
  
  if (content !== updated) {
    fs.writeFileSync(filepath, updated);
    console.log(`Updated ${filepath}`);
  }
}

walk(path.join(process.cwd(), 'src'), replaceInFile);
walk(path.join(process.cwd(), 'public', 'data'), replaceInFile); // if any
