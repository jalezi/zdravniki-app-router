import { Orderform } from '@/components/ui/contact-links/ContactLink';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ui/ContactLink/Orderform Link',
  component: Orderform,

  parameters: {
    docs: {
      description: {
        component:
          'A link to a either email or website. It returns `ContactLink` component. `link` prop is validated with `orderformScheam`. If link is not valid it will return `BadLink` component.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    link: {
      options: ['asText', 'asURL', 'badText1', 'badText2', 'badURL'],
      mapping: {
        asText: 'orderform@example.com',
        asURL: new URL('https://example.com'),
        badText1: 'mailto:orderform@example.com',
        badText2: 'orderform @example.com',
        badURL: new URL('tel:01 123 4567'),
      },
      description:
        'The link prop must be a valid either email or website as string or URL with appropriate protocol.',
    },
  },
} satisfies Meta<typeof Orderform>;

export default meta;

type Story = StoryObj<typeof Orderform>;

export const LinkPropAsString: Story = {
  args: {
    link: 'orderform@example.com',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Link prop as string. The string must be a valid either email or website. If not, it will return `BadLink` component.',
      },
    },
  },
};

export const LinkPropAsURL: Story = {
  args: {
    link: new URL('https://orderform.example.com'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Link prop as URL. The URL protocol must be appropriate protocol. If not, it will return `BadLink` component. `Show code` button will show the code for this story but it is not correct. You should pass `new URL("tel:+386 1 234 5678")` as link prop. ',
      },
    },
  },
};
