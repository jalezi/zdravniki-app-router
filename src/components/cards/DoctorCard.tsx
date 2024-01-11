import fs from 'node:fs/promises';
import path from 'node:path';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { LatLngTuple } from 'leaflet';
import { getPlaiceholder } from 'plaiceholder';

import fakeImageMap from '@/assets/images/fake-map-512-16-9.jpeg';
import { AcceptsNewPatients, DoctorTypeCsv } from '@/lib/schemas';

import { AcceptsChip, DoctorClinicChip, DoctorTypeChip } from '../chips';

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

export interface BasicInfoProps {
  name: string;
  address: string;
  href: string;
  institutionName: string;
}

export function BasicInfo({
  name,
  address,
  href,
  institutionName,
}: BasicInfoProps) {
  return (
    <div className='doctor-card__basic-info'>
      <Link href={href}>
        <h2 className='text-xl font-bold'>{name}</h2>
      </Link>
      <address className='text-xs not-italic'>
        <p className=' font-bold uppercase'>{institutionName}</p>
        <p className='text-text-400'>{address}</p>
      </address>
    </div>
  );
}

export interface DoctorCardProps {
  acceptsNewPatients: AcceptsNewPatients;
  name: string;
  type: DoctorTypeCsv;
  address: string;
  href: string;
  institutionName: string;
  geoLocation: LatLngTuple;
}

export default async function DoctorCard({
  name,
  type,
  address,
  href,
  institutionName,
  acceptsNewPatients,
  geoLocation,
}: DoctorCardProps) {
  return (
    <div className='doctor-card-container'>
      <div className='doctor-card'>
        <DoctorMap center={geoLocation} />
        <div className='doctor-card__content'>
          <div className='flex flex-wrap gap-2'>
            <DoctorTypeChip type={type} />
            <DoctorClinicChip type={type} />
          </div>
          <AcceptsChip accepts={acceptsNewPatients} />
          <BasicInfo
            name={name}
            address={address}
            href={href}
            institutionName={institutionName}
          />
        </div>
      </div>
    </div>
  );
}
