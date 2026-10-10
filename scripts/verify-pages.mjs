import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[];
const routes=['/','/about','/services','/projects','/contact','/projects/rostering','/projects/microservices','/projects/containers','/projects/real-estate','/projects/parts','/projects/cold-storage'];
try{
 for(const [label,width,height] of [['large-desktop',2560,1440],['desktop',1440,900],['tablet',768,1024],['mobile',390,844],['small-mobile',320,740]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(e.message));
  const titles=new Set();
  for(const route of routes){
   const response=await page.goto(`http://localhost:3000${route}`,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,route);
   assert.equal(await page.locator('h1').count(),1,route);
   assert.equal(await page.locator('main').count(),1,route);
   assert.equal(await page.locator('header').count(),1,route);
   assert.equal(await page.locator('footer').count(),1,route);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${label} ${route} overflow`);
   assert.ok(await page.locator('meta[name="description"]').getAttribute('content'));
   titles.add(await page.title());
   if(route==='/' ){for(const id of ['about','services','skills','work','experience','contact'])assert.equal(await page.locator(`#${id}`).count(),1);assert.equal(await page.locator('.reference-project').count(),6);assert.equal(await page.locator('#experience li').count(),0);}
   if(route==='/about')assert.ok(await page.locator('#experience li').count()>0);
   assert.ok(await page.getByRole('navigation',{name:'Main navigation',includeHidden:true}).getByRole('link',{includeHidden:true,name:route==='/'?'Home':route.startsWith('/projects')?'Projects':route==='/about'?'About':route==='/services'?'Services':'Contact',exact:true}).getAttribute('aria-current')==='page');
   if(label==='desktop' && ['/about','/projects','/contact'].includes(route)) await page.screenshot({path:`test-results/pages-${route.slice(1)}.png`,fullPage:true});
  }
  assert.equal(titles.size,routes.length);
  if(width<=1000){await page.getByRole('button',{name:'Open navigation'}).click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'About',exact:true}).click();await page.waitForURL('**/about');assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'false');}
  else{await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'About',exact:true}).click();await page.waitForURL('**/about');}
  assert.equal((await page.request.get('http://localhost:3000/documents/Sandip-Nakrani-CV.pdf')).status(),200);
  assert.equal((await page.request.get('http://localhost:3000/projects/not-a-project')).status(),404);
  console.log(`PASS ${label}: 11 routes, unique metadata, navigation, layout, CV download, 404`);
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000/about');
 await page.waitForFunction(()=>document.documentElement.dataset.motion==='enabled');
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('.page-intro h1')).opacity==='1');
 for(const [name,path] of [['Services','/services'],['Projects','/projects'],['Contact','/contact'],['About','/about']]){
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name,exact:true}).click();await page.waitForURL(`**${path}`);
  await page.waitForFunction(()=>document.documentElement.dataset.motion==='enabled' && getComputedStyle(document.querySelector('.page-intro h1')).opacity==='1');
 }
 await page.locator('#skills').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>[...document.querySelectorAll('.skill-group')].filter(e=>{const r=e.getBoundingClientRect();return r.top<innerHeight*.9&&r.bottom>0;}).every(e=>Number(getComputedStyle(e).opacity)>.99));
 await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Home',exact:true}).click();await page.waitForURL('http://localhost:3000/');
 await page.waitForFunction(()=>document.documentElement.dataset.motion==='enabled');
 for(const selector of ['#about .about-text','#services .service-card','#skills .tech-item','#work .project-card','#experience .timeline-item','#contact .contact-form']){await page.locator(selector).first().scrollIntoViewIfNeeded();await page.waitForFunction(selector=>Number(getComputedStyle(document.querySelector(selector)).opacity)>.99,selector);}
 await page.screenshot({path:'test-results/home-overview.png',fullPage:true});
 assert.deepEqual(errors,[]);
 console.log('PASS client navigation: animation reinitialization and scroll reveals');
}finally{await browser.close();}
