import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Streaks = {
  async createStreak(userId: number, startDate: Date, prismaClient: any) {
    return await prismaClient.streak.create({
      data: {
        userId,
        startDate,
        endDate: startDate,
      },
    });
  },

  async findStreakByUserId(userId: number) {
    return await prisma.streak.findFirst({
      where: {
        userId,
      },
    });
  },

  async updateStreak(streakId: number, endDate: Date, prismaClient: any) {
    return await prismaClient.streak.update({
      where: {
        id: streakId,
      },
      data: {
        endDate,
      },
    });
  },
};
