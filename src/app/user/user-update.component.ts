import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRead,
         UserGroupRead,
         UserUpdateRequest,
         UserUpdateResponse,
         UserGroupUpdateResponse } from 'src/interfaces/user.interface';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { GroupList } from 'src/interfaces/group.interface';
import { GroupService } from 'src/services/group.service';

@Component({
  selector: 'app-user-update',
  template: `
  <mat-card style="margin:20px;width:500px">
  <mat-card-title>
    User Update
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

</mat-card>
  `,
})
export class UserUpdateComponent implements OnInit {
  constructor(private svcUser: UserService, private svcGroup: GroupService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
   }

  ngOnInit(): void {
    this.svcUser.retreive<UserRead>(this.slug)
    .subscribe(item => {
      this.form.firstname = item.firstname
      this.form.middlename = item.middlename
      this.form.lastname = item.lastname
      this.form.username = item.username
      this.form.email = item.email
      this.form.birthdate = item.birthdate
      this.form.isActive = item.isActive
      this.form.isSuperuser = item.isSuperuser
      this.form.groups = item.groups.map(a => a.code)
    })

    this.svcGroup.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<GroupList>) => {
      this.groupList = data.results;
    })
  }

  slug: string = ""
  groupList: GroupList[]

  form:UserUpdateRequest = {
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    birthdate: "",
    isActive: false,
    isSuperuser: false,
    groups: [] as string[],
  }

  updatedResponse:UserUpdateResponse = {
    code: "",
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    birthdate: "",
    isActive: false,
    isSuperuser: false,
    groups: [] as UserGroupUpdateResponse[]
  }

  errors: string[] = []

  backToList () {
    this.router.navigateByUrl(`/users`)
  }
  Submit () {
    this.svcUser.put<UserUpdateResponse, UserUpdateRequest>(this.slug, this.form)
    .subscribe(
    data => {
      this.updatedResponse = data
      this.router.navigateByUrl(`/users`)
    },
    ({error}) => {
      this.errors = error
    })
  }
}
