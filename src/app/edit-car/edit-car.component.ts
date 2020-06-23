import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Car2, Car2Entry } from '../models/car2.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Comservices } from '../Comservices';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  ConfirmDialogComponent,
  ConfirmDialogService,
} from '../confirm-dialog/confirm-dialog.component';

import { ColorsToUse } from '../models/colors.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css'],
})
export class EditCarComponent implements OnInit {
  constructor(
    public carHttpService: Comservices,
    public confirmService: ConfirmDialogService,
    public formBuilder: FormBuilder,
    public colorToUse: ColorsToUse,
    public shareService: SharedService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
  public car2: Car2;
  public formGrp: FormGroup;
  public dataSource = new MatTableDataSource<Car2Entry>();
  public headSourceData = new MatTableDataSource<string[]>();
  public dispHeaderColums = ['brand', 'model', 'year', 'addNewColor', 'close'];
  public dispHeaderData: string[][];
  displayedColumns = [
    'colorFlag',
    'averagePrice',
    'noOfCarsSold',
    'noOfCarsAvailable',
    'saveUpdate',
    'delete',
  ];
  public disAbleAddNewColor = false;
  public formAray = new FormArray([]);
  public disAbleUpdActionArry = new Array<boolean>();
  public newColors: string[];
  public newAddedColor = 'Select Color';
  public disAbleClose = false;

  ngOnInit(): void {
    this.car2 = this.shareService.getCarToEdit();
    this.formGrp = this.formBuilder.group({ formAray: this.formAray });
    this.setGrpFormArray();
    this.dataSource.data = this.car2.lisByColor;
    this.dispHeaderData = new Array<Array<string>>();
    const row0: string[] = new Array<string>();
    row0.push(this.car2.brand);
    row0.push(this.car2.model);
    row0.push(this.car2.yearMade.toString());
    this.dispHeaderData.push(row0);
    this.headSourceData.data = this.dispHeaderData;
  }
  public setGrpFormArray(): void {
    let inx = 0;
    this.car2.lisByColor.forEach((entry) => {
      this.formAray.push(this.setGrpOneForm(entry));
      this.disAbleUpdActionArry[inx] = true;
      inx++;
    });
  }
  public setGrpOneForm(car2Entry: Car2Entry): FormGroup {
    return this.formBuilder.group({
      color: [car2Entry.color],
      averagePrice: [car2Entry.averagePrice, Validators.required],
      noOfCarsSold: [car2Entry.noOfCarsSold, Validators.required],
      noOfCarsAvailable: [car2Entry.noOfCarsAvailable, Validators.required],
    });
  }
  onChangeUpdEvent(indexr: number): void {
    this.disAbleUpdActionArry[indexr] = true;
    const arrayControl = this.formGrp.get('formAray') as FormArray;
    const updColor = arrayControl.at(indexr).get('averagePrice').value;
    if (updColor === '' || updColor === 'Select Color') {
      return;
    }

    const updAveragePrice = arrayControl.at(indexr).get('averagePrice').value;

    const updNoOfCarsSold = arrayControl.at(indexr).get('noOfCarsSold').value;

    const updNoOfCarsAvailable = arrayControl.at(indexr).get('noOfCarsAvailable').value;
    if (
      updAveragePrice === this.car2.lisByColor[indexr].averagePrice &&
      updNoOfCarsSold === this.car2.lisByColor[indexr].noOfCarsSold &&
      updNoOfCarsAvailable === this.car2.lisByColor[indexr].noOfCarsAvailable
    ) {
      return;
    }
    if (isNaN(updAveragePrice) || updAveragePrice <= 0) {
      this.showSnackbar('AveragePrice should be number > 0');
      return;
    }
    if (isNaN(updNoOfCarsSold) || updNoOfCarsSold <= 0) {
      this.showSnackbar('NoOfCarsSold   should be number > 0');
      return;
    }
    if (isNaN(updNoOfCarsAvailable) || updNoOfCarsAvailable <= 0) {
      this.showSnackbar('NoOfCarsAvailable should be number > 0');
      return;
    }

    this.disAbleUpdActionArry[indexr] = false;
    this.checkDisAbleClose();
  }
  public showSnackbar(content: string) {
    this.snackBar.open(content, 'OK');
  }

  public saveUpd(indexr: number): void {
    //
    const arrayControl = this.formGrp.get('formAray') as FormArray;
    const updAveragePrice = arrayControl.at(indexr).get('averagePrice').value;
    const updNoOfCarsSold = arrayControl.at(indexr).get('noOfCarsSold').value;
    const updNoOfCarsAvailable = arrayControl.at(indexr).get('noOfCarsAvailable').value;

    //

    this.confirmService.pushOneNVPToNVPArray('Brand', this.car2.brand);
    this.confirmService.pushOneNVPToNVPArray('Model', this.car2.model);
    this.confirmService.pushOneNVPToNVPArray('Year', this.car2.yearMade.toString());
    //  const lisCarx = this.formAray[indexr] as Car2Entry ;
    // this.confirmService.pushJsonObjToNVPArray(lisCarx);
    let updColor = this.car2.lisByColor[indexr].color;
    if (updColor === '') {
      updColor = this.newAddedColor;
      this.car2.lisByColor[indexr].color = this.newAddedColor;
    }
    this.confirmService.pushOneNVPToNVPArray('Color', updColor);
    this.confirmService.pushOneNVPToNVPArray('AveragePrice', updAveragePrice);
    this.confirmService.pushOneNVPToNVPArray('NoOfCarsSold', updNoOfCarsSold);
    this.confirmService.pushOneNVPToNVPArray('NoOfCarsAvialable', updNoOfCarsAvailable);
    this.confirmService.confirmDialogTitle = 'Confirm Update Car Entry?';
    this.confirmService.doConfirmDialog();
    this.confirmService.getConfirmedAnswer().subscribe((ans) => {
      if (ans.toString() === '1') {
        this.car2.lisByColor[indexr].averagePrice = updAveragePrice;
        this.car2.lisByColor[indexr].noOfCarsSold = updNoOfCarsSold;
        this.car2.lisByColor[indexr].noOfCarsAvailable = updNoOfCarsAvailable;
        console.log('Updated Car2=' + JSON.stringify(this.car2));
        this.updHttp();

        this.disAbleUpdActionArry[indexr] = true;
        // Check disAbleClose
        this.checkDisAbleClose();
        this.dataSource.data = this.car2.lisByColor;
      } else {
        this.rollbackUpd(indexr);
      }
    });
  }
  public updHttp() {
    this.carHttpService.updCar2(this.car2).subscribe(
      (data) => {
        const carUpdted = data as Car2;
        console.log('Car2Upd Done return:' + JSON.stringify(carUpdted));
      },
      (error) => {
        console.log(error);
      }
    );
    this.newAddedColor = 'Select Color';
    this.disAbleAddNewColor = false;
  }
  public delete(indexr: number): void {
    // What if the Entry in Cart?
    this.confirmService.pushJsonObjToNVPArray(
      this.confirmService.car2CarForSale(this.car2, indexr)
    );

    this.confirmService.confirmDialogTitle = 'Confirm Delete Car Entry?';
    this.confirmService.doConfirmDialog();
    this.confirmService.getConfirmedAnswer().subscribe((ans) => {
      console.log('delete confirmed action return backAns=' + ans);
      if (ans.toString() === '1') {
        console.log('delete confirmed action where backAnd=' + ans);
        this.car2.lisByColor.splice(indexr, 1);
        this.formAray.removeAt(indexr);
        if (this.disAbleAddNewColor === false) {
          this.updHttp(); // Db to be removed but NewAdded not Confirmed so it is not DB Yet
        } else {
          this.disAbleAddNewColor = false;
        }
        this.checkDisAbleClose();
        this.dataSource.data = this.car2.lisByColor;
      }
    });
  }
  public addNewColor() {
    this.formAray.push(
      this.formBuilder.group({
        color: ['N/A'],
        averagePrice: [''],
        noOfCarsSold: [''],
        noOfCarsAvailable: [''],
      })
    );
    this.disAbleUpdActionArry.push(true);
    this.disAbleAddNewColor = true;
    this.disAbleClose = true;
    this.car2.lisByColor.push({
      color: '', // color is undefined during adding new color
      averagePrice: 0,
      noOfCarsSold: 0,
      noOfCarsAvailable: 0,
      srByColor: 0,
    });
    // this.formAray.removeAt(indexr);
    this.newColors = this.colorToUse.colorToAdd(this.car2);
    this.dataSource.data = this.car2.lisByColor;
    console.log('addNewColor  Done return:' + this.newColors);
  }
  public selectedNewColor(colorSelected: string, indxr: number): void {
    console.log('selectedNewColor=:' + colorSelected);
    this.newAddedColor = colorSelected;
  }
  public rollbackUpd(indexr: number) {
    this.disAbleUpdActionArry[indexr] = true;

    if (this.disAbleAddNewColor === true) {
      // new Added Car Case
      this.newAddedColor = 'Select Color';
      this.formAray.removeAt(indexr);
      this.car2.lisByColor.splice(indexr, 1);
      this.disAbleUpdActionArry.splice(indexr, 1);
      this.disAbleAddNewColor = false;
    } else {
      // existing Car Case
      this.formAray.at(indexr).setValue(this.car2.lisByColor[indexr]);
    }
    // Check disAbleClose
    this.checkDisAbleClose();

    this.dataSource.data = this.car2.lisByColor;
  }
  public close(): void {
    this.router.navigateByUrl('/car');
  }
  // Check disAbleClose
  public checkDisAbleClose() {
    const noPendingChg = this.disAbleUpdActionArry.every((item) => item === true);
    console.log('noPendingChg1 =' + noPendingChg);
    this.disAbleClose = noPendingChg && !this.disAbleAddNewColor ? false : true;
  }
}
