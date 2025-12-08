import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Plays = {
  async createPlay(
    flashcardId: number,
    datePlay: Date,
    streakId: number,
    prismaClient: any,
  ) {
    return await prismaClient.play.create({
      data: {
        flashcardId,
        datePlay,
        streakId,
      },
    });
  },

  async findPlayById(playId: number) {
    return await prisma.play.findUnique({
      where: {
        id: playId,
      },
      include: {
        playResults: true,
      },
    });
  },

  async updatePlay(
    playId: number,
    wrong: number,
    right: number,
    prismaClient: any,
  ) {
    return await prismaClient.play.update({
      where: {
        id: playId,
      },
      data: {
        wrong,
        right,
      },
    });
  },

  async countStreakByStreakId(streakId: number) {
    return await prisma.play.count({
      where: {
        streakId,
      },
    });
  },

  async findPlayWithinWeekByStreakId(streakId: number) {
    const plays = await prisma.play.findMany({
      where: {
        streakId,
        datePlay: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      select: {
        datePlay: true,
      },
      orderBy: {
        datePlay: 'asc',
      },
    });

    const playDates = plays.map(play => play.datePlay);

    return playDates;
  },

  async findPlayWithinMonthByStreakId(streakId: number) {
    const plays = await prisma.play.findMany({
      where: {
        streakId,
        datePlay: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
      select: {
        datePlay: true,
      },
      orderBy: {
        datePlay: 'asc',
      },
    });

    const playDates = plays.map(play => play.datePlay);

    return playDates;
  },

  async countPlayTodayByUserId(userId: number) {
    const today = new Date();
    const start = new Date(today);
    start.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    return await prisma.play.count({
      where: {
        datePlay: {
          gte: start,
          lte: end,
        },
        streak: {
          userId,
        },
      },
    });
  },
};
