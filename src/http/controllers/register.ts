import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterUseCase } from '@/useCases/register';
import { PrismaUserRepository } from '@/repositories/prismaUsersRepository';
import { UserAlreadyExistsError } from '@/useCases/errors/userAlreadyExistsError';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
