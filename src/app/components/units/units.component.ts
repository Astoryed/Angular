import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UnitService} from '../../services/unit.service';
import {Router} from '@angular/router';
import {Unit} from './units';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {


    public units:Unit[];

    constructor(private unitService: UnitService, private _router: Router,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    p: number = 1;

    ngOnInit() {

        this.readUnit();
    }

    showError() {
        this.toastr.error('Unit is deleted');
    }

    readUnit() {
        this.unitService.readUnit()
            .subscribe(
                data => {
                    // console.log(data);
                    // this.units = data['msg'];

                    let sortedList = [];

                    let rawData = data['msg'];

                    rawData.forEach((unit) => {

                        if (unit.status !== 3) {
                            sortedList.push(unit)
                        }
                    });

                    this.units = sortedList;
                },

                err =>{
                    console.log(err);
                })
    }

    createUnit(event: any){
        event.preventDefault();
        this.unitService.setter(new Unit());
        this._router.navigate(['/createUnit']);

        // console.log(event);
    }

    updateUnit(unit){
        this.unitService.setter(unit);
        this._router.navigate(['/createUnit']);
    }

    deleteUnit(unit){
        const isConfirmed = confirm("Are you sure to delete this unit ?");
        if(isConfirmed) {
            this.unitService.deleteUnit(unit._id).subscribe(
                data => {
                    this.units.splice(this.units.indexOf(unit), 1)
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


    // deleteUnit(unit){
    //     const isConfirmed = confirm("Are you sure to delete this unit ?");
    //     if(isConfirmed) {
    //         this.unitService.deleteUnit(unit._id).subscribe(
    //             data => {
    //                 this.units.splice(this.units.indexOf(unit), 1)
    //                 console.log(data)
    //             },
    //             error => {
    //                 console.log(error);
    //             }
    //         );
    //     }else{
    //         return false;
    //     }
    // }

}
