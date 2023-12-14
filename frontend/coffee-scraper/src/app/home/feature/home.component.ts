import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../data-access/home.service';
import { TabViewComponent } from '../ui/tab-view/tab-view.component';
import { TableService } from '../data-access/table.service';
import { ProductStorage } from '../data-access/product.storage';
import { of, take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabViewComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService, CommonModule],
})
export class HomeComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private tService: TableService,
    private productStorage: ProductStorage
  ) {}
  ngOnInit(): void {}

  checkUpdatedPrices() {
    this.tService.doCompare();
    this.homeService.fetchData().subscribe((newProducts) => {
      this.productStorage.products$ = of(newProducts);
    });
  }
}
