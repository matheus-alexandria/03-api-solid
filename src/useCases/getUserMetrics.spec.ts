import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository';
import { GetUserMetricsUseCase } from './getUserMetrics';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(
      inMemoryCheckInsRepository,
    );
  });

  it('should be able to get check-in count from metrics', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id-1',
    });

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-id-2',
      user_id: 'user-id-1',
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-id-1',
    });

    expect(checkInsCount).toEqual(2);
  });
});
