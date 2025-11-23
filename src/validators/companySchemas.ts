import { z } from 'zod';
import { createAddressSchema, updateAddressSchema } from './addressSchemas';
import isValidCNPJ from '../shared/utils/validateCNPJ';

export const createCompanySchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  sector: z.string().min(2, 'Sector must have at least 2 characters'),
  cnpj: z.preprocess(
    (val) => (typeof val === 'string' ? val.replace(/[^\d]+/g, '') : val),
    z
      .string()
      .length(14, 'CNPJ must have 14 digits')
      .refine((value) => isValidCNPJ(value), { message: 'Invalid CNPJ' })
  ),
  address: createAddressSchema,
  phone: z.string().optional(),
});

export const updateCompanySchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters').optional(),
  sector: z.string().min(2, 'Sector must have at least 2 characters').optional(),
  cnpj: z.preprocess(
    (val) => (typeof val === 'string' ? val.replace(/[^\d]+/g, '') : val),
    z
      .string()
      .length(14)
      .refine((value) => isValidCNPJ(value), { message: 'Invalid CNPJ' })
      .optional()
  ),
  address: updateAddressSchema.optional(),
  phone: z.string().optional(),
});
