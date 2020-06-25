import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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


const routes: Routes = [
  { path: 'services', component: ServiceListComponent },
  { path: 'services/view/:id', component: ServiceViewComponent },
  { path: 'services/create', component: ServiceCreateComponent },
  { path: 'services/update/:id', component: ServiceUpdateComponent },
  { path: 'services/delete/:id', component: ServiceDeleteComponent },

  { path: 'service-routes', component: ServiceRouteListComponent },
  { path: 'service-routes/view/:id', component: ServiceRouteViewComponent },
  { path: 'service-routes/create', component: ServiceRouteCreateComponent },
  { path: 'service-routes/update/:id', component: ServiceRouteUpdateComponent },
  { path: 'service-routes/delete/:id', component: ServiceRouteDeleteComponent },

  { path: 'permissions', component: PermissionListComponent },
  { path: 'permissions/view/:id', component: PermissionViewComponent },
  { path: 'permissions/create', component: PermissionCreateComponent },
  { path: 'permissions/update/:id', component: PermissionUpdateComponent },
  { path: 'permissions/delete/:id', component: PermissionDeleteComponent },

  { path: 'groups', component: GroupListComponent },
  { path: 'groups/view/:id', component: GroupViewComponent },
  { path: 'groups/create', component: GroupCreateComponent },
  { path: 'groups/update/:id', component: GroupUpdateComponent },
  { path: 'groups/delete/:id', component: GroupDeleteComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule  { }
