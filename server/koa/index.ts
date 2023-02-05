import Koa from 'koa';
import serve from 'koa-static';
import proxy from 'koa-proxy';
import koaWebsocket from 'koa-websocket';
import crypto from 'crypto';

import { Defaults, UserCookieName } from '../../shared/constants';

import { koaHTTPMiddleware, koaWSMiddleware } from '../trpc/koaMiddlewares';
import { router } from './router';

export const app = koaWebsocket(new Koa(), { clientTracking: false });

// Request logging.
app.use((ctx, next) => {
  console.log(`Request: ${ctx.path}`);

  return next();
});

// New user generation.
app.use((ctx, next) => {
  if (!ctx.cookies.get(UserCookieName.Id)) {
    console.log('Set new user cookies...');

    ctx.cookies.set(UserCookieName.Id, crypto.randomUUID());
    ctx.cookies.set(UserCookieName.Name, Defaults.UserName);
  }

  return next();
});

// Basic routes.
app.use(router.routes()).use(router.allowedMethods());

// TRPC middlewares.
app.use(koaHTTPMiddleware);
app.ws.use(koaWSMiddleware);

if (process.env.NODE_ENV === 'development') {
  // Proxying Vite dev serrver for development mode.
  console.log(`Proxy client requests from ${process.env.STATIC_CLIENT_URL}`);

  app.use(
    proxy({
      host: process.env.STATIC_CLIENT_URL,
      yieldNext: true,
    })
  );
} else {
  // Serving build dir for production mode.
  console.log(`Serve client files from ${process.env.STATIC_CLIENT_DIR}`);

  app.use(serve(process.env.STATIC_CLIENT_DIR as string));
}

// Response logging.
app.use((ctx, next) => {
  console.log(`Response: ${ctx.status} ${ctx.path}`);

  return next();
});
