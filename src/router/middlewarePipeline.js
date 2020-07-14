function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

export default function middlewarePipeline(to, from, next) {
  const [middleware] = to.matched.map((record) => record.meta.middleware);

  if (!middleware) return next();

  const context = {
    to,
    from,
    next,
  };
  return middleware[0]({ ...context, next: nextFactory(context, middleware, 1) });
}
