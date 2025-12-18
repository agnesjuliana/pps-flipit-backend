import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const QuizAttempts = {
  async createQuizAttempt(
    userId: number,
    totalQuestions: number,
    correctAnswers: number,
    date: Date,
  ) {
    return await prisma.quizAttempt.create({
      data: {
        userId,
        totalQuestions,
        correctAnswers,
        date,
      },
    });
  },

  async findQuizAttemptsByUserId(userId: number) {
    return await prisma.quizAttempt.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'asc',
      },
    });
  },

  async findQuizAttemptsInRange(
    userId: number,
    startDate: Date,
    endDate: Date,
  ) {
    return await prisma.quizAttempt.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  },

  async findQuizAttemptsByDate(userId: number, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await prisma.quizAttempt.findMany({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  },
};
