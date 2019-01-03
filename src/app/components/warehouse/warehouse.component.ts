import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {WarehouseService} from '../../services/warehouse.service';
import {Warehouse} from './warehouse';
import {ToastsManager} from 'ng2-toastr';


@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

    public warehouses:Warehouse[];

    constructor(private warehouseService: WarehouseService, private _router: Router,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    p: number = 1;
    errorMsg = [];

    ngOnInit() {

        this.readWarehouse();
    }

    showError() {
        this.toastr.error('Warehouse is deleted');
    }

    readWarehouse() {
        this.warehouseService.readWarehouse()
            .subscribe(
                data => {
                    // console.log(data);
                    // this.batches = data['msg'];

                    let sortedList = [];

                    let rawData = data['msg'];

                    rawData.forEach((warehouse) => {

                        if (warehouse.status !== 3) {
                            sortedList.push(warehouse)
                        }
                    });

                    this.warehouses = sortedList;
                },

                err =>{
                    if (err.error) {
                        this.errorMsg = JSON.parse(err.error)
                    }
                })
    }

    createWarehouse(event: any){
        event.preventDefault();
        this.warehouseService.setter(new Warehouse());
        this._router.navigate(['/createWarehouse']);

        // console.log(event);
    }

    updateWarehouse(warehouse){
        this.warehouseService.setter(warehouse);
        this._router.navigate(['/createWarehouse']);
    }

    deleteWarehouse(warehouse){
        const isConfirmed = confirm("Are you sure to delete this warehouse ?");
        if(isConfirmed) {
            this.warehouseService.deleteWarehouse(warehouse._id).subscribe(
                data => {
                    this.warehouses.splice(this.warehouses.indexOf(warehouse), 1)
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
