# Blog Research TODO

## Popular HN Posts to Analyze

### Short-Form Posts (High Impact)
- [x] **"Fast"** - https://www.catherinejue.com/fast (HN: https://news.ycombinator.com/item?id=44736967) - Analyzed in docs/blog-research/
- [x] **"Slow"** - https://michaelnotebook.com/slow/index.html (HN: https://news.ycombinator.com/item?id=44748934) - Analyzed in docs/blog-research/

### AI/Tech Posts
- [x] **"LLM Inevitabilism"** - https://tomrenner.com/posts/llm-inevitabilism/ (HN: https://news.ycombinator.com/item?id=44567857) - Analyzed in docs/blog-research/
- [x] **"Introducing Kiro"** - https://kiro.dev/blog/introducing-kiro/ (HN: https://news.ycombinator.com/item?id=44560662) - Analyzed in docs/blog-research/
- [x] **"You're All Nuts"** - https://fly.io/blog/youre-all-nuts/ (HN: https://news.ycombinator.com/item?id=44163063) - Analyzed in docs/blog-research/

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

### 2. HN Algolia Searches

**API Documentation**: https://hn.algolia.com/api

Example API queries:
```bash
# Search for AI agents with 100+ points in 2025
curl "https://hn.algolia.com/api/v1/search?query=AI%20agents&tags=story&numericFilters=created_at_i>1735689600,points>100"

# Get specific story by ID
curl "https://hn.algolia.com/api/v1/items/44736967"

# Search with date range (timestamps)
curl "https://hn.algolia.com/api/v1/search_by_date?query=Claude%20Code&tags=story&numericFilters=created_at_i>1704067200,created_at_i<1754352000"
```

Direct search links:
- [ ] [AI agents (2025, 100+ points)](https://hn.algolia.com/?dateRange=custom&dateStart=1735689600&dateEnd=1754352000&hitsPerPage=30&minScore=100&page=0&prefix=false&query=AI%20agents&sort=byPopularity&type=story)
- [ ] [Claude Code (all time, sorted by points)](https://hn.algolia.com/?hitsPerPage=30&page=0&prefix=true&query=%22Claude%20Code%22&sort=byPopularity&type=story)
- [ ] [LLM workflow (2025)](https://hn.algolia.com/?dateRange=custom&dateStart=1735689600&dateEnd=1754352000&hitsPerPage=30&page=0&prefix=false&query=LLM%20workflow&sort=byPopularity&type=story)
- [ ] [Persistent context AI (2024-2025)](https://hn.algolia.com/?dateRange=custom&dateStart=1704067200&dateEnd=1754352000&hitsPerPage=30&page=0&prefix=false&query=persistent%20context%20AI&sort=byPopularity&type=story)
- [ ] [AI memory (2024-2025, 50+ points)](https://hn.algolia.com/?dateRange=custom&dateStart=1704067200&dateEnd=1754352000&hitsPerPage=30&minScore=50&page=0&prefix=false&query=AI%20memory&sort=byPopularity&type=story)
- [ ] [Proactive AI or agentic (2024-2025)](https://hn.algolia.com/?dateRange=custom&dateStart=1704067200&dateEnd=1754352000&hitsPerPage=30&page=0&prefix=false&query=proactive%20AI%20OR%20agentic&sort=byPopularity&type=story)
- [ ] [Popular AI posts (500+ points, past year)](https://hn.algolia.com/?dateRange=pastYear&hitsPerPage=30&minScore=500&page=0&prefix=false&query=AI&sort=byPopularity&type=story)

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