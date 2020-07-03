import { Component, OnInit } from '@angular/core';

import { ServiceService } from 'src/services/service.service';
import { ServiceList } from 'src/interfaces/service.interface';

import { ServiceRouteService } from 'src/services/service.route.service';
import { ServiceRouteCreateRequest, ServiceRouteCreateResponse } from 'src/interfaces/service.route.interface';
import { Router } from '@angular/router';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';

@Component({
  selector: 'app-customer-create',
  template: `
    <mat-card style="margin:30px;">
      <mat-card-title>
        Service Route Create
      </mat-card-title>
      <mat-card-subtitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </mat-card-subtitle>

      <mat-card-content style="display:flex-root">

        <button mat-icon-button color="primary" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

        <br><br>

        <mat-form-field class="w-full" appearance="fill" dense>
          <mat-label>Url</mat-label>
          <input matInput [value]="this.form.url" (input)="this.form.url = $event.target.value">
        </mat-form-field>

        <br>

        <mat-form-field class="w-full" appearance="fill" dense>
          <mat-label>Method</mat-label>
          <mat-select [(value)]="this.form.method">
            <mat-option value="GET">GET</mat-option>
            <mat-option value="POST">POST</mat-option>
            <mat-option value="PUT">PUT</mat-option>
            <mat-option value="DELETE">DELETE</mat-option>
          </mat-select>
        </mat-form-field>

        <br>

        <mat-form-field class="w-full" appearance="fill" dense>
          <mat-label>Service</mat-label>
          <mat-select [(value)]="this.form.service">
            <mat-option *ngFor="let item of serviceList" [value]="item.code">{{item.name}}</mat-option>
          </mat-select>
        </mat-form-field>

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
export class ServiceRouteCreateComponent implements OnInit {
  constructor(private svcServiceRoute: ServiceRouteService,private svcService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.svcService.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<ServiceList>) => {
      this.serviceList = data.results
    })
  }

  serviceList: ServiceList[]

  form:ServiceRouteCreateRequest = {
    url: "",
    method: "",
    service: ""
  }

  createdResponse:ServiceRouteCreateResponse = {
    code: "",
    url: "",
    method: "",
    service: ""
  }

  errors: string[] = []
  
  backToList () {
    this.router.navigateByUrl(`/service-routes`)
  }

  Submit () {
    this.errors = [] as string[]
    this.svcServiceRoute.post<ServiceRouteCreateResponse, ServiceRouteCreateRequest>(this.form)
    .subscribe(
    data => {
      this.createdResponse = data
      this.router.navigateByUrl(`/service-routes`)
    },
    ({error}) => {
      this.errors = error
    })
  }
}
