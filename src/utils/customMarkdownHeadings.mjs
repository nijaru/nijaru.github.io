/**
 * Custom rehype plugin to transform H2 headings to have TextGlow effect
 * NOTE: This approach modifies the HTML directly. For Astro, a better approach
 * is to use components directly in the markdown with MDX. Since we're using
 * standard markdown, we're falling back to this approach with regular styling.
 */
export function rehypeH2TextGlow() {
  return function (tree) {
    if (!tree || !tree.children) return tree;

    // Visit all h2 nodes and transform them
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'h2') {
        // Add custom classes to the h2 element
        if (!node.properties.className) {
          node.properties.className = [];
        }
        node.properties.className.push('glow-heading');
      }

      // Process children
      if (node.children) {
        node.children.forEach(child => {
          if (typeof child === 'object') {
            visit(child);
          }
        });
      }
    };

    tree.children.forEach(visit);
    return tree;
  };
}