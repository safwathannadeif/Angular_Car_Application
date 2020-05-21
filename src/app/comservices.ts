import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Car } from   "./models/car.model"   ; 
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from '../environments/environment';

//const baseUrl = 'http://localhost:8080/car' ;

@Injectable({
  providedIn: 'root'
})

export class Comservices {
  baseUrl:string ;
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiEndPoint;

  } ;
//
addCar(cari:Car): Observable<Car> {
  return this.http.post<Car>(this.baseUrl+"/addCar", cari)
    .pipe(
      catchError(this.handleError)) ;
    
}
//
updCar(cari:Car): Observable<Car> {
  return this.http.put<Car>(this.baseUrl+"/updCar", cari)
    .pipe(
      catchError(this.handleError)) ;
    
}
getAllCars(): Observable<Car[]> {
  return this.http.get<Car[]>(this.baseUrl +"/lisCars") 
  .pipe(catchError(this.handleError));
    
};
deleteCar(carerefId:string): Observable<Car> {
  return this.http.delete<Car>(this.baseUrl+"/deleteCar/"+ carerefId)
    .pipe(
      catchError(this.handleError)) ;
    
}

 handleError(error: HttpErrorResponse) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}

}