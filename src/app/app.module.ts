import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './modules/routing.module';
import { AppComponent } from './app.component';
import { AuthorizedGuard } from './guards/auth.guard';

import { DashbordComponent, LoginComponent } from './pages';
import { ButtonComponent, SelectComponent, InputComponent } from './shared/components';
import { ApiService, UserService } from './shared/services';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    LoginComponent,
    ButtonComponent,
    SelectComponent, 
    InputComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthorizedGuard,
    ApiService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
