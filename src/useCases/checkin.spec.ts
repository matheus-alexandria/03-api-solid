import {
  describe, it, expect, beforeEach, vi, afterEach,
} from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository';
import { CheckInUseCase } from './checkin';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(inMemoryCheckInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    });

    await expect(() => sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    })).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    });

    vi.setSystemTime(new Date(2020, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
