import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductStorage {
  products: Product[] = [];
  oldProducts: Product[] = [];
  comparedProducts$!: Observable<Product[]>;
  constructor() {}
}
