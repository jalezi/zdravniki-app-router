import { useState } from 'react';
import { Languages } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/custom-select';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import { Locales } from '@/locales/server';

type LangSelectorLocales = Uppercase<Locales>;

const LangSelector = () => {
  const locale = useCurrentLocale();
  const [selected, setSelected] = useState(locale.toLocaleUpperCase());
  const changeLocale = useChangeLocale();

  const onValueChange = (value: LangSelectorLocales) => {
    setSelected(value);
    changeLocale(value.toLocaleLowerCase() as Locales);
  };

  return (
    <Select defaultValue={locale.toUpperCase()} onValueChange={onValueChange}>
      <SelectTrigger className='w-auto' aria-label='language selector'>
        <SelectValue placeholder='Theme'>
          <span className='flex items-center gap-[0.25rem]'>
            <SelectIcon>
              <Languages size='1.25rem' />
            </SelectIcon>
            <span>{selected}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='EN'>English</SelectItem>
        <SelectItem value='IT'>Italiano</SelectItem>
        <SelectItem value='SL'>Slovenščina</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LangSelector;
