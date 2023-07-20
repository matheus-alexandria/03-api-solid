import { CheckIn, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
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

  async findManyByUserId(userId: string): Promise<CheckIn[]> {
    return this.items.filter((item) => item.user_id === userId);
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
