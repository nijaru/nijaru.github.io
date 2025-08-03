---
title: "Welcome"
pubDate: 2025-03-01T12:00:00
description: "Rebuilding my personal website with Solid.js and Astro, featuring a custom space theme."
author: "Nick Russo"
tags: ["Solid.js", "Astro", "Web Dev", "Personal Site"]
---

I rebuilt my website. 

The old Hugo site served its purpose, but I wanted to learn Solid.js and Astro. So I did what any developer does - used it as an excuse for a complete rewrite.

## The Stack

- **Astro** - Static generation with component islands
- **Solid.js** - Reactive UI where needed
- **Tailwind CSS** - Utility-first styling
- **Space theme** - Because why not

The result is fast. Really fast. Astro's partial hydration means most of the site ships as static HTML. Solid.js only kicks in for interactive components like the twinkling stars and GitHub repo cards.

## Design Choices

I went with a space theme - deep backgrounds, subtle animations, strategic use of color. The goal was professional but distinctive. Something that feels modern without being trendy.

The twinkling stars took more work than I'd like to admit. Getting the performance right meant:
- Pre-calculating positions
- Using CSS animations instead of JavaScript
- Respecting `prefers-reduced-motion`
- Pausing when the tab loses focus

Small details, but they matter.

## Current Focus

These days I'm exploring:
- High-performance systems in Rust and Mojo
- Local LLM deployment with Ollama
- AI integration patterns that actually work
- Tools that improve developer workflows

I believe in building things. Not just talking about them, but shipping working code that solves real problems.

## What's Next

This blog will cover:
- Technical deep dives
- Project updates
- Thoughts on emerging tech
- Occasional rants about software

If you want to connect: [GitHub](https://github.com/nijaru), [X](https://x.com/nijaru), [Bluesky](https://bsky.app/profile/nijaru.bsky.social).

Welcome to the new site. Let's build something interesting.