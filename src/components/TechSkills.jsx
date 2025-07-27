import { For } from 'solid-js';

// Move static data outside component to prevent recreation on each render
const categories = [
  {
    id: 'primary',
    label: 'Primary Languages',
    skills: [
      { name: 'Python', color: 'text-blue-400', icon: 'devicon-python-plain' },
      { name: 'Go', color: 'text-accent-blue', icon: 'devicon-go-original-wordmark' }
    ]
  },
  {
    id: 'experience',
    label: 'Experience With',
    skills: [
      { name: 'C', color: 'text-gray-400', icon: 'devicon-c-plain' },
      { name: 'C++', color: 'text-blue-500', icon: 'devicon-cplusplus-plain' },
      { name: 'Ruby', color: 'text-red-500', icon: 'devicon-ruby-plain' },
      { name: 'JavaScript', color: 'text-yellow-400', icon: 'devicon-javascript-plain' }
    ]
  },
  {
    id: 'learning',
    label: 'Learning',
    skills: [
      { name: 'Rust', color: 'text-orange-500', icon: 'devicon-rust-plain' },
      { name: 'Mojo', color: 'text-yellow-500', icon: '🔥' }, // Using emoji for Mojo
      { name: 'Gleam', color: 'text-purple-400', icon: 'devicon-elixir-plain' }, // Using elixir as similar functional language
      { name: 'Solid.js', color: 'text-accent-blue', icon: 'devicon-javascript-plain' }
    ]
  },
  {
    id: 'tools',
    label: 'Tools & Tech',
    skills: [
      { name: 'Linux', color: 'text-yellow-500', icon: 'devicon-linux-plain' },
      { name: 'Git', color: 'text-red-500', icon: 'devicon-git-plain' },
      { name: 'Docker', color: 'text-blue-500', icon: 'devicon-docker-plain' },
      { name: 'SQLite', color: 'text-blue-400', icon: 'devicon-sqlite-plain' },
      { name: 'PostgreSQL', color: 'text-blue-600', icon: 'devicon-postgresql-plain' },
      { name: 'Redis', color: 'text-red-500', icon: 'devicon-redis-plain' }
    ]
  }
];

// Pre-calculate animation delays to avoid calculations during render
const getAnimationDelays = () => {
  const delays = {};
  categories.forEach(category => {
    delays[category.id] = category.skills.map((_, index) => `${(index * 0.2) % 2}s`);
  });
  return delays;
};

const animationDelays = getAnimationDelays();

export default function TechSkills() {
  
  return (
    <div class="space-y-6">
      <For each={categories}>
        {(category) => (
          <div class="mb-6">
            <h3 class="text-lg font-medium text-blue-400 mb-3 text-left">
              {category.label}
            </h3>
            
            <div class="flex flex-wrap gap-3 justify-start">
              <For each={category.skills}>
                {(skill, index) => (
                  <div 
                    class="skill-card flex items-center gap-2 animate-float" 
                    style={{ 'animation-delay': animationDelays[category.id][index()] }}
                  >
                    {skill.icon && (
                      skill.icon.startsWith('devicon-') ? 
                        <i class={`${skill.icon} text-base`}></i> : 
                        <span class="text-base">{skill.icon}</span>
                    )}
                    <span class={`font-medium ${skill.color}`}>{skill.name}</span>
                  </div>
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}