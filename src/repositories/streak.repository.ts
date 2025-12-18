import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Streaks = {
  async createStreak(userId: number, startDate: Date) {
    return await prisma.streak.create({
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
      orderBy: {
        startDate: 'desc',
      },
    });
  },

  async findAllStreaksByUserId(userId: number) {
    return await prisma.streak.findMany({
      where: {
        userId,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  },

  async updateStreak(streakId: number, endDate: Date) {
    return await prisma.streak.update({
      where: {
        id: streakId,
      },
      data: {
        endDate,
      },
    });
  },
};
