import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse, type IRequestUser } from '../middleware';
import { type CreateFolderRequest } from '../models';
import { FolderService } from '../services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FolderController = {
  async createFolder(request: Request, response: Response, next: NextFunction) {
    try {
      const requestData = request as IRequestUser;
      const userId = requestData.user?.id
        ? Number.parseInt(requestData.user.id)
        : null;

      const folder = await FolderService.createFolder(
        request.body as CreateFolderRequest,
        userId,
      );

      const result = new CustomResponse(
        StatusCodes.CREATED,
        'Folder created',
        folder,
      );

      return response.status(StatusCodes.CREATED).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },

  async findFolderById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const folder = await FolderService.findFolderById(
        Number(request.params.id),
      );

      const result = new CustomResponse(StatusCodes.OK, 'Folder found', folder);

      return response.status(StatusCodes.OK).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },

  async findFoldersByUserId(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const requestData = request as IRequestUser;
      const userId = requestData.user?.id
        ? Number.parseInt(requestData.user.id)
        : null;

      const folders = await FolderService.findFoldersByUserId(userId);

      const result = new CustomResponse(
        StatusCodes.OK,
        'Folders found',
        folders,
      );

      return response.status(StatusCodes.OK).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },

  async getFolderFlashcards(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const flashcards = await FolderService.getFolderFlashcards(
        Number(request.params.id),
      );

      const result = new CustomResponse(
        StatusCodes.OK,
        'Flashcards found',
        flashcards,
      );

      return response.status(StatusCodes.OK).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },
};
