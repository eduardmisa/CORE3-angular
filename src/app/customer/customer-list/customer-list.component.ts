import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { Customer } from 'src/interfaces/customer.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private svcCustomer: CustomerService, private router: Router) { }

  customerList: Customer[] = []

  ngOnInit(): void {
    this.populateCustomers({})
  }

  populateCustomers (payload) {
    this.svcCustomer.get(new PaginationQuery(payload ? payload.pageIndex+1 : 0, payload ? payload.pageSize : 0, null, null))
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
