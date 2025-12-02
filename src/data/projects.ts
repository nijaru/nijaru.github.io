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
			"Production-ready storage engine with learned indexes and modern LSM optimizations. Benchmarks show 2.47x faster writes and 2.07x faster reads vs RocksDB, with 4.82x better write amplification through WiscKey key-value separation. Apache 2.0 licensed.",
		status: "Stable",
		tech: ["Rust", "Storage Engine", "Open Source"],
		repo: { owner: "omendb", name: "seerdb" },
		category: "Recent",
	},
	{
		name: "OmenDB",
		url: "https://github.com/omendb/omendb",
		description:
			"Embedded vector database for Python. HNSW indexing with 8x memory compression, filtered search, persistent storage, and LangChain integration. Open source on PyPI.",
		status: "Stable",
		tech: ["Rust", "Python", "Vector Database", "Open Source"],
		repo: { owner: "omendb", name: "omendb" },
		category: "Recent",
	},
	{
		name: "aircher",
		url: "https://github.com/nijaru/aircher",
		description:
			"AI coding agent backend using LangGraph for multi-agent orchestration. Maintains working memory of codebase and task history, learns project patterns and manages context automatically. Supports Agent Client Protocol (ACP) for editor integrations.",
		status: "In development",
		tech: ["Python", "LangGraph", "AI/ML", "Open Source"],
		repo: { owner: "nijaru", name: "aircher" },
		category: "Recent",
	},
	{
		name: "Pacabot",
		description:
			"AI trading bot using LangGraph multi-agent system with 13 data sources including market data, SEC filings, news, and social sentiment. Real-time research with automated risk management.",
		status: "In development",
		tech: ["Python", "LangGraph", "AI/ML", "Closed Source"],
		category: "Recent",
	},
	{
		name: "Zenith",
		url: "https://github.com/nijaru/zenith",
		description:
			"Modern Python web framework with intuitive developer experience and exceptional performance. Zero-config setup, chainable queries, and 9,600+ req/s throughput.",
		status: "Stable",
		tech: ["Python", "Web Framework", "Open Source"],
		repo: { owner: "nijaru", name: "zenith" },
		category: "Recent",
	},
	{
		name: "sy",
		url: "https://github.com/nijaru/sy",
		description:
			"Modern file synchronization tool - rsync reimagined. Delta sync, parallel transfers, and streaming algorithms in Rust. 40-79% faster than rsync on local sync benchmarks.",
		status: "Stable",
		tech: ["Rust", "CLI Tool", "Open Source"],
		repo: { owner: "nijaru", name: "sy" },
		category: "Recent",
	},
	{
		name: "stop",
		url: "https://github.com/nijaru/stop",
		description:
			"Structured process monitoring with JSON output for AI agents and automation. Filter, sort, and query processes with clean structured data.",
		status: "Stable",
		tech: ["Rust", "CLI Tool", "Open Source"],
		repo: { owner: "nijaru", name: "stop" },
		category: "Recent",
	},
	{
		name: "Kombrucha",
		url: "https://github.com/nijaru/kombrucha",
		description:
			"Modern package manager reimagining Homebrew in Rust. Fast, reliable dependency resolution with parallel downloads and improved caching strategies.",
		status: "Stable",
		tech: ["Rust", "Package Manager", "Open Source"],
		repo: { owner: "nijaru", name: "kombrucha" },
		category: "Recent",
	},
	{
		name: "DJScout",
		description:
			"AI DJ intelligence platform with LSTM models trained on 10K+ professional sets. Iterating on model improvements and playlist generation quality.",
		status: "In development",
		tech: ["Python", "Rust", "AI/ML", "Closed Source"],
		category: "Recent",
	},
	{
		name: "AltText API",
		url: "https://alttextapi.com",
		description:
			"AI-powered alt text generation API and website. Credit-based billing, batch processing, and API key management. Built on Cloudflare Workers with D1 database for global edge deployment.",
		status: "Stable",
		tech: ["TypeScript", "API/Web App", "AI/ML", "Closed Source"],
		category: "Other",
	},
	{
		name: "yt-text",
		url: "https://github.com/nijaru/yt-text",
		description:
			"High-performance video transcription service with multi-platform support. Advanced AI backends (MLX, whisper.cpp, OpenAI) with intelligent fallback and real-time streaming.",
		status: "Stable",
		tech: ["Python", "AI/ML", "Open Source"],
		repo: { owner: "nijaru", name: "yt-text" },
		category: "Other",
	},
];
