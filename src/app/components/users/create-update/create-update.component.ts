import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../user';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {

  public user:User;

    public errorMsg ={firstName: '', lastName: '', email:'', password:''};


  constructor(private userService: UserService, private _router: Router,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {
    this.user = this.userService.getter();

  }


  createOrUpdate(){
    if(this.user._id == undefined) {
        this.userService.createUser(this.user).subscribe(
            data => {
                console.log(data,"Hey i am here");
                this._router.navigate(['/users']).then(() => {
                    this.toastr.success('User is created successfully', 'User Created');
                });
            },
            err => {
                if (err.error) {
                    this.errorMsg = JSON.parse(err.error)
                }
            }
        )
    }else{
      this.userService.updateUser(this.user).subscribe(
        data => {
          console.log(data);
          this._router.navigate(['/users']).then(() => {
              this.toastr.info('User is updated successfully', 'User Updated');
          });
        },
        error => {
          console.log(error)
        }
      )
    }
  }



}
