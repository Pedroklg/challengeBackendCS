import { Schema } from 'mongoose';

export interface Address {
  state: string;
  city: string;
  street?: string | null;
  number?: string | null;
  zipcode?: string | null;
  complement?: string | null;
}

export const AddressSchema = new Schema(
  {
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String },
    number: { type: String },
    zipcode: { type: String },
    complement: { type: String },
  },
  { _id: false }
);
