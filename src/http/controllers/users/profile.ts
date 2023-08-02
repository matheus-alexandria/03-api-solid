import { makeGetUserProfileUseCase } from '@/useCases/factories/makeGetUserProfileUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getProfileUseCase = makeGetUserProfileUseCase();
  const { user } = await getProfileUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
