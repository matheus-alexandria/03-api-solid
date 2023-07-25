import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository';
import { SearchGymsUseCase } from '../searchGyms';

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const searchGymsUseCase = new SearchGymsUseCase(gymsRepository);

  return searchGymsUseCase;
}
