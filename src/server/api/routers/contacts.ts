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
  upsertContact: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        name: z.string(),
        phone: z.string().optional(),
        email: z.string().optional(),
        profilePhoto: z.string().optional(),
        contactId: z.string().uuid().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data: typeof input = {
        name: input.name,
        userId: input.userId,
      };
      // NOTE: In a real-life application, I would have to check if
      // the phone number is valid. This could be easily done with a utility
      // function from `react-phone-number-input` (we already use it on the client side):
      // https://gitlab.com/catamphetamine/react-phone-number-input#isvalidphonenumbervalue-string-boolean
      if (input.phone) data.phone = input.phone;
      if (input.email) data.email = input.email;
      // TODO: Explain in a comment why trpc is not good for uploading images (json only),
      // and why we should use pre-signed URLs and Object Storage-s anyways:
      // https://github.com/trpc/trpc/discussions/658#discussioncomment-998746
      if (input.profilePhoto) data.profilePhoto = input.profilePhoto;

      return ctx.prisma.contact.upsert({
        where: {
          id: input.contactId || "",
        },
        create: {
          ...data,
        },
        update: {
          ...data,
        },
      });
    }),
});
