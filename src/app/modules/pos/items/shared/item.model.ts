export interface IItems {
  _jd?: string;
  name: string;
  itemCategory?: {
    _id: string;
    name: string;
  };
  inStock?: Boolean;
  price: number;
  cost: number;
  quantity: number;
  categoryToAdd?: string;
}
