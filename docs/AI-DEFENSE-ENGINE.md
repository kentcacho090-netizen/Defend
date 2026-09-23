# Adaptive AI Defense Engine

## Objective

Simulate a thesis panel that continuously probes the presenter's claims instead of asking unrelated questions.

## Per-round state

The engine should maintain:

- thesis context
- objectives and scope
- methodology
- system architecture
- evidence/results
- previous questions
- previous answers
- identified claims
- unsupported claims
- contradictions
- uncertainty
- recurring weaknesses
- current difficulty
- round number

## Attack cycle

### 1. Ask

Generate one primary panel question grounded in the thesis.

### 2. Listen

Accept the presenter's answer as text initially. Voice transcription can be added later.

### 3. Evaluate

Assess:

- technical correctness
- relevance
- completeness
- evidence/support
- consistency with the thesis
- clarity
- ability to distinguish related concepts
- vulnerability to follow-up questioning

Do not reward confident wording when the underlying claim is unsupported.

### 4. Identify an attack target

Possible targets:

- vague terminology
- unsupported claim
- missing measurement
- methodological gap
- contradiction with an earlier answer
- scope violation
- unjustified design choice
- unclear AI/ML terminology
- weak validation
- missing baseline/comparison
- hardware limitation
- data limitation
- safety/reliability concern
- mismatch between claimed prediction and actual classification/detection

### 5. Attack

Generate the next question specifically targeting the strongest unresolved weakness.

Examples:

- "You said the system predicts failure. What temporal evidence demonstrates that the detected pattern occurs before failure?"
- "Why is AI necessary here instead of a fixed threshold?"
- "How will your model handle a fault condition that was not represented in its training data?"
- "What exactly is your input feature, and how is it extracted from the waveform?"
- "What evidence would falsify your claim?"

### 6. Repeat

Continue until the configured round limit is reached.

Default: **20 rounds**.

## Difficulty

Difficulty should increase when the presenter answers correctly.

Suggested levels:

- 1–5: fundamentals and thesis understanding
- 6–10: methodology and design justification
- 11–15: edge cases, limitations, and evidence
- 16–20: contradiction checks, assumptions, and deep technical attacks

A weak answer should cause the engine to probe that weakness rather than automatically making the next question harder in an unrelated area.

## Final report

Return:

- overall readiness score
- category scores
- strongest areas
- recurring weaknesses
- unanswered questions
- contradictions detected
- claims requiring evidence
- recommended review topics
- transcript of the defense

The report should explain the score rather than simply assigning a number.
