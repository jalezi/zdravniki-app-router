/* eslint-disable react/no-unescaped-entities */
import type { HTMLAttributes } from 'react';

import {
  BookingIcon,
  EmailIcon,
  LinkIcon,
  PhoneIcon,
} from '@/components/icons';
import { Divider } from '@/components/ui/divider';
import Tooltip from '@/components/ui/tooltip';
import {
  emailSchema,
  phoneReplaceSpecialCharsSchema,
  urlSchema,
} from '@/lib/schemas';

const CONTACT_SCHEMA_MAP = {
  email: emailSchema.transform(value => new URL(`mailto:${value}`)),
  phone: phoneReplaceSpecialCharsSchema.transform(
    value => new URL(`tel:${value}`)
  ),
  website: urlSchema,
  orderform: urlSchema
    .or(emailSchema)
    .transform(value =>
      value instanceof URL ? value : new URL(`mailto:${value}`)
    ),
} as const;

const CONTACT_ICONS_MAP = {
  email: EmailIcon,
  phone: PhoneIcon,
  website: LinkIcon,
  orderform: BookingIcon,
} as const;

export type ContactLinkProps = HTMLAttributes<HTMLAnchorElement> & {
  as: 'email' | 'phone' | 'website' | 'orderform';
  contactValue: string;
};

export default function Contacts({
  as,
  contactValue,
  ...props
}: ContactLinkProps) {
  const Icon = CONTACT_ICONS_MAP[as];
  const schema = CONTACT_SCHEMA_MAP[as];

  const hasComma = contactValue.includes(',');
  const hasSemicolon = contactValue.includes(';');

  const separator = hasComma ? ',' : hasSemicolon ? ';' : ',';

  const splittedLinks = contactValue
    .split(separator)
    .map(contact => contact.trim());

  const urlProps =
    as === 'website'
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {};

  return splittedLinks.map((link, index) => {
    const safeLink = schema.safeParse(link);

    if (safeLink.success) {
      const url = safeLink.data;

      const text =
        url.protocol === 'mailto:' || url.protocol === 'tel:'
          ? url.pathname
          : url.hostname.replace('www.', '').replace('mailto:', '');

      return (
        <>
          <a
            key={index + link}
            href={url.href}
            className='inline-flex items-center gap-2  text-inherit hover:text-accent-700'
            {...urlProps}
            {...props}
          >
            <Icon />
            <span>
              {as === 'orderform' ? 'naročanje' : text}{' '}
              {as === 'orderform' && url.protocol === 'mailto:'
                ? '(e-pošta)'
                : null}
              {as === 'orderform' && url.protocol === 'tel:'
                ? '(telefon)'
                : null}
              {as === 'orderform' && url.protocol.startsWith('http')
                ? '(spletna stran)'
                : null}
            </span>
          </a>
          {index < splittedLinks.length - 1 ? ', ' : null}
        </>
      );
    }

    const tooltipContent = (
      <>
        <p>"{link}"</p>
        <Divider />
        <p>Not valid url!</p>
        <Divider />
        <strong>Valid examples:</strong>
        <ul>
          <li>
            <code>http(s)://example.com</code>
          </li>
          <li>
            <code>http(s)://example.com/path</code>
          </li>
          <li>
            <code>http(s)://example.com/path?query=string</code>
          </li>
          <li>
            <code>example@example.com</code>
          </li>
          <li>
            <code>+38612345678</code>
          </li>
          <li>
            <code>01 2345678</code>
          </li>
        </ul>
      </>
    );

    return (
      <>
        <Tooltip key={index + link} content={tooltipContent}>
          <span
            key={index}
            className='inline-flex cursor-help items-center gap-2  line-through'
          >
            <Icon />
            <span>{splittedLinks[index]}</span>
          </span>
        </Tooltip>
        {index < splittedLinks.length - 1 ? ', ' : null}
      </>
    );
  });
}
