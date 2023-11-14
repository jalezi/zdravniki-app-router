import type { Metadata } from 'next';
import { BaseParams } from '@/types';
import { compileMDX } from 'next-mdx-remote/rsc';

import { getContentBySlug } from '@/lib/get-content';

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
    components: {},
    options: { parseFrontmatter: true },
  });

  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <div>{content}</div>
    </div>
  );
}
