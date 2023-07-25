import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository';
import { CreateGymUseCase } from '../createGym';

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const createGymUseCase = new CreateGymUseCase(gymsRepository);

  return createGymUseCase;
}
