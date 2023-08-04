import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verifyJWT';
import { create } from './create';
import { history } from './history';
import { metrics } from './metrics';
import { validate } from './validate';

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT);

  app.post('/:gymId', create);
  app.get('/history', history);
  app.get('/metrics', metrics);
  app.patch('/:checkInId/validate', validate);
}
