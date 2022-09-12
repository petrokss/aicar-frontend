import { request } from './api';
import type { UserResponse, RegisterUserInput, LoginUserInput } from '../types';

export const login = async (userInfo: LoginUserInput) =>
  await request<void>('POST', '/api/login', { data: userInfo, withCredentials: true });

export const registerUser = async (registerUserPayload: RegisterUserInput) => {
  await request<UserResponse>('POST', '/api/register', {
    data: registerUserPayload,
  });
  const userCredentials = {
    username: registerUserPayload.email,
    password: registerUserPayload.password,
  };
  return await login(userCredentials);
};

export const createUser = async (createUserPayload: any) => {
  const response = await request<UserResponse>('POST', '/api/user', { data: createUserPayload });
  return response;
};
