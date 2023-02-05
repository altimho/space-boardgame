import { initTRPC } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { Context } from './createContext';

const { router, procedure } = initTRPC.context<Context>().create();

export const appRouter = router({
  ping: procedure.query(() => {
    return 'pong';
  }),
  timer: procedure.subscription(({ ctx }) => {
    console.log('enter subscription procedure', ctx);

    return observable<string>((emit) => {
      console.log('observer constructor', ctx);

      return () => {
        console.log('observer off', ctx);
      };
    });
  }),
});

export type AppRouter = typeof appRouter;
