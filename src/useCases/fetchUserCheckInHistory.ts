import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/checkInsRepository';

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string;
}

type FetchUserCheckInHistoryUseCaseResponse = {
  checkIns: CheckIn[];
};

export class FetchUserCheckInHistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    userId,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId);

    return {
      checkIns,
    };
  }
}
