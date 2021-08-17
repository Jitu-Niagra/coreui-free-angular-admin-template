export interface ISale {
  _id?: string;
  paymentTerm: string;
  items: [
    {
      _id: string;
      name: string;
      quantity: number;
      price: number;
      totalItems?: number;
    }
  ];
  total?: number;
  customer: string[];
}
