import { z } from 'zod';
import { createAddressSchema, updateAddressSchema } from './addressSchemas';

export const createCompanySchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  sector: z.string().min(2, 'Sector must have at least 2 characters'),
  cnpj: z.string().regex(/^\d{14}$/, 'CNPJ must have 14 digits'),
  address: createAddressSchema,
  phone: z.string().optional()
});

export const updateCompanySchema = z.object({
  name: z.string().min(2).optional(),
  sector: z.string().min(2).optional(),
  cnpj: z.string().regex(/^\d{14}$/).optional(),
  address: updateAddressSchema.optional(),
  phone: z.string().optional()
});