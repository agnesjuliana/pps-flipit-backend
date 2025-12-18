import { Streaks } from '../repositories';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StreakService = {
  async getCurrentStreak(userId: number) {
    try {
      const streak = await Streaks.findStreakByUserId(userId);

      if (!streak) {
        return {
          streakCount: 0,
          startDate: null,
          endDate: null,
        };
      }

      const streakCount =
        Math.floor(
          (new Date(streak.endDate).getTime() -
            new Date(streak.startDate).getTime()) /
            (1000 * 60 * 60 * 24),
        ) + 1;

      return {
        streakCount,
        startDate: streak.startDate,
        endDate: streak.endDate,
      };
    } catch (error) {
      throw error;
    }
  },

  async getAllStreaks(userId: number) {
    try {
      const streaks = await Streaks.findAllStreaksByUserId(userId);

      const formattedStreaks = streaks.map(streak => ({
        id: streak.id,
        streakCount:
          Math.floor(
            (new Date(streak.endDate).getTime() -
              new Date(streak.startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ) + 1,
        startDate: streak.startDate,
        endDate: streak.endDate,
      }));

      return formattedStreaks;
    } catch (error) {
      throw error;
    }
  },
};
