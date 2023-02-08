import { createTRPCRouter, publicProcedure } from "../trpc";

export const blocoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bloco.findMany();
  }),
});
