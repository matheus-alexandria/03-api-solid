import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository';
import { FetchNeabyGymsUseCase } from './fetchNearbyGyms';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: FetchNeabyGymsUseCase;

describe('Fetch Neaby Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new FetchNeabyGymsUseCase(
      inMemoryGymsRepository,
    );
  });

  it('should be able to fetch nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: -3.762637,
      longitude: -38.488221,
    });

    await inMemoryGymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -3.692308,
      longitude: -38.604690,
    });

    const { gyms } = await sut.execute({
      userLatitude: -3.762637,
      userLongitude: -38.488222,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym' }),
    ]);
  });
});
