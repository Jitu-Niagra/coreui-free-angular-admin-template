import { ITransaction } from "../../../sales/models/transaction.model";

export interface ICustomer {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: number;
  address: string;
  city: string;
  region: string;
  postCode: number;
  country: string;
  transactions?: ITransaction[];
}
