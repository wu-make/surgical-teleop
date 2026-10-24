import test from 'node:test';
import assert from 'node:assert/strict';
import {StartupScreen} from '../src/startup-screen.js';

function fixture(host='127.0.0.1'){
  const elements=new Map(),timers=new Map();let id=0,replaced=null;
  const screen=new StartupScreen({document:{getElementById(id){if(!elements.has(id))elements.set(id,{hidden:false,disabled:false,textContent:'',dataset:{}});return elements.get(id);}},
    location:{hostname:host,href:`https://${host}/surgical-teleop/?gpu-profile=all#view`,replace(url){replaced=url;}},
    setTimer(fn){timers.set(++id,fn);return id;},clearTimer(id){timers.delete(id);}});
  return {screen,elements,timers,get replaced(){return replaced;}};
}
test('module failure before simulator UI exists provides working retry and keeps full error evidence',()=>{
  const f=fixture();f.screen.progress('正在打开程序…');f.screen.fail(new Error('Failed to fetch dynamically imported module: /assets/old.js'));
  assert.equal(f.screen.state,'error');assert.equal(f.timers.size,0);
  assert.equal(f.elements.get('loading-actions').hidden,false);assert.equal(f.elements.get('loading-retry').disabled,false);
  assert.match(f.elements.get('loading-error-detail').textContent,/正在打开程序.*\nFailed to fetch/);
  assert.equal(f.elements.get('loading-online').hidden,false);
  f.elements.get('loading-retry').onclick();const url=new URL(f.replaced);
  assert.equal(url.pathname,'/surgical-teleop/');assert.equal(url.searchParams.get('gpu-profile'),'all');assert(url.searchParams.has('reload'));assert.equal(url.hash,'#view');
});
test('slow preparations remain recoverable and a completed load cancels its watchdog',()=>{
  const f=fixture('wu-make.github.io');f.screen.progress('加载模型');
  const stale=[...f.timers.values()][0];f.screen.progress('准备材质');assert.equal(f.timers.size,1);
  stale();assert.equal(f.elements.get('loading-detail').textContent,'准备材质');
  [...f.timers.values()][0]();assert.match(f.elements.get('loading-detail').textContent,/准备材质.*耗时较长/);
  assert.equal(f.elements.get('loading-actions').hidden,false);assert.equal(f.elements.get('loading-online').hidden,true);
  f.screen.complete();stale();assert.equal(f.screen.state,'ready');assert.equal(f.elements.get('loading').hidden,true);assert.equal(f.timers.size,0);
});
test('default browser timers retain their Window receiver rather than being called on the screen instance',()=>{
  const f=fixture(),originalSet=globalThis.setTimeout,originalClear=globalThis.clearTimeout;let scheduled=0;
  try{
    globalThis.setTimeout=function(){assert.equal(this,globalThis);scheduled++;return 7;};
    globalThis.clearTimeout=function(){assert.equal(this,globalThis);};
    const screen=new StartupScreen({document:f.screen.document,location:f.screen.location});screen.progress('打开程序');screen.complete();assert.equal(scheduled,1);
  }finally{globalThis.setTimeout=originalSet;globalThis.clearTimeout=originalClear;}
});
test('new progress clears an earlier error and its recovery controls',()=>{
  const f=fixture();f.screen.progress('模型');f.screen.fail('network');f.screen.progress('重新准备');
  assert.equal(f.elements.get('loading-error').hidden,true);assert.equal(f.elements.get('loading-actions').hidden,true);
  assert.equal(f.elements.get('loading').dataset.state,'loading');assert.equal(f.timers.size,1);
});
