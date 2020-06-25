import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './z.service';

@Injectable()
export class UserService extends GenericService {
  constructor(http: HttpClient) {
    super(http, '/api/v1/Users/')
   }
}