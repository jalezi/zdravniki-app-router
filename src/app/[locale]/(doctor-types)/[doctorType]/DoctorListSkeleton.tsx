import fs from 'node:fs/promises';
import path from 'path';

import Image from 'next/image';

import { getPlaiceholder } from 'plaiceholder';

import fakeImageMap from '@/assets/images/fake-map-512-16-9.jpeg';

const baseBasePath = path.join(process.cwd(), 'src', 'assets', 'images');
const filePath = path.join(baseBasePath, 'fake-map-512-16-9.jpeg');
const file = await fs.readFile(filePath);

const data = await getPlaiceholder(file);

export interface DoctorListSkeletonProps {
  length: number;
}

const DoctorListSkeleton = function DoctorListSkeleton({
  length,
}: DoctorListSkeletonProps) {
  return Array.from({
    length,
  }).map((_, i) => (
    <li key={i} className='mx-auto max-w-[60rem]'>
      <div className='doctor-card animate-pulse'>
        <div className='doctor-card__map  child:h-full '>
          <Image
            src={fakeImageMap}
            width={512}
            height={192}
            alt='fake map'
            placeholder='blur'
            blurDataURL={data.base64}
            priority
          />
        </div>
        <div className='doctor-card__content flex flex-col gap-2'>
          <div className='child:my-1 child:rounded-md child:bg-text-50'>
            <div className='h-7  ' />
            <div className='h-[1.75rem]  ' />
            <div className='h-4' />
            <div className='h-4' />
          </div>
          <div className='flex flex-wrap gap-2 child:bg-text-50'>
            <div className='h-[1.75rem] w-28 rounded-md' />
            <div className='h-[1.75rem] w-[1.75rem] rounded-full' />
          </div>
          <div className='child:my-1 child:rounded-md child:bg-text-50'>
            <div className='h-4' />
            <div className='h-4' />
          </div>
        </div>
      </div>
    </li>
  ));
};

export default DoctorListSkeleton;
