import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {BrandService} from '../../../services/brand.service';
import {Brand} from '../brand';
import {Category} from '../../category/category';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {

    public brand:Brand;
    public categories: Category[];


    errorMsg = {brandName:'', brandNotes:'', category:''};



    constructor(private _router: Router, private brandService:BrandService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.brand = this.brandService.getter();

        this.readCategory();

    }

    readCategory() {
        this.brandService.readCategory()
            .subscribe(
                data => {
                    let sortedList = [];

                    let rawData = data['msg'];

                    rawData.forEach((category) => {

                        if (category.status !== "Deleted") {
                            sortedList.push(category)
                        }
                    });

                    this.categories = sortedList;
                },

                err =>{
                    console.log(err);
                })
    }


    createBrand() {
        if (this.brand._id == undefined) {
            this.brandService.createBrand(this.brand).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/brands']).then(() => {
                            this.toastr.success('Brand is created successfully', 'Brand Created');
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
            this.brandService.updateBrand(this.brand).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/brands']).then(() => {
                        this.toastr.info('Brand is updated', 'Brand Updated');
                    });
                },
                error => {
                    console.log(error)
                }
            )
        }
    }
}
