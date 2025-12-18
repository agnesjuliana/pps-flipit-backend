import { Leaderboard } from '../repositories';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LeaderboardService = {
  calculateActiveStreak(startDate: Date, endDate: Date | null): number {
    if (!endDate) {
      const today = new Date();
      const start = new Date(startDate);
      const streak =
        Math.floor(
          (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;
      return streak;
    }
    const streak =
      Math.floor(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24),
      ) + 1;
    return streak;
  },

  async getTopStreaks(limit: number = 50) {
    try {
      const streaks = await Leaderboard.getTopStreaks(limit);

      const leaderboard = streaks.map((streak, index) => {
        const activeStreak = this.calculateActiveStreak(
          streak.startDate,
          streak.endDate,
        );

        return {
          rank: index + 1,
          userId: streak.userId,
          userName: streak.user.name,
          userEmail: streak.user.email,
          educationLevel: streak.user.educationLevel,
          activeStreak,
          longestStreak: streak.longestStreak,
          startDate: streak.startDate,
          endDate: streak.endDate,
        };
      });

      return leaderboard;
    } catch (error) {
      throw error;
    }
  },

  async getUserRank(userId: number) {
    try {
      const rank = await Leaderboard.getUserRank(userId);

      if (!rank) {
        return null;
      }

      const userStreak = await Leaderboard.getUserStreakData(userId);

      if (!userStreak) {
        return null;
      }

      const activeStreak = this.calculateActiveStreak(
        userStreak.startDate,
        userStreak.endDate,
      );

      return {
        rank,
        userId: userStreak.userId,
        userName: userStreak.user.name,
        userEmail: userStreak.user.email,
        educationLevel: userStreak.user.educationLevel,
        activeStreak,
        longestStreak: userStreak.longestStreak,
        startDate: userStreak.startDate,
        endDate: userStreak.endDate,
      };
    } catch (error) {
      throw error;
    }
  },

  async getTopStreaksByEducationLevel(
    educationLevel: string,
    limit: number = 50,
  ) {
    try {
      const streaks = await Leaderboard.getTopStreaksByEducationLevel(
        educationLevel,
        limit,
      );

      const leaderboard = streaks.map((streak, index) => {
        const activeStreak = this.calculateActiveStreak(
          streak.startDate,
          streak.endDate,
        );

        return {
          rank: index + 1,
          userId: streak.userId,
          userName: (streak as any).user.name,
          userEmail: (streak as any).user.email,
          educationLevel: (streak as any).user.educationLevel,
          activeStreak,
          longestStreak: streak.longestStreak,
          startDate: streak.startDate,
          endDate: streak.endDate,
        };
      });

      return leaderboard;
    } catch (error) {
      throw error;
    }
  },
};
