'use client';

import { Marker } from 'react-leaflet';

import OpenStreetMap from './OpenStreetMap';

import type { OpenStreetMapProps } from './OpenStreetMap';

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
