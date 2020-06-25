import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './z.service';
import { ServiceList } from 'src/interfaces/service.interface'

@Injectable()
export class ServiceService extends GenericService {
  constructor(http: HttpClient) {
    super(http, '/api/v1/Services/')
   }
}