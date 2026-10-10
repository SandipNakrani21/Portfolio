import sharp from 'sharp';
import { resolve } from 'node:path';
const overlay = Buffer.from(`<svg width="1200" height="630"><rect width="1200" height="630" fill="#0d0809" opacity=".72"/><rect x="70" y="160" width="52" height="4" fill="#9d3e3e"/><text x="70" y="110" fill="#dfc7a5" font-family="Arial" font-weight="bold" font-size="38">SN.</text><text x="70" y="270" fill="#dfc7a5" font-family="Arial" font-weight="bold" font-size="76">SANDIP</text><text x="70" y="360" fill="#9d3e3e" font-family="Arial" font-weight="bold" font-size="76">NAKRANI</text><text x="74" y="440" fill="#dfc7a5" font-family="Arial" font-size="28">Senior Full Stack Developer</text><text x="74" y="500" fill="#b4b6ba" font-family="Arial" font-size="22">.NET Core / Angular / React / SQL Server</text></svg>`);
await sharp(resolve('assets/video-poster.png')).resize(1200,630,{fit:'cover'}).composite([{input:overlay}]).jpeg({quality:90}).toFile(resolve('public/media/og-image.jpg'));
console.log('Updated Sandip Nakrani social sharing image');

