import { createTRPCProxyClient, httpBatchLink, createWSClient, wsLink, splitLink } from '@trpc/client';

import type { AppRouter } from '../../server/trpc/appRouter';

const wsClient = createWSClient({
  url: import.meta.env.VITE_WS_URL,
});

export const api = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        url: import.meta.env.VITE_TRPC_URL,
      }),
    }),
  ],
});
