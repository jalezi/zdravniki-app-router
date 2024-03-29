import fs from 'node:fs/promises';
import path from 'node:path';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { getPlaiceholder } from 'plaiceholder';

import fakeImageMap from '@/assets/images/fake-map-512-16-9.jpeg';
import type {
  AcceptsNewPatients,
  DateSchema,
  DoctorTypeCsv,
} from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

import type { LatLngTuple } from 'leaflet';

const Accepts = dynamic(() => import('./doctor').then(mod => mod.Accepts));
const Availability = dynamic(() =>
  import('./doctor').then(mod => mod.Availability)
);
const BasicInfo = dynamic(() => import('./doctor').then(mod => mod.BasicInfo));
const Contacts = dynamic(() => import('./doctor').then(mod => mod.Contacts));

const baseBasePath = path.join(process.cwd(), 'src', 'assets', 'images');
const filePath = path.join(baseBasePath, 'fake-map-512-16-9.jpeg');
const file = await fs.readFile(filePath);

const data = await getPlaiceholder(file);

const DoctorMap = dynamic(() => import('../map').then(mod => mod.DoctorMap), {
  ssr: false,
  loading: () => {
    return (
      <div className='doctor-card__map child:h-full '>
        <Image
          src={fakeImageMap}
          alt='fake map'
          placeholder='blur'
          blurDataURL={data.base64}
          priority
        />
      </div>
    );
  },
});

export interface DoctorCardProps {
  acceptsNewPatients: AcceptsNewPatients;
  name: string;
  type: DoctorTypeCsv;
  address: string;
  href: string;
  institutionName: string;
  geoLocation: LatLngTuple;
  availability: number;
  load: number;
  noteOverride: string | null;
  dateOverride: DateSchema | null;
  email: string;
  phone: string;
  website: string;
  orderform: string;
}

export default async function DoctorCard({
  name,
  type,
  address,
  href,
  institutionName,
  acceptsNewPatients,
  geoLocation,
  availability,
  load,
  noteOverride,
  dateOverride,
  email,
  phone,
  website,
  orderform,
}: DoctorCardProps) {
  const t = await getScopedI18n('doctor');
  const acceptsText = t(`accepts.${acceptsNewPatients}.label`);

  const acceptsOverrideProps =
    dateOverride && noteOverride
      ? {
          date: dateOverride,
          note: noteOverride,
        }
      : {
          date: null,
          note: null,
        };

  const styles = cn(
    'doctor-card h-full bg-white shadow-lg before:absolute before:inset-0 before:border-b-4 before:border-b-transparent before:-z-[1] before:rounded-2xl before:transition-all before:duration-367 transition-all duration-367',
    acceptsNewPatients === 'y' &&
      'shadow-green-800/20 hover:shadow-green-800/50 before:hover:border-b-green-800/50 focus-within:shadow-green-800/50 before:focus-within:border-b-green-800/50',
    acceptsNewPatients === 'n' &&
      'shadow-red-800/20 hover:shadow-red-800/50 before:hover:border-b-red-800/50 focus-within:shadow-red-800/50 before:focus-within:border-b-red-800/50'
  );

  return (
    <section className={styles} aria-label={name}>
      <DoctorMap center={geoLocation} doubleClickZoom={false} />
      <div className='doctor-card__content flex flex-col gap-2'>
        <BasicInfo
          name={name}
          address={address}
          href={href}
          institutionName={institutionName}
          type={type}
        />
        <div className='flex flex-wrap gap-2'>
          <Accepts
            acceptsNewPatients={acceptsNewPatients}
            acceptsText={acceptsText}
            load={load}
            {...acceptsOverrideProps}
          />
          {availability >= 0 ? (
            <Availability availability={availability} />
          ) : null}
        </div>
        <address className='text-sm not-italic'>
          {email ? <Contacts as='email' contactValue={email} /> : null}
          {email && phone ? <br /> : null}
          {phone ? <Contacts as='phone' contactValue={phone} /> : null}
          {website && (email || phone) ? <br /> : null}
          {website ? <Contacts as='website' contactValue={website} /> : null}
          {orderform && (email || phone || website) ? <br /> : null}
          {orderform ? (
            <Contacts as='orderform' contactValue={orderform} />
          ) : null}
        </address>
      </div>
    </section>
  );
}
