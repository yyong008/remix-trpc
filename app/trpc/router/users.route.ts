import { z } from "zod";
import { t } from "../utils";
import {
  createUser,
  delUser,
  getPage,
  getUsers,
  updateUser,
} from "~/db/user.prisma";

export default t.router({
  get: t.procedure.query(async () => {
    return await getUsers();
  }),
  getPage: t.procedure
    .input(z.object({ skip: z.number(), take: z.number() }))
    .query(async ({ ctx, input }) => {
      const { skip, take } = input;
      return await getPage(skip, take);
    }),
  create: t.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        profile: z.object({
          bio: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await createUser(
        input.name,
        input.password,
        input.email,
        input.profile.bio
      );
      return { ...user };
      // return {}
    }),
  update: t.procedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
          password: z.string().min(8).optional(),
          profile: z.object({
            bio: z.string().optional(),
          }),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await updateUser({
        id: input.id,
        data: {
          ...input.data,
        },
      });
      return { ...user };
    }),
  del: t.procedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const user = await delUser(input);
    return { ...user };
  }),
});
