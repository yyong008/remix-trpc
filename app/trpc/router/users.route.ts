import { z } from 'zod';
import { t } from '../utils';
import { createUser, getUsers } from '~/db/user.prisma'

export default t.router({
  get: t.procedure.query(async () => {
    return await getUsers()
  }),
  create: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        profile: z.object({
          bio: z.string()
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await createUser(input.email, input.password, input.profile.bio)
      return { ...user }
    })
})
