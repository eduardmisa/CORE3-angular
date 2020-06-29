import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { IsServer } from 'src/helpers/processHelper';

// modes: side, push, over

@Component({
  selector: 'app-root',
  template: `

    <div *ngIf="isLoaded">

      <div *ngIf="isAuthenticated; then thenBlock else elseBlock"></div>

      <ng-template #thenBlock>
        <app-topbar (onToggleSideBar)="this.onToggleSideBar()"></app-topbar>
        <app-sidebar [toggleState]=[toggleState]>
          <router-outlet></router-outlet>
        </app-sidebar>
      </ng-template>

      <ng-template #elseBlock>
        <app-login></app-login>
      </ng-template>

    </div>

  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private svcAuth: AuthService, private router: Router) { }

  title = 'CORE-angular10'
  toggleState:boolean = false
  isAuthenticated = false
  isLoaded = false

  ngOnInit () {
    if (IsServer()) {
      return
    }

    this.svcAuth.FetchCurrentUser()
    .subscribe(
      data => {
        this.toggleState = true

        this.svcAuth.isAuthenticated = true
        this.isAuthenticated = this.svcAuth.isAuthenticated
        this.svcAuth.currentUser = data
      },
      ({error}) => {
        this.svcAuth.isAuthenticated = false
        this.isAuthenticated = this.svcAuth.isAuthenticated
        this.router.navigateByUrl(`/login`)
      })

      this.isLoaded = true
  }

  onToggleSideBar () {
    this.toggleState = !this.toggleState
  }
}
