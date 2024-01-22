import {
  BookingIcon,
  EmailIcon,
  LinkIcon,
  PhoneIcon,
} from '@/components/icons';
import ContactLink from '@/components/ui/contact-links/ContactLink';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ui/ContactLink/ContactLink',
  component: ContactLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    Icon: {
      options: ['BookingIcon', 'EmailIcon', 'LinkIcon', 'PhoneIcon'],
      mapping: {
        BookingIcon,
        EmailIcon,
        LinkIcon,
        PhoneIcon,
      },
    },
    url: {
      options: [
        'email',
        'phone',
        'website',
        'orderform',
        'emailUrl',
        'phoneUrl',
        'websiteUrl',
        'orderformUrl',
      ],
      mapping: {
        email: 'mailto:example@example.com',
        phone: '+38612345678',
        website: 'example.com',
        orderform: 'example.com',
        emailUrl: new URL('mailto:example2@example.com'),
        phoneUrl: new URL('tel:+38612345678'),
        websiteUrl: new URL('https://example.com'),
        orderformUrl: new URL('https://example.com'),
      },
    },
  },
} satisfies Meta<typeof ContactLink>;

export default meta;

type Story = StoryObj<typeof ContactLink>;

export const Default: Story = {};
