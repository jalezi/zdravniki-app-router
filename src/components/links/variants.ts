import { cva, VariantProps } from 'class-variance-authority';

export const linkVariants = cva('', {
  variants: {
    variant: {
      logo: '',
      header: 'nav-link',
      footer:
        'flex items-center gap-2 text-base text-footer-900  transition-colors hover:text-footer-500',
    },
  },
  defaultVariants: {
    variant: 'header',
  },
});

export type LinkVariants = VariantProps<typeof linkVariants>;
