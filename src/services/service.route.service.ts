import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenericService } from './z.service';

@Injectable()
export class ServiceRouteService extends GenericService {
  constructor(http: HttpClient) {
    super(http, '/api/admin/ServiceRoutes/')
  }

  endpointLookup (serviceCode: string, method: string, endpoint: string) {
    return this._http.get<string[]>(`${this.url}lookup-endpoint/?serviceCode=${serviceCode}&method=${method}&endpoint=${endpoint}`, { headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)});
  }
}