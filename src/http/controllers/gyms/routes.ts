import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verifyJWT';
import { verifyUserRole } from '@/http/middlewares/verifyUserRole';
import { search } from './search';
import { nearby } from './nearby';
import { create } from './create';

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT);

  app.get('/search', search);
  app.get('/nearby', nearby);
  app.post('/', { preHandler: [verifyUserRole('ADMIN')] }, create);
}
