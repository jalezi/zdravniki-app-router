import { timestampsRouter } from './api/routers/timestamps';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => ({ ok: true })),
  timestamps: timestampsRouter,
});

export type AppRouter = typeof appRouter;
