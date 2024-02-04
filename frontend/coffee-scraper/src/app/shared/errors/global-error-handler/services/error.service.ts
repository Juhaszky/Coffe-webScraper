import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMsgSubject: Subject<string> = new Subject();
  constructor() { }
}
