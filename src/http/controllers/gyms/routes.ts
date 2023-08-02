import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verifyJWT';

export async function userRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT);
}
