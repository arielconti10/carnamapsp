import { createTRPCRouter } from "./trpc";
import { blocoRouter } from "./routers/blocos";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  bloco: blocoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
