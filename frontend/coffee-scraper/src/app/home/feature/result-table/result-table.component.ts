import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HomeService } from '../../data-access/home.service';
import { ComparsionDirective } from 'src/app/comparison.directive';
import { TableService } from '../../data-access/table.service';
import { Product } from 'src/app/shared/models/product.model';
import { ProductStorage } from '../../data-access/product.storage';
import { ColorHelperComponent } from './color-helper/color-helper.component';
import { Subscription, delay, finalize, tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CurrencyPipe } from 'src/app/shared/pipes/currency.pipe';
import { ErrorDialogComponent } from 'src/app/shared/errors/error-dialog/error-dialog.component';

@Component({
  selector: 'result-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ComparsionDirective,
    ColorHelperComponent,
    ButtonModule,
    CurrencyPipe,
    ErrorDialogComponent,
  ],
  providers: [HomeService],
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  oldProducts: Product[] = [];
  compared: boolean = false;
  private oldProductSubscription!: Subscription;
  private productSubscription!: Subscription;
  constructor(
    public homeService: HomeService,
    private productStorage: ProductStorage,
    private tService: TableService
  ) {}
  ngOnInit(): void {
    this.fetchOldProducts();
  }
  ngOnDestroy(): void {
    this.oldProductSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }

  private fetchOldProducts(): void {
    this.oldProductSubscription = this.homeService
      .fetchOldData()
      .pipe(
        tap((oldProducts) => {
          this.oldProducts = oldProducts;
          this.productStorage.oldProducts = oldProducts;
        })
      )
      .subscribe({
        error: (error) => {
          //console.log(error);
          throw error;
        },
      });
  }
  private fetchProducts(): void {
    this.productSubscription = this.homeService
      .fetchData()
      .pipe(
        tap((p: Product[]) => {
          this.products = p;
          this.productStorage.products = p;
        }),
        delay(1),
        finalize(() => {
          this.productStorage.tmpSubject.next(this.products);
          this.doCompare();
        })
      )
      .subscribe({
        error: (error) => {
          throw error;
        },
      });
  }

  doCompare() {
    this.compared = true;
    this.tService.doCompare();
  }

  checkUpdatedPrices() {
    this.fetchProducts();
  }

  resetComparsion() {
    this.fetchOldProducts();
    this.compared = false;
  }
}
