import Link from 'next/link';

import { DoctorClinicChip, DoctorTypeChip } from '@/components/chips';
import { DoctorTypeCsv } from '@/lib/schemas';

export interface BasicInfoProps {
  name: string;
  address: string;
  href: string;
  institutionName: string;
  type: DoctorTypeCsv;
}

export default function BasicInfo({
  name,
  address,
  href,
  institutionName,
  type,
}: BasicInfoProps) {
  return (
    <div className='doctor-card__basic-info'>
      <Link href={href}>
        <h2 className='text-xl font-bold'>{name}</h2>
      </Link>
      <div className='flex flex-wrap gap-2'>
        <DoctorTypeChip type={type} />
        <DoctorClinicChip type={type} />
      </div>
      <address className='text-xs not-italic'>
        <p className=' font-bold uppercase'>{institutionName}</p>
        <p className='text-text-400'>{address}</p>
      </address>
    </div>
  );
}
