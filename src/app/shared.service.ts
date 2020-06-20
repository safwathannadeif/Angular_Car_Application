import { Injectable } from '@angular/core';
import { Car2 } from './models/car2.model';
import { ModelCustomerDetails } from './models/customerDetails.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public carToEdit: Car2;
  public modelCustomerDetails: ModelCustomerDetails;
  setCusDtails(d: ModelCustomerDetails): void {
    this.modelCustomerDetails = d;
  }
  getCusDetails(): ModelCustomerDetails {
    return this.modelCustomerDetails;
  }

  setCarToEdit(inpCar: Car2) {
    this.carToEdit = inpCar;
  }
  getCarToEdit() {
    return this.carToEdit;
  }
}
