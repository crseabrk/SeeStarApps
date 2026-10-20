/** Optional reference-data regression. Inputs stay local and are never copied. */
const fs = require('fs');
const assert = require('assert');
const {createHarness} = require('./harness.cjs');
if (process.argv.length !== 4) {
  console.error('Usage: node tests/real-data.cjs <RT-And.csv> <SS-And.csv>');
  process.exit(2);
}
const {api} = createHarness();
for (let index=0;index<2;index++) {
  const result = api.decodeCSV(fs.readFileSync(process.argv[index+2],'utf8'),'local-reference.csv');
  const rows = api.timeline(result.records);
  assert.equal(result.invalid,0);
  assert.equal(rows.length,index===0?1243:7);
  assert(rows.every(row=>row.name===(index===0?'RT And':'SS And')));
  assert(rows.every(row=>row.exp===(index===0?2:60)));
  if(index===0) {
    const bins=api.binData(rows,5);
    const a=bins.find(bin=>api.stamp(bin.start)==='2026-10-19 23:45:00');
    const b=bins.find(bin=>api.stamp(bin.start)==='2026-10-20 00:20:00');
    assert.equal(a.n,40); assert(Math.abs(a.median-8.7609725)<1e-7);
    assert.equal(b.n,46); assert(Math.abs(b.median-8.3304125)<1e-7);
  }
}
console.log('PASS: local RT And and SS And reference counts, exposures, target identity, and RT bin medians');
