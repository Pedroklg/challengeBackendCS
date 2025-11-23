import { Request, Response } from 'express';
import { CreateEmployeeUseCase } from './useCases/CreateEmployeeUseCase';
import { GetEmployeeUseCase } from './useCases/GetEmployeeUseCase';
import { UpdateEmployeeUseCase } from './useCases/UpdateEmployeeUseCase';
import { DeleteEmployeeUseCase } from './useCases/DeleteEmployeeUseCase';
import { ListEmployeesByCompanyUseCase } from './useCases/ListEmployeesByCompanyUseCase';
import { MongoEmployeeRepository } from './repositories/MongoEmployeeRepository';
import { MongoCompanyRepository } from '../company/repositories/MongoCompanyRepository';
import { CreateEmployeeRequest, UpdateEmployeeRequest, EmployeeResponseRequest } from './types';
import { CompanyIdParams, IdParams } from '../../shared/types';

export class EmployeeController {
  async create(
    req: Request<Record<string, never>, EmployeeResponseRequest, CreateEmployeeRequest>,
    res: Response
  ): Promise<Response> {
    const employeeRepository = new MongoEmployeeRepository();
    const companyRepository = new MongoCompanyRepository();
    const useCase = new CreateEmployeeUseCase(employeeRepository, companyRepository);

    const employee = await useCase.execute(req.body);
    const employeeResponse: EmployeeResponseRequest = {
      ...employee,
      id: employee._id.toString(),
      companyId: employee.companyId.toString(),
      address: employee.address ?? undefined,
      terminationDate: employee.terminationDate ?? undefined,
    };

    return res.status(201).json(employeeResponse);
  }

  async getById(req: Request<IdParams, EmployeeResponseRequest>, res: Response): Promise<Response> {
    const repository = new MongoEmployeeRepository();
    const useCase = new GetEmployeeUseCase(repository);

    const employee = await useCase.execute(req.params.id);
    const employeeResponse: EmployeeResponseRequest = {
      ...employee,
      id: employee._id.toString(),
      companyId: employee.companyId.toString(),
      address: employee.address ?? undefined,
      terminationDate: employee.terminationDate ?? undefined,
    };

    return res.status(200).json(employeeResponse);
  }

  async listByCompany(
    req: Request<CompanyIdParams, EmployeeResponseRequest[]>,
    res: Response
  ): Promise<Response> {
    const employeeRepository = new MongoEmployeeRepository();
    const companyRepository = new MongoCompanyRepository();
    const useCase = new ListEmployeesByCompanyUseCase(employeeRepository, companyRepository);

    const employees = await useCase.execute(req.params.companyId);
    const employeesResponse: EmployeeResponseRequest[] = employees.map((employee) => ({
      ...employee,
      id: employee._id.toString(),
      companyId: employee.companyId.toString(),
      address: employee.address ?? undefined,
      terminationDate: employee.terminationDate ?? undefined,
    }));

    return res.status(200).json(employeesResponse);
  }

  async update(
    req: Request<IdParams, EmployeeResponseRequest, UpdateEmployeeRequest>,
    res: Response
  ): Promise<Response> {
    const repository = new MongoEmployeeRepository();
    const useCase = new UpdateEmployeeUseCase(repository);

    const employee = await useCase.execute(req.params.id, req.body);
    const employeeResponse: EmployeeResponseRequest = {
      ...employee,
      id: employee._id.toString(),
      companyId: employee.companyId.toString(),
      address: employee.address ?? undefined,
      terminationDate: employee.terminationDate ?? undefined,
    };

    return res.status(200).json(employeeResponse);
  }

  async delete(req: Request<IdParams>, res: Response): Promise<Response> {
    const repository = new MongoEmployeeRepository();
    const useCase = new DeleteEmployeeUseCase(repository);

    await useCase.execute(req.params.id);

    return res.status(204).send();
  }
}
