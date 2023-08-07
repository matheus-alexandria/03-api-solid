import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { ZodError } from 'zod';
import fastifyCookie from '@fastify/cookie';
import { appRoutes } from './http/routes';
import { env } from './env';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', detail: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error);
  } else {
    // TODO: Here we should send the error to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal Server Error.' });
});
