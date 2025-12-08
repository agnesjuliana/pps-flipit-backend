import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse, type IRequestUser } from '../middleware';
import { FlashcardService } from '../services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FlashcardController = {
  async generateFlashcard(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      // const file = request.file;
      // if (!file) {
      //   const error = new CustomError(
      //     StatusCodes.BAD_REQUEST,
      //     'No file uploaded',
      //   );

      //   return response.json(error);
      // }

      const result = await FlashcardService.generateFlascard(request);

      const success = new CustomResponse(
        StatusCodes.OK,
        'File uploaded',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async createFlashcard(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const requestData = request as IRequestUser;
      const userId = requestData.user?.id
        ? Number.parseInt(requestData.user.id)
        : null;
      const result = await FlashcardService.createFlashcard(
        request.body,
        userId,
      );

      const success = new CustomResponse(
        StatusCodes.OK,
        'Flashcard created',
        result,
      );

      return response.json(success.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async getFlashcardByUserId(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const requestData = request as IRequestUser;
      const userId = requestData.user?.id
        ? Number.parseInt(requestData.user.id)
        : null;
      const flashcards = await FlashcardService.getFlashCardByUserId(userId);

      const result = new CustomResponse(
        StatusCodes.OK,
        'Flashcards found',
        flashcards,
      );

      return response.json(result.toJSON());
    } catch (error) {
      next(error);
    }
  },

  async getFlashcardItemByFlashcardId(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const flashcardId = Number(request.params.id);
      const flashcardItems =
        await FlashcardService.getFlashcardItemByFlashcardId(flashcardId);

      const result = new CustomResponse(
        StatusCodes.OK,
        'Flashcard items found',
        flashcardItems,
      );

      return response.json(result.toJSON());
    } catch (error) {
      next(error);
    }
  },
};
