import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupRead, GroupPermissionRead } from 'src/interfaces/group.interface';

@Component({
  selector: 'app-group-view',
  template: `
    <div style="margin-top:30px;margin-bottom:30px;margin-left:auto;margin-right:auto;width:900px;">
      <mat-card-loading [isLoading]="isLoading">
        <mat-card-title>
          Group Details
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

        </mat-card-content>
      </mat-card-loading>
    </div>
  `,
})
export class GroupViewComponent implements OnInit {
  constructor(private svcGroup: GroupService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.slug = id);
  }

  slug: string
  group: GroupRead = {
    code: "",
    name: "",
    description: "",
    permissions: [] as GroupPermissionRead[]
  }
  isLoading: boolean = false

  backToList () {
    this.router.navigateByUrl(`/groups`)
  }

  ngOnInit(): void {
    this.fetchServices()
  }

  fetchServices () {
    this.isLoading = true
    this.svcGroup.retreive<GroupRead>(this.slug)
    .subscribe(item => {
      this.group = item
      this.isLoading = false
    })
  }
}

