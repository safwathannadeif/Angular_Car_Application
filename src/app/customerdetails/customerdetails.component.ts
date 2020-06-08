import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ModelCustomerDetails } from '../models/customerDetails.model';
import { CusCarDetailsElmListDisp } from '../models/customerDetails.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from  '@angular/material/form-field';
import {MatRadioChange} from  '@angular/material/radio' ;
import {MatSelectChange} from  '@angular/material/select' ;
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';


import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatMenu } from '@angular/material/menu';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};
@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css'],

  // providers: [
  //   {
  //     provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  //     useValue: appearance
  //   }
  // ]
})
export class CustomerdetailsComponent implements OnInit {
  constructor(private sharedService: SharedService, public fb: FormBuilder ) {

   }
  selectedVal = 'xxxx' ;
  colorInDisp = 'red" ;';

menuItems: Array<{text: string, elementRef: MatMenu}> = [
    {text: 'Item-1', elementRef: null },
    {text: 'Item-2', elementRef: null},
  ];

  public cusDetails: ModelCustomerDetails ;
  public cusDetailsForm: FormGroup ;
  ////
  colorforselecteOpt = 'green' ;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  // filteredFruits: Observable<string[]>;
  filteredFruits: Observable<string[]>;
  // fruits: string[] = ['Lemon'];
  fruits: string ;
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  allFruits: CusCarDetailsElmListDisp[] ;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  ////

  public dataSource = new MatTableDataSource<CusCarDetailsElmListDisp >();

  // carColor: string ;
  // carMileage: number ;
  // plateId: string ;
  // brand: string ;
  // model: string ;
  // salesyear: number ;


  displayedColumns: string[] = [
    'brand' ,
    'model',
    'salesyear',

     'carColor33' ,
    'carMileage',
    'carColor',
    'plateId'
  ];

  selected(event: MatAutocompleteSelectedEvent): void {
   // this.fruits.carColor=event.option.selected.valueOf
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
  selectedItem(elm) {
    this.selectedVal = elm.carColor ;
    this.colorInDisp = elm.carColor ;
    }

  ngOnInit(): void {


  this.cusDetails =  this.sharedService.getCusDetails() ; // cusDetailsForm
  this.cusDetailsForm = this.fb.group({
    cusNameCtl: new FormControl({value: this.cusDetails.name, disabled: true}),
    cusIdCtl: new FormControl({value: this.cusDetails.cusId, disabled: true}),
  }
  );
  this.dataSource.data = this.cusDetails.cusCarDetailsElmListDisplay ; //
  this.fruits = this.cusDetails.cusCarDetailsElmListDisplay[0].carColor ;
  this.allFruits = this.cusDetails.cusCarDetailsElmListDisplay;
  //
  }
  onSelectChangeChip(event: MatAutocompleteSelectedEvent): void
  {
    this.fruits = event.option.viewValue ;
    this.fruitCtrl.setValue(null);

  }
remove(): void  {
  this.fruits = null ;
 }
 add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;
  console.log('event.input' + event.input) ;
  console.log('event.value' + event.value) ;
  this.fruits = value ;

  if (input) {
    input.value = '';
  }

  this.fruitCtrl.setValue(null);
}
onSelectChange(mrChange: MatSelectChange ) {
  console.log('onSelectChange:' + mrChange.value.brand);
  console.log('onSelectChange:' + mrChange.value.model);
  console.log('onSelectChange:' + mrChange.value.carColor);
  this.colorforselecteOpt = mrChange.value.carColor ;

}
//
onRadioChange(mrChange: MatRadioChange ) {
  console.log('onRadioChange:' + mrChange.value.brand);
  console.log('onRadioChange:' + mrChange.value.model);
  console.log('onRadioChange:' + mrChange.value.carColor);

}
  getCarColor(color: string): string {
    switch (color) {
      case 'UAMBERK':
        return 'orange';
      case 'BLACK':
        return 'black';
      case 'BLUE':
        return 'blue';

        case 'GREEN':
        return 'green';
      case 'CYAN':
        return 'cyan';
      case 'RED':
        return 'red';

        case 'MAGENTA':
          return 'magenta';
        case 'CYAN':
          return 'cyan';
        case 'RED':
          return 'red';
         default:
           return 'brown' ;

    }

}
}
