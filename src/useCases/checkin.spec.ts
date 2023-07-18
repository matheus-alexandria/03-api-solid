import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository';
import { CheckInUseCase } from './checkin';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(inMemoryCheckInsRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
