// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

import { CustomError } from '../middleware';
import { type LoginRequest, type RegisterRequest } from '../models';
import { Users } from '../repositories';
import { generateAccessToken, tokenDecode } from '../utils/JwtToken';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthService = {
  async register(request: RegisterRequest) {
    try {
      const emailFind = await Users.findUserByEmail(request.email);

      if (emailFind) {
        throw new CustomError(StatusCodes.BAD_REQUEST, 'Email already exist');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword: string = await bcrypt.hash(request.password, salt);

      const parsedDateOfBirth = new Date(request.dateOfBirth);

      const user = await Users.createUser(
        request.email,
        hashedPassword,
        request.name,
        parsedDateOfBirth,
        request.educationLevel,
      );

      const response = {
        user_id: user.id,
        nama: user.name,
        email: user.email,
        role: user.role,
        dateOfBirth: user.dateOfBirth,
        educationLevel: user.educationLevel,
      };

      return response;
    } catch (error) {
      throw error;
    }
  },

  async login(request: LoginRequest) {
    const user = await Users.findUserByEmail(request.email);

    if (!user) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'Credentials not found');
    }

    const isPasswordMatch = bcrypt.compareSync(request.password, user.password);

    if (!isPasswordMatch) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateAccessToken(payload);

    return {
      token,
      user_id: user.id,
      nama: user.name,
      email: user.email,
      role: user.role,
      dateOfBirth: user.dateOfBirth,
      educationLevel: user.educationLevel,
    };
  },

  async selfData(request: string) {
    try {
      const tokenData = tokenDecode(request);
      const selfAccount = await Users.findUserByEmail(tokenData.email);

      if (!selfAccount) {
        throw new CustomError(StatusCodes.BAD_REQUEST, 'Account not found');
      }

      const result = {
        user_id: selfAccount.id,
        nama: selfAccount.name,
        email: selfAccount.email,
        role: selfAccount.role,
        dateOfBirth: selfAccount.dateOfBirth,
        educationLevel: selfAccount.educationLevel,
      };

      return result;
    } catch (error) {
      throw error;
    }
  },
};
