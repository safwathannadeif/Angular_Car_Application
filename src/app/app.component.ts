import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './progressBar.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CarM9';
  //showSpinner: boolean;
  constructor(public spinnerService: ProgressBarService )  { }

  ngOnInit() {
  }

  // doWork() {

  //   this.httpClient.get<any>('http://dummy.restapiexample.com/api/v1/employees')
  //     .subscribe(
  //       success => {
  //         console.log('Done');
  //       },
  //       error => {
  //         console.error('Error');
  //       }
  //     );
  // }
}
