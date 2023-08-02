import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verifyJWT';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.get('/me', {
    preHandler: [verifyJWT],
  }, profile);
}
