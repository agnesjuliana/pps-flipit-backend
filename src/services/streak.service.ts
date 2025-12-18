import { Streaks } from '../repositories';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StreakService = {
  async getCurrentStreak(userId: number) {
    const streak = await Streaks.findStreakByUserId(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!streak) return { streakCount: 0, startDate: null, endDate: null };

    const lastActive = new Date(streak.endDate || streak.startDate);
    lastActive.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays >= 2) {
      return { streakCount: 0, startDate: null, endDate: null };
    }

    return {
      streakCount: this.calculateDays(
        streak.startDate,
        streak.endDate || streak.startDate,
      ),
      startDate: streak.startDate,
      endDate: streak.endDate,
    };
  },

  async updateActivity(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const streak = await Streaks.findStreakByUserId(userId);

    if (!streak) {
      return await Streaks.createStreak(userId, today);
    }

    const lastActive = new Date(streak.endDate || streak.startDate);
    lastActive.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays >= 2) {
      return await Streaks.createStreak(userId, today);
    } else if (diffDays === 1) {
      return await Streaks.updateStreak(streak.id, { endDate: today });
    }

    return streak;
  },

  async getAllStreaks(userId: number) {
    try {
      const streaks = await Streaks.findAllStreaksByUserId(userId);

      return streaks.map(streak => ({
        id: streak.id,
        streakCount: this.calculateDays(
          streak.startDate,
          streak.endDate || streak.startDate,
        ),
        startDate: streak.startDate,
        endDate: streak.endDate,
      }));
    } catch (error) {
      throw error;
    }
  },

  calculateDays(start: Date, end: Date): number {
    const startTime = new Date(start).setHours(0, 0, 0, 0);
    const endTime = new Date(end).setHours(0, 0, 0, 0);
    return Math.floor((endTime - startTime) / (1000 * 60 * 60 * 24)) + 1;
  },
};
