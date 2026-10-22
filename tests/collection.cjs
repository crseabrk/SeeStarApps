const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(root+'/photometry/analyzer/index.html','utf8');
const harness=fs.readFileSync(root+'/tests/harness.cjs','utf8');
function load(){const module={exports:{}};vm.runInNewContext(harness,{module,require:n=>n==='fs'?{readFileSync:()=>html}:require(n),console,setTimeout,clearTimeout,setInterval,clearInterval,Blob});const h=module.exports.createHarness();h.context.document.getElementById=id=>html.includes('id="'+id+'"')?h.element(id):null;h.element('runGap').value='30';h.element('trackMin').value='1';return h;}
const header='Name,Type,RA,DEC,Valid Reference Stars,Reference magnitude,Mag(obs),Mag(err),X Axis,Y Axis,EXP,EXP start(JD),SNR';
function row(jd,name='HD 12345',mag=10,ra=10,role='Non-reference star'){return [name,role,ra,20,15,9.8,mag,.02,100,200,'2s',jd,50].join(',');}
function file(name,body,rel=name){return {name,webkitRelativePath:rel,size:body.length,text:async()=>body};}
(async()=>{
const h=load(),{context,element}=h;const api=context.window.CollectionLab;
const jd=2461333.5,log=header+'\n'+row(jd)+'\n'+row(jd+2/86400)+'\n'+row(jd+1),frame1=header+'\n'+row(jd,'',10)+'\n'+row(jd,'',11,11,'reference star'),frame2=header+'\n'+row(jd+2/86400,'',10)+'\n'+row(jd+2/86400,'',11,11,'reference star');
await api.readCollection([file('log.csv',log,'MyWorks/PhotoMetry/log.csv'),file('Magnitude_2.0s_20260101-010000.csv',frame1,'MyWorks/Unknown_sub/Magnitude_2.0s_20260101-010000.csv'),file('Magnitude_2.0s_20260101-010002.csv',frame2,'MyWorks/Unknown_sub/Magnitude_2.0s_20260101-010002.csv')]);
assert.equal(vm.runInContext('collection.objects.length',context),2);assert.equal(vm.runInContext('collection.runs.length',context),3);
const o=vm.runInContext('collection.objects.find(o=>o.names.has("HD 12345"))',context);const merged=api.combinePieces(o.pieces);
assert.equal(merged.rows.length,3);assert.equal(merged.duplicates.length,2);assert.equal(merged.conflicts.length,0);
assert.match(element('objectEvidence').textContent,/2 \/ 3 target-source rows/);
assert.ok(o.pieces.every(p=>p.rows.every(r=>r.sourceId&&r.runId)));
const txt=api.vstarText(o,o.pieces);assert.match(txt,/original EXP start\(JD\)/);assert.equal(txt.split('\n').filter(l=>l&&!l.startsWith('#')).length,3);
context.testObject=o;vm.runInContext('markedObjects.set(testObject.id,"check <script> notes")',context);element('candidateNote').value='';element('markObject').checked=true;element('markObject').onchange();assert.match(element('markedList').innerHTML,/HD 12345/);
const original=vm.runInContext('collection',context);await api.readCollection([file('cancel.csv',log)] ,'targets');
// Replacing works; unsupported imports and cancellation preserve accepted state.
const before=vm.runInContext('collection',context);await api.readCollection([file('unknown.csv','not,a,schema')]);assert.equal(vm.runInContext('collection',context),before);
await api.readCollection([{name:'cancel.csv',text:async()=>{element('collectionCancel').onclick();return log;}}],'targets');assert.equal(vm.runInContext('collection',context),before);assert.equal(vm.runInContext('busy',context),false);
// Append a later run of the same position without discarding prior observations.
element('collectionImportMode').value='replace';await api.readCollection([file('a.csv',header+'\n'+row(jd))],'targets');
element('collectionImportMode').value='append';await api.readCollection([file('a.csv',header+'\n'+row(jd+2))],'targets');
assert.equal(vm.runInContext('collection.objects.length',context),1);assert.equal(vm.runInContext('combinePieces(collection.objects[0].pieces).rows.length',context),2);assert.equal(vm.runInContext('collection.runs.length',context),2);
element('collectionImportMode').value='replace';
// Distinct sky positions sharing a reported name remain separate objects.
await api.readCollection([file('a.csv',header+'\n'+row(jd)),file('b.csv',header+'\n'+row(jd+1,'HD 12345',10,30))],'targets');assert.equal(vm.runInContext('collection.objects.length',context),2);
// Conflicting duplicate values cannot be exported quietly.
await api.readCollection([file('a.csv',header+'\n'+row(jd)),file('b.csv',header+'\n'+row(jd,'HD 12345',11))],'targets');const conflict=vm.runInContext('collection.objects[0]',context);assert.throws(()=>api.vstarText(conflict,conflict.pieces),/conflicting duplicates/);
// A field-only directory with a long gap becomes two source runs of one provisional object.
await api.readCollection([file('Magnitude_2s_20260101-010000.csv',header+'\n'+row(jd,''),'Unknown_sub/Magnitude_2s_20260101-010000.csv'),file('Magnitude_2s_20260102-010000.csv',header+'\n'+row(jd+1,''),'Unknown_sub/Magnitude_2s_20260102-010000.csv')]);
assert.equal(vm.runInContext('collection.runs.length',context),2);assert.equal(vm.runInContext('collection.objects.length',context),1);
element('runChoice').value='RUN-1';element('runChoice').onchange();assert.equal(vm.runInContext('all.length',context),1);
element('runChoice').value='all';element('runChoice').onchange();assert.equal(vm.runInContext('all.length',context),2);
element('clear').onclick();assert.equal(vm.runInContext('all.length',context),0);assert.equal(element('exportVStar').disabled,true);assert.equal(element('objectEvidence').textContent,'');
// Bins and movement checks stay within source runs even at adjacent times.
context.testRows=[{jd,mag:10,local:0,t:0,display:0,x:0,y:0,runId:'A'},{jd:jd+1/86400,mag:12,local:1000,t:1000,display:1000,x:1000,y:1000,runId:'B'}];
assert.equal(vm.runInContext('binData(testRows,5).length',context),2);assert.equal(vm.runInContext('movements(testRows,30).events.length',context),0);
console.log('PASS: real HTML IDs, mixed import, object/run grouping, cross-route deduplication, reference roles/provenance, start-JD export, no same-name sky merge, conflicts blocked, replacement/cancel preservation, run-separated bins/movements');
// The public fictional sample remains usable through the current import path.
const demo=load(),sample=fs.readFileSync(root+'/photometry/SIM_Eclipse_Demo.csv','utf8');
await demo.context.window.CollectionLab.readCollection([file('demo.csv',sample)],'targets');
assert.equal(vm.runInContext('all.length',demo.context),1081);assert.equal(vm.runInContext('binned.length',demo.context),73);

})().catch(e=>{console.error(e);process.exitCode=1;});
