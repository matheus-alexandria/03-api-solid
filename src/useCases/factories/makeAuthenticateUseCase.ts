import { PrismaUserRepository } from '@/repositories/prisma/prismaUsersRepository';
import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
