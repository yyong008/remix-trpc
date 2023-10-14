import { t } from '../utils';
import userRoute from '../router/users.route'

export const appRouter = t.router({
  users: userRoute
});

// export type definition of API
export type AppRouter = typeof appRouter;
