import { createSignal, onMount } from 'solid-js';

/**
 * Refined starfield background with professional execution
 * Respects user motion preferences and provides elegant depth layers
 */
export default function StarField() {
  let canvasRef;
  const [dimensionsReady, setDimensionsReady] = createSignal(false);
  
  onMount(() => {
    const canvas = canvasRef;
    const ctx = canvas.getContext('2d');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Set canvas dimensions to match viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setDimensionsReady(true);
    
    // One-time device capability detection for optimal quality level
    const devicePixelRatio = window.devicePixelRatio || 1;
    const isMobile = window.innerWidth < 768;
    const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    // Set static quality configuration - increased density and twinkling
    const quality = (() => {
      if (isMobile || isLowPower) {
        return { maxStars: 400, densityDivider: 900, updateInterval: 6 };
      } else if (devicePixelRatio > 1.5) {
        return { maxStars: 700, densityDivider: 700, updateInterval: 4 };
      } else {
        return { maxStars: 900, densityDivider: 600, updateInterval: 3 };
      }
    })();
    
    const calculatedStars = Math.floor(window.innerWidth * window.innerHeight / quality.densityDivider);
    const starCount = Math.min(calculatedStars, quality.maxStars);
    
    // Create and pre-sort stars for efficient rendering
    const allStars = Array.from({ length: starCount }, () => {
      const layer = Math.random();
      let size, baseOpacity, twinkleFactor;
      
      if (layer < 0.7) {
        // Small background stars (70%)
        size = Math.random() * 0.8 + 0.2;
        baseOpacity = Math.random() * 0.2 + 0.1;
        twinkleFactor = prefersReducedMotion ? 0 : Math.random() * 0.01 + 0.005;
      } else if (layer < 0.9) {
        // Medium stars (20%)
        size = Math.random() * 1.2 + 0.8;
        baseOpacity = Math.random() * 0.3 + 0.2;
        twinkleFactor = prefersReducedMotion ? 0 : Math.random() * 0.015 + 0.008;
      } else {
        // Large prominent stars (10%)
        size = Math.random() * 1.8 + 1.2;
        baseOpacity = Math.random() * 0.4 + 0.3;
        twinkleFactor = prefersReducedMotion ? 0 : Math.random() * 0.02 + 0.01;
      }
      
      const isAccentStar = layer > 0.95;
      const hasGlow = size > 1.0;
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        opacity: baseOpacity,
        baseOpacity,
        maxOpacity: Math.min(baseOpacity + 0.15, 0.4),
        twinkleFactor,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        isAccentStar,
        hasGlow
      };
    });
    
    // Pre-sort stars by type for efficient batched rendering
    const whiteStars = allStars.filter(star => !star.isAccentStar);
    const blueStars = allStars.filter(star => star.isAccentStar);
    const glowStars = allStars.filter(star => star.hasGlow);
    
    // Simple, efficient animation loop
    let frame = 0;
    let animationFrameId;
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update star opacity using static quality settings
      if (frame % quality.updateInterval === 0 && !prefersReducedMotion) {
        allStars.forEach(star => {
          star.opacity += star.twinkleFactor * star.twinkleDirection;
          if (star.opacity > star.maxOpacity || star.opacity < star.baseOpacity * 0.5) {
            star.twinkleDirection *= -1;
          }
        });
      }
      
      // Efficient batched rendering using pre-sorted arrays
      // Render glow effects first (behind main stars)
      glowStars.forEach(star => {
        if (star.opacity > 0.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = star.isAccentStar 
            ? `hsla(220, 70%, 88%, ${star.opacity * 0.1})`
            : `rgba(248, 249, 250, ${star.opacity * 0.08})`;
          ctx.fill();
        }
      });
      
      // Render white stars
      whiteStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 249, 250, ${star.opacity})`;
        ctx.fill();
      });
      
      // Render blue accent stars
      blueStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(220, 70%, 88%, ${star.opacity})`;
        ctx.fill();
      });
      
      // Elegant 4-second cycle
      frame = (frame + 1) % 240;
      
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    // Start animation (or render static if motion is reduced)
    if (prefersReducedMotion) {
      animate(); // Single render
    } else {
      animationFrameId = requestAnimationFrame(animate);
    }
    
    // Efficient resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reposition all stars proportionally
        if (oldWidth > 0 && oldHeight > 0) {
          const widthRatio = canvas.width / oldWidth;
          const heightRatio = canvas.height / oldHeight;
          
          allStars.forEach(star => {
            star.x = Math.min(star.x * widthRatio, canvas.width - 1);
            star.y = Math.min(star.y * heightRatio, canvas.height - 1);
          });
        }
        
        // Force immediate re-render
        if (!prefersReducedMotion && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(animate);
        } else if (prefersReducedMotion) {
          animate();
        }
      }, 150);
    };
    
    // Pause animation when tab is not visible (battery optimization)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else if (!prefersReducedMotion) {
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      clearTimeout(resizeTimeout);
    };
  });

  return (
    <div class="fixed inset-0 overflow-hidden -z-10" 
         style={{ "background-color": "#08090a" }}>
      <canvas 
        ref={canvasRef}
        class="absolute inset-0"
        style={{ 
          "opacity": dimensionsReady() ? 1 : 0,
          "transition": "opacity 0.8s ease-out"
        }}
      />
    </div>
  );
}