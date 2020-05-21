import { Injectable } from '@angular/core';

import { Car } from "./models/car.model";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public  addOrUpd: AddOrUpdCarEnum ;
  public  carToUpd: Car ;
  constructor() { }

  addCase() {
    this.addOrUpd = AddOrUpdCarEnum.Add ;
   // this.carToUpd = { brand:"" , model:"" , noOfCarsSold:0,  averagePrice:0 , yearMade:2020,carRefId:""} ;
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