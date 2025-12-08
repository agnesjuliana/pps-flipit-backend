/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { type Request, type Response } from 'express';

import prisma from '../config/prisma';
import { filePath } from '../middleware/upload-file.middleware';
import { type CreateFlashcardRequest } from '../models';
import { FlashcardItems, Flashcards } from '../repositories';
import { requestQuestionChatPdf, requestUploadChatPdf } from '../utils/ChatPdf';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FlashcardService = {
  async generateFlascard(
    request: Request,
    // eslint-disable-next-line @typescript-eslint/require-await
  ) {
    try {
      const file = request.file;

      const sourceId = await requestUploadChatPdf(file);
      const flashcard = await requestQuestionChatPdf(sourceId);
      const flashcardJSON = JSON.parse(flashcard);

      const responseData = {
        flashcards: flashcardJSON.data,
        path: filePath(file).path_file,
        sourceId: sourceId,
        title: request.body.title,
        description: request.body.description,
        folderId: request.body.folderId,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  },

  async createFlashcard(request: CreateFlashcardRequest, userId: number) {
    try {
      return await prisma.$transaction(async prisma => {
        const flashcard = await Flashcards.createFlashcard(
          request.title,
          request.description,
          request.folderId,
          request.path,
          request.sourceId,
          userId,
          prisma,
        );

        const flashCardItems = await Promise.all(
          request.flashcards.map(item =>
            Flashcards.createFlashcardItem(
              item.question,
              item.answer,
              flashcard.id,
              prisma,
            ),
          ),
        );

        return {
          flashcard,
          flashCardItems,
        };
      });
    } catch (error) {
      throw error;
    }
  },

  async getFlashCardByUserId(userId: number) {
    try {
      return await Flashcards.findFlashcardsByUserId(userId);
    } catch (error) {
      throw error;
    }
  },

  async getFlashcardItemByFlashcardId(flashcardId: number) {
    try {
      return await FlashcardItems.findFlashcardItemByFlashcardId(flashcardId);
    } catch (error) {
      throw error;
    }
  },
};
