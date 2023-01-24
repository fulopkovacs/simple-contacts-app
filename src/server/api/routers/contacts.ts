import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const contactsRouter = createTRPCRouter({
  getAllContacts: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.contact.findMany({ where: { userId: input.userId } });
    }),
});
