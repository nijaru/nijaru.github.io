---
title: "Context"
pubDate: 2025-10-30T09:00:00
description: "How agents maintain their own context across conversations."
author: "Nick Russo"
tags: ["AI", "Development", "Claude Code", "Productivity"]
---

Working with Claude on multi-week projects, I kept hitting the same problem: every new conversation started from zero.

I'd spend a session debugging something, documenting why certain approaches didn't work. Next conversation, Claude would suggest those same approaches. I'd explain the current state of the project - what's working, what's broken, what we're trying next. The following day, I'd explain it all again.

The issue isn't that Claude can't maintain context within a conversation - it's excellent at that. The issue is that context doesn't survive between conversations. Close the session, and tomorrow it's gone. For anything beyond trivial tasks, this becomes the bottleneck.

## The Solution

I added a simple directory structure to my repo:

```
ai/
├── STATUS.md       # Current state and what's next
├── DECISIONS.md    # Decisions and rationale
├── TODO.md         # Active tasks
├── RESEARCH.md     # Research overview
└── research/       # Detailed research per topic
```

The idea is straightforward: these files document context that persists across conversations. When Claude needs context, it references these files. I never touch them - Claude maintains its own context.

While building sy (a file sync tool), at the end of one session, Claude updated `ai/STATUS.md`:

```markdown
## Current State
- ✅ Core sync logic implemented
- ✅ Basic benchmarks show 2-3x faster than rsync
- Next: Large file benchmarks (1GB+ files)
```

Next session, I started a fresh conversation and said "Run large file benchmarks." Claude referenced STATUS.md, saw that basic benchmarks were done and large file testing was next, and just proceeded. No questions about what was already complete, no re-explaining project state. It ran the benchmarks and updated STATUS.md with the results.

Another session later, new conversation. Claude checked STATUS.md, knew what benchmarks were complete, and moved to the next validation step without being told. This is what the ai/ structure enables - context that survives across conversations.

STATUS.md becomes the source of truth for current state, eliminating the "where are we?" conversation that used to eat up the first 5 minutes. Claude updates it as work completes. TODO.md tracks what's in progress, what's blocked, what's next - so each conversation picks up exactly where the last one left off.

DECISIONS.md documents architectural choices with rationale. When we evaluate different approaches and choose one, the reasoning goes here. When we try something and it doesn't work, that goes here too. This prevents rehashing the same discussions across conversations.

RESEARCH.md indexes research findings, with detailed investigations in research/*.md files. Benchmark results, algorithm comparisons, performance analysis - this knowledge compounds. The structure is self-maintaining: when Claude needs to document a new research topic, it creates the appropriate file under `ai/research/`.

## How It Works

I give direction on what to build and how to approach problems. Claude implements and documents as it works. When we make a decision - technical, architectural, implementation - Claude documents it in the appropriate file. When we run benchmarks or validate approaches, those results go in RESEARCH.md.

The key is that Claude maintains this context itself. I don't have to remember to update STATUS.md or document decisions - Claude does it as part of the work. The next conversation, whether it's an hour later or a week later, has access to all of that documented context.

## Results

I use this structure across multiple projects running in parallel. Each project's ai/ directory maintains its own context independently. When I need to start a new conversation - whether because I hit context limits, switched projects, or just came back after a few days - the context is there.

Pacabot, a trading bot using DeepSeek (inspired by the Alpha Arena competition), took one day to get making trading decisions from market data. A week later it was stable with 13 data sources. Each conversation built on documented context - STATUS.md tracked what data sources were integrated, DECISIONS.md explained why we chose certain approaches, TODO.md outlined what was next.

## Adopting This

Copy this prompt and give it to Claude in your project:

```
Set up agent context structure for this project:

1. Create ai/ directory with these files:
   - STATUS.md (current state and what's next)
   - DECISIONS.md (architectural decisions and rationale)
   - TODO.md (active tasks)
   - RESEARCH.md (research overview)

2. Create CLAUDE.md in the project root with:
   ## Where Information Belongs
   - Current state → ai/STATUS.md (read FIRST)
   - Decisions + rationale → ai/DECISIONS.md
   - Active tasks → ai/TODO.md
   - Research findings → ai/RESEARCH.md and ai/research/

3. Initialize each file with appropriate structure based on current project state.

After setup, maintain these files as we work - update STATUS.md when tasks complete, document decisions in DECISIONS.md, track research in RESEARCH.md.
```

That's it. See [agent-contexts](https://github.com/nijaru/agent-contexts) for templates and examples of what these files look like in practice.

I also use a global `~/.claude/CLAUDE.md` file with universal rules that apply to all my projects (like "commit frequently" and "test before moving on"). Each repo has its own `CLAUDE.md` that references the ai/ structure, and Claude handles everything from there. You can check [my global file](https://github.com/nijaru/dotfiles/blob/main/dot_claude/CLAUDE.md) for the actual rules. (Note: Claude and some other agents support global configuration files, but the AGENTS.md spec doesn't define this yet - [I have an issue open](https://github.com/openai/agents.md/issues/91) proposing a standard. See [global-agents-config](https://github.com/nijaru/global-agents-config) for my approach.)

## Context Over Prompts

A year ago I was spending time crafting better prompts. Now I spend time on better context structure. Prompts are ephemeral, but context compounds. Each conversation builds on the last one's documented decisions and discoveries instead of starting fresh.

Claude maintains its own context as it works. I maintain direction and judgment. This split - Claude handling documentation, me handling decisions and verification - is what makes it work.
