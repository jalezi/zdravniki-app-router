import dynamic from 'next/dynamic';
import Link from 'next/link';

import { LatLngTuple } from 'leaflet';

import { AcceptsNewPatients, DoctorTypeCsv } from '@/lib/schemas';

const DoctorMap = dynamic(() => import('../map').then(mod => mod.DoctorMap), {
  ssr: false,
  loading: () => <div className='doctor-card__map child:h-full ' />,
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
          {type} {acceptsNewPatients.toString()}{' '}
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
