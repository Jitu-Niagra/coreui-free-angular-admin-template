import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { IApiHTTPResponse } from "../../../shared/models/api.response.model";
import { IItems } from "../shared/item.model";

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  constructor(private http: HttpClient) {}
  public getItems(): Observable<IApiHTTPResponse<IItems[]>> {
    return this.http.get<IApiHTTPResponse<IItems[]>>(
      `${environment.server_Url}pos/item`
    );
  }
  public getItem(itemId: any): Observable<IApiHTTPResponse<IItems>> {
    return this.http.get<IApiHTTPResponse<IItems>>(
      `${environment.server_Url}pos/item/${itemId}`
    );
  }

  public addItem(item: any): Observable<IApiHTTPResponse<IItems>> {
    return this.http.post<IApiHTTPResponse<IItems>>(
      `${environment.server_Url}pos/item`,
      item
    );
  }

  public deleteItemId(itemId: any) {
    return this.http.delete(`${environment.server_Url}pos/item/${itemId}`);
  }

  public editItem(itemId: any, item: {}): Observable<IApiHTTPResponse<IItems>> {
    return this.http.post<IApiHTTPResponse<IItems>>(
      `${environment.server_Url}pos/item/${itemId}`,
      item
    );
  }
}
