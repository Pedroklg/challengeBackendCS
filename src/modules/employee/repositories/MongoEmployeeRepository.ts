import { EmployeeModel } from '../../../db/models/EmployeeModel';
import { EmployeeRepository } from './EmployeeRepository';
import { EmployeeDBCreateDTO, EmployeeDBUpdateDTO, EmployeeDBOutDTO } from './dto';
import { EmployeeDocument } from '../../../db/models/EmployeeModel';

export class MongoEmployeeRepository implements EmployeeRepository {
  private format = (doc: EmployeeDocument): EmployeeDBOutDTO => {
    return {
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      name: doc.name,
      email: doc.email,
      position: doc.position,
      status: doc.status,
      terminationDate: doc.terminationDate ?? undefined,
      address: doc.address ?? undefined,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  };

  async create(employee: EmployeeDBCreateDTO): Promise<EmployeeDBOutDTO> {
    const createdEmployee = await EmployeeModel.create(employee);

    return this.format(createdEmployee);
  }

  async findById(id: string): Promise<EmployeeDBOutDTO | null> {
    const employee = await EmployeeModel.findById(id);

    return employee ? this.format(employee) : null;
  }

  async findByEmail(email: string): Promise<EmployeeDBOutDTO | null> {
    const employee = await EmployeeModel.findOne({ email });

    return employee ? this.format(employee) : null;
  }

  async findByCompanyId(companyId: string): Promise<EmployeeDBOutDTO[]> {
    const employees = await EmployeeModel.find({ companyId });

    return employees.map((employee) => this.format(employee));
  }

  async findAll(): Promise<EmployeeDBOutDTO[]> {
    const employees = await EmployeeModel.find();

    return employees.map((employee) => this.format(employee));
  }

  async update(id: string, data: EmployeeDBUpdateDTO): Promise<EmployeeDBOutDTO | null> {
    const employee = await EmployeeModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    return employee ? this.format(employee) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await EmployeeModel.findByIdAndDelete(id);

    return !!result;
  }
}
