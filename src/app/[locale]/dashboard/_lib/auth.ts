import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, { message: 'min_length' }),
  password: z.string().min(3, { message: 'min_length' }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
}
