import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/checkInsRepository';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

type ValidateCheckInUseCaseResponse = {
  checkIn: CheckIn;
};

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
