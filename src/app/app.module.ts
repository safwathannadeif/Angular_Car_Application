import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatToolbarModule} from  '@angular/material/toolbar';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarlisComponent } from './carlis/carlis.component';
import { CardetailsComponent } from './cardetails/cardetails.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { AboutComponent } from './about/about.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule } from  '@angular/material/button' ;
import {MatIconModule} from    '@angular/material/icon';
import {DialogCarDetail} from  './carlis/carlis.component'; //   
import { FormsModule } from '@angular/forms';
/* Reactive form services */
import {  ReactiveFormsModule } from '@angular/forms';
import {AddOrUpdCarComponent} from './addcar/addOrUpdCar.component'
import {SharedService} from './shared.service'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {BarProgressDialog} from './progressBar.service' ;
import {AppCustomHttpInterceptor}  from './httpGen-Interceptor'

 
@NgModule({
  declarations: [
    AppComponent,
    CarlisComponent,
    CardetailsComponent,
    CustomerComponent,
    CustomerdetailsComponent,
    DialogCarDetail ,
    AboutComponent,
    AddOrUpdCarComponent,
    BarProgressDialog , 
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:  AppCustomHttpInterceptor ,
    multi: true
  }],
 
  bootstrap: [AppComponent] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }


