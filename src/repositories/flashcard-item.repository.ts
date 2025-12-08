import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FlashcardItems = {
  async findFlashcardItemByFlashcardId(flashcardId: number) {
    return await prisma.flashcardItem.findMany({
      where: {
        flashcardId,
      },
    });
  },
};
