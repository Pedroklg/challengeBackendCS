import { EmployeeRepository } from './EmployeeRepository';
import { EmployeeDBCreateDTO, EmployeeDBUpdateDTO, EmployeeDBOutDTO } from './dto';
import { faker } from '@faker-js/faker';

export class InMemoryEmployeeRepository implements EmployeeRepository {
  private employees: EmployeeDBOutDTO[] = [];

  async create(employee: EmployeeDBCreateDTO): Promise<EmployeeDBOutDTO> {
    const now = new Date();

    const created = {
      id: faker.string.uuid(),
      ...employee,
      companyId: employee.companyId,
      createdAt: now,
      updatedAt: now,
    };

    this.employees.push(created);

    return created;
  }

  async findById(id: string): Promise<EmployeeDBOutDTO | null> {
    const employee = this.employees.find((employee) => employee.id === id);

    return employee ?? null;
  }

  async findByEmail(email: string): Promise<EmployeeDBOutDTO | null> {
    const employee = this.employees.find((employee) => employee.email === email);

    return employee ?? null;
  }

  async findByCompanyId(companyId: string): Promise<EmployeeDBOutDTO[]> {
    return this.employees.filter((employee) => employee.companyId?.toString() === companyId);
  }

  async findAll(): Promise<EmployeeDBOutDTO[]> {
    return [...this.employees];
  }

  async update(id: string, data: EmployeeDBUpdateDTO): Promise<EmployeeDBOutDTO | null> {
    const index = this.employees.findIndex((employee) => employee.id === id);

    if (index === -1) return null;

    const updated = {
      ...this.employees[index],
      ...data,
      updatedAt: new Date(),
    };

    this.employees[index] = updated;

    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.employees.findIndex((employee) => employee.id === id);

    if (index === -1) return false;

    this.employees.splice(index, 1);

    return true;
  }
}
