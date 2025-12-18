import { QuizAttempts, Streaks } from '../repositories';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const QuizAttemptService = {
  async createQuizAttempt(
    userId: number,
    totalQuestions: number,
    correctAnswers: number,
  ) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // 1. Create quiz attempt
      const quizAttempt = await QuizAttempts.createQuizAttempt(
        userId,
        totalQuestions,
        correctAnswers,
        today,
      );

      // 2. Update or create streak record
      await this.updateStreak(userId, today);

      return quizAttempt;
    } catch (error) {
      throw error;
    }
  },

  async updateStreak(userId: number, today: Date) {
    try {
      const streak = await Streaks.findStreakByUserId(userId);

      // If no streak exists, start the very first one
      if (!streak) {
        await Streaks.createStreak(userId, today);
        return;
      }

      const lastActive = new Date(streak.endDate || streak.startDate);
      lastActive.setHours(0, 0, 0, 0);

      const diffDays = Math.floor(
        (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        await Streaks.updateStreak(streak.id, { endDate: today });
      } else if (diffDays >= 2) {
        await Streaks.createStreak(userId, today);
      }
    } catch (error) {
      throw error;
    }
  },

  async getWeeklyStats(userId: number) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

      const weeklyAttempts = await QuizAttempts.findQuizAttemptsInRange(
        userId,
        sevenDaysAgo,
        today,
      );

      const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const weekData = weekDays.map(day => ({
        day,
        attempts: 0,
        correctAnswers: 0,
      }));

      for (const attempt of weeklyAttempts) {
        const dayIndex = attempt.date.getDay();
        weekData[dayIndex].attempts += 1;
        weekData[dayIndex].correctAnswers += attempt.correctAnswers;
      }

      // Check for most recent streak to display current count
      const currentStreak = await Streaks.findStreakByUserId(userId);
      let streakCount = 0;

      if (currentStreak) {
        const lastActive = new Date(
          currentStreak.endDate || currentStreak.startDate,
        );
        lastActive.setHours(0, 0, 0, 0);

        const diff = Math.floor(
          (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24),
        );

        // Only show the count if the streak isn't broken (today or yesterday)
        if (diff <= 1) {
          streakCount =
            Math.floor(
              (new Date(currentStreak.endDate).getTime() -
                new Date(currentStreak.startDate).getTime()) /
                (1000 * 60 * 60 * 24),
            ) + 1;
        }
      }

      return {
        streakCount,
        weekData,
        totalAttempts: weeklyAttempts.length,
        totalCorrect: weeklyAttempts.reduce(
          (sum, a) => sum + a.correctAnswers,
          0,
        ),
      };
    } catch (error) {
      throw error;
    }
  },

  async getMonthlyStats(userId: number) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);

      const monthlyAttempts = await QuizAttempts.findQuizAttemptsInRange(
        userId,
        thirtyDaysAgo,
        today,
      );

      // Group by date
      const monthData: Record<string, any> = {};

      for (let index = 29; index >= 0; index--) {
        const date = new Date(today);
        date.setDate(date.getDate() - index);
        const dateString = date.toISOString().split('T')[0];
        monthData[dateString] = {
          date: dateString,
          attempts: 0,
          correctAnswers: 0,
        };
      }

      for (const attempt of monthlyAttempts) {
        const dateString = attempt.date.toISOString().split('T')[0];
        if (monthData[dateString]) {
          monthData[dateString].attempts += 1;
          monthData[dateString].correctAnswers += attempt.correctAnswers;
        }
      }

      const currentStreak = await Streaks.findStreakByUserId(userId);
      const streakCount = currentStreak
        ? Math.floor(
            (new Date(currentStreak.endDate).getTime() -
              new Date(currentStreak.startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ) + 1
        : 0;

      return {
        streakCount,
        monthData: Object.values(monthData),
        totalAttempts: monthlyAttempts.length,
        totalCorrect: monthlyAttempts.reduce(
          (sum, a) => sum + a.correctAnswers,
          0,
        ),
      };
    } catch (error) {
      throw error;
    }
  },
};
