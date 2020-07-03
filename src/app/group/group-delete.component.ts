import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupRead,
         GroupPermissionRead,
         GroupDeleteResponse } from 'src/interfaces/group.interface';

@Component({
  selector: 'app-group-delete',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          Group Delete
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </mat-card-subtitle>

        <mat-card-content style="display:flex-root">

          <button mat-icon-button color="accent" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

          <br><br>

          <mat-form-field class="w-full" disabled>
            <mat-label>Code</mat-label>
            <input matInput [value]="group.code" readonly>
          </mat-form-field>

          <br>

          <mat-form-field class="w-full">
            <mat-label>Name</mat-label>
            <input matInput [value]="group.name" readonly>
          </mat-form-field>

          <br>

          <mat-form-field class="w-full">
            <mat-label>Description</mat-label>
            <input matInput [value]="group.description" readonly>
          </mat-form-field>

          <br>

          <mat-card class="mat-elevation-z0">
            <mat-card-subtitle>
              Permissions
            </mat-card-subtitle>
            <mat-selection-list dense>
              <mat-list-option *ngFor="let permission of group.permissions">
                {{permission.name}}
              </mat-list-option>
            </mat-selection-list>
          </mat-card>

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
export class GroupDeleteComponent implements OnInit {
  constructor(private svcGroup: GroupService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
  }

  ngOnInit(): void {
    this.fetchServices()
  }

  slug: string
  group: GroupRead = {
    code: "",
    name: "",
    description: "",
    permissions: [] as GroupPermissionRead[]
  }
  deletedResponse: GroupRead
  errors: string[] = []
  isLoading: boolean = false

  backToList () {
    this.router.navigateByUrl(`/groups`)
  }

  fetchServices () {
    this.isLoading = true
    this.svcGroup.retreive<GroupRead>(this.slug)
    .subscribe(item => {
      this.group = item
      this.isLoading = false
    })
  }

  Submit () {
    this.isLoading = true
    this.errors = [] as string[]
    this.svcGroup.delete<GroupDeleteResponse>(this.slug)
    .subscribe(
    data => {
      this.isLoading = false
      this.deletedResponse = data
      this.router.navigateByUrl(`/groups`)
    },
    ({error}) => {
      this.isLoading = false
      this.errors = error
    })
  }
}
