import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/services/permission.service';
import { PermissionRead,
         PermissionServiceRead,
         PermissionServiceRouteRead,
         PermissionUpdateRequest,
         PermissionUpdateResponse,
         PermissionServiceUpdateResponse,
         PermissionServiceRouteUpdateResponse } from 'src/interfaces/permission.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRouteService } from 'src/services/service.route.service';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { ServiceRouteList } from 'src/interfaces/service.route.interface';
import { ServiceService } from 'src/services/service.service';
import { ServiceList } from 'src/interfaces/service.interface';

@Component({
  selector: 'app-permission-update',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          Permission Update
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
      </mat-card-loading>
    </div>
  `,
})
export class PermissionUpdateComponent implements OnInit {
  constructor(private svcPermission: PermissionService,
    private svcServiceRoute: ServiceRouteService,
    private svcService: ServiceService,
    private route: ActivatedRoute,
    private router: Router) {
      this.route.params.subscribe(({id}) => this.slug = id);
     }

  ngOnInit(): void {
    this.isLoading = true
    this.svcPermission.retreive<PermissionRead>(this.slug)
    .subscribe(item => {
      this.form.name = item.name
      this.form.description = item.description
      this.form.hasAllAccess = item.hasAllAccess
      this.form.service = item.service.code
      this.form.serviceRoutes = item.serviceRoutes.map(a => a.code)
      this.isLoading = false
    })
    this.svcServiceRoute.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<ServiceRouteList>) => {
      this.serviceRouteList = data.results
    })
    this.svcService.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<ServiceList>) => {
      this.serviceList = data.results
    })
  }

  slug: string
  serviceRouteList: ServiceRouteList[]
  serviceList: ServiceList[]
  form:PermissionUpdateRequest = {
    name: "",
    description: "",
    hasAllAccess: false,
    service: "",
    serviceRoutes: [] as string[]
  }
  updatedResponse: PermissionUpdateResponse = {
    code: "",
    name: "",
    description: "",
    hasAllAccess: false,
    service: {
      code: "",
      name: "",
      description: "",
      baseUrl: ""
    } as PermissionServiceUpdateResponse,
    serviceRoutes: [] as PermissionServiceRouteUpdateResponse[]
  }
  errors: string[] = []
  isLoading: boolean = false

  backToList () {
    this.router.navigateByUrl(`/permissions`)
  }

  Submit () {
    this.isLoading = true
    this.errors = [] as string[]
    this.svcPermission.put<PermissionUpdateResponse, PermissionUpdateRequest>(this.slug, this.form)
    .subscribe(
    data => {
      this.isLoading = false
      this.updatedResponse = data
      this.router.navigateByUrl(`/permissions`)
    },
    ({error}) => {
      this.isLoading = false
      this.errors = error
    })
  }
}
