import fs from 'fs';

for (const file of ['src/components/Projects.tsx', 'sync_projects_to_db.ts', 'src/components/FeaturedProjects.tsx']) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\/images\/([a-zA-Z0-9\s\.-]+)/g, (match, filename) => {
      // Don't touch our compressed video
      if (filename.includes('hero-video-compressed.mp4')) return match;
      return '/images/' + filename.toLowerCase().replace(/\s+/g, '-');
    });
    fs.writeFileSync(file, content);
    console.log(`Updated paths in ${file}`);
  }
}
