import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BaseParams } from '@/types';
import { Construction } from 'lucide-react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import { getContentBySlug } from '@/lib/get-content';
import { MDXExternalLink } from '@/components/ui/mdx-external-link';

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

export type AboutPageProps = {
  params: BaseParams;
};
export default async function AboutPage({ params }: AboutPageProps) {
  const rawContent = getContentBySlug('about', params.locale);

  if (!rawContent) return null;

  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
  }>({
    source: rawContent,
    components: { a: MDXExternalLink, Link, Construction },
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [] },
    },
  });

  return (
    <>
      <h1 className='sr-only'>{frontmatter.title}</h1>
      <Suspense fallback={<div>Loading...</div>}> </Suspense>
      {content}
    </>
  );
}
