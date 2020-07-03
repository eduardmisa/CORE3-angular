import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/services/permission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionRead,
         PermissionServiceRead,
         PermissionServiceRouteRead,
         PermissionDeleteResponse } from 'src/interfaces/permission.interface';

@Component({
  selector: 'app-permission-delete',
  template: `
    <mat-card style="margin:30px;">
      <mat-card-title>
        Permission Delete
      </mat-card-title>
      <mat-card-subtitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </mat-card-subtitle>

      <mat-card-content style="display:flex-root">

        <button mat-icon-button color="primary" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

        <br><br>

        <mat-form-field class="w-full" disabled>
          <mat-label>Code</mat-label>
          <input matInput [value]="permission.code" readonly>
        </mat-form-field>

        <br>

        <mat-form-field class="w-full">
          <mat-label>Name</mat-label>
          <input matInput [value]="permission.name" readonly>
        </mat-form-field>

        <br>

        <mat-form-field class="w-full">
          <mat-label>Description</mat-label>
          <input matInput [value]="permission.description" readonly>
        </mat-form-field>

        <br>

        <mat-card class="mat-elevation-z0">

          <mat-form-field class="w-full" disabled>
            <mat-label>Service Code</mat-label>
            <input matInput [value]="permission.service.code" readonly>
          </mat-form-field>

          <mat-form-field class="w-full" disabled>
            <mat-label>Service Name</mat-label>
            <input matInput [value]="permission.service.name" readonly>
          </mat-form-field>

          <mat-form-field class="w-full" disabled>
            <mat-label>Service Description</mat-label>
            <input matInput [value]="permission.service.description" readonly>
          </mat-form-field>

          <mat-form-field class="w-full" disabled>
            <mat-label>Service baseUrl</mat-label>
            <input matInput [value]="permission.service.baseUrl" readonly>
          </mat-form-field>

        </mat-card>

        <br>

        <mat-checkbox class="w-full" [(ngModel)]="permission.hasAllAccess">Has all access</mat-checkbox>

        <br>
        <br>

        <mat-card class="mat-elevation-z0" *ngIf="!permission.hasAllAccess">
          <mat-card-subtitle>
            Service Routes
          </mat-card-subtitle>
          <mat-selection-list dense>
            <mat-list-option *ngFor="let route of permission.serviceRoutes">
            [{{route.method}}] - {{route.url}}
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
export class PermissionDeleteComponent implements OnInit {

  slug: string
  permission: PermissionRead = {
    code: "",
    name: "",
    description: "",
    hasAllAccess: false,
    service: {
      code: "",
      name: "",
      description: "",
      baseUrl: ""
    } as PermissionServiceRead,
    serviceRoutes: [] as PermissionServiceRouteRead[]
  }
  deletedResponse: PermissionDeleteResponse
  errors: string[] = []

  constructor(private svcPermission: PermissionService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
   }

   backToList () {
    this.router.navigateByUrl(`/permissions`)
   }

  ngOnInit(): void {
    this.fetchServices()
  }

  fetchServices () {
    this.svcPermission.retreive<PermissionRead>(this.slug)
    .subscribe(item => {
      this.permission = item
    })
  }

  Submit () {
    this.errors = [] as string[]
    this.svcPermission.delete<PermissionDeleteResponse>(this.slug)
    .subscribe(
    data => {
      this.deletedResponse = data
      this.router.navigateByUrl(`/permissions`)
    },
    ({error}) => {
      this.errors = error
    })
  }
}
