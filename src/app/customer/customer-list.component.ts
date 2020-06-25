import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
// import { PaginationQuery } from 'src/services/z.service';
// import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { Customer } from 'src/interfaces/customer.interface';
import { Router } from '@angular/router';
import mockData from 'src/assets/mockCustomers'

import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-customer-list',
  template: `
    <mat-card style="margin:1%;">
      <mat-card-title>
        Customer List
      </mat-card-title>
      <mat-card-subtitle>
        Lorem ipsum dolor imet kadagu.
      </mat-card-subtitle>

      <mat-card-content>
        <button mat-button color="primary" (click)="this.createCustomer()"><mat-icon>add</mat-icon>New Customer</button>

        <table mat-table [dataSource]="dataSource" matSort style="width:100%;">

          <ng-container matColumnDef="firstName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Firstname </th>
            <td mat-cell *matCellDef="let item"> {{item.firstName}} </td>
          </ng-container>
        
          <ng-container matColumnDef="middleName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Middlename </th>
            <td mat-cell *matCellDef="let item"> {{item.middleName}} </td>
          </ng-container>
        
          <ng-container matColumnDef="lastName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Lastname </th>
            <td mat-cell *matCellDef="let item"> {{item.lastName}} </td>
          </ng-container>
        
          <ng-container matColumnDef="created">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Created </th>
            <td mat-cell *matCellDef="let item"> {{item.created}} </td>
          </ng-container>
        
          <ng-container matColumnDef="createdBy">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> CreatedBy </th>
            <td mat-cell *matCellDef="let item"> {{item.createdBy}} </td>
          </ng-container>
        
          <ng-container matColumnDef="modified">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Modified </th>
            <td mat-cell *matCellDef="let item"> {{item.modified}} </td>
          </ng-container>
        
          <ng-container matColumnDef="modifiedBy">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> ModifiedBy </th>
            <td mat-cell *matCellDef="let item"> {{item.modifiedBy}} </td>
          </ng-container>
        
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let item">
              <mat-menu #matMenu="matMenu">
                <ng-template matMenuContent>
                  <button mat-menu-item (click)="this.viewCustomer(item.id)">View</button>
                  <button mat-menu-item (click)="this.deleteCustomer(item.id)">Delete</button>
                </ng-template>
              </mat-menu>
              <button mat-icon-button [matMenuTriggerFor]="matMenu"><mat-icon>more_vert</mat-icon></button>
            </td>
          </ng-container>
        
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator [pageSizeOptions]="[10, 20, 50]" showFirstLastButtons></mat-paginator>
      </mat-card-content>
    </mat-card>
  `,
})
export class CustomerListComponent implements OnInit {

  constructor(private svcCustomer: CustomerService, private router: Router) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'created', 'createdBy', 'modified', 'modifiedBy', 'id']
  dataSource = new MatTableDataSource<Customer>()

  ngOnInit(): void {
    this.populateCustomers()
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  populateCustomers () {
    this.dataSource = new MatTableDataSource<Customer>(mockData.results);

    // this.svcCustomer.get(new PaginationQuery(0, 0, '', ''))
    // .subscribe((data: PaginatedResponse<Customer>) => {
    //   this.customerList = data.results
    // });
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
