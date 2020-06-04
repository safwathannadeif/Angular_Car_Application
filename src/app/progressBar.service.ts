import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';

import { Inject } from '@angular/core';
import {SimpleStr}  from './models/simpleStr.model' ;

  
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  public visibility: BehaviorSubject<boolean>;
  public reqUrlWParms:string ;
  
  constructor(public dialog: MatDialog) {
  
    this.visibility = new BehaviorSubject(false);
   
  }
 
  openDialog(): void {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.hasBackdrop = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {tttt:this.reqUrlWParms};
    dialogConfig.maxHeight = '77px';
    dialogConfig.width = '750px';
    
    const dialogRef = this.dialog.open(BarProgressDialog, dialogConfig);
    
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
     
      console.log('The dialog Closed Action=' + result);
    });
  }



  startProgsBar() {
    this.openDialog()
    this.visibility.next(true);
  }

  endProgsBar() {
    this.dialog.closeAll() ;
    console.log("endProgsBar with closeAll Done........................................") ;
   
    
    this.visibility.next(false);
  }
 setReqUrlWParms(req:string ):void{
  this.reqUrlWParms=req ;
 }
 
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'spinner-progress',
  templateUrl: './progressBar.html',
})
// tslint:disable-next-line: component-class-suffix
export class BarProgressDialog {
  public confDelBut: boolean;
  constructor(
   public dialogRef: MatDialogRef<BarProgressDialog>,

    @Inject(MAT_DIALOG_DATA) public data: SimpleStr 
  ) 
  {
  
  }
 closex()  {
  this.dialogRef.close() ;

 }
  
}