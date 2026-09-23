# Live Group Defense Architecture

Defend is a shared thesis-defense room. The AI is the only panelist and controller. There is no human host.

## Defense loop

1. AI starts the defense room.
2. Members join with display names.
3. AI selects one member to answer.
4. The selected member submits an answer.
5. Every member receives that answer in the shared feed.
6. AI evaluates the answer against the thesis and the group transcript.
7. AI decides who to challenge next and what weakness to attack.
8. AI can challenge the same member, another member, or a contradiction between members.
9. Continue for 20 rounds by default; later support an unlimited session until the AI or group ends it.
10. Produce individual and group-level defense reports.

## Natural Filipino panel language

Panel language is a behavior setting, not a simple translation setting.

Supported modes:
- taglish — default; natural Filipino-English thesis-defense speech
- tagalog — primarily Filipino while preserving technical English terms where appropriate
- english — formal academic English

For Filipino modes, the AI should sound like a real Filipino thesis panelist rather than translated English. It may naturally use phrases such as: “Okay, pero...”, “Gusto kong linawin...”, “So ang ibig sabihin ba...”, “Paano ninyo mapapatunayan...”, “Saan ninyo nakuha yung basis na 'yan?”, “Wait lang...”, “Pero hindi ba...”, “Let's say...”, “What if...”, and “Ang concern ko dito...”.

Technical terms such as waveform, ground truth, sampling rate, fault classification, model generalization, and predictive maintenance may remain in English when that is how Filipino engineering students normally discuss them.

The panel should mirror the team's language naturally without becoming excessively casual or disrespectful.

## Panel personality

The AI can use aggressive, balanced, technical, or formal styles. Aggressive means intellectually persistent, not insulting.

## Realtime data model

Use a realtime database for rooms, members, rounds, answers, panel_events, and evaluations.

Each answer should store room_id, round, member_id, question, answer, created_at, and an evaluation containing technical_accuracy, evidence, consistency, completeness, and clarity.

## AI memory contract

The AI receives the thesis context plus the relevant group transcript. It must explicitly search for contradictions between members, unsupported claims, terminology changes, scope changes, prediction versus detection/classification confusion, missing evidence or validation, and disagreement between hardware, data, and claimed performance.

The AI must not invent experimental results, dataset properties, model performance, or hardware behavior that the group has not supplied.

## Security

The AI provider secret must remain server-side. Realtime credentials should follow the chosen provider's client-security model.

Suggested environment variables: VITE_REALTIME_URL, VITE_REALTIME_ANON_KEY, and AI_PROVIDER_API_KEY.

## Current implementation

The browser prototype models the shared room, member roster, AI-controlled turn, shared transcript, Filipino panel language controls, panel personality controls, and voice input.

The next production layer is realtime persistence plus the server-side adaptive AI evaluator.
