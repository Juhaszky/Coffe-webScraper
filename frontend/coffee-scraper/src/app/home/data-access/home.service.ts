import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}
  fetchOldData(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl + '/old-data');
  }
  fetchData(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl + '/fetch-data');
  }
}
