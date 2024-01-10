import fs from 'node:fs/promises';
import path from 'node:path';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { LatLngTuple } from 'leaflet';
import { getPlaiceholder } from 'plaiceholder';
import { z } from 'zod';

import fakeImageMap from '@/assets/images/fake-map-512-16-9.jpeg';
import {
  AcceptsNewPatients,
  DoctorTypeCsv,
  doctorCsvTypeSchema,
} from '@/lib/schemas';
import { getScopedI18n } from '@/locales/server';

import { DOCTOR_ICONS } from '../icons';
import { Chip } from '../ui/chip';

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

const extractBaseType = doctorCsvTypeSchema.transform((val, ctx) => {
  if (val.startsWith('gp')) {
    return 'gp' as const;
  }
  if (val.startsWith('den')) {
    return 'den' as const;
  }

  if (val.startsWith('ped')) {
    return 'ped' as const;
  }

  if (val.startsWith('gyn')) {
    return 'gyn' as const;
  }

  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: `Invalid type: ${val}`,
    params: { val },
    fatal: true,
  });

  return z.NEVER;
});

const extractSubtype = doctorCsvTypeSchema.transform((val, ctx) => {
  if (val.endsWith('-y')) {
    return 'y' as const;
  }

  if (val.endsWith('-s')) {
    return 's' as const;
  }

  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: `Invalid type: ${val}`,
    params: { val },
    fatal: true,
  });

  return z.NEVER;
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
  const tDoctorType = await getScopedI18n('doctor.type');
  const tDoctorSubtype = await getScopedI18n('doctor.subtype');

  const baseType = extractBaseType.safeParse(type);
  const subtype = extractSubtype.safeParse(type);

  const baseTypeIcon = baseType.success ? DOCTOR_ICONS[baseType.data] : null;
  const subtypeIcon = subtype.success ? DOCTOR_ICONS[subtype.data] : null;

  const doctorText = baseType.success ? tDoctorType(baseType.data) : null;
  const subtypeText = subtype.success
    ? tDoctorSubtype(`${subtype.data}.label`)
    : null;

  return (
    <div className='doctor-card-container'>
      <div className='doctor-card'>
        <DoctorMap center={geoLocation} />
        <div className='doctor-card__content'>
          <span className='inline-flex items-center'>
            <Chip.Root variant={subtype.success ? 'left' : 'default'}>
              {baseTypeIcon ? (
                <Chip.Icon iconName={baseTypeIcon?.name} />
              ) : null}
              <Chip.Text>{doctorText}</Chip.Text>
            </Chip.Root>
            {subtype.success ? (
              <Chip.Root variant='right' colors='subtype'>
                <Chip.Text>{subtypeText}</Chip.Text>
                {subtypeIcon ? (
                  <Chip.Icon iconName={subtypeIcon?.name} />
                ) : null}
              </Chip.Root>
            ) : null}
          </span>
          {acceptsNewPatients.toString()}{' '}
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
