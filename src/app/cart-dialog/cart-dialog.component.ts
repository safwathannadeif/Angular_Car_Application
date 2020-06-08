import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../cart.service';
import { CarForSale } from '../models/CarForSale.model';
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
  public  selected  = new Array<CarForSale>();
  public POrM: boolean ;
  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent> ,
    @Inject(MAT_DIALOG_DATA) public carForSaleAry: CarForSale[],
    public cartService: CartService
     )
  // tslint:disable-next-line: whitespace
   { this.tableSource2.data=carForSaleAry;}
ngOnInit() {
  this.POrM = this.cartService.POrM ;

  }
  onNoClick()  {
    this.dialogRef.close() ;

  }
  onChangeEventFunc(row: CarForSale, isChecked: boolean) {
   if (isChecked) {
      this.selected.push(row) ;
    } else {
      const index = this.selected.findIndex(elm => row.brand === elm.brand && row.model === elm.model);
     // this.chkCaptured.removeAt(index);
      this.selected.splice(index, 1);
    }
  }

}

