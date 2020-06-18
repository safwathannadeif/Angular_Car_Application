import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { ProgressBarService } from './progressBar.service';

@Injectable()
export class AppCustomHttpInterceptor implements HttpInterceptor {
  constructor(public progsBarService: ProgressBarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progsBarService.setReqUrlWParms(req.urlWithParams);
    this.progsBarService.startProgsBar();
    return next.handle(req).pipe(
      timeout(Number(environment.httpTimeOutMsecs)),
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.progsBarService.endProgsBar();
          }
        },
        (error) => {
          this.progsBarService.endProgsBar();
        }
      )
    );
  }
}
//    .pipe( timeout(200),
