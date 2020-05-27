import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ProgressBarService } from './progressBar.service';
import { timeout } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class AppCustomHttpInterceptor implements HttpInterceptor {

  constructor(public progsBarService: ProgressBarService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
      this.progsBarService.setReqUrlWParms(req.urlWithParams) ;
      this.progsBarService.startProgsBar();
   
      return next
          .handle(req)
          
          .pipe(  timeout(Number(environment.httpTimeOutMsecs)),                              
              tap((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                      this.progsBarService.endProgsBar();
                  }
              }, (error) => {
                  this.progsBarService.endProgsBar();
              })
          );
  }
}

//    .pipe( timeout(200),   