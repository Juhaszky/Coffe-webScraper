import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ResultTableComponent } from '../../feature/result-table/result-table.component';

@Component({
  selector: 'tab-view',
  standalone: true,
  imports: [CommonModule, TabViewModule, ResultTableComponent],
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent {
  
}
