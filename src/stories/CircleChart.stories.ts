import CircleChart from '@/components/ui/circle-chart';
import type { CircleChartProps } from '@/components/ui/circle-chart';

import type { Meta, StoryObj } from '@storybook/react';

type Size = NonNullable<CircleChartProps['size']>;
type Color = NonNullable<CircleChartProps['color']>;

const meta = {
  title: 'UI/CircleChart',
  component: CircleChart,

  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'A circle chart component',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: {
      control: 'select',
      options: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      description: `The value of the chart. Must be between 0 and 100. Somehow Storybook control number does not work with min/max/step, so you can use the knobs addon instead.
        My guess is that it is inherited from Typescript's number type, which does not have min/max/step properties.`,
    },
    size: {
      control: 'select',
      options: ['sm', 'md'] satisfies Size[],
      description: 'The size of the chart',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'] satisfies Color[],
      description: 'The color of the second ring',
    },
  },
} satisfies Meta<typeof CircleChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    size: 'md',
    color: 'primary',
  },
};
export const Small: Story = {
  args: {
    value: 50,
    size: 'sm',
    color: 'primary',
  },
};
export const Medium: Story = {
  args: {
    value: 50,
    size: 'md',
    color: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    value: 50,
    size: 'md',
    color: 'secondary',
  },
};
