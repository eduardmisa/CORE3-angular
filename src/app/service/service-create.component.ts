import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { ServiceCreateRequest, ServiceCreateResponse } from 'src/interfaces/service.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
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

      </mat-card-loading>
    </div>
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
  isLoading: boolean = false
  
  backToList () {
    this.router.navigateByUrl(`/services`)
  }

  Submit () {
    this.isLoading = true
    this.errors = [] as string[]
    this.svcService.post<ServiceCreateResponse, ServiceCreateRequest>(this.form)
    .subscribe(
    data => {
      this.isLoading = false
      this.createdResponse = data
      this.router.navigateByUrl(`/services`)
    },
    ({error}) => {
      this.isLoading = false
      this.errors = error
    })
  }
}
