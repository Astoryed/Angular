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
import { FrieghtService } from '../../../services/frieght.service';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
var CreateFrieghtComponent = (function () {
    // errorMsg = {client: '', finalDestination: '', blNumber:'', mblNumber:'', invoiceDate:'',
    //     expensePrice:'', totalProductPiece:'', notes: '', containerNumber: '', price:'', size:''};
    function CreateFrieghtComponent(_router, frieghtService, toastr, vcr) {
        this._router = _router;
        this.frieghtService = frieghtService;
        this.toastr = toastr;
        this.totalCon = null;
        this.total = null;
        this.value1 = 0;
        this.value2 = 0;
        this.removed = 0;
        this.deletedValue = 0;
        this.errorMsg = {};
        this.toastr.setRootViewContainerRef(vcr);
    }
    CreateFrieghtComponent.prototype.ngOnInit = function () {
        this.frieght = this.frieghtService.getter();
        this.container = [{ containerNumber: '', price: '', size: '' }];
        console.log('From Main Controller', this.frieghtService.fContainer());
        console.log(this.frieght.containerPrice);
    };
    // For Adding and Deleting Multiple Rows in the Frieght Invoice Form
    //=================================================================
    CreateFrieghtComponent.prototype.addContainer = function () {
        this.container.push({
            containerNumber: this.containerNumber,
            price: this.price,
            size: this.size
        });
        this.containerNumber = '';
        this.price = '';
        this.size = '';
        console.log(this.container);
    };
    CreateFrieghtComponent.prototype.deleteContainer = function (index) {
        if (this.container > this.container[0]) {
            // this.container.splice(index, 1);
            this.removed = this.container.splice(index, 1);
            this.deletedValue = this.removed[0].price;
            console.log('removed', this.deletedValue);
            this.totalCon = (this.totalCon * 1) - (this.deletedValue * 1);
            this.total = (this.total * 1) - (this.deletedValue * 1);
        }
    };
    //ValueOne == ContainerPrice Loop value
    CreateFrieghtComponent.prototype.valueOne = function (e) {
        this.value1 = e.target.value;
        this.addFieldValues();
        this.addC();
        // alert(e.target.value);
    };
    //ValueTwo == ExpensePrice Out of the loop
    CreateFrieghtComponent.prototype.valueTwo = function (e) {
        this.value2 = e.target.value;
        this.addFieldValues();
        this.calculateAvg();
        // alert(e.target.value);
    };
    CreateFrieghtComponent.prototype.totalPieceValue = function (e) {
        this.pieceValue = e.target.value;
        this.calculateAvg();
    };
    CreateFrieghtComponent.prototype.addC = function () {
        if (this.frieght.containerPrice != null) {
            this.frieght.containerPrice = this.totalCon;
            this.totalCon = this.price;
            for (var i = 0; i < this.container.length; i++) {
                if (this.container[i].price) {
                    this.totalCon = (this.totalCon * 1) + (this.container[i].price * 1);
                }
            }
        }
        else {
            this.totalCon = this.price;
            for (var i = 0; i < this.container.length; i++) {
                if (this.container[i].price) {
                    this.totalCon = (this.totalCon * 1) + (this.container[i].price * 1);
                }
            }
        }
        this.addFieldValues();
    };
    CreateFrieghtComponent.prototype.addFieldValues = function () {
        this.total = (this.totalCon * 1) + (this.value2 * 1);
    };
    CreateFrieghtComponent.prototype.calculateAvg = function () {
        this.totalAvg = ((this.value2 * 1) / (this.pieceValue * 1)).toFixed(3);
        console.log('Average', this.totalAvg);
    };
    CreateFrieghtComponent.prototype.createFrieght = function () {
        var _this = this;
        var frieght = this.frieght;
        if (frieght._id == undefined) {
            if (frieght.totalPrice == null) {
                frieght.totalPrice = this.total;
            }
            if (frieght.containerPrice == null) {
                frieght.containerPrice = this.totalCon;
            }
            if (frieght.container == null) {
                frieght.container = this.container;
            }
            if (frieght.avgPrice == null) {
                frieght.avgPrice = this.totalAvg;
            }
            this.frieghtService.createFrieght(this.frieght).subscribe(function (data) {
                console.log(data);
                _this._router.navigate(['/frieghtes']).then(function () {
                    _this.toastr.success('Frieght Invoice is created successfully', 'Frieght Invoice Created');
                });
            }, function (err) {
                console.log(err);
                if (err.error) {
                    _this.errorMsg = JSON.parse(err.error);
                }
            });
        }
        else {
            this.frieghtService.updateFrieght(this.frieght).subscribe(function (data) {
                console.log(data);
                _this._router.navigate(['/frieghtes']).then(function () {
                    _this.toastr.info('Frieght Invoice is updated', 'Frieght Invoice Updated');
                });
            }, function (error) {
                console.log(error);
            });
        }
    };
    CreateFrieghtComponent = __decorate([
        Component({
            selector: 'app-create-frieght',
            templateUrl: './create-frieght.component.html',
            styleUrls: ['./create-frieght.component.css']
        }),
        __metadata("design:paramtypes", [Router, FrieghtService,
            ToastsManager, ViewContainerRef])
    ], CreateFrieghtComponent);
    return CreateFrieghtComponent;
}());
export { CreateFrieghtComponent };
//# sourceMappingURL=create-frieght.component.js.map