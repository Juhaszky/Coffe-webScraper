import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'currencyPipe',
})
export class CurrencyPipe implements PipeTransform {
  transform(productPrice: number): string | undefined {
    return productPrice !== undefined
      ? productPrice.toString().concat('Ft')
      : undefined;
  }
}
