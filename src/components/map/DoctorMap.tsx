'use client';

import { useState } from 'react';

import { Marker } from 'react-leaflet';

import OpenStreetMap from './OpenStreetMap';

import type { OpenStreetMapProps } from './OpenStreetMap';
import type { Map as LeafletMap } from 'leaflet';

export interface DoctorMapProps
  extends Exclude<OpenStreetMapProps, 'map' | 'setMap'> {}

export default function DoctorMap({ ...props }: DoctorMapProps) {
  const [map, setMap] = useState<LeafletMap | null>(null);

  return (
    <div className='doctor-card__map child:h-full '>
      <OpenStreetMap
        scrollWheelZoom={false}
        dragging={false}
        {...props}
        zoom={14}
        setMap={setMap}
        map={map}
        className='h-48'
      >
        {props.center ? <Marker position={props.center} /> : null}
      </OpenStreetMap>
    </div>
  );
}
