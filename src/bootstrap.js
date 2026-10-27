import './style.css';
import {browserStalls} from './startup-observer.js';
import {getStartupScreen} from './startup-screen.js';
import {yieldPreparationTask} from './preparation-task.js';
const startupScreen=getStartupScreen();
startupScreen.progress('正在打开程序…');
document.querySelectorAll('button:not([data-startup-action]),select').forEach(control=>control.disabled=true);
await yieldPreparationTask();
const start=performance.now();
try{await import('./main.js');}
catch(error){startupScreen.fail(error);console.error(error);}
finally{browserStalls.span('application-module-import-wall',start,performance.now());}
