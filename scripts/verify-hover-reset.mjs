import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const [route, selectors] of [
    ['/projects', ['.project-card']],
    ['/', ['.principle', '.service-card', '.skill-group', '.project-card']],
  ]) {
    await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'enabled');
    for (const selector of selectors) {
      const cards = page.locator(selector);
      for (let index = 0; index < Math.min(3, await cards.count()); index++) {
        const card = cards.nth(index);
        await page.mouse.move(0, 0);
        await card.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await page.waitForTimeout(1100);
        // Repeated pointer movement while shrinking previously cached a small transform.
        for (let cycle = 0; cycle < 2; cycle++) {
          await card.hover();
          await page.waitForTimeout(280);
          const box = await card.boundingBox();
          await page.mouse.move(box.x + box.width * .6, box.y + box.height * .45);
          await page.waitForTimeout(80);
          await page.mouse.move(0, 0);
          await page.waitForTimeout(500);
          await checkOriginalSize(card);
        }
        await card.hover();
        const largestScale = await card.evaluate(e => new Promise(resolve => {
          const started = performance.now();
          let largest = 0;
          const sample = () => {
            largest = Math.max(largest, Number.parseFloat(getComputedStyle(e).scale) || 1);
            if (performance.now() - started < 1000) requestAnimationFrame(sample);
            else resolve(largest);
          };
          sample();
        }));
        assert.ok(largestScale <= 1, `Card grew beyond its original size: ${largestScale}`);
        await checkOriginalSize(card);
        await page.mouse.move(0, 0);
        await page.waitForTimeout(500);
        await checkOriginalSize(card);
      }
      console.log(`PASS ${route} ${selector}: full and interrupted hover restore original size`);
    }
  }
} finally {
  await browser.close();
}

async function checkOriginalSize(card) {
  const dimensions = await card.evaluate(e => {
    const rect = e.getBoundingClientRect();
    return { width: rect.width, height: rect.height, layoutWidth: e.offsetWidth, layoutHeight: e.offsetHeight, transform: getComputedStyle(e).transform };
  });
  assert.ok(Math.abs(dimensions.width - dimensions.layoutWidth) < 1, JSON.stringify(dimensions));
  assert.ok(Math.abs(dimensions.height - dimensions.layoutHeight) < 1, JSON.stringify(dimensions));
}
