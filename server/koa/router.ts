import Router from '@koa/router';

export const router = new Router();

router.get('board', '/boards/:id', (ctx, next) => {
  ctx.body = `Board: ${ctx.params.id}`;

  return next();
});
