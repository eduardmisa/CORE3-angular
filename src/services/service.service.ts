import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './z.service';

@Injectable()
export class ServiceService extends GenericService {
  constructor(http: HttpClient) {
    super(http, '/api/admin/Services/')
   }
}