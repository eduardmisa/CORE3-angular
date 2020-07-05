import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../src/app/auth/can.activate'

import { LoginComponent } from './auth/login.component';

import { DashboardComponent } from './dashboard';

import { ServiceListComponent } from './service/service-list.component';
import { ServiceViewComponent } from './service/service-view.component';
import { ServiceCreateComponent } from './service/service-create.component';
import { ServiceUpdateComponent } from './service/service-update.component';
import { ServiceDeleteComponent } from './service/service-delete.component';

import { ServiceRouteListComponent } from './service-route/service-route-list.component';
import { ServiceRouteViewComponent } from './service-route/service-route-view.component';
import { ServiceRouteCreateComponent } from './service-route/service-route-create.component';
import { ServiceRouteUpdateComponent } from './service-route/service-route-update.component';
import { ServiceRouteDeleteComponent } from './service-route/service-route-delete.component';
import { ServiceRouteEndpointLookupComponent } from './service-route/service-route-endpoint-lookup.component';

import { PermissionListComponent } from './permission/permission-list.component';
import { PermissionViewComponent } from './permission/permission-view.component';
import { PermissionCreateComponent } from './permission/permission-create.component';
import { PermissionUpdateComponent } from './permission/permission-update.component';
import { PermissionDeleteComponent } from './permission/permission-delete.component';

import { GroupListComponent } from './group/group-list.component';
import { GroupViewComponent } from './group/group-view.component';
import { GroupCreateComponent } from './group/group-create.component';
import { GroupUpdateComponent } from './group/group-update.component';
import { GroupDeleteComponent } from './group/group-delete.component';

import { UserListComponent } from './user/user-list.component';
import { UserViewComponent } from './user/user-view.component';
import { UserCreateComponent } from './user/user-create.component';
import { UserUpdateComponent } from './user/user-update.component';
import { UserDeleteComponent } from './user/user-delete.component';



const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: '', component: DashboardComponent, canActivate: [ AuthGuardService ] },

  { path: 'services', component: ServiceListComponent, canActivate: [ AuthGuardService ] },
  { path: 'services/view/:id', component: ServiceViewComponent, canActivate: [ AuthGuardService ] },
  { path: 'services/create', component: ServiceCreateComponent, canActivate: [ AuthGuardService ] },
  { path: 'services/update/:id', component: ServiceUpdateComponent, canActivate: [ AuthGuardService ] },
  { path: 'services/delete/:id', component: ServiceDeleteComponent, canActivate: [ AuthGuardService ] },

  { path: 'service-routes', component: ServiceRouteListComponent, canActivate: [ AuthGuardService ] },
  { path: 'service-routes/view/:id', component: ServiceRouteViewComponent, canActivate: [ AuthGuardService ] },
  { path: 'service-routes/create', component: ServiceRouteCreateComponent, canActivate: [ AuthGuardService ] },
  { path: 'service-routes/update/:id', component: ServiceRouteUpdateComponent, canActivate: [ AuthGuardService ] },
  { path: 'service-routes/delete/:id', component: ServiceRouteDeleteComponent, canActivate: [ AuthGuardService ] },
  { path: 'service-routes/endpoint-lookup', component: ServiceRouteEndpointLookupComponent, canActivate: [ AuthGuardService ] },

  { path: 'permissions', component: PermissionListComponent, canActivate: [ AuthGuardService ] },
  { path: 'permissions/view/:id', component: PermissionViewComponent, canActivate: [ AuthGuardService ] },
  { path: 'permissions/create', component: PermissionCreateComponent, canActivate: [ AuthGuardService ] },
  { path: 'permissions/update/:id', component: PermissionUpdateComponent, canActivate: [ AuthGuardService ] },
  { path: 'permissions/delete/:id', component: PermissionDeleteComponent, canActivate: [ AuthGuardService ] },

  { path: 'groups', component: GroupListComponent, canActivate: [ AuthGuardService ] },
  { path: 'groups/view/:id', component: GroupViewComponent, canActivate: [ AuthGuardService ] },
  { path: 'groups/create', component: GroupCreateComponent, canActivate: [ AuthGuardService ] },
  { path: 'groups/update/:id', component: GroupUpdateComponent, canActivate: [ AuthGuardService ] },
  { path: 'groups/delete/:id', component: GroupDeleteComponent, canActivate: [ AuthGuardService ] },  

  { path: 'users', component: UserListComponent, canActivate: [ AuthGuardService ] },
  { path: 'users/view/:id', component: UserViewComponent, canActivate: [ AuthGuardService ] },
  { path: 'users/create', component: UserCreateComponent, canActivate: [ AuthGuardService ] },
  { path: 'users/update/:id', component: UserUpdateComponent, canActivate: [ AuthGuardService ] },
  { path: 'users/delete/:id', component: UserDeleteComponent, canActivate: [ AuthGuardService ] },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule  { }
