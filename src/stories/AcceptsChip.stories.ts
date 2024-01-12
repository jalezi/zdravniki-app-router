import { Meta, StoryObj } from '@storybook/react';

import AcceptsChip from '@/components/chips/AcceptsChip';
// import { doctor as EN_DOCTOR_TRANSLATIONS } from '@/locales/en/doctor';
// import { doctor as IT_DOCTOR_TRANSLATIONS } from '@/locales/it/doctor';
// import { doctor as SL_DOCTOR_TRANSLATIONS } from '@/locales/sl/doctor';

// const acceptsText = [
//   SL_DOCTOR_TRANSLATIONS.accepts.y.label,
//   EN_DOCTOR_TRANSLATIONS.accepts.y.label,
//   IT_DOCTOR_TRANSLATIONS.accepts.y.label,
//   SL_DOCTOR_TRANSLATIONS.accepts.n.label,
//   EN_DOCTOR_TRANSLATIONS.accepts.n.label,
//   IT_DOCTOR_TRANSLATIONS.accepts.n.label,
// ];

const meta = {
  title: 'Chips/AcceptsChip',
  component: AcceptsChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A chip component that shows if the doctor is accepting new patients. The chip color and icon changes depending on the value of the `accepts` prop. The text in app is translated based on the current locale.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    size: 'xs',
    iconSize: 'base',
  },
  argTypes: {
    accepts: {
      control: 'inline-radio',
      options: ['y', 'n'],
      description: 'Determines chip color and icon',
      table: {
        category: 'Appearance',
        subcategory: 'Background Color',
      },
    },

    text: {
      control: 'text',
      description: 'The text to display',
      table: {
        category: 'Appearance',
        subcategory: 'Text',
        disable: true,
      },
    },
    size: {
      table: {
        category: 'Appearance',
        subcategory: 'Text',
        defaultValue: {
          summary: 'xs',
        },
      },
      description: 'The font size of the chip text',
    },
    iconSize: {
      table: {
        category: 'Appearance',
        subcategory: 'Icon',
        defaultValue: {
          summary: 'base',
        },
      },
      description: 'The size of the icon',
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof AcceptsChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Accepts: Story = {
  args: {
    accepts: 'y',
    text: 'Accepts',
  },
};

export const DoesNotAccept: Story = {
  args: {
    accepts: 'n',
    text: 'Not accepting',
  },
};
