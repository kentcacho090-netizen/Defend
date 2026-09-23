# Live Group Defense Architecture

Defend is a shared thesis-defense room. The important unit is no longer a single answer; it is the **group transcript**.

## Defense loop

1. Host creates a room and shares the room code.
2. Members join with a display name.
3. The AI panel selects one member to answer.
4. The selected member submits an answer.
5. Every member receives the answer in the shared feed.
6. The AI evaluates the answer against the thesis and previous group answers.
7. The next attack can target:
   - the same member's weakness
   - another member's earlier claim
   - a contradiction between members
   - an unsupported methodology claim
   - a prediction/detection/classification mismatch
8. Continue for 20 rounds by default, with an optional unlimited mode later.
9. Produce individual and group-level defense reports.

## Realtime data model

Use a realtime database for these entities:

- rooms
- members
- rounds
- answers
- panel_events
- evaluations

Example answer:

```json
{
  "room_id": "DFND-7K4P",
  "round": 7,
  "member_id": "member-b",
  "question": "How will you demonstrate that the model generalizes?",
  "answer": "Our validation uses...",
  "created_at": "2026-09-23T00:00:00Z",
  "evaluation": {
    "technical_accuracy": 0,
    "evidence": 0,
    "consistency": 0,
    "completeness": 0,
    "clarity": 0
  }
}
```

## AI memory contract

The AI should receive the thesis context plus the relevant group transcript. It should explicitly search for contradictions and unsupported claims before generating the next attack.

The AI must **not invent experimental results, dataset properties, model performance, or hardware behavior** that the group has not supplied.

## Security

Realtime public/client credentials may be used in the browser only when the provider explicitly supports that model. The AI provider secret must remain server-side.

Suggested environment variables:

```
VITE_REALTIME_URL=
VITE_REALTIME_ANON_KEY=
AI_PROVIDER_API_KEY=
```

## Current implementation

The browser prototype already models the room UX and shared transcript. The next production layer is realtime persistence and the server-side adaptive AI evaluator.
