import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { IApiHTTPResponse } from "../../shared/models/api.response.model";
import { ITransaction } from "../models/transaction.model";

@Injectable({
  providedIn: "root",
})
export class SalesService {
  constructor(private http: HttpClient) {}

  createTransaction(sale) {
    return this.http.post(`${environment.server_Url}pos/transaction`, sale);
  }
  getTransactions(): Observable<IApiHTTPResponse<ITransaction[]>> {
    return this.http.get<IApiHTTPResponse<ITransaction[]>>(
      `${environment.server_Url}pos/transaction`
    );
  }
  getTransaction(transactionId): Observable<IApiHTTPResponse<ITransaction>> {
    return this.http.get<IApiHTTPResponse<ITransaction>>(
      `${environment.server_Url}pos/transaction/${transactionId}`
    );
  }

  getTransactionItems(sale) {
    return this.http.get(
      `${environment.server_Url}pos/transcation/items/${sale._id}`
    );
  }
  getTransactionSummary(sale) {
    return this.http.get(`${environment.server_Url}pos/transaction/summary`);
  }

  // summary sales
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
