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


    public totalCon = null;

    public total = null;
    public value1 = 0;
    public value2 = 0;
    public removed = 0;
    public deletedValue = 0;

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

    deleteContainer(index) {

        if(this.container > this.container[0]){
            // this.container.splice(index, 1);
            this.removed = this.container.splice(index, 1);


            this.deletedValue = this.removed[0].price;
            console.log('removed',this.deletedValue);

            this.totalCon = (this.totalCon*1) - (this.deletedValue*1);
            this.total = (this.total*1) - (this.deletedValue*1);

        }

    }

    valueOne(e){
        this.value1 = e.target.value;

        this.addFieldValues();
        this.addC();
        // alert(e.target.value);
    }

    valueTwo(e){
        this.value2 = e.target.value;
        this.addFieldValues();
        this.calculateAvg();
        // alert(e.target.value);
    }

    totalPieceValue(e){
        this.pieceValue = e.target.value;
        this.calculateAvg();
    }


    addC(){
        this.totalCon = this.price;

        for (let i = 0; i < this.container.length; i++) {
            if (this.container[i].price) {
                this.totalCon = (this.totalCon*1) + (this.container[i].price*1);
            }
        }

        this.addFieldValues();

    }

    addFieldValues() {
        this.total = (this.totalCon*1) + (this.value2*1) ;
    }

    calculateAvg(){

        this.totalAvg = ((this.value2*1) / (this.pieceValue*1)).toFixed(3);

        console.log('Average',this.totalAvg)
    }



    createFrieght() {
        let frieght = this.frieght;

        if (frieght._id == undefined) {

            if(frieght.totalPrice == null){
                frieght.totalPrice = this.total
            }

            if(frieght.containerPrice == null){
                frieght.containerPrice = this.totalCon
            }

            if(frieght.container == null){
                frieght.container = this.container
            }

            if(frieght.avgPrice == null){
                frieght.avgPrice = this.totalAvg
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
