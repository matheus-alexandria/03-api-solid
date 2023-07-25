import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository';
import { GetUserMetricsUseCase } from '../getUserMetrics';

export function makeGetUserMetricsUseCase() {
  const checkInRepository = new PrismaCheckInsRepository();
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository);

  return getUserMetricsUseCase;
}
