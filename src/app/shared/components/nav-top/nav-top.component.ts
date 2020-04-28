import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent implements OnInit {

  @Input() leftDrawer: Boolean
  @Output() eventToggle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  ToggleDrawer () {
    this.eventToggle.emit(!this.leftDrawer)
  }
}
