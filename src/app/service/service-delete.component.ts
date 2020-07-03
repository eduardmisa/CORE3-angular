import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRead, ServiceDeleteResponse } from 'src/interfaces/service.interface';

@Component({
  selector: 'app-customer-delete',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          Service Delete
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </mat-card-subtitle>

        <mat-card-content style="display:flex-root">

          <button mat-icon-button color="accent" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

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

          <mat-card *ngIf="errors.length > 0" class="mat-elevation-z0">
            <div *ngFor="let error of errors">
              <span class="mat-caption" style="color:maroon">{{error}}</span>
            </div>
          </mat-card>

          <button mat-stroked-button color="accent" (click)="this.Submit()">Submit</button>

        </mat-card-content>
      </mat-card-loading>
    </div>
  `,
})
export class ServiceDeleteComponent implements OnInit {

  slug: string
  service: ServiceRead = {
    code: "",
    name: "",
    description: "",
    baseUrl: ""
  }
  deletedResponse: ServiceRead
  errors: string[] = []
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

  Submit () {
    this.isLoading = true
    this.errors = [] as string[]
    this.svcService.delete<ServiceDeleteResponse>(this.slug)
    .subscribe(
    data => {
      this.isLoading = false
      this.deletedResponse = data
      this.router.navigateByUrl(`/services`)
    },
    ({error}) => {
      this.isLoading = false
      this.errors = error
    })
  }
}
