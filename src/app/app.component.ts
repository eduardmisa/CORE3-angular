import {Component, OnInit} from '@angular/core';

// modes: side, push, over

@Component({
  selector: 'app-root',
  template: `
    <app-topbar (onToggleSideBar)="this.onToggleSideBar()"></app-topbar>
    <app-sidebar [toggleState]=[toggleState]></app-sidebar>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'CORE-angular10';
  toggleState:boolean = false

  ngOnInit () {
    this.toggleState = true;
  }

  onToggleSideBar () {
    this.toggleState = !this.toggleState
  }
}
