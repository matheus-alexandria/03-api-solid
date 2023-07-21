import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository';
import { SearchGymsUseCase } from './searchGyms';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(
      inMemoryGymsRepository,
    );
  });

  it('should be able to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: 10,
      longitude: 10,
    });

    await inMemoryGymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: 10,
      longitude: 10,
    });

    const { gyms } = await sut.execute({
      query: 'Script',
      page: 1,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym' }),
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `Gym ${i}`,
        description: '',
        phone: '',
        latitude: 10,
        longitude: 10,
      });
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ]);
  });
});
