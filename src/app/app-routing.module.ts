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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule  { }
