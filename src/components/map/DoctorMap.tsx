'use client';

import dynamic from 'next/dynamic';

import { Marker } from 'react-leaflet';

import type { OpenStreetMapProps } from './OpenStreetMap';

const OpenStreetMap = dynamic(() => import('./OpenStreetMap'), { ssr: false });

export interface DoctorMapProps
  extends Exclude<OpenStreetMapProps, 'map' | 'setMap'> {}

export default function DoctorMap({ ...props }: DoctorMapProps) {
  return (
    <div className='doctor-card__map child:h-full '>
      <OpenStreetMap
        scrollWheelZoom={false}
        dragging={false}
        zoom={14}
        className='h-48'
        {...props}
      >
        {props.center ? <Marker position={props.center} /> : null}
      </OpenStreetMap>
    </div>
  );
}
