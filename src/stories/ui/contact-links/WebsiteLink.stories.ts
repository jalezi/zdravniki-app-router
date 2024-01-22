import { Website } from '@/components/ui/contact-links/ContactLink';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ui/ContactLink/Website Link',
  component: Website,

  parameters: {
    docs: {
      description: {
        component:
          'A link to a web address. It returns `ContactLink` component. `link` prop is validated with `websiteSchema`. If link is not valid it will return `BadLink` component.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    link: {
      options: ['asText', 'asURL', 'badText1', 'badText2', 'badURL'],
      mapping: {
        asText: 'https://example.com',
        asURL: new URL('https://example.com'),
        badText1: 'www.example.com',
        badText2: 'ftp://example.com/123234',
        badURL: new URL('mailto:example@example.com'),
      },
      description:
        'The link prop must be a valid web address as string or URL with `tel:` protocol.',
    },
  },
} satisfies Meta<typeof Website>;

export default meta;

type Story = StoryObj<typeof Website>;

export const LinkPropAsString: Story = {
  args: {
    link: 'https://example.com',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Link prop as string. The string must be a valid web address. If not, it will return `BadLink` component.',
      },
    },
  },
};

export const LinkPropAsURL: Story = {
  args: {
    link: new URL('https://example.com'),
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
