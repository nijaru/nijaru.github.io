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
	{
		name: "omendb",
		url: "https://github.com/omendb/omendb",
		description:
			"Embedded vector database. 4x faster than hnswlib-based alternatives. Rust core with Python bindings via PyO3/maturin.",
		status: "Stable",
		tech: ["Rust", "Python", "Vector Database", "Open Source"],
		repo: { owner: "omendb", name: "omendb" },
		category: "Recent",
	},
	{
		name: "seerdb",
		url: "https://github.com/omendb/seerdb",
		description:
			"LSM-tree storage engine. 2.5x faster writes, 5x lower write amplification than RocksDB.",
		status: "Stable",
		tech: ["Rust", "Storage Engine", "Open Source"],
		repo: { owner: "omendb", name: "seerdb" },
		category: "Recent",
	},
	{
		name: "hhg",
		url: "https://github.com/nijaru/hygrep",
		description:
			"Semantic code search tool. Tree-sitter parsing for 22 languages.",
		status: "Stable",
		tech: ["Python", "AI/ML", "Open Source"],
		repo: { owner: "nijaru", name: "hygrep" },
		category: "Recent",
	},
	{
		name: "jb",
		url: "https://github.com/nijaru/jb",
		description:
			"Background job manager. Session-persistent execution for long-running tasks.",
		status: "In development",
		tech: ["Rust", "CLI Tool", "Open Source"],
		repo: { owner: "nijaru", name: "jb" },
		category: "Recent",
	},
	{
		name: "pacabot",
		description:
			"Algorithmic trading system. Options pricing with real-time position sizing.",
		status: "Stable",
		tech: ["Rust", "Finance", "Quantitative"],
		category: "Recent",
	},
	{
		name: "zenith",
		url: "https://github.com/nijaru/zenith",
		description:
			"Python web framework with zero-config setup, chainable ORM queries, and one-liner features (auth, admin, API docs). Async architecture with 9,600+ req/s throughput.",
		status: "Stable",
		tech: ["Python", "Web Framework", "Open Source"],
		repo: { owner: "nijaru", name: "zenith" },
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
		name: "djscout",
		description:
			"DJ mix analysis using LSTM models trained on 10K+ professional sets. Analyzes track transitions and generates playlists.",
		status: "In development",
		tech: ["Python", "Rust", "AI/ML"],
		category: "Other",
	},
	{
		name: "alttext api",
		url: "https://alttextapi.com",
		description:
			"Alt text generation API with batch processing. Deployed on Cloudflare Workers with D1 database for global edge distribution.",
		status: "Stable",
		tech: ["TypeScript", "API/Web App", "AI/ML"],
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
