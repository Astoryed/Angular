import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {BookerService} from '../../services/booker.service';
import {Booker} from './booker';


@Component({
  selector: 'app-booker',
  templateUrl: './booker.component.html',
  styleUrls: ['./booker.component.css']
})
export class BookerComponent implements OnInit {

  public bookers:Booker[];

  constructor(private _router: Router, private bookerService: BookerService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  p: number = 1;

  ngOnInit() {

    this.readBooker();
  }

  showError() {
    this.toastr.error('Booker is deleted');
  }

  readBooker() {
    this.bookerService.readBooker()
      .subscribe(
        data => {

          let sortedList = [];

          let rawData = data['msg'];

          rawData.forEach((booker) => {

            if (booker.status !== 3) {
              sortedList.push(booker)
            }
          });

          this.bookers = sortedList;
        },

        err =>{
          console.log(err);
        })
  }

  createBooker(event: any){
    event.preventDefault();
    this.bookerService.setter(new Booker());
    this._router.navigate(['/createBooker']);

    // console.log(event);
  }

  updateBooker(booker){
    this.bookerService.setter(booker);
    this._router.navigate(['/createBooker']);
  }

  deleteBooker(booker){
    const isConfirmed = confirm("Are you sure to delete this booker ?");
    if(isConfirmed) {
      this.bookerService.deleteBooker(booker._id).subscribe(
        data => {
          this.bookers.splice(this.bookers.indexOf(booker), 1)
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
