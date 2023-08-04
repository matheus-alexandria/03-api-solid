import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verifyJWT';

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT);
}
