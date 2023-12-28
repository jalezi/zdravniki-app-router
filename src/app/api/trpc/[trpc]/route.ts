import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '@/trpc/server';

const handler = (req: Request) =>
  fetchRequestHandler({
    req,
    router: appRouter,
    createContext: () => ({}),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            );
          }
        : undefined,
    endpoint: '/api/trpc',
    responseMeta({ type, errors }) {
      const allOk = errors.length === 0;

      const isQuery = type === 'query';

      if (isQuery && allOk) {
        // cache request for 1 day + revalidate once every second
        const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
        return {
          headers: {
            'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
          },
        };
      }
      return {};
    },
  });

export { handler as GET, handler as POST };
