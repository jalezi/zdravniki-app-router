import type { AnchorHTMLAttributes } from 'react';

import {
  BookingIcon,
  EmailIcon,
  LinkIcon,
  PhoneIcon,
} from '@/components/icons';
import { emailSchema, phoneSchema, websiteSchema } from '@/lib/schemas';
import type { SVGComponent } from '@/types';

export interface ContactLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  Icon: SVGComponent;
  url: string | URL;
  text?: string;
}
export default function ContactLink({
  Icon = LinkIcon,
  url = 'https://zdravniki.sledilnik.org',
  text = 'user friendly text',
  ...props
}: ContactLinkProps) {
  const href = url instanceof URL ? url.href : url;
  const safeText = text ? text : href;

  return (
    <a
      href={href}
      className='inline-flex items-center gap-2 text-inherit hover:text-accent-700'
      {...props}
    >
      <span className='text-lg'>
        <Icon />
      </span>
      <span className='line-clamp-1' title={safeText}>
        {safeText}
      </span>
    </a>
  );
}

const BadUrl = function BadUrl({
  url,
  Icon,
}: {
  url: string;
  Icon: SVGComponent;
}) {
  return (
    <span
      className='inline-flex  cursor-help items-center gap-2 line-through'
      title={url}
    >
      <span className='text-lg'>
        <Icon />
      </span>{' '}
      <span className='max-w-[10ch] overflow-hidden text-ellipsis whitespace-nowrap'>
        {url}
      </span>
    </span>
  );
};

interface CommonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  link: string | URL;
}

export interface EmailProps extends CommonProps {}
export const Email = function Email({
  link: email,

  ...props
}: EmailProps) {
  const safeEmail = emailSchema.safeParse(email);

  const Icon = EmailIcon;

  if (!safeEmail.success) {
    const badEmail = email instanceof URL ? email.href : email;
    return <BadUrl url={badEmail} Icon={Icon} />;
  }

  const url = safeEmail.data;

  return <ContactLink Icon={Icon} url={url} text={url.pathname} {...props} />;
};

export interface PhoneProps extends CommonProps {}

export const Phone = function Phone({ link: phone, ...props }: PhoneProps) {
  const safePhone = phoneSchema.safeParse(phone);

  const Icon = PhoneIcon;

  if (!safePhone.success) {
    const badPhone = phone instanceof URL ? phone.href : phone;
    return <BadUrl url={badPhone} Icon={Icon} />;
  }

  const url = safePhone.data;

  return (
    <ContactLink Icon={PhoneIcon} url={url} text={url.pathname} {...props} />
  );
};

export interface WebsiteProps extends CommonProps {}

export const Website = function Website({
  link: website,
  ...props
}: WebsiteProps) {
  const safeUrl = websiteSchema.safeParse(website);

  const Icon = LinkIcon;

  if (!safeUrl.success) {
    const badUrl = website instanceof URL ? website.href : website;
    return <BadUrl url={badUrl} Icon={Icon} />;
  }

  const url = safeUrl.data;

  return (
    <ContactLink
      Icon={Icon}
      url={url}
      text={url.hostname.replace('www.', '')}
      target='_blank'
      rel='noopener noreferrer'
      {...props}
    />
  );
};

export interface OrderformProps extends CommonProps {}

export const Orderform = function Orderform({
  link: orderform,
  ...props
}: OrderformProps) {
  const safeUrl = websiteSchema.or(emailSchema).safeParse(orderform);

  const Icon = BookingIcon;

  if (!safeUrl.success) {
    const badUrl = orderform instanceof URL ? orderform.href : orderform;
    return <BadUrl url={badUrl} Icon={Icon} />;
  }

  const url = safeUrl.data;

  return (
    <ContactLink
      Icon={BookingIcon}
      url={url}
      text='naročanje'
      title={url.href}
      {...props}
    />
  );
};
