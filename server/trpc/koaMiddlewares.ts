import { createKoaMiddleware } from 'trpc-koa-adapter';

import { appRouter } from './appRouter';
import { createContext } from './createContext';

console.log(process.env.TRPC_HTTP_PREFIX, process.env.TRPC_WS_PREFIX);

export const koaHTTPMiddleware = createKoaMiddleware({
  router: appRouter,
  prefix: `/${process.env.TRPC_HTTP_PREFIX}`,
  createContext,
});

export const koaWSMiddleware = createKoaMiddleware({
  router: appRouter,
  prefix: `/${process.env.TRPC_WS_PREFIX}`,
  createContext,
});
