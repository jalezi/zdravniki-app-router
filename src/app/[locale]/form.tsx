'use client';

import { useCallback, useRef, useState } from 'react';

import { FilterDoctorTypeParam } from '@/lib/schemas';

import { handleFormSubmit } from './actions';
import { DefaultsSearchParams } from './utils';

const OPTIONS: FilterDoctorTypeParam[] = [
  'all',
  'gp',
  'ped',
  'gyn',
  'den',
  'den-y',
  'den-s',
] as const;

export default function SearchForm({
  lengths,
  type,
  page,
  pageSize,
}: {
  lengths: Record<(typeof OPTIONS)[number], number>;
  type: DefaultsSearchParams['type'];
  page: DefaultsSearchParams['page'];
  pageSize: DefaultsSearchParams['pageSize'];
}) {
  const [length, setLength] = useState(lengths[type]);
  const ref = useRef<HTMLFormElement>(null);

  const onChange = useCallback(() => {
    const form = ref.current;

    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const formDataType = formData.get('type') as FilterDoctorTypeParam;
    const formDataPageSize = formData.get('pageSize') as string;
    const formDataPage = formData.get('page') as string;

    const newLength = lengths[formDataType];
    const maxPage = Math.floor(newLength / +formDataPageSize) + 1;

    if (+formDataPage > maxPage) {
      const pageInput =
        form.querySelector<HTMLInputElement>('input[name="page"]');

      if (pageInput) {
        pageInput.value = maxPage.toString();
        formData.set('page', maxPage.toString());
        pageInput.max = maxPage.toString();
      }
    }

    setLength(newLength);
  }, [lengths]);

  return (
    <form ref={ref} action={handleFormSubmit}>
      <label htmlFor='type' className='inline-flex items-center gap-1 px-2'>
        type
        <select name='type' id='type' defaultValue={type} onChange={onChange}>
          {OPTIONS.map(filter => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </label>
      <input
        type='number'
        name='page'
        id='page'
        min={1}
        max={Math.floor(length / +pageSize) + 1}
        defaultValue={page}
        hidden
      />
      <label htmlFor='pageSize'>
        page size
        <select
          name='pageSize'
          id='pageSize'
          defaultValue={pageSize}
          onChange={onChange}
        >
          <option value='24'>24</option>
          <option value='48'>48</option>
        </select>
      </label>
      <input type='submit' className='cursor-pointer' />
    </form>
  );
}
