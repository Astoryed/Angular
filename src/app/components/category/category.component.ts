import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {Category} from './category';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  public categories:Category[];

    p: number = 1;

  constructor(private _router:Router, private categoryService: CategoryService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {

    this.readCategory();
  }

    showError() {
        this.toastr.error('Category is deleted');
    }

    readCategory() {
        this.categoryService.readCategory()
            .subscribe(
                data => {
                    let sortedList = [];

                    let rawData = data['msg'];

                    rawData.forEach((category) => {

                        if (category.status !== 3) {
                            sortedList.push(category)
                        }
                    });

                    this.categories = sortedList;
                },

                err =>{
                    console.log(err);
                })
    }

  createCategory(event: any){
      event.preventDefault();
      this.categoryService.setter(new Category());
      this._router.navigate(['/createCategory']);
  }

    updateCategory(category){
        this.categoryService.setter(category);
        this._router.navigate(['/createCategory']);
    }

    deleteCategory(category){
        const isConfirmed = confirm("Are you sure to delete this Category ?");
        if(isConfirmed) {
            this.categoryService.deleteCategory(category._id).subscribe(
                data => {
                    this.categories.splice(this.categories.indexOf(category), 1)
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
