import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { HomeService } from './home.service';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  test: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private homeService: HomeService) { }
  
  doCompare() {
    this.test.next(true);
  }
}
