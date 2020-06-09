import { Component } from '@angular/core';
import { CartService } from './cart.service';
import {  OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'CarM9';
  

  // constructor(public spinnerService: ProgressBarService )  { }
  constructor(public cartService: CartService)  { }

// public numtest: number ;
public POrM: string ;
ngOnInit() {
   // this.numtest = this.cartService.getNoOfCarsInCart() ;
   this.POrM = this.cartService.POrM ;

   }
   doCartDialog() {
     this.cartService.doCartDialog2() ;
   }

  // doWork() {

  //   this.httpClient.get<any>('http://dummy.restapiexample.com/api/v1/employees')
  //     .subscribe(
  //       success => {
  //         console.log('Done');
  //       },
  //       error => {
  //         console.error('Error');
  //       }
  //     );
  // }
}
