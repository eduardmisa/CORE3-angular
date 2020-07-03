import { Component, OnInit } from '@angular/core';
import { LoginRequest, LoginResponse } from '../../interfaces/auth.interface'
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <mat-card style="border-radius:0px;">
      <div style="display:flex;height:100vh;width:100vw;">

        <div style="margin:auto;width:300px">
          <mat-card-loading [isLoading]="isLoading">
            <mat-card-title>
              Login
            </mat-card-title>
            <mat-card-subtitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </mat-card-subtitle>

            <mat-card-content style="display:flex-root">

              <mat-form-field class="w-full" appearance="fill" dense>
                <mat-label>Username</mat-label>
                <input matInput [value]="this.form.username" (input)="this.form.username = $event.target.value">
              </mat-form-field>

              <mat-form-field class="w-full" appearance="fill" dense>
                <mat-label>Password</mat-label>
                <input matInput [(ngModel)]="this.form.password" type="password">
              </mat-form-field>

              <br><br>

              <button mat-stroked-button color="accent" (click)="this.onSubmitLogin()">Login</button>

            </mat-card-content>
          </mat-card-loading>
        </div>

      </div>
    </mat-card>
  `,
  styles: [
  ]
})
export class LoginComponent {

  constructor(private svcAuth: AuthService, private router: Router) { }

  form: LoginRequest = {
    username: "admin",
    password: "p@ssw0rd"
  }
  loginResponse: LoginResponse = {
    token: ""
  }
  error = ""
  isLoading: boolean = false

  onSubmitLogin(): void {
    this.isLoading = true
    this.svcAuth.Login(this.form)
    .subscribe(
    data => {
      this.loginResponse = data

      document.cookie = `access_token=`
      document.cookie = `access_token=${data.token}`
      this.isLoading = false
      this.router.navigateByUrl(`/`)
      .then(() => {
        document.location.reload()
      })
    },
    ({error}) => {
      this.error = error
      this.svcAuth.isAuthenticated = false
      document.cookie = `access_token=`
      this.isLoading = false
    })
  }
}
