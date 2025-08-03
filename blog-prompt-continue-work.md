# Continue Blog Work - Prompt for New Conversation

## Context
You're on branch `blog/future-ai-agents` working on blog posts for a personal website. The main tasks are:
1. Refine the "Future" blog post to remove cheesy elements and improve clarity
2. Research popular HN posts for writing style insights
3. Ensure all blog posts follow a concise, direct style

## Key Files to Review

### Blog Posts
- @src/content/blog/future.md - New post about AI with persistent memory (needs refinement)
- @src/content/blog/welcome-to-my-new-site.md - Recently rewritten in concise style
- @src/content/blog/thoughts-on-ai-assisted-development.md - Human-written, good reference

### Research & Planning
- @blog-research-todo.md - Master TODO list with HN post links and API queries
- @docs/blog-research/fast-catherine-jue.md - Analysis of popular "Fast" post
- @docs/blog-research/slow-michael-notebook.md - Analysis of popular "Slow" post

### Project Context
- @CLAUDE.md - Project guidelines and standards
- Current date: 2025-08-03 (all blog posts should be dated in 2025)

## Immediate Tasks

### 1. Fix "Future" Blog Post Issues
The user identified these problems:
- "transformative" - find better word/phrasing
- The bullet list about "Your ongoing projects..." is too coding-specific, needs to be broadly applicable
- Expand the grandmother video call example (user said "this is really good")
- Remove/rewrite the artist friend example (controversial AI replacing artists issue)
- General: ensure nothing sounds cheesy or cliché

### 2. Research More HN Posts
Still need to analyze:
- "LLM Inevitabilism" - https://tomrenner.com/posts/llm-inevitabilism/
- "Introducing Kiro" - https://kiro.dev/blog/introducing-kiro/
- "You're All Nuts" - https://fly.io/blog/youre-all-nuts/
- Claude announcements from Anthropic

Use the Algolia API queries in blog-research-todo.md to find more relevant posts.

### 3. Style Guidelines
Based on research of successful posts:
- 300-600 words is fine (don't force length)
- Direct, conversational tone
- Avoid: corporate speak, AGI hype, dystopian predictions
- Include: concrete examples, personal experience, forward-looking ideas
- Opening sentence must hook immediately

## Git Status
- Branch: `blog/future-ai-agents`
- Uncommitted: future.md has changes that need refinement
- Note: Don't amend commits - user wants full history

## Next Steps
1. Read and fix the specific issues in future.md
2. Continue researching HN posts and document findings
3. Ensure consistent style across all blog posts
4. Commit changes with clear messages

Remember: The goal is clarity and impact, not length. Avoid anything that sounds like AI-generated fluff.