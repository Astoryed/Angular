import {Component, Output, EventEmitter, OnInit, ViewContainerRef} from '@angular/core';
import {FormArray, FormBuilder, Validators, FormGroup, FormControl} from "@angular/forms";
import {Frieght} from "../fright";
import {FrieghtService} from '../../../services/frieght.service';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';


@Component({
  selector: 'app-create-container',
  templateUrl: './create-container.component.html',
  styleUrls: ['./create-container.component.css']
})
export class CreateContainerComponent implements OnInit {

    constructor(private _fb: FormBuilder, private _router: Router, private frieghtService: FrieghtService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    public frieght:Frieght;
    myForm: FormGroup;

    ngOnInit() {
        // we will initialize our form here
        this.myForm = this._fb.group({
            invoiceNumber: ['', [Validators.required, Validators.minLength(5)]],
            finalDestination: ['', [Validators.required]],
            blNumber: ['', [Validators.required]],
            mblNumber: ['', [Validators.required]],
            invoiceDate: ['', [Validators.required]],
            expensePrice:['', [Validators.required]],
            totalPrice:['', [Validators.required]],
            avgPrice:['', [Validators.required]],
            totalProductPiece:['', [Validators.required]],
            notes:['', [Validators.required]],
            containers: this._fb.array([
                this.initAddress(),
            ])
        });


        console.log('Frieghts', this.frieghtService.getter());

    }

    getDes(e){
        let get = e.target.value;
        alert(get)
    }

    initAddress() {
        // initialize our address
        return this._fb.group({
            containerNumber: ['', Validators.required],
            price: [''],
            size: ['']
        });
    }

    addAddress() {
        // add address to the list
        const control = <FormArray>this.myForm.controls['containers'];
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        // remove address from the list
        const control = <FormArray>this.myForm.controls['containers'];
        control.removeAt(i);
    }

    save(){
        console.log(this.myForm);
    }


    // editEmp(employee: Employee): void {
    //     localStorage.removeItem('editEmpId');
    //     localStorage.setItem('editEmpId', employee.id.toString());
    //     this.router.navigate(['add-emp']);
    // }

    // formData { return this.form.get('Data'); }


}