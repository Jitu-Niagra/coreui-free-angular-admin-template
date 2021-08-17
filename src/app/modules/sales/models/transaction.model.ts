import { IItems } from "../../pos/items/shared/item.model";

export interface ITransaction {
  _id?: string;
  status: string;
  paymentTerm: string;
  items: IItems[];
  customer: {
    name: string;
  };
  total: number;
  organization?: {
    name: string;
  };
  transactionNumber?: number;
  transactionCode?: string;
}
