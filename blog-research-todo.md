# Blog Research TODO

## Popular HN Posts to Analyze

### Short-Form Posts (High Impact)
- [ ] **"Fast"** - https://www.catherinejue.com/fast (HN: https://news.ycombinator.com/item?id=44736967)
- [ ] **"Slow"** - https://michaelnotebook.com/slow/index.html (HN: https://news.ycombinator.com/item?id=44748934)

### AI/Tech Posts
- [ ] **"LLM Inevitabilism"** - https://tomrenner.com/posts/llm-inevitabilism/ (HN: https://news.ycombinator.com/item?id=44567857)
- [ ] **"Introducing Kiro"** - https://kiro.dev/blog/introducing-kiro/ (HN: https://news.ycombinator.com/item?id=44560662)
- [ ] **"You're All Nuts"** - https://fly.io/blog/youre-all-nuts/ (HN: https://news.ycombinator.com/item?id=44163063)

### Anthropic Posts
- [ ] **Claude 4 Announcement** - https://www.anthropic.com/news/claude-4 (HN: https://news.ycombinator.com/item?id=44063703)
- [ ] **Claude 3.7 Sonnet** - https://www.anthropic.com/news/claude-3-7-sonnet (HN: https://news.ycombinator.com/item?id=43163011)

## Research Plan

### 1. Analyze Successful Post Patterns
- [ ] Word count analysis for each post
- [ ] Opening hook strategies
- [ ] Structure and pacing
- [ ] Use of technical detail vs accessibility
- [ ] Call to action effectiveness

### 2. HN Algolia API Searches
API endpoint: `https://hn.algolia.com/api/v1/search`

Topics to search:
- [ ] "AI agents" (past month, sorted by points)
- [ ] "Claude Code" (all time, sorted by points)
- [ ] "LLM workflow" (past 3 months)
- [ ] "AI memory" or "persistent context"
- [ ] "proactive AI" or "agentic AI"
- [ ] Posts with 500+ points about AI (2024-2025)

Example query:
```
https://hn.algolia.com/api/v1/search?query=AI%20agents&tags=story&numericFilters=created_at_i>1704067200,points>100
```

### 3. Content Themes to Research
- [ ] Current state of AI agent frameworks (LangChain, AutoGen, CrewAI)
- [ ] Real-world AI agent deployments in 2025
- [ ] Memory systems for LLMs (vector DBs, context management)
- [ ] Editor AI integration trends (Cursor, Windsurf, Zed)
- [ ] Proactive vs reactive AI assistant examples

### 4. Writing Style Analysis

#### Key Questions:
- [ ] What makes "Fast" and "Slow" resonate? (brevity, clarity, single concept)
- [ ] How do top posts balance technical depth with accessibility?
- [ ] What's the optimal length for HN audience? (appears to be 500-1500 words)
- [ ] How important are concrete examples vs abstract concepts?

### 5. Improvements for "Future" Post

Based on research:
- [ ] Consider shortening to 800-1200 words
- [ ] Add more concrete, relatable examples
- [ ] Stronger opening hook (current is good but could be punchier)
- [ ] More specific predictions with timeframes
- [ ] Include actual code snippets or interface mockups?
- [ ] Reference current tools people use (VS Code, GitHub Copilot, etc.)

### 6. Additional Research Sources
- [ ] Y Combinator blog posts about AI
- [ ] a16z posts on AI agents
- [ ] Sequoia's AI predictions
- [ ] Popular dev.to or Medium posts on AI agents

## Action Items

1. **Immediate**: Read "Fast" and "Slow" to understand viral short-form style
2. **Next**: Use HN API to find top AI posts from past 6 months
3. **Then**: Revise "Future" post based on findings
4. **Finally**: Review other blog posts for consistency

## Notes

- HN audience appreciates: conciseness, technical accuracy, honest takes, practical applications
- Avoid: hype, AGI speculation, dystopian predictions, corporate speak
- Sweet spot seems to be 800-1500 words for technical topics
- Opening sentence is crucial - must hook immediately