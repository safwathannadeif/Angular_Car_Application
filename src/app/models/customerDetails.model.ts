export interface  ModelCustomerDetails {
   
   name: string ;
   cusId: string ;
   cusCarDetailsElmListDisplay: cusCarDetailsElmListDisp[] ;
  }

interface cusCarDetailsElmListDisp { 
  carColor: string ;
  carMileage: number ;
  plateId: string ;
  brand: string ;
  model: string ;
  salesyear: number ;
}