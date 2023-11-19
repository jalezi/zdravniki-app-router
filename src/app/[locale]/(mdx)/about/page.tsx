import { Suspense } from 'react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { Construction } from 'lucide-react';
import { setStaticParamsLocale } from 'next-international/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { MDXLink } from '@/components/ui/mdx-link';
import { getContentBySlug } from '@/lib/get-content';
import { getStaticParams } from '@/locales/server';
import { BaseParams } from '@/types';

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const rawContent = getContentBySlug('about', params.locale);
  if (!rawContent) {
    return {
      title: '404',
    };
  }

  const { frontmatter } = await compileMDX<{
    title: string;
    description: string;
  }>({
    source: rawContent,
    options: { parseFrontmatter: true },
  });

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export function generateStaticParams() {
  return getStaticParams();
}

export type AboutPageProps = {
  params: BaseParams;
};
export default async function AboutPage({ params }: AboutPageProps) {
  setStaticParamsLocale(params.locale);

  const rawContent = getContentBySlug('about', params.locale);

  if (!rawContent) return null;

  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
  }>({
    source: rawContent,
    components: { a: MDXLink, Link, Construction },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          rehypeAutolinkHeadings.bind(null, { behavior: 'before' }),
        ],
      },
    },
  });

  return (
    <>
      <h1 className='sr-only'>{frontmatter.title}</h1>
      <Suspense fallback={<div>Loading...</div>}> {content}</Suspense>
    </>
  );
}
