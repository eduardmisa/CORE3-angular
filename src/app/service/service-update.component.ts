import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceRead, ServiceUpdateRequest, ServiceUpdateResponse } from 'src/interfaces/service.interface';

@Component({
  selector: 'app-customer-update',
  template: `
    <mat-card style="margin:20px;width:300px">
      <mat-card-title>
        Service Update
      </mat-card-title>
      <mat-card-subtitle>
        Lorem ipsum dolor imet kadagu.
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

    </mat-card>
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
    this.svcService.retreive<ServiceRead>(this.slug)
    .subscribe(item => {
      this.form = item
    })
  }

  Submit () {
    this.svcService.put<ServiceUpdateResponse, ServiceUpdateRequest>(this.slug, this.form)
    .subscribe(
    data => {
      this.updatedResponse = data
      this.router.navigateByUrl(`/services`)
    },
    ({error}) => {
      this.errors = error
    })
  }
}
