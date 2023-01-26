import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const contactsRouter = createTRPCRouter({
  getAllContacts: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.contact.findMany({ where: { userId: input.userId } });
    }),
  deleteContact: publicProcedure
    .input(z.object({ contactId: z.string().uuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.contact.delete({ where: { id: input.contactId } });
    }),
  createContact: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        name: z.string(),
        phone: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const data: typeof input = { name: input.name, userId: input.userId };
      // TODO: validate phone numbers?
      if (input.phone) data.phone = input.phone;
      if (input.email) data.email = input.email;

      return ctx.prisma.contact.create({
        data,
      });
    }),
});
