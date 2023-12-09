import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Product } from './shared/models/product.model';
import { TableService } from './home/data-access/table.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { ProductStorage } from './home/data-access/product.storage';

@Directive({
  selector: '[appComparsion]',
  standalone: true,
})
export class ComparsionDirective implements OnDestroy, OnInit {
  @Input() product!: Product;
  @Input() products: Product[] = [];
  private subject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private el: ElementRef, private tableService: TableService) {}
  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
  ngOnInit(): void {
    this.tableService.test
      .asObservable()
      .subscribe((res) => (res ? this.compareProducts() : ''));
  }

  compareProducts() {
    const currentData = this.product;
    const fetchedData = this.findProductByItemNumber(currentData.itemNumber);
    //currentData.currentPrice = fetchedData?.currentPrice || '';
    if (currentData && fetchedData) {
      if (
        this.checkIfPriceLowered(
          currentData.currentPrice,
          fetchedData.currentPrice
        )
      ) {
        this.el.nativeElement.style.backgroundColor = 'green';
        console.log(this.el.nativeElement);
      } else {
        this.el.nativeElement.style.backgroundColor = '#D0342C';
      }
      this.updatePrice(currentData, fetchedData);
    }
  }
  private updatePrice(data: Product, fetchedData: Product) {
    data.currentPrice = fetchedData.currentPrice;
    return data;
  }
  private checkIfPriceLowered(oldPrice: string, currentPrice: string): boolean {
    if (oldPrice > currentPrice) {
      return true;
    }
    return false;
  }
  private findProductByItemNumber(itemNumber: string): Product | null {
    return this.products.find((p) => p.itemNumber === itemNumber) || null;
  }
}
