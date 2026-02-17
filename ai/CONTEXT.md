# Session Context - Job Search

**Date:** 2025-12-26

---

## Completed This Session

### Anthropic - Software Engineer, Languages

**Status:** Ready to submit

**Files created:**

- `ai/tmp/anthropic-languages.md` - Application materials, essay, form answers
- `ai/tmp/anthropic-languages-study.md` - Interview prep plan
- `public/Nicholas_Russo_Resume.pdf` - Updated resume

**Resume updates:**

- OmenDB: Added PyO3/maturin explicitly
- Added omengrep project (Mojo/Python/ONNX semantic code search)
- Skills: Added Mojo, PyO3, maturin, ONNX
- Omnitier: Clarified gRPC Python API for Go backend

**Why Anthropic essay (final):**

> Anthropic builds products I actually use. I'm a Claude subscriber and Claude Code has become my main development tool. The quality shows - it's well-designed and keeps improving without losing focus.
>
> The Languages role matches work I've done independently and professionally. I built OmenDB, a vector database with a Rust core and Python API using PyO3 and maturin. At Omnitier, I built a Python API that connected to our Go backend through gRPC. I've also worked with Mojo for similar reasons - getting native performance while staying accessible to Python users is a problem I find interesting.
>
> Anthropic's approach appeals to me. Their research is solid, their products are well-made, and the Bun acquisition shows they support open source. I want to work on interesting problems with people who care about the details, and this looks like the right place for that.

**Form answers:**

- Years experience: 2-5
- Coding interview: Python
- Relocation: No (already in Bay Area - Pleasanton)
- 25% in-office: Yes
- Visa: No
- Interviewed before: No

---

## Companies to Research

**Interested:**

- Modular - Mojo, fits interests
- Cohere - AI infra
- Together AI - inference
- Modal - serverless GPU
- Exa - search/AI
- Cloudflare - Rust, workers
- Discord - Rust backend

**Vector DB (OmenDB conflict risk):**

- Pinecone, Weaviate, Qdrant, Milvus, Chroma - likely IP conflicts

**Database (possible conflict):**

- CockroachDB, PlanetScale, Supabase - check IP clauses

**Not interested:**

- Vercel
- Figma
- Neon (bad rep)
- Timescale

---

## OmenDB IP Conflict Notes

Companies working on vector databases or similar DB technology may have employment contracts that:

1. Assign all IP created during employment to the company
2. Restrict work on competing projects
3. Have broad "related technology" clauses

**High conflict risk:** Pinecone, Weaviate, Qdrant, Milvus, Chroma (direct competitors)

**Medium risk:** General database companies with broad IP clauses

**Lower risk:** AI companies focused on models/applications rather than infrastructure (Anthropic, Cohere, Together, etc.) - OmenDB is a tool, not core to their business

---

## Profile Summary

**Strong:** Rust, Python, PyO3/maturin, systems programming, SIMD, database internals, performance optimization
**Adequate:** Go, C/C++, Docker, Linux, AWS/GCP basics, gRPC
**Gaps:** System design interviews, ML fundamentals, distributed systems depth

**Key projects:** OmenDB (vector DB, Rust+PyO3), SeerDB (LSM engine), omengrep (semantic grep, Mojo/ONNX), jb (CLI dev tool)
**Experience:** 2.5 years at Omnitier (Go backend, Python gRPC API)

---

## Next Steps

1. Submit Anthropic application
2. Research open roles at: Modular, Exa, Cohere, Together AI, Modal, Cloudflare, Discord
3. Decide: keep OmenDB independent (skip vector DB companies) or consider contributing it
4. Continue Anthropic interview prep per study plan
