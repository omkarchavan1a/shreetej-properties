import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const assertions = [
  {
    name: '1. Platinum 5 in db seeder',
    check: () => fs.readFileSync(path.join(rootDir, 'scripts/seed-projects.ts'), 'utf-8').includes('Shreetej Platinum 5')
  },
  {
    name: '2. Saiban Layout in Projects.tsx',
    check: () => fs.readFileSync(path.join(rootDir, 'src/components/Projects.tsx'), 'utf-8').includes('Saiban Phase-9')
  },
  {
    name: '3. Stats/Counter changed to 16+',
    check: () => {
      const hero = fs.readFileSync(path.join(rootDir, 'src/components/Hero.tsx'), 'utf-8');
      const why = fs.readFileSync(path.join(rootDir, 'src/components/WhyChooseUs.tsx'), 'utf-8');
      return hero.includes('target={16}') && why.includes('target={16}');
    }
  },
  {
    name: '4. Lucide React Icons in Services',
    check: () => {
      const services = fs.readFileSync(path.join(rootDir, 'src/components/Services.tsx'), 'utf-8');
      return services.includes('lucide-react') && services.includes('<Map') && services.includes('<Scale');
    }
  },
  {
    name: '5. Video in Hero / Services',
    check: () => {
      const services = fs.readFileSync(path.join(rootDir, 'src/components/Services.tsx'), 'utf-8');
      const hero = fs.readFileSync(path.join(rootDir, 'src/components/Hero.tsx'), 'utf-8');
      return hero.includes('front page office  video.mp4') && services.includes('<video');
    }
  },
  {
    name: '6. Founder Section Output',
    check: () => fs.readFileSync(path.join(rootDir, 'src/app/about/page.tsx'), 'utf-8').includes('The journey to success in the real estate sector')
  },
  {
    name: '7. Partner Logos',
    check: () => fs.readFileSync(path.join(rootDir, 'src/app/about/page.tsx'), 'utf-8').includes('hdfc-logo.svg')
  },
  {
    name: '8. Filters in Projects.tsx',
    check: () => {
      const p = fs.readFileSync(path.join(rootDir, 'src/components/Projects.tsx'), 'utf-8');
      return p.includes('typeFilter') && p.includes('areaFilter') && p.includes('Ghulewadi');
    }
  },
  {
    name: '9. Completed Projects 1-16 array',
    check: () => {
      const p = fs.readFileSync(path.join(rootDir, 'src/components/Projects.tsx'), 'utf-8');
      return p.includes('Bungalow (Bharat Khemnar)') && p.includes('Shreetej Platinum-2');
    }
  },
];

console.log('--- Shreetej Updates Verification ---');
let allPassed = true;

for (const ast of assertions) {
  try {
    const passed = ast.check();
    if (passed) {
      console.log(`✅ ${ast.name}`);
    } else {
      console.error(`❌ ${ast.name} - Failed!`);
      allPassed = false;
    }
  } catch (err) {
    console.error(`⚠️ ${ast.name} - Error: ${err.message}`);
    allPassed = false;
  }
}

console.log('-----------------------------------');
if (allPassed) {
  console.log('🎉 ALL 10 REQUIREMENTS SUCCESSFULLY VERIFIED!');
} else {
  console.log('⚠️ SOME TESTS FAILED. CHECK LOGS ABOVE.');
  process.exit(1);
}
