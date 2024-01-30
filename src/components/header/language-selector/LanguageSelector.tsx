'use-client';

import { ButtonHTMLAttributes, useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import {
  ChevronDownIcon,
  ChevronUpIcon,
  LanguagesIcon,
} from '@/components/icons';
import { cn } from '@/lib/utils';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import { Locales } from '@/locales/config';

export interface LanguageSelectorProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Language selector component.
 * Accepts all props of a button element.
 */
export default function LanguageSelector({
  className,
  ...props
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  const buttonStyles = cn(
    'flex items-center gap-1 rounded-md border border-text-500 px-1 py-2 text-sm font-semibold hover:text-text-500/70',
    className
  );

  return (
    <DropdownMenu.Root onOpenChange={() => setOpen(prev => !prev)}>
      <DropdownMenu.Trigger asChild>
        <button className={buttonStyles} {...props}>
          <LanguagesIcon className='text-[1.25rem]' />
          {locale.toLocaleUpperCase()}
          {open ? (
            <ChevronUpIcon className='text-[0.875rem]' />
          ) : (
            <ChevronDownIcon className='text-[0.875rem]' />
          )}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align='end'
        sideOffset={5}
        className='min-w-[8rem] overflow-hidden rounded-md border border-text-400 bg-white'
        avoidCollisions
      >
        <DropdownMenu.RadioGroup
          className='flex flex-col gap-1  bg-white py-1 text-right text-sm child:cursor-pointer child:px-2 child:py-1 child:text-text-500 hover:child:bg-brand-200 focus-visible:child:bg-brand-200 focus-visible:child:outline-none'
          onValueChange={value => changeLocale(value as Locales)}
          value={locale}
        >
          <DropdownMenu.RadioItem
            value='en'
            className='data-[state=checked]:underline'
          >
            English
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem
            value='it'
            className='data-[state=checked]:underline'
          >
            Italiano
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem
            value='sl'
            className='data-[state=checked]:underline'
          >
            Slovenščina
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
