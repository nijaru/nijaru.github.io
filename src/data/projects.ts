export interface Project {
	name: string;
	url?: string;
	description: string;
	status: "Stable" | "In development" | "Experimental";
	tech: string[];
	repo?: {
		owner: string;
		name: string;
	};
	category: "Featured" | "Recent" | "Other";
	stars?: number; // Populated at runtime
}

export const projects: Project[] = [
	// Featured - loaded from GitHub in original, but we can define them here to centralize
	// The original logic fetched pinned repos. We can keep that or merge it.
	// For now, let's capture the manually defined ones which seem more curated.

	{
		name: "seerdb",
		url: "https://github.com/omendb/seerdb",
		description:
			"LSM storage engine with ALEX learned indexes and WiscKey key-value separation. Benchmarks show 2.5x faster writes, 2x faster reads, and 5x lower write amplification compared to RocksDB.",
		status: "Stable",
		tech: ["Rust", "Storage Engine", "Open Source"],
		repo: { owner: "omendb", name: "seerdb" },
		category: "Recent",
	},
	{
		name: "OmenDB",
		url: "https://github.com/omendb/omendb",
		description:
			"Embedded vector database with Python bindings. Persistent storage, filtered search, LangChain integration.",
		status: "Stable",
		tech: ["Rust", "Python", "Vector Database", "Open Source"],
		repo: { owner: "omendb", name: "omendb" },
		category: "Recent",
	},
	{
		name: "aircher",
		url: "https://github.com/nijaru/aircher",
		description:
			"AI coding agent using LangGraph for multi-agent orchestration. Maintains working memory of codebase structure and task history across sessions. Supports Agent Client Protocol (ACP) for editor integrations.",
		status: "In development",
		tech: ["Python", "LangGraph", "AI/ML", "Open Source"],
		repo: { owner: "nijaru", name: "aircher" },
		category: "Recent",
	},
	{
		name: "Pacabot",
		description:
			"AI trading bot using LangGraph multi-agent system. Aggregates 13 data sources including market data, SEC filings, news, and social sentiment for analysis and trade decisions.",
		status: "Stable",
		tech: ["Python", "LangGraph", "AI/ML", "Closed Source"],
		category: "Recent",
	},
	{
		name: "Zenith",
		url: "https://github.com/nijaru/zenith",
		description:
			"Python web framework with zero-config setup, chainable ORM queries, and one-liner features (auth, admin, API docs). Async architecture with 9,600+ req/s throughput.",
		status: "Stable",
		tech: ["Python", "Web Framework", "Open Source"],
		repo: { owner: "nijaru", name: "zenith" },
		category: "Recent",
	},
	{
		name: "hygrep",
		url: "https://github.com/nijaru/hygrep",
		description:
			"Hybrid code search combining grep with neural reranking. Parallel Mojo scanner (~20k files/sec) finds matches, ONNX reranker scores by relevance. Extracts functions and classes for Python, JavaScript, TypeScript, Go, and Rust.",
		status: "Stable",
		tech: ["Python", "Mojo", "AI/ML", "Open Source"],
		repo: { owner: "nijaru", name: "hygrep" },
		category: "Recent",
	},
	{
		name: "sy",
		url: "https://github.com/nijaru/sy",
		description:
			"File sync tool with delta transfers, parallel operations, and streaming algorithms. 40-79% faster than rsync in benchmarks.",
		status: "Stable",
		tech: ["Rust", "CLI Tool", "Open Source"],
		repo: { owner: "nijaru", name: "sy" },
		category: "Recent",
	},
	{
		name: "DJScout",
		description:
			"DJ mix analysis using LSTM models trained on 10K+ professional sets. Analyzes track transitions and generates playlists.",
		status: "In development",
		tech: ["Python", "Rust", "AI/ML", "Closed Source"],
		category: "Other",
	},
	{
		name: "AltText API",
		url: "https://alttextapi.com",
		description:
			"Alt text generation API with batch processing. Deployed on Cloudflare Workers with D1 database for global edge distribution.",
		status: "Stable",
		tech: ["TypeScript", "API/Web App", "AI/ML", "Closed Source"],
		category: "Other",
	},
	{
		name: "yt-text",
		url: "https://github.com/nijaru/yt-text",
		description:
			"Video transcription with multiple Whisper backends (MLX, whisper.cpp, OpenAI). Automatic fallback between backends with streaming output.",
		status: "Stable",
		tech: ["Python", "AI/ML", "Open Source"],
		repo: { owner: "nijaru", name: "yt-text" },
		category: "Other",
	},
];
