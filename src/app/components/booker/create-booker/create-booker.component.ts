import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {BookerService} from '../../../services/booker.service';
import {Booker} from '../booker';

@Component({
  selector: 'app-create-booker',
  templateUrl: './create-booker.component.html',
  styleUrls: ['./create-booker.component.css']
})
export class CreateBookerComponent implements OnInit {

  public booker:Booker;

  errorMsg = {bookerName:''};


  constructor(private _router: Router, private bookerService: BookerService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.booker = this.bookerService.getter();
  }


  createBooker() {
    if (this.booker._id == undefined) {
      this.bookerService.createBooker(this.booker).subscribe(
        data => {
          console.log(data);
          this._router.navigate(['/bookers']).then(() => {
            this.toastr.success('Booker is created successfully', 'Booker Created');
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
      this.bookerService.updateBooker(this.booker).subscribe(
        data => {
          console.log(data);
          this._router.navigate(['/bookers']).then(() => {
            this.toastr.info('Booker is updated', 'Booker Updated');
          });
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
