import { Root, RootContent, Element, ElementContent } from 'hast';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRewrite, { type RehypeRewriteOptions } from 'rehype-rewrite';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export const rehypePlugins = [
  rehypeSlug,
  rehypeAutolinkHeadings.bind(null, { behavior: 'prepend' }),
  rehypeExternalLinks.bind(null, { target: '_blank', rel: 'nofollow' }),

  // @ts-ignore
  rehypeRewrite.bind(null, {
    rewrite: rewriteTable,
    selector: 'table',
  } as RehypeRewriteOptions),
];

export const remarkPlugins = [remarkGfm];

/**
 * Rewrites a table node in the HTML AST to include a caption and tfoot.
 * The caption is created from the content of the previous node.
 * The tfoot is created from the content of the next node.
 *
 * @param {Root | RootContent} node - The current node being processed.
 * @param {number} index - The index of the current node in the parent's children array.
 * @param {Element} parent - The parent node of the current node.
 */
function rewriteTable(
  node: Root | RootContent,
  index: number,
  parent: Element
) {
  if (
    !(
      node.type === 'element' &&
      node.tagName === 'table' &&
      index > 0 &&
      parent.children &&
      parent.children.length > 0
    )
  ) {
    return;
  }

  let previousNode = parent.children[index - 1];
  while (parent.children[index - 1]?.type === 'text') {
    parent.children.splice(index - 1, 1);
    index--;
  }
  previousNode = parent.children[index - 1];

  if (previousNode?.type === 'element') {
    const captionNode: ElementContent = {
      type: 'element',
      tagName: 'caption',
      properties: { className: 'text-left px-2 pb-2' },
      children: previousNode?.children || [],
    };
    node.children.unshift(captionNode);
    parent.children.splice(index - 1, 1);
  }

  // similar as above but instead increment index

  //find thead or tfoot and add scope to th
  const thead = node.children.find(
    n => n.type === 'element' && n?.tagName === 'thead'
  );
  if (thead && thead.type === 'element') {
    thead.children.forEach(n => {
      if (n.type === 'element' && n.tagName === 'tr') {
        n.children.forEach(n => {
          if (n.type === 'element' && n.tagName === 'th') {
            n.properties = { ...n.properties, scope: 'col' };
          }
        });
      }
    });
  }
}
