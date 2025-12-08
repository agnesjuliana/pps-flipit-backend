import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Flashcards = {
  async createFlashcard(
    title: string,
    description: string,
    folderId: number,
    path: string,
    sourceId: string,
    userId: number,
    prismaClient: any,
  ) {
    return await prismaClient.flashcard.create({
      data: {
        title,
        description: description,
        folderId,
        pathFile: path,
        sourceId,
        userId,
      },
    });
  },

  async createFlashcardItem(
    question: string,
    answer: string,
    flashcardId: number,
    prismClient: any,
  ) {
    return await prismClient.flashcardItem.create({
      data: {
        question,
        answer,
        flashcardId,
      },
    });
  },

  async findFlashcardById(id: number) {
    return await prisma.flashcard.findUnique({
      where: {
        id,
      },
    });
  },

  async findFlashcardsByUserId(userId: number) {
    return await prisma.flashcard.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async findFlashcardsByFolderId(folderId: number) {
    return await prisma.flashcard.findMany({
      where: {
        folderId,
      },
    });
  },

  async countFlashcardByUserId(userId: number) {
    return await prisma.flashcard.count({
      where: {
        userId,
      },
    });
  },
};
