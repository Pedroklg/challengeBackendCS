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
  async create(
    req: Request<NoParams, CompanyResponse, CreateCompanyRequest>,
    res: Response
  ): Promise<Response> {
    const repository = new MongoCompanyRepository();
    const employeeRepository = new MongoEmployeeRepository();

    const useCase = new CreateCompanyUseCase(repository, employeeRepository);

    const company = await useCase.execute(req.body);
    const companyObj = company.toObject();

    return res.status(201).json(companyObj);
  }

  async getById(req: Request<IdParams, CompanyResponse>, res: Response): Promise<Response> {
    const repository = new MongoCompanyRepository();

    const useCase = new GetCompanyUseCase(repository);

    const company = await useCase.execute(req.params.id);
    const companyObj = company.toObject();

    return res.status(200).json(companyObj);
  }

  async list(_req: Request<NoParams, CompanyResponse[]>, res: Response): Promise<Response> {
    const repository = new MongoCompanyRepository();

    const useCase = new ListCompaniesUseCase(repository);

    const companies = await useCase.execute();
    const companyResponses: CompanyResponse[] = companies.map((company) => {
      return company.toObject();
    });

    return res.status(200).json(companyResponses);
  }

  async update(
    req: Request<IdParams, CompanyResponse, UpdateCompanyRequest>,
    res: Response
  ): Promise<Response> {
    const repository = new MongoCompanyRepository();

    const useCase = new UpdateCompanyUseCase(repository);

    const company = await useCase.execute(req.params.id, req.body);
    const companyObj = company.toObject();

    return res.status(200).json(companyObj);
  }

  async delete(req: Request<IdParams>, res: Response): Promise<Response> {
    const companyRepository = new MongoCompanyRepository();
    const employeeRepository = new MongoEmployeeRepository();

    const useCase = new DeleteCompanyUseCase(companyRepository, employeeRepository);

    await useCase.execute(req.params.id);

    return res.status(204).send();
  }
}
