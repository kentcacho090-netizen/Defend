import "./style.css";

const attacks = [
"Your title says predictive maintenance. What exactly is being predicted, and what evidence proves the system predicts risk before failure rather than detecting an existing fault?",
"Why do you need AI instead of fixed voltage, current, waveform, or temperature thresholds?",
"What are the exact input features extracted from the waveform and thermal measurements?",
"What happens when the model encounters a fault condition that was not represented in its training data?",
"How will you prevent the model from learning your laboratory setup instead of the underlying electrical behavior?",
"What is your ground truth, and how is each training sample labeled?",
"How will you demonstrate that the model generalizes to different residential loads and conditions?",
"Explain the difference between fault detection, fault classification, and predictive maintenance in your proposed system.",
"If waveform and temperature disagree, how does your system resolve the conflict?",
"What is the consequence of a false negative in this application?",
"Which part of your predictive-maintenance claim can your prototype actually demonstrate, and which part remains a limitation?",
"Why did you select your sensing hardware and sampling rate?",
"How will noise, sensor error, and changing household loads affect the model?",
"Why are your selected fault conditions representative of residential conditions?",
"What non-AI baseline will you compare against?",
"Which evaluation metrics will you report, and why are they appropriate?",
"How large and diverse must your dataset be before you can make a defensible claim about model performance?",
"How will you communicate uncertainty when the model is confident but potentially wrong?",
"What is the strongest unsupported assumption your group has made so far?",
"If the panel removed the AI component, what useful functionality would remain?"
];

const members=[
{id:"a",name:"You",initials:"YO",color:"lime",online:true},
{id:"b",name:"Member 2",initials:"M2",color:"blue",online:true},
{id:"c",name:"Member 3",initials:"M3",color:"purple",online:true},
{id:"d",name:"Member 4",initials:"M4",color:"amber",online:false}
];

const state={
room:"DFND-7K4P",
round:7,
maxRounds:20,
currentMember:"b",
connected:3,
question:attacks[6],
transcript:[
{member:"a",round:5,answer:"We use waveform and thermal measurements as inputs to identify abnormal electrical behavior and support maintenance decisions."},
{member:"c",round:6,answer:"The model is trained using labeled examples of normal and fault conditions from our experimental setup."}
]
};

const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const getMember=id=>members.find(m=>m.id===id)||members[0];

function addAnswer(text){
state.transcript.push({member:"a",round:state.round,answer:text});
state.round++;
state.currentMember=members[(state.round+1)%members.length].id;
state.question=attacks[Math.min(state.round-1,attacks.length-1)];
render();
}

function render(){
document.querySelector("#app").innerHTML=`
<main class="room-shell">
<header class="topbar">
<div class="brand"><span class="logo">D</span><strong>DEFEND</strong><span class="live-pill">● LIVE ROOM</span></div>
<div class="room-code"><span>ROOM</span><b>${state.room}</b><button id="copyRoom">Copy</button></div>
</header>
<div class="room-grid">
<aside class="sidebar">
<div class="side-title">THESIS TEAM <span>${state.connected}/4 online</span></div>
<div class="members">
${members.map(m=>`<div class="member ${m.id===state.currentMember?"active":""}">
<div class="avatar ${m.color}">${m.initials}<i class="${m.online?"on":"off"}"></i></div>
<div><strong>${esc(m.name)}</strong><small>${m.id===state.currentMember?"ANSWERING NOW":m.online?"ONLINE":"OFFLINE"}</small></div>
</div>`).join("")}
</div>
<div class="side-card"><span class="label">ROUND</span><strong>${state.round} <small>/ ${state.maxRounds}</small></strong><div class="progress"><i style="width:${Math.min(100,state.round/state.maxRounds*100)}%"></i></div></div>
<div class="side-card threat"><span class="label">PANEL MODE</span><strong>AGGRESSIVE</strong><p>The AI may challenge any member using another member's previous answer.</p></div>
</aside>
<section class="main-room">
<div class="thesis-banner"><span class="label">LIVE DEFENSE · SHARED THESIS</span><strong>AI-IoT Predictive Maintenance for Residential Breakers via Waveform and Thermal Analysis in Dagupan.</strong></div>
<section class="panel-card">
<div class="panel-meta"><span class="ai-dot"></span><span>AI PANEL</span><em>Listening to ${esc(getMember(state.currentMember).name)}</em></div>
<h1>${esc(state.question)}</h1>
<div class="attack-note"><b>WHY THIS ATTACK</b><span>Previous answers created a possible methodology gap. The panel is testing whether the group's claim is supported by evidence.</span></div>
</section>
<section class="answer-card">
<div class="answer-head"><div><span class="label">ANSWERING</span><strong>${esc(getMember(state.currentMember).name)}</strong></div><span class="turn">YOUR TURN</span></div>
<textarea id="answer" placeholder="Everyone in the room will see your answer after you submit it..."></textarea>
<div class="actions"><button class="secondary" id="voice">🎙 Voice answer</button><button class="primary" id="submit">Submit to panel →</button></div>
</section>
<section class="feed">
<div class="feed-head"><span>LIVE DEFENSE FEED</span><small>Everyone sees submitted answers</small></div>
${state.transcript.slice().reverse().map(t=>`<article class="feed-item"><div class="feed-avatar">${getMember(t.member).initials}</div><div><div class="feed-name">${esc(getMember(t.member).name)} <small>· Round ${t.round}</small></div><p>${esc(t.answer)}</p></div></article>`).join("")}
</section>
</section>
</div>
</main>`;

document.querySelector("#submit").onclick=()=>{
const box=document.querySelector("#answer");
const text=box.value.trim();
if(!text)return box.focus();
addAnswer(text);
};
document.querySelector("#copyRoom").onclick=async()=>{
try{await navigator.clipboard.writeText(state.room);document.querySelector("#copyRoom").textContent="Copied!";setTimeout(()=>document.querySelector("#copyRoom").textContent="Copy",1200)}
catch{document.querySelector("#copyRoom").textContent=state.room}
};
document.querySelector("#voice").onclick=()=>{
const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!Recognition)return alert("Voice input is not supported by this browser.");
const r=new Recognition();
r.lang="en-US";
r.onresult=e=>document.querySelector("#answer").value=e.results[0][0].transcript;
r.start();
};
}
render();
