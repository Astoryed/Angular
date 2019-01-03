import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {BrandService} from '../../services/brand.service';
import {Router} from '@angular/router';
import {Brand} from './brand';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

    public brands:Brand[];

    p: number = 1;

  constructor(private brandService:BrandService, private _router:Router,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {

      this.readBrand();

  }

    showError() {
        this.toastr.error('Brand is deleted');
    }

    readBrand() {
        this.brandService.readBrand()
            .subscribe(
                data => {
                    // console.log(data);
                    // this.brands = data['msg'];

                    let sortedList = [];

                    let rawData = data['msg'];

                    rawData.forEach((brand) => {

                        if (brand.status !== 3) {
                            sortedList.push(brand)
                        }
                    });

                    this.brands = sortedList;
                },

                err =>{
                    console.log(err);
                })
    }

    createBrand(event: any){
        event.preventDefault();
        this.brandService.setter(new Brand());
        this._router.navigate(['/createBrand']);
    }

    updateBrand(brand){
        this.brandService.setter(brand);
        this._router.navigate(['/createBrand']);
    }

    deleteBrand(brand){
        const isConfirmed = confirm("Are you sure to delete this Brand ?");
        if(isConfirmed) {
            this.brandService.deleteBrand(brand._id).subscribe(
                data => {
                    this.brands.splice(this.brands.indexOf(brand), 1)
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
