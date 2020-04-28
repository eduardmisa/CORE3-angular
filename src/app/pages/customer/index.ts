// Module Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material Module Wrapper
import { MaterialWrapperModule } from '../../material-module'

// API Service Imports
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from 'src/services/customer.service';

// Component Imports
import { CustomerList } from '../../components/customer/list/index';
import { CustomerCreate } from '../../components/customer/create/index';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    MaterialWrapperModule,

    BrowserModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: 'customers', component: CustomerList },
      { path: 'customers/create', component: CustomerCreate },
    ])
  ],
  entryComponents: [CustomerList],
  declarations: [
    CustomerList,
    CustomerCreate
  ],
  bootstrap: [CustomerList],
  providers: [
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
    CustomerService
  ]
})
export class CustomerModule { }
