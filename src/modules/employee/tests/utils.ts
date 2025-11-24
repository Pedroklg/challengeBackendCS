import { InMemoryEmployeeRepository } from '../repositories/InMemoryEmployeeRepository';
import { InMemoryCompanyRepository } from '../../company/repositories/InMemoryCompanyRepository';
import { EmployeeDBCreateDTO } from '../repositories/dto';
import { CompanyDBCreateDTO } from '../../company/repositories/dto';
import { CreateEmployeeRequest } from '../types';
import { CreateCompanyRequest } from '../../company/types';
import { faker } from '@faker-js/faker';
import { ActivityStatus } from '../../../shared/types';
import { makeFakeCompanyData } from '../../company/tests/utils';

export const makeFakeEmployeeData = (
  companyId: string,
  overrides: Partial<CreateEmployeeRequest> = {}
): CreateEmployeeRequest => ({
  companyId,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  position: faker.person.jobTitle(),
  password: 'Password123!',
  status: ActivityStatus.ACTIVE,
  address: {
    state: faker.location.state({ abbreviated: true }),
    city: faker.location.city(),
    street: faker.location.street(),
    number: faker.number.int({ min: 1, max: 9999 }).toString(),
    zipcode: faker.location.zipCode(),
    complement: null,
  },
  ...overrides,
});

export const insertCompany = async (
  companyRepo: InMemoryCompanyRepository,
  overrides: Partial<CreateCompanyRequest> = {}
) => {
  const data = makeFakeCompanyData(overrides);

  const dbData: CompanyDBCreateDTO = {
    ...data,
    phone: data.phone === null ? undefined : data.phone,
  };

  return companyRepo.create(dbData);
};

export const insertEmployee = async (
  employeeRepo: InMemoryEmployeeRepository,
  companyRepo: InMemoryCompanyRepository,
  overrides: Partial<CreateEmployeeRequest> = {}
) => {
  const company = await insertCompany(companyRepo);

  const employee = makeFakeEmployeeData(company.id, overrides);

  const dbEmployeeData: EmployeeDBCreateDTO = {
    ...employee,
    companyId: employee.companyId,
  };

  return employeeRepo.create(dbEmployeeData);
};
