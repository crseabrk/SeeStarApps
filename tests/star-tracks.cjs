const assert=require('node:assert/strict');
const {api,context,element}=require('./harness.cjs').createHarness();
const vm=require('node:vm');
const row=(ra,dec,jd=1)=>({ra,dec,jd,name:'',mag:9,source:'s',row:2});
let s=api.newTracks();api.trackFrame(s,[row(10,20),row(11,20)],'a');
const id=s.tracks[0].id;
api.trackFrame(s,[row(10.0002,20,2),row(11.0002,20,2)],'b');
assert.equal(s.tracks.length,2);assert.equal(s.tracks[0].rows.length,2);assert.equal(s.tracks[0].id,id);
api.trackFrame(s,[row(10.0002,20,2)],'copy');assert.equal(s.skipped,1);
api.trackFrame(s,[row(10,20,3),row(10.0001,20,3)],'crowded');assert.equal(s.ambiguous,2);assert.equal(s.tracks[0].rows.length,2);
s=api.newTracks();api.trackFrame(s,[row(359.9999,0)],'a');api.trackFrame(s,[row(0.0001,0,2)],'b');assert.equal(s.tracks.length,1);
s=api.newTracks();api.trackFrame(s,[row(12,90)],'a');api.trackFrame(s,[row(250,90,2)],'b');assert.equal(s.tracks.length,1);
s=api.newTracks();api.trackFrame(s,[row(NaN,20)],'a');assert.equal(s.invalid,1);
s=api.newTracks();api.trackFrame(s,[row(10,20),row(10,20,2)],'log');assert.equal(s.skipped,1);
console.log('PASS: separate tracks, drift, fixed IDs, duplicate exposure rejection, crowded ambiguity, RA wrap, poles, invalid positions, log rejection');

vm.runInContext("fieldTracks=newTracks();trackFrame(fieldTracks,[{ra:10,dec:20,jd:2461333,mag:9,local:NaN,name:'',source:'frame.csv',row:2}], 'frame.csv');",context);
element('trackMin').value='1';element('trackMin').onchange();element('plotTrack').onclick();
assert.equal(vm.runInContext('all.length',context),1);assert.match(element('warning').textContent,/Provisional/);
element('returnLog').onclick();assert.equal(vm.runInContext('all.length',context),0);
console.log('PASS: select track, plot through existing analysis, association warning, return to original log');

// Reported names are searchable aliases; scan IDs remain distinct identities.
context.namedTracks=Array.from({length:502},(_,i)=>({
  v:api.skyVector(89.061,7.48725),id:'SCAN-test-'+i,label:'SCAN-test-'+i+' · 89.06100 +7.48725',
  names:new Set(i===501?['HD 39951']:i===500?['HD 249516']:[]),
  rows:[{ra:89.061,dec:7.48725,jd:2461333,mag:9+i/1000,local:NaN,name:i===501?'HD 39951':'',source:'synthetic.csv',row:2}]
}));
vm.runInContext('fieldTracks={tracks:namedTracks,assigned:502,ambiguous:0,invalid:0,skipped:0};',context);
for(const query of ['HD39951','hd 39951','  HD-39951  ']){
  element('trackSearch').value=query;element('trackSearch').oninput();
  assert.equal(element('trackSelect').value,'SCAN-test-501');
  assert.equal(vm.runInContext('plottedTrack.id',context),'SCAN-test-501');
  assert.match(element('target').value,/HD 39951/);
  assert.equal(element('trackSearch').value,query); // typing is not overwritten
}
element('trackSearch').value='';element('trackSearch').oninput();
element('trackSelect').value='SCAN-test-500';element('trackSelect').onchange();
assert.equal(element('trackSearch').value,'HD 249516');
assert.equal(vm.runInContext('plottedTrack.id',context),'SCAN-test-500');
let navigated=0;element('mainView').scrollIntoView=()=>navigated++;
element('plotTrack').onclick();assert.equal(navigated,1);
const sameView=vm.runInContext('view={x0:1,x1:2,y0:3,y1:4};JSON.stringify(view)',context);
element('plotTrack').onclick();assert.equal(vm.runInContext('JSON.stringify(view)',context),sameView);
element('trackSearch').value='no such star';element('trackSearch').oninput();
assert.equal(element('plotTrack').disabled,true);
assert.equal(vm.runInContext('plottedTrack.id',context),'SCAN-test-500');
assert.notEqual(vm.runInContext("trackSearchKey('-7.4')",context),vm.runInContext("trackSearchKey('+7.4')",context));
console.log('PASS: compact/spaced catalogue names, full-list search beyond 500, automatic plotting, selected-name display, view navigation/zoom preservation and no-match state');
