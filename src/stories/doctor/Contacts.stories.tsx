import Contacts from '@/components/cards/doctor/Contacts';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Cards/Doctor/Contacts',
  component: Contacts,

  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'A contact link component.  ',
      },
    },
    // controls: { include: ['contactValue'] },
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    Story => (
      <address className='text-sm not-italic'>
        <Story />
      </address>
    ),
  ],
  argTypes: {
    as: {
      control: {
        type: 'select',
        options: ['email', 'phone', 'website'],
      },
      description: 'The type of contact link.',
    },
    contactValue: {
      control: {
        type: 'text',
      },
      description:
        'A comma-separated list of email addresses, phone numbers or website address.',
    },
  },
} satisfies Meta<typeof Contacts>;

export default meta;

export const Emails: StoryObj<typeof meta> = {
  args: {
    as: 'email',
    contactValue: 'example@example.com, example@example',
  },
};

export const Phones: StoryObj<typeof meta> = {
  args: {
    as: 'phone',
    contactValue: '+38612345678, Krka: 07232332',
  },
};
export const Websites: StoryObj<typeof meta> = {
  args: {
    as: 'website',
    contactValue: 'https://example.com, www.example.com',
  },
};

export const Orderforms: StoryObj<typeof meta> = {
  args: {
    as: 'orderform',
    contactValue: 'https://example.com, example@example.com',
  },
};
