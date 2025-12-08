import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse, type IRequestUser } from '../middleware';
import { StreakService } from '../services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StreakController = {
  async getWeeklyStreaks(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const requestData = request as IRequestUser;
      const userId = requestData.user?.id
        ? Number.parseInt(requestData.user.id)
        : null;
      const result = await StreakService.getWeeklyStreaks(userId);

      const success = new CustomResponse(
        StatusCodes.OK,
        'Weekly streaks',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async getMonthlyStreaks(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const requestData = request as IRequestUser;
      const userId = requestData.user?.id
        ? Number.parseInt(requestData.user.id)
        : null;
      const result = await StreakService.getMonthlyStreaks(userId);

      const success = new CustomResponse(
        StatusCodes.OK,
        'Monthly streaks',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },
};
