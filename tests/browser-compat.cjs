/** Browser plumbing regressions in a simulated DOM, not a Safari rendering test. */
const assert = require('node:assert/strict');
const vm = require('node:vm');
const {createHarness} = require('./harness.cjs');
const {context, element} = createHarness();
let opened = 0;
element('files').click = () => opened++;
element('chooseFiles').onclick();
assert.equal(opened, 1);

// A pinch followed by lifting one finger must resume panning immediately.
element('chart').setPointerCapture = () => {};
element('chart').getBoundingClientRect = () => ({left:0, top:0});
vm.runInContext('plot={xr:[0,100],yr:[10,11],pw:100,ph:100,L:0,T:0};', context);
const pointer = (pointerId, clientX, clientY) => ({pointerId, clientX, clientY});
element('chart').pointerdown(pointer(1, 20, 20));
element('chart').pointerdown(pointer(2, 80, 80));
element('chart').pointermove(pointer(2, 90, 90));
// Mirror redraw geometry so pan starts from the zoomed viewport.
vm.runInContext('plot.xr=[view.x0,view.x1]; plot.yr=[view.y0,view.y1];', context);
element('chart').pointerup(pointer(2, 90, 90));
const before = JSON.parse(vm.runInContext('JSON.stringify(view)', context));
assert(Object.values(before).every(Number.isFinite));
element('chart').pointermove(pointer(1, 30, 30));
const after = JSON.parse(vm.runInContext('JSON.stringify(view)', context));
assert(Object.values(after).every(Number.isFinite));
assert(Math.abs(after.x0 - (before.x0 - 0.1*(before.x1-before.x0))) < 1e-9);
assert(Math.abs((after.x1-after.x0)-(before.x1-before.x0)) < 1e-9);
element('chart').pointercancel(pointer(1, 30, 30));
assert.equal(vm.runInContext('pointers.size', context), 0);

// Downloads retain their link and Blob URL until delayed cleanup.
let removed = false, revoked = false, clicked = false, cleanup;
const link = {click(){clicked = true;}, remove(){removed = true;}};
context.document.createElement = () => link;
context.document.body = {append(a){assert.equal(a, link);}};
context.URL = {createObjectURL(){return 'blob:test';}, revokeObjectURL(url){assert.equal(url, 'blob:test');revoked = true;}};
context.setTimeout = (fn, delay) => {assert.equal(delay, 30000);cleanup = fn;};
vm.runInContext("download(new Blob(['test']), 'test.csv')", context);
assert(clicked);
assert.equal(link.download, 'test.csv');
assert(!removed && !revoked);
cleanup();
assert(removed && revoked);
console.log('PASS: file-picker activation, pinch-to-pan transition/cancellation, delayed download cleanup');
