import { AnchorHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const socialLinkVariants = cva('flex items-center gap-2 transition-colors', {
  variants: {
    variant: {
      header: 'text-2xl transition-colors hover:text-text-400',
      footer:
        'text-base text-footer-900 transition-colors hover:text-footer-500',
    },
  },
  defaultVariants: {
    variant: 'header',
  },
});

export interface SocialLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof socialLinkVariants>,
    PropsWithChildren {
  href: string;
  icon?: ReactNode;
  text?: string | undefined;
}

const SocialLink = ({
  children,
  className,
  href,
  icon,
  variant,
  ...props
}: SocialLinkProps) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className={cn(socialLinkVariants({ variant, className }))}
      {...props}
    >
      {icon} {children}
    </a>
  );
};

export default SocialLink;
