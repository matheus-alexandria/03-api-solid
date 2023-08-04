import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verifyJWT';
import { create } from './create';

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT);

  app.post('/:gymId', create);
}
