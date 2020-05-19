import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { Customer } from 'src/interfaces/customer.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  template: `
    <button (click)="createCustomer()">Create Customer</button>

    <ul>
        <li *ngFor="let item of customerList">
            <button (click)="viewCustomer(item.id)">{{item.id}}</button>
            {{item.firstName}}&nbsp;{{item.middleName}}&nbsp;{{item.lastName}}
            [
            <strong><a (click)="updateCustomer(item.id)">update</a></strong>
            | 
            <strong><a (click)="deleteCustomer(item.id)">delete</a></strong>
            ]
        </li>
    </ul>
  `,
})
export class CustomerListComponent implements OnInit {

  constructor(private svcCustomer: CustomerService, private router: Router) { }

  customerList: Customer[] = []

  ngOnInit(): void {
    this.populateCustomers()
  }

  populateCustomers () {
    this.svcCustomer.get(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<Customer>) => {

      this.customerList = data.results
    });
  }

  viewCustomer (id: number) {
    this.router.navigateByUrl(`/customers/view/${id}`)
  }
  createCustomer () {
    this.router.navigateByUrl(`/customers/create`)
  }
  updateCustomer (id: number) {
    this.router.navigateByUrl(`/customers/update/${id}`)
  }
  deleteCustomer (id: number) {
    this.router.navigateByUrl(`/customers/delete/${id}`)
  }
}
