import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HomeService } from '../../data-access/home.service';
import { ComparsionDirective } from 'src/app/comparison.directive';
import { TableService } from '../../data-access/table.service';
import { Product } from 'src/app/shared/models/product.model';
import { ProductStorage } from '../../data-access/product.storage';

@Component({
  selector: 'result-table',
  standalone: true,
  imports: [CommonModule, TableModule, ComparsionDirective],
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
    this.homeService.fetchOldData().subscribe((p) => {
      this.oldProducts = p;
      this.productStorage.oldProducts = p;
    });
    this.homeService.fetchData().subscribe((p) => {
      this.products = p;
      this.productStorage.products = p;
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
