import { Injectable } from '@angular/core';
import { CarForSale } from './models/CarForSale.model';
import { Car2 } from './models/car2.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public dialog: MatDialog) { }

  public carForSales: CarForSale[] = [];
  public noInCart = 0;
  public POrM = 'Manage';  // Manage Or Pick

  public getCarsForSales(): CarForSale[] {
    return this.carForSales;
  }
  public getNoOfCarsInCart(): number {
    if (this.carForSales === null) { return 0; }
    if (typeof this.carForSales === 'undefined') { return 0; }     // => true first time
    console.log('No in Cart =' + this.carForSales.length);
    return this.carForSales.length;
  }
  public removeCars(carForSaleToDelete: CarForSale[]) {
    this.carForSales = this.carForSales.filter(item => !carForSaleToDelete.includes(item));
    this.noInCart = this.carForSales.length;
  }
  public addToCart2(car2: Car2): void {
    const carForSale = new CarForSale();
    carForSale.carRefId = car2.carRefId;
    carForSale.brand = car2.brand;
    carForSale.model = car2.model;
    carForSale.yearMade = car2.yearMade;
    carForSale.color = car2.lisByColor[car2.colorIndex].color;
    carForSale.averagePrice = car2.lisByColor[car2.colorIndex].averagePrice;
    carForSale.noOfCarsAvailable = car2.lisByColor[car2.colorIndex].noOfCarsAvailable;
    carForSale.noOfCarsSold = car2.lisByColor[car2.colorIndex].noOfCarsSold;
    // tslint:disable-next-line: max-line-length
    if (this.carForSales.some(row2 => carForSale.model === row2.model && carForSale.brand === row2.brand && carForSale.color === row2.color && carForSale.yearMade === row2.yearMade)) { return; }
    this.carForSales.push(carForSale);
    this.noInCart = this.carForSales.length;
    this.doCartDialog2();
  }
  ////
  doCartDialog2() {
    console.log('DoCartDialog.....');

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = this.getCarsForSales();
    dialogConfig.width = '700px';
    // tslint:disable-next-line: no-unused-expression
    dialogConfig.maxHeight = '90vh';
    // tslint:disable-next-line: no-unused-expression
    // dialogConfig.scrollStrategy.enable ;
    const dialogRef = this.dialog.open(CartDialogComponent, dialogConfig);



    dialogRef.afterClosed().subscribe((result) => {
      this.dialog.closeAll();
      if (typeof (result) === 'undefined') { return; }
      console.log('Dialog output=' + result[0].color);
      if (result.length > 0) {
        //  dialogConfig.data = this.cartService.getCarsForSales();
        this.doCartDialog2();
      }
      else {
        return;

      }
    }
    );

    ////
  }
}
// export enum MangeOrPickFromCartEnum { 'Manage',   'Pick' }
