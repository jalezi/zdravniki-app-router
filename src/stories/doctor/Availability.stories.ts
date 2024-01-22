// this story does not work because it is server component;

import { Meta, StoryObj } from '@storybook/react';

import AvailabilityComponent from '@/components/cards/doctor/Availability';

const meta = {
  title: 'Cards/Doctor',
  component: AvailabilityComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "A card component that displays the doctor's availability. The text in app is translated based on the current locale.",
      },
    },
  },

  argTypes: {
    availability: {
      control: 'inline-radio',
      options: [0.2, 0.4, 0.8, 1.2],
      description:
        'The doctor availability. Number is converted to percentage.',
    },
  },
} satisfies Meta<typeof AvailabilityComponent>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Availability: Story = {
  args: {
    availability: 0.1,
  },
};
