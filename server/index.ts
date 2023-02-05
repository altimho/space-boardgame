import './env';

import { app } from './koa';
import { handleWSS } from './trpc';

console.log(`Starting Koa on port ${process.env.KOA_PORT}...`);
app.listen(process.env.KOA_PORT);

if (app.ws.server) {
  console.log('Handle TRPC WebSocket API...');
  handleWSS(app.ws.server);
}
