import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerViewComponent } from './customer/customer-view.component';
import { CustomerCreateComponent } from './customer/customer-create.component';
import { CustomerUpdateComponent } from './customer/customer-update.component';
import { CustomerDeleteComponent } from './customer/customer-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from 'src/services/customer.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerViewComponent,
    CustomerCreateComponent,
    CustomerUpdateComponent,
    CustomerDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
