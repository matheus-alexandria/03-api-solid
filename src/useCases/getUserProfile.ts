import { UsersRepository } from '@/repositories/usersRepository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

interface GetProfileUseCaseRequest {
  userId: string;
}

type GetProfileUseCaseResponse = {
  user: User;
};

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
