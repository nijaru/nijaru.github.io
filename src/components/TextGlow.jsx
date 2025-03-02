import { createSignal, onMount, onCleanup, splitProps } from 'solid-js';

/**
 * A text component that adds a random glow effect
 * @param {Object} props - Component props
 * @param {boolean} [props.enhanced=false] - Whether to use enhanced glow effect
 * @param {string} [props.class] - Additional CSS classes
 * @param {any} props.children - Text content
 */
export default function TextGlow(props) {
  const [local, others] = splitProps(props, ['enhanced', 'class', 'children']);
  const [glowIntensity, setGlowIntensity] = createSignal(0);
  const isEnhanced = () => local.enhanced || false;
  
  let timer;
  let fadeTimer;
  
  onMount(() => {
    // Start random glow effect (only in browser environment)
    if (typeof window !== 'undefined') {
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
  
  const baseClass = "relative inline-block";
  const enhancedClass = isEnhanced() ? 'transition-transform duration-300 transform hover:scale-105' : '';
  const customClass = local.class || '';
  
  return (
    <span 
      class={`${baseClass} ${enhancedClass} ${customClass}`}
      style={{
        'text-shadow': `0 0 ${glowIntensity() * (isEnhanced() ? 15 : 10)}px currentColor`,
        'transition': isEnhanced() ? 'text-shadow 0.7s ease-in-out, transform 0.3s ease' : 'text-shadow 0.5s ease'
      }}
      {...others}
    >
      {local.children}
    </span>
  );
}