import { createClient } from "@supabase/supabase-js";

const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const realtimeConfigured=Boolean(url&&key);
export const clientId=localStorage.getItem("defend_client_id")||crypto.randomUUID();
localStorage.setItem("defend_client_id",clientId);

const supabase=realtimeConfigured?createClient(url,key):null;
let channel=null;

export async function connectRoom(roomCode,{name,role,onPresence,onEvent}){
 if(!realtimeConfigured)return {ok:false,reason:"missing_env"};
 if(channel)await supabase.removeChannel(channel);
 channel=supabase.channel("defend:"+roomCode,{
   config:{broadcast:{ack:true},presence:{key:clientId}}
 });
 channel.on("presence",{event:"sync"},()=>{
   const raw=channel.presenceState();
   const people=Object.entries(raw).flatMap(([id,metas])=>metas.map(meta=>({...meta,id})));
   onPresence?.(people);
 }).on("broadcast",{event:"defend_event"},payload=>{
   onEvent?.(payload.payload);
 });
 return await new Promise(resolve=>{
   channel.subscribe(async status=>{
     if(status==="SUBSCRIBED"){
       await channel.track({id:clientId,name,role,joinedAt:new Date().toISOString()});
       resolve({ok:true});
     }else if(status==="CHANNEL_ERROR"||status==="TIMED_OUT"){
       resolve({ok:false,reason:status});
     }
   });
 });
}

export async function sendEvent(event,payload){
 if(!channel)return false;
 const result=await channel.send({type:"broadcast",event:"defend_event",payload:{event,...payload}});
 return result==="ok";
}

export async function disconnectRoom(){
 if(channel){await supabase.removeChannel(channel);channel=null;}
}
