import { Component, OnInit, ViewChild } from '@angular/core';
import { PermissionService } from 'src/services/permission.service';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { PermissionList } from 'src/interfaces/permission.interface';

import { Router } from '@angular/router';

import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-permission-list',
  template: `
    <mat-card style="margin:20px;width:700px">
      <mat-card-title>
        Permission List
      </mat-card-title>
      <mat-card-subtitle>
        Lorem ipsum dolor imet kadagu.
      </mat-card-subtitle>

      <mat-card-content>
        <button mat-icon-button color="primary" (click)="this.create()"><mat-icon>add</mat-icon></button>

        <table mat-table [dataSource]="dataSource" matSort style="width:100%;">

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
            <td mat-cell *matCellDef="let item"> {{item.name}} </td>
          </ng-container>

          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Description </th>
            <td mat-cell *matCellDef="let item"> {{item.description}} </td>
          </ng-container>

          <ng-container matColumnDef="hasAllAccess">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Has all access </th>
            <td mat-cell *matCellDef="let item"> {{item.hasAllAccess}} </td>
          </ng-container>

          <ng-container matColumnDef="service">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Service </th>
            <td mat-cell *matCellDef="let item"> {{item.service}} </td>
          </ng-container>
        


          <ng-container matColumnDef="code">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let item">
              <mat-menu #matMenu="matMenu">
                <ng-template matMenuContent>
                  <button mat-menu-item (click)="this.view(item.code)">View</button>
                  <button mat-menu-item (click)="this.update(item.code)">Update</button>
                  <button mat-menu-item (click)="this.delete(item.code)">Delete</button>
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
export class PermissionListComponent implements OnInit {
  constructor(private svcPermission: PermissionService, private router: Router) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'description', 'hasAllAccess', 'service', 'code']
  dataSource = new MatTableDataSource<PermissionList>()

  ngOnInit(): void {
    this.populateServices()
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  populateServices () {
    this.svcPermission.get(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<PermissionList>) => {
      this.dataSource = new MatTableDataSource<PermissionList>(data.results);
    })
  }

  view (id: number) {
    this.router.navigateByUrl(`/permissions/view/${id}`)
  }
  create () {
    this.router.navigateByUrl(`/permissions/create`)
  }
  update (id: number) {
    this.router.navigateByUrl(`/permissions/update/${id}`)
  }
  delete (id: number) {
    this.router.navigateByUrl(`/permissions/delete/${id}`)
  }
}