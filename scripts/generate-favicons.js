import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read the SVG file
const svgBuffer = readFileSync(resolve('public/favicon.svg'));

// Generate different sizes
const sizes = [16, 32, 48, 180, 192, 512];

for (const size of sizes) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(`public/favicon-${size}x${size}.png`);
  
  console.log(`Generated favicon-${size}x${size}.png`);
}

// Generate the main favicon.png (32x32)
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile('public/favicon.png');

console.log('Generated favicon.png');

// Generate favicon.ico (16x16 and 32x32 combined)
await sharp(svgBuffer)
  .resize(16, 16)
  .png()
  .toFile('public/favicon-16.png');

await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile('public/favicon-32.png');

console.log('Generated all favicon variations');
