import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCheckInUseCase } from '@/useCases/factories/makeCheckInUseCase';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  try {
    const {
      latitude,
      longitude,
    } = createCheckInBodySchema.parse(request.body);

    const userId = request.user.sub;

    const checkInUseCase = makeCheckInUseCase();

    await checkInUseCase.execute({
      userId,
      gymId,
      userLatitude: latitude,
      userLongitude: longitude,
    });

    return reply.status(201).send();
  } catch (err) {
    console.log('todo');
    throw err;
  }
}
