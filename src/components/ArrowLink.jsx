import { splitProps } from 'solid-js';

/**
 * A reusable link component with an arrow icon
 * @param {Object} props - Component props
 * @param {string} props.href - The URL the link points to
 * @param {string} [props.class] - Additional CSS classes to apply
 * @param {string} [props.ariaLabel] - Accessible label for the link
 * @param {any} props.children - Link content
 */
export default function ArrowLink(props) {
  const [local, others] = splitProps(props, ['href', 'class', 'ariaLabel', 'children']);
  
  return (
    <a
      href={local.href}
      class={`inline-flex items-center text-accent-blue hover:text-accent-purple ${local.class || ''}`}
      aria-label={local.ariaLabel}
      {...others}
    >
      {local.children}
      <svg
        class="w-4 h-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        ></path>
      </svg>
    </a>
  );
}