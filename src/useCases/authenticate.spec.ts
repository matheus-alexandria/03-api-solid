import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { hash } from 'bcryptjs';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalidCredentialsError';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryUsersRepository);
  });

  it('should be able to authenticate', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
    });

    await expect(() => sut.execute({
      email: 'johndoe@mail.com',
      password: 'abdce',
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
