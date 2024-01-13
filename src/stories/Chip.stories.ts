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
        component: 'A chip component.',
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
      options: Object.keys(icons),
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

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    text: 'Chip',
    icon: 'CheckCircleIcon',
  },
};
