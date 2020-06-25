import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupRead, GroupPermissionRead } from 'src/interfaces/group.interface';

@Component({
  selector: 'app-group-view',
  template: `
    <mat-card style="margin:20px;width:300px">
      <mat-card-title>
        Group Details
      </mat-card-title>
      <mat-card-subtitle>
        Lorem ipsum dolor imet kadagu.
      </mat-card-subtitle>

      <mat-card-content style="display:flex-root">

        <button mat-icon-button color="primary" (click)="this.backToList()"><mat-icon>arrow_back</mat-icon></button>

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

      </mat-card-content>
    </mat-card>
  `,
})
export class GroupViewComponent implements OnInit {

  slug: string
  group: GroupRead = {
    code: "",
    name: "",
    description: "",
    permissions: [] as GroupPermissionRead[]
  }

  constructor(private svcGroup: GroupService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
   }

   backToList () {
    this.router.navigateByUrl(`/groups`)
   }

  ngOnInit(): void {
    this.fetchServices()
  }

  fetchServices () {
    this.svcGroup.retreive<GroupRead>(this.slug)
    .subscribe(item => {
      this.group = item
    })
  }
}

