import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const projectsCode = fs.readFileSync(path.join(rootDir, 'src/components/Projects.tsx'), 'utf-8');

// Regex to find all img values in Projects.tsx: img: "/images/something.jpeg"
const imgRegex = /img:\s*"(\/images\/[^"]+)"/g;
let match;
const imagePaths = new Set();
while ((match = imgRegex.exec(projectsCode)) !== null) {
  imagePaths.add(match[1]);
}

console.log('--- Image Verification ---');
let allExist = true;

for (const imgPath of imagePaths) {
  // Path is like /images/foo.jpeg -> public/images/foo.jpeg
  const fullPath = path.join(rootDir, 'public', imgPath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ FOUND: ${imgPath}`);
  } else {
    console.log(`❌ MISSING: ${imgPath}`);
    allExist = false;
  }
}

console.log('--------------------------');
if (allExist) {
  console.log('🎉 ALL ASSIGNED IMAGES EXIST IN PUBLIC FOLDER!');
} else {
  console.log('⚠️ SOME IMAGES ARE MISSING. (These are currently acting as placeholders)');
}
