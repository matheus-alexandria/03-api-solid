import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/checkInsRepository';

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string;
  page: number;
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
    page,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

    return {
      checkIns,
    };
  }
}
