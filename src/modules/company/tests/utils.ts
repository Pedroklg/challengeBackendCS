import { faker } from '@faker-js/faker';
import { InMemoryCompanyRepository } from '../repositories/InMemoryCompanyRepository';
import { CompanyDBCreateDTO } from '../repositories/dto';
import { CreateCompanyDTO } from '../types';

export const makeFakeCompanyData = (
  overrides: Partial<CreateCompanyDTO> = {}
): CreateCompanyDTO => ({
  name: faker.company.name(),
  sector: faker.company.buzzPhrase(),
  cnpj: faker.finance.accountNumber(14),
  address: {
    state: faker.location.state({ abbreviated: true }),
    city: faker.location.city(),
    street: faker.location.street(),
    number: faker.number.int({ min: 1, max: 9999 }).toString(),
    zipcode: faker.location.zipCode(),
    complement: null,
  },
  phone: faker.phone.number(),
  ...overrides,
});

export const insertCompany = async (
  repo: InMemoryCompanyRepository,
  overrides: Partial<CreateCompanyDTO> = {}
) => {
  const data = makeFakeCompanyData(overrides);

  const dbData: CompanyDBCreateDTO = {
    ...data,
    phone: data.phone === null ? undefined : data.phone,
  };

  return repo.create(dbData);
};
