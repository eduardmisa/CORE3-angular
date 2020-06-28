import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './z.service';
import { LoginRequest, LoginResponse, CurrentUser } from 'src/interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService extends GenericService {
  constructor(http: HttpClient) {
    super(http, '/api/auth/')
   }

   isAuthenticated: boolean = false
   currentUser: CurrentUser

   Login (form: LoginRequest) : Observable<LoginResponse> {
    return this.post<LoginResponse, LoginRequest>(form, 'login')
   }

   FetchCurrentUser () : Observable<CurrentUser> {
    return this.retreive<CurrentUser>('current-user')
   }
}