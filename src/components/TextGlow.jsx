import { createSignal, onMount, onCleanup, splitProps } from 'solid-js';

/**
 * Strategic text glow component - use sparingly for CTAs and key elements only
 * Refined for professional execution with accessibility considerations
 * @param {Object} props - Component props
 * @param {string} [props.class] - Additional CSS classes
 * @param {string} [props.mode='subtle'] - Glow mode: 'subtle', 'cta', or 'hero'
 * @param {any} props.children - Text content
 */
export default function TextGlow(props) {
  const [local, others] = splitProps(props, ['class', 'children', 'mode']);
  const [isHovered, setIsHovered] = createSignal(false);
  
  const mode = () => local.mode || 'subtle';
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  const customClass = local.class || '';
  
  // Strategic glow modes for different use cases
  const getStyles = () => {
    const baseTransition = 'transition-all duration-300 ease-out';
    
    switch (mode()) {
      case 'cta':
        // For primary CTAs - button-like elements
        return {
          class: `${baseTransition} text-accent-blue hover:text-blue-400`,
          style: isHovered() && !prefersReducedMotion 
            ? { 'text-shadow': '0 0 12px rgba(68, 147, 248, 0.4)' }
            : {}
        };
      
      case 'hero':
        // For homepage hero title only
        return {
          class: `${baseTransition} text-accent-blue`,
          style: !prefersReducedMotion 
            ? { 'text-shadow': '0 0 8px rgba(68, 147, 248, 0.2)' }
            : {}
        };
      
      case 'subtle':
      default:
        // Minimal effect for regular emphasis
        return {
          class: `${baseTransition} text-accent-blue hover:text-blue-400`,
          style: {}
        };
    }
  };
  
  const { class: computedClass, style: computedStyle } = getStyles();
  
  return (
    <span 
      class={`${computedClass} ${customClass}`}
      style={computedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...others}
    >
      {local.children}
    </span>
  );
}