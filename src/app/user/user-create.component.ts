import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { UserCreateRequest,
         UserCreateResponse,
         UserGroupCreateResponse } from 'src/interfaces/user.interface';
import { Router } from '@angular/router';
import { GroupService } from 'src/services/group.service';
import { GroupList } from 'src/interfaces/group.interface';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';

@Component({
  selector: 'app-user-create',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          User Create
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </mat-card-subtitle>

        <mat-card-content style="display:flex-root">

          <button mat-icon-button color="primary" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

          <br><br>

          <mat-form-field class="w-full" appearance="fill" dense>
            <mat-label>Firstname</mat-label>
            <input matInput [(ngModel)]="this.form.firstname">
          </mat-form-field>

          <br>

          <mat-form-field class="w-full" appearance="fill" dense>
            <mat-label>Middlename</mat-label>
            <input matInput [(ngModel)]="this.form.middlename">
          </mat-form-field>

          <br>

          <mat-form-field class="w-full" appearance="fill" dense>
            <mat-label>Lastname</mat-label>
            <input matInput [(ngModel)]="this.form.lastname">
          </mat-form-field>

          <br>

          <mat-form-field class="w-full" appearance="fill" dense>
            <mat-label>Username</mat-label>
            <input matInput [(ngModel)]="this.form.username">
          </mat-form-field>

          <br>

          <mat-form-field class="w-full" appearance="fill" dense>
            <mat-label>Password</mat-label>
            <input matInput [(ngModel)]="this.form.password" type="password">
          </mat-form-field>

          <br>

          <mat-form-field class="w-full" appearance="fill" dense>
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="this.form.email">
          </mat-form-field>

          <br>
          
          <mat-form-field class="w-full" appearance="fill">
            <mat-label>Birthdate</mat-label>
            <input matInput [matDatepicker]="picker" [(ngModel)]="this.form.birthdate">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <br>

          <mat-checkbox class="w-full" [(ngModel)]="this.form.isActive">Is Active</mat-checkbox>

          <br>
          <br>

          <mat-checkbox class="w-full" [(ngModel)]="this.form.isSuperuser">Is Superuser</mat-checkbox>

          <br>
          <br>

          <mat-card class="mat-elevation-z0">
            <mat-card-subtitle>
              Groups
            </mat-card-subtitle>
            <mat-selection-list dense [(ngModel)]="this.form.groups">
              <mat-list-option *ngFor="let group of groupList" [value]="group.code">
                {{group.name}}
              </mat-list-option>
            </mat-selection-list>
          </mat-card>

          <br>

          <mat-card *ngIf="errors.length > 0" class="mat-elevation-z0">
            <div *ngFor="let error of errors">
              <span class="mat-caption" style="color:maroon">{{error}}</span>
            </div>
          </mat-card>

          <br><br>

          <button mat-stroked-button color="primary" (click)="this.Submit()">Submit</button>

        </mat-card-content>
      </mat-card-loading>
    </div>
  `,
})
export class UserCreateComponent implements OnInit {
  constructor(private svcUser: UserService, private svcGroup: GroupService, private router: Router) { }

  ngOnInit(): void {
    this.svcGroup.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<GroupList>) => {
      this.groupList = data.results;
    })
  }

  groupList: GroupList[]
  form:UserCreateRequest = {
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    birthdate: "",
    isActive: false,
    isSuperuser: false,
    groups: [] as string[],
  }
  createdResponse:UserCreateResponse = {
    code: "",
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    birthdate: "",
    isActive: false,
    isSuperuser: false,
    groups: [] as UserGroupCreateResponse[]
  }
  errors: string[] = []
  isLoading: boolean = false
  
  backToList () {
    this.router.navigateByUrl(`/users`)
  }

  Submit () {
    this.isLoading = true
    this.errors = [] as string[]
    this.svcUser.post<UserCreateResponse, UserCreateRequest>(this.form)
    .subscribe(
    data => {
      this.isLoading = false
      this.createdResponse = data
      this.router.navigateByUrl(`/users`)
    },
    ({error}) => {
      this.isLoading = false
      this.errors = error
    })
  }
}
