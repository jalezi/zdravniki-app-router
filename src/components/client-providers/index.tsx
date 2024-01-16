'use client';

import { ReactNode } from 'react';

import * as TooltipRadix from '@radix-ui/react-tooltip';

export const ClientProviders = function ClientProviders({
  children,
}: {
  children: ReactNode;
}) {
  return <TooltipRadix.Provider>{children}</TooltipRadix.Provider>;
};

export default ClientProviders;
