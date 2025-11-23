import mongoose, { Schema, Document } from 'mongoose';
import { Address, AddressSchema } from './AddressModel';
import { ActivityStatus } from '@shared/types';

export interface EmployeeDocument extends Document {
  companyId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  position: string;
  password: string;
  status: ActivityStatus;
  terminationDate?: Date;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ActivityStatus, default: ActivityStatus.ACTIVE},
    terminationDate: { type: Date }
    ,
    address: { type: AddressSchema }
  },
  {
    timestamps: true
  }
);

export const EmployeeModel = mongoose.model('Employee', EmployeeSchema);