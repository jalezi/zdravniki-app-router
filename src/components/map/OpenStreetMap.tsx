'use client';

import { PropsWithChildren } from 'react';

import { AttributionControl, MapContainer, TileLayer } from 'react-leaflet';

import { MAP } from '@/lib/constants';

import type { MapContainerProps } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

export interface OpenStreetMapProps
  extends MapContainerProps,
    PropsWithChildren {}

export default function OpenStreetMap({
  children,
  ...props
}: OpenStreetMapProps) {
  return (
    <MapContainer
      attributionControl={false}
      center={MAP.SL_CENTER}
      zoom={MAP.ZOOM}
      minZoom={MAP.MIN_ZOOM}
      maxZoom={MAP.MAX_ZOOM}
      {...props}
      className='custom-leaflet'
    >
      <AttributionControl prefix='' />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {children}
    </MapContainer>
  );
}
