import { z } from 'zod';

export const createAddressSchema = z.object({
  state: z.string().length(2, 'State must have 2 characters'),
  city: z.string().min(2, 'City must have at least 2 characters'),
  street: z.string().optional(),
  number: z.string().optional(),
  zipcode: z.string().optional(),
  complement: z.string().optional()
});

export const updateAddressSchema = z.object({
  state: z.string().length(2).optional(),
  city: z.string().min(2).optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  zipcode: z.string().optional(),
  complement: z.string().optional()
});
