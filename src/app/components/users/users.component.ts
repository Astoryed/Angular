import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {User} from './user';
import decode from 'jwt-decode';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-check',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users:User[];

  constructor(private userService: UserService, private _router: Router,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }

    p: number = 1;


    ngOnInit() {

    this.readUser();
  }

    showError() {
        this.toastr.error('This Brand is deleted');
    }


  createUser(event: any){
        event.preventDefault();
        this.userService.setter(new User());
        this._router.navigate(['/createUpdate']);

      // console.log(event);
  }


    // showUser = false;

  readUser() {
    this.userService.readUser()
      .subscribe(
          data => {
              const token= localStorage.getItem('token');
              const tokenPayload = decode(token);

              let sortedList = [];

              let rawData = data['msg'];

              rawData.forEach((user) => {
                  // if (user.firstName != tokenPayload.firstName && user.userType != "Super Admin") {

                  if (user._id != tokenPayload.id && user.status !== 3) {
                      sortedList.push(user)
                  }

                  // console.log('outer',user.firstName)
                  // console.log('sorted',sortedList)
                  // for (let key in user) {
                  //   console.log('inner',user[key].firstName)
                  // }
              });

              this.users = sortedList

          },

        err =>{
          console.log(err);
        })
  }

  viewUser(user){
      this.userService.setter(user);
      this._router.navigate(['/viewUser']);
  }

  doUpdate(user){
    this.userService.setter(user);
    this._router.navigate(['/createUpdate']);
  }

  doDelete(user){
      const isConfirmed = confirm("Are you sure to delete this record ?");
      if(isConfirmed) {
          this.userService.deleteUser(user._id).subscribe(
              data => {
                  this.users.splice(this.users.indexOf(user), 1)
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


