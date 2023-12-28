import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../data-access/home.service';
import { TabViewComponent } from '../ui/tab-view/tab-view.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabViewComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService, CommonModule],
})
export class HomeComponent {
  constructor() {}

}
