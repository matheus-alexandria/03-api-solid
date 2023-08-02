import { FastifyInstance } from 'fastify';
import { userRoutes } from './controllers/users/routes';

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes);
}
