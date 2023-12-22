import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from './shared/models/product.model';
import { TableService } from './home/data-access/table.service';

@Directive({
  selector: '[productComparsion]',
  standalone: true,
})
export class ComparsionDirective implements OnDestroy {
  private readonly LOWERED_COLOR = 'rgb(46, 140, 14, 0.5)';
  private readonly ALERT_COLOR = 'rgb(208, 52, 44, 0.5)';
  @Input() product!: Product;
  @Input() products: Product[] = [];

  constructor(private el: ElementRef, private tableService: TableService) {
    this.tableService.doComparsion.subscribe((doCompare) =>
      doCompare ? this.compareProducts() : false
    );
  }
  ngOnDestroy(): void {
    this.tableService.doComparsion.unsubscribe();
  }

  private compareProducts() {
    const currentData = this.product;
    const fetchedData = this.findProductByItemNumber(currentData.itemNumber);

    if (!currentData || !fetchedData) {
      return;
    }

    const isPriceLowered = this.isPriceLowered(
      currentData.currentPrice,
      fetchedData.currentPrice
    );
    this.el.nativeElement.style.backgroundColor = isPriceLowered
      ? this.LOWERED_COLOR
      : this.ALERT_COLOR;

    this.updatePrice(currentData, fetchedData);
  }

  private updatePrice(data: Product, fetchedData: Product) {
    data.currentPrice = fetchedData.currentPrice;
    return data;
  }

  private isPriceLowered(oldPrice: string, currentPrice: string): boolean {
    return oldPrice > currentPrice;
  }

  private findProductByItemNumber(itemNumber: string): Product | undefined {
    let product = undefined;
    product = this.products.find((p) => p.itemNumber === itemNumber);
    return product;
  }
  
}
