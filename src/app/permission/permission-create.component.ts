import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/services/permission.service';
import { PermissionCreateRequest,
         PermissionCreateResponse,
         PermissionServiceCreateResponse,
         PermissionServiceRouteCreateResponse } from 'src/interfaces/permission.interface';
import { Router } from '@angular/router';
import { ServiceRouteService } from 'src/services/service.route.service';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { ServiceRouteList } from 'src/interfaces/service.route.interface';
import { ServiceService } from 'src/services/service.service';
import { ServiceList } from 'src/interfaces/service.interface';

@Component({
  selector: 'app-permission-create',
  template: `
    <mat-card style="margin:20px;width:500px">
      <mat-card-title>
        Permission Create
      </mat-card-title>
      <mat-card-subtitle>
        Lorem ipsum dolor imet kadagu.
      </mat-card-subtitle>

      <mat-card-content style="display:flex-root">

        <button mat-icon-button color="primary" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

        <br><br>

        <mat-form-field class="w-full" appearance="fill" dense>
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="this.form.name">
        </mat-form-field>

        <br>

        <mat-form-field class="w-full" appearance="fill" dense>
          <mat-label>Description</mat-label>
          <input matInput [(ngModel)]="this.form.description">
        </mat-form-field>

        <br>

        <mat-form-field class="w-full" appearance="fill" dense>
          <mat-label>Service</mat-label>
          <mat-select [(ngModel)]="this.form.service">
            <mat-option *ngFor="let item of serviceList" [value]="item.code">{{item.name}}</mat-option>
          </mat-select>
        </mat-form-field>

        <br>

        <mat-checkbox class="w-full" [(ngModel)]="this.form.hasAllAccess">Has all access</mat-checkbox>

        <br>
        <br>

        <mat-card class="mat-elevation-z0" *ngIf="!this.form.hasAllAccess">
          <mat-card-subtitle>
            Service Routes
          </mat-card-subtitle>
          <mat-selection-list dense [(ngModel)]="this.form.serviceRoutes">
            <mat-list-option *ngFor="let route of serviceRouteList" [value]="route.code">
            {{route.service}} [{{route.method}}] - {{route.url}}
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
export class PermissionCreateComponent implements OnInit {
  constructor(private svcPermission: PermissionService,
              private svcServiceRoute: ServiceRouteService,
              private svcService: ServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.svcServiceRoute.get(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<ServiceRouteList>) => {
      this.serviceRouteList = data.results
    })
    this.svcService.get(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<ServiceList>) => {
      this.serviceList = data.results
    })
  }

  serviceRouteList: ServiceRouteList[]
  serviceList: ServiceList[]

  form:PermissionCreateRequest = {
    name: "",
    description: "",
    hasAllAccess: false,
    service: "",
    serviceRoutes: [] as string[]
  }

  createdResponse: PermissionCreateResponse = {
    code: "",
    name: "",
    description: "",
    hasAllAccess: false,
    service: {
      code: "",
      name: "",
      description: "",
      baseUrl: ""
    } as PermissionServiceCreateResponse,
    serviceRoutes: [] as PermissionServiceRouteCreateResponse[]
  }

  errors: string[] = []
  
  backToList () {
    this.router.navigateByUrl(`/permissions`)
  }

  Submit () {
    this.svcPermission.post<PermissionCreateResponse, PermissionCreateRequest>(this.form)
    .subscribe(
    data => {
      this.createdResponse = data
      this.router.navigateByUrl(`/permissions`)
    },
    ({error}) => {
      this.errors = error
    })
  }
}
