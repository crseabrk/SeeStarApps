const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const base=path.resolve('photometry/walkthrough'),html=fs.readFileSync(path.join(base,'index.html'),'utf8');
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
const elements=Object.fromEntries(ids.map(id=>[id,{textContent:'',children:[],setAttribute(k,v){this[k]=v;}}]));
Object.defineProperty(elements.dots,'innerHTML',{set(v){this.children=[...v.matchAll(/data-slide="(\d+)"/g)].map(m=>({dataset:{slide:m[1]},setAttribute(k,v){this[k]=v;}}));}});
let key;const context={document:{getElementById:id=>elements[id]||null,addEventListener(type,handler){if(type==='keydown')key=handler;}}};vm.createContext(context);vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context);
assert.equal(elements.count.textContent,'1 / 8');assert.equal(elements.previous.disabled,true);
for(let i=1;i<8;i++)elements.next.onclick();assert.equal(elements.count.textContent,'8 / 8');assert.equal(elements.next.disabled,true);
key({key:'Home',preventDefault(){}});assert.equal(elements.count.textContent,'1 / 8');key({key:'ArrowRight',preventDefault(){}});assert.equal(elements.count.textContent,'2 / 8');
elements.dots.onclick({target:{closest:()=>({dataset:{slide:'5'}})}});assert.equal(elements.count.textContent,'6 / 8');
assert.ok(html.includes('href="../"'));assert.ok(html.includes('href="../analyzer/"'));
const manifest=JSON.parse(fs.readFileSync(path.join(base,'manifest.json'),'utf8'));for(const s of manifest.slides){assert.ok(fs.statSync(path.join(base,'images',s.image)).size>10000);}
for(const [file,hash] of Object.entries(manifest.image_sha256)){assert.equal(require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(base,'images',file))).digest('hex'),hash);}
assert.ok(html.startsWith('<!doctype html>'));assert.ok(html.includes('<body>'));assert.ok(!html.includes('earlier layout'));
assert.equal(manifest.slides.length,8);assert.deepEqual(JSON.parse(JSON.stringify(vm.runInContext('slides',context))),manifest.slides);
assert.ok(manifest.slides.some(s=>s.image==='05-quality-sliders.jpg'));assert.ok(manifest.slides.some(s=>s.image==='07-vstar-export.jpg'));
assert.ok(manifest.slides.every(s=>!s.body.includes('the owner')&&!s.note.includes('the owner')));
console.log('PASS: eight current screenshot assets, real DOM IDs, next/previous bounds, Home/arrow keys and direct slide selection');
