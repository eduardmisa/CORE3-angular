import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/services/permission.service';
import { GroupService } from 'src/services/group.service';
import { GroupCreateRequest,
         GroupCreateResponse,
         GroupPermissionCreateResponse } from 'src/interfaces/group.interface';
import { Router } from '@angular/router';
import { PermissionList } from 'src/interfaces/permission.interface';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';

@Component({
  selector: 'app-group-create',
  template: `
    <mat-card style="margin:20px;width:300px">
      <mat-card-title>
        Group Create
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

        <mat-card class="mat-elevation-z0">
          <mat-card-subtitle>
            Permissions
          </mat-card-subtitle>
          <mat-selection-list dense [(ngModel)]="this.form.permissions">
            <mat-list-option *ngFor="let permission of permissionList" [value]="permission.code">
              {{permission.name}}
            </mat-list-option>
          </mat-selection-list>
        </mat-card>

        <br>

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
export class GroupCreateComponent implements OnInit {
  constructor(private svcGroup: GroupService, private svcPermission: PermissionService, private router: Router) { }

  ngOnInit(): void {
    this.svcPermission.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<PermissionList>) => {
      this.permissionList = data.results
    })
  }

  permissionList: PermissionList[]

  form:GroupCreateRequest = {
    name: "",
    description: "",
    permissions: [] as string[]
  }

  createdResponse:GroupCreateResponse = {
    code: "",
    name: "",
    description: "",
    permissions: [] as GroupPermissionCreateResponse[]
  }

  errors: string[] = []
  
  backToList () {
    this.router.navigateByUrl(`/groups`)
  }

  Submit () {
    this.svcGroup.post<GroupCreateResponse, GroupCreateRequest>(this.form)
    .subscribe(
    data => {
      this.createdResponse = data
      this.router.navigateByUrl(`/groups`)
    },
    ({error}) => {
      this.errors = error
    })
  }
}
