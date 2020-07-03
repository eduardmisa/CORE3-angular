// Custom Extension Methods
import 'src/extension-methods/stringExtensions'

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatNativeDateModule} from '@angular/material/core';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSideBarComponent } from './shared/app.sidebar.component';
import { AppTopBarComponent } from './shared/app.topbar.component';

import { LoadingCardComponent } from './shared/loading-card.component';


import { LoginComponent } from './auth/login.component';


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


import { UserListComponent } from './user/user-list.component';
import { UserViewComponent } from './user/user-view.component';
import { UserCreateComponent } from './user/user-create.component';
import { UserUpdateComponent } from './user/user-update.component';
import { UserDeleteComponent } from './user/user-delete.component';


import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { ServiceService } from 'src/services/service.service';
import { ServiceRouteService } from 'src/services/service.route.service';
import { PermissionService } from 'src/services/permission.service';
import { GroupService } from 'src/services/group.service';
import { UserService } from 'src/services/user.service';
import { AuthGuardService } from './auth/can.activate';

@NgModule({
  declarations: [
    AppComponent,AppSideBarComponent,AppTopBarComponent,LoadingCardComponent,

    LoginComponent,

    ServiceListComponent,
    ServiceViewComponent,
    ServiceCreateComponent,
    ServiceUpdateComponent,
    ServiceDeleteComponent,

    ServiceRouteListComponent,
    ServiceRouteViewComponent,
    ServiceRouteCreateComponent,
    ServiceRouteUpdateComponent,
    ServiceRouteDeleteComponent,

    PermissionListComponent,
    PermissionViewComponent,
    PermissionCreateComponent,
    PermissionUpdateComponent,
    PermissionDeleteComponent,

    GroupListComponent,
    GroupViewComponent,
    GroupCreateComponent,
    GroupUpdateComponent,
    GroupDeleteComponent,

    UserListComponent,
    UserViewComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserDeleteComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

    MatNativeDateModule
  ],
  providers: [
    AuthGuardService,
    
    AuthService,
    ServiceService,
    ServiceRouteService,
    PermissionService,
    GroupService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
