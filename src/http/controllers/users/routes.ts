import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verifyJWT';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { refresh } from './refresh';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  app.get('/me', {
    preHandler: [verifyJWT],
  }, profile);
}
