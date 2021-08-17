import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { IApiHTTPResponse } from "../../shared/models/api.response.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUserProfile(): Observable<
    IApiHTTPResponse<{
      _id?: string;
      username: string;
      firstname?: string;
      lastname?: string;
      countryCode?: string;
      emails: [];
    }>
  > {
    return this.http.get<
      IApiHTTPResponse<{
        _id?: string;
        username: string;
        firstname?: string;
        lastname?: string;
        countryCode?: string;
        emails: [];
      }>
    >(`${environment.server_Url}user/profile`);
  }
  updateProfile(user): Observable<
    IApiHTTPResponse<{
      _id?: string;
      username: string;
      firstname?: string;
      lastname?: string;
      countryCode?: string;
      emails: string;
    }>
  > {
    return this.http.post<
      IApiHTTPResponse<{
        _id?: string;
        username: string;
        firstname?: string;
        lastname?: string;
        countryCode?: string;
        emails: string;
      }>
    >(`${environment.server_Url}user/profile`, user);
  }
}
