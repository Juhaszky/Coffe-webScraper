import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  doComparsion: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
  
  doCompare() {
    this.doComparsion.next(true);
  }
}
