import { Suspense } from 'react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { Construction } from 'lucide-react';
import { setStaticParamsLocale } from 'next-international/server';
import { compileMDX } from 'next-mdx-remote/rsc';

import { components } from '@/components/ui/mdx-headings';
import { getContentBySlug } from '@/lib/get-content';
import { getStaticParams } from '@/locales/server';
import { BaseParams } from '@/types';

import { remarkPlugins, rehypePlugins } from '../rehype-and-remark-plugins';

export async function generateMetadata({
  params,
}: FaqPageProps): Promise<Metadata> {
  const rawContent = getContentBySlug('faq', params.locale);
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

export type FaqPageProps = {
  params: BaseParams;
};
export default async function FaqPage({ params }: FaqPageProps) {
  setStaticParamsLocale(params.locale);

  const rawContent = getContentBySlug('faq', params.locale);

  if (!rawContent) return null;

  const { content } = await compileMDX<{
    title: string;
    description: string;
  }>({
    source: rawContent,
    components: { Link, Construction, ...components },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins,
        // @ts-ignore
        rehypePlugins,
      },
    },
  });

  return <Suspense fallback={<div>Loading...</div>}> {content}</Suspense>;
}
