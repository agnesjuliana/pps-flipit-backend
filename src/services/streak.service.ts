/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Streaks, Plays, Flashcards } from '../repositories';
import {
  mapDatesToWeekDays,
  mapDatesToMonthDays,
  type IWeekDaysMap,
  type IDaysMap,
  weekDays,
  days,
} from '../utils/DateNow';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StreakService = {
  async getWeeklyStreaks(userId: number) {
    try {
      const flashcardTotal = await Flashcards.countFlashcardByUserId(userId);

      const streak = await Streaks.findStreakByUserId(userId);

      if (!streak) {
        console.log('streak not found');
        return {
          streakTotal: 0,
          flashcardTotal,
          streakWeek: weekDays,
        };
      }

      const streakTotal = await Plays.countStreakByStreakId(streak.id);

      const playStreakAWeek = await Plays.findPlayWithinWeekByStreakId(
        streak.id,
      );

      const streakWeek = mapDatesToWeekDays(playStreakAWeek);

      const streakWeeklyStatistic = {
        streakTotal,
        flashcardTotal,
        streakWeek,
      };
      return streakWeeklyStatistic;
    } catch (error) {
      throw error;
    }
  },

  async getMonthlyStreaks(userId: number) {
    try {
      const flashcardTotal = await Flashcards.countFlashcardByUserId(userId);

      const streak = await Streaks.findStreakByUserId(userId);

      if (!streak) {
        return {
          streakTotal: 0,
          todayPlayTotal: 0,
          flashcardTotal,
          streakMonth: days,
        };
      }

      const streakTotal = await Plays.countStreakByStreakId(streak.id);

      const todayPlayTotal = await Plays.countPlayTodayByUserId(userId);

      const playStreakAMonth = await Plays.findPlayWithinMonthByStreakId(
        streak.id,
      );

      const streakMonth = mapDatesToMonthDays(playStreakAMonth);

      const streakMonthlyStatistic = {
        streakTotal,
        todayPlayTotal,
        flashcardTotal,
        streakMonth,
      };
      return streakMonthlyStatistic;
    } catch (error) {
      throw error;
    }
  },
};
