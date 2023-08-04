import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCheckInUseCase } from '@/useCases/factories/makeCheckInUseCase';
import { MaxDistanceError } from '@/useCases/errors/maxDistanceError';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  try {
    const {
      latitude,
      longitude,
    } = createCheckInBodySchema.parse(request.body);

    const { gymId } = createCheckInParamsSchema.parse(request.params);

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
    if (err instanceof MaxDistanceError) {
      return reply.status(400).send({
        message: 'User in invalid distance',
      });
    }
    throw err;
  }
}
