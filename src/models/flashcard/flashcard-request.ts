/* eslint-disable @typescript-eslint/naming-convention */
export interface CreateFlashcardRequest {
  title: string;
  description: string;
  folderId: number;
  path: string;
  sourceId: string;
  flashcards: FlashcardItem[];
}

interface FlashcardItem {
  question: string;
  answer: string;
}
