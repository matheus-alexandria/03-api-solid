import { CheckIn, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { CheckInsRepository } from '../checkInsRepository';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findUserIdByDate(userId: string, date: Date): Promise<CheckIn | null> {
    throw new Error('Method not implemented.');
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    throw new Error('Method not implemented.');
  }

  async countByUserId(userId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    throw new Error('Method not implemented.');
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.');
  }
}
