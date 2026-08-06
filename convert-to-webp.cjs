const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(process.cwd(), 'public', 'img');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

const filesToConvert = [];
walk(imgDir, (filepath) => {
  if (filepath.endsWith('.png') || filepath.endsWith('.jpg') || filepath.endsWith('.jpeg')) {
    filesToConvert.push(filepath);
  }
});

console.log(`Found ${filesToConvert.length} images to convert.`);

filesToConvert.forEach(file => {
  const ext = path.extname(file);
  const outPath = file.substring(0, file.length - ext.length) + '.webp';
  
  // Use lossless for very small files (< 50KB) or logos, but lossy q=85 is generally excellent and safe.
  // Let's check dimensions or size. Actually, q=85 is extremely high quality for web.
  // Let's use q=85 for all to ensure "elegan" but small.
  // Exception: if it's already converted (like KopSy.webp), we skip.
  if (fs.existsSync(outPath)) {
    console.log(`Skipping (exists): ${outPath}`);
    return;
  }
  
  try {
    console.log(`Converting: ${file}`);
    execSync(`cwebp -q 85 "${file}" -o "${outPath}"`, { stdio: 'ignore' });
  } catch (e) {
    console.error(`Failed to convert ${file}`);
  }
});
