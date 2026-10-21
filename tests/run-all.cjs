const {spawnSync}=require('node:child_process');
for(const name of ['smoke','analysis','browser-compat','session-audit','folder-access','star-tracks','gallery','catalogue','folder-memory','walkthrough']){
  const result=spawnSync(process.execPath,[`tests/${name}.cjs`],{stdio:'inherit'});
  if(result.error)throw result.error;
  if(result.status!==0)process.exit(result.status||1);
}
