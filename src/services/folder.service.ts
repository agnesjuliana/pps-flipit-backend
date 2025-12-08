import { type CreateFolderRequest } from 'models';

import { Flashcards, Folders } from '../repositories';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FolderService = {
  async createFolder(request: CreateFolderRequest, userId: number) {
    try {
      const folder = await Folders.createFolder(
        request.title,
        request.description,
        userId,
      );

      return folder;
    } catch (error) {
      throw error;
    }
  },

  async findFolderById(id: number) {
    try {
      const folder = await Folders.findFolderById(id);

      return folder;
    } catch (error) {
      throw error;
    }
  },

  async findFoldersByUserId(userId: number) {
    try {
      const folders = await Folders.findFoldersByUserId(userId);

      return folders;
    } catch (error) {
      throw error;
    }
  },

  async getFolderFlashcards(folderId: number) {
    try {
      const flashcard = await Flashcards.findFlashcardsByFolderId(folderId);

      return flashcard;
    } catch (error) {
      throw error;
    }
  },
};
