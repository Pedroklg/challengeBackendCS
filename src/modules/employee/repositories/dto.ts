import { Address } from '../../../db/models/AddressModel';
import { ActivityStatus } from '../../../shared/types';

export type EmployeeDBCreateDTO = {
  companyId: string;
  name: string;
  email: string;
  position: string;
  password: string;
  status: ActivityStatus;
  terminationDate?: Date;
  address?: Address;
};

export type EmployeeDBUpdateDTO = Partial<EmployeeDBCreateDTO>;

export type EmployeeDBOutDTO = {
  id: string;
  companyId: string;
  name: string;
  email: string;
  position: string;
  status: ActivityStatus;
  terminationDate?: Date;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
};
