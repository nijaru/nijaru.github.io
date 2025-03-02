import { createSignal, onMount, onCleanup } from 'solid-js';

export default function TextGlow(props) {
  const [glowIntensity, setGlowIntensity] = createSignal(0);
  const [isEnhanced] = createSignal(props.enhanced || false);
  
  let timer;
  let fadeTimer;
  
  onMount(() => {
    // Start random glow effect (only in browser environment)
    if (typeof window !== 'undefined') {
      scheduleGlow();
    }
  });
  
  onCleanup(() => {
    if (typeof window !== 'undefined') {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    }
  });
  
  const scheduleGlow = () => {
    // Random time between 4 and 10 seconds (shorter if enhanced mode)
    const nextGlowTime = Math.random() * (isEnhanced() ? 4000 : 6000) + (isEnhanced() ? 2000 : 4000);
    
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
  
  return (
    <span 
      class={`relative inline-block ${isEnhanced() ? 'transition-transform duration-300 transform hover:scale-105' : ''}`}
      style={{
        'text-shadow': `0 0 ${glowIntensity() * (isEnhanced() ? 15 : 10)}px currentColor`,
        'transition': isEnhanced() ? 'text-shadow 0.7s ease-in-out, transform 0.3s ease' : 'text-shadow 0.5s ease'
      }}
    >
      {props.children}
    </span>
  );
}