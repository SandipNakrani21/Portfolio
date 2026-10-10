import { mkdir, copyFile, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';

const savedSource = resolve('assets/source-original.mp4');
const output = resolve('public/media');
await mkdir(resolve('assets'), {recursive: true});
await mkdir(output, {recursive: true});
if (process.argv[2] && resolve(process.argv[2]) !== savedSource) await copyFile(resolve(process.argv[2]), savedSource);
await stat(savedSource);

const run = (args) => new Promise((done, reject) => {
  const process = spawn(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {windowsHide: true});
  let error = '';
  process.stderr.on('data', chunk => error += chunk);
  process.on('error', reject);
  process.on('close', code => code === 0 ? done() : reject(new Error(error)));
});
const encoding = ['-c:v', 'libx264', '-preset', 'fast', '-crf', '18', '-threads', '4', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an'];
// The source is 1280x720. Upscaling increases dimensions, not native detail.
const master = resolve('Man_typing_on_keyboard_20261010132006-3840x2160.mp4');
await run(['-i', savedSource, '-vf', 'scale=3840:2160:flags=lanczos,setsar=1', ...encoding, master]);
console.log('Saved 3840x2160 master in the project folder');
// Reverse at source resolution to avoid buffering 4K frames in memory.
// Keep the original 24 fps timing, with a forward-and-reverse loop.
for (const [name, width, crf] of [['4k',3840,18], ['desktop',1920,18], ['mobile',1280,20]]) {
  await run(['-i',savedSource,'-filter_complex',`[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0,scale=${width}:-2:flags=lanczos,setsar=1[out]`,'-map','[out]',...encoding,'-crf',String(crf),`${output}/hero-${name}.mp4`]);
  console.log(`Created ${name} background (${width}px wide)`);
}
const poster = resolve('assets/video-poster.png');
await run(['-i',savedSource,'-frames:v','1',poster]);
await sharp(poster).resize(1920,1080).webp({quality:92}).toFile(`${output}/hero-poster.webp`);
await import('./update-social-image.mjs');
console.log('Updated poster and social sharing image');
