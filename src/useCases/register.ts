import { prisma } from '@/lib/prisma';
import { PrismaUserRepository } from '@/repositories/prismaUsersRepository';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({ name, email, password }: RegisterUseCaseRequest) {
  const passwordHash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('User with this email already exists');
  }

  const prismaUsersRepository = new PrismaUserRepository();

  await prismaUsersRepository.create({
    name,
    email,
    password_hash: passwordHash,
  });
}
