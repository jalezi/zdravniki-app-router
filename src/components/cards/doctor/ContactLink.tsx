import type { HTMLAttributes } from 'react';

import { EmailIcon, LinkIcon, PhoneIcon } from '@/components/icons';
import Tooltip from '@/components/ui/tooltip';
import ValidationError from '@/lib/errors/ValidationError';

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

export type ContactLinkProps = HTMLAttributes<HTMLAnchorElement> &
  (
    | { as: 'email' | 'phone'; href: string }
    | { as: 'website'; href: URL | ValidationError }
  );

export default function ContactLink({ as, href }: ContactLinkProps) {
  const Icon = CONTACT_ICONS_MAP[as];
  const hrefPrefix = HREF_PREFIX_MAP[as];

  if (as === 'website' && href instanceof ValidationError) {
    return (
      <Tooltip content='some broken website'>
        <span className='inline-flex cursor-help items-center gap-2 hover:text-red-700'>
          <span className='text-xl'>
            <Icon />
          </span>
          {href.message}
        </span>
      </Tooltip>
    );
  }

  const link = as === 'website' ? href.toString() : href;

  return (
    <a
      href={`${hrefPrefix}${href}`}
      className='inline-flex items-center gap-2 hover:text-accent-500'
    >
      <span className='text-xl'>
        <Icon />
      </span>
      {link}
    </a>
  );
}
