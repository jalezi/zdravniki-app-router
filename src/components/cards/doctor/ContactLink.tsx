import type { HTMLAttributes } from 'react';

import { EmailIcon, LinkIcon, PhoneIcon } from '@/components/icons';

const CONTACT_ICONS_MAP = {
  email: EmailIcon,
  phone: PhoneIcon,
  website: LinkIcon,
} as const;

const HREF_PREFIX_MAP = {
  email: 'mailto:',
  phone: 'tel:',
  website: '',
} as const;

export type ContactLinkProps = HTMLAttributes<HTMLAnchorElement> & {
  as: 'email' | 'phone' | 'website';
  href: string;
};

export default function ContactLink({ as, href }: ContactLinkProps) {
  const Icon = CONTACT_ICONS_MAP[as];
  const hrefPrefix = HREF_PREFIX_MAP[as];

  return (
    <a
      href={`${hrefPrefix}${href}`}
      className='inline-flex items-center gap-2 hover:text-accent-500'
    >
      <span className='text-xl'>
        <Icon />
      </span>
      {href}
    </a>
  );
}
