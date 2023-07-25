import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository';
import { FetchUserCheckInHistoryUseCase } from '../fetchUserCheckInHistory';

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository();
  const fetchUserCheckInHistoryUseCase = new FetchUserCheckInHistoryUseCase(checkInRepository);

  return fetchUserCheckInHistoryUseCase;
}
