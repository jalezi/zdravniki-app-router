import { Locales } from '@/locales/server';

type DoctorsPageProps = {
  params: {
    locale: Locales;
    doctorType: string;
  };
};

export default function DoctorsPage({ params }: DoctorsPageProps) {
  return (
    <div>
      <h1>DoctorsPage</h1>
      <code>{JSON.stringify(params)}</code>
    </div>
  );
}