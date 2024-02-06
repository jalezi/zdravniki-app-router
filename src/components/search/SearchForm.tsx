'use client';

import type { FormEvent } from 'react';

import { useScopedI18n } from '@/locales/client';

import { Search, SelectDoctorType } from '.';

export const SearchForm = function SearchForm() {
  const t = useScopedI18n('navLinks');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-wrap gap-x-2 gap-y-1 py-2'
    >
      <SelectDoctorType />
      <Search placeholder={`${t('search')}...`} />
    </form>
  );
};

export default SearchForm;
