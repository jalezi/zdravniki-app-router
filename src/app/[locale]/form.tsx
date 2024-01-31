'use client';

import { useCallback, useRef, useState } from 'react';

import { useFormState, useFormStatus } from 'react-dom';

import { ALLOWED_PAGE_SIZES, FilterDoctorTypeParam } from '@/lib/schemas';
import { cn } from '@/lib/utils';

import { handleFormSubmit } from './actions';
import { DefaultsSearchParams } from './utils';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  const styles = cn('cursor-pointer', pending && 'opacity-50');

  return (
    <input
      type='submit'
      className={styles}
      aria-disabled={pending}
      value={pending ? 'Submitting...' : 'Submit'}
    />
  );
};

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

  const [, formAction] = useFormState(handleFormSubmit, { message: '' });

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

  // todo - better aria-label for form
  return (
    <form ref={ref} action={formAction} aria-label='settings'>
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
          {ALLOWED_PAGE_SIZES.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <SubmitButton />
    </form>
  );
}
