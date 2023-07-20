import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  findUserIdByDate: (userId: string, date: Date) => Promise<CheckIn | null>
  findManyByUserId: (userId: string) => Promise<CheckIn[]>
}
