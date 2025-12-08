import { type EducationLevel } from '@prisma/client';

import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Users = {
  async createUser(
    email: string,
    password: string,
    name: string,
    dateOfBirth: Date,
    educationLevel: string,
  ) {
    const educationLevelEnum: EducationLevel = educationLevel as EducationLevel;
    return await prisma.user.create({
      data: {
        name,
        role: 'USER',
        email,
        password,
        dateOfBirth,
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
};
