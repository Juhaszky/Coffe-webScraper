import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from './shared/models/product.model';
import { TableService } from './home/data-access/table.service';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appComparsion]',
  standalone: true,
})
export class ComparsionDirective implements OnDestroy, OnInit {
  private readonly LOWERED_COLOR = 'green';
  private readonly ALERT_COLOR = '#D0342C';
  @Input() product!: Product;
  @Input() products: Product[] = [];

  constructor(private el: ElementRef, private tableService: TableService) {}
  ngOnDestroy(): void {
    this.tableService.test.unsubscribe();
  }
  ngOnInit(): void {
    this.tableService.test
      .asObservable()
      .subscribe((res) => (res ? this.compareProducts() : ''));
  }

  compareProducts() {
    const currentData = this.product;
    const fetchedData = this.findProductByItemNumber(currentData.itemNumber);
    if (currentData && fetchedData) {
      if (
        this.isPriceLowered(currentData.currentPrice, fetchedData.currentPrice)
      ) {
        this.el.nativeElement.style.backgroundColor = this.LOWERED_COLOR;
      } else {
        this.el.nativeElement.style.backgroundColor = this.ALERT_COLOR;
      }
      this.updatePrice(currentData, fetchedData);
    }
  }
  private updatePrice(data: Product, fetchedData: Product) {
    data.currentPrice = fetchedData.currentPrice;
    return data;
  }
  private isPriceLowered(oldPrice: string, currentPrice: string): boolean {
    return oldPrice > currentPrice;
  }
  private findProductByItemNumber(itemNumber: string): Product | null {
    return this.products.find((p) => p.itemNumber === itemNumber) || null;
  }
}
