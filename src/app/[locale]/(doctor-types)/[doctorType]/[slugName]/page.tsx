import { notFound } from 'next/navigation';

import { setStaticParamsLocale } from 'next-international/server';

import { BaseParams } from '@/types';

export interface FakePageParams {
  params: BaseParams;
}

export default function FakePage({ params }: FakePageParams) {
  setStaticParamsLocale(params.locale);

  return notFound();
}
