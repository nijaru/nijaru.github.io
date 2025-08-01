// @ts-check
/**
 * Professional section heading component with subtle styling
 * Removed glow effects for cleaner, more readable design
 * @param {object} props - Component props
 * @param {string} [props.title] - Section title
 * @param {boolean} [props.withBorder=true] - Whether to include a bottom border
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.isHighlight=false] - Whether this is a key section (homepage hero, CTAs)
 * @param {any} props.children - Child elements (alternative to title)
 * @returns {JSX.Element} The SectionHeading component
 */
export default function SectionHeading(props) {
  const {
    title,
    withBorder = true,
    className = "",
    isHighlight = false,
    children,
    ...otherProps
  } = props;

  const content = title || children;
  const borderClass = withBorder ? "border-b border-white/10 pb-2" : "";
  
  // Only use subtle glow for highlight sections (like homepage hero)
  const textClass = isHighlight 
    ? "text-accent-blue hover:text-blue-400 transition-colors duration-300" 
    : "text-gray-100 hover:text-accent-blue transition-colors duration-300";
  
  return (
    <h2 
      className={`text-2xl font-bold mb-6 ${borderClass} ${textClass} ${className}`}
      {...otherProps}
    >
      {content}
    </h2>
  );
}