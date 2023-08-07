import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchNeabyGymsUseCase } from '@/useCases/factories/makeFetchNearbyGymsUseCase';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const neabyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const {
    latitude,
    longitude,
  } = neabyGymsQuerySchema.parse(request.query);

  const fetchNeabyGymsUseCase = makeFetchNeabyGymsUseCase();

  const { gyms } = await fetchNeabyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({
    gyms,
  });
}
