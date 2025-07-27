import { createSignal, onMount, onCleanup, splitProps } from 'solid-js';

/**
 * A versatile text component that adds glow effects with multiple modes
 * @param {Object} props - Component props
 * @param {boolean} [props.enhanced=false] - Whether to use enhanced glow effect (for pulse mode)
 * @param {string} [props.class] - Additional CSS classes
 * @param {string} [props.mode='pulse'] - Glow effect mode: 'pulse', 'gradient', or 'static'
 * @param {string} [props.color='primary'] - Text color theme for gradient mode (primary, blue, purple)
 * @param {any} props.children - Text content
 */
export default function TextGlow(props) {
  const [local, others] = splitProps(props, ['enhanced', 'class', 'children', 'mode', 'color']);
  const [glowIntensity, setGlowIntensity] = createSignal(0);
  
  const isEnhanced = () => local.enhanced || false;
  const mode = () => local.mode || 'pulse';
  const color = () => local.color || 'primary';
  
  let timer;
  let fadeTimer;
  
  // Only set up pulse effect if we're using that mode
  onMount(() => {
    if (mode() === 'pulse' && typeof window !== 'undefined') {
      scheduleGlow();
    }
  });
  
  onCleanup(() => {
    if (timer) clearTimeout(timer);
    if (fadeTimer) clearTimeout(fadeTimer);
  });
  
  const scheduleGlow = () => {
    // Random time between 4 and 10 seconds (shorter if enhanced mode)
    const minTime = isEnhanced() ? 2000 : 4000;
    const randomRange = isEnhanced() ? 4000 : 6000;
    const nextGlowTime = Math.random() * randomRange + minTime;
    
    timer = setTimeout(() => {
      // Perform glow effect (stronger if enhanced)
      setGlowIntensity(isEnhanced() ? 1.0 : 0.8);
      
      // Fade out after 1.5 seconds (longer if enhanced)
      fadeTimer = setTimeout(() => {
        setGlowIntensity(0);
        
        // Schedule next glow
        scheduleGlow();
      }, isEnhanced() ? 2000 : 1500);
    }, nextGlowTime);
  };
  
  // Base styling for all modes
  const baseClass = "relative inline-block";
  const enhancedClass = isEnhanced() && mode() === 'pulse' ? 'transition-transform duration-300 transform hover:scale-105' : '';
  const customClass = local.class || '';
  
  // For gradient mode
  const getGradientStyles = () => {
    // Determine gradient colors based on the color prop
    let startColor, midColor, endColor, textShadow;
    
    // Default primary indigo theme
    startColor = "rgba(99, 102, 241, 1)"; // blue-500 (indigo)
    midColor = "rgba(226, 232, 240, 1)"; // white/gray-200
    endColor = "rgba(99, 102, 241, 1)"; // blue-500 (indigo)
    textShadow = "0 0 8px rgba(99, 102, 241, 0.4)";
    
    // Alternative color themes
    if (color().includes('purple')) {
      startColor = "rgba(139, 92, 246, 1)"; // accent-blue
      midColor = "rgba(226, 232, 240, 1)";
      endColor = "rgba(139, 92, 246, 1)";
      textShadow = "0 0 8px rgba(139, 92, 246, 0.4)";
    } else if (color().includes('blue')) {
      startColor = "rgba(6, 182, 212, 1)"; // accent-blue (cyan)
      midColor = "rgba(226, 232, 240, 1)";
      endColor = "rgba(6, 182, 212, 1)";
      textShadow = "0 0 8px rgba(6, 182, 212, 0.4)";
    }
    
    return {
      "background": `linear-gradient(90deg, ${startColor} 0%, ${midColor} 50%, ${endColor} 100%)`,
      "background-size": "200% auto",
      "background-clip": "text",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
      "animation": "shine 4s linear infinite",
      "text-shadow": textShadow
    };
  };
  
  // For static glow mode
  const getStaticGlowStyles = () => {
    return {
      'text-shadow': '0 0 8px currentColor',
    };
  };
  
  // For pulse glow mode
  const getPulseGlowStyles = () => {
    return {
      'text-shadow': `0 0 ${glowIntensity() * (isEnhanced() ? 15 : 10)}px currentColor`,
      'transition': isEnhanced() ? 'text-shadow 0.7s ease-in-out, transform 0.3s ease' : 'text-shadow 0.5s ease'
    };
  };
  
  // Select the appropriate style based on mode
  const getStyles = () => {
    switch (mode()) {
      case 'gradient':
        return getGradientStyles();
      case 'static':
        return getStaticGlowStyles();
      case 'pulse':
      default:
        return getPulseGlowStyles();
    }
  };
  
  return (
    <span 
      class={`${baseClass} ${enhancedClass} ${customClass}`}
      style={getStyles()}
      {...others}
    >
      {local.children}
    </span>
  );
}