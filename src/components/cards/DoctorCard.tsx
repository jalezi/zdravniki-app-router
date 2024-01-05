import React from 'react';

import Link from 'next/link';

export interface BasicInfoProps {
  doctor: string;
  fullAddress: string;
  href: string;
  institutionName: string;
}

export function BasicInfo({
  doctor: name,
  fullAddress: address,
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
  doctor: string;
  fullAddress: string;
  href: string;
  institutionName: string;
}

export default function DoctorCard({
  doctor: name,
  fullAddress: address,
  href,
  institutionName,
}: DoctorCardProps) {
  return (
    <div className='doctor-card-container'>
      <div className='doctor-card '>
        <div className='doctor-card__map '>
          <div className=''>Map</div>
        </div>
        <div className='doctor-card__content'>
          <BasicInfo
            doctor={name}
            fullAddress={address}
            href={href}
            institutionName={institutionName}
          />
        </div>
      </div>
    </div>
  );
}
