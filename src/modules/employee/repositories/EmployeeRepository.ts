import { EmployeeDocument } from "db/models/EmployeeModel";

export interface EmployeeRepository {
  create(employee: EmployeeDocument): Promise;
  findById(id: string): Promise;
  findByEmail(email: string): Promise;
  findByCompanyId(companyId: string): Promise;
  findAll(): Promise;
  update(id: string, data: Partial): Promise;
  delete(id: string): Promise;
}