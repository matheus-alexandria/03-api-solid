import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './getUserProfile';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it('should be able get user profile', async () => {
    const { id, email } = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: id,
    });

    expect(user.email).toEqual(email);
  });

  it('should not be able get profile with invalid id', async () => {
    await expect(() => sut.execute({
      userId: 'non-existing-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
