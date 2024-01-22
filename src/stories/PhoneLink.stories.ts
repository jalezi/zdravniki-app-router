import { Phone } from '@/components/ui/contact-links/ContactLink';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ui/ContactLink/Phone Link',
  component: Phone,

  parameters: {
    docs: {
      description: {
        component:
          'A link to a phone number. It returns `ContactLink` component. `link` prop is validated with `phoneSchema`. If link is not valid it will return `BadLink` component.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    link: {
      options: ['asText', 'asURL', 'badText1', 'badText2', 'badURL'],
      mapping: {
        asText: '01 234 5678',
        asURL: new URL('tel:01 234 5678'),
        badText1: 'tel:01 234 5678',
        badText2: '12-34-5678a',
        badURL: new URL('https://www.google.com'),
      },
      description:
        'The link prop must be a valid phone number as string or URL with `tel:` protocol.',
    },
  },
} satisfies Meta<typeof Phone>;

export default meta;

type Story = StoryObj<typeof Phone>;

export const LinkPropAsString: Story = {
  args: {
    link: '01 234 5678',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Link prop as string. The string must be a valid phone number. If not, it will return `BadLink` component.',
      },
    },
  },
};

export const LinkPropAsURL: Story = {
  args: {
    link: new URL('tel:01 234 5678'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Link prop as URL. The URL protocol must be `tel:`. If not, it will return `BadLink` component. `Show code` button will show the code for this story but it is not correct. You should pass `new URL("tel:+386 1 234 5678")` as link prop. ',
      },
    },
  },
};
