import { EmployeeDBCreateDTO, EmployeeDBUpdateDTO, EmployeeDBOutDTO } from './dto';

export interface EmployeeRepository {
  create(employee: EmployeeDBCreateDTO): Promise<EmployeeDBOutDTO>;
  findById(id: string): Promise<EmployeeDBOutDTO | null>;
  findByEmail(email: string): Promise<EmployeeDBOutDTO | null>;
  findByCompanyId(companyId: string): Promise<EmployeeDBOutDTO[]>;
  findAll(): Promise<EmployeeDBOutDTO[]>;
  update(id: string, data: EmployeeDBUpdateDTO): Promise<EmployeeDBOutDTO | null>;
  delete(id: string): Promise<boolean>;
}
