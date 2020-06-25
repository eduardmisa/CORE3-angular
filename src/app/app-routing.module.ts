import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceListComponent } from './service/service-list.component';
import { ServiceViewComponent } from './service/service-view.component';
import { ServiceCreateComponent } from './service/service-create.component';
import { ServiceUpdateComponent } from './service/service-update.component';
import { ServiceDeleteComponent } from './service/service-delete.component';




const routes: Routes = [
  { path: 'services', component: ServiceListComponent },
  { path: 'services/view/:id', component: ServiceViewComponent },
  { path: 'services/create', component: ServiceCreateComponent },
  { path: 'services/update/:id', component: ServiceUpdateComponent },
  { path: 'services/delete/:id', component: ServiceDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule  { }
