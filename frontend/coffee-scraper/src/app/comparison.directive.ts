import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { Product } from './shared/models/product.model';
import { TableService } from './home/data-access/table.service';
import { Subject, takeUntil } from 'rxjs';

export enum PriceState {
  Increased = 'Increased',
  Decreased = 'Decreased',
  Equal = 'Equal',
}

@Directive({
  selector: '[productComparsion]',
  standalone: true,
})
export class ComparsionDirective implements OnDestroy {
  private readonly DECREASED_COLOR = 'rgb(46, 140, 14, 0.5)';
  private readonly INCREASED_COLOR = 'rgb(208, 52, 44, 0.5)';
  private readonly EQUALS_COLOR = 'rgb(255,165,0, 0.5)';
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
    const currentData = this.product;
    if (!currentData) {
      return;
    }
    const fetchedData = this.findProductByItemNumber(currentData.itemNumber);

    if (!currentData || !fetchedData) {
      return;
    }

    const priceMovement = this.checkPriceMovement(
      currentData.currentPrice,
      fetchedData.currentPrice
    );
    this.setColorByPriceMovement(priceMovement);
    this.updatePrice(currentData, fetchedData);
  }

  private setColorByPriceMovement(priceMovement: PriceState): void {
    const rowElement = this.el.nativeElement;

    switch (priceMovement) {
      case PriceState.Increased: {
        rowElement.style.backgroundColor = this.INCREASED_COLOR;
        break;
      }
      case PriceState.Decreased: {
        rowElement.style.backgroundColor = this.DECREASED_COLOR;
        break;
      }
      case PriceState.Equal: {
        rowElement.style.backgroundColor = this.EQUALS_COLOR;
        break;
      }
    }
  }

  private updatePrice(data: Product, fetchedData: Product) {
    data.currentPrice = fetchedData.currentPrice;
    return data;
  }

  private checkPriceMovement(
    oldPrice: string,
    currentPrice: string
  ): PriceState {
    if (oldPrice > currentPrice) {
      return PriceState.Increased;
    } else if (oldPrice < currentPrice) {
      return PriceState.Decreased;
    } else {
      return PriceState.Equal;
    }
  }

  private findProductByItemNumber(itemNumber: string): Product | undefined {
    let product = undefined;
    product = this.products.find((p) => p.itemNumber === itemNumber);
    return product;
  }
}
