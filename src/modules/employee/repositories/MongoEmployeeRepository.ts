import { EmployeeModel } from '../../../db/models/EmployeeModel';
import { EmployeeRepository } from './EmployeeRepository';
import { EmployeeDBCreateDTO, EmployeeDBUpdateDTO, EmployeeDBOutDTO } from './dto';

export class MongoEmployeeRepository implements EmployeeRepository {
  async create(employee: EmployeeDBCreateDTO): Promise<EmployeeDBOutDTO> {
    const createdEmployee = await EmployeeModel.create(employee);

    return createdEmployee;
  }

  async findById(id: string): Promise<EmployeeDBOutDTO | null> {
    const employee = await EmployeeModel.findById(id);

    return employee ?? null;
  }

  async findByEmail(email: string): Promise<EmployeeDBOutDTO | null> {
    const employee = await EmployeeModel.findOne({ email });

    return employee ?? null;
  }

  async findByCompanyId(companyId: string): Promise<EmployeeDBOutDTO[]> {
    const employees = await EmployeeModel.find({ companyId });

    return employees;
  }

  async findAll(): Promise<EmployeeDBOutDTO[]> {
    const employees = await EmployeeModel.find();

    return employees;
  }

  async update(id: string, data: EmployeeDBUpdateDTO): Promise<EmployeeDBOutDTO | null> {
    const employee = await EmployeeModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    return employee ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await EmployeeModel.findByIdAndDelete(id);

    return !!result;
  }
}
