import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRead } from 'src/interfaces/service.interface';

@Component({
  selector: 'app-service-view',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          Service Details
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </mat-card-subtitle>

        <mat-card-content style="display:flex-root">

          <button mat-icon-button color="primary" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

          <br><br>

          <mat-form-field class="w-full" disabled>
            <mat-label>Code</mat-label>
            <input matInput [value]="service.code" readonly>
          </mat-form-field>

          <br>

          <mat-form-field class="w-full">
            <mat-label>Name</mat-label>
            <input matInput [value]="service.name" readonly>
          </mat-form-field>

          <br>

          <mat-form-field class="w-full">
            <mat-label>Description</mat-label>
            <input matInput [value]="service.description" readonly>
          </mat-form-field>

          <br>

          <mat-form-field class="w-full">
            <mat-label>Base Url</mat-label>
            <input matInput [value]="service.baseUrl" readonly>
          </mat-form-field> 

        </mat-card-content>
      </mat-card-loading>
    </div>
  `,
})
export class ServiceViewComponent implements OnInit {

  slug: string
  service: ServiceRead = {
    code: "",
    name: "",
    description: "",
    baseUrl: ""
  }
  isLoading: boolean = false

  constructor(private svcService: ServiceService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
   }

   backToList () {
    this.router.navigateByUrl(`/services`)
   }

  ngOnInit(): void {
    this.fetchServices()
  }

  fetchServices () {
    this.isLoading = true
    this.svcService.retreive<ServiceRead>(this.slug)
    .subscribe(item => {
      this.service = item
      this.isLoading = false
    })
  }
}

