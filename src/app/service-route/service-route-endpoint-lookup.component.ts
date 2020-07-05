import { Component, OnInit } from '@angular/core';
import { ServiceRouteService } from 'src/services/service.route.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRouteRead, ServiceRouteServiceRead, ServiceRouteEndpointLookupRequest } from 'src/interfaces/service.route.interface';
import { ServiceList } from 'src/interfaces/service.interface';
import { ServiceService } from 'src/services/service.service';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';

@Component({
  selector: 'app-service-view',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          Service Route Endpoint Lookup
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </mat-card-subtitle>

        <mat-card-content style="display:flex-root">

          <button mat-icon-button color="accent" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

          <br><br>

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
            <mat-select [(value)]="this.form.serviceCode">
              <mat-option *ngFor="let item of serviceList" [value]="item.code">{{item.name}}</mat-option>
            </mat-select>
          </mat-form-field>

          <br>

          <mat-form-field class="w-full" appearance="fill" dense>
            <mat-label>Endpoint</mat-label>
            <input matInput [value]="this.form.endpoint" (input)="this.form.endpoint = $event.target.value">
          </mat-form-field>

          <br>

          <mat-card class="mat-elevation-z0" style="border: solid 1px primary; border-radius:10px">
            <mat-card-subtitle>
              Matched service routes regex
            </mat-card-subtitle>
            <div *ngIf="response.length == 0">
              <span class="mat-caption">Empty</span>
            </div>
            <div *ngFor="let item of response">
              <span class="mat-caption" style="color:green">{{item}}</span>
            </div>
          </mat-card>

          <mat-card *ngIf="errors.length > 0" class="mat-elevation-z0">
            <div *ngFor="let error of errors">
              <span class="mat-caption" style="color:maroon">{{error}}</span>
            </div>
          </mat-card>

          <br><br>

          <button mat-stroked-button color="accent" (click)="this.Submit()">Lookup</button>

        </mat-card-content>
      </mat-card-loading>
    </div>
  `,
})
export class ServiceRouteEndpointLookupComponent implements OnInit {
  constructor(private svcServiceRoute: ServiceRouteService, private svcService: ServiceService, private router: Router) { }

  serviceList: ServiceList[]
  isLoading: boolean = false
  form:ServiceRouteEndpointLookupRequest = {
    serviceCode: "",
    method: "",
    endpoint: ""
  }
  response: string[] = []
  errors: string[] = []

  backToList () {
    this.router.navigateByUrl(`/service-routes`)
  }

  ngOnInit(): void {
    this.fetchServices()
  }

  fetchServices () {
    this.svcService.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<ServiceList>) => {
      this.serviceList = data.results
    })
  }

  Submit () {
    this.isLoading = true
    this.response = []
    this.errors = []
    this.svcServiceRoute.endpointLookup(this.form.serviceCode, this.form.method, this.form.endpoint)
    .subscribe(
    data => {
      this.response = data
      this.isLoading = false
    },
    ({error}) => {
      this.errors = error
      this.isLoading = false
    })
  }
}
