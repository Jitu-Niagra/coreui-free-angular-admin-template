import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { IApiHTTPResponse } from "../../../shared/models/api.response.model";
import { ICategory } from "../shared/category.model";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // category
  public addCategory(category: any) {
    return this.http.post(`${environment.server_Url}pos/category`, category);
  }
  public getCategorys(): Observable<IApiHTTPResponse<ICategory[]>> {
    return this.http.get<IApiHTTPResponse<ICategory[]>>(
      `${environment.server_Url}pos/category`
    );
  }
  public getCategory(
    categoryId: any
  ): Observable<
    IApiHTTPResponse<{ name: string; _id?: string; numberOfItems: number }>
  > {
    return this.http.get<
      IApiHTTPResponse<{ name: string; _id?: string; numberOfItems: number }>
    >(`${environment.server_Url}pos/category/${categoryId}`);
  }
  public editCategory(categoryId: any, category: {}) {
    return this.http.post(
      `${environment.server_Url}pos/category/${categoryId}`,
      category
    );
  }

  public categoryItems(categoryId: any) {
    return this.http.get(
      `${environment.server_Url}pos/item/numberOfItemsInCategory/${categoryId}`
    );
  }

  public deleteCategory(categoryId: any) {
    return this.http.delete(
      `${environment.server_Url}pos/category/${categoryId}`
    );
  }
}
