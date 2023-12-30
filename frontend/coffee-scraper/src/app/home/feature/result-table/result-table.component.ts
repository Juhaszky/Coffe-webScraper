import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HomeService } from '../../data-access/home.service';
import { ComparsionDirective } from 'src/app/comparison.directive';
import { TableService } from '../../data-access/table.service';
import { Product } from 'src/app/shared/models/product.model';
import { ProductStorage } from '../../data-access/product.storage';
import { ColorHelperComponent } from './color-helper/color-helper.component';
import { throwError } from 'rxjs';

@Component({
  selector: 'result-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ComparsionDirective,
    ColorHelperComponent,
  ],
  providers: [HomeService],
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent implements OnInit {
  products: Product[] = [];
  oldProducts: Product[] = [];
  compared: boolean = false;
  constructor(
    public homeService: HomeService,
    private productStorage: ProductStorage,
    private tService: TableService
  ) {
    this.products = this.productStorage.products;
    this.oldProducts = this.productStorage.oldProducts;
  }
  ngOnInit(): void {
    this.fetchOldProducts();
    this.fetchProducts();
  }

  private fetchOldProducts(): void {
    this.homeService.fetchOldData().subscribe({
      next: (p) => {
        this.oldProducts = p;
        this.productStorage.oldProducts = p;
      },
      error: (error) => {
        throwError(() => new Error('Error fetching old products: ', error));
      },
    });
  }
  private fetchProducts(): void {
    this.homeService.fetchData().subscribe({
      next: (p) => {
        this.products = p;
        this.productStorage.products = p;
      },
      error: (error) => {
        throwError(() => new Error('Error fetching products: ', error));
      },
    });
  }

  checkUpdatedPrices() {
    this.compared = true;
    this.tService.doCompare();
  }
  resetComparsion() {
    this.homeService.fetchOldData().subscribe((op) => {
      this.oldProducts = op;
      this.productStorage.oldProducts = op;
    });
    this.compared = false;
  }
}
