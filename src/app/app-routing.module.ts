import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarlisComponent} from './carlis/carlis.component' ;
import {CardetailsComponent} from './cardetails/cardetails.component' ;
import {AboutComponent} from './about/about.component' ; 
import {AddOrUpdCarComponent} from './addcar/addOrUpdCar.component' ;
import {CustomerComponent} from './customer/customer.component' ;

const routes: Routes = [
  { path: '', redirectTo: 'car', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'car', component:   CarlisComponent} ,
  { path: 'fromCarToDetail1/:id', component: CardetailsComponent },
  { path: 'addOrUpdcar', component: AddOrUpdCarComponent },   
  { path: 'customer', component:   CustomerComponent} 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

