import { describe, it, expect } from 'vitest';
import { compare } from 'bcryptjs';
import { RegisterUseCase } from './register';

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const register = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },

      async create(data) {
        return {
          id: 'user-01',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await register.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
