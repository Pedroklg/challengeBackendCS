import { EmployeeDocument, EmployeeModel } from "db/models/EmployeeModel";
import { EmployeeRepository } from "./EmployeeRepository";

export class MongoEmployeeRepository implements EmployeeRepository {
  async create(employee: EmployeeDocument): Promise {
    const createdEmployee = await EmployeeModel.create(employee);
    return createdEmployee;
  }

  async findById(id: string): Promise {
    const employee = await EmployeeModel.findById(id);
    return employee ? employee : null;
  }

  async findByEmail(email: string): Promise {
    const employee = await EmployeeModel.findOne({ email });
    return employee ? employee : null;
  }

  async findByCompanyId(companyId: string): Promise {
    const employees = await EmployeeModel.find({ companyId });
    return employees;
  }

  async findAll(): Promise {
    const employees = await EmployeeModel.find();
    return employees;
  }

  async update(id: string, data: Partial): Promise {
    const employee = await EmployeeModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    return employee ? employee : null;
  }

  async delete(id: string): Promise {
    const result = await EmployeeModel.findByIdAndDelete(id);
    return !!result;
  }
}