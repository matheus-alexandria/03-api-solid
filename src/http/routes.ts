import { FastifyInstance } from 'fastify';
import { userRoutes } from './controllers/users/routes';
import { gymRoutes } from './controllers/gyms/routes';
import { checkInRoutes } from './controllers/checkIns/routes';

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes);
  app.register(gymRoutes, {
    prefix: '/gyms',
  });
  app.register(checkInRoutes, {
    prefix: '/check-ins',
  });
}
