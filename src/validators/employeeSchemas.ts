import { z } from 'zod';
import { createAddressSchema, updateAddressSchema } from './addressSchemas';
import { ActivityStatus } from '../shared/types';

export const createEmployeeSchema = z.object({
  companyId: z.string().min(1, 'Company ID is required'),
  name: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.email('Invalid email format'),
  position: z.string().min(2, 'Position must have at least 2 characters'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
  status: z.enum(ActivityStatus).optional(),
  terminationDate: z.iso.datetime().optional(),
  address: createAddressSchema.optional(),
});

export const updateEmployeeSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email().optional(),
  position: z.string().min(2).optional(),
  password: z.string().min(6).optional(),
  status: z.enum(ActivityStatus).optional(),
  terminationDate: z.iso.datetime().optional(),
  address: updateAddressSchema.optional(),
});
