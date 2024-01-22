import { Email } from '@/components/ui/contact-links/ContactLink';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ui/ContactLink/Email Link',
  component: Email,

  parameters: {
    docs: {
      description: {
        component:
          'A link to an email address. It returns `ContactLink` component. `link` prop is validated with `emailSchema`. If link is not valid it will return `BadLink` component.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    link: {
      options: ['asText', 'asURL', 'badText1', 'badText2'],
      mapping: {
        asText: 'example@example.com',
        asURL: new URL('mailto:example@example.com'),
        badText1: 'mailto:example@example',
        badText2: 'example@example',
      },
    },
  },
} satisfies Meta<typeof Email>;

export default meta;

type Story = StoryObj<typeof Email>;

export const LinkPropAsString: Story = {
  args: {
    link: 'example@example.com',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Link prop as string. The string must be a valid email address. If not, it will return `BadLink` component.',
      },
    },
  },
};

export const LinkPropAsURL: Story = {
  args: {
    link: new URL('mailto:example@example.com'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Link prop as URL. The URL protocol must be `mailto:`. If not, it will return `BadLink` component. `Show code` button will show the code for this story but it is not correct. You should pass `new URL("mailto:email@something.com")` as link prop. ',
      },
    },
  },
};
