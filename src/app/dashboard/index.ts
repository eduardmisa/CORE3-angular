import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/services/service.service';
import { ServiceRouteService } from 'src/services/service.route.service';
import { GroupService } from 'src/services/group.service';
import { PermissionService } from 'src/services/permission.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dashboard',
  template: `

    <br><br>

    <div class="flex flex-row">
      <span class="mat-display-2 margin-auto"> Summary </span>
    </div>

    <br>

    <div class="flex flex-row justify-center flex-wrap">

      <div class="flex" style="padding:10px;">
        <div>
          <mat-card-loading [isLoading]="isLoadingService">
          <mat-card-title>
            Services
          </mat-card-title>
          <mat-card-subtitle>
          Total records
          </mat-card-subtitle>
          
          <mat-card-content style="display:flex-root">
          <div class="flex flex-col w-full justify-center">
            <span class="mat-display-1 margin-auto"> {{countService}} </span>
            <br>
            <button mat-icon-button color="accent" style="margin:auto" (click)="this.fetchServicesCount()"><mat-icon>update</mat-icon></button>
          </div>
          </mat-card-content>
          
          </mat-card-loading>
        </div>
      </div>

      <div class="flex" style="padding:10px;">
        <div>
          <mat-card-loading [isLoading]="isLoadingServiceRoute">
          <mat-card-title>
            Service Routes
          </mat-card-title>
          <mat-card-subtitle>
          Total records
          </mat-card-subtitle>
          
          <mat-card-content style="display:flex-root">
          <div class="flex flex-col">
            <span class="mat-display-1 margin-auto"> {{countServiceRoute}} </span>
            <br>
            <button mat-icon-button color="accent" style="margin:auto" (click)="this.fetchServiceRoutesCount()"><mat-icon>update</mat-icon></button>
          </div>
          </mat-card-content>
          
          </mat-card-loading>
        </div>
      </div>

      <div class="flex" style="padding:10px;">
        <div>
          <mat-card-loading [isLoading]="isLoadingGroup">
          <mat-card-title>
            Groups
          </mat-card-title>
          <mat-card-subtitle>
          Total records
          </mat-card-subtitle>
          
          <mat-card-content style="display:flex-root">
          <div class="flex flex-col">
            <span class="mat-display-1 margin-auto"> {{countGroup}} </span>
            <br>
            <button mat-icon-button color="accent" style="margin:auto" (click)="this.fetchGroupCount()"><mat-icon>update</mat-icon></button>
          </div>
          </mat-card-content>
          
          </mat-card-loading>
        </div>
      </div>

      <div class="flex" style="padding:10px;">
        <div>
          <mat-card-loading [isLoading]="isLoadingPermission">
          <mat-card-title>
            Permissions
          </mat-card-title>
          <mat-card-subtitle>
          Total records
          </mat-card-subtitle>
          
          <mat-card-content style="display:flex-root">
          <div class="flex flex-col">
            <span class="mat-display-1 margin-auto"> {{countPermission}} </span>
            <br>
            <button mat-icon-button color="accent" style="margin:auto" (click)="this.fetchPermissionsCount()"><mat-icon>update</mat-icon></button>
          </div>
          </mat-card-content>
          
          </mat-card-loading>
        </div>
      </div>

      <div class="flex" style="padding:10px;">
        <div>
          <mat-card-loading [isLoading]="isLoadingUser">
          <mat-card-title>
            Users
          </mat-card-title>
          <mat-card-subtitle>
          Total records
          </mat-card-subtitle>
          
          <mat-card-content style="display:flex-root">
          <div class="flex flex-col">
            <span class="mat-display-1 margin-auto"> {{countUser}} </span>
            <br>
            <button mat-icon-button color="accent" style="margin:auto" (click)="this.fetchUsersCount()"><mat-icon>update</mat-icon></button>
          </div>
          </mat-card-content>
          
          </mat-card-loading>
        </div>
      </div>

    </div>
  `,
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  constructor(private serviceService: ServiceService,
              private serviceRouteService: ServiceRouteService,
              private groupService: GroupService,
              private permissionService: PermissionService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchServicesCount()
    this.fetchServiceRoutesCount()
    this.fetchGroupCount()
    this.fetchPermissionsCount()
    this.fetchUsersCount()
  }

  fetchServicesCount () : void {
    this.isLoadingService = true
    this.serviceService.count()
    .subscribe((data: number) => {
      this.countService = data
      this.isLoadingService = false
    })
  }
  fetchServiceRoutesCount () : void {
    this.isLoadingServiceRoute = true
    this.serviceRouteService.count()
    .subscribe((data: number) => {
      this.countServiceRoute = data
      this.isLoadingServiceRoute = false
    })
  }
  fetchGroupCount () : void {
    this.isLoadingGroup = true
    this.groupService.count()
    .subscribe((data: number) => {
      this.countGroup = data
      this.isLoadingGroup = false
    })
  }
  fetchPermissionsCount () : void {
    this.isLoadingPermission = true
    this.permissionService.count()
    .subscribe((data: number) => {
      this.countPermission = data
      this.isLoadingPermission = false
    })
  }
  fetchUsersCount () : void {
    this.isLoadingUser = true
    this.userService.count()
    .subscribe((data: number) => {
      this.countUser = data
      this.isLoadingUser = false
    })
  }

  isLoadingService: boolean = false
  isLoadingServiceRoute: boolean = false
  isLoadingGroup: boolean = false
  isLoadingPermission: boolean = false
  isLoadingUser: boolean = false

  countService: number = 0
  countServiceRoute: number = 0
  countGroup: number = 0
  countPermission: number = 0
  countUser: number = 0
}
