import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComparsionDirective } from './comparsion.directive';
import { HomeService } from './home/data-access/home.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComparsionDirective
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
