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
    label: {
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
    label: 'Chip',
  },
};

export const Accepts: Story = {
  args: {
    label: 'Uppercase',
    variant: 'accepts',
  },
};

export const Left: Story = {
  args: {
    label: 'No right rounded corners',
    variant: 'left',
  },
};

export const Right: Story = {
  args: {
    label: 'No left rounded corners',
    variant: 'right',
    iconPosition: 'end',
  },
};

export const Clinic: Story = {
  args: {
    label: 'Clinic',
    colors: 'clinic',
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    colors: 'success',
  },
};

export const Error: Story = {
  args: {
    label: 'Error',
    colors: 'error',
  },
};

export const Subtype: Story = {
  args: {
    label: 'Subtype background',
    colors: 'subtype',
  },
};

export const IconStart: Story = {
  args: {
    label: 'Icon on the left',
    icon: 'LogoIcon',
    iconPosition: 'start',
  },
};

export const IconEnd: Story = {
  args: {
    label: 'Icon on the right',
    icon: 'LogoIcon',
    iconPosition: 'end',
  },
};

export const IconXL: Story = {
  args: {
    label: 'XL Icon',
    icon: 'LogoIcon',
    size: 'xl',
  },
};

export const IconLG: Story = {
  args: {
    label: 'LG Icon',
    icon: 'LogoIcon',
    size: 'lg',
  },
};

export const IconBase: Story = {
  args: {
    label: 'Base Icon',
    icon: 'LogoIcon',
    size: 'base',
  },
};

export const IconSM: Story = {
  args: {
    label: 'SM Icon',
    icon: 'LogoIcon',
    iconSize: 'sm',
  },
};

export const IconXS: Story = {
  args: {
    label: 'XS Icon',
    icon: 'LogoIcon',
    size: 'xs',
  },
};

export const DifferentSizes: Story = {
  args: {
    label: 'Different sizes',
    icon: 'LogoIcon',
    size: 'xxs',
    iconSize: 'xl',
  },
};
