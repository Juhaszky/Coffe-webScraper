import {  ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorService } from './services/error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private errorMessageSubject = new Subject<string>();
  constructor(private errorS: ErrorService) {}
  handleError(error: any): void {
    this.errorS.errorMsgSubject.next(error.message);
    console.log(error.message);
  }
  errorMessage():Subject<string> {
    return this.errorMessageSubject;
  }
}
