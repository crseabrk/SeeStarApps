/** Public baseline regressions against the actual application functions. */
const assert = require('assert');
const {createHarness} = require('./harness.cjs');
const {api} = createHarness();
const csv = api.syntheticEclipseCSV();
const decoded = api.decodeCSV(csv,'synthetic.csv');
const rows = api.timeline(decoded.records);
const bins = api.binData(rows,5);

assert.equal(csv,api.syntheticEclipseCSV());
assert.equal(decoded.invalid,0);
assert.equal(rows.length,1081);
assert.equal(api.stamp(rows[0].display),'2026-10-19 21:00:00');
assert.equal(api.stamp(rows.at(-1).display),'2026-10-20 03:00:00');
assert.equal(api.movements(rows,30).events.length,0);
assert(api.detectVariability(rows,bins,5).some(event=>event.change>.4));
assert(api.detectVariability(rows,bins,5).some(event=>event.change<-.4));
assert.equal(api.parseCSV('\ufeffName,Value\r\n"A, B","quoted ""value"""')[1][1],'quoted "value"');
assert(Number.isNaN(api.clock('2026.02.30 12:00:00')));
assert(Number.isNaN(api.binData(rows.slice(0,1),5)[0].sd));
console.log('PASS: synthetic CSV, schema, midnight timeline, binning, variability, tracking, quoted CSV, invalid date, singleton SD');
