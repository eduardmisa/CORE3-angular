import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerStore {
  constructor(private http: HttpClient) { }

}