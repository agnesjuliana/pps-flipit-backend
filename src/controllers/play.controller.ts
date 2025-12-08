import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse, type IRequestUser } from '../middleware';
import {
  type CreatePlayResultRequest,
  type CreatePlayRequest,
} from '../models';
import { PlayService } from '../services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PlayController = {
  async createPlay(request: Request, response: Response, next: NextFunction) {
    try {
      const requestData = request as IRequestUser;
      const userId = requestData.user?.id
        ? Number.parseInt(requestData.user.id)
        : null;
      const result = await PlayService.createPlay(
        request.body as CreatePlayRequest,
        userId,
      );

      const success = new CustomResponse(
        StatusCodes.OK,
        'Play created',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async createPlayResult(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const result = await PlayService.createPlayResult(
        request.body as CreatePlayResultRequest,
      );

      const success = new CustomResponse(
        StatusCodes.OK,
        'Play result created',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async finishPlay(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await PlayService.finishPlay(
        Number.parseInt(request.params.id),
      );

      const success = new CustomResponse(
        StatusCodes.OK,
        'Play finished',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },
};
