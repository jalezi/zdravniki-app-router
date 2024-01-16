'use client';

import { ReactNode } from 'react';

import * as TooltipRadix from '@radix-ui/react-tooltip';

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
}

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <TooltipRadix.Root>
      <TooltipRadix.Trigger asChild>{children}</TooltipRadix.Trigger>
      <TooltipRadix.Portal>
        <TooltipRadix.Content
          className='select-none rounded bg-text-700 px-4 py-2 text-sm leading-none text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade'
          sideOffset={5}
        >
          {content}
          <TooltipRadix.Arrow className='fill-text-700' />
        </TooltipRadix.Content>
      </TooltipRadix.Portal>
    </TooltipRadix.Root>
  );
}
