// @ts-check
import TextGlow from "./TextGlow";

/**
 * Section heading component with border-bottom and glow effect
 * @param {object} props - Component props
 * @param {string} [props.title] - Section title
 * @param {boolean} [props.withBorder=true] - Whether to include a bottom border
 * @param {string} [props.className] - Additional CSS classes
 * @param {any} props.children - Child elements (alternative to title)
 * @returns {JSX.Element} The SectionHeading component
 */
export default function SectionHeading(props) {
  const {
    title,
    withBorder = true,
    className = "",
    children,
    ...otherProps
  } = props;

  const content = title || children;
  const borderClass = withBorder ? "border-b border-dark-700 pb-2" : "";
  
  return (
    <h2 
      className={`text-2xl font-bold mb-6 ${borderClass} ${className}`}
      {...otherProps}
    >
      <TextGlow mode="gradient">
        {content}
      </TextGlow>
    </h2>
  );
}