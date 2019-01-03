import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {Product} from './product';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {

    public products:Product[];

  constructor(private productService:ProductService, private _router: Router,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }


    p: number = 1;

  ngOnInit() {

      this.readProduct();
  }

    readProduct() {
        this.productService.readProduct()
            .subscribe(
                data => {
                    let sortedList = [];

                    let rawData = data['msg'];

                    rawData.forEach((product) => {

                        if (product.status !== 3) {
                            sortedList.push(product)
                        }
                    });

                    this.products = sortedList;
                },

                err =>{
                    console.log(err);
                })
    }

    showError() {
        this.toastr.error('Product is deleted');
    }

    createProduct(event: any){
        event.preventDefault();
        this.productService.setter(new Product());
        this._router.navigate(['/createProduct']);

        // console.log(event);
    }

    updateProduct(product){
        this.productService.setter(product);
        this._router.navigate(['/createProduct']);
    }

    deleteProduct(product){
        const isConfirmed = confirm("Are you sure to delete this product ?");
        if(isConfirmed) {
            this.productService.deleteProduct(product._id).subscribe(
                data => {
                    this.products.splice(this.products.indexOf(product), 1)
                    this.showError();
                    console.log(data)
                },
                error => {
                    console.log(error);
                }
            );
        }else{
            return false;
        }
    }
}
