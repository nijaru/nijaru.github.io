import { createSignal, onMount, For } from 'solid-js';

export default function StarField() {
  const [stars, setStars] = createSignal([]);
  
  onMount(() => {
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 1000);
    const newStars = [];
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        animationDelay: Math.random() * 4 + 's',
        animationDuration: (Math.random() * 2 + 2) + 's'
      });
    }
    
    setStars(newStars);
  });

  return (
    <div class="fixed inset-0 overflow-hidden bg-space-900 -z-10">
      <For each={stars()}>
        {(star) => (
          <div 
            class="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: Math.random() * 0.8 + 0.2,
              'animation-delay': star.animationDelay,
              'animation-duration': star.animationDuration
            }}
            classList={{
              'animate-twinkle-slow': star.size < 1.5,
              'animate-twinkle-medium': star.size >= 1.5 && star.size < 2,
              'animate-twinkle-fast': star.size >= 2
            }}
          />
        )}
      </For>
    </div>
  );
}