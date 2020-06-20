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
    public snackBar: MatSnackBar
  ) {}
  public car2: Car2;
  public formGrp: FormGroup;
  public dataSource = new MatTableDataSource<Car2Entry>();
  public headSourceData = new MatTableDataSource<string[]>();
  public dispHeaderColums = ['brand', 'model', 'year', 'addNewColor'];
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
  public disAbleBooleanActionArry = new Array<boolean>();
  public newColors: string[];
  public newAddedColor = 'Select Color';

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
      this.disAbleBooleanActionArry[inx] = true;
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
    const arrayControl = this.formGrp.get('formAray') as FormArray;
    if (
      arrayControl.at(indexr).get('averagePrice').value !==
        this.car2.lisByColor[indexr].averagePrice ||
      arrayControl.at(indexr).get('noOfCarsSold').value !==
        this.car2.lisByColor[indexr].noOfCarsSold ||
      arrayControl.at(indexr).get('noOfCarsAvailable').value !==
        this.car2.lisByColor[indexr].noOfCarsAvailable
    ) {
      this.disAbleBooleanActionArry[indexr] = false;
    }
    this.showSnackbar('Ok Done with');
  }
  public showSnackbar(content: string) {
    this.snackBar.open(content, 'OK');
  }

  public saveUpd(indexr: number): void {
    const arrayControl = this.formGrp.get('formAray') as FormArray;
    this.car2.lisByColor[indexr] = arrayControl.at(indexr).value as Car2Entry;
    console.log('Updated Car2=' + JSON.stringify(this.car2));

    this.carHttpService.updCar2(this.car2).subscribe(
      (data) => {
        const carUpdted = data as Car2;
        // console.log('Car2Upd Done return:' + JSON.stringify(carUpdted));
      },
      (error) => {
        console.log(error);
      }
    );
    this.disAbleBooleanActionArry[indexr] = true;
  }
  public delete(indexr: number): void {
    this.confirmService.pushJsonObjToNVPArray(
      this.confirmService.car2CarForSale(this.car2, indexr)
    );
    this.confirmService.confirmDialogTitle = 'Confirm Delete Car Entry?';
    this.confirmService.doConfirmDialog();
    this.confirmService
      .getConfirmedAnswer()
      .subscribe((ans) => console.log('******* ConfirmDialogAnswer from edit   is ====>' + ans));
  }
  public addNewColor() {
    this.formAray.push(
      this.formBuilder.group({
        color: ['blue'],
        averagePrice: [''],
        noOfCarsSold: [''],
        noOfCarsAvailable: [''],
      })
    );
    this.disAbleBooleanActionArry[this.disAbleBooleanActionArry.length] = true;
    this.disAbleAddNewColor = true;

    this.car2.lisByColor.push({
      color: '',
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
}
