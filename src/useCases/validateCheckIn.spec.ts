import {
  describe, it, expect, beforeEach, vi, afterEach,
} from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository';
import { ValidateCheckInUseCase } from './validateCheckIn';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe('Validate Check In Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(
      inMemoryCheckInsRepository,
    );

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
  });

  it.only('should be able to validate a check in', async () => {
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

  it.only('should not be able to validate an inexistent check in', async () => {
    await expect(() => sut.execute({
      checkInId: 'inexistent-check-in-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
