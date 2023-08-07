import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeValidateCheckInUseCase } from '@/useCases/factories/makeValidateCheckInUseCase';
import { LateCheckInValidationError } from '@/useCases/errors/LateCheckInValidationError';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  try {
    const { checkInId } = validateCheckInParamsSchema.parse(request.params);

    const validateCheckInUseCase = makeValidateCheckInUseCase();

    await validateCheckInUseCase.execute({
      checkInId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof LateCheckInValidationError) {
      return reply.status(400).send({
        message: 'Check in validated pass the time limit',
      });
    }
    throw err;
  }
}
