import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository';
import { FetchNeabyGymsUseCase } from '../fetchNearbyGyms';

export function makeFetchNeabyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const fetchNeabyGymsUseCase = new FetchNeabyGymsUseCase(gymsRepository);

  return fetchNeabyGymsUseCase;
}
