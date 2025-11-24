import { Request, Response } from 'express';
import { CreateEmployeeUseCase } from './useCases/CreateEmployeeUseCase';
import { GetEmployeeUseCase } from './useCases/GetEmployeeUseCase';
import { UpdateEmployeeUseCase } from './useCases/UpdateEmployeeUseCase';
import { DeleteEmployeeUseCase } from './useCases/DeleteEmployeeUseCase';
import { ListEmployeesByCompanyUseCase } from './useCases/ListEmployeesByCompanyUseCase';
import { MongoEmployeeRepository } from './repositories/MongoEmployeeRepository';
import { MongoCompanyRepository } from '../company/repositories/MongoCompanyRepository';
import { CreateEmployeeRequest, UpdateEmployeeRequest, EmployeeResponse } from './types';
import { CompanyIdParams, IdParams, NoParams } from '../../shared/types';

export class EmployeeController {
  private readonly employeeRepository = new MongoEmployeeRepository();
  private readonly companyRepository = new MongoCompanyRepository();

  async create(
    req: Request<NoParams, EmployeeResponse, CreateEmployeeRequest>,
    res: Response
  ): Promise<Response> {
    const useCase = new CreateEmployeeUseCase(this.employeeRepository, this.companyRepository);

    const employee = await useCase.execute(req.body);

    return res.status(201).json(employee);
  }

  async getById(req: Request<IdParams, EmployeeResponse>, res: Response): Promise<Response> {
    const useCase = new GetEmployeeUseCase(this.employeeRepository);

    const employee = await useCase.execute(req.params.id);

    return res.status(200).json(employee);
  }

  async listByCompany(
    req: Request<CompanyIdParams, EmployeeResponse[]>,
    res: Response
  ): Promise<Response> {
    const useCase = new ListEmployeesByCompanyUseCase(
      this.employeeRepository,
      this.companyRepository
    );

    const employees = await useCase.execute(req.params.companyId);

    return res.status(200).json(employees);
  }

  async update(
    req: Request<IdParams, EmployeeResponse, UpdateEmployeeRequest>,
    res: Response
  ): Promise<Response> {
    const useCase = new UpdateEmployeeUseCase(this.employeeRepository);

    const employee = await useCase.execute(req.params.id, req.body);

    return res.status(200).json(employee);
  }

  async delete(req: Request<IdParams>, res: Response): Promise<Response> {
    const useCase = new DeleteEmployeeUseCase(this.employeeRepository);

    await useCase.execute(req.params.id);

    return res.status(204).send();
  }
}
