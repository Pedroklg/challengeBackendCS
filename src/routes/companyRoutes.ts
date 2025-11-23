import { Router } from 'express';
import { createCompanySchema, updateCompanySchema } from '../validators/companySchemas';
import { validate } from './../midlewares/validation';
import { CompanyController } from '../modules/company/CompanyController';
import { CreateCompanyDTO, UpdateCompanyDTO, CompanyResponseDTO } from 'modules/company/types';
import { IdParams } from '../shared/types';

const companyRoutes = Router();
const controller = new CompanyController();

companyRoutes.post<Record<string, never>, CompanyResponseDTO, CreateCompanyDTO>(
  '/',
  validate<CreateCompanyDTO, Record<string, never>, CompanyResponseDTO>(createCompanySchema),
  (req, res, next) => controller.create(req, res).catch(next)
);

companyRoutes.get('/', (req, res, next) => controller.list(req, res).catch(next));

companyRoutes.get<IdParams, CompanyResponseDTO>('/:id', (req, res, next) =>
  controller.getById(req, res).catch(next)
);

companyRoutes.put<IdParams, CompanyResponseDTO, UpdateCompanyDTO>(
  '/:id',
  validate<UpdateCompanyDTO, IdParams, CompanyResponseDTO>(updateCompanySchema),
  (req, res, next) => controller.update(req, res).catch(next)
);

companyRoutes.delete<IdParams>('/:id', (req, res, next) => controller.delete(req, res).catch(next));

export { companyRoutes };
