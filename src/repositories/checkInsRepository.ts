import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  findUserIdByDate: (userId: string, date: Date) => Promise<CheckIn | null>
  findById: (checkInId: string) => Promise<CheckIn | null>
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>
  countByUserId: (userId: string) => Promise<number>
  save: (checkIn: CheckIn) => Promise<CheckIn>
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
}
