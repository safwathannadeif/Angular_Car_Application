import { Injectable } from '@angular/core';

import { Car } from "./models/car.model";
import { ModelCustomerDetails } from './models/customerDetails.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public  addOrUpd: AddOrUpdCarEnum ;
  public  carToUpd: Car ;
  public  modelCustomerDetails:ModelCustomerDetails ;
  constructor() { }

  setCusDtails(d:ModelCustomerDetails) :void
  {
    this.modelCustomerDetails=d ;
    
  }
  getCusDetails() :ModelCustomerDetails 
  {
    return this.modelCustomerDetails ;
  }
  addCase() {
    this.addOrUpd = AddOrUpdCarEnum.Add ;
  
  }
  updCase(inpCar) {
    this.carToUpd= inpCar ;
    this.addOrUpd = AddOrUpdCarEnum.Update;
  }
   getCarToUse()  {
     return this.carToUpd ;
   }
}
export enum AddOrUpdCarEnum { Add,   Update }