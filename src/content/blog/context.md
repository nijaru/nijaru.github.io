---
title: "Context"
pubDate: 2025-10-30T09:00:00
description: "How I maintain project context across AI conversations."
author: "Nick Russo"
tags: ["AI", "Development", "Productivity"]
---

I start most sessions with "proceed." Claude reads the project state and picks up where we left off. No catching up, no explaining where we are.

My trick is an `ai/` directory that Claude maintains between sessions.

## Why this exists

On longer projects, I was spending the start of each session re-explaining things. The current architecture. What we'd already tried. Why we chose certain approaches. Claude would suggest something we'd discussed and rejected two conversations ago - it just didn't have that context anymore.

Claude Code has `--continue` to resume a conversation, but the context window is still limited. Compaction helps manage this but it's lossy - details get summarized away. Start a new conversation, switch machines, or compact one too many times - context disappears.

So I started keeping project state in files. They live in git, survive compaction, and work across any number of conversations.

## The structure

```
ai/
├── STATUS.md      # Current state, active work
├── DESIGN.md      # System architecture, components
├── DECISIONS.md   # Choices made and why
├── ROADMAP.md     # Phases, milestones (if needed)
├── research/      # Web research, comparisons
└── design/        # Component specs
```

Each file answers a question:

**STATUS.md** - "Where are we?" Current state, what's working, what's blocked. Claude reads this first and updates it as work completes.

**DESIGN.md** - "What are we building?" System architecture, how components connect, data flow. The bird's eye view.

**DECISIONS.md** - "Why did we choose X?" Architectural decisions with context and rationale. Stops the same discussions from happening twice.

**ROADMAP.md** - "What's the plan?" Phases, milestones, dependencies. Only for multi-phase projects.

**research/** - Web research, library comparisons, API docs, benchmarks. Inputs that inform design.

**design/** - Component specs before implementation. API designs, module details. Outputs from synthesizing research.

The flow: research/ feeds into DESIGN.md, which breaks down into design/ specs, which become code.

## In practice

I say "proceed." Claude reads STATUS.md, sees we're implementing auth, the schema is done, and picks up on session management.

When a bug comes up, Claude already knows the architecture from DESIGN.md, what we're working on from STATUS.md, and why we made certain choices from DECISIONS.md. It doesn't need to explore the codebase from scratch - the relevant paths are already documented.

This might sound like it has the same staleness problem as code comments. The difference: these files document things that aren't obvious from code - design rationale, rejected approaches, how pieces fit together. Claude updates them as it works. I don't touch them.

My global `~/.claude/CLAUDE.md` includes the ai/ patterns, so Claude always knows how to maintain project context. It also has my stack preferences, commit conventions, and workflow rules. Between global and project-level config, Claude rarely needs me to explain anything twice.

## Open questions

This works well on my solo projects. Multi-contributor workflows have obvious questions - merge conflicts, coordinating updates. Haven't tested that.

Better tooling will probably replace some of this. [Beads](https://github.com/steveyegge/beads) already handles task tracking across sessions with proper persistence. Project context will likely go the same direction.

## Getting started

See [agent-contexts](https://github.com/nijaru/agent-contexts) for the full structure, templates, and user-level config examples. Start with STATUS.md and add files as you need them.

Core idea: Claude maintains context as it works, context lives in git, next session picks up where the last one left off.
