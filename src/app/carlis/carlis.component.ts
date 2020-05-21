import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from '../models/car.model';
import { Comservices } from '../Comservices';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-carlis',
  templateUrl: './carlis.component.html',
  styleUrls: ['./carlis.component.css'],
})
export class CarlisComponent implements OnInit {
  title = 'angularmat';
  displayedColumns: string[] = [
    'brand',
    'yearMade',
    'model',
    'detail',
    'update',
  ];
 
  actionStr: string;
  carLis:Car[] ;
  carxx: Car;
  public dataSource = new MatTableDataSource<Car>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // tslint:disable-next-line: whitespace
  // tslint:disable-next-line: typedef-whitespace
 // carAry:Car[] ;
  constructor(
    private carservice: Comservices,
    public dialog: MatDialog,
    public router: Router,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.retrieveCars();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addNew() {
    console.log('Start Add New ....');
    this.sharedService.addCase();
    this.router.navigateByUrl('/addOrUpdcar'); //    addOrUpdcar
    console.log('End Add New ....');
  }
  updCar(carToUpd) {
    console.log('Start Upd case ....');
    //console.log("-3  CarLisComponent.this.carLis=" + this.carLis[2].carRefId ) ;
    this.sharedService.updCase(carToUpd);
    this.router.navigateByUrl('/addOrUpdcar');
    console.log('End Upd Case ...');
  }
  retrieveCars() {

    this.carservice.getAllCars().subscribe(
      (data) => {
        this.carLis = data as Car[] ;
        this.dataSource.data =  this.carLis  ;  
     
      },
      (error) => {
        console.log(error);
      }
    );
 
  }
  detail2(carx2) {
    console.log('Setting Car from detail2 .....' + carx2.brand);
    this.carxx = carx2;
    this.openDialog();
   
  }
  openDialog(): void {
    console.log('Setting Car from openDialog .....' + this.carxx.brand);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.data = this.carxx;
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(DialogCarDetail, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.actionStr = result;
      console.log('The dialog Closed Action=' + this.actionStr);
    });
  }
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-car-detail2',
  templateUrl: './dialog-car-detail2.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogCarDetail {
  public confDelBut: boolean;
  constructor(
    private carservice: Comservices,
    public dialogRef: MatDialogRef<DialogCarDetail>,

    @Inject(MAT_DIALOG_DATA) public data: Car
  ) {
    this.confDelBut = false;
  }
  deleteCar1(car): void {
    this.confDelBut = true;
  }

  cancelDelete(): void {
    this.confDelBut = false;
  }

  deleteCar(car: { carRefId: string; }): void {
    console.log('===> The dialog Closed with inp Car model=' + car.carRefId);
    this.carservice.deleteCar(car.carRefId).subscribe(
      (data) => {
        
      },
      (error) => {
        console.log(error);
      }
    );
    this.dialogRef.close();
  }
}
