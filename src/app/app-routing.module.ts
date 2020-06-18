import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarlisComponent } from './carlis/carlis.component';
import { AboutComponent } from './about/about.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { EditCarComponent } from './edit-car/edit-car.component';
const routes: Routes = [
  { path: '', redirectTo: 'car', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'car', component: CarlisComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'cartDialog', component: CartDialogComponent },
  { path: 'editCar', component: EditCarComponent },
  { path: 'customerDetail', component: CustomerdetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
