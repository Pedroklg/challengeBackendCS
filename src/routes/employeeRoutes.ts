import { Router } from 'express';
import { validate } from '../midlewares/validation';
import { EmployeeController } from '../modules/employee/EmployeeController';
import { createEmployeeSchema, updateEmployeeSchema } from '../validators/employeeSchemas';
import {
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  EmployeeResponse,
} from '../modules/employee/types';
import { CompanyIdParams, IdParams, NoParams } from '../shared/types';

const employeeRoutes = Router();
const controller = new EmployeeController();

employeeRoutes.post<NoParams, EmployeeResponse, CreateEmployeeRequest>(
  '/',
  validate<CreateEmployeeRequest, NoParams, EmployeeResponse>(createEmployeeSchema),
  (req, res, next) => controller.create(req, res).catch(next)
);

employeeRoutes.get<CompanyIdParams, EmployeeResponse[]>('/company/:companyId', (req, res, next) =>
  controller.listByCompany(req, res).catch(next)
);

employeeRoutes.get<IdParams, EmployeeResponse>('/:id', (req, res, next) =>
  controller.getById(req, res).catch(next)
);

employeeRoutes.put<IdParams, EmployeeResponse, UpdateEmployeeRequest>(
  '/:id',
  validate<UpdateEmployeeRequest, IdParams, EmployeeResponse>(updateEmployeeSchema),
  (req, res, next) => controller.update(req, res).catch(next)
);

employeeRoutes.delete<IdParams>('/:id', (req, res, next) =>
  controller.delete(req, res).catch(next)
);

export { employeeRoutes };
