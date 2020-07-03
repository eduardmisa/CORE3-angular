import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRead, UserGroupRead } from 'src/interfaces/user.interface';

@Component({
  selector: 'app-user-view',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          User Details
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

        </mat-card-content>
      </mat-card-loading>
    </div>
  `,
})
export class UserViewComponent implements OnInit {
  constructor(private svcUser: UserService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
  }

  ngOnInit(): void {
    this.fetchServices()
  }

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
  isLoading: boolean = false

  backToList () {
    this.router.navigateByUrl(`/users`)
  }

  fetchServices () {
    this.isLoading = true
    this.svcUser.retreive<UserRead>(this.slug)
    .subscribe(item => {
      this.user = item
      this.isLoading = false
    })
  }
}

