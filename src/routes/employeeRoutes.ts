import { Router } from 'express';
import { validate } from 'midlewares/validation';
import { EmployeeController } from 'modules/employee/EmployeeController';
import { createEmployeeSchema, updateEmployeeSchema } from 'validators/employeeSchemas';

const employeeRoutes = Router();
const controller = new EmployeeController();

employeeRoutes.post(
  '/',
  validate(createEmployeeSchema),
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
  validate(updateEmployeeSchema),
  (req, res, next) => controller.update(req, res).catch(next)
);

employeeRoutes.delete(
  '/:id',
  (req, res, next) => controller.delete(req, res).catch(next)
);

export { employeeRoutes };