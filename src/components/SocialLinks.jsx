import {
	faGithub,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { createSignal } from "solid-js";

export default function SocialLinks() {
	const links = [
		{
			name: "GitHub",
			displayName: "GitHub",
			url: "https://github.com/nijaru",
			icon: faGithub,
		},
		{
			name: "X",
			displayName: "X",
			url: "https://x.com/nijaru0x",
			icon: faXTwitter,
		},
		{
			name: "Bluesky",
			displayName: "Bluesky",
			url: "https://bsky.app/profile/nickjr.bsky.social",
			icon: "bluesky", // Custom icon
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
					<div class="relative z-10 p-3 rounded-full transition-all duration-300 bg-space-700 hover:bg-space-600 flex items-center justify-center">
						<span class="sr-only">{link.name}</span>
						{renderIcon(link.icon)}
					</div>
					{hoveredIndex() === index && (
						<div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-space-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
							{link.displayName}
						</div>
					)}
				</a>
			))}
		</div>
	);
}

function renderIcon(icon) {
	// For custom icons that aren't in Font Awesome
	if (typeof icon === "string") {
		switch (icon) {
			case "bluesky":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="w-6 h-6"
						aria-hidden="true"
					>
						<path
							fill="currentColor"
							class="text-lime-400"
							d="M5.769,3.618C8.291,5.512,11.004,9.352,12,11.412c0.996-2.06,3.709-5.9,6.231-7.793C20.051,2.252,23,1.195,23,4.559	c0,0.672-0.385,5.644-0.611,6.451c-0.785,2.806-3.647,3.522-6.192,3.089c4.449,0.757,5.581,3.265,3.137,5.774	c-4.643,4.764-6.672-1.195-7.193-2.722c-0.095-0.28-0.14-0.411-0.14-0.3c-0.001-0.112-0.045,0.019-0.14,0.3	c-0.521,1.527-2.55,7.486-7.193,2.722c-2.445-2.509-1.313-5.017,3.137-5.774c-2.546,0.433-5.407-0.282-6.192-3.089	C1.385,10.203,1,5.231,1,4.559C1,1.195,3.949,2.252,5.769,3.618L5.769,3.618z"
						/>
					</svg>
				);
			default:
				return null;
		}
	}

	// For Font Awesome icons
	return (
		<svg
			class="w-5 h-5 text-lime-400"
			fill="currentColor"
			viewBox={`0 0 ${icon.icon[0]} ${icon.icon[1]}`}
			aria-hidden="true"
		>
			<path d={icon.icon[4]} />
		</svg>
	);
}