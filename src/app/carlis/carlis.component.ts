import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car2 } from '../models/car2.model';
import { Car2Entry } from '../models/Car2.model' ;  
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
    'color',
    'averagePrice',
    'noOfCarsSold' ,
    'noOfCarsAvailable',
    'detail',
    'update'
  ];
 
  actionStr: string;
  carLis:Car2[] ;
  carxx: Car2;
  public dataSource = new MatTableDataSource<Car2>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
 
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
  selectedItem33(row:Car2,elm:Car2Entry) {
    /////  //https://stackoverflow.com/questions/44120645/angular-update-object-in-object-array
    // console.log('Calling selectedItem33 to do................. ....');
    // console.log('row:Car2==' + row.model ) ;
    // console.log('row:Car2==' + row.colorIndex ) ;
    // console.log('elm:Car2Entry==' + elm.color ) ;
   // let car2xx = this.dataSource.data.find(itm => itm.brand === row.brand && itm.model === row.model )
    let itemIndex = row.lisByColor.findIndex(item  => item.color ===  elm.color) ;
   // let itemToReplce = row.lisByColor.find(item  => item.color ===  elm.color) ;
    //Update the input row to match the colore selected by elm/Car2Entry
    row.colorIndex=itemIndex ;
    row.lisByColor[itemIndex].averagePrice=elm.averagePrice ;
    row.lisByColor[itemIndex].noOfCarsAvailable=elm.noOfCarsAvailable ;
    row.lisByColor[itemIndex].noOfCarsSold=elm.noOfCarsSold ;
    row.lisByColor[itemIndex].color=elm.color ;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addNew() {
   // console.log('Start Add New ....');
    this.sharedService.addCase();
    this.router.navigateByUrl('/addOrUpdcar'); //    addOrUpdcar
   // console.log('End Add New ....');
  }
  updCar(carToUpd) {
  //  console.log('Start Upd case ....');
    //console.log("-3  CarLisComponent.this.carLis=" + this.carLis[2].carRefId ) ;
    this.sharedService.updCase(carToUpd);
    this.router.navigateByUrl('/addOrUpdcar');
   // console.log('End Upd Case ...');
  }
  retrieveCars() {

    this.carservice.getAllCars2().subscribe(
      (data) => {
        this.carLis = data as Car2[] ;
        this.updateCarLisAfteLoad()   ;
        this.dataSource.data =  this.carLis  ;  
      },
      (error) => {
        console.log(error);
      }
    );
 
  }
  ///////////////////////////////////////     updateItem(newItem){
    updateCarLisAfteLoad(){
    for (let i = 0; i < this.carLis.length; i++) {
        // if(this.itemsArray[i].id == newItem.id){  ///////////// here is with condition 
        //   this.users[i] = newItem;
        // }
        this.carLis[i].colorIndex= 0 ;
      }
  }
  detail2(carx2) {
    this.carxx = carx2;
    this.openDialog();   
  }
  openDialog(): void {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = this.carxx;
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(DialogCarDetail, dialogConfig);
    
    dialogRef.afterClosed().subscribe((result) => {
      this.actionStr = result;
    });
  }
}
@Component({
  selector: 'dialog-car-detail2',
  templateUrl: './dialog-car-detail2.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogCarDetail {
  public confDelBut: boolean;
  constructor(
    private carservice: Comservices,
    public dialogRef: MatDialogRef<DialogCarDetail>,

    @Inject(MAT_DIALOG_DATA) public data: Car2
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
