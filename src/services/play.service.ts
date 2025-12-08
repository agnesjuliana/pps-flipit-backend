/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import prisma from '../config/prisma';
import {
  type CreatePlayResultRequest,
  type CreatePlayRequest,
} from '../models';
import { Streaks, Plays, FlashcardItems, PlayResults } from '../repositories';
import {
  getCurrentDateInJakarta,
  getYesterdayInJakarta,
  mapDatesToWeekDays,
  type IWeekDaysMap,
} from '../utils/DateNow';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PlayService = {
  async createPlay(request: CreatePlayRequest, userId: number) {
    try {
      const dateNow = getCurrentDateInJakarta();
      const dateYesterday = getYesterdayInJakarta();
      let streak = await Streaks.findStreakByUserId(userId);

      return await prisma.$transaction(async prisma => {
        if (
          !streak ||
          (streak.endDate.toISOString() !== dateYesterday.toISOString() &&
            streak.startDate.toISOString() !== dateNow.toISOString())
        ) {
          streak = await Streaks.createStreak(userId, dateNow, prisma);
        }

        const play = await Plays.createPlay(
          request.flashcardId,
          dateNow,
          streak.id,
          prisma,
        );

        const flashcardItems =
          await FlashcardItems.findFlashcardItemByFlashcardId(
            request.flashcardId,
          );

        return { play, flashcardItems };
      });
    } catch (error) {
      throw error;
    }
  },

  async createPlayResult(request: CreatePlayResultRequest) {
    try {
      const playResult = await PlayResults.upsertPlayResult(
        request.flashcardItemId,
        request.playId,
        request.isTrue,
      );

      return playResult;
    } catch (error) {
      throw error;
    }
  },

  async finishPlay(playId: number) {
    try {
      const dateNow = getCurrentDateInJakarta();
      let play = await Plays.findPlayById(playId);

      if (!play) {
        throw new Error('Play not found');
      }

      return await prisma.$transaction(async prisma => {
        let wrong = 0;
        let right = 0;

        for (const playResult of play.playResults) {
          if (playResult.isTrue) {
            right += 1;
          } else {
            wrong += 1;
          }
        }
        play = await Plays.updatePlay(playId, wrong, right, prisma);

        const streak = await Streaks.updateStreak(
          play.streakId,
          dateNow,
          prisma,
        );

        const playStreakAWeek = await Plays.findPlayWithinWeekByStreakId(
          streak.id,
        );
        const streakWeek = mapDatesToWeekDays(playStreakAWeek);

        const playStreakCount = await Plays.countStreakByStreakId(
          play.streakId,
        );

        const streakWeeklyStatistic = {
          streakTotal: playStreakCount,
          streakWeek,
        };

        return streakWeeklyStatistic;
      });
    } catch (error) {
      throw error;
    }
  },
};
