// this story does not work because it is server component;

import { Meta, StoryObj } from '@storybook/react';

import AcceptsComponent from '@/components/cards/doctor/Accepts';

const meta = {
  title: 'Cards/Doctor',
  component: AcceptsComponent,
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
    acceptsNewPatients: {
      control: 'inline-radio',
      options: ['y', 'n'],
      description: 'Is doctor accepting new patients?',
    },
    acceptsText: {
      control: 'text',
      description: 'Text to display when doctor accepts new patients.',
    },
    load: {
      control: 'number',
      description: 'The doctor load.',
    },
    date: {
      control: 'date',
      description: 'The date.',
    },
    note: {
      control: 'text',
      description: 'The note.',
    },
  },
} satisfies Meta<typeof AcceptsComponent>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Accepts: Story = {
  args: {
    acceptsNewPatients: 'y',
    acceptsText: 'Accepting',
    load: 2123.22,
    date: new Date(),
    note: 'Some note',
  },
};
