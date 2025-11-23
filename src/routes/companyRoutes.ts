import { Router } from 'express';
import { createCompanySchema, updateCompanySchema } from '../validators/companySchemas';
import { validate } from 'midlewares/validation';
import { CompanyController } from 'modules/company/CompanyController';

const companyRoutes = Router();
const controller = new CompanyController();

companyRoutes.post(
  '/',
  validate(createCompanySchema),
  (req, res, next) => controller.create(req, res).catch(next)
);

companyRoutes.get(
  '/',
  (req, res, next) => controller.list(req, res).catch(next)
);

companyRoutes.get(
  '/:id',
  (req, res, next) => controller.getById(req, res).catch(next)
);

companyRoutes.put(
  '/:id',
  validate(updateCompanySchema),
  (req, res, next) => controller.update(req, res).catch(next)
);

companyRoutes.delete(
  '/:id',
  (req, res, next) => controller.delete(req, res).catch(next)
);

export { companyRoutes };
