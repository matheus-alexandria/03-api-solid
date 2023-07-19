import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/checkInsRepository';
import { GymsRepository } from '@/repositories/gymsRepository';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

type CheckInUseCaseResponse = {
  checkIn: CheckIn;
};

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const checkInOnSameDate = await this.checkInsRepository.findUserIdByDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDate) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
