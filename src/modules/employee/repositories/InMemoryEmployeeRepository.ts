import { EmployeeRepository } from './EmployeeRepository';
import { EmployeeDBCreateDTO, EmployeeDBUpdateDTO, EmployeeDBOutDTO } from './dto';
import { faker } from '@faker-js/faker';

export class InMemoryEmployeeRepository implements EmployeeRepository {
  private employees: EmployeeDBOutDTO[] = [];

  async create(employee: EmployeeDBCreateDTO): Promise<EmployeeDBOutDTO> {
    const now = new Date();

    const created = {
      ...employee,
      _id: faker.string.uuid(),
      companyId: employee.companyId,
      createdAt: now,
      updatedAt: now,
    } as unknown as EmployeeDBOutDTO;

    this.employees.push(created);

    return created;
  }

  async findById(id: string): Promise<EmployeeDBOutDTO | null> {
    const employee = this.employees.find((e) => e._id.toString() === id);

    return employee ?? null;
  }

  async findByEmail(email: string): Promise<EmployeeDBOutDTO | null> {
    const employee = this.employees.find((e) => e.email === email);

    return employee ?? null;
  }

  async findByCompanyId(companyId: string): Promise<EmployeeDBOutDTO[]> {
    return this.employees.filter((e) => e.companyId?.toString() === companyId);
  }

  async findAll(): Promise<EmployeeDBOutDTO[]> {
    return [...this.employees];
  }

  async update(id: string, data: EmployeeDBUpdateDTO): Promise<EmployeeDBOutDTO | null> {
    const index = this.employees.findIndex((e) => e._id.toString() === id);

    if (index === -1) return null;

    const updated = {
      ...this.employees[index],
      ...data,
      updatedAt: new Date(),
    } as EmployeeDBOutDTO;

    this.employees[index] = updated;

    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.employees.findIndex((e) => e._id.toString() === id);

    if (index === -1) return false;

    this.employees.splice(index, 1);

    return true;
  }
}
