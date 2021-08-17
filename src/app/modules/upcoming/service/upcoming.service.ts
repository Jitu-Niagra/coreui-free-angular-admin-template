import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { IApiHTTPResponse } from "../../shared/models/api.response.model";
import { IFeature } from "../model/feature.model";

@Injectable({
  providedIn: "root",
})
export class UpcomingService {
  constructor(private http: HttpClient) {}

  public getUpcomingEvents(): Observable<IApiHTTPResponse<IFeature[]>> {
    return this.http.get<IApiHTTPResponse<IFeature[]>>(
      `${environment.server_Url}events`
    );
  }
  public addUpcomingEvent({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): Observable<IApiHTTPResponse<{ title: string; description: string }>> {
    return this.http.post<
      IApiHTTPResponse<{ title: string; description: string }>
    >(`${environment.server_Url}events`, {
      title,
      description,
    });
  }
}
