import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';

const employeeRoutes = Router();
const controller = new EmployeeController();

employeeRoutes.post(
  '/',
  (req, res, next) => controller.create(req, res).catch(next)
);

employeeRoutes.get(
  '/company/:companyId',
  (req, res, next) => controller.listByCompany(req, res).catch(next)
);

employeeRoutes.get(
  '/:id',
  (req, res, next) => controller.getById(req, res).catch(next)
);

employeeRoutes.put(
  '/:id',
  (req, res, next) => controller.update(req, res).catch(next)
);

employeeRoutes.delete(
  '/:id',
  (req, res, next) => controller.delete(req, res).catch(next)
);

export { employeeRoutes };