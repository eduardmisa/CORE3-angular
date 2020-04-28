import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialWrapperModule } from './material-module'

import { NavTopComponent } from './shared/components/nav-top/nav-top.component';
import { NavSideLeftComponent } from './shared/components/nav-side-left/nav-side-left.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { CustomerModule } from './pages/customer/index'

// APP MODULES

@NgModule({
  declarations: [
    AppComponent,

    NavTopComponent,
    NavSideLeftComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialWrapperModule,
    CustomerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
