import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { ServiceCreateRequest, ServiceCreateResponse } from 'src/interfaces/service.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  template: `
    <mat-card style="margin:30px;">
      <mat-card-title>
        Service Create
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
export class ServiceCreateComponent {
  constructor(private svcService: ServiceService, private router: Router) { }

  form:ServiceCreateRequest = {
    name: "",
    baseUrl: "",
    description: ""
  }

  createdResponse:ServiceCreateResponse = {
    code: "",
    name: "",
    baseUrl: "",
    description: ""
  }

  errors: string[] = []
  
  backToList () {
    this.router.navigateByUrl(`/services`)
  }

  Submit () {
    this.errors = [] as string[]
    this.svcService.post<ServiceCreateResponse, ServiceCreateRequest>(this.form)
    .subscribe(
    data => {
      this.createdResponse = data
      this.router.navigateByUrl(`/services`)
    },
    ({error}) => {
      this.errors = error
    })
  }
}
