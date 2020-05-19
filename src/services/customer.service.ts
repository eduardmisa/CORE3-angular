import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './z.service';
import { Customer } from 'src/interfaces/customer.interface'

@Injectable()
export class CustomerService extends GenericService<Customer> {
  constructor(http: HttpClient) {
    super(http, '/api/Customers/')
   }
}