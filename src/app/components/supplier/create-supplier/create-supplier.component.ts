import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {SupplierService} from '../../../services/supplier.service';
import {Supplier} from '../supplier';


@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {

  public supplier:Supplier;

  errorMsg = {supplierName:''};


  constructor(private _router: Router, private supplierService: SupplierService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.supplier = this.supplierService.getter();
  }


  createSupplier() {
    if (this.supplier._id == undefined) {
      this.supplierService.createSupplier(this.supplier).subscribe(
        data => {
          console.log(data);
          this._router.navigate(['/suppliers']).then(() => {
            this.toastr.success('Supplier is created successfully', 'Supplier Created');
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
      this.supplierService.updateSupplier(this.supplier).subscribe(
        data => {
          console.log(data);
          this._router.navigate(['/suppliers']).then(() => {
            this.toastr.info('Supplier is updated', 'Supplier Updated');
          });
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
