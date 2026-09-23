import "./style.css";

const state = {
  round: 1,
  maxRounds: 20,
  answers: [],
  current: "Your system is called predictive maintenance. What exactly is being predicted, and what evidence in your methodology distinguishes prediction from simply detecting an existing fault?",
  thesis: "AI-IoT Predictive Maintenance for Residential Breakers via Waveform and Thermal Analysis in Dagupan."
};

const attacks = [
  "You used the word “predictive.” What temporal evidence proves the abnormal condition appears before failure rather than at the moment of failure?",
  "Why is an AI model necessary instead of using fixed voltage, current, or temperature thresholds?",
  "What are your actual input features, and exactly how are they extracted from the waveform and thermal measurements?",
  "If a fault condition is absent from the training data, what does your system do?",
  "How will you prevent the model from learning the specific test setup instead of the underlying fault behavior?",
  "What is your ground truth, and who or what determines whether a sample is actually faulty?",
  "How will you validate that your model generalizes beyond the data used during training?",
  "What is the difference between fault detection, fault classification, and predictive maintenance in your system?",
  "If waveform and temperature disagree, which signal does the system trust and why?",
  "What is the consequence of a false negative in a residential breaker monitoring system?",
  "What limitations in your prototype prevent you from claiming that it predicts actual breaker failure?",
  "Why did you choose your sensing hardware and sampling approach?",
  "How will noise, sensor error, and changing household loads affect your model?",
  "What makes your selected fault conditions representative of real residential conditions?",
  "What baseline method will you compare the AI model against?",
  "What metric matters most for your application: accuracy, precision, recall, F1-score, or something else?",
  "How do you know your dataset is large and diverse enough for the model?",
  "If your model gives a confident but incorrect prediction, how will the system communicate that uncertainty?",
  "Which part of your claim is the hardest to prove experimentally?",
  "If the panel removed the AI component, what useful functionality would remain?"
];

function nextQuestion(answer) {
  state.answers.push({ round: state.round, question: state.current, answer });
  if (state.round >= state.maxRounds) {
    showResults();
    return;
  }
  const index = Math.min(state.round, attacks.length - 1);
  state.round++;
  state.current = attacks[index];
  render();
}

function scoreAnswer(text) {
  const words = text.trim().split(/\\s+/).filter(Boolean).length;
  const detail = Math.min(100, 35 + words * 2);
  return Math.round(detail);
}

function showResults() {
  const scores = state.answers.map(x => scoreAnswer(x.answer));
  const overall = Math.round(scores.reduce((a,b)=>a+b,0) / scores.length);
  document.querySelector("#app").innerHTML = `
    <main class="shell">
      <section class="hero">
        <span class="eyebrow">DEFENSE COMPLETE</span>
        <h1>${overall}<small>/100</small></h1>
        <p>Prototype readiness score based on answer depth. The full AI evaluator will replace this heuristic.</p>
      </section>
      <section class="card">
        <h2>Defense transcript</h2>
        ${state.answers.map(x => `<article class="transcript"><b>Round ${x.round}</b><p class="q">${x.question}</p><p>${x.answer || "<em>No answer</em>"}</p></article>`).join("")}
      </section>
      <button class="primary" onclick="location.reload()">Start another defense</button>
    </main>`;
}

function render() {
  document.querySelector("#app").innerHTML = `
    <main class="shell">
      <header class="topbar">
        <div class="brand"><span class="logo">D</span><strong>DEFEND</strong></div>
        <span class="round">ROUND ${state.round} / ${state.maxRounds}</span>
      </header>
      <section class="hero">
        <span class="eyebrow">AI THESIS DEFENSE SIMULATOR</span>
        <h1>Don't just answer.<br><em>Defend it.</em></h1>
        <p>The panel follows your answer, finds weak points, and keeps pressing until your reasoning holds.</p>
      </section>
      <section class="card thesis">
        <div class="label">CURRENT THESIS</div>
        <strong>${state.thesis}</strong>
      </section>
      <section class="panel">
        <div class="panel-head"><span class="status"></span> PANELIST</div>
        <h2>${state.current}</h2>
      </section>
      <section class="answer card">
        <div class="label">YOUR ANSWER</div>
        <textarea id="answer" placeholder="Answer like you're in front of your panel..."></textarea>
        <div class="actions">
          <button class="secondary" id="voice">🎙 Voice</button>
          <button class="primary" id="submit">Submit answer →</button>
        </div>
      </section>
      <p class="hint">The next attack will be based on your response. Don't give a memorized answer — defend your reasoning.</p>
    </main>`;
  document.querySelector("#submit").onclick = () => {
    const answer = document.querySelector("#answer").value.trim();
    if (!answer) return document.querySelector("#answer").focus();
    nextQuestion(answer);
  };
  document.querySelector("#voice").onclick = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice input is not supported by this browser yet.");
      return;
    }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.onresult = e => document.querySelector("#answer").value = e.results[0][0].transcript;
    recognition.start();
  };
}
render();
