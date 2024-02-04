import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ProductStorage } from '../../data-access/product.storage';
import { TableService } from '../../data-access/table.service';

export interface Options {
  labels: string[];
  datasets: DataSet[];
}
export interface DataSet {
  label?: string;
  data?: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
}

@Component({
  selector: 'app-diagram-view',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './diagram-view.component.html',
  styleUrls: ['./diagram-view.component.scss']
})

export class DiagramViewComponent implements OnInit {

  constructor(private pStorage: ProductStorage, private tService: TableService) {}
  basicData: any;
  basicOptions: any;
  productsAmount: number = 0;
  options!: Options;
  ngOnInit(): void {
    this.pStorage.tmpSubject.subscribe((asd) => {
      this.productsAmount = asd.length;
      this.setOptions();
    });
    //this.productsAmount = this.pStorage.products.length;
    this.basicData = {};
    
    this.basicOptions = {
      plugins: {
          legend: {

          }
      },
      scales: {
      }
  };
  }
  private setOptions(): void {
    this.options = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Product quantity',
            data: [this.productsAmount, 12, 0, 1],
            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
            borderWidth: 1
          },
          {
          label: 'testLabel',
          backgroundColor: ['red']
        }
        ]
      
    }
  }
}
