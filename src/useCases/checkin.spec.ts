import {
  describe, it, expect, beforeEach, vi, afterEach,
} from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository';
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository';
import { Decimal } from '@prisma/client/runtime/library';
import { CheckInUseCase } from './checkin';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository,
    );

    inMemoryGymsRepository.items.push({
      id: 'gym-id-1',
      description: '',
      phone: '',
      title: 'Test Gym',
      latitude: new Decimal(10),
      longitude: new Decimal(10),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: 10,
      userLongitude: 10,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: 10,
      userLongitude: 10,
    });

    await expect(() => sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: 10,
      userLongitude: 10,
    })).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: 10,
      userLongitude: 10,
    });

    vi.setSystemTime(new Date(2020, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: 10,
      userLongitude: 10,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    inMemoryGymsRepository.items.push({
      id: 'gym-02',
      description: '',
      phone: '',
      title: 'Ignite Gym',
      latitude: new Decimal(-3.768635),
      longitude: new Decimal(-38.481573),
    });

    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user-id-1',
      userLatitude: -3.762637,
      userLongitude: -38.488221,
    })).rejects.toBeInstanceOf(Error);
  });
});
