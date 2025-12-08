import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Folders = {
  async createFolder(title: string, description: string, userId: number) {
    return await prisma.folder.create({
      data: {
        title,
        description,
        userId,
      },
    });
  },

  async findFolderById(id: number) {
    return await prisma.folder.findUnique({
      where: {
        id,
      },
    });
  },

  async findFoldersByUserId(userId: number) {
    return await prisma.folder.findMany({
      where: {
        userId,
      },
    });
  },

  async updateFolderName(id: number, title: string) {
    return await prisma.folder.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
  },

  async deleteFolder(id: number) {
    return await prisma.folder.delete({
      where: {
        id,
      },
    });
  },
};
