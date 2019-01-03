import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {Supplier} from './supplier';
import {SupplierService} from '../../services/supplier.service';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})


export class SupplierComponent implements OnInit {

  public suppliers:Supplier[];

  constructor(private _router: Router, private supplierService: SupplierService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  p: number = 1;

  ngOnInit() {

    this.readSupplier();
  }

  showError() {
    this.toastr.error('Supplier is deleted');
  }

  readSupplier() {
    this.supplierService.readSupplier()
      .subscribe(
        data => {

          let sortedList = [];

          let rawData = data['msg'];

          rawData.forEach((supplier) => {

            if (supplier.status !== 3) {
              sortedList.push(supplier)
            }
          });

          this.suppliers = sortedList;
        },

        err =>{
          console.log(err);
        })
  }

  createSupplier(event: any){
    event.preventDefault();
    this.supplierService.setter(new Supplier());
    this._router.navigate(['/createSupplier']);

    // console.log(event);
  }

  updateSupplier(supplier){
    this.supplierService.setter(supplier);
    this._router.navigate(['/createSupplier']);
  }

  deleteSupplier(supplier){
    const isConfirmed = confirm("Are you sure to delete this supplier ?");
    if(isConfirmed) {
      this.supplierService.deleteSupplier(supplier._id).subscribe(
        data => {
          this.suppliers.splice(this.suppliers.indexOf(supplier), 1)
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
