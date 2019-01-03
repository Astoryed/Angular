import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {Router} from '@angular/router';
import {Category} from '../category';
import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

    public category:Category;

    errorMsg ={ categoryName: '', categoryNotes: ''};


    constructor(private _router: Router, private categoryService:CategoryService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }


    ngOnInit() {
        this.category = this.categoryService.getter();
    }


    createCategory() {
        if (this.category._id == undefined) {
            this.categoryService.createCategory(this.category).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/categories']).then(() => {
                        this.toastr.success('Category is created successfully', 'Category Created');
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
            this.categoryService.updateCategory(this.category).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/categories']).then(() => {
                        this.toastr.info('Category is updated successfully', 'Category Updated');
                    });
                },
                error => {
                    console.log(error)
                }
            )
        }
    }
}
