import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 for(const route of ['/','/about']) {
  await page.goto(`http://localhost:3000${route}`,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.documentElement.dataset.motion==='enabled');
  await page.locator('.timeline-item').last().evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
  await page.waitForFunction(()=>[...document.querySelectorAll('.timeline-item h3,.timeline-item .journey-step')].every(e=>Number(getComputedStyle(e).opacity)>.99));
  await page.waitForFunction(()=>Number(document.querySelector('.timeline').style.getPropertyValue('--timeline-progress'))>.5);
  console.log(`PASS journey motion ${route}: staggered content, milestones, scroll progress`);
 }
 await page.locator('.outline-button').first().scrollIntoViewIfNeeded();
 await page.locator('.outline-button').first().hover();
 assert.notEqual(await page.locator('.outline-button').first().evaluate(e=>getComputedStyle(e).borderTopLeftRadius),'0px');
 await page.locator('.principle').first().scrollIntoViewIfNeeded();
 await page.locator('.principle').first().hover();
 assert.ok(await page.locator('.principle').first().evaluate(e=>e.style.getPropertyValue('--pointer-x')));
 console.log('PASS button shape and pointer-responsive card hover');
} finally {await browser.close();}
