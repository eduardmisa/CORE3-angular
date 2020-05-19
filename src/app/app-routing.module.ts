import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerViewComponent } from './customer/customer-view/customer-view.component';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './customer/customer-update/customer-update.component';
import { CustomerDeleteComponent } from './customer/customer-delete/customer-delete.component';

const routes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/view/:id', component: CustomerViewComponent },
  { path: 'customers/create', component: CustomerCreateComponent },
  { path: 'customers/update/:id', component: CustomerUpdateComponent },
  { path: 'customers/delete/:id', component: CustomerDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
