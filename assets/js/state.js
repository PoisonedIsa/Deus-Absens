import {legadoVacio, normalizarLegado} from './legacy.js';
export const STORAGE_KEY='deusAbsensState';
export function cargarEstado(reliquias){
 const defaults=reliquias.filter(i=>i.unlock===true).map(i=>i.id);
 const empty={chosen:null,selectionLocked:false,evolved:[],unlocked:defaults,unlockedSaints:[],sheets:{},encounter:[],legacy:legadoVacio()};
 try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(!saved||typeof saved!=='object')return empty;
   return {...empty,chosen:typeof saved.chosen==='string'?saved.chosen:null,selectionLocked:Boolean(saved.selectionLocked&&saved.chosen),evolved:Array.isArray(saved.evolved)?saved.evolved:[],unlocked:[...new Set([...defaults,...(Array.isArray(saved.unlocked)?saved.unlocked:[])])],unlockedSaints:Array.isArray(saved.unlockedSaints)?saved.unlockedSaints:[],sheets:saved.sheets&&typeof saved.sheets==='object'?saved.sheets:{},encounter:Array.isArray(saved.encounter)?saved.encounter:[],legacy:normalizarLegado(saved.legacy)};
 }catch(e){console.warn('No se pudo leer el estado',e);return empty}
}
export function guardarEstado(state){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true}catch(e){console.warn('Fallo de guardado',e);return false}}
