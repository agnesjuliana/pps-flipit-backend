import { type EducationLevel } from '@prisma/client';

import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Users = {
  async createUser(
    email: string,
    password: string,
    name: string,
    educationLevel: string,
  ) {
    const educationLevelEnum: EducationLevel = educationLevel as EducationLevel;
    return await prisma.user.create({
      data: {
        name,
        role: 'USER',
        email,
        password,
        educationLevel: educationLevelEnum,
      },
    });
  },

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  async updateUserByEmail(
    email: string,
    data: { name?: string; educationLevel?: any },
  ) {
    return prisma.user.update({
      where: { email: email },
      data: {
        name: data.name,
        educationLevel: data.educationLevel,
      },
    });
  },
};
