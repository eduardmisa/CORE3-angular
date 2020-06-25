import { Component, Input } from '@angular/core';

// modes: side, push, over
interface Module {
  name: string;
  urlPath: string;
}

@Component({
  selector: 'app-sidebar',
  template: `
    <mat-drawer-container class="example-container" [hasBackdrop]="false">
      <mat-drawer [opened]="toggleState" [mode]="'side'">

        <mat-selection-list [multiple]="false" dense>
          <mat-list-option *ngFor="let module of modules" [routerLink]="module.urlPath" routerLinkActive="active">
            {{module.name}}
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
  modules:Module[] = [
    { name: "Services", urlPath: "/services"},
    { name: "ServiceRoutes", urlPath: "/service-routes"},
    { name: "Modules", urlPath: "/modules"},
    { name: "Groups", urlPath: "/groups"},
    { name: "Permissions", urlPath: "/permissions"},
    { name: "Users", urlPath: "/users"},
  ]

  @Input() toggleState: boolean;
}
