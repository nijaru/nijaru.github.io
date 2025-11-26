# STATUS

## Current State
**Resume and website updated, ready for job applications.**

## Completed This Session
- Created single-source resume system (`resume-data.json` → generates .tex, .md, .astro imports)
- Added About page with bio
- Added LinkedIn to navbar and social links
- Restructured resume: Skills → Projects → Experience → Awards → Education
- Removed generic summary section
- Improved spacing (10pt Inter, relaxed layout, 1 page)
- Simplified skills (no years notation)
- Created `bun run generate:resume` and `bun run build:resume` scripts

## Key Decisions
| Decision | Rationale |
|----------|-----------|
| No summary on resume | Projects section speaks for itself |
| No LinkedIn URL on resume | GitHub + website more valuable for developers |
| Keep 5 projects (not 6) | Quality > quantity, focused narrative |
| Don't list AI tools in skills | Could raise red flags, better discussed in interviews |
| Inter font at 10pt | Clean, professional, highly legible |
| Single-source JSON | Edit once, generate .tex/.md, Astro imports directly |

## Resume Workflow
```bash
vim resume-data.json    # Edit content
bun run build:resume    # Generates .tex, .md, builds PDF
```
