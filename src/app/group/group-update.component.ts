import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupRead,
         GroupPermissionRead,
         GroupUpdateRequest,
         GroupUpdateResponse,
         GroupPermissionUpdateResponse } from 'src/interfaces/group.interface';
import { PermissionService } from 'src/services/permission.service';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { PermissionList } from 'src/interfaces/permission.interface';

@Component({
  selector: 'app-group-update',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          Group Update
        </mat-card-title>
        <mat-card-subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </mat-card-subtitle>

        <mat-card-content style="display:flex-root">

          <button mat-icon-button color="accent" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

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
            <span *ngFor="let error of errors" class="mat-caption" style="color:maroon">{{error}}</span>
          </mat-card>

          <br><br>

          <button mat-stroked-button color="accent" (click)="this.Submit()">Submit</button>

        </mat-card-content>
      </mat-card-loading>
    </div>
  `,
})
export class GroupUpdateComponent implements OnInit {
  constructor(private svcGroup: GroupService,private svcPermission: PermissionService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
   }

  ngOnInit(): void {
    this.isLoading = true
    this.svcGroup.retreive<GroupRead>(this.slug)
    .subscribe(item => {
      this.form.name = item.name
      this.form.description = item.description
      this.form.permissions = item.permissions.map(a => a.code)
      this.isLoading = false
    })
    this.svcPermission.paginate(new PaginationQuery(0, 0, '', ''))
    .subscribe((data: PaginatedResponse<PermissionList>) => {
      this.permissionList = data.results
    })
  }

  slug: string
  permissionList: PermissionList[]
  form:GroupUpdateRequest = {
    name: "",
    description: "",
    permissions: [] as string[]
  }
  updatedResponse:GroupUpdateResponse = {
    code: "",
    name: "",
    description: "",
    permissions: [] as GroupPermissionUpdateResponse[]
  }
  errors: string[] = []
  isLoading: boolean = false


  backToList () {
    this.router.navigateByUrl(`/groups`)
  }

  Submit () {
    this.isLoading = true
    this.errors = [] as string[]
    this.svcGroup.put<GroupUpdateResponse, GroupUpdateRequest>(this.slug, this.form)
    .subscribe(
    data => {
      this.isLoading = false
      this.updatedResponse = data
      this.router.navigateByUrl(`/groups`)
    },
    ({error}) => {
      this.isLoading = false
      this.errors = error
    })
  }
}
