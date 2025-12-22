/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { EducationLevel } from '@prisma/client';

export interface UpdateProfileRequest {
  name?: string;
  educationLevel?: EducationLevel;
}
