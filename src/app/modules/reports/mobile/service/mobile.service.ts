import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { IApiHTTPResponse } from "../../../shared/models/api.response.model";

@Injectable({
  providedIn: "root",
})
export class MobileService {
  constructor(private http: HttpClient) {}

  getReportSummary(
    key,
    details: {}
  ): Observable<
    IApiHTTPResponse<
      [
        {
          data: [];
          totalNumberOfItems: number;
          totalNumberOfTransactions: number;
          totalSales: number;
          label: string;
        }
      ]
    >
  > {
    return this.http.post<
      IApiHTTPResponse<
        [
          {
            data: [];
            totalNumberOfItems: number;
            totalNumberOfTransactions: number;
            totalSales: number;
            label: string;
          }
        ]
      >
    >(`${environment.server_Url}pos/reports/generateReport/${key}`, details);
  }

  getWebReportSummary(details: {}): Observable<
    IApiHTTPResponse<
      [
        {
          data: [];
          totalNumberOfItems: number;
          totalNumberOfTransactions: number;
          totalSales: number;
          label: string;
        }
      ]
    >
  > {
    return this.http.post<
      IApiHTTPResponse<
        [
          {
            data: [];
            totalNumberOfItems: number;
            totalNumberOfTransactions: number;
            totalSales: number;
            label: string;
          }
        ]
      >
    >(`${environment.server_Url}pos/reports/generateReport/`, details);
  }

  getReportKey(): Observable<IApiHTTPResponse<string>> {
    return this.http.get<IApiHTTPResponse<string>>(
      `${environment.server_Url}pos/reports/generateKey`
    );
  }
}
