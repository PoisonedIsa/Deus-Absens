// Reglas de Ecos confirmadas para v8.0. Módulo puro, sin red ni automatización de enemigos.
export const MAX_ECOS=100000000;
const safe=n=>Number.isSafeInteger(n)&&n>=0&&n<=MAX_ECOS;
export function recompensaPersonal(base,esLorenzo=false){
 if(!safe(base))throw Error('La recompensa base debe ser un entero no negativo aprobado por el director.');
 return esLorenzo?Math.floor(base*1.25):base;
}
export function ecosConservados(disponibles){
 if(!safe(disponibles))throw Error('Saldo de Ecos inválido.');
 return Math.floor(disponibles*0.60);
}
export function bonusDañoLorenzo(saldo){
 if(!safe(saldo))throw Error('Saldo de Ecos inválido.');
 return Math.min(4,Math.floor(saldo/25));
}
export function gastarIndulgencia(legado,charges){
 if(legado?.expedition?.phase==='closed')throw Error('La expedición está cerrada.');
 if(!Number.isInteger(charges)||charges<1)throw Error('Lorenzo no tiene cargas disponibles.');
 const ecos=legado?.ecos?.expedition;
 if(!safe(ecos)||ecos<10)throw Error('Faltan 10 Ecos sin gastar de esta expedición.');
 legado.ecos.expedition-=10;
 legado.expedition.spent+=10;
 legado.expedition.transactions=[...(legado.expedition.transactions||[]),{type:'indulgencia',amount:-10}].slice(-50);
 return charges-1;
}
export function aplicarEcosExpedicion(legado,cantidad){
 if(legado?.expedition?.phase==='closed')throw Error('La expedición está cerrada; inicia otra antes de acreditar Ecos.');
 if(!safe(cantidad)||!safe(legado?.ecos?.expedition)||legado.ecos.expedition+cantidad>MAX_ECOS)
  throw Error('La cantidad supera el límite de Ecos.');
 legado.ecos.expedition+=cantidad;
 legado.expedition.earned+=cantidad;
 legado.expedition.transactions=[...(legado.expedition.transactions||[]),{type:'recompensa',amount:cantidad}].slice(-50);
}
export function cerrarExpedicion(legado){
 if(legado?.expedition?.phase!=='active')throw Error('Esta expedición ya se cerró.');
 const restantes=legado.ecos.expedition,conservados=ecosConservados(restantes);
 if(!safe(legado.ecos.reserve)||legado.ecos.reserve+conservados>MAX_ECOS)throw Error('La reserva superaría el límite.');
 legado.ecos.reserve+=conservados;
 legado.ecos.expedition=0;
 legado.expedition.phase='closed';
 legado.expedition.lastClose={runIndex:legado.expedition.runIndex,earnings:legado.expedition.earned,spent:legado.expedition.spent,remaining:restantes,saved:conservados};
 legado.expedition.history=[...(legado.expedition.history||[]),legado.expedition.lastClose].slice(-20);
 return conservados;
}
export function iniciarExpedicion(legado){
 if(legado?.expedition?.phase!=='closed')throw Error('Cierra la expedición anterior antes de iniciar otra.');
 legado.expedition={phase:'active',runIndex:legado.expedition.runIndex+1,earned:0,spent:0,history:[...(legado.expedition.history||[])].slice(-20),transactions:[],lastClose:legado.expedition.lastClose||null,lastLorenzoRound:null};
 // Los PV, Estigma, inventario y contador de Hambre NO se modifican aquí.
}
