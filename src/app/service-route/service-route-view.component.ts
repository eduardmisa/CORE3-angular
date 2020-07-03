import { Component, OnInit } from '@angular/core';
import { ServiceRouteService } from 'src/services/service.route.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRouteRead, ServiceRouteServiceRead } from 'src/interfaces/service.route.interface';

@Component({
  selector: 'app-service-view',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          Service Route Details
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </mat-card-subtitle>

        <mat-card-content style="display:flex-root">

          <button mat-icon-button color="accent" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

          <br><br>

          <mat-form-field class="w-full" disabled>
            <mat-label>Code</mat-label>
            <input matInput [value]="serviceRoute.code" readonly>
          </mat-form-field>

          <br>

          <mat-form-field class="w-full" disabled>
            <mat-label>Url</mat-label>
            <input matInput [value]="serviceRoute.url" readonly>
          </mat-form-field>

          <br>

          <mat-form-field class="w-full" disabled>
            <mat-label>Method</mat-label>
            <input matInput [value]="serviceRoute.method" readonly>
          </mat-form-field>

          <mat-card class="mat-elevation-z0">

            <mat-form-field class="w-full" disabled>
              <mat-label>Service Code</mat-label>
              <input matInput [value]="serviceRoute.service.code" readonly>
            </mat-form-field>

            <mat-form-field class="w-full" disabled>
              <mat-label>Service Name</mat-label>
              <input matInput [value]="serviceRoute.service.name" readonly>
            </mat-form-field>

            <mat-form-field class="w-full" disabled>
              <mat-label>Service Description</mat-label>
              <input matInput [value]="serviceRoute.service.description" readonly>
            </mat-form-field>

            <mat-form-field class="w-full" disabled>
              <mat-label>Service baseUrl</mat-label>
              <input matInput [value]="serviceRoute.service.baseUrl" readonly>
            </mat-form-field>

          </mat-card>

        </mat-card-content>
      </mat-card-loading>
    </div>
  `,
})
export class ServiceRouteViewComponent implements OnInit {

  slug: string

  serviceRoute: ServiceRouteRead = {
    code: "",
    url: "",
    method: "",
    service: {
      code: "",
      name: "",
      description: "",
      baseUrl: "",
    } as ServiceRouteServiceRead
  }
  isLoading: boolean = false

  constructor(private svcServiceRoute: ServiceRouteService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
   }

   backToList () {
    this.router.navigateByUrl(`/service-routes`)
   }

  ngOnInit(): void {
    this.fetchServices()
  }

  fetchServices () {
    this.isLoading = true
    this.svcServiceRoute.retreive<ServiceRouteRead>(this.slug)
    .subscribe(item => {
      this.serviceRoute = item
      this.isLoading = false
    })
  }
}

