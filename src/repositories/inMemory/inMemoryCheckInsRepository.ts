import { CheckIn, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
import { GetResult } from '@prisma/client/runtime';
import { CheckInsRepository } from '../checkInsRepository';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findUserIdByDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf('date');
    const endOfDay = dayjs(date).endOf('date');
    const checkInOnSameDate = this.items.find((item) => {
      const checkInDate = dayjs(item.created_at);

      const isOnSameDate = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);

      return item.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => item.id === checkInId);

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((item) => item.user_id === userId).length;
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => checkIn.id === item.id);

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn;
    }

    return checkIn;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
