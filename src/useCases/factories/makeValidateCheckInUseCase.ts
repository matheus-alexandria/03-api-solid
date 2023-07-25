import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository';
import { ValidateCheckInUseCase } from '../validateCheckIn';

export function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository();
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository);

  return validateCheckInUseCase;
}
