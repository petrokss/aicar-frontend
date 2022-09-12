import { z } from 'zod';

export const loginUserSchema = z.object({
  username: z.string({ required_error: 'The username is required' }),
  password: z.string({ required_error: 'The password is required' }),
});

export const registerUserSchema = z.object({
  name: z.string({ required_error: 'The name is required' }),
  email: z.string({ required_error: 'The name is required' }).email(),
  password: z.string({ required_error: 'The password is required' }),
});
