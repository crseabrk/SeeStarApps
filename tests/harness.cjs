/**
 * Execute the actual embedded application script with a minimal simulated DOM.
 * No browser layout/pixels/dialogs are implemented. Numerical/state assertions
 * here do not replace manual browser verification.
 */
const fs = require('fs');
const vm = require('vm');
function createHarness() {
  const html = fs.readFileSync('photometry/analyzer/index.html','utf8');
  const elements = new Map();
  function element(id) {
    if (!elements.has(id)) elements.set(id, {
      value:{importMode:'replace',bin:'5',threshold:'30',theme:'starlight'}[id] || '',
      checked:['points','median','events','variability'].includes(id),
      style:{},innerHTML:'',textContent:'',
      setAttribute(name,value){this[name]=String(value);},
      querySelectorAll(){return [];},
      classList:{toggle(){},add(){},remove(){}},
      addEventListener(type,handler) { this[type] = handler; },
      getBoundingClientRect() { return {width:1000,height:480}; },
      getContext() { return new Proxy({}, {get:()=>()=>{}}); },
      parentElement:{innerHTML:''}
    });
    return elements.get(id);
  }
  const context = {
    document:{getElementById:element,documentElement:{dataset:{}}},
    window:{},ResizeObserver:class{observe(){}},
    console,devicePixelRatio:1,setTimeout,clearTimeout,setInterval,clearInterval,Blob
  };
  const script = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!script) throw Error('Expected embedded application script');
  vm.createContext(context);
  vm.runInContext(script[1],context);
  return {api:context.window.Seestar,context,element};
}
module.exports = {createHarness};
