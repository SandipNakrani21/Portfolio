import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto('http://localhost:3000/',{waitUntil:'networkidle'});
 const card=page.locator('.reference-project').first();
 await card.scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('.reference-project')).opacity)>.99);
 await card.locator('summary').click();
 assert.equal(await card.locator('details').getAttribute('open'),'');
 assert.ok(await card.locator('details li').first().isVisible());
 await card.hover();
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('.reference-project h3')).color==='rgb(120, 39, 43)');
 const signature=page.locator('.footer-signature');
 await signature.scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>[...document.querySelectorAll('.footer-signature > span')].every(e=>Number(getComputedStyle(e).opacity)>.99));
 await signature.hover();
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('.footer-signature')).color==='rgb(184, 90, 84)');
 await signature.click();await page.waitForURL('**/contact');
 console.log('PASS project expansion, title hover, footer reveal/color hover, and contact link');
}finally{await browser.close()}
