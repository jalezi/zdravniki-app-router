/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  webpack(config) {
    // Configures webpack to handle SVG files with SVGR. SVGR optimizes and transforms SVG files
    // into React components. See https://react-svgr.com/docs/next/

    // Grab the existing rule that handles SVG imports
    // @ts-ignore - rules is a private property that is not typed
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  async redirects() {
    return [
      { source: '/sl/about', destination: '/sl/o-projektu', permanent: true },
      {
        source: '/sl/faq',
        destination: '/sl/pogosta-vprasanja',
        permanent: true,
      },
      {
        source: '/sl/il-progetto',
        destination: '/sl/o-projektu',
        permanent: true,
      },
      {
        source: '/sl/domande-frequenti',
        destination: '/sl/pogosta-vprasanja',
        permanent: true,
      },
      { source: '/it/about', destination: '/it/il-progetto', permanent: true },
      {
        source: '/it/faq',
        destination: '/it/domande-frequenti',
        permanent: true,
      },
      {
        source: '/it/o-projektu',
        destination: '/it/il-progetto',
        permanent: true,
      },
      {
        source: '/it/pogosta-vprasanja',
        destination: '/it/domande-frequenti',
        permanent: true,
      },
      { source: '/en/il-progetto', destination: '/en/about', permanent: true },
      {
        source: '/en/domande-frequenti',
        destination: '/en/faq',
        permanent: true,
      },
      {
        source: '/en/o-projektu',
        destination: '/en/about',
        permanent: true,
      },
      {
        source: '/en/pogosta-vprasanja',
        destination: '/en/faq',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: '/sl/o-projektu',
          destination: '/sl/about',
        },
        {
          source: '/sl/pogosta-vprasanja',
          destination: '/sl/faq',
        },
        {
          source: '/it/il-progetto',
          destination: '/it/about',
        },
        {
          source: '/it/domande-frequenti',
          destination: '/it/faq',
        },
      ],
    };
  },
};

export default nextConfig;
