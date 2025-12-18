import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Leaderboard = {
  async getTopStreaks(limit: number = 50) {
    const streaks = await prisma.streak.findMany({
      select: {
        id: true,
        userId: true,
        startDate: true,
        endDate: true,
        longestStreak: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            educationLevel: true,
            role: true,
          },
        },
      },
      orderBy: [
        {
          longestStreak: 'desc',
        },
        {
          endDate: 'desc',
        },
      ],
      take: limit,
    });

    return streaks;
  },

  async getUserRank(userId: number) {
    const userStreak = await prisma.streak.findFirst({
      where: {
        userId,
      },
      select: {
        longestStreak: true,
        endDate: true,
      },
    });

    if (!userStreak) {
      return null;
    }

    const allStreaks = await prisma.streak.findMany({
      select: {
        userId: true,
        longestStreak: true,
        endDate: true,
      },
      orderBy: [
        {
          longestStreak: 'desc',
        },
        {
          endDate: 'desc',
        },
      ],
    });

    const rankIndex = allStreaks.findIndex(streak => streak.userId === userId);
    return rankIndex >= 0 ? rankIndex + 1 : null;
  },

  async getUserStreakData(userId: number) {
    const userStreak = await prisma.streak.findFirst({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        startDate: true,
        endDate: true,
        longestStreak: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            educationLevel: true,
            role: true,
          },
        },
      },
    });

    return userStreak;
  },

  async getTopStreaksByEducationLevel(
    educationLevel: string,
    limit: number = 50,
  ) {
    const streaks = await prisma.streak.findMany({
      where: {
        user: {
          educationLevel: educationLevel as any,
        },
      },
      select: {
        id: true,
        userId: true,
        startDate: true,
        endDate: true,
        longestStreak: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            educationLevel: true,
            role: true,
          },
        },
      },
      orderBy: [
        {
          longestStreak: 'desc',
        },
        {
          endDate: 'desc',
        },
      ],
      take: limit,
    });

    return streaks;
  },
};
