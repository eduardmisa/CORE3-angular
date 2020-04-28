import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CORE3Angular';
  @Input() leftDrawer: Boolean = false

  // toggleDrawer () {
  //   this.leftDrawer = !this.leftDrawer
  // }
}
