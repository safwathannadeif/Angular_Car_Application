import { Injectable } from '@angular/core';
import { CarForSale } from './models/CarForSale.model';
import { Car2 } from './models/car2.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
public carForSales: CarForSale[] = [];
public noInCart = 0 ;
// public POrM: MangeOrPickFromCartEnum =   MangeOrPickFromCartEnum.Manage ;
// tslint:disable-next-line: no-inferrable-types
// tslint:disable-next-line: whitespace
// tslint:disable-next-line: no-inferrable-types
public POrM: boolean = false ;
public getCarsForSales(): CarForSale[] {
  return this.carForSales ;
}
public getNoOfCarsInCart(): number {
  if (this.carForSales === null ) { return 0 ; }
  if ( typeof this.carForSales === 'undefined') { return 0; }     // => true first time
  console.log('No in Cart =' + this.carForSales.length) ;
  return this.carForSales.length ;
}
// // tslint:disable-next-line: no-shadowed-variable
// public addToCart1(car4Sale: CarForSale ): void  {
//   this.carForSales.push(car4Sale) ;
// }
public addToCart2(car2: Car2 ): void  {
  // tslint:disable-next-line: prefer-const
  let  carForSale = new CarForSale() ;
  carForSale.carRefId = car2.carRefId ;
  carForSale.brand = car2.brand ;
  carForSale.model = car2.model;
  carForSale.yearMade = car2.yearMade ;
  carForSale.color = car2.lisByColor[car2.colorIndex].color ;
  carForSale.averagePrice = car2.lisByColor[car2.colorIndex].averagePrice ;
  carForSale.noOfCarsAvailable = car2.lisByColor[car2.colorIndex].noOfCarsAvailable ;
  carForSale.noOfCarsSold = car2.lisByColor[car2.colorIndex].noOfCarsSold ;
  this.carForSales.push(carForSale) ;
  this.noInCart = this.carForSales.length ;
}
}
// export enum MangeOrPickFromCartEnum { 'Manage',   'Pick' }
