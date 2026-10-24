// Prueba de arranque y flujo de la app usando nodos DOM simulados.
// No sustituye una prueba de navegador visual.
import assert from 'node:assert/strict';
import fs from 'node:fs';
class FakeNode{
 constructor(id=''){this.id=id;this.value=id.endsWith('Filter')?'all':'';this.innerHTML='';this.textContent='';this.hidden=false;this.disabled=false;this.dataset={};this.style={};this.listeners={};this.children=[];this.classList={contains:()=>false,add:()=>{},remove:()=>{},toggle:()=>{}};}
 addEventListener(name,cb){this.listeners[name]=cb;}
 setAttribute(){}removeAttribute(){}replaceChildren(){this.children=[];}
 append(child){this.children.push(child);}
 focus(){}select(){}scrollIntoView(){}
 dispatchClick(){this.listeners.click?.();}
}
const nodes=new Map(), listeners={};
const node=id=>{if(!nodes.has(id))nodes.set(id,new FakeNode(id));return nodes.get(id)};
globalThis.document={getElementById:node,createElement:()=>new FakeNode(),addEventListener:(name,cb)=>{listeners[name]=cb;},querySelectorAll:()=>[]};
globalThis.window={scrollTo:()=>{}};
const store=new Map();
store.set('deusAbsensState',JSON.stringify({chosen:'san-lorenzo',selectionLocked:true,unlocked:[],unlockedSaints:[],sheets:{'san-lorenzo':{attrs:{ACERO:3,CENIZA:2,SANGRE:1,DOGMA:0},pv:13,estigma:5,charges:2,attributesConfirmed:true,inventory:[]}},encounter:[],legacy:{playerId:'id-test',campaignId:'campaign-test',ecos:{expedition:30,reserve:80},personalUpgrades:[],globalUpgrades:[],appliedCodes:['old-code'],directorHistory:[]}}));
globalThis.localStorage={getItem:key=>store.get(key)||null,setItem:(key,value)=>{store.set(key,value)}};
globalThis.fetch=async u=>({ok:true,status:200,json:async()=>JSON.parse(fs.readFileSync(new URL(u),'utf8'))});
await import('../../assets/js/app.js');
await new Promise(r=>setTimeout(r,50));
assert.equal(node('appStatus').textContent,'','No debe haber error de arranque');
assert.match(node('characterSheetPanel').innerHTML,/San Lorenzo/);
assert.match(node('characterSheetPanel').innerHTML,/2\/2 cargas/);
assert.equal(node('legacyExpEcos').textContent,'30');assert.equal(node('legacySavedEcos').textContent,'80');
const action=a=>listeners.click({target:{closest:()=>({dataset:{action:a}})}});
const confirm=()=>node('modalActions').children[0].dispatchClick();
action('charge-use');assert.match(node('modalBody').innerHTML,/10 Ecos/);
node('indulgenceRound').value='2';confirm();
assert.equal(node('legacyExpEcos').textContent,'20');assert.match(node('characterSheetPanel').innerHTML,/1\/2 cargas/);
action('legacy-close-expedition');assert.match(node('modalBody').innerHTML,/12 Ecos/);confirm();
assert.equal(node('legacySavedEcos').textContent,'92');assert.equal(node('legacyExpEcos').textContent,'0');
action('legacy-close-expedition');assert.equal(node('legacySavedEcos').textContent,'92');
action('legacy-new-expedition');confirm();
assert.match(node('legacyExpPhase').textContent,/Activa · #2/);
assert.match(node('characterSheetPanel').innerHTML,/2\/2 cargas/);
const after=JSON.parse(store.get('deusAbsensState'));
assert.equal(after.sheets['san-lorenzo'].pv,13);assert.equal(after.sheets['san-lorenzo'].estigma,5);
assert.deepEqual(after.legacy.appliedCodes,['old-code']);assert.equal(after.legacy.ecos.reserve,92);
console.log('OK: app carga catálogos, dibuja ficha, consume 10 Ecos y 1 carga, cierra una vez y restaura cargas sin borrar progreso.');
