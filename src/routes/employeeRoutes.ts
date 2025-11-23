import { Router } from 'express';
import { validate } from '../midlewares/validation';
import { EmployeeController } from '../modules/employee/EmployeeController';
import { createEmployeeSchema, updateEmployeeSchema } from '../validators/employeeSchemas';
import {
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  EmployeeResponseRequest,
} from '../modules/employee/types';
import { CompanyIdParams, IdParams } from '../shared/types';

const employeeRoutes = Router();
const controller = new EmployeeController();

employeeRoutes.post<Record<string, never>, EmployeeResponseRequest, CreateEmployeeRequest>(
  '/',
  validate<CreateEmployeeRequest, Record<string, never>, EmployeeResponseRequest>(
    createEmployeeSchema
  ),
  (req, res, next) => controller.create(req, res).catch(next)
);

employeeRoutes.get<CompanyIdParams, EmployeeResponseRequest[]>(
  '/company/:companyId',
  (req, res, next) => controller.listByCompany(req, res).catch(next)
);

employeeRoutes.get<IdParams, EmployeeResponseRequest>('/:id', (req, res, next) =>
  controller.getById(req, res).catch(next)
);

employeeRoutes.put<IdParams, EmployeeResponseRequest, UpdateEmployeeRequest>(
  '/:id',
  validate<UpdateEmployeeRequest, IdParams, EmployeeResponseRequest>(updateEmployeeSchema),
  (req, res, next) => controller.update(req, res).catch(next)
);

employeeRoutes.delete<IdParams>('/:id', (req, res, next) =>
  controller.delete(req, res).catch(next)
);

export { employeeRoutes };
