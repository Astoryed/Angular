import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {FrieghtService} from '../../services/frieght.service';
import {Frieght} from './fright';


@Component({
  selector: 'app-frieght',
  templateUrl: './frieght.component.html',
  styleUrls: ['./frieght.component.css']
})
export class FrieghtComponent implements OnInit {

    constructor(private _router: Router, private frieghtService: FrieghtService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    public frieghtes:Frieght[];

    p: number = 1;
    public container;

    ngOnInit() {

        this.readFrieght();
    }

    showError() {
        this.toastr.error('Frieght Invoice is deleted');
    }


    readFrieght() {
        this.frieghtService.readFrieght()
            .subscribe(
                data => {

                    let resetList = [];

                    let rawData = data['msg'];

                    rawData.forEach((frieght) => {

                        if (frieght.status !== 3) {
                            resetList.push(frieght)
                        }
                    });

                    this.frieghtes = resetList;

                    // let container;

                    for (let i = 0; i < this.frieghtes.length; i++) {
                       this.container = this.frieghtes[i].container;

                      // console.log('READ fired!!!', this.container);


                        // container.forEach((con) =>{
                        //     if (con.containerNumber[i] !== null ) {
                        //         sortedList.push(con)
                        //     }
                        // });
                        // this.con = sortedList;

                        // this.con = container;

                        // let size = this.frieghtes[i].container[0].size;
                        // let conP = this.frieghtes[i].container[0].price;
                        // let conN = this.frieghtes[i].container[0].containerNumber;

                        console.log('container');
                        // console.log('container',container);
                        // console.log('list', this.con);

                    }
                  // console.log('container',container);

                },

                err =>{
                    console.log(err);
                })
    }

    createFrieght(event: any){
        event.preventDefault();
        this.frieghtService.setter(new Frieght());
        this._router.navigate(['/createFrieght']);
    }

    updateFrieght(frieght){

      this.frieghtService.showLog(frieght.container);

      this.frieghtService.setter(frieght);
      this._router.navigate(['/createFrieght']);

    }

    viewFrieght(frieght){

        this.frieghtService.showLog(frieght.container);

        this.frieghtService.setter(frieght);
        this._router.navigate(['/viewContainer']);

    }



    deleteFrieght(frieght){
        const isConfirmed = confirm("Are you sure to delete this Frieght Invoice ?");
        if(isConfirmed) {
            this.frieghtService.deleteFrieght(frieght._id).subscribe(
                data => {
                    this.frieghtes.splice(this.frieghtes.indexOf(frieght), 1)
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
