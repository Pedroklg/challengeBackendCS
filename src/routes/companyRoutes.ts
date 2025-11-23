import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';

const companyRoutes = Router();
const controller = new CompanyController();

companyRoutes.post(
  '/',
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
  (req, res, next) => controller.update(req, res).catch(next)
);

companyRoutes.delete(
  '/:id',
  (req, res, next) => controller.delete(req, res).catch(next)
);

export { companyRoutes };