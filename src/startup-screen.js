/** Keep recovery independent of the large simulator module and its workers. */
export class StartupScreen {
  constructor({document=globalThis.document,location=globalThis.location,setTimer=(fn,ms)=>globalThis.setTimeout(fn,ms),clearTimer=id=>globalThis.clearTimeout(id),slowMs=25000}={}){
    Object.assign(this,{document,location,setTimer,clearTimer,slowMs});
    this.state='idle';this.timer=null;this.stage='';this.generation=0;
  }
  element(id){return this.document.getElementById(id);}
  progress(label){
    this.clearTimer(this.timer);const generation=++this.generation;this.stage=label;this.state='loading';
    this.element('loading').hidden=false;
    this.element('loading-title').textContent='正在准备手术工作空间';
    this.element('loading-detail').textContent=label;
    this.element('loading-actions').hidden=true;
    this.element('loading-error').hidden=true;
    this.element('loading').dataset.state='loading';
    this.element('run-status').textContent='● 准备中';
    this.element('system-status').textContent='加载中';
    this.element('loading-retry').onclick=()=>this.retry();
    this.element('loading-online').hidden=!['localhost','127.0.0.1','[::1]'].includes(this.location.hostname);
    this.timer=this.setTimer(()=>{
      if(this.state!=='loading'||this.generation!==generation)return;
      this.element('loading-detail').textContent=label+' 当前步骤耗时较长，可以继续等待，或重新加载。';
      this.element('loading-actions').hidden=false;
    },this.slowMs);
  }
  fail(error){
    this.clearTimer(this.timer);this.state='error';
    this.element('loading').hidden=false;this.element('loading').dataset.state='error';
    this.element('loading-title').textContent='工作空间暂未打开';
    this.element('loading-detail').textContent='程序或模型文件未能加载。请重新加载；使用本地地址时，请确认本地服务仍在运行。';
    this.element('loading-error-detail').textContent=(this.stage?this.stage+'\n':'')+String(error?.message??error);
    this.element('loading-error').hidden=false;this.element('loading-actions').hidden=false;
    this.element('loading-retry').disabled=false;
    this.element('loading-retry').onclick=()=>this.retry();
    this.element('run-status').textContent='● 等待重试';this.element('system-status').textContent='等待重试';
  }
  complete(){
    this.clearTimer(this.timer);this.state='ready';this.element('loading').dataset.state='ready';
    this.element('loading').hidden=true;this.element('loading-actions').hidden=true;
  }
  retry(){
    // A fresh document also refreshes hashed module URLs after a deployment.
    const url=new URL(this.location.href);url.searchParams.set('reload',String(Date.now()));
    this.location.replace(url.href);
  }
}
let screen;
export function getStartupScreen(){return screen??=new StartupScreen();}
