import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { TIME } from '@/lib/constants';
import { appRouter } from '@/trpc/server';

const isDevelopment = process.env.NODE_ENV === 'development';

const handler = (req: Request) =>
  fetchRequestHandler({
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: isDevelopment
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
        return {
          headers: isDevelopment
            ? {
                'cache-control': `s-maxage=1, stale-while-revalidate=${TIME.ONE_MINUTE_IN_SECONDS}`,
              }
            : {
                'cache-control': `s-maxage=1, stale-while-revalidate=${TIME.ONE_DAY_IN_SECONDS}`,
              },
        };
      }
      return {};
    },
  });

export { handler as GET, handler as POST };
