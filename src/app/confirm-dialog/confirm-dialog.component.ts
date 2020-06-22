import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Car2 } from '../models/car2.model';
import { CarForSale } from '../models/CarForSale.model';
import { ModelCustomerDetails } from '../models/customerDetails.model';
import { Subject, Observable } from 'rxjs';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    // public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public nVpAry: NVP[],
    public confirmService: ConfirmDialogService
  ) {}

  public confirmTitle: string = this.confirmService.confirmDialogTitle;
  public confirmTblSource = new MatTableDataSource<NVP>();
  confirmTblColumns: string[] = ['name', 'value'];
  public confirmDialogTitle: string;
  ngOnInit(): void {
    this.confirmDialogTitle = this.confirmService.confirmDialogTitle;
    this.confirmTblSource.data = this.confirmService.nVPArray;
  }
  public confirm(): void {}
  public cancel(): void {}
}

///////////////////////////////////////////////////////////////////////
export class NVP {
  name: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  public carToEdit: Car2;
  public modelCustomerDetails: ModelCustomerDetails;
  public nVPArray = Array<NVP>();
  public confirmDialogTitle: string;
  constructor(public dialog: MatDialog) {}
  // public confirmDialogAnswer: string;
  public dialogRef: MatDialogRef<ConfirmDialogComponent>;

  public car2CarForSale(car2: Car2, colorIndex: number): CarForSale {
    const carForSale = new CarForSale();
    carForSale.carRefId = car2.carRefId;
    carForSale.brand = car2.brand;
    carForSale.model = car2.model;
    carForSale.yearMade = car2.yearMade;
    carForSale.color = car2.lisByColor[colorIndex].color;
    carForSale.averagePrice = car2.lisByColor[colorIndex].averagePrice;
    carForSale.noOfCarsSold = car2.lisByColor[colorIndex].noOfCarsSold;
    carForSale.noOfCarsAvailable = car2.lisByColor[colorIndex].noOfCarsAvailable;
    return carForSale;
  }
  // tslint:disable-next-line: ban-types
  public pushJsonObjToNVPArray(jsonObj: Object): void {
    // tslint:disable-next-line: forin
    for (const typex in jsonObj) {
      const nvp = new NVP();
      nvp.name = typex;
      nvp.value = jsonObj[typex];
      this.nVPArray.push(nvp);
    }
    this.nVPArray.forEach((entry) => {
      console.log('Confirm:' + entry.name + '/' + entry.value);
    });
  }
  public pushOneNVPToNVPArray(namei: string, valuei: string): void {
    const nvp = new NVP();
    nvp.name = namei;
    nvp.value = valuei;
    this.nVPArray.push(nvp);
  }

  setCusDtails(d: ModelCustomerDetails): void {
    this.modelCustomerDetails = d;
  }
  getCusDetails(): ModelCustomerDetails {
    return this.modelCustomerDetails;
  }

  setCarToEdit(inpCar: Car2) {
    this.carToEdit = inpCar;
  }
  getCarToEdit() {
    return this.carToEdit;
  }
  doConfirmDialog() {
    console.log('doConfirmDialog.....');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = this.nVPArray;
    dialogConfig.width = '700px';
    dialogConfig.maxHeight = '90vh';
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    // console.log('Opening Dialog ref Id ====++>  =' + dialogRef.id ) ;

    // dialogRef.afterClosed().subscribe((result) => {
    //   const outStr = result as string;
    //   console.log('Dialog subscribe output=' + outStr);
    //   // if (typeof result === 'undefined') {
    //   return;
    //   // }
    //   this.dialog.closeAll();
    //   this.confirmDialogAnswer = outStr;
    // });
  }
  getConfirmedAnswer(): Observable<string> {
    const subject = new Subject<string>();

    this.dialogRef.afterClosed().subscribe((result) => {
      const outStr = result as string;
      console.log('Dialog subscribe output=' + outStr);
      // if (typeof result === 'undefined') {
      //   return;
      // }
      this.dialog.closeAll();
      // this.confirmDialogAnswer = outStr;
      //  subject.next(this.confirmDialogAnswer);
      subject.next(outStr);
      this.nVPArray = [];
    });
    return subject.asObservable();
  }
}
// export enum AddOrUpdCarEnum {
//   Add,
//   Update,
// }
