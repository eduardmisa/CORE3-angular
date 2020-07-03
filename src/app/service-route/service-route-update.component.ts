import { Component, OnInit } from '@angular/core';
import { ServiceRouteService } from 'src/services/service.route.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRouteRead,
         ServiceRouteServiceRead,
         ServiceRouteUpdateRequest,
         ServiceRouteUpdateResponse } from 'src/interfaces/service.route.interface';
import { ServiceList } from 'src/interfaces/service.interface';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { ServiceService } from 'src/services/service.service';

@Component({
  selector: 'app-customer-update',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          Service Route Update
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </mat-card-subtitle>

        <mat-card-content style="display:flex-root">

          <button mat-icon-button color="accent" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

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

          <button mat-stroked-button color="accent" (click)="this.Submit()">Submit</button>

        </mat-card-content>
      </mat-card-loading>
    </div>
  `,
})
export class ServiceRouteUpdateComponent implements OnInit {

  ngOnInit(): void {
    this.fetchCustomers()
    this.svcService.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<ServiceList>) => {
      this.serviceList = data.results
    })    
  }

  serviceList: ServiceList[]
  slug: string
  form:ServiceRouteUpdateRequest = {
    url: "",
    method: "",
    service: "",
  }
  updatedResponse:ServiceRouteUpdateResponse
  errors: string[] = []
  isLoading: boolean = false

  constructor(private svcServiceRoute: ServiceRouteService,private svcService: ServiceService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
   }

  backToList () {
    this.router.navigateByUrl(`/service-routes`)
  }
  fetchCustomers () {
    this.isLoading = true
    this.svcServiceRoute.retreive<ServiceRouteRead>(this.slug)
    .subscribe(item => {
      this.form.url = item.url
      this.form.method = item.method
      this.form.service = item.service.code
      this.isLoading = false
    })
  }

  Submit () {
    this.isLoading = true
    this.errors = [] as string[]
    this.svcServiceRoute.put<ServiceRouteUpdateResponse, ServiceRouteUpdateRequest>(this.slug, this.form)
    .subscribe(
    data => {
      this.isLoading = false
      this.updatedResponse = data
      this.router.navigateByUrl(`/service-routes`)
    },
    ({error}) => {
      this.isLoading = false
      this.errors = error
    })
  }
}
