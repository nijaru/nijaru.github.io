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
		name: "omengrep",
		url: "https://github.com/nijaru/omengrep",
		description:
			"Semantic code search tool. Tree-sitter parsing for 22 languages.",
		status: "Stable",
		tech: ["Python", "AI/ML", "Open Source"],
		repo: { owner: "nijaru", name: "omengrep" },
		category: "Recent",
	},
	{
		name: "canto",
		url: "https://github.com/nijaru/canto",
		description:
			"Go agent framework. Composable layers, append-only event log, and deterministic code-driven orchestration for LLM agents and swarms.",
		status: "In development",
		tech: ["Go", "AI/ML", "Open Source"],
		repo: { owner: "nijaru", name: "canto" },
		category: "Recent",
	},
	{
		name: "ion",
		url: "https://github.com/nijaru/ion",
		description:
			"TUI coding agent with multi-provider LLM support. Go rewrite in progress using canto.",
		status: "In development",
		tech: ["Rust", "Go", "AI/ML", "TUI"],
		repo: { owner: "nijaru", name: "ion" },
		category: "Recent",
	},
	{
		name: "aku",
		url: "https://github.com/nijaru/aku",
		description:
			"Go API library with typed handlers and automatic request extraction. net/http-native with OpenAPI generation planned.",
		status: "In development",
		tech: ["Go", "Web Framework", "Open Source"],
		repo: { owner: "nijaru", name: "aku" },
		category: "Recent",
	},
	{
		name: "pacabot",
		description:
			"Prediction market trading bot. Event-driven order execution with real-time risk management.",
		status: "Stable",
		tech: ["Rust", "Finance", "Quantitative"],
		category: "Recent",
	},
	{
		name: "go-clob-client",
		url: "https://github.com/nijaru/go-clob-client",
		description:
			"Go SDK for the Polymarket CLOB. Read-only queries, auth bootstrap, and order-signing flows are already usable.",
		status: "In development",
		tech: ["Go", "SDK", "Trading", "Open Source"],
		repo: { owner: "nijaru", name: "go-clob-client" },
		category: "Recent",
	},
	{
		name: "gomop",
		description:
			"Unified Go formatter combining gofumpt, golines, and goimports in a single AST pass. Sub-10ms formatting for typical files.",
		status: "In development",
		tech: ["Go", "CLI Tool"],
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
		name: "tk",
		url: "https://github.com/nijaru/tk",
		description:
			"Task tracker for AI agents. Git-friendly storage with blocking dependencies and project-scoped IDs.",
		status: "Stable",
		tech: ["TypeScript", "CLI Tool", "Open Source"],
		repo: { owner: "nijaru", name: "tk" },
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
		category: "Other",
	},
	{
		name: "orcx",
		url: "https://github.com/nijaru/orcx",
		description:
			"LLM orchestrator. Route prompts to 100+ providers via litellm with agent presets and cost tracking.",
		status: "In development",
		tech: ["Python", "CLI Tool", "AI/ML", "Open Source"],
		repo: { owner: "nijaru", name: "orcx" },
		category: "Other",
	},
	{
		name: "zenith",
		url: "https://github.com/nijaru/zenith",
		description:
			"Python web framework with zero-config setup, chainable ORM queries, and one-liner features (auth, admin, API docs). Async architecture with 9,600+ req/s throughput.",
		status: "Stable",
		tech: ["Python", "Web Framework", "Open Source"],
		repo: { owner: "nijaru", name: "zenith" },
		category: "Other",
	},
	{
		name: "sy",
		url: "https://github.com/nijaru/sy",
		description:
			"File sync tool with delta transfers, parallel operations, and streaming algorithms. 40-79% faster than rsync in benchmarks.",
		status: "Stable",
		tech: ["Rust", "CLI Tool", "Open Source"],
		repo: { owner: "nijaru", name: "sy" },
		category: "Other",
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
			"Video transcription service. Edge API on Cloudflare Workers with serverless GPU inference on Modal. NVIDIA Parakeet ASR is 16x faster than Whisper with 40% lower error rate.",
		status: "Stable",
		tech: ["TypeScript", "Cloudflare Workers", "Modal", "AI/ML", "Open Source"],
		repo: { owner: "nijaru", name: "yt-text" },
		category: "Other",
	},
];
