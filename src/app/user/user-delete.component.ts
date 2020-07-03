import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRead,
         UserGroupRead,
         UserDeleteResponse,
         UserGroupDeleteResponse } from 'src/interfaces/user.interface';

@Component({
  selector: 'app-user-delete',
  template: `
  <mat-card style="margin:30px;">
    <mat-card-title>
      User Delete
    </mat-card-title>
    <mat-card-subtitle>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </mat-card-subtitle>

    <mat-card-content style="display:flex-root">

      <button mat-icon-button color="primary" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

      <br><br>

      <mat-form-field class="w-full" disabled>
        <mat-label>Code</mat-label>
        <input matInput [value]="user.code" readonly>
      </mat-form-field>

      <br>

      <mat-form-field class="w-full">
        <mat-label>Firstname</mat-label>
        <input matInput [value]="user.firstname" readonly>
      </mat-form-field>

      <br>

      <mat-form-field class="w-full">
        <mat-label>Middlename</mat-label>
        <input matInput [value]="user.middlename" readonly>
      </mat-form-field>

      <br>

      <mat-form-field class="w-full">
        <mat-label>Lastname</mat-label>
        <input matInput [value]="user.lastname" readonly>
      </mat-form-field>

      <br>

      <mat-form-field class="w-full">
        <mat-label>Username</mat-label>
        <input matInput [value]="user.username" readonly>
      </mat-form-field>

      <br>

      <mat-form-field class="w-full">
        <mat-label>Email</mat-label>
        <input matInput [value]="user.email" readonly>
      </mat-form-field>

      <br>

      <mat-form-field class="w-full">
        <mat-label>Birthdate</mat-label>
        <input matInput [value]="user.birthdate" readonly>
      </mat-form-field>

      <br>

      <mat-form-field class="w-full">
        <mat-label>IsActive</mat-label>
        <input matInput [value]="user.isActive" readonly>
      </mat-form-field>

      <br>

      <mat-form-field class="w-full">
        <mat-label>IsSuperuser</mat-label>
        <input matInput [value]="user.isSuperuser" readonly>
      </mat-form-field>

      <br>

      <mat-card class="mat-elevation-z0">
        <mat-card-subtitle>
          Groups
        </mat-card-subtitle>
        <mat-selection-list dense>
          <mat-list-option *ngFor="let group of user.groups">
            {{group.name}}
          </mat-list-option>
        </mat-selection-list>
      </mat-card>

      <mat-card *ngIf="errors.length > 0" class="mat-elevation-z0">
        <div *ngFor="let error of errors">
          <span class="mat-caption" style="color:maroon">{{error}}</span>
        </div>
      </mat-card>

      <button mat-stroked-button color="primary" (click)="this.Submit()">Submit</button>

    </mat-card-content>
  </mat-card>
  `,
})
export class UserDeleteComponent implements OnInit {

  slug: string
  user: UserRead = {
    code: "",
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    birthdate: "",
    isActive: false,
    isSuperuser: false,
    groups: [] as UserGroupRead[]
  }
  deletedResponse: UserDeleteResponse
  errors: string[] = []

  constructor(private svcUser: UserService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
   }

   backToList () {
    this.router.navigateByUrl(`/users`)
   }

  ngOnInit(): void {
    this.fetchServices()
  }

  fetchServices () {
    this.svcUser.retreive<UserRead>(this.slug)
    .subscribe(item => {
      this.user = item
    })
  }

  Submit () {
    this.errors = [] as string[]
    this.svcUser.delete<UserDeleteResponse>(this.slug)
    .subscribe(
    data => {
      this.deletedResponse = data
      this.router.navigateByUrl(`/users`)
    },
    ({error}) => {
      this.errors = error
    })
  }
}
