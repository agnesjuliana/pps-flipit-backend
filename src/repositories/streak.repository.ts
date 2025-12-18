import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Streaks = {
  async createStreak(userId: number, startDate: Date) {
    return await prisma.streak.create({
      data: {
        userId,
        startDate,
        endDate: startDate,
        longestStreak: 1,
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
    // Calculate streak count
    const streak = await prisma.streak.findUnique({
      where: {
        id: streakId,
      },
    });

    if (!streak) {
      throw new Error('Streak not found');
    }

    const streakCount =
      Math.floor(
        (new Date(endDate).getTime() - new Date(streak.startDate).getTime()) /
          (1000 * 60 * 60 * 24),
      ) + 1;

    return await prisma.streak.update({
      where: {
        id: streakId,
      },
      data: {
        endDate,
        longestStreak:
          streakCount > streak.longestStreak
            ? streakCount
            : streak.longestStreak,
      },
    });
  },

  async updateLongestStreak(streakId: number, longestStreak: number) {
    return await prisma.streak.update({
      where: {
        id: streakId,
      },
      data: {
        longestStreak,
      },
    });
  },
};
