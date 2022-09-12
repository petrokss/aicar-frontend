import { ZodIssue } from 'zod';

export function isZodIssue(error: any): error is ZodIssue[] {
  return Array.isArray(error) && 'code' in error[0] && 'path' in error[0] && 'message' in error[0];
}
