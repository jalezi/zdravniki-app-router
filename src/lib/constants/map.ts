import { LatLngTuple } from 'leaflet';

export const ZOOM = 8 as const;
export const MIN_ZOOM = 6 as const;
export const MAX_ZOOM = 16 as const;

// lat and lng intentionality with five decimal places; otherwise, the map will slightly jump on logo click
export const LATITUDE = 46.16081 as const;
export const LONGITUDE = 14.99634 as const;
export const SL_CENTER: LatLngTuple = [LATITUDE, LONGITUDE];
