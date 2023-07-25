import { PrismaUserRepository } from '@/repositories/prisma/prismaUsersRepository';
import { GetUserProfileUseCase } from '../getUserProfile';

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUserRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

  return getUserProfileUseCase;
}
