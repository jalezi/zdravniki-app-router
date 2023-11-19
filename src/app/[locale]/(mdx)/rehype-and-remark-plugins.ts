import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export const rehypePlugins = [
  rehypeAutolinkHeadings,
  rehypeExternalLinks,
  rehypeSlug,
];

export const remarkPlugins = [remarkGfm];
