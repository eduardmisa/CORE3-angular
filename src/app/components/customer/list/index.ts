// Component Imports
import { Component, OnInit, ViewChild } from '@angular/core';

import { CustomerService } from 'src/services/customer.service';
import { Customer } from 'src/store/customer.store';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatedResponse } from 'src/app/shared/interface/paginated.response';
import { PaginationQuery } from 'src/services/z.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class CustomerList implements OnInit {

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'created', 'createdBy', 'modified', 'modifiedBy']

  tableDatasource = new MatTableDataSource<Customer>()

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private svcCustomer: CustomerService, private router: Router) { }

  ngOnInit() {

    this.tableDatasource.paginator = this.paginator
    this.tableDatasource.sort = this.sort;

    // this.populateCustomers()
  }

  applyFilter(filterValue: string) {
    this.tableDatasource.filter = filterValue.trim().toLowerCase();
  }

  populateCustomers (payload) {
    this.svcCustomer.get(new PaginationQuery(payload ? payload.pageIndex+1 : 0, payload ? payload.pageSize : 0, null, null))
    .subscribe((data: PaginatedResponse<Customer>) => {

      this.tableDatasource.paginator.pageIndex = data.pageNumber
      this.tableDatasource.paginator.pageSize = data.pageSize
      this.tableDatasource.paginator.length = data.total

      this.tableDatasource.data = data.results;
    });
  }

  rowClicked (customer: Customer) {
    console.log(customer);
  }

  navigateTo (appUrl: string) {
    this.router.navigateByUrl(appUrl)
  }
}