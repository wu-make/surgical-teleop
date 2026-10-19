import './style.css';
import {browserStalls} from './startup-observer.js';
await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
const start=performance.now();
try{await import('./main.js');}
catch(error){document.getElementById('loading-detail').textContent='加载未完成：'+error.message;console.error(error);}
finally{browserStalls.span('application-module-import-wall',start,performance.now());}
