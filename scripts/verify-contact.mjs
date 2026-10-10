// Local TLS SMTP fixture: no messages leave this computer and no real credentials are used.
import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import tls from 'node:tls';
import net from 'node:net';
import ts from 'typescript';
import { chromium } from '@playwright/test';

const source = readFileSync('app/lib/contact-email.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { contactEmail, validateContact } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const details = { firstName:'Test', lastName:'Visitor', email:'visitor@example.com', mobile:'+91 9876543210', topic:'Project discussion', message:'Hello Sandip,\nI would like to discuss a project.' };
assert.ok(validateContact(details));
for (const invalid of [null, [], {...details, email:'bad'}, {...details, mobile:'123'}, {...details, firstName:'Injected\r\nBcc: other@example.com'}, {...details, message:'x'.repeat(4001)}]) assert.equal(validateContact(invalid), null);
const email = contactEmail({...details, message:'<script>alert("test")</script>\nSecond line'}, new Date('2026-10-11T00:00:00Z'));
assert.equal(email.subject, '[Portfolio enquiry] Project discussion — Test Visitor');
assert.ok(!email.html.includes('<script>'));
assert.ok(email.html.includes('&lt;script&gt;'));
assert.ok(email.html.includes('<br>Second line'));
assert.ok(email.text.includes('IST'));

const directory = mkdtempSync(path.join(tmpdir(), 'portfolio-smtp-test-'));
const openssl = process.env.OPENSSL_PATH || (process.platform === 'win32' && existsSync('C:/Program Files/Git/usr/bin/openssl.exe') ? 'C:/Program Files/Git/usr/bin/openssl.exe' : 'openssl');
let smtp, child, browser;
const sockets = new Set();
try {
  execFileSync(openssl, ['req','-x509','-newkey','rsa:2048','-nodes','-keyout',path.join(directory,'key.pem'),'-out',path.join(directory,'cert.pem'),'-days','1','-subj','/CN=localhost','-addext','subjectAltName=DNS:localhost,IP:127.0.0.1','-addext','basicConstraints=critical,CA:TRUE'], {stdio:'ignore', env:{...process.env, MSYS_NO_PATHCONV:'1'}});
  const received = [];
  let reject = false;
  smtp = tls.createServer({key:readFileSync(path.join(directory,'key.pem')),cert:readFileSync(path.join(directory,'cert.pem'))}, socket => {
    sockets.add(socket);
    socket.on('close',()=>sockets.delete(socket));
    socket.on('error',()=>{});
    socket.write('220 localhost test SMTP\r\n');
    let buffer='', data=false, message='', recipient='';
    socket.on('data',chunk=>{
      buffer += chunk.toString();
      while(buffer.includes('\r\n')) {
        const index=buffer.indexOf('\r\n'), line=buffer.slice(0,index);
        buffer=buffer.slice(index+2);
        if(data) {
          if(line==='.') { data=false;received.push({recipient,message});socket.write('250 Message accepted\r\n'); }
          else message+=line+'\r\n';
        } else if(/^EHLO/.test(line)) socket.write('250-localhost\r\n250 AUTH PLAIN\r\n');
        else if(/^AUTH/.test(line)) socket.write('235 Authenticated\r\n');
        else if(/^MAIL FROM/.test(line)) socket.write('250 OK\r\n');
        else if(/^RCPT TO/.test(line)) {recipient=line;socket.write(reject?'550 Recipient rejected\r\n':'250 OK\r\n');}
        else if(line==='DATA') {data=true;message='';socket.write('354 End with a dot\r\n');}
        else if(line==='QUIT') {socket.end('221 Bye\r\n');}
        else socket.write('250 OK\r\n');
      }
    });
  });
  await new Promise(resolve=>smtp.listen(0,'127.0.0.1',resolve));
  const portProbe=net.createServer();
  await new Promise(resolve=>portProbe.listen(0,'127.0.0.1',resolve));
  const port=portProbe.address().port;
  await new Promise(resolve=>portProbe.close(resolve));
  const base=`http://127.0.0.1:${port}`;
  child=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{
    env:{...process.env,NODE_EXTRA_CA_CERTS:path.join(directory,'cert.pem'),SMTP_HOST:'127.0.0.1',SMTP_PORT:String(smtp.address().port),SMTP_SECURE:'true',SMTP_USER:'fixture@example.com',SMTP_PASSWORD:'local-test-only',SMTP_FROM:'fixture@example.com'},stdio:['ignore','pipe','pipe'],windowsHide:true,
  });
  child.stdout.resume();child.stderr.resume();
  let ready=false;
  for(let i=0;i<60;i++){try{if((await fetch(base)).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,250));}
  assert.ok(ready,'Test preview must start');
  const post=(body,origin=base)=>fetch(`${base}/api/contact`,{method:'POST',headers:{'content-type':'application/json',origin},body:JSON.stringify(body)});
  assert.equal((await post(details,'https://other.example')).status,403);
  assert.equal((await post({...details,mobile:'123'})).status,400);
  assert.equal((await post({...details,website:'spam.example'})).status,400);
  assert.equal((await post({...details,message:'x'.repeat(21000)})).status,413);
  assert.equal((await post(details)).status,200);
  assert.equal(received.length,1);
  assert.ok(received[0].recipient.includes('sandipdpatel2189@gmail.com'));
  assert.ok(received[0].message.includes('Reply-To: Test Visitor <visitor@example.com>'));
  assert.ok(received[0].message.includes('Content-Type: multipart/alternative'));
  for(const value of ['Test','Visitor','visitor@example.com','9876543210','Project discussion']) assert.ok(received[0].message.includes(value));
  reject=true;
  assert.equal((await post({...details,email:'failure@example.com'})).status,502);
  reject=false;
  assert.equal((await post(details)).status,200);
  assert.equal((await post(details)).status,200);
  assert.equal((await post(details)).status,429);

  browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await page.goto(`${base}/contact`);
  for(const [key,value] of Object.entries(details)) await page.locator(`[name="${key}"]`).fill(value);
  assert.equal(await page.getByText('Send Email opens a draft', {exact:false}).count(),0);
  await page.route('**/api/contact',async route=>{await new Promise(r=>setTimeout(r,500));await route.fulfill({status:502,contentType:'application/json',body:JSON.stringify({message:'Test delivery failed'})})});
  await page.getByRole('button',{name:'Send Email',exact:true}).click();
  await page.getByRole('button',{name:'Sending…',exact:true}).waitFor();
  assert.equal(await page.locator('[name="firstName"]').isDisabled(),true);
  await page.getByRole('alert').filter({hasText:'Test delivery failed'}).waitFor();
  assert.equal(await page.locator('[name="message"]').inputValue(),details.message);
  await page.unroute('**/api/contact');
  await page.locator('[name="email"]').fill('ui-success@example.com');
  await page.getByRole('button',{name:'Send Email',exact:true}).click();
  await page.getByRole('status').filter({hasText:'Your message has been sent'}).waitFor();
  assert.equal(await page.locator('[name="message"]').inputValue(),'');
  console.log('PASS email validation, escaped template, TLS SMTP recipient/reply-to, server rejection, rate limits, and form sending/success/error states');
} finally {
  if(browser) await browser.close();
  if(child) {const exited=new Promise(resolve=>child.once('exit',resolve));child.kill();await exited;}
  for(const socket of sockets) socket.destroy();
  if(smtp) await new Promise(resolve=>smtp.close(resolve));
  rmSync(directory,{recursive:true,force:true});
}
