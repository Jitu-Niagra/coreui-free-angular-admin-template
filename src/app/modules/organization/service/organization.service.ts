import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { IApiHTTPResponse } from "../../shared/models/api.response.model";
import { IOrganization } from "../models/organization.model";
import { IOrgType } from "../models/orgTypes.model";

@Injectable({
  providedIn: "root",
})
export class OrganizationService {
  constructor(private http: HttpClient) {}

  public getOrganizations(): Observable<IApiHTTPResponse<IOrganization[]>> {
    return this.http.get<IApiHTTPResponse<IOrganization[]>>(
      `${environment.server_Url}organization`
    );
  }
  public getOrganizationTypes(): Observable<IApiHTTPResponse<IOrgType[]>> {
    return this.http.get<IApiHTTPResponse<IOrgType[]>>(
      `${environment.server_Url}organizationTypes/`
    );
  }
  public getOrganization(org) {
    return this.http.get(`${environment.server_Url}organization/${org._id}`);
  }

  public createOrganization(org: IOrganization) {
    return this.http.post<IApiHTTPResponse<IOrganization>>(
      `${environment.server_Url}organization`,
      org
    );
  }
  public editOrganization(org: {}, orgId: string) {
    return this.http.post(
      `${environment.server_Url}organization/${orgId}`,
      org
    );
  }
  public setCurrentOrganization(orgId) {
    return this.http.get(
      `${environment.server_Url}organization/current/${orgId}`
    );
  }
  public getCurrentOrganization(): Observable<
    IApiHTTPResponse<{
      _id: string;
      organization: { _id: string; name: string };
    }>
  > {
    return this.http.get<
      IApiHTTPResponse<{
        _id: string;
        organization: { _id: string; name: string };
      }>
    >(`${environment.server_Url}organization/current`);
  }

  public deleteOrganization(orgId) {
    return this.http.delete(`${environment.server_Url}organization/${orgId}`);
  }

  // ADMIN
  public getAllOrganizations(): Observable<IApiHTTPResponse<IOrganization[]>> {
    return this.http.get<IApiHTTPResponse<IOrganization[]>>(
      `${environment.server_Url}organization/sysadmin/all`
    );
  }
}
