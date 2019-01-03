var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from './inventory';
var InventoryComponent = (function () {
    function InventoryComponent(_router, inventoryService, toastr, vcr) {
        this._router = _router;
        this.inventoryService = inventoryService;
        this.toastr = toastr;
        this.p = 1;
        this.toastr.setRootViewContainerRef(vcr);
    }
    InventoryComponent.prototype.ngOnInit = function () {
        this.readInventory();
    };
    InventoryComponent.prototype.showError = function () {
        this.toastr.error('Inventory is deleted');
    };
    InventoryComponent.prototype.readInventory = function () {
        var _this = this;
        this.inventoryService.readInventory()
            .subscribe(function (data) {
            var sortedList = [];
            var rawData = data['msg'];
            rawData.forEach(function (inventory) {
                if (inventory.status !== 3) {
                    sortedList.push(inventory);
                }
            });
            _this.inventories = sortedList;
        }, function (err) {
            console.log(err);
        });
    };
    InventoryComponent.prototype.createInventory = function (event) {
        event.preventDefault();
        this.inventoryService.setter(new Inventory());
        this._router.navigate(['/createInventory']);
    };
    InventoryComponent.prototype.updateInventory = function (inventory) {
        this.inventoryService.showLog(inventory.items);
        this.inventoryService.setter(inventory);
        this._router.navigate(['/createInventory']);
    };
    InventoryComponent.prototype.deleteInventory = function (inventory) {
        var _this = this;
        var isConfirmed = confirm("Are you sure to delete this Inventory ?");
        if (isConfirmed) {
            this.inventoryService.deleteInventory(inventory._id).subscribe(function (data) {
                _this.inventories.splice(_this.inventories.indexOf(inventory), 1);
                _this.showError();
                console.log(data);
            }, function (error) {
                console.log(error);
            });
        }
        else {
            return false;
        }
    };
    InventoryComponent = __decorate([
        Component({
            selector: 'app-inventory',
            templateUrl: './inventory.component.html',
            styleUrls: ['./inventory.component.css']
        }),
        __metadata("design:paramtypes", [Router, InventoryService,
            ToastsManager, ViewContainerRef])
    ], InventoryComponent);
    return InventoryComponent;
}());
export { InventoryComponent };
//# sourceMappingURL=inventory.component.js.map