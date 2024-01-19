import fs from 'node:fs/promises';
import path from 'node:path';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { LatLngTuple } from 'leaflet';
import { getPlaiceholder } from 'plaiceholder';

import fakeImageMap from '@/assets/images/fake-map-512-16-9.jpeg';
import {
  AcceptsNewPatients,
  DateSchema,
  DoctorTypeCsv,
  Emails,
  Phones,
  Websites,
} from '@/lib/schemas';
import { getScopedI18n } from '@/locales/server';

import Doctor, { Accepts } from './doctor';

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
  note: string | null;
  date: DateSchema | null;
  emails: Emails | null;
  phones: Phones | null;
  websites: Websites | null;
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
  note,
  date,
  emails,
  phones,
  websites,
}: DoctorCardProps) {
  const t = await getScopedI18n('doctor');
  const acceptsText = t(`accepts.${acceptsNewPatients}.label`);
  return (
    <div className='doctor-card-container'>
      <article className='doctor-card'>
        <DoctorMap center={geoLocation} />
        <div className='doctor-card__content flex flex-col gap-1'>
          <Doctor.BasicInfo
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
              date={date}
              note={note}
            />
            {availability >= 0 ? (
              <Doctor.Availability availability={availability} />
            ) : null}
          </div>
          <address className='text-sm not-italic'>
            {emails
              ? emails.map((email, index) => (
                  <Doctor.ContactLink
                    key={`${email}_${index}`}
                    as='email'
                    href={email}
                  />
                ))
              : null}
            {emails && phones ? <br /> : null}
            {phones
              ? phones.map((phone, index) => (
                  <Doctor.ContactLink
                    key={`${phone}_${index}`}
                    as='phone'
                    href={phone}
                  />
                ))
              : null}
            {phones && websites ? <br /> : null}
            {websites
              ? websites.map((website, index) => (
                  <Doctor.ContactLink
                    key={`${website.toString()}_${index}`}
                    as='website'
                    href={website}
                  />
                ))
              : null}
          </address>
        </div>
      </article>
    </div>
  );
}
