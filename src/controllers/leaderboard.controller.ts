import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse, type IRequestUser } from '../middleware';
import { LeaderboardService } from '../services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LeaderboardController = {
  async getTopStreaks(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const limit = request.query.limit
        ? Number.parseInt(request.query.limit as string)
        : 50;

      const result = await LeaderboardService.getTopStreaks(limit);

      const success = new CustomResponse(
        StatusCodes.OK,
        'Top streaks leaderboard',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async getUserRank(request: Request, response: Response, next: NextFunction) {
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

      const result = await LeaderboardService.getUserRank(userId);

      if (!result) {
        const error = new CustomResponse(
          StatusCodes.NOT_FOUND,
          'User not found in leaderboard',
          null,
        );
        return response.status(StatusCodes.NOT_FOUND).json(error.toJSON());
      }

      const success = new CustomResponse(StatusCodes.OK, 'User rank', result);

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async getTopStreaksByEducationLevel(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const requestData = request as IRequestUser;
      const educationLevel = requestData.user?.role
        ? (requestData.user as any).educationLevel
        : null;
      const limit = request.query.limit
        ? Number.parseInt(request.query.limit as string)
        : 50;

      if (!educationLevel) {
        const error = new CustomResponse(
          StatusCodes.UNAUTHORIZED,
          'User education level not found',
          null,
        );
        return response.status(StatusCodes.UNAUTHORIZED).json(error.toJSON());
      }

      const result = await LeaderboardService.getTopStreaksByEducationLevel(
        educationLevel,
        limit,
      );

      const success = new CustomResponse(
        StatusCodes.OK,
        `Top streaks by ${educationLevel}`,
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },
};
