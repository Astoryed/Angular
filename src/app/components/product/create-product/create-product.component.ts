import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../product';
import {Router} from '@angular/router';
import {Brand} from '../../brand/brand';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

    public product:Product;
    public brands: Brand[];

    errorMsg ={barCode: '', cartonCode: '', productName:'', manufacturer:'', minQty:'', maxQty:'', productCode:''};


    constructor(private productService: ProductService, private _router: Router,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.product = this.productService.getter();

      this.readBrand();
  }


    readBrand() {
        this.productService.readBrand()
            .subscribe(
                data => {
                    let sortedList = [];

                    let rawData = data['msg'];

                    rawData.forEach((brand) => {

                        if (brand.status !== "Deleted") {
                            sortedList.push(brand)
                        }
                    });

                 this.brands = sortedList;
                },

                err =>{
                    console.log(err);
                })
    }


    createProduct() {
        if (this.product._id == undefined) {
            this.productService.createProduct(this.product).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/products']).then(() => {
                        this.toastr.success('Product is created successfully', 'Product Created');
                    });
                },
                err => {
                    console.log(err);
                    if (err.error) {
                        this.errorMsg = JSON.parse(err.error)
                    }
                }
            )
        }else{
            this.productService.updateProduct(this.product).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/products']).then(() => {
                        this.toastr.info('Product is updated', 'Product Updated');
                    });
                },
                error => {
                    console.log(error)
                }
            )
        }
    }



}
