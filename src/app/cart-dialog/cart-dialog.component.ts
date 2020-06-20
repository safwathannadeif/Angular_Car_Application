import { Injectable } from '@angular/core';
import { Car2 } from '../models/car2.model';
import {
  MatDialogConfig,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarForSale } from '../models/CarForSale.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
// export enum MangeOrPickFromCartEnum { 'Manage',   'Pick' }
@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css'],
})
export class CartDialogComponent implements OnInit {
  public tableSource2 = new MatTableDataSource<CarForSale>();
  tableSource2Columns: string[] = [
    'brand',
    'model',
    'yearMade',
    'color',
    'averagePrice',
    'noOfCarsAvailable',
    'chkbox',
  ];
  // tslint:disable-next-line: new-parens
  public selectedArry = new Array<CarForSale>();
  public dialogTitle = 'Pick To Customer';
  public buttonTitle = 'PushToCustomer'; // PickOrMange
  public buttonEnble = false;
  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public carForSaleAry: CarForSale[],
    public cartDialogService: CartDialogService
  ) {
    this.tableSource2.data = carForSaleAry;
  }
  ngOnInit() {
    if (this.cartDialogService.POrM === 'Manage') {
      this.dialogTitle = 'Confirm Cart View?';
      this.buttonTitle = 'Delete';
    } else {
      this.dialogTitle = 'Customer Cart Selection?';
      this.buttonTitle = 'PickToCustomer';
    }
  }
  public removeOrSlectCars() {
    this.cartDialogService.removeOrSlectCars(this.selectedArry);
  }
  onChangeEventChkBox(row: CarForSale, event: MatCheckboxChange): void {
    console.log('event=' + event.checked + ' and row=' + row.color);
    console.log('calling onChangeEventChkBox isChecked=' + event);
    if (event.checked) {
      //  check and prevent duplication
      // tslint:disable-next-line: max-line-length
      if (
        this.selectedArry.some(
          (elm) =>
            elm.model === row.model &&
            elm.brand === row.brand &&
            elm.color === row.color &&
            elm.yearMade === row.yearMade
        )
      ) {
        return;
      }

      this.selectedArry.push(row);
    } else {
      const index = this.selectedArry.findIndex(
        (elm) => row.brand === elm.brand && row.model === elm.model && row.color === elm.color
      );
      console.log('index=' + index);
      this.selectedArry.splice(index, 1);
    }

    // tslint:disable-next-line: align
    console.log('this.selectedArry.length=' + this.selectedArry.length);

    if (this.selectedArry.length > 0) {
      this.buttonEnble = true;
    } else {
      this.buttonEnble = false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class CartDialogService {
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
    this.dialog.closeAll();
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
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialogConfig.data = this.getCarsForSales();
    this.dialogConfig.width = '700px';
    // tslint:disable-next-line: no-unused-expression
    this.dialogConfig.maxHeight = '90vh';

    const dialogRef = this.dialog.open(CartDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      const outStr = result as string;
      console.log('Dialog subscribe output=' + outStr);

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
