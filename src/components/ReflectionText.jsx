import { createSignal, onMount, onCleanup } from 'solid-js';

export default function ReflectionText(props) {
  const [reflectionPosition, setReflectionPosition] = createSignal(-100);
  const [isAnimating, setIsAnimating] = createSignal(false);
  
  let timer;
  let animationFrame;
  
  onMount(() => {
    // Start the reflection randomly (only in browser environment)
    if (typeof window !== 'undefined') {
      scheduleNextReflection();
    }
  });
  
  onCleanup(() => {
    if (typeof window !== 'undefined') {
      clearTimeout(timer);
      if (animationFrame && typeof window.cancelAnimationFrame === 'function') {
        window.cancelAnimationFrame(animationFrame);
      }
    }
  });
  
  const scheduleNextReflection = () => {
    // Random time between 3 and 8 seconds for the next reflection
    const nextReflectionTime = Math.random() * 5000 + 3000;
    
    timer = setTimeout(() => {
      runReflectionAnimation();
    }, nextReflectionTime);
  };
  
  const runReflectionAnimation = () => {
    setIsAnimating(true);
    setReflectionPosition(-100);
    
    const startTime = window.performance.now();
    const duration = 800; // Duration in ms
    
    const animateReflection = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Update position from -100% to 100%
      setReflectionPosition(-100 + progress * 200);
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animateReflection);
      } else {
        setIsAnimating(false);
        scheduleNextReflection();
      }
    };
    
    animationFrame = window.requestAnimationFrame(animateReflection);
  };
  
  return (
    <span class="relative inline-block">
      <span 
        class="relative z-10"
        style={{
          'background-clip': isAnimating() ? 'text' : 'none',
          '-webkit-background-clip': isAnimating() ? 'text' : 'none',
          'background-image': isAnimating() 
            ? `linear-gradient(90deg, currentColor ${reflectionPosition() - 5}%, rgba(255, 255, 255, 0.9) ${reflectionPosition()}%, currentColor ${reflectionPosition() + 5}%)` 
            : 'none',
          'color': isAnimating() ? 'currentColor' : 'currentColor',
          'transition': 'color 0.05s ease'
        }}
      >
        {props.children}
      </span>
    </span>
  );
}