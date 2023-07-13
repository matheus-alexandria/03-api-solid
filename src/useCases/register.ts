import { prisma } from '@/lib/prisma';
import { UsersRepository } from '@/repositories/usersRepository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  // private usersRepository: any;

  // constructor(usersRepository: any) {
  //   this.usersRepository = usersRepository;
  // }

  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
  }
}
