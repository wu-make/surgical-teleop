/** Preserve a short keyboard press that starts and ends between two frames. */
export class ControlTaps {
  constructor(){this.pressed=new Map();this.pending=new Set();}
  begin(code,frame){if(!this.pressed.has(code))this.pressed.set(code,frame);}
  end(code,frame){if(this.pressed.get(code)===frame)this.pending.add(code);this.pressed.delete(code);}
  take(){const pending=this.pending;if(pending.size)this.pending=new Set();return pending;}
  clear(){this.pressed.clear();this.pending.clear();}
}
