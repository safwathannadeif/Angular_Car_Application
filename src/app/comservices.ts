import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Car } from './models/car.model';
import { Car2 } from './models/car2.model';
import { ModelCustomerDetails } from './models/customerDetails.model';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';

//const baseUrl = 'http://localhost:8080/car' ;

@Injectable({
  providedIn: 'root',
})
export class Comservices {
  baseUrl: string;
  baseUrl2: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiEndPoint;
    this.baseUrl2 = environment.apiEndPoint2;
  }
  updCar2(cari2: Car2): Observable<Car2> {
    return this.http
      .put<Car2>(this.baseUrl2 + '/updCar2', cari2)
      .pipe(catchError(this.handleError));
  }
  //
  getAllCars2(): Observable<Car2[]> {
    return this.http.get<Car2[]>(this.baseUrl2 + '/lisCars2').pipe(catchError(this.handleError));
  }

  getCusByCusId(cusId: string): Observable<ModelCustomerDetails> {
    return this.http
      .get<ModelCustomerDetails>(this.baseUrl + '/getCusByCusId/' + cusId)
      .pipe(catchError(this.handleError));
  }
  getCusByNames(cusName: string): Observable<ModelCustomerDetails> {
    return this.http
      .get<ModelCustomerDetails>(this.baseUrl + '/getCusByName/' + cusName)
      .pipe(catchError(this.handleError));
  }
  //
  addCar(cari: Car): Observable<Car> {
    return this.http.post<Car>(this.baseUrl + '/addCar', cari).pipe(catchError(this.handleError));
  }
  //
  updCar(cari: Car): Observable<Car> {
    return this.http.put<Car>(this.baseUrl + '/updCar', cari).pipe(catchError(this.handleError));
  }
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl + '/lisCars').pipe(catchError(this.handleError));
  }
  deleteCar(carerefId: string): Observable<Car> {
    return this.http
      .delete<Car>(this.baseUrl + '/deleteCar/' + carerefId)
      .pipe(catchError(this.handleError));
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
