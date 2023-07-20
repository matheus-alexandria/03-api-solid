import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository';
import { CreateGymUseCase } from './createGym';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(inMemoryGymsRepository);
  });

  it('should be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      title: 'TS Gym',
      description: '',
      phone: '',
      latitude: 10,
      longitude: 10,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
