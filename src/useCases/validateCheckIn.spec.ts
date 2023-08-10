import {
  describe, it, expect, beforeEach, vi, afterEach,
} from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository';
import { ValidateCheckInUseCase } from './validateCheckIn';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';
import { LateCheckInValidationError } from './errors/LateCheckInValidationError';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe('Validate Check In Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(
      inMemoryCheckInsRepository,
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate a check in', async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate an inexistent check in', async () => {
    await expect(() => sut.execute({
      checkInId: 'inexistent-check-in-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate a check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 7, 10, 10, 0, 0));

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() => sut.execute({
      checkInId: createdCheckIn.id,
    })).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
