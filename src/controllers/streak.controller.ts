import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse, type IRequestUser } from '../middleware';
import { StreakService } from '../services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StreakController = {
  async getCurrentStreak(
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

      const result = await StreakService.getCurrentStreak(userId);

      const success = new CustomResponse(
        StatusCodes.OK,
        'Current streak',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async getAllStreaks(
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

      const result = await StreakService.getAllStreaks(userId);

      const success = new CustomResponse(StatusCodes.OK, 'All streaks', result);

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },
};
