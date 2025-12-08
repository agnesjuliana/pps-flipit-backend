import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PlayResults = {
  async upsertPlayResult(
    flashcardItemId: number,
    playId: number,
    isTrue: boolean,
  ) {
    return await prisma.playResult.upsert({
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        flashcardItemId_playId: {
          flashcardItemId,
          playId,
        },
      },
      update: {
        isTrue,
      },
      create: {
        flashcardItemId,
        playId,
        isTrue,
      },
    });
  },
};
