import { Server } from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';

import { appRouter } from './appRouter';
import { createContext } from './createContext';

export * from './koaMiddlewares';

export const handleWSS = (wss: Server) => applyWSSHandler({ wss, router: appRouter, createContext });
