import mongoose, { Schema, Document } from 'mongoose';
import { Address, AddressSchema } from './AddressModel';

export interface CompanyDocument extends Document {
  name: string;
  sector: string;
  cnpj: string;
  address: Address;
  phone?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema(
  {
    name: { type: String, required: true },
    sector: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    address: { type: AddressSchema, required: true },
    phone: { type: String },
  },
  {
    timestamps: true,
  }
);

export const CompanyModel = mongoose.model('Company', CompanySchema);
