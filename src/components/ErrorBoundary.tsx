import { ErrorBoundary as SolidErrorBoundary } from "solid-js";
import type { JSX } from "solid-js";

interface ErrorBoundaryProps {
	children: JSX.Element;
	fallback?: (err: Error, reset: () => void) => JSX.Element;
}

/**
 * Error boundary wrapper for Solid.js components
 * Catches and gracefully handles component errors
 */
export default function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
	const defaultFallback = (err: Error, reset: () => void) => (
		<div class="card-container border-red-500/50 bg-red-900/20">
			<div class="text-center py-6">
				<div class="text-red-400 mb-2">
					<svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-red-400 mb-2">Something went wrong</h3>
				<p class="text-gray-300 text-sm mb-4">{err.message || "An unexpected error occurred"}</p>
				<button 
					onClick={reset}
					class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
				>
					Try Again
				</button>
			</div>
		</div>
	);

	return (
		<SolidErrorBoundary fallback={fallback || defaultFallback}>
			{children}
		</SolidErrorBoundary>
	);
}