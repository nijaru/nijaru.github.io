---
title: "Rebuilding My Personal Site with Claude Code, Solid.js, and Astro"
pubDate: 2024-03-01T12:00:00
description: "My experience using Claude Code to rebuild my personal website with Solid.js and Astro featuring a space theme."
author: "Nick Russo"
tags: ["Claude Code", "AI", "Solid.js", "Astro", "Web Dev", "Frontend"]
image:
  url: "https://nijaru.github.io/images/space-theme.png"
  alt: "Space themed website design"
---

I've been wanting to rewrite my website and start learning a new frontend framework, and with the recent release of Claude Code, I thought it'd be the perfect opportunity. The result is a complete rebuild using Solid.js and Astro with a space theme.

## Why the Change?

My previous site was built with Hugo, which served me well for quite some time. Hugo is great for static sites, and I had no real complaints about it. I've been keeping tabs on newer frameworks, though, and this rebuild gave me the perfect excuse to finally get my hands dirty with them.

For the design, I went with a space theme - dark background with lime green accents. I thought it would look cool and wanted to see if Claude could implement it. This was a good test case for the AI pair programming tool while giving my site a fresh look.

## Technical Implementation

I built the new site with this combination of tools:

- **Solid.js** for reactive components and interactions
- **Astro** for static site generation and performance  
- **Tailwind CSS** for styling

This setup gives me the speed and responsiveness I wanted, plus it's been fun to work with. Solid.js handles the interactive elements with its reactive system, while Astro takes care of generating optimized static pages. I'm still getting up to speed with Solid.js, but I'm already finding it more intuitive than React for my needs.

The component islands architecture is particularly clever - I can selectively hydrate components like the star field (`client:idle`) and navigation (`client:visible`) for better performance. The GitHub integration automatically fetches my pinned repositories with proper error handling built into the Solid components.

## Working with Claude Code

What made this rebuild interesting was using Claude Code as an AI pair programmer. It helped me iterate much more quickly than I might have otherwise. I was surprised by how well it understood what I was trying to accomplish, especially with the visual elements of the space theme.

In the past, I've used LLMs mainly to look up documentation and help design the architecture of my apps, but rarely for writing actual code. Claude Code flips this pattern - I can describe what I want built, and it handles the implementation details. It's a different workflow that's proven surprisingly effective for certain tasks.

## What I'm Up To

These days I'm busy coding on new projects and researching ways to apply AI to development workflows. I'm focused on <span class="text-blue-300 font-medium">systematic exploration</span> of emerging technologies and their practical applications.

This approach helps me create connections between ideas and identify promising directions for deeper investigation. Each project builds on lessons learned from previous work, contributing to a growing understanding of how different technologies can solve real problems.

My current focus spans several areas: building high-performance systems in modern languages like Mojo and Rust, exploring AI integration patterns, and developing tools that improve developer productivity. I believe in <span class="bg-blue-500/10 px-1">shipping working prototypes</span> to validate concepts before committing to larger implementations.

## Current Projects

Right now I'm working on several interesting projects:

- Building a vector database in Mojo for high-performance similarity search
- Developing a TUI coding agent in Rust with improved workflow automation  
- Running local LLMs with Ollama and Open WebUI, accessible remotely via Tailscale
- Experimenting with OpenAI Whisper on Modular's MAX Graph for audio processing

## What's Next?

I plan to use this blog to share thoughts on:

- Backend development insights
- Computer science topics, distributed systems, and databases
- Learning new programming languages like Mojo, Rust, and Gleam
- Updates on projects and technical experiments

Thanks for stopping by. If you want to connect, you can find me on [GitHub](https://github.com/nijaru), [X](https://x.com/nijaru), or [Bluesky](https://bsky.app/profile/nijaru.bsky.social).

And yes, of course I wrote this post with AI - I just served as the editor. Seems fitting for a post about working with Claude Code, doesn't it?
