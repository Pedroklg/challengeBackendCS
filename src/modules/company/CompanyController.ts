import { Request, Response } from 'express';
import { CreateCompanyUseCase } from './useCases/CreateCompanyUseCase';
import { GetCompanyUseCase } from './useCases/GetCompanyUseCase';
import { UpdateCompanyUseCase } from './useCases/UpdateCompanyUseCase';
import { DeleteCompanyUseCase } from './useCases/DeleteCompanyUseCase';
import { ListCompaniesUseCase } from './useCases/ListCompaniesUseCase';
import { MongoCompanyRepository } from './repositories/MongoCompanyRepository';
import { MongoEmployeeRepository } from '../employee/repositories/MongoEmployeeRepository';
import { CreateCompanyRequest, UpdateCompanyRequest, CompanyResponse } from './types';
import { IdParams, NoParams } from '../../shared/types';

export class CompanyController {
  private readonly companyRepository = new MongoCompanyRepository();
  private readonly employeeRepository = new MongoEmployeeRepository();

  async create(
    req: Request<NoParams, CompanyResponse, CreateCompanyRequest>,
    res: Response
  ): Promise<Response> {
    const useCase = new CreateCompanyUseCase(this.companyRepository, this.employeeRepository);

    const company = await useCase.execute(req.body);

    return res.status(201).json(company);
  }

  async getById(req: Request<IdParams, CompanyResponse>, res: Response): Promise<Response> {
    const useCase = new GetCompanyUseCase(this.companyRepository);

    const company = await useCase.execute(req.params.id);

    return res.status(200).json(company);
  }

  async list(_req: Request<NoParams, CompanyResponse[]>, res: Response): Promise<Response> {
    const useCase = new ListCompaniesUseCase(this.companyRepository);

    const companies = await useCase.execute();

    return res.status(200).json(companies);
  }

  async update(
    req: Request<IdParams, CompanyResponse, UpdateCompanyRequest>,
    res: Response
  ): Promise<Response> {
    const useCase = new UpdateCompanyUseCase(this.companyRepository);

    const company = await useCase.execute(req.params.id, req.body);

    return res.status(200).json(company);
  }

  async delete(req: Request<IdParams>, res: Response): Promise<Response> {
    const useCase = new DeleteCompanyUseCase(this.companyRepository, this.employeeRepository);

    await useCase.execute(req.params.id);

    return res.status(204).send();
  }
}
