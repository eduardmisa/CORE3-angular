import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRead, ServiceUpdateRequest, ServiceUpdateResponse } from 'src/interfaces/service.interface';

@Component({
  selector: 'app-customer-update',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">

      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          Service Update
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </mat-card-subtitle>

        <mat-card-content style="display:flex-root">

          <button mat-icon-button color="primary" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

          <br><br>

          <mat-form-field class="w-full" appearance="fill" dense>
            <mat-label>Name</mat-label>
            <input matInput [value]="this.form.name" (input)="this.form.name = $event.target.value">
          </mat-form-field>

          <br>

          <mat-form-field class="w-full" appearance="fill" dense>
            <mat-label>Description</mat-label>
            <input matInput [value]="this.form.description" (input)="this.form.description = $event.target.value">
          </mat-form-field>

          <br>

          <mat-form-field class="w-full" appearance="fill" dense>
            <mat-label>Base Url</mat-label>
            <input matInput [value]="this.form.baseUrl" (input)="this.form.baseUrl = $event.target.value">
          </mat-form-field>

          <mat-card *ngIf="errors.length > 0" class="mat-elevation-z0">
            <span *ngFor="let error of errors" class="mat-caption" style="color:maroon">{{error}}</span>
          </mat-card>

          <br><br>

          <button mat-stroked-button color="primary" (click)="this.Submit()">Submit</button>

        </mat-card-content>

      </mat-card-loading>
    </div>
  `,
})
export class ServiceUpdateComponent implements OnInit {

  slug: string
  form:ServiceUpdateRequest = {
    name: "",
    baseUrl: "",
    description: "",
  }
  updatedResponse:ServiceUpdateResponse = {
    code: "",
    name: "",
    baseUrl: "",
    description: ""
  }
  errors: string[] = []
  isLoading: boolean = false

  constructor(private svcService: ServiceService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
   }

  ngOnInit(): void {
    this.fetchCustomers()
  }

  backToList () {
    this.router.navigateByUrl(`/services`)
  }
  fetchCustomers () {
    this.isLoading = true
    this.svcService.retreive<ServiceRead>(this.slug)
    .subscribe(item => {
      this.form = item
      this.isLoading = false
    })
  }

  Submit () {
    this.isLoading = true
    this.errors = [] as string[]
    this.svcService.put<ServiceUpdateResponse, ServiceUpdateRequest>(this.slug, this.form)
    .subscribe(
    data => {
      this.isLoading = false
      this.updatedResponse = data
      this.router.navigateByUrl(`/services`)
    },
    ({error}) => {
      this.isLoading = false
      this.errors = error
    })
  }
}
