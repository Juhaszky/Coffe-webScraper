import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductStorage {
  products$: Observable<Product[]>;
  oldProducts$: Observable<Product[]>;
  comparedProducts$!: Observable<Product[]>;
  constructor(private homeService: HomeService) {
    this.products$ = this.homeService.fetchData();
    this.oldProducts$ = this.homeService.fetchOldData();
  }
}
