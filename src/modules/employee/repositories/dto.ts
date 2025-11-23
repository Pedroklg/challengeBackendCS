import { EmployeeDocument } from '../../../db/models/EmployeeModel';

export type EmployeeDBCreateDTO = Omit<
  Pick<
    EmployeeDocument,
    | 'companyId'
    | 'name'
    | 'email'
    | 'position'
    | 'password'
    | 'status'
    | 'terminationDate'
    | 'address'
  >,
  'companyId' | 'status'
> & {
  companyId: string | EmployeeDocument['companyId'];
  status?: EmployeeDocument['status'];
};

export type EmployeeDBUpdateDTO = Partial<EmployeeDBCreateDTO>;

export type EmployeeDBOutDTO = EmployeeDocument;
