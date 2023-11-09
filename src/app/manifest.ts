import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zdravniki - Sledilnik',
    short_name: 'Zdravniki - Sledilnik',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    theme_color: '#09AFDA',
    background_color: '#ffffff',
    icons: [
      {
        src: 'favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: '/android-chrome-192x192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/android-chrome-384x384.png',
        type: 'image/png',
        sizes: '384x384',
      },
    ],
  };
}
