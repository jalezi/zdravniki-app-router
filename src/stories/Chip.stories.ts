import { Meta, StoryObj } from '@storybook/react';

import { icons } from '@/components/icons/import-svg';
import { Chip, ChipProps } from '@/components/ui/chip/Chips';

type Colors = NonNullable<ChipProps['colors']>;
type Variant = NonNullable<ChipProps['variant']>;

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A chip component. It can be used to display a small amount of information.
        You can set the size of the chip either with the \`size\` prop or with the \`iconSize\` prop.
        If you need different sizes for the icon and the text,
        you can use the \`iconSize\` prop for the icon and the \`size\` prop for the text.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accepts', 'left', 'right'] satisfies Variant[],
      description: 'The variant of the chip',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    colors: {
      control: 'select',
      options: [
        'default',
        'subtype',
        'success',
        'error',
        'clinic',
      ] satisfies Colors[],
      description: 'The color of the chip',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    icon: {
      control: 'select',
      options: Object.keys(icons).filter(icon => icon !== 'Logo'),
      description: 'The icon to display',
    },
    text: {
      control: 'text',
      description: 'The text to display',
    },
    size: {
      table: {
        defaultValue: {
          summary: 'xs',
        },
      },
    },
    iconSize: {
      table: {
        defaultValue: {
          summary: 'base',
        },
      },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Chip',
  },
};

export const Accepts: Story = {
  args: {
    text: 'Uppercase',
    variant: 'accepts',
  },
};

export const Left: Story = {
  args: {
    text: 'No right rounded corners',
    variant: 'left',
  },
};

export const Right: Story = {
  args: {
    text: 'No left rounded corners',
    variant: 'right',
    iconPosition: 'end',
  },
};

export const Clinic: Story = {
  args: {
    text: 'Clinic',
    colors: 'clinic',
  },
};

export const Success: Story = {
  args: {
    text: 'Success',
    colors: 'success',
  },
};

export const Error: Story = {
  args: {
    text: 'Error',
    colors: 'error',
  },
};

export const Subtype: Story = {
  args: {
    text: 'Subtype background',
    colors: 'subtype',
  },
};

export const IconStart: Story = {
  args: {
    text: 'Icon on the left',
    icon: 'LogoIcon',
    iconPosition: 'start',
  },
};

export const IconEnd: Story = {
  args: {
    text: 'Icon on the right',
    icon: 'LogoIcon',
    iconPosition: 'end',
  },
};

export const IconXL: Story = {
  args: {
    text: 'XL Icon',
    icon: 'LogoIcon',
    size: 'xl',
  },
};

export const IconLG: Story = {
  args: {
    text: 'LG Icon',
    icon: 'LogoIcon',
    size: 'lg',
  },
};

export const IconBase: Story = {
  args: {
    text: 'Base Icon',
    icon: 'LogoIcon',
    size: 'base',
  },
};

export const IconSM: Story = {
  args: {
    text: 'SM Icon',
    icon: 'LogoIcon',
    iconSize: 'sm',
  },
};

export const IconXS: Story = {
  args: {
    text: 'XS Icon',
    icon: 'LogoIcon',
    size: 'xs',
  },
};

export const DifferentSizes: Story = {
  args: {
    text: 'Different sizes',
    icon: 'LogoIcon',
    size: 'xxs',
    iconSize: 'xl',
  },
};
