import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceRouteService } from 'src/services/service.route.service';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { ServiceRouteList } from 'src/interfaces/service.route.interface';

import { Router } from '@angular/router';

import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-service-list',
  template: `
    <mat-card style="margin:30px;">
      <mat-card-title>
        Service Route List
      </mat-card-title>
      <mat-card-subtitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </mat-card-subtitle>

      <mat-card-content>
        <button mat-icon-button color="primary" (click)="this.create()"><mat-icon>add</mat-icon></button>

        <table mat-table [dataSource]="dataSource" matSort style="width:100%;">

          <ng-container matColumnDef="url">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Url </th>
            <td mat-cell *matCellDef="let item"> {{item.url.trimByMaxCharacter(30)}} </td>
          </ng-container>

          <ng-container matColumnDef="method">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Method </th>
            <td mat-cell *matCellDef="let item"> {{item.method.trimByMaxCharacter(30)}} </td>
          </ng-container>

          <ng-container matColumnDef="service">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Service </th>
            <td mat-cell *matCellDef="let item"> {{item.service.trimByMaxCharacter(30)}} </td>
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

        <mat-paginator [pageSizeOptions]="[5, 10, 20, 50]" showFirstLastButtons></mat-paginator>
      </mat-card-content>
    </mat-card>
  `,
})
export class ServiceRouteListComponent implements OnInit {
  constructor(private svcServiceRoute: ServiceRouteService, private router: Router) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['url', 'method', 'service', 'code']
  dataSource = new MatTableDataSource<ServiceRouteList>()

  ngOnInit(): void {
    this.populateServices()
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  populateServices () {
    this.svcServiceRoute.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<ServiceRouteList>) => {
      this.dataSource.data = data.results
    })
  }

  view (id: number) {
    this.router.navigateByUrl(`/service-routes/view/${id}`)
  }
  create () {
    this.router.navigateByUrl(`/service-routes/create`)
  }
  update (id: number) {
    this.router.navigateByUrl(`/service-routes/update/${id}`)
  }
  delete (id: number) {
    this.router.navigateByUrl(`/service-routes/delete/${id}`)
  }
}
