import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const images = [
  'hand-drag.png',
  'hand-rock.png',
  '2D-circle.png',
  '3D-combo.png',
  '3D-cone.png',
  '3D-hoop.png',
  '3D-keyframe.png',
  '3D-semi.png',
  '3D-spiral.png',
  '3D-squish.png',
  '3D-triangle.png',
  '3D-tunnel.png',
  '3D-poly.png',
  '2D-circles.png',
  '2D-keyframe.png',
  '2D-lightning.png',
  '2D-star.png',
  '2D-flower.png',
];

async function downloadImages() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to project root, then to public/static/images/confetti
  const projectRoot = path.resolve(__dirname, '..');
  const outputDir = path.join(projectRoot, 'public', 'static', 'images', 'confetti');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const imageName of images) {
    const url = `https://assets.codepen.io/16327/${imageName}`;
    console.log(`Downloading ${imageName}...`);

    try {
      const viewSource = await page.goto(url);
      const buffer = await viewSource.buffer();
      const filePath = path.join(outputDir, imageName);
      fs.writeFileSync(filePath, buffer);
      console.log(`✓ Saved ${imageName}`);
    } catch (error) {
      console.error(`✗ Failed to download ${imageName}:`, error.message);
    }
  }

  await browser.close();
  console.log('Done!');
}

downloadImages().catch(console.error);
