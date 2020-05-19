import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="flex flex-row">
      <h1 class="text-6xl text-gray-500 m-10">SIDE BAR</h1>
      <h1 class="text-6xl text-gray-500 m-10">TOP BAR</h1>
      <h1 class="text-6xl text-gray-500 m-10">CONTENT</h1>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'CORE3-angularv9';
}
