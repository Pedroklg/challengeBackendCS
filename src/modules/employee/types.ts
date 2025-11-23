import { Address } from '../../db/models/AddressModel';
import { ActivityStatus } from '../../shared/types';

export interface CreateEmployeeRequest {
  companyId: string;
  name: string;
  email: string;
  position: string;
  password: string;
  status?: ActivityStatus;
  terminationDate?: Date;
  address?: Address;
}

export type UpdateEmployeeRequest = Partial<CreateEmployeeRequest>;

export interface EmployeeResponseRequest extends Omit<CreateEmployeeRequest, 'password'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
