import fs from 'node:fs/promises';
import path from 'node:path';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { LatLngTuple } from 'leaflet';
import { getPlaiceholder } from 'plaiceholder';

import fakeImageMap from '@/assets/images/fake-map-512-16-9.jpeg';
import { AcceptsNewPatients, DoctorTypeCsv } from '@/lib/schemas';

import Doctor from './doctor';
import { AcceptsChip } from '../chips';
import CircleChart from '../ui/circle-chart';

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
        <div className='doctor-card__content flex flex-col gap-1'>
          <span className='relative aspect-square w-8'>
            <CircleChart value={0.5} className='absolute inset-0 text-[2rem]' />
            <CircleChart
              value={0.5}
              className='absolute left-[50%] top-[50%] -translate-x-2/4 -translate-y-1/2 text-[1.25rem]'
            />
          </span>
          <Doctor.BasicInfo
            name={name}
            address={address}
            href={href}
            institutionName={institutionName}
            type={type}
          />
          <div>
            <AcceptsChip accepts={acceptsNewPatients} />
          </div>
        </div>
      </div>
    </div>
  );
}
