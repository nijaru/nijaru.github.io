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

I've been wanting to rebuild my personal site for a while, and with the recent release of Claude Code, it seemed like the perfect opportunity to experiment with both new frontend frameworks and AI-assisted development. The result is a complete rewrite using Solid.js and Astro with a space-themed design.

## Why Rebuild?

My previous site was built with Hugo, which served me well for static content generation. But I'd been curious about newer frameworks like Solid.js and wanted hands-on experience with them. Hugo is excellent for what it does, but I was looking for something that offered more flexibility for interactive components while maintaining the performance benefits of static generation.

The space theme came from wanting something visually distinct - dark backgrounds with lime green accents felt like a good fit for a developer's site. It also presented interesting implementation challenges around creating dynamic visual elements like the animated star field background.

## Technical Stack

The new site combines three main technologies:

- **Solid.js** for reactive components and client-side interactions
- **Astro** for static site generation with component islands architecture  
- **Tailwind CSS** for utility-first styling

This stack gives me the best of both worlds: static generation for performance and SEO, with selective hydration for interactive elements. Solid.js particularly appealed to me because of its fine-grained reactivity system and smaller bundle sizes compared to React.

## Development Process with Claude Code

Working with Claude Code changed my usual development workflow significantly. Instead of writing components from scratch, I could describe the functionality I wanted and iterate on the implementation. This was especially helpful for the visual components - the star field animation, the reflection text effects, and the responsive navigation.

The AI tool excelled at translating design concepts into working code. For example, I described wanting "twinkling stars with different animation speeds" and it generated CSS animations with staggered timing that created the exact effect I had in mind.

What surprised me most was how well it handled the component architecture. It properly structured Solid.js components with correct signal usage and lifecycle management, even for more complex interactions like the GitHub repository fetching.

## Technical Highlights

A few interesting implementation details worth mentioning:

**Component Islands**: Astro's islands architecture means I can selectively hydrate components. The star field only hydrates on `client:idle`, while the navigation hydrates on `client:visible` for faster perceived performance.

**GitHub Integration**: The site automatically fetches and displays my pinned repositories using GitHub's GraphQL API, with proper error handling and loading states built into the Solid components.

**Accessibility**: Used Atkinson Hyperlegible fonts throughout for better readability, and ensured proper focus management and semantic HTML structure.

**Performance**: Static generation means fast initial loads, with selective JavaScript for interactive elements. The entire site builds to optimized static files that can be served from a CDN.

## Current Projects

I'm actively working on several interesting projects:

- A vector database implementation in Mojo for high-performance similarity search
- A TUI-based coding agent in Rust with improved workflow automation  
- Local LLM infrastructure using Ollama and Open WebUI
- Experimenting with OpenAI Whisper on Modular's MAX Graph for audio processing

## Looking Forward

This blog will focus on backend development, distributed systems, databases, and AI applications in software engineering. I'm particularly interested in exploring how newer languages like Mojo, Rust, and Zig can solve performance-critical problems in data infrastructure.

Thanks for reading. You can find me on [GitHub](https://github.com/nijaru), [X](https://x.com/nijaru), or [Bluesky](https://bsky.app/profile/nijaru.bsky.social) if you'd like to connect.
