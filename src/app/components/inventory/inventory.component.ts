import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {InventoryService} from '../../services/inventory.service';
import {Inventory} from './inventory';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

    constructor(private _router: Router, private inventoryService: InventoryService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    public inventories:Inventory[];

    p: number = 1;


    ngOnInit() {

        this.readInventory();

    }

    showError() {
        this.toastr.error('Inventory is deleted');
    }


    readInventory() {
        this.inventoryService.readInventory()
            .subscribe(
                data => {
                    let sortedList = [];

                    let rawData = data['msg'];

                    rawData.forEach((inventory) => {

                        if (inventory.status !== 3) {
                            sortedList.push(inventory)
                        }
                    });

                    this.inventories = sortedList;
                },

                err =>{
                    console.log(err);
                })
    }

    createInventory(event: any){
        event.preventDefault();
        this.inventoryService.setter(new Inventory());
        this._router.navigate(['/createInventory']);
    }

    updateInventory(inventory){
        this.inventoryService.showLog(inventory.items);
        this.inventoryService.setter(inventory);
        this._router.navigate(['/createInventory']);
    }

    deleteInventory(inventory){
        const isConfirmed = confirm("Are you sure to delete this Inventory ?");
        if(isConfirmed) {
            this.inventoryService.deleteInventory(inventory._id).subscribe(
                data => {
                    this.inventories.splice(this.inventories.indexOf(inventory), 1)
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
