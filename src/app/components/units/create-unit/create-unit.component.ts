import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {UnitService} from '../../../services/unit.service';
import {Unit} from '../units';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.css']
})
export class CreateUnitComponent implements OnInit {

    public unit:Unit;

    errorMsg ={unitName:'', quantity: ''};

    constructor(private _router: Router, private unitService: UnitService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.unit = this.unitService.getter();
    }


    createUnit() {
        if (this.unit._id == undefined) {
            this.unitService.createUnit(this.unit).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/units']).then(() => {
                        this.toastr.success('Unit is created successfully', 'Unit Created');
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
            this.unitService.updateUnit(this.unit).subscribe(
                data => {
                    console.log(data);
                    this._router.navigate(['/units']).then(() => {
                        this.toastr.info('Unit is updated', 'Unit Updated');
                    });
                },
                error => {
                    console.log(error)
                }
            )
        }
    }
}
