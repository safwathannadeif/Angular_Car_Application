import { Injectable } from '@angular/core';
import { CarForSale } from './models/CarForSale.model';
import { Car2 } from './models/car2.model';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    public dialog: MatDialog // tslint:disable-next-line: align
  ) {}
  public dialogConfig: MatDialogConfig;

  public carForSales: CarForSale[] = [];
  public noInCart = 0;
  public POrM = 'Manage'; // Manage Or Pick

  public getCarsForSales(): CarForSale[] {
    return this.carForSales;
  }
  public getNoOfCarsInCart(): number {
    if (this.carForSales === null) {
      return 0;
    }
    if (typeof this.carForSales === 'undefined') {
      return 0;
    } // => true first time
    console.log('No in Cart =' + this.carForSales.length);
    return this.carForSales.length;
  }
  public cusSelectedCars(cusCarsForCus: CarForSale[]) {
    ///// To Do for custome with these cusCarsForCus
  }

  public removeOrSlectCars(carChecked: CarForSale[]) {
    if (this.POrM !== 'Manage') {
      this.cusSelectedCars(carChecked);
      return;
    }

    this.carForSales = this.carForSales.filter((item) => !carChecked.includes(item));
    // this.dialogConfig.data = this.dialogConfig.data.filter(item => !carChecked.includes(item));
    // this.dialogConfig.data = this.getCarsForSales(); // change the date
    this.dialog.closeAll();
    ///////////////////////////////////////////       this.doCartDialog2() ; ????

    // this.dialog.open(CartDialogComponent, this.dialogConfig);
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
    if (
      this.carForSales.some(
        (row2) =>
          carForSale.model === row2.model &&
          carForSale.brand === row2.brand &&
          carForSale.color === row2.color &&
          carForSale.yearMade === row2.yearMade
      )
    ) {
      return;
    }

    this.carForSales.push(carForSale);
    this.noInCart = this.carForSales.length;
    this.doCartDialog2();
  }
  ////
  doCartDialog2() {
    console.log('DoCartDialog.....');

    // tslint:disable-next-line: comment-format
    //const dialogConfig = new MatDialogConfig();
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialogConfig.data = this.getCarsForSales();
    this.dialogConfig.width = '700px';
    // tslint:disable-next-line: no-unused-expression
    this.dialogConfig.maxHeight = '90vh';
    // tslint:disable-next-line: no-unused-expression
    // dialogConfig.scrollStrategy.enable ;
    // tslint:disable-next-line: label-position
    // tslint:disable-next-line: whitespace
    // tslint:disable-next-line: label-position
    // tslint:disable-next-line: no-unused-expression

    const dialogRef = this.dialog.open(CartDialogComponent, this.dialogConfig);
    // console.log('Opening Dialog ref Id ====++>  =' + dialogRef.id ) ;

    dialogRef.afterClosed().subscribe((result) => {
      const outStr = result as string;
      console.log('Dialog subscribe output=' + outStr);
      // this.dialog.closeAll();
      // tslint:disable-next-line: align
      if (typeof result === 'undefined') {
        return;
      }
      this.dialog.closeAll();
      //  console.log('Dialog output=' + result[0].color);
      //  this.dialogConfig.data = this.getCarsForSales(); // change the date
      // this.doCartDialog2();
    });
  }
}
// export enum MangeOrPickFromCartEnum { 'Manage',   'Pick' }
