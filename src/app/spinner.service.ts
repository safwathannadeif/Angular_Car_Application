import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public visibility: BehaviorSubject<boolean>;
  public reqUrlWParms:string ;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  show() {
    this.visibility.next(true);
  }

  hide() {
    this.visibility.next(false);
  }
 setReqUrlWParms(req:string ):void{
  this.reqUrlWParms=req ;
 }
}