import { Request, Response } from 'express';
import { CreateEmployeeUseCase } from './useCases/CreateEmployeeUseCase';
import { GetEmployeeUseCase } from './useCases/GetEmployeeUseCase';
import { UpdateEmployeeUseCase } from './useCases/UpdateEmployeeUseCase';
import { DeleteEmployeeUseCase } from './useCases/DeleteEmployeeUseCase';
import { ListEmployeesByCompanyUseCase } from './useCases/ListEmployeesByCompanyUseCase';
import { MongoEmployeeRepository } from './repositories/MongoEmployeeRepository';
import { MongoCompanyRepository } from 'modules/company/repositories/MongoCompanyRepository';

export class EmployeeController {
  async create(req: Request, res: Response): Promise {
    const employeeRepository = new MongoEmployeeRepository();
    const companyRepository = new MongoCompanyRepository();
    const useCase = new CreateEmployeeUseCase(employeeRepository, companyRepository);
    
    const employee = await useCase.execute(req.body);
    
    const { password, ...employeeWithoutPassword } = employee;
    
    return res.status(201).json(employeeWithoutPassword);
  }

  async getById(req: Request, res: Response): Promise {
    const repository = new MongoEmployeeRepository();
    const useCase = new GetEmployeeUseCase(repository);
    
    const employee = await useCase.execute(req.params.id);
    
    const { password, ...employeeWithoutPassword } = employee;
    
    return res.status(200).json(employeeWithoutPassword);
  }

  async listByCompany(req: Request, res: Response): Promise {
    const employeeRepository = new MongoEmployeeRepository();
    const companyRepository = new MongoCompanyRepository();
    const useCase = new ListEmployeesByCompanyUseCase(employeeRepository, companyRepository);
    
    const employees = await useCase.execute(req.params.companyId);
    
    const employeesWithoutPassword = employees.map(({ password, ...employee }) => employee);
    
    return res.status(200).json(employeesWithoutPassword);
  }

  async update(req: Request, res: Response): Promise {
    const repository = new MongoEmployeeRepository();
    const useCase = new UpdateEmployeeUseCase(repository);
    
    const employee = await useCase.execute(req.params.id, req.body);
    
    const { password, ...employeeWithoutPassword } = employee;
    
    return res.status(200).json(employeeWithoutPassword);
  }

  async delete(req: Request, res: Response): Promise {
    const repository = new MongoEmployeeRepository();
    const useCase = new DeleteEmployeeUseCase(repository);
    
    await useCase.execute(req.params.id);
    
    return res.status(204).send();
  }
}