// @ts-check
import { splitProps } from 'solid-js';

/**
 * TextGlowSpan component for inline text glow effect
 * A simpler version of TextGlow that works within regular text
 * @param {object} props - Component props
 * @param {string} [props.class] - Additional CSS classes
 * @param {string} [props.color="lime-400"] - Text color (Tailwind class name without 'text-' prefix)
 * @param {any} props.children - Child elements
 * @returns {JSX.Element} The TextGlowSpan component
 */
export default function TextGlowSpan(props) {
  const [local, others] = splitProps(props, ['class', 'color', 'children']);
  const customClass = local.class || '';
  
  // Determine the gradient colors based on the text color
  let startColor, midColor, endColor;
  let textShadow = "";
  
  // Default is lime gradient
  startColor = "rgba(163, 230, 53, 1)"; // lime-400
  midColor = "rgba(226, 232, 240, 1)"; // white/gray-200
  endColor = "rgba(163, 230, 53, 1)"; // lime-400
  textShadow = "0 0 8px rgba(163, 230, 53, 0.4)";
  
  if (local.color) {
    // Map colors to appropriate gradients
    if (local.color.includes('purple')) {
      startColor = "rgba(192, 132, 252, 1)"; // purple-400
      midColor = "rgba(226, 232, 240, 1)"; 
      endColor = "rgba(192, 132, 252, 1)";
      textShadow = "0 0 8px rgba(192, 132, 252, 0.4)";
    } else if (local.color.includes('blue')) {
      startColor = "rgba(96, 165, 250, 1)"; // blue-400
      midColor = "rgba(226, 232, 240, 1)";
      endColor = "rgba(96, 165, 250, 1)";
      textShadow = "0 0 8px rgba(96, 165, 250, 0.4)";
    }
  }
  
  return (
    <span 
      class={`relative inline-block ${customClass}`}
      style={{
        "background": `linear-gradient(90deg, ${startColor} 0%, ${midColor} 50%, ${endColor} 100%)`,
        "background-size": "200% auto",
        "background-clip": "text",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        "animation": "shine 4s linear infinite",
        "text-shadow": textShadow
      }}
      {...others}
    >
      {local.children}
    </span>
  );
};