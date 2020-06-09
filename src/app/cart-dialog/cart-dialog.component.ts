import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../cart.service';
import { CarForSale } from '../models/CarForSale.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
// tslint:disable-next-line: class-name
// export class chekRow {
//   carForSale: CarForSale;
//   chk: boolean;
// }
@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {
  tableSource2 = new MatTableDataSource<CarForSale>();
  tableSource2Columns: string[] = [
    'brand',
    'model',
    'yearMade' ,
    'color',
    'averagePrice',
    'noOfCarsAvailable',
    'chkbox'
  ];
  // tslint:disable-next-line: new-parens
  public  selectedArry  = new Array<CarForSale>();
  public dialogTitle = 'Pick To Customer' ;
  public buttonTitle =  'PushToCustomer' ;                            // PickOrMange
  public buttonEnble = false ;
  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent> ,
    @Inject(MAT_DIALOG_DATA) public carForSaleAry: CarForSale[],
    public cartService: CartService
     )
  // tslint:disable-next-line: whitespace
   { this.tableSource2.data=carForSaleAry;}
ngOnInit() {
  if ( this.cartService.POrM === 'Manage' ) {
    this.dialogTitle = 'Confirm Cart View?' ;
    this.buttonTitle = 'Delete' ;
  }

  }
public removeCars() {
  this.cartService.removeCars(this.selectedArry) ;
  // this.dialogRef.componentInstance.carForSaleAry = this.cartService.getCarsForSales();
  // this.dialogRef.componentInstance.carForSaleAry.filter(item => !this.selectedArry.includes(item)) ;
  // this.dataSource = new MatTableDataSource(results);
  // this.tableSource2 = new MatTableDataSource(this.carForSaleAry);
}

  onNoClick()  {
    this.dialogRef.close() ;

  }
  onChangeEventChkBox(row: CarForSale,  event: MatCheckboxChange): void {
    console.log('event=' + event.checked +  ' and row=' + row.color) ;
    console.log('calling onChangeEventChkBox isChecked=' + event) ;
    if (event.checked) {
    //  check and prevent duplication
    // tslint:disable-next-line: max-line-length
    if ( this.selectedArry.some(elm => elm.model === row.model  &&  elm.brand === row.brand && elm.color === row.color && elm.yearMade === row.yearMade) ) {  return ; }

    this.selectedArry.push(row) ;
    } else {
      const index = this.selectedArry.findIndex(elm => row.brand === elm.brand && row.model === elm.model  && row.color === elm.color);
      console.log('index=' + index) ;
      this.selectedArry.splice(index, 1);

  }

     // tslint:disable-next-line: align
     console.log('this.selectedArry.length=' + this.selectedArry.length) ;


    if ( this.selectedArry.length > 0 ) {
      this.buttonEnble = true ;
    }
    else
    { this.buttonEnble = false ; }
}
}
