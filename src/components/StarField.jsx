import { createSignal, onMount, For } from 'solid-js';

/**
 * Renders a starfield background with optimized performance
 * Uses canvas for performance with fewer DOM elements
 */
export default function StarField() {
  let canvasRef;
  const [dimensionsReady, setDimensionsReady] = createSignal(false);
  
  onMount(() => {
    // Only create stars once window dimensions are available
    const canvas = canvasRef;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setDimensionsReady(true);
    
    // Calculate star count based on screen size with increased density
    const maxStars = 1000; // Even more stars
    const calculatedStars = Math.floor(window.innerWidth * window.innerHeight / 500); // Further increased density
    const starCount = Math.min(calculatedStars, maxStars);
    
    // Create stars data
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.7 + 0.3, // Keep min size at 0.3, but increase max to 2.0
      opacity: Math.random() * 0.7 + 0.3, // Slightly more consistent brightness
      speed: Math.random() * 0.05 + 0.01,
      twinkleFactor: Math.random() * 0.012 + 0.005, // Faster twinkle than before but still gentle
      twinkleDirection: Math.random() > 0.5 ? 1 : -1
    }));
    
    // Animation function
    let frame = 0;
    let animationFrameId;
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw each star
      stars.forEach(star => {
        // Only update twinkle every 2 frames - faster than before but still controlled
        if (frame % 2 === 0) {
          // Calculate twinkle effect with moderate intensity
          star.opacity += star.twinkleFactor * star.twinkleDirection;
          
          // Slightly wider opacity range for more visible twinkling
          if (star.opacity > 0.95 || star.opacity < 0.25) {
            star.twinkleDirection *= -1;
          }
        }
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        // Vary star colors slightly for more visual interest, but more subtle
        // Only 5% of stars will have color now (reduced from 10%)
        const hue = Math.random() > 0.95 ? Math.floor(Math.random() * 30) + 200 : 0; // Occasional blue stars
        const colorValue = hue ? `hsl(${hue}, 60%, 85%, ${star.opacity})` : `rgba(255, 255, 255, ${star.opacity})`;
        
        ctx.fillStyle = colorValue;
        ctx.fill();
      });
      
      // Increment frame counter
      frame = (frame + 1) % 150; // Reset counter every 150 frames (moderate cycle)
      
      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    // Handle window resize (debounced)
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup - cancel animation frame and remove resize listener
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  });

  return (
    <div class="fixed inset-0 overflow-hidden bg-space-900 -z-10">
      <canvas 
        ref={canvasRef}
        class="absolute inset-0"
        style={{ 
          "opacity": dimensionsReady() ? 1 : 0,
          "transition": "opacity 0.5s ease-in"
        }}
      />
    </div>
  );
}