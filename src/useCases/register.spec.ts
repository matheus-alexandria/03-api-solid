import { describe, it, expect } from 'vitest';
import { PrismaUserRepository } from '@/repositories/prismaUsersRepository';
import { compare } from 'bcryptjs';
import { RegisterUseCase } from './register';

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const prismaUsersRepository = new PrismaUserRepository();
    const register = new RegisterUseCase(prismaUsersRepository);

    const { user } = await register.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
