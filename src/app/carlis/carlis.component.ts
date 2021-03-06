import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartDialogService } from '../cart-dialog/cart-dialog.component';
import { Comservices } from '../Comservices';
import { Car2 } from '../models/car2.model';
import { Car2Entry } from '../models/Car2.model';
import { Car2Details } from '../models/car2Details.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-carlis',
  templateUrl: './carlis.component.html',
  styleUrls: ['./carlis.component.css'],
})
export class CarlisComponent implements OnInit {
  displayedColumns: string[] = [
    'brand',
    'yearMade',
    'model',
    'color',
    'averagePrice',
    'noOfCarsSold',
    'noOfCarsAvailable',
    'detail',
    'add_shopping_cart',
    'update',
  ];

  actionStr: string;
  carLis: Car2[];
  public car2Details: Car2Details = new Car2Details();

  public dataSource = new MatTableDataSource<Car2>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private carservice: Comservices,
    public dialog: MatDialog,
    public router: Router,
    public sharedService: SharedService,
    private cartService: CartDialogService
  ) {}

  ngOnInit() {
    this.retrieveCars();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addNew(): void {
    ////  ToDo
  }
  // addRow(row: Car2): void {
  //   console.log('AddRow with ' + row.lisByColor[row.colorIndex].color);
  // }
  // // tslint:disable-next-line: no-unused-expression
  // updateRow(row: Car2): void {
  //   console.log('UpdateRow with ' + row.lisByColor[row.colorIndex].color);
  // }
  // // tslint:disable-next-line: align
  // deleteRow(row: Car2) {
  //   console.log('deleteRow with ' + row.lisByColor[row.colorIndex].color);
  // }
  addToCart(row: Car2) {
    console.log('addToCart with ' + row.lisByColor[row.colorIndex].color);
    this.cartService.addToCart2(row);
  }

  selectedItem33(row: Car2, elm: Car2Entry) {
    const itemIndex = row.lisByColor.findIndex((item) => item.color === elm.color);
    // let itemToReplce = row.lisByColor.find(item  => item.color ===  elm.color) ;
    // Update the input row to match the colore selected by elm/Car2Entry
    row.colorIndex = itemIndex;
    row.lisByColor[itemIndex].averagePrice = elm.averagePrice;
    row.lisByColor[itemIndex].noOfCarsAvailable = elm.noOfCarsAvailable;
    row.lisByColor[itemIndex].noOfCarsSold = elm.noOfCarsSold;
    row.lisByColor[itemIndex].color = elm.color;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCar(carToUpd: Car2) {
    //  console.log('Start Edit case ....');
    console.log('-3  CarLisComponent  carToUpd=' + carToUpd.brand);

    this.sharedService.setCarToEdit(carToUpd);
    this.router.navigateByUrl('/editCar');
    // console.log('End Upd Case ...');
  }
  retrieveCars() {
    this.carservice.getAllCars2().subscribe(
      (data) => {
        this.carLis = data as Car2[];
        this.updateCarLisAfteLoad();
        this.dataSource.data = this.carLis;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ///////////////////////////////////////     updateItem(newItem){
  updateCarLisAfteLoad() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.carLis.length; i++) {
      this.carLis[i].colorIndex = 0;
    }
  }
  // tslint:disable-next-line: typedef-whitespace
  detail2(carx2: Car2) {
    this.car2Details.car2 = carx2; // lisByColor: Car2Entry[];
    console.log(carx2.brand);
    this.car2Details.averagePriceTot = 0;
    this.car2Details.noOfCarsAvailableTot = 0;

    this.car2Details.noOfCarsSoldTot = 0;
    for (const value of carx2.lisByColor) {
      // tslint:disable-next-line: no-trailing-whitespace

      this.car2Details.averagePriceTot += value.averagePrice;
      this.car2Details.noOfCarsAvailableTot += value.noOfCarsAvailable;
      this.car2Details.noOfCarsSoldTot += value.noOfCarsSold;
      console.log(value);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.car2Details.car2.lisByColor.length; i++) {
      this.car2Details.car2.lisByColor[i].srByColor =
        this.car2Details.car2.lisByColor[i].averagePrice *
        this.car2Details.car2.lisByColor[i].noOfCarsSold;
    }
    this.car2Details.srTot = this.car2Details.car2.lisByColor
      .map((t) => t.srByColor)
      .reduce((prv, cur) => prv + cur, 0);

    const noOfEntries = carx2.lisByColor.length;
    this.car2Details.averagePriceTot = this.car2Details.averagePriceTot / noOfEntries;
    this.openDialog();
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = this.car2Details;
    dialogConfig.width = '700px';
    // tslint:disable-next-line: no-unused-expression
    dialogConfig.maxHeight = '90vh';
    // tslint:disable-next-line: no-unused-expression
    // dialogConfig.scrollStrategy.enable ;
    const dialogRef = this.dialog.open(DialogCarDetail, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.actionStr = result;
    });
  }
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-car-detail2',
  templateUrl: './dialog-car-detail2.html',
  styleUrls: ['./carlis.component.css'],
})
// tslint:disable-next-line: component-class-suffix
export class DialogCarDetail {
  // tslint:disable-next-line: no-inferrable-types
  public confDelBut: boolean = false;
  dataSource2 = new MatTableDataSource<Car2Entry>();
  displayedColumns2: string[] = [
    'color',
    'averagePrice',
    'noOfCarsSold',
    'noOfCarsAvailable',
    'srByColor',
  ];
  constructor(
    private carservice: Comservices,
    public dialogRef: MatDialogRef<DialogCarDetail>,

    @Inject(MAT_DIALOG_DATA) public car2Details: Car2Details
  ) {
    this.dataSource2.data = car2Details.car2.lisByColor;
  }
  deleteCar1(car): void {
    this.confDelBut = true;
  }

  cancelDelete(): void {
    this.confDelBut = false;
  }

  deleteCar(carRefId: string): void {
    this.carservice.deleteCar(carRefId).subscribe(
      (data) => {},
      (error) => {
        console.log(error);
      }
    );
    this.dialogRef.close();
  }
}
