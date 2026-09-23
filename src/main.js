import "./style.css";

const attacks=[
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

const localized={
english:q=>q,
tagalog:q=>({[attacks[0]]:"Okay, ang title ninyo ay predictive maintenance. Ano ba talaga yung pini-predict ng system ninyo, at anong ebidensya ang magpapatunay na kaya niyang mag-predict bago mangyari yung failure, hindi yung nade-detect lang niya yung fault na nangyayari na?",[attacks[1]]:"Bakit kailangan pa ninyo ng AI kung puwede naman kayong gumamit ng fixed voltage, current, waveform, o temperature thresholds? Ano yung maibibigay ng AI na hindi kayang gawin ng simpleng threshold?",[attacks[2]]:"Ano mismo yung input features na kinukuha ninyo mula sa waveform at thermal measurements? Paano ninyo sila ine-extract?",[attacks[3]]:"Paano kapag nakakita yung model ng fault condition na wala sa training data ninyo? Ano mismo ang gagawin ng system sa ganitong situation?",[attacks[5]]:"Ano yung ground truth ninyo, at paano ninyo bina-label kung normal o faulty yung bawat sample?",[attacks[6]]:"Paano ninyo mapapatunayan na nagge-generalize yung model sa iba't ibang residential loads at conditions, at hindi lang siya gumagana sa setup na ginamit ninyo sa testing?",[attacks[7]]:"Ano ang difference ng fault detection, fault classification, at predictive maintenance sa proposed system ninyo? Gusto kong malinaw kung alin talaga ang ginagawa ng system.",[attacks[8]]:"Paano kung hindi mag-agree yung waveform at temperature readings? Alin ang paniniwalaan ng system, at ano yung basis ninyo para doon?",[attacks[12]]:"Paano maaapektuhan ng noise, sensor error, at pagbabago ng household loads yung model ninyo?",[attacks[10]]:"Alin sa predictive-maintenance claim ninyo ang kaya talagang ipakita ng prototype, at alin doon ang limitation pa ng study ninyo?"}[q]||("Okay, pero gusto kong linawin: "+q)),
taglish:q=>({[attacks[0]]:"Okay, so predictive maintenance yung title ninyo. What exactly is being predicted? And what evidence do you have na kaya niyang mag-predict before failure, instead na dine-detect lang niya yung fault na existing na?",[attacks[1]]:"Okay, bakit kailangan ng AI dito instead of using fixed voltage, current, waveform, or temperature thresholds? Ano yung advantage ng AI na wala sa simple threshold approach?",[attacks[3]]:"Let's say may fault condition na wala sa training data ninyo. What exactly happens? Paano magre-respond yung model kapag unseen yung condition?",[attacks[5]]:"What is your ground truth, and paano ninyo bina-label each training sample? Ano yung basis na normal siya or faulty?",[attacks[6]]:"How will you prove na nagge-generalize yung model sa different residential loads and conditions, hindi lang sa exact setup ninyo?",[attacks[7]]:"Can you clearly explain the difference between fault detection, fault classification, and predictive maintenance? Kasi these are not the same thing, so saan exactly pumapasok yung system ninyo?"}[q]||q)
};

const members=[
{id:"a",name:"You",initials:"YO",color:"lime",online:true},
{id:"b",name:"Member 2",initials:"M2",color:"blue",online:true},
{id:"c",name:"Member 3",initials:"M3",color:"purple",online:true},
{id:"d",name:"Member 4",initials:"M4",color:"amber",online:false}
];

const state={
screen:"home",
joined:false,
started:false,
room:"DFND-7K4P",
round:1,
maxRounds:20,
currentMember:"a",
connected:3,
language:"taglish",
personality:"aggressive",
question:attacks[0],
transcript:[],
memberName:"You",
thesis:"AI-IoT Predictive Maintenance for Residential Breakers via Waveform and Thermal Analysis in Dagupan."
};

const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const getMember=id=>members.find(m=>m.id===id)||members[0];
const localize=q=>localized[state.language]?.(q)||q;

function home(){
document.querySelector("#app").innerHTML=`
<main class="home-shell">
<section class="home-hero">
<div class="brand home-brand"><span class="logo">D</span><strong>DEFEND</strong><span class="live-pill">● AI DEFENSE SIMULATOR</span></div>
<div class="hero-copy"><span class="eyebrow">THESIS DEFENSE · AI PANELIST</span><h1>Defend your thesis.<br><span>Under pressure.</span></h1><p>A live defense simulator where the AI panelist listens to the whole group, finds weak points, challenges contradictions, and decides who answers next.</p></div>
<div class="home-actions"><button class="primary big" id="create">＋ Create defense room</button><button class="secondary big" id="join">Join an existing room</button></div>
<div class="home-features"><div><b>01</b><strong>AI-controlled</strong><span>No human host. The AI runs the defense.</span></div><div><b>02</b><strong>Group-aware</strong><span>Every submitted answer becomes part of the panel's memory.</span></div><div><b>03</b><strong>Adaptive attacks</strong><span>Contradictions and weak claims trigger follow-ups.</span></div></div>
</section>
</main>`;
document.querySelector("#create").onclick=()=>{state.screen="join";state.room="DFND-"+Math.random().toString(36).slice(2,6).toUpperCase();renderJoin(true)};
document.querySelector("#join").onclick=()=>{state.screen="join";renderJoin(false)};
}

function renderJoin(created=false){
document.querySelector("#app").innerHTML=`
<main class="join-shell"><header class="simple-header"><button class="back" id="back">← Back</button><div class="brand"><span class="logo">D</span><strong>DEFEND</strong></div></header>
<section class="join-card">
<span class="eyebrow">${created?"ROOM CREATED":"JOIN DEFENSE ROOM"}</span>
<h1>${created?"Your room is ready.":"Enter the room before the defense starts."}</h1>
<p class="muted">${created?"Share this code with your group. Everyone joins the same room before the AI begins.":"Enter the code your group shared with you."}</p>
<div class="room-input"><label>ROOM CODE</label><input id="roomInput" value="${created?state.room:""}" placeholder="DFND-7K4P" maxlength="9" autocomplete="off"></div>
<div class="room-input"><label>YOUR NAME</label><input id="nameInput" value="${state.memberName}" placeholder="e.g. Ken" maxlength="24"></div>
<div class="join-settings"><div><label>PANEL LANGUAGE</label><select id="joinLanguage"><option value="taglish">🇵🇭 Taglish</option><option value="tagalog">🇵🇭 Tagalog</option><option value="english">🇺🇸 English</option></select></div><div><label>PANEL STYLE</label><select id="joinStyle"><option value="aggressive">🔥 Aggressive</option><option value="balanced">⚖️ Balanced</option><option value="technical">🧠 Technical</option><option value="formal">🎓 Formal</option></select></div></div>
<button class="primary big full" id="enter">Join room →</button>
<p class="join-note">Joining does not start the defense. The AI can only begin after you have joined the room.</p>
</section>
</main>`;
document.querySelector("#joinLanguage").value=state.language;document.querySelector("#joinStyle").value=state.personality;
document.querySelector("#back").onclick=()=>{state.screen="home";home()};
document.querySelector("#enter").onclick=()=>{const code=document.querySelector("#roomInput").value.trim().toUpperCase();const name=document.querySelector("#nameInput").value.trim();if(!code||!name){alert("Enter a room code and your name first.");return}state.room=code;state.memberName=name;state.joined=true;state.screen="lobby";state.language=document.querySelector("#joinLanguage").value;state.personality=document.querySelector("#joinStyle").value;renderLobby()};
}

function renderLobby(){
document.querySelector("#app").innerHTML=`
<main class="room-shell"><header class="topbar"><div class="brand"><span class="logo">D</span><strong>DEFEND</strong><span class="live-pill">● ROOM LOBBY</span></div><div class="room-code"><span>ROOM</span><b>${esc(state.room)}</b><button id="copyRoom">Copy</button></div></header>
<section class="lobby-wrap"><div class="lobby-main"><span class="eyebrow">YOU'RE IN</span><h1>Waiting for the defense to start.</h1><p class="muted">Everyone joins first. Then the AI panelist takes control and selects the first member to answer.</p><div class="lobby-thesis"><span class="label">SHARED THESIS</span><strong>${esc(state.thesis)}</strong></div><div class="lobby-status"><span class="ai-dot"></span><div><strong>AI PANELIST READY</strong><small>No human host. The AI will control the questions, targets, follow-ups, and ending.</small></div></div><button class="primary big full" id="start">Start AI Defense →</button></div>
<aside class="lobby-side"><div class="side-title">JOINED MEMBERS <span>${state.connected}/4</span></div><div class="members">${members.map(m=>`<div class="member ${m.id==="a"?"active":""}"><div class="avatar ${m.color}">${m.initials}<i class="${m.online?"on":"off"}"></i></div><div><strong>${esc(m.id==="a"?state.memberName:m.name)}</strong><small>${m.id==="a"?"YOU · JOINED":m.online?"JOINED":"NOT JOINED"}</small></div></div>`).join("")}</div><div class="side-card"><span class="label">PANEL LANGUAGE</span><strong>${state.language.toUpperCase()}</strong></div><div class="side-card"><span class="label">PANEL STYLE</span><strong>${state.personality.toUpperCase()}</strong></div></aside></div></main>`;
document.querySelector("#start").onclick=()=>{state.started=true;state.screen="room";state.currentMember="a";state.round=1;state.question=attacks[0];renderRoom()};
document.querySelector("#copyRoom").onclick=async()=>{try{await navigator.clipboard.writeText(state.room);document.querySelector("#copyRoom").textContent="Copied!";setTimeout(()=>document.querySelector("#copyRoom").textContent="Copy",1200)}catch{}};
}

function addAnswer(text){
state.transcript.push({member:state.currentMember,round:state.round,answer:text});
state.round++;
const currentIndex=members.findIndex(m=>m.id===state.currentMember);
state.currentMember=members[(currentIndex+1)%members.length].id;
state.question=attacks[Math.min(state.round-1,attacks.length-1)];
renderRoom();
}

function renderRoom(){
document.querySelector("#app").innerHTML=`
<main class="room-shell"><header class="topbar"><div class="brand"><span class="logo">D</span><strong>DEFEND</strong><span class="live-pill">● LIVE DEFENSE</span></div><div class="room-code"><span>ROOM</span><b>${esc(state.room)}</b><button id="copyRoom">Copy</button></div></header>
<div class="room-grid"><aside class="sidebar"><div class="side-title">THESIS TEAM <span>${state.connected}/4 online</span></div><div class="members">${members.map(m=>`<div class="member ${m.id===state.currentMember?"active":""}"><div class="avatar ${m.color}">${m.initials}<i class="${m.online?"on":"off"}"></i></div><div><strong>${esc(m.id==="a"?state.memberName:m.name)}</strong><small>${m.id===state.currentMember?"ANSWERING NOW":m.online?"ONLINE":"OFFLINE"}</small></div></div>`).join("")}</div><div class="side-card"><span class="label">PANEL LANGUAGE</span><select id="language"><option value="taglish" ${state.language==="taglish"?"selected":""}>🇵🇭 Taglish</option><option value="tagalog" ${state.language==="tagalog"?"selected":""}>🇵🇭 Tagalog</option><option value="english" ${state.language==="english"?"selected":""}>🇺🇸 English</option></select></div><div class="side-card"><span class="label">PANEL STYLE</span><select id="personality"><option value="aggressive" ${state.personality==="aggressive"?"selected":""}>🔥 Aggressive</option><option value="balanced" ${state.personality==="balanced"?"selected":""}>⚖️ Balanced</option><option value="technical" ${state.personality==="technical"?"selected":""}>🧠 Technical</option><option value="formal" ${state.personality==="formal"?"selected":""}>🎓 Formal</option></select></div><div class="side-card"><span class="label">ROUND</span><strong>${state.round} <small>/ ${state.maxRounds}</small></strong><div class="progress"><i style="width:${Math.min(100,state.round/state.maxRounds*100)}%"></i></div></div><div class="side-card threat"><span class="label">AI PANELIST</span><strong>IN CONTROL</strong><p>No human host. The AI chooses who answers and what weakness to attack next.</p></div></aside>
<section class="main-room"><div class="thesis-banner"><span class="label">LIVE DEFENSE · SHARED THESIS</span><strong>${esc(state.thesis)}</strong></div><section class="panel-card"><div class="panel-meta"><span class="ai-dot"></span><span>AI PANELIST · ${state.language.toUpperCase()}</span><em>Question for ${esc(getMember(state.currentMember).id==="a"?state.memberName:getMember(state.currentMember).name)}</em></div><h1>${esc(localize(state.question))}</h1><div class="attack-note"><b>ADAPTIVE ATTACK</b><span>The panel considers the group's previous answers and can switch targets when it finds a contradiction, unsupported claim, or methodology gap.</span></div></section><section class="answer-card"><div class="answer-head"><div><span class="label">ANSWERING</span><strong>${esc(getMember(state.currentMember).id==="a"?state.memberName:getMember(state.currentMember).name)}</strong></div><span class="turn">YOUR TURN</span></div><textarea id="answer" placeholder="Everyone in the room will see your answer after you submit it..."></textarea><div class="actions"><button class="secondary" id="voice">🎙 Voice answer</button><button class="primary" id="submit">Submit to AI panel →</button></div></section><section class="feed"><div class="feed-head"><span>LIVE DEFENSE FEED</span><small>Shared with the entire group</small></div>${state.transcript.length?state.transcript.slice().reverse().map(t=>`<article class="feed-item"><div class="feed-avatar">${getMember(t.member).initials}</div><div><div class="feed-name">${esc(getMember(t.member).id==="a"?state.memberName:getMember(t.member).name)} <small>· Round ${t.round}</small></div><p>${esc(t.answer)}</p></div></article>`).join(""):'<div class="empty-feed">No answers yet. The defense has just started.</div>'}</section></section></div></main>`;
document.querySelector("#submit").onclick=()=>{const box=document.querySelector("#answer");const text=box.value.trim();if(!text)return box.focus();addAnswer(text)};
document.querySelector("#language").onchange=e=>{state.language=e.target.value;renderRoom()};
document.querySelector("#personality").onchange=e=>state.personality=e.target.value;
document.querySelector("#copyRoom").onclick=async()=>{try{await navigator.clipboard.writeText(state.room);document.querySelector("#copyRoom").textContent="Copied!";setTimeout(()=>document.querySelector("#copyRoom").textContent="Copy",1200)}catch{}};
document.querySelector("#voice").onclick=()=>{const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Recognition)return alert("Voice input is not supported by this browser.");const r=new Recognition();r.lang=state.language==="english"?"en-US":"fil-PH";r.onresult=e=>document.querySelector("#answer").value=e.results[0][0].transcript;r.start()};
}

function render(){if(state.screen==="home")home();else if(state.screen==="join")renderJoin(false);else if(state.screen==="lobby")renderLobby();else renderRoom()}
render();
