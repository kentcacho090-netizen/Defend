# Defend — AI Thesis Defense Simulator

An adaptive AI mock thesis-defense system that challenges presenters based on their own answers.

## Planned flow

1. Load thesis/project information.
2. AI panel asks a defense question.
3. Presenter answers by text or voice.
4. AI evaluates the answer for correctness, completeness, clarity, evidence, and vulnerability.
5. The next question targets weaknesses or contradictions in the previous answer.
6. Continue for a configurable number of rounds (default: 20).
7. Generate a final defense report with category scores, weak points, and suggested topics to review.

## Core principle

Questions are adaptive. The simulator should not simply run through a fixed question list; it should use the conversation history and thesis context to create increasingly specific follow-up attacks.

## Project thesis context

The initial target project is:

**AI-IoT Predictive Maintenance for Residential Breakers via Waveform and Thermal Analysis in Dagupan**

This context should remain configurable so the application can later support other theses.
