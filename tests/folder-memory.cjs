const assert=require('node:assert/strict');
const {api,context,element}=require('./harness.cjs').createHarness();
const saved=new Map();let permissionRequests=0,pickerCalls=0;
function fakeDB(){return {close(){},objectStoreNames:{contains:()=>true},transaction(name,mode){
 const tx={objectStore:()=>({get:k=>run(()=>saved.get(k)),put:(v,k)=>run(()=>saved.set(k,v)),clear:()=>run(()=>saved.clear())})};
 function run(fn){const req={};setTimeout(()=>{try{req.result=fn();req.onsuccess?.();tx.oncomplete?.();}catch(e){tx.error=e;tx.onerror?.();}},0);return req;}
 return tx;
}};}
context.window.indexedDB={open(){const req={};setTimeout(()=>{req.result=fakeDB();req.onsuccess();},0);return req;}};
const handle={kind:'directory',name:'observations',requestPermission:async options=>{permissionRequests++;assert.equal(options.mode,'read');return 'granted';},values(){throw Error('must not read while restoring preferences');}};
context.window.showDirectoryPicker=async options=>{pickerCalls++;assert.equal(options.mode,'read');assert.equal(options.id,'seestar-session');return handle;};
(async()=>{
 await api.rememberFolder('session',handle);assert.equal(saved.get('session'),handle);
 await api.loadRememberedFolders();assert.equal(permissionRequests,0);assert.equal(element('reopenSession').disabled,false);assert.match(element('reopenSession').textContent,/observations/);
 assert.equal(await api.selectedFolder(handle,'seestar-session'),handle);assert.equal(permissionRequests,1);assert.equal(pickerCalls,0);
 assert.equal(await api.selectedFolder(null,'seestar-session'),handle);assert.equal(pickerCalls,1);
 await assert.rejects(api.selectedFolder({...handle,requestPermission:async()=> 'denied'},'seestar-session'),/not granted/);
 await api.forgetRememberedFolders();assert.equal(saved.size,0);assert.equal(element('reopenSession').disabled,true);
 context.window.indexedDB={open(){throw Error('storage blocked');}};
 await api.rememberFolder('session',handle);assert.match(element('folderMemoryStatus').textContent,/could not be remembered/);
 console.log('PASS: saved/restored handles, no startup file reads/permission requests, explicit read-only reopening, separate picker ID, denied access, forgetting and unavailable storage');
})().catch(e=>{console.error(e);process.exitCode=1;});
