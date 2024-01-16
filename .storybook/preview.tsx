import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ClientProviders } from '../src/components/client-providers';
import type { Preview } from '@storybook/react';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/sl',
      },
    },
  },
  decorators: [
    Story => (
      <ClientProviders>
        <Story />
      </ClientProviders>
    ),
  ],
};

export default preview;
