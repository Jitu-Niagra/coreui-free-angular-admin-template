import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { IApiHTTPResponse } from "../../../shared/models/api.response.model";
import { ICustomer } from "../shared/customer.model";

@Injectable({
  providedIn: "root",
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<IApiHTTPResponse<ICustomer[]>> {
    return this.http.get<IApiHTTPResponse<ICustomer[]>>(
      `${environment.server_Url}pos/customer`
    );
  }
  public addCustomers(customer): Observable<IApiHTTPResponse<ICustomer>> {
    return this.http.post<IApiHTTPResponse<ICustomer>>(
      `${environment.server_Url}pos/customer`,
      customer
    );
  }
  public getCustomer(customerId): Observable<IApiHTTPResponse<ICustomer>> {
    return this.http.get<IApiHTTPResponse<ICustomer>>(
      `${environment.server_Url}pos/customer/${customerId}`
    );
  }
  public updateCustomer(
    customerId,
    customer: {}
  ): Observable<IApiHTTPResponse<ICustomer>> {
    return this.http.post<IApiHTTPResponse<ICustomer>>(
      `${environment.server_Url}pos/customer/${customerId}`,
      customer
    );
  }
  public deleteCustomer(
    customerId: string
  ): Observable<IApiHTTPResponse<ICustomer>> {
    return this.http.delete<IApiHTTPResponse<ICustomer>>(
      `${environment.server_Url}pos/customer/${customerId}`
    );
  }
}
