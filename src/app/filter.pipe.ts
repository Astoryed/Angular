import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any, productCode: any): any {

    if(productCode === undefined) {
      return products
    }

    return products.filter(function (product) {
      return product.productName.toLowerCase().includes(productCode.toLowerCase())
        
    })
  }

}
