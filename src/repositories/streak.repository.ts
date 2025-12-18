import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Streaks = {
  /**
   * Creates a brand new streak record.
   * This is called for the very first streak OR when a user has missed H+1 days.
   */
  async createStreak(userId: number, startDate: Date) {
    return await prisma.streak.create({
      data: {
        userId,
        startDate,
        endDate: startDate,
        longestStreak: 1, // A new streak always starts at 1
      },
    });
  },

  async findStreakByUserId(userId: number) {
    return await prisma.streak.findFirst({
      where: { userId },
      orderBy: { startDate: 'desc' }, // Always get the most recent streak
    });
  },

  async findAllStreaksByUserId(userId: number) {
    return await prisma.streak.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' },
    });
  },

  /**
   * Updates an existing streak (standard daily progress).
   */
  async updateStreak(
    streakId: number,
    data: { startDate?: Date; endDate: Date },
  ) {
    const streak = await prisma.streak.findUnique({
      where: { id: streakId },
    });

    if (!streak) {
      throw new Error('Streak not found');
    }

    // 1. Identify start point (use passed startDate if it's a manual reset, otherwise existing)
    const effectiveStartDate = data.startDate || streak.startDate;

    // 2. Normalize to midnight for calendar day calculation
    const start = new Date(effectiveStartDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(data.endDate);
    end.setHours(0, 0, 0, 0);

    // 3. Calculate count
    const newStreakCount =
      Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // 4. Update the record
    return await prisma.streak.update({
      where: { id: streakId },
      data: {
        startDate: effectiveStartDate,
        endDate: data.endDate,
        longestStreak:
          newStreakCount > streak.longestStreak
            ? newStreakCount
            : streak.longestStreak,
      },
    });
  },
};
