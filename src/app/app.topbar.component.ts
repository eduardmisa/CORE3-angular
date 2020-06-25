import { Component, EventEmitter, Output } from '@angular/core';

// modes: side, push, over

@Component({
  selector: 'app-topbar',
  template: `
    <mat-toolbar color="primary" style="height:56px;">
      <button mat-icon-button (click)="this.onToggle()"><mat-icon>menu</mat-icon></button>
      <button mat-button routerLink="/" routerLinkActive="active">CORE Admin</button>
    </mat-toolbar>
  `,
  styles: []
})
export class AppTopBarComponent {
  title = 'CORE-angular10';
  
  @Output() onToggleSideBar = new EventEmitter<boolean>();

  onToggle () {
    this.onToggleSideBar.emit();
  }
}
