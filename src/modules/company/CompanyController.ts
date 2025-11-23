import { Request, Response } from 'express';
import { CreateCompanyUseCase } from './useCases/CreateCompanyUseCase';
import { GetCompanyUseCase } from './useCases/GetCompanyUseCase';
import { UpdateCompanyUseCase } from './useCases/UpdateCompanyUseCase';
import { DeleteCompanyUseCase } from './useCases/DeleteCompanyUseCase';
import { ListCompaniesUseCase } from './useCases/ListCompaniesUseCase';
import { MongoCompanyRepository } from './repositories/MongoCompanyRepository';
import { MongoEmployeeRepository } from 'modules/employee/repositories/MongoEmployeeRepository';

export class CompanyController {
  async create(req: Request, res: Response): Promise {
    const repository = new MongoCompanyRepository();
    const useCase = new CreateCompanyUseCase(repository);
    
    const company = await useCase.execute(req.body);
    
    return res.status(201).json(company);
  }

  async getById(req: Request, res: Response): Promise {
    const repository = new MongoCompanyRepository();
    const useCase = new GetCompanyUseCase(repository);
    
    const company = await useCase.execute(req.params.id);
    
    return res.status(200).json(company);
  }

  async list(req: Request, res: Response): Promise {
    const repository = new MongoCompanyRepository();
    const useCase = new ListCompaniesUseCase(repository);
    
    const companies = await useCase.execute();
    
    return res.status(200).json(companies);
  }

  async update(req: Request, res: Response): Promise {
    const repository = new MongoCompanyRepository();
    const useCase = new UpdateCompanyUseCase(repository);
    
    const company = await useCase.execute(req.params.id, req.body);
    
    return res.status(200).json(company);
  }

  async delete(req: Request, res: Response): Promise {
    const companyRepository = new MongoCompanyRepository();
    const employeeRepository = new MongoEmployeeRepository();
    const useCase = new DeleteCompanyUseCase(companyRepository, employeeRepository);
    
    await useCase.execute(req.params.id);
    
    return res.status(204).send();
  }
}