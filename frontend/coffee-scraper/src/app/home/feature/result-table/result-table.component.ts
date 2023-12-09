import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HomeService } from '../../data-access/home.service';
import { ComparsionDirective } from 'src/app/comparsion.directive';
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
  constructor(
    public homeService: HomeService,
    private productStorage: ProductStorage
  ) {}
  ngOnInit(): void {
    this.productStorage.oldProducts$.subscribe(
      (product) => (this.oldProducts = product)
    );
    this.productStorage.products$.subscribe(
      (newProducts) => (this.products = newProducts)
    );
  }
}
