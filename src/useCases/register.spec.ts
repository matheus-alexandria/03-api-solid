import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { RegisterUseCase } from './register';
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with the same email twice', async () => {
    const email = 'johndoe@mail.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(() => sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
