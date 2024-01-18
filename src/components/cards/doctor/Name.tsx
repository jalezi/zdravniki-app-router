import Link, { LinkProps } from 'next/link';

import { Heading } from '@/components/ui/headings';
import type { HeadingProps } from '@/components/ui/headings';
import { cn } from '@/lib/utils';

export interface NameProps extends Omit<HeadingProps, 'children'> {
  href: LinkProps['href'];
  name: string;
  nameSrOnly?: string;
}

export default async function Name({
  as,
  className,
  href,
  name,
  nameSrOnly,
  ...props
}: NameProps) {
  const styles = cn('text-xl font-bold', className);

  return (
    <Link href={href}>
      <Heading as={as} className={styles} {...props}>
        {name}
        <span className='sr-only'>{nameSrOnly}</span>
      </Heading>
    </Link>
  );
}
