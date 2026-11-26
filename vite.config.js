import { defineConfig } from 'vite';
export default defineConfig({
  base:'./',worker:{format:'es'},build:{target:'es2022',chunkSizeWarningLimit:850},
  plugins:[{
    name:'preload-simulator-entry',
    transformIndexHtml:{order:'post',handler(_html,{bundle}){
      const main=Object.values(bundle??{}).find(chunk=>chunk.type==='chunk'&&chunk.isDynamicEntry&&chunk.moduleIds.some(id=>id.endsWith('/src/main.js')));
      if(main)return [{tag:'link',attrs:{rel:'modulepreload',crossorigin:'',href:'./'+main.fileName},injectTo:'head-prepend'}];
    }}
  }]
});
