import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { ITransaction } from "../../../sales/models/transaction.model";
import { IApiHTTPResponse } from "../../../shared/models/api.response.model";

@Injectable({
  providedIn: "root",
})
export class WebService {
  constructor(private http: HttpClient) {}

  public getTransactions(): Observable<IApiHTTPResponse<[ITransaction]>> {
    return this.http.get<IApiHTTPResponse<[ITransaction]>>(
      `${environment.server_Url}pos/transaction`
    );
  }
  public getTransactionsItems(transaction) {
    return this.http.get(
      `${environment.server_Url}pos/transaction/${transaction._id}`
    );
  }

  public getTransactionsSummary(): Observable<
    IApiHTTPResponse<{ totalNumberOfTransactions: number; totalSales: number }>
  > {
    return this.http.get<
      IApiHTTPResponse<{
        totalNumberOfTransactions: number;
        totalSales: number;
      }>
    >(`${environment.server_Url}pos/transaction/summary`);
  }

  getTransaction(transactionId): Observable<IApiHTTPResponse<ITransaction>> {
    return this.http.get<IApiHTTPResponse<ITransaction>>(
      `${environment.server_Url}pos/transaction/${transactionId}`
    );
  }
}
