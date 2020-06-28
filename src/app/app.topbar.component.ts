import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { CurrentUser } from 'src/interfaces/auth.interface';

// modes: side, push, over

@Component({
  selector: 'app-topbar',
  template: `
    <mat-toolbar color="primary" style="height:56px;display:flex;">
      <button mat-icon-button (click)="this.onToggle()"><mat-icon>menu</mat-icon></button>
      <button mat-button routerLink="/" routerLinkActive="active">CORE Admin</button>

      <mat-menu #matMenu="matMenu">
        <ng-template matMenuContent>
          <button mat-menu-item (click)="this.viewProfile()">Profile</button>
          <button mat-menu-item (click)="this.setSettings()">Settings</button>
          <button mat-menu-item (click)="this.logoutUser()">Logout</button>
        </ng-template>
      </mat-menu>
      <button mat-button [matMenuTriggerFor]="matMenu" style="margin-left:auto;">{{currentUser.firstname}} {{currentUser.lastname}}<mat-icon>more_vert</mat-icon></button>
    </mat-toolbar>
  `,
  styles: []
})
export class AppTopBarComponent {
  constructor (private svcAuth: AuthService,) {
    this.currentUser = svcAuth.currentUser
  }

  title = 'CORE-angular10';
  currentUser: CurrentUser
  
  @Output() onToggleSideBar = new EventEmitter<boolean>();

  onToggle () {
    this.onToggleSideBar.emit();
  }

  viewProfile (): void {}
  setSettings (): void {}
  logoutUser (): void {
    document.cookie = `access_token=`
    document.location.reload()
  }
}
