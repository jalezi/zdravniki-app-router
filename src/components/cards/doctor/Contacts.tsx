/* eslint-disable react/no-unescaped-entities */
import type { HTMLAttributes } from 'react';

import { ContactLinks } from '@/components/ui/contact-links';
import { splitBySeparator } from '@/lib/utils/doctor';

const LINK_COMPONENTS_MAP = {
  email: ContactLinks.Email,
  phone: ContactLinks.Phone,
  website: ContactLinks.Website,
  orderform: ContactLinks.Orderform,
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
  const ContactLink = LINK_COMPONENTS_MAP[as];

  // could be a problem for websites with comma/semicolon in the pathname
  const hasComma = contactValue.includes(',');
  const hasSemicolon = contactValue.includes(';');

  const separator = hasComma ? ',' : hasSemicolon ? ';' : ',';
  const splittedLinks = splitBySeparator(contactValue, separator);

  return splittedLinks.map((link, index) => {
    return (
      <>
        <ContactLink key={index + link} link={link} {...props} />
        {index < splittedLinks.length - 1 ? ', ' : null}
      </>
    );
  });
}
