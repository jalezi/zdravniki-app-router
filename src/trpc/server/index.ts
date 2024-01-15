import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { doctorsRouter } from './api/routers/doctors';
import { timestampsRouter } from './api/routers/timestamps';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  doctors: doctorsRouter,
  healthcheck: publicProcedure.query(() => ({ ok: true })),
  timestamps: timestampsRouter,
  random: publicProcedure.query(() => Math.random()),
});

export type AppRouter = typeof appRouter;

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
