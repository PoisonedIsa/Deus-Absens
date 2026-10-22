// Legado v6.5: códigos portables sin servidor ni autenticación criptográfica.
// Los valores económicos y los efectos de mejoras permanecen sin definir.
export const LEGACY_VERSION = 1;
const CODE_PREFIX = 'DA65';
const MAX_CODE_LENGTH = 40000;
const number = n => Number.isSafeInteger(n) && n >= 0 && n <= 100000000 ? n : 0;
const unique = value => [...new Set(Array.isArray(value) ? value.filter(v=>typeof v==='string'&&v.length<=120) : [])];
const text = value => typeof value==='string'?value.slice(0,120):'';
export function nuevoId(prefix='reg') {
 const digits = typeof crypto!=='undefined' && crypto.getRandomValues ? Array.from(crypto.getRandomValues(new Uint32Array(3)), x=>x.toString(36)).join('') : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
 return `${prefix}-${digits}`;
}
export function legadoVacio(){
 return {version:LEGACY_VERSION,playerId:'',campaignId:'',ecos:{expedition:0,reserve:0},personalUpgrades:[],globalUpgrades:[],appliedCodes:[],directorHistory:[]};
}
export function normalizarLegado(value){
 const l=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 return {version:LEGACY_VERSION,playerId:text(l.playerId),campaignId:text(l.campaignId),
  ecos:{expedition:number(l.ecos?.expedition),reserve:number(l.ecos?.reserve)},
  personalUpgrades:unique(l.personalUpgrades),globalUpgrades:unique(l.globalUpgrades),
  appliedCodes:unique(l.appliedCodes).slice(-1000),directorHistory:Array.isArray(l.directorHistory)?l.directorHistory.filter(i=>typeof i==='object'&&i!==null).slice(-40):[]};
}
export function checksum(str){let h=2166136261;for(let i=0;i<str.length;i++){h=Math.imul(h^str.charCodeAt(i),16777619)>>>0;}return h.toString(16).padStart(8,'0');}
function base64Url(value){let bin='';const u8=new TextEncoder().encode(value);for(const b of u8)bin+=String.fromCharCode(b);return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function unbase64Url(value){const bin=atob(value.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-value.length%4)%4));return new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(bin,c=>c.charCodeAt(0)));}
export function crearCodigo(type,payload){
 if(!['PLAYER_REPORT','DIRECTOR_GRANT'].includes(type))throw Error('Tipo de código no admitido.');
 const raw=JSON.stringify({version:LEGACY_VERSION,type,payload});
 const code=`${CODE_PREFIX}.${base64Url(raw)}.${checksum(raw)}`;
 if(code.length>MAX_CODE_LENGTH)throw Error('El código supera el tamaño permitido.');
 return code;
}
const positiveInt = v => Number.isSafeInteger(v)&&v>=0&&v<=100000000;
export function leerCodigo(input){
 const code=String(input||'').trim();
 if(code.length>MAX_CODE_LENGTH)throw Error('Código demasiado largo.');
 if(!/^DA65\.[A-Za-z0-9_-]+\.[0-9a-f]{8}$/.test(code))throw Error('Formato del código incorrecto.');
 const [prefix,encoded,digest]=code.split('.');
 let raw,obj;
 try{raw=unbase64Url(encoded);obj=JSON.parse(raw);}catch{throw Error('No se pudo interpretar el código.');}
 if(checksum(raw)!==digest)throw Error('El código está alterado o fue copiado de forma incompleta.');
 if(obj?.version!==LEGACY_VERSION || !['PLAYER_REPORT','DIRECTOR_GRANT'].includes(obj.type) || !obj.payload || typeof obj.payload!=='object')throw Error('Versión o estructura de código no admitida.');
 const p=obj.payload;
 if(obj.type==='PLAYER_REPORT'){
  if(!text(p.playerId)||!text(p.saintId)||!p.sheet||typeof p.sheet!=='object')throw Error('Faltan datos de la ficha del jugador.');
  if(!p.attrs || !['ACERO','CENIZA','SANGRE','DOGMA'].every(k=>Number.isInteger(p.attrs[k])&&p.attrs[k]>=0&&p.attrs[k]<=3))throw Error('Atributos inválidos.');
  if(JSON.stringify(Object.values(p.attrs).sort((a,b)=>b-a))!=='[3,2,1,0]')throw Error('La distribución de atributos no es válida.');
  if(!positiveInt(p.ecos?.expedition)||!positiveInt(p.ecos?.reserve))throw Error('Los Ecos del informe no son válidos.');
  if(!Number.isInteger(p.sheet.pv)||p.sheet.pv<0||!Number.isInteger(p.sheet.estigma)||p.sheet.estigma<0)throw Error('PV o Estigma inválidos.');
 } else {
  if(!text(p.id)||!text(p.campaignId)||!text(p.toPlayer)||!positiveInt(p.ecosExpedition))throw Error('El código de recompensa está incompleto.');
  if(!p.global||!Array.isArray(p.global.saints)||!Array.isArray(p.global.relics)||!Array.isArray(p.global.upgrades)||!Array.isArray(p.personalUpgrades))throw Error('Desbloqueos de recompensa inválidos.');
 }
 return obj;
}
export function construirInforme(state,character){
 if(!character||!state.selectionLocked)throw Error('Primero debes sellar una ficha de personaje.');
 const legacy=normalizarLegado(state.legacy),s=state.sheets?.[character.id];
 if(!s)throw Error('Falta la hoja del personaje.');
 const attrs={...s.attrs};
 return {playerId:legacy.playerId,campaignId:legacy.campaignId,saintId:character.id,saintName:character.name,attrs,
   sheet:{pv:Number(s.pv)||0,estigma:Number(s.estigma)||0,charges:Number(s.charges)||0,
     attributesConfirmed:Boolean(s.attributesConfirmed),inventory:Array.isArray(s.inventory)?s.inventory.slice(0,250):[]},
   ecos:{...legacy.ecos},personalUpgrades:[...legacy.personalUpgrades],globalUpgrades:[...legacy.globalUpgrades],appliedCodes:[...legacy.appliedCodes],
   global:{saints:[...state.unlockedSaints],relics:[...state.unlocked]}};
}
export function validarRecompensa(payload,state,characters,items,improvements){
 const legacy=normalizarLegado(state.legacy);
 if(!legacy.playerId)throw Error('No hay identidad de jugador local.');
 if(payload.toPlayer!==legacy.playerId)throw Error('Esta recompensa pertenece a otra ficha de jugador.');
 if(legacy.campaignId && legacy.campaignId!==payload.campaignId)throw Error('El código es de otra campaña.');
 if(legacy.appliedCodes.includes(payload.id))throw Error('Esta recompensa ya fue aplicada.');
 const allChars=new Set(characters.filter(c=>c.secret).map(c=>c.id));
 const allItems=new Set(items.map(i=>i.id));
 const personal=new Set(improvements.filter(i=>i.scope==='personal').map(i=>i.id));
 const global=new Set(improvements.filter(i=>i.scope==='global').map(i=>i.id));
 const ids=[['Santo',payload.global.saints,allChars],['reliquia',payload.global.relics,allItems],['mejora personal',payload.personalUpgrades,personal],['mejora global',payload.global.upgrades,global]];
 for(const [name,arr,set] of ids){if(arr.length>400||arr.some(id=>!set.has(id)))throw Error(`Hay un ID desconocido de ${name} en el código.`);}
 if(legacy.ecos.expedition+payload.ecosExpedition>100000000)throw Error('La cantidad de Ecos sobrepasa el límite del prototipo.');
 return true;
}
export function aplicarRecompensa(payload,state,characters,items,improvements){
 validarRecompensa(payload,state,characters,items,improvements);
 const legacy=normalizarLegado(state.legacy);
 legacy.campaignId=payload.campaignId;
 legacy.ecos.expedition+=payload.ecosExpedition;
 legacy.personalUpgrades=unique([...legacy.personalUpgrades,...payload.personalUpgrades]);
 legacy.globalUpgrades=unique([...legacy.globalUpgrades,...payload.global.upgrades]);
 legacy.appliedCodes=[...legacy.appliedCodes,payload.id].slice(-1000);
 state.unlockedSaints=unique([...state.unlockedSaints,...payload.global.saints]);
 state.unlocked=unique([...state.unlocked,...payload.global.relics]);
 state.legacy=legacy;
}
export function validarInforme(p,characters,items,improvements){
 if(!characters.some(c=>c.id===p.saintId))throw Error('Este Santo no existe en el catálogo instalado.');
 if(!Array.isArray(p.sheet.inventory)||p.sheet.inventory.length>250)throw Error('Inventario de código inválido.');
 for(const entry of p.sheet.inventory){if(!entry||typeof entry!=='object'||!['manual','equipment','relic'].includes(entry.kind)||String(entry.uid||'').length>120)throw Error('Una entrada del inventario es inválida.');}
 const allowedItem=new Set(items.map(i=>i.id));
 if(!Array.isArray(p.global?.saints)||!Array.isArray(p.global?.relics)||!Array.isArray(p.personalUpgrades)||!Array.isArray(p.globalUpgrades)||!Array.isArray(p.appliedCodes||[]))throw Error('Listas de progreso inválidas.');
 const secret=new Set(characters.filter(c=>c.secret).map(c=>c.id));
 const improvementIds=new Set(improvements.map(i=>i.id));
 if(p.global.saints.some(id=>!secret.has(id))||p.global.relics.some(id=>!allowedItem.has(id))||p.personalUpgrades.some(id=>!improvementIds.has(id))||p.globalUpgrades.some(id=>!improvementIds.has(id)))throw Error('El informe incluye registros no presentes en el catálogo.');
 return true;
}
export function restaurarInforme(p,state,characters,items,improvements){
 validarInforme(p,characters,items,improvements);
 const l=normalizarLegado(state.legacy);
 // Reemplazo explícito, sin mezclar silenciosamente reservas personales de otra ficha.
 l.playerId=p.playerId;l.campaignId=text(p.campaignId);l.ecos={expedition:p.ecos.expedition,reserve:p.ecos.reserve};
 l.personalUpgrades=unique(p.personalUpgrades);l.globalUpgrades=unique(p.globalUpgrades);l.appliedCodes=unique(p.appliedCodes).slice(-1000);
 state.legacy=l;
 state.chosen=p.saintId;state.selectionLocked=true;
 const old=state.sheets?.[p.saintId]||{};
 state.sheets={...state.sheets,[p.saintId]:{...old,attrs:{...p.attrs},pv:p.sheet.pv,estigma:p.sheet.estigma,charges:p.sheet.charges,attributesConfirmed:true,inventory:p.sheet.inventory}};
 state.unlockedSaints=unique([...state.unlockedSaints,...p.global.saints]);
 state.unlocked=unique([...state.unlocked,...p.global.relics]);
}
