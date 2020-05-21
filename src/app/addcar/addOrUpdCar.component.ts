import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { AddOrUpdCarEnum } from '../shared.service';
import { Car } from "../models/car.model";
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { Router } from '@angular/router';
import { Comservices } from "../Comservices";
import { UpdCarValidator} from "./validateUpdFn" ;

@Component({
  selector: 'app-addcar',
  templateUrl: './addOrUpdCar.component.html',
  styleUrls: ['./addOrUpdCar.component.css']
})
export class AddOrUpdCarComponent implements OnInit {
  public aOrU: AddOrUpdCarEnum;
  public carForm: FormGroup;
 // public hide: String;
  //public showHide: boolean;
  public title:string ;
  public readonly:string ;


  constructor(private updCarValidator: UpdCarValidator ,   private carservice: Comservices, private share: SharedService, public router: Router, public fb: FormBuilder) {
    console.log("constructor from AddcarComponent "); 
  }
  ngOnInit(): void {
    switch (this.share.addOrUpd) {            //sharedService addOrUpd
      case AddOrUpdCarEnum.Add:
        this.aOrU = AddOrUpdCarEnum.Add;
        this.initAddCar();
        //this.showHide = false;
        this.title="Add" ;
        this.readonly=" " ;
        break;
      case AddOrUpdCarEnum.Update:
        this.aOrU = AddOrUpdCarEnum.Update;
        this.initUpdCar();
        //this.showHide = true;
        this.title="Update" ;
        this.readonly="readonly" ;
     //   this.hide="No" ;
        break;
    }
    //this.onChanges();
  }
  initAddCar() {
    console.log("initAddCar from AddUpdcarComponent ")

    this.carForm = this.fb.group({
      brand: new FormControl("", [Validators.required, Validators.minLength(4)]),
      model: new FormControl("", [Validators.required, Validators.minLength(3)]),
      noOfCarsSold:new FormControl("", [Validators.required,Validators.min(1)]),
      yearMade: new FormControl( "", [Validators.required,,Validators.min(1917),Validators.max(2020)]),
      averagePrice: new FormControl("", [Validators.required, Validators.min(100)]) ,
  
    }
    )
  }
  initUpdCar() {
    console.log("initUpdCar from AddUpdcarComponent  " + this.share.carToUpd.model);
    this.carForm = this.fb.group({
      brand: new FormControl({value:this.share.carToUpd.brand, disabled: true}, [Validators.required, Validators.minLength(4)]),
      // model: new FormControl ( {value:this.share.carToUpd.brand,disable:true},[Validators.required,Validators.minLength(4),validateUpd]) ,        //getCarToUse
      model: new FormControl({value:this.share.carToUpd.model, disabled: true}, [Validators.required, Validators.minLength(4)]),
      noOfCarsSold:new FormControl(this.share.carToUpd.noOfCarsSold, [Validators.required,Validators.min(2)]),
      yearMade: new FormControl( {value:this.share.carToUpd.yearMade,   disabled: true},    [Validators.required,,Validators.min(1917),Validators.max(2020)]),
      averagePrice: new FormControl(this.share.carToUpd.averagePrice, [Validators.required, Validators.min(100)])
    
    },
    
      {
        validators: [this.updCarValidator.notExistingValue()], //Adding Cross control validators
       
      }
    
    )
   // this.onChanges();
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.carForm.controls[controlName].hasError(errorName);
  }
  /* Update Form */
  saveForm(car:Car,isValid:boolean) {
    
    if (window.confirm('Are you sure you want to update?')) {
      console.log("Confimed");
      if ( this.aOrU === AddOrUpdCarEnum.Update )  this.updateTheCar(car) ;
      if ( this.aOrU === AddOrUpdCarEnum.Add )  this.addTheCar(car) ;

      }
    else {
      console.log("I Think here is NOT Confimed");
    }
   
    
  this.router.navigateByUrl('/car');
    // this.carForm.reset() ;
  }

  cancel() {
    this.router.navigateByUrl('/car');
  }

  // onChanges(): void {
  //   if (this.aOrU === AddOrUpdCarEnum.Add) return;
  //   this.carForm.valueChanges.subscribe(val => {

  //   if( ( this.share.carToUpd.noOfCarsSold != val.noOfCarsSold ) || 
  //     (this.share.carToUpd.averagePrice != val.averagePrice ) )  this.hide = "YesYes";  // valid form after change 

  //   });
  // }
updateTheCar(caru:Car)  {
  caru.carRefId=this.share.carToUpd.carRefId ;
  this.carservice.updCar(caru)
  .subscribe(
    caruo => {
      console.log('Start updThe ....');
      console.log("updTheCar RefID output::::" + caruo.carRefId);
      console.log('End  updTheCar .....');
    },
    error => {
      console.log(error);
    });
}

addTheCar(cari:Car) { 
  this.carservice.addCar(cari)
  .subscribe(
    caro => {
      console.log('Start addTheCar ....');
      console.log("addTheCar RefID output::::" + caro.carRefId);
      console.log('End  addTheCar .....');
    },
    error => {
      console.log(error);
    });
}
//
}

// export const validateUpd: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
//   // return null ;
//   const brand = control.get('brand');
//   console.log("updValidate brand=[" + brand + "]");
//   const model = control.get('model');
//   console.log("updValidate model.value=[" + model.value + "]");
//   return null;
  // return  ( this.share.carToUpd.brand != brand.value.trim() && brand.value.minLength(4) ) &&
  //         ( this.share.carToUpd.model != model.value.trim()  && model.value.minLength(4) ) ?  null : { 'updInvalid': true} ;

  //   return null ; 
  // return name && alterEgo && name.value === alterEgo.value ? { 'identityRevealed': true } : null;
//};
  //   <form [formGroup]="carForm" (ngSubmit)="updateForm()" novalidate>