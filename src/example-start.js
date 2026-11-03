// A demonstration owns a fresh case. Await the actual restore before planning
// so old cuts, specimens and pending material work cannot affect its route.
export async function startFreshExample(demo,reset,options={}){
  if(!demo.active&&!await reset())return false;
  return demo.startExampleAsync(options);
}
