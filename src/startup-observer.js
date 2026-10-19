import {BrowserStalls} from './browser-stalls.js';
// Installed by the small bootstrap module before importing Three and the
// simulator, so module evaluation is also observable on the first load.
export const browserStalls=new BrowserStalls();
