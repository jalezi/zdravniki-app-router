'use client';

import type { ChangeEvent } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';

import { SearchIcon, XIcon } from '../icons';

export interface SearchProps {
  placeholder?: string;
}

const Search = function Search({ placeholder = 'search...' }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleQuery = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      if (event.target.value) {
        params.set('query', event.target.value);
      } else {
        params.delete('query');
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    const input = document.getElementById('query') as HTMLInputElement;
    input.value = '';
    params.delete('query');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='relative flex items-center gap-2 rounded-3xl border-2 border-text-50 bg-white px-4 py-2 focus-within:border-brand-500'>
      <label htmlFor='query' className=''>
        <SearchIcon className='' />
      </label>
      <input
        id='query'
        type='search'
        onChange={handleQuery}
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
        className='flex-1 focus:outline-none'
      />
      <button type='button' onClick={handleClear}>
        {searchParams.get('query') ? <XIcon className='' /> : null}
      </button>
    </div>
  );
};

export default Search;
