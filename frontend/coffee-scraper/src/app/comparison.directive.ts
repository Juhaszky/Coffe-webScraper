import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { Product } from './shared/models/product.model';
import { TableService } from './home/data-access/table.service';
import { Subject, takeUntil } from 'rxjs';
import { ComparisonColors } from './shared/configs/colors.config';

export enum PriceState {
  Increased = 'Increased',
  Decreased = 'Decreased',
  Equals = 'Equal',
}

@Directive({
  selector: '[productComparsion]',
  standalone: true,
})
export class ComparsionDirective implements OnDestroy {
  @Input() product!: Product;
  @Input() products: Product[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private el: ElementRef, private tableService: TableService) {
    this.tableService.doComparsion
      .pipe(takeUntil(this.destroy$))
      .subscribe((doCompare) => (doCompare ? this.compareProducts() : false));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private compareProducts() {
    const currentProduct = this.product;
    if (!currentProduct) {
      return;
    }
    const fetchedProduct = this.findProductByItemNumber(
      currentProduct.itemNumber
    );
    if (!currentProduct || !fetchedProduct) {
      return;
    }
    const priceMovement = this.checkPriceMovement(
      currentProduct.currentPrice,
      fetchedProduct.currentPrice
    );
    this.setColorByPriceMovement(priceMovement);
    this.updatePrice(currentProduct, fetchedProduct);
  }

  private setColorByPriceMovement(priceMovement: PriceState): void {
    const rowElement = this.el.nativeElement;

    switch (priceMovement) {
      case PriceState.Increased: {
        rowElement.style.backgroundColor = ComparisonColors.INCREASED;
        break;
      }
      case PriceState.Decreased: {
        rowElement.style.backgroundColor = ComparisonColors.DECREASED;
        break;
      }
      case PriceState.Equals: {
        rowElement.style.backgroundColor = ComparisonColors.EQUALS;
        break;
      }
    }
  }

  private updatePrice(data: Product, fetchedProduct: Product) {
    data.currentPrice = fetchedProduct.currentPrice;
    return data;
  }

  private checkPriceMovement(
    oldPrice: number,
    currentPrice: number
  ): PriceState {
    if (oldPrice > currentPrice) {
      return PriceState.Decreased;
    } else if (oldPrice < currentPrice) {
      return PriceState.Increased;
    } else {
      return PriceState.Equals;
    }
  }

  private findProductByItemNumber(itemNumber: string): Product | undefined {
    let product = undefined;
    product = this.products.find((p) => p.itemNumber === itemNumber);
    return product;
  }
}
