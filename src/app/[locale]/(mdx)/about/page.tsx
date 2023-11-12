import { Locales } from '@/locales/server';

export type AboutPageProps = {
  params: {
    locale: Locales;
  };
};
export default function AboutPage({ params }: AboutPageProps) {
  return (
    <div>
      <h1>AboutPage</h1>
      <code>{JSON.stringify(params)}</code>
    </div>
  );
}
