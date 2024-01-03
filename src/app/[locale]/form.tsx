'use client';

import { useSearchParams } from 'next/navigation';

import { DEFAULT_SEARCH_PARAMS, MIN_MAX_PAGE_SIZE } from '@/lib/schemas';

import { handleFormSubmit } from './actions';
import { defaultsSearchParamsSchema } from './utils';

export function Form({ total }: { total: number }) {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const parsedParams = defaultsSearchParamsSchema.safeParse({
    type,
    page,
    pageSize,
  });

  const parsedSearchParams = parsedParams.success
    ? parsedParams.data
    : defaultsSearchParamsSchema.parse({});

  const maxPage = Math.floor(total / parsedSearchParams.pageSize) + 1;
  const defaultPage =
    parsedSearchParams.page > maxPage ? maxPage : parsedSearchParams.page;

  return (
    <form
      key={parsedSearchParams.toString()}
      action={handleFormSubmit}
      className='px-4 py-4'
    >
      <fieldset className='flex flex-wrap gap-2 px-4 py-4 '>
        <label>
          All{' '}
          <input
            type='radio'
            value='all'
            name='type'
            defaultChecked={parsedSearchParams.type === 'all'}
          />
        </label>
        <label>
          general practitioner{' '}
          <input
            type='radio'
            value='gp'
            name='type'
            defaultChecked={parsedSearchParams.type === 'gp'}
          />
        </label>
        <label>
          pediater{' '}
          <input
            type='radio'
            value='ped'
            name='type'
            defaultChecked={parsedSearchParams.type === 'ped'}
          />
        </label>
        <label>
          gynecologist{' '}
          <input
            type='radio'
            value='gyn'
            name='type'
            defaultChecked={parsedSearchParams.type === 'gyn'}
          />
        </label>
        <label>
          dentist{' '}
          <input
            type='radio'
            value='den'
            name='type'
            defaultChecked={parsedSearchParams.type === 'den'}
          />
        </label>
        <label>
          dentist youth{' '}
          <input
            type='radio'
            value='den-y'
            name='type'
            defaultChecked={parsedSearchParams.type === 'den-y'}
          />
        </label>
        <label>
          dentist student{' '}
          <input
            type='radio'
            value='den-s'
            name='type'
            defaultChecked={parsedSearchParams.type === 'den-s'}
          />
        </label>
      </fieldset>
      <fieldset className='flex flex-wrap gap-2 px-4 py-4'>
        <label>
          Page{' '}
          <input
            type='number'
            min={DEFAULT_SEARCH_PARAMS.page}
            max={maxPage}
            name='page'
            defaultValue={defaultPage}
          />
        </label>
        <label>
          Page Size{' '}
          <input
            type='number'
            min={MIN_MAX_PAGE_SIZE.min}
            max={MIN_MAX_PAGE_SIZE.max}
            step='5'
            name='pageSize'
            defaultValue={parsedSearchParams.pageSize}
          />
        </label>
      </fieldset>
      <input
        type='submit'
        value={'submit'}
        className='cursor-pointer rounded-lg bg-brand-800 px-4 py-2 font-medium text-white'
      />
    </form>
  );
}
