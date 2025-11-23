import { Router } from 'express';
import { createCompanySchema, updateCompanySchema } from '../validators/companySchemas';
import { validate } from './../midlewares/validation';
import { CompanyController } from '../modules/company/CompanyController';
import { CreateCompanyRequest, UpdateCompanyRequest, CompanyResponse } from 'modules/company/types';
import { IdParams, NoParams } from '../shared/types';

const companyRoutes = Router();
const controller = new CompanyController();

companyRoutes.post<NoParams, CompanyResponse, CreateCompanyRequest>(
  '/',
  validate<CreateCompanyRequest, NoParams, CompanyResponse>(createCompanySchema),
  (req, res, next) => controller.create(req, res).catch(next)
);

companyRoutes.get('/', (req, res, next) => controller.list(req, res).catch(next));

companyRoutes.get<IdParams, CompanyResponse>('/:id', (req, res, next) =>
  controller.getById(req, res).catch(next)
);

companyRoutes.put<IdParams, CompanyResponse, UpdateCompanyRequest>(
  '/:id',
  validate<UpdateCompanyRequest, IdParams, CompanyResponse>(updateCompanySchema),
  (req, res, next) => controller.update(req, res).catch(next)
);

companyRoutes.delete<IdParams>('/:id', (req, res, next) => controller.delete(req, res).catch(next));

export { companyRoutes };
