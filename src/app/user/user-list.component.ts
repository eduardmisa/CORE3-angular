import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { UserList } from 'src/interfaces/user.interface';

import { Router } from '@angular/router';

import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          User List
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </mat-card-subtitle>

        <mat-card-content>
          <button mat-icon-button color="accent" (click)="this.create()"><mat-icon>add</mat-icon></button>
          <button mat-icon-button color="accent" (click)="this.populateServices()"><mat-icon>update</mat-icon></button>

          <table mat-table [dataSource]="dataSource" matSort style="width:100%;">

            <ng-container matColumnDef="firstname">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Firstname </th>
              <td mat-cell *matCellDef="let item"> {{item.firstname.trimByMaxCharacter(30)}} </td>
            </ng-container>

            <ng-container matColumnDef="middlename">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Middlename </th>
              <td mat-cell *matCellDef="let item"> {{item.middlename.trimByMaxCharacter(30)}} </td>
            </ng-container>

            <ng-container matColumnDef="lastname">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Lastname </th>
              <td mat-cell *matCellDef="let item"> {{item.lastname.trimByMaxCharacter(30)}} </td>
            </ng-container>

            <ng-container matColumnDef="username">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Username </th>
              <td mat-cell *matCellDef="let item"> {{item.username.trimByMaxCharacter(30)}} </td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>
              <td mat-cell *matCellDef="let item"> {{item.email.trimByMaxCharacter(30)}} </td>
            </ng-container>

            <ng-container matColumnDef="birthdate">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Birthdate </th>
              <td mat-cell *matCellDef="let item"> {{item.birthdate.trimByMaxCharacter(30)}} </td>
            </ng-container>

            <ng-container matColumnDef="isActive">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> IsActive </th>
              <td mat-cell *matCellDef="let item"> {{item.isActive}} </td>
            </ng-container>

            <ng-container matColumnDef="isSuperuser">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> IsSuperuser </th>
              <td mat-cell *matCellDef="let item"> {{item.isSuperuser}} </td>
            </ng-container>

            <ng-container matColumnDef="code">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let item">
                <mat-menu #matMenu="matMenu">
                  <ng-template matMenuContent>
                    <button mat-menu-item color="accent" (click)="this.view(item.code)">View</button>
                    <button mat-menu-item color="accent" (click)="this.update(item.code)">Update</button>
                    <button mat-menu-item color="accent" (click)="this.delete(item.code)">Delete</button>
                  </ng-template>
                </mat-menu>
                <button mat-icon-button color="accent" [matMenuTriggerFor]="matMenu"><mat-icon>more_vert</mat-icon></button>
              </td>
            </ng-container>
          
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <mat-paginator [pageSizeOptions]="[10, 20, 50]" showFirstLastButtons></mat-paginator>
        </mat-card-content>
      </mat-card-loading>
    </div>
  `,
})
export class UserListComponent implements OnInit {
  constructor(private svcUser: UserService, private router: Router) { }

  ngOnInit(): void {
    this.populateServices()
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['firstname',
                                'middlename',
                                'lastname',
                                'username',
                                'email',
                                'birthdate',
                                'isActive',
                                'isSuperuser',
                                'code']
  dataSource = new MatTableDataSource<UserList>()
  isLoading: boolean = false


  populateServices () {
    this.isLoading = true
    this.svcUser.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<UserList>) => {
      this.dataSource.data = data.results
      this.isLoading = false
    })
  }

  view (id: number) {
    this.router.navigateByUrl(`/users/view/${id}`)
  }
  create () {
    this.router.navigateByUrl(`/users/create`)
  }
  update (id: number) {
    this.router.navigateByUrl(`/users/update/${id}`)
  }
  delete (id: number) {
    this.router.navigateByUrl(`/users/delete/${id}`)
  }
}
