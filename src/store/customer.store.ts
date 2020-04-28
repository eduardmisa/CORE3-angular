import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PageViewmodel {

}

export interface Customer {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;

    created: string;
    createdBy: string;
    modified: string;
    modifiedBy: string;
  }

@Injectable()
export class CustomerStore {
  constructor(private http: HttpClient) { }

}