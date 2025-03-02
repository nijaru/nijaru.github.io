// TypeScript interface for props
// @ts-check

/**
 * Reading time component that shows estimated time to read content
 * @param {{ content?: string, minutes?: number }} props - Component props
 */
export default function ReadingTime(props) {
  const { minutes, content } = props;
  
  // Use explicit minutes if provided
  if (typeof minutes === 'number') {
    return (
      <span class="text-gray-400 text-sm flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {minutes} min read
      </span>
    );
  }
  
  // Return null if content is missing - component won't render
  if (!content || typeof content !== 'string') {
    return null;
  }
  
  try {
    // Calculate reading time
    // Set a slower reading speed for technical content: 180 words per minute
    const words = content.trim().split(/\s+/).length;
    const calculatedMinutes = Math.max(1, Math.ceil(words / 180)); // Minimum 1 minute
    
    return (
      <span class="text-gray-400 text-sm flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {calculatedMinutes} min read
      </span>
    );
  } catch (error) {
    console.error('Error calculating reading time:', error);
    return null; // Don't show reading time if there's an error
  }
}