import { Component, OnInit } from '@angular/core';
import { Comservices } from '../Comservices';
import { ModelCustomerDetails } from '../models/customerDetails.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";


interface SelectBy {
  valueN: number;
  viewValue: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  
  selectByAry: SelectBy[] = [
    {valueN: 1, viewValue: 'ByCustomer-Id'},
    {valueN: 2, viewValue: 'ByCustomer-Name'}
   
  ];
 selecteBy0Ctl:SelectBy= { valueN:0, viewValue:"" } ;
 curNValue:number=0 ;
  selectedValueNum: number;
 
  searchForm: FormGroup ;

  cusModel: ModelCustomerDetails;
 
 searchTitle: string="xxxx" ;
 progreBarOn:boolean=false ;

  constructor(private comService: Comservices, public router: Router, public fb: FormBuilder)  {
    
  }
 

  cancel() {
  this.searchForm.reset() ;

  }
   
/* Update Form */
saveForm(formvalue, isValid:boolean) {
  //{ "selectByCtl": { "valueN": 0, "viewValue": "" }, "cusIdOrCusNameCtl": "" }
 //const n  = formIn.value.selectByCtl.valueN ;
 const n= formvalue.selectByCtl.valueN ;
 const cus= formvalue.cusIdOrCusNameCtl ;
 console.log("this.searchForm saved values= n and cus [" + n +"][" + cus +"]" ) ;

 if (n === 1) this.getByCusIdHttp(cus) ;
 

  }
  ngOnInit(): void {
    this.initGrpCtl() ;
    
  }
   SearchValidator: ValidatorFn = (formGroup: FormGroup) => {
 
    console.log("searchValidatorFn called ======"   ) ;
    const selCtl = formGroup.get('selectByCtl');
    const cusCtl = formGroup.get('cusIdOrCusNameCtl');
    
    const selCtlValue = selCtl.value;
    const cusCtlValue = cusCtl.value;

    this.searchTitle=selCtlValue.viewValue ;
    if (selCtlValue.valueN === 0 )  this.searchTitle="NewValue.." ;

    if (selCtlValue.valueN != this.curNValue) {  //chg in option Happend
       this.curNValue=selCtlValue.valueN  ;
       // this.searchForm.value.cusIdOrCusNameCtl="" ;
     //cusCtl.patchValue.apply('') ;
     // this.searchForm.reset();
    }
    

    console.log("searchValidatorFn selCtlValue=" + selCtlValue.value  ) ;
    console.log("searchValidatorFn cusCtlValue=" + cusCtlValue  ) ;
   
    if  ( (selCtlValue.valueN === 0) || (cusCtlValue=='') )  return {notValid: true} ;
    return null ;  // Valid 
  };
  initGrpCtl()
  {
    
    this.searchForm = this.fb.group({
      selectByCtl: new FormControl(this.selecteBy0Ctl,Validators.required) ,
      cusIdOrCusNameCtl: new FormControl('',Validators.required) 
    },
        { validator: this.SearchValidator }
    )
   // this.onChanges();
  }

  

  
getByCusIdHttp(cusId)
{
  //// just tetsing
  this.progreBarOn=false ;
  this.comService.getCusByCusId(cusId).subscribe( 
    (data) => {
      this.cusModel = data as ModelCustomerDetails;
      console.log("this.testCusMode.name:" + this.cusModel.name ) ;
      console.log("this.testCusMode.cusCarDetailsElmListDisplay[2]" + this.cusModel.cusCarDetailsElmListDisplay[2].plateId);
      this.progreBarOn=false ;
    },
    (error) => {
      console.log(error);
    }
    
  );
 
}
}