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

console.log('PASS: CSV edge cases, missing values, clocks/MJD, bins/SD, screening fixtures and tracking overlap; current collection import/state is tested in collection.cjs');
