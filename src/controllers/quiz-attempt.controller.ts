import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse, type IRequestUser } from '../middleware';
import { QuizAttemptService } from '../services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const QuizAttemptController = {
  async submitQuizResult(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const requestData = request as IRequestUser;
      const userId = requestData.user?.id
        ? Number.parseInt(requestData.user.id)
        : null;

      if (!userId) {
        const error = new CustomResponse(
          StatusCodes.UNAUTHORIZED,
          'Unauthorized',
          null,
        );
        return response.status(StatusCodes.UNAUTHORIZED).json(error.toJSON());
      }

      const { totalQuestions, correctAnswers } = request.body;

      if (
        !totalQuestions ||
        correctAnswers === undefined ||
        totalQuestions < 1 ||
        correctAnswers < 0 ||
        correctAnswers > totalQuestions
      ) {
        const error = new CustomResponse(
          StatusCodes.BAD_REQUEST,
          'Invalid quiz data',
          null,
        );
        return response.status(StatusCodes.BAD_REQUEST).json(error.toJSON());
      }

      const result = await QuizAttemptService.createQuizAttempt(
        userId,
        totalQuestions,
        correctAnswers,
      );

      const success = new CustomResponse(
        StatusCodes.CREATED,
        'Quiz result saved',
        result,
      );

      return response.status(StatusCodes.CREATED).json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async getWeeklyStats(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const requestData = request as IRequestUser;
      const userId = requestData.user?.id
        ? Number.parseInt(requestData.user.id)
        : null;

      if (!userId) {
        const error = new CustomResponse(
          StatusCodes.UNAUTHORIZED,
          'Unauthorized',
          null,
        );
        return response.status(StatusCodes.UNAUTHORIZED).json(error.toJSON());
      }

      const result = await QuizAttemptService.getWeeklyStats(userId);

      const success = new CustomResponse(
        StatusCodes.OK,
        'Weekly statistics',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async getMonthlyStats(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const requestData = request as IRequestUser;
      const userId = requestData.user?.id
        ? Number.parseInt(requestData.user.id)
        : null;

      if (!userId) {
        const error = new CustomResponse(
          StatusCodes.UNAUTHORIZED,
          'Unauthorized',
          null,
        );
        return response.status(StatusCodes.UNAUTHORIZED).json(error.toJSON());
      }

      const result = await QuizAttemptService.getMonthlyStats(userId);

      const success = new CustomResponse(
        StatusCodes.OK,
        'Monthly statistics',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },
};
