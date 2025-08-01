import { createSignal } from "solid-js";

export default function SocialLinks() {
	const links = [
		{
			name: "GitHub",
			displayName: "GitHub",
			url: "https://github.com/nijaru",
			icon: "github",
		},
		{
			name: "X",
			displayName: "X",
			url: "https://x.com/nijaru0x",
			icon: "x-twitter",
		},
		{
			name: "Bluesky",
			displayName: "Bluesky",
			url: "https://bsky.app/profile/nickjr.bsky.social",
			icon: "bluesky",
		},
	];

	const [hoveredIndex, setHoveredIndex] = createSignal(-1);

	return (
		<div class="flex gap-4 justify-center">
			{links.map((link, index) => (
				<a
					key={link.name}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					class="relative group"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(-1)}
				>
					<div class="relative z-10 p-3 rounded-full transition-all duration-300 bg-dark-700 hover:bg-dark-600 flex items-center justify-center">
						<span class="sr-only">{link.name}</span>
						{renderIcon(link.icon)}
					</div>
					{hoveredIndex() === index && (
						<div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-dark-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
							{link.displayName}
						</div>
					)}
				</a>
			))}
		</div>
	);
}

function renderIcon(icon) {
	const baseClasses = "w-6 h-6 text-accent-blue";
	
	switch (icon) {
		case "github":
			return (
				<svg
					class={baseClasses}
					fill="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
			);
		
		case "x-twitter":
			return (
				<svg
					class={baseClasses}
					fill="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
				</svg>
			);
		
		case "bluesky":
			return (
				<svg
					class={baseClasses}
					fill="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="M5.769,3.618C8.291,5.512,11.004,9.352,12,11.412c0.996-2.06,3.709-5.9,6.231-7.793C20.051,2.252,23,1.195,23,4.559	c0,0.672-0.385,5.644-0.611,6.451c-0.785,2.806-3.647,3.522-6.192,3.089c4.449,0.757,5.581,3.265,3.137,5.774	c-4.643,4.764-6.672-1.195-7.193-2.722c-0.095-0.28-0.14-0.411-0.14-0.3c-0.001-0.112-0.045,0.019-0.14,0.3	c-0.521,1.527-2.55,7.486-7.193,2.722c-2.445-2.509-1.313-5.017,3.137-5.774c-2.546,0.433-5.407-0.282-6.192-3.089	C1.385,10.203,1,5.231,1,4.559C1,1.195,3.949,2.252,5.769,3.618L5.769,3.618z"/>
				</svg>
			);
		
		default:
			return null;
	}
}