/** Additional public regressions. No network or real observation files. */
const vm=require("vm");
const assert=require("assert");
const {createHarness}=require("./harness.cjs");
const {api,context,element}=createHarness();
const plain = value => JSON.parse(JSON.stringify(value));

assert.equal(api.parseCSV('\uFEFFName,V\r"A, B","one\nline ""two"""\r')[1][1], 'one\nline "two"');
assert.throws(()=>api.parseCSV('a\n"unclosed'));
assert.throws(()=>api.decodeCSV('Name,Wrong\nA,1', 'bad.csv'));
let missing = api.decodeCSV('Name,Mag(obs),EXP start,Mag(err),SNR,Is Variable\nA,10,2026.10.19 23:59:00,/,/,false\nA,11,2026.10.20 00:00:00,,,true\nA,/,2026.10.20 00:00:01,,,true\nA,12,bad,,,false', 'missing.csv');
assert.equal(missing.invalid, 2);
assert.equal(missing.records.length, 2); // both Is Variable values are retained
assert(Number.isNaN(missing.records[0].err));
assert(Number.isNaN(missing.records[0].snr));
assert.equal(api.binData(api.timeline(missing.records), 5).length, 2);
let mjd = api.decodeCSV('Name,Mag(obs),EXP start(MJD)\nA,10,61332.9', 'mjd.csv');
assert.equal(mjd.records[0].jd, 2461333.4);
assert.equal(api.timeline(mjd.records)[0].derived, true);

// Exact boundaries belong to the following bin; SD uses N-1, not N.
const start = api.clock('2026.10.19 23:55:00');
const values = [1,2,3].map((mag,i)=>({name:'A',mag,t:start+i*1000,display:start+i*1000,snr:i===2?NaN:10+i}));
const stats = api.binData(values, 5)[0];
assert.equal(stats.median, 2);
assert.equal(stats.mean, 2);
assert.equal(stats.sd, 1);
assert.equal(stats.snr, 10.5);
assert.equal(api.binData([...values,{...values[0],t:start+300000,display:start+300000}],5).length, 2);

function sequence(mags) {
  return mags.flatMap((mag,i)=>[0,1,2,3,4].map(j=>({
    mag:mag+(j-2)*.001, err:.01,
    t:start+i*300000+j*60000, display:start+i*300000+j*60000
  })));
}
const detect = (rows, events=[])=>api.detectVariability(rows, api.binData(rows,5),5,events);
assert.equal(detect(sequence([10,10,10,10])).length, 0);
assert.equal(detect(sequence([10,10.01,10.02,10.01])).length, 0);
assert.equal(detect(sequence([10,11,10,10])).length, 0);
assert.equal(detect(sequence([10,9.9])).length, 0);
assert.equal(detect(sequence([10,9.9,9.8,9.7])).length, 1);
assert.equal(detect(sequence([10,9.9,9.8]).map(r=>({...r,err:1}))).length, 0);
let gap = sequence([10,9.9,9.8]).map(r=>r.t>=start+600000?{...r,t:r.t+300000,display:r.display+300000}:r);
assert.equal(detect(gap).length, 0);
assert(detect(sequence([10,9.9,9.8]),[{t:start+300000}])[0].movement);
const positions = [
  {name:'A',source:'test',row:2,local:start,mag:10,x:0,y:0,err:.01},
  {name:'A',source:'test',row:3,local:start+1000,mag:11,x:100,y:0,err:.01}
];
const movement = api.movements(api.timeline(positions),30);
assert.equal(movement.events.length,1);
assert(movement.events[0].artifact);

// Exercise import ownership and quality state with the actual UI functions.
vm.runInContext('globalThis.testImport=importFiles;globalThis.snapshot=()=>({raw,kept,all,view})', context);
const file = (filename, target, mag)=>({name:filename,text:async()=>`Name,Mag(obs),EXP start,SNR,Mag(err)\n${target},${mag},2026.10.19 23:59:00,50,.02`});
(async()=>{
  await context.testImport([file('a.csv','A',10)]);
  element('snr').value='1000'; element('hide').checked=true;
  vm.runInContext('update()',context);
  assert.equal(context.snapshot().kept.length,0);
  assert.equal(context.snapshot().raw.length,1);
  await context.testImport([file('b.csv','B',11)]);
  assert.equal(element('target').value,'B');
  assert.equal(element('snr').value,'');
  assert.equal(element('hide').checked,false);
  assert.equal(context.snapshot().raw.length,1);
  element('importMode').value='append';
  await context.testImport([file('a.csv','A',10)]);
  assert.equal(context.snapshot().raw.length,2);
  assert.equal(context.snapshot().all.length,1); // still selected B, not mixed
  await context.testImport([file('a.csv','A',10)]);
  assert.equal(context.snapshot().raw.length,2);
  const saved = plain(context.snapshot().raw);
  element('importMode').value='replace';
  await context.testImport([{name:'bad.csv',text:async()=>'invalid'}]);
  assert.deepEqual(plain(context.snapshot().raw),saved);
  await context.testImport([file('c.csv','C',12),file('d.csv','D',13)]);
  assert.equal(context.snapshot().raw.length,2);
  assert.equal(element('target').value,'C');
  console.log('PASS: CSV edge cases, missing values, clocks/MJD, bins/SD, screening fixtures, tracking, import/reset/append/dedup/target/filter state');
})().catch(error=>{console.error(error);process.exitCode=1;});
