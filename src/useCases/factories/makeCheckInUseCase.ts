import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository';
import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository';
import { CheckInUseCase } from '../checkin';

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository);

  return checkInUseCase;
}
