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
  actionStr: string ;

  // constructor(public spinnerService: ProgressBarService )  { }
  constructor(public cartService: CartService, public dialog: MatDialog  )  { }

public numtest: number ;
public POrM: boolean = this.cartService.POrM ;
// tslint:disable-next-line: align
ngOnInit() {
    this.numtest = this.cartService.getNoOfCarsInCart() ;

   }
doCartDialog() {
  console.log('DoCartDialog.....') ;

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.hasBackdrop = true;
  dialogConfig.data = this.cartService.getCarsForSales();
  dialogConfig.width = '700px';
  // tslint:disable-next-line: no-unused-expression
  dialogConfig.maxHeight = '90vh';
  // tslint:disable-next-line: no-unused-expression
  // dialogConfig.scrollStrategy.enable ;
  const dialogRef = this.dialog.open( CartDialogComponent , dialogConfig);



  dialogRef.afterClosed().subscribe((result) => {
    this.actionStr = result;
    console.log ('Dialog output='  + result[0].color ) ;
  }
  );
}
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
