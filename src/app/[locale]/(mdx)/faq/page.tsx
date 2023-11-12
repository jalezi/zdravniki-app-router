import { Locales } from '@/locales/server';

export type FaqPageProps = {
  params: {
    locale: Locales;
  };
};

export default function FaqPage({ params }: FaqPageProps) {
  return (
    <div>
      <h1>FaqPage</h1>
      <code>{JSON.stringify(params)}</code>
    </div>
  );
}
