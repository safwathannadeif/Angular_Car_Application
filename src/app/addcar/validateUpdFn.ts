import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { SharedService } from '../shared.service';

@Injectable({ providedIn: 'root' })
export class UpdCarValidator {
    constructor( private share: SharedService) {
        console.log("constructor from AddcarComponent "); 
      }

  public notExistingValue(): ValidatorFn {
    return (formGroup: FormGroup) => {
        //
        const noOfCarSoldControl = formGroup.get('noOfCarsSold');
        const averagePriceControl = formGroup.get('averagePrice');
        
        const noOfCarSoldValue = noOfCarSoldControl.value;
        const averagePriceValue = averagePriceControl.value;

        if( ( this.share.carToUpd.noOfCarsSold != noOfCarSoldValue) || 
        (this.share.carToUpd.averagePrice != averagePriceValue) )   return null;  //Valid
         //
         return {notValid: true} ;

        //
     
    };
  }
}
// Adding Cross control validators see:
//see  https://offering.solutions/blog/articles/2020/05/03/cross-field-validation-using-angular-reactive-forms/