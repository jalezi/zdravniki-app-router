import type { HTMLAttributes } from 'react';

import { EmailIcon, LinkIcon, PhoneIcon } from '@/components/icons';
import Tooltip from '@/components/ui/tooltip';
import {
  emailSchema,
  phoneReplaceSpecialCharsSchema,
  urlSchema,
} from '@/lib/schemas';

const CONTACT_SCHEMA_MAP = {
  email: emailSchema,
  phone: phoneReplaceSpecialCharsSchema,
  website: urlSchema,
} as const;

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
  contactValue: string;
};

export default function ContactLink({ as, contactValue }: ContactLinkProps) {
  const Icon = CONTACT_ICONS_MAP[as];
  const hrefPrefix = HREF_PREFIX_MAP[as];
  const schema = CONTACT_SCHEMA_MAP[as];

  const splittedLinks = contactValue.split(',').map(contact => contact.trim());

  const links = splittedLinks.map(contact => schema.safeParse(contact.trim()));

  const props =
    as === 'website'
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {};

  return links.map((safeLink, index) => {
    if (safeLink.success) {
      const link = safeLink.data;

      const text =
        link instanceof URL ? link.hostname.replace('www.', '') : link;

      return (
        <a
          key={index}
          href={`${hrefPrefix}${link}`}
          className='inline-flex items-center gap-2  text-inherit hover:text-accent-700'
          {...props}
        >
          <Icon />
          <span>{text}</span>
        </a>
      );
    }

    return (
      <Tooltip key={index} content={splittedLinks[index]}>
        <span
          key={index}
          className='inline-flex cursor-help items-center gap-2 text-red-500'
        >
          <Icon />
          <span>Broken Link</span>
        </span>
      </Tooltip>
    );
  });
}
