import { For } from 'solid-js';

export default function TechSkills() {
  const categories = [
    {
      id: 'primary',
      label: 'Primary Languages',
      skills: [
        { name: 'Python', color: 'text-blue-400' },
        { name: 'Go', color: 'text-accent-blue' }
      ]
    },
    {
      id: 'experience',
      label: 'Experience With',
      skills: [
        { name: 'C', color: 'text-gray-400' },
        { name: 'C++', color: 'text-blue-500' },
        { name: 'Ruby', color: 'text-red-500' },
        { name: 'JavaScript', color: 'text-yellow-400' }
      ]
    },
    {
      id: 'learning',
      label: 'Learning',
      skills: [
        { name: 'Rust', color: 'text-orange-500' },
        { name: 'Mojo 🔥', color: 'text-yellow-500' },
        { name: 'Zig', color: 'text-yellow-600' },
        { name: 'Solid.js', color: 'text-accent-blue' }
      ]
    },
    {
      id: 'tools',
      label: 'Tools & Tech',
      skills: [
        { name: 'Linux', color: 'text-yellow-500' },
        { name: 'Git', color: 'text-red-500' },
        { name: 'Docker', color: 'text-blue-500' },
        { name: 'SQLite', color: 'text-blue-400' },
        { name: 'PostgreSQL', color: 'text-blue-600' },
        { name: 'Redis', color: 'text-red-500' }
      ]
    }
  ];
  
  return (
    <div class="space-y-6">
      <For each={categories}>
        {(category) => (
          <div class="bg-space-800 rounded-lg p-4 border border-space-700">
            <h3 class="text-lg font-medium text-lime-400 mb-3 text-left">
              {category.label}
            </h3>
            
            <div class="flex flex-wrap gap-3 justify-start">
              <For each={category.skills}>
                {(skill, index) => (
                  <div 
                    class="px-3 py-2 bg-space-700 rounded-md flex items-center animate-float" 
                    style={{ 'animation-delay': `${(index() * 0.2) % 2}s` }}
                  >
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