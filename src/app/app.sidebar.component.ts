import { Component, Input } from '@angular/core';

// modes: side, push, over

@Component({
  selector: 'app-sidebar',
  template: `
    <mat-drawer-container class="example-container" [hasBackdrop]="false">
      <mat-drawer [opened]="toggleState" [mode]="'side'">

        <mat-selection-list [multiple]="false" dense>
          <mat-list-option *ngFor="let module of modules" routerLink="/customers" routerLinkActive="active">
            {{module}}
          </mat-list-option>
        </mat-selection-list>

      </mat-drawer>
      <mat-drawer-content style="min-height:100vh">
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: []
})
export class AppSideBarComponent {
  title = 'CORE-angular10';
  modules:string[] = ["Customers", "Groups", "Modules", "Permissions", "ServiceRoutes", "Services", "Users"]

  @Input() toggleState: boolean;
}
