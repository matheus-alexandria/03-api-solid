import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository';
import { FetchUserCheckInHistoryUseCase } from './fetchUserCheckInHistory';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInHistoryUseCase;

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInHistoryUseCase(
      inMemoryCheckInsRepository,
    );
  });

  it('should be able to fetch user check in history', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id-1',
    });

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-id-2',
      user_id: 'user-id-1',
    });

    const { checkIns } = await sut.execute({
      userId: 'user-id-1',
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-1' }),
      expect.objectContaining({ gym_id: 'gym-id-2' }),
    ]);
  });

  it('should be able to fetch paginated check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id-1',
      });
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id-1',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-21' }),
      expect.objectContaining({ gym_id: 'gym-id-22' }),
    ]);
  });
});
