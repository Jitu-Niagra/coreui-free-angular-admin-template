import { IOrgType } from "./orgTypes.model";

export interface IOrganization {
  _id?: string;
  name: string;
  orgType: IOrgType;
  description: string;
  createdBy?: any;
  owner?: any;
}
