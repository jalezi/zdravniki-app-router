export { default as ContactLink } from './ContactLink';
export type {
  ContactLinkProps,
  EmailProps,
  OrderformProps,
  PhoneProps,
  WebsiteProps,
} from './ContactLink';

import { Email, Orderform, Phone, Website } from './ContactLink';

export const ContactLinks = {
  Email,
  Orderform,
  Phone,
  Website,
} as const;
