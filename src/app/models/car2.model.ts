export class Car2 {
  carRefId: string;
  brand: string;
  model: string;
  yearMade: number;
  colorIndex:number=0 ;
  lisByColor: Car2Entry[];
}
export interface Car2Entry {
  averagePrice: number;
  noOfCarsSold: number;
  noOfCarsAvailable: number;
  srByColor: number;
  color: string;
}
