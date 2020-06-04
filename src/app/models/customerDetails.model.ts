export interface  ModelCustomerDetails {
   
   name: string ;
   cusId: string ;
   cusCarDetailsElmListDisplay: CusCarDetailsElmListDisp[] ;
  }

export interface CusCarDetailsElmListDisp { 
  carColor: string ;
  carMileage: number ;
  plateId: string ;
  brand: string ;
  model: string ;
  salesyear: number ;
}