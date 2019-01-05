import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FrieghtService} from '../../../services/frieght.service';
import {ToastsManager} from 'ng2-toastr';
import {Frieght} from '../fright';
import {Router} from '@angular/router';


@Component({
    selector: 'app-create-frieght',
    templateUrl: './create-frieght.component.html',
    styleUrls: ['./create-frieght.component.css']
})
export class CreateFrieghtComponent implements OnInit {

    public frieght:Frieght;

    public container;
    public containerNumber;
    public price = null;
    public size;


    public total = 0;
    public value1 = 0;
    public value2 = 0;
    public removed = 0;
    public deletedValue = 0;
    public removedValue = 0;

    public totalAvg;
    public pieceValue;

    errorMsg = {client: '', finalDestination: '', blNumber:'', mblNumber:'', invoiceDate:'',
        expensePrice:'', totalProductPiece:'', notes: '', containerNumber: '', price:'', size:''};


    constructor(private _router: Router, private frieghtService: FrieghtService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {

        this.frieght = this.frieghtService.getter()

        console.log('When getting Id', this.frieghtService.getter());

        this.container = [{containerNumber:'', price: '', size: ''}];

        console.log('From Main Controller', this.frieghtService.fContainer())


    }

    // For Adding and Deleting Multiple Rows in the Frieght Invoice Form
    //=================================================================

    addContainer() {
        this.container.push({
            containerNumber: this.containerNumber,
            price: this.price ,
            size: this.size});
        this.containerNumber = '';
        this.price = '';
        this.size = '';
        console.log(this.container)

    }

    putContainer() {
        this.frieght.container.push({
            containerNumber: this.containerNumber,
            price: this.price ,
            size: this.size});
        this.containerNumber = '';
        this.price = '';
        this.size = '';
        console.log(this.container)

    }

    deleteContainer(index) {

        if(this.container > this.container[0]){
            // this.container.splice(index, 1);
            this.removed = this.container.splice(index, 1);


            this.deletedValue = this.removed[0].price;
            console.log('removed',this.deletedValue);

            this.frieght.totalPrice = (this.frieght.totalPrice*1) - (this.deletedValue*1);

        }

    }

    removeContainer(index) {

        if(this.frieght.container > this.frieght.container[0]){
            // this.container.splice(index, 1);
            this.removed = this.frieght.container.splice(index, 1);


            this.removedValue = this.removed[0].price;
            console.log('removed',this.removedValue);

            this.frieght.containerPrice = (this.frieght.containerPrice*1) - (this.removedValue*1);

        }

    }

    // ------------------Adding All Fields in Update-----------------
    addFieldValues() {

        let total = 0;
        let grandTotal = 0;
        let avgPrice = 0;
        let expensePrice = this.frieght.expensePrice;
        let pPiece = this.frieght.totalProductPiece;

        let expense = 0;

        //Update
        if(this.frieght._id !== undefined){

            for (let key of this.frieght.container) {
                total = total + key.price
            }

            for (let key of this.frieght.container) {
                this.containerNumber = key.containerNumber;
                this.price = key.price;
                this.size = key.size;
            }

        }else {
            //Create
            for (let key of this.container) {
                total = total + key.price;
                this.containerNumber = key.containerNumber;
                this.price = key.price;
                this.size = key.size;
            }

        }

        // console.log('Total Values =>', total);
        this.frieght.containerPrice = total;

        // expense = parseInt(this.frieght.expensePrice);

        grandTotal = (total*1) + (expensePrice*1);

        // console.log('Total Values =>', total + '->' + expense + '->' + grandTotal);
        this.frieght.totalPrice = grandTotal;

        avgPrice = expensePrice / pPiece;

        avgPrice.toFixed(3);

        this.frieght.avgPrice = avgPrice;

    }


    createFrieght() {
        let frieght = this.frieght;

        if (frieght._id == undefined) {

            if(frieght.container == null){
                frieght.container = this.container
            }

            this.frieghtService.createFrieght(this.frieght).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/frieghtes']).then(() => {
                        this.toastr.success('Frieght Invoice is created successfully', 'Frieght Invoice Created');
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
            this.frieghtService.updateFrieght(this.frieght).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/frieghtes']).then(() => {
                        this.toastr.info('Frieght Invoice is updated', 'Frieght Invoice Updated');
                    });
                },
                error => {
                    console.log(error)
                }
            )
        }
    }

}
