import { z } from 'zod';
import { registerUserSchema, loginUserSchema } from '../schemas';

export enum Role {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
  MANAGER = 'ROLE_MANAGER',
}

export type User = {
  id: string | number;
  name: string;
  email: string;
  password: string;
  role: Role;
  description?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type UserResponse = {
  user: User;
};

export type LoginUserInput = z.infer<typeof loginUserSchema> & { serverError?: string };

export type RegisterUserInput = z.infer<typeof registerUserSchema> & { serverError?: string };

export type RegisterUserInputKeys = keyof RegisterUserInput;
